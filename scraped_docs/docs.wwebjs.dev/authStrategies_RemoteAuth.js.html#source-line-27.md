Source: https://docs.wwebjs.dev/authStrategies_RemoteAuth.js.html#source-line-27

1.  `'use strict';`

3.  `/* Require Optional Dependencies */`
4.  `try {`
5.      `var fs = require('fs-extra');`
6.      `var unzipper = require('unzipper');`
7.      `var archiver = require('archiver');`
8.  `} catch {`
9.      `fs = undefined;`
10.      `unzipper = undefined;`
11.      `archiver = undefined;`
12.  `}`

14.  `const path = require('path');`
15.  `const { Events } = require('./../util/Constants');`
16.  `const BaseAuthStrategy = require('./BaseAuthStrategy');`

18.  `/**`
19.   `* Remote-based authentication`
20.   `* @param {object} options - options`
21.   `* @param {object} options.store - Remote database store instance`
22.   `* @param {string} options.clientId - Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance`
23.   `* @param {string} options.dataPath - Change the default path for saving session files, default is: "./.wwebjs_auth/"` 
24.   `* @param {number} options.backupSyncIntervalMs - Sets the time interval for periodic session backups. Accepts values starting from 60000ms {1 minute}`
25.   `* @param {number} options.rmMaxRetries - Sets the maximum number of retries for removing the session directory`
26.   `*/`
27.  `class RemoteAuth extends BaseAuthStrategy {`
28.      `constructor({ clientId, dataPath, store, backupSyncIntervalMs, rmMaxRetries } = {}) {`
29.          `if (!fs &amp;&amp; !unzipper &amp;&amp; !archiver) throw new Error('Optional Dependencies [fs-extra, unzipper, archiver] are required to use RemoteAuth. Make sure to run npm install correctly and remove the --no-optional flag');`
30.          `super();`

32.          `const idRegex = /^[-_\w]+$/i;`
33.          `if (clientId &amp;&amp; !idRegex.test(clientId)) {`
34.              `throw new Error('Invalid clientId. Only alphanumeric characters, underscores and hyphens are allowed.');`
35.          `}`
36.          `if (!backupSyncIntervalMs || backupSyncIntervalMs &lt; 60000) {`
37.              `throw new Error('Invalid backupSyncIntervalMs. Accepts values starting from 60000ms {1 minute}.');`
38.          `}`
39.          `if(!store) throw new Error('Remote database store is required.');`

41.          `this.store = store;`
42.          `this.clientId = clientId;`
43.          `this.backupSyncIntervalMs = backupSyncIntervalMs;`
44.          `this.dataPath = path.resolve(dataPath || './.wwebjs_auth/');`
45.          ``this.tempDir = `${this.dataPath}/wwebjs_temp_session_${this.clientId}`;``
46.          `this.requiredDirs = ['Default', 'IndexedDB', 'Local Storage']; /* => Required Files &amp; Dirs in WWebJS to restore session */`
47.          `this.rmMaxRetries = rmMaxRetries ?? 4;`
48.      `}`

50.      `async beforeBrowserInitialized() {`
51.          `const puppeteerOpts = this.client.options.puppeteer;`
52.          ``const sessionDirName = this.clientId ? `RemoteAuth-${this.clientId}` : 'RemoteAuth';``
53.          `const dirPath = path.join(this.dataPath, sessionDirName);`

55.          `if (puppeteerOpts.userDataDir &amp;&amp; puppeteerOpts.userDataDir !== dirPath) {`
56.              `throw new Error('RemoteAuth is not compatible with a user-supplied userDataDir.');`
57.          `}`

59.          `this.userDataDir = dirPath;`
60.          `this.sessionName = sessionDirName;`

62.          `await this.extractRemoteSession();`

64.          `this.client.options.puppeteer = {`
65.              `...puppeteerOpts,`
66.              `userDataDir: dirPath`
67.          `};`
68.      `}`

70.      `async logout() {`
71.          `await this.disconnect();`
72.      `}`

74.      `async destroy() {`
75.          `clearInterval(this.backupSync);`
76.      `}`

78.      `async disconnect() {`
79.          `await this.deleteRemoteSession();`

81.          `let pathExists = await this.isValidPath(this.userDataDir);`
82.          `if (pathExists) {`
83.              `await fs.promises.rm(this.userDataDir, {`
84.                  `recursive: true,`
85.                  `force: true,`
86.                  `maxRetries: this.rmMaxRetries,`
87.              `}).catch(() => {});`
88.          `}`
89.          `clearInterval(this.backupSync);`
90.      `}`

92.      `async afterAuthReady() {`
93.          `const sessionExists = await this.store.sessionExists({session: this.sessionName});`
94.          `if(!sessionExists) {`
95.              `await this.delay(60000); /* Initial delay sync required for session to be stable enough to recover */`
96.              `await this.storeRemoteSession({emit: true});`
97.          `}`
98.          `var self = this;`
99.          `this.backupSync = setInterval(async function () {`
100.              `await self.storeRemoteSession();`
101.          `}, this.backupSyncIntervalMs);`
102.      `}`

104.      `async storeRemoteSession(options) {`
105.          `/* Compress &amp; Store Session */`
106.          `const pathExists = await this.isValidPath(this.userDataDir);`
107.          `if (pathExists) {`
108.              `await this.compressSession();`
109.              `await this.store.save({session: this.sessionName});`
110.              ``await fs.promises.unlink(`${this.sessionName}.zip`);``
111.              ``await fs.promises.rm(`${this.tempDir}`, {``
112.                  `recursive: true,`
113.                  `force: true,`
114.                  `maxRetries: this.rmMaxRetries,`
115.              `}).catch(() => {});`
116.              `if(options &amp;&amp; options.emit) this.client.emit(Events.REMOTE_SESSION_SAVED);`
117.          `}`
118.      `}`

120.      `async extractRemoteSession() {`
121.          `const pathExists = await this.isValidPath(this.userDataDir);`
122.          ``const compressedSessionPath = `${this.sessionName}.zip`;``
123.          `const sessionExists = await this.store.sessionExists({session: this.sessionName});`
124.          `if (pathExists) {`
125.              `await fs.promises.rm(this.userDataDir, {`
126.                  `recursive: true,`
127.                  `force: true,`
128.                  `maxRetries: this.rmMaxRetries,`
129.              `}).catch(() => {});`
130.          `}`
131.          `if (sessionExists) {`
132.              `await this.store.extract({session: this.sessionName, path: compressedSessionPath});`
133.              `await this.unCompressSession(compressedSessionPath);`
134.          `} else {`
135.              `fs.mkdirSync(this.userDataDir, { recursive: true });`
136.          `}`
137.      `}`

139.      `async deleteRemoteSession() {`
140.          `const sessionExists = await this.store.sessionExists({session: this.sessionName});`
141.          `if (sessionExists) await this.store.delete({session: this.sessionName});`
142.      `}`

144.      `async compressSession() {`
145.          `const archive = archiver('zip');`
146.          ``const stream = fs.createWriteStream(`${this.sessionName}.zip`);``

148.          `await fs.copy(this.userDataDir, this.tempDir).catch(() => {});`
149.          `await this.deleteMetadata();`
150.          `return new Promise((resolve, reject) => {`
151.              `archive`
152.                  `.directory(this.tempDir, false)`
153.                  `.on('error', err => reject(err))`
154.                  `.pipe(stream);`

156.              `stream.on('close', () => resolve());`
157.              `archive.finalize();`
158.          `});`
159.      `}`

161.      `async unCompressSession(compressedSessionPath) {`
162.          `var stream = fs.createReadStream(compressedSessionPath);`
163.          `await new Promise((resolve, reject) => {`
164.              `stream.pipe(unzipper.Extract({`
165.                  `path: this.userDataDir`
166.              `}))`
167.                  `.on('error', err => reject(err))`
168.                  `.on('finish', () => resolve());`
169.          `});`
170.          `await fs.promises.unlink(compressedSessionPath);`
171.      `}`

173.      `async deleteMetadata() {`
174.          `const sessionDirs = [this.tempDir, path.join(this.tempDir, 'Default')];`
175.          `for (const dir of sessionDirs) {`
176.              `const sessionFiles = await fs.promises.readdir(dir);`
177.              `for (const element of sessionFiles) {`
178.                  `if (!this.requiredDirs.includes(element)) {`
179.                      `const dirElement = path.join(dir, element);`
180.                      `const stats = await fs.promises.lstat(dirElement);`

182.                      `if (stats.isDirectory()) {`
183.                          `await fs.promises.rm(dirElement, {`
184.                              `recursive: true,`
185.                              `force: true,`
186.                              `maxRetries: this.rmMaxRetries,`
187.                          `}).catch(() => {});`
188.                      `} else {`
189.                          `await fs.promises.unlink(dirElement).catch(() => {});`
190.                      `}`
191.                  `}`
192.              `}`
193.          `}`
194.      `}`

196.      `async isValidPath(path) {`
197.          `try {`
198.              `await fs.promises.access(path);`
199.              `return true;`
200.          `} catch {`
201.              `return false;`
202.          `}`
203.      `}`

205.      `async delay(ms) {`
206.          `return new Promise(resolve => setTimeout(resolve, ms));`
207.      `}`
208.  `}`

210.  `module.exports = RemoteAuth;`