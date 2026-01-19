Source: https://docs.wwebjs.dev/authStrategies_LocalAuth.js.html#source-line-14

1.  `'use strict';`

3.  `const path = require('path');`
4.  `const fs = require('fs');`
5.  `const BaseAuthStrategy = require('./BaseAuthStrategy');`

7.  `/**`
8.   `* Local directory-based authentication`
9.   `* @param {object} options - options`
10.   `* @param {string} options.clientId - Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance`
11.   `* @param {string} options.dataPath - Change the default path for saving session files, default is: "./.wwebjs_auth/"` 
12.   `* @param {number} options.rmMaxRetries - Sets the maximum number of retries for removing the session directory`
13.  `*/`
14.  `class LocalAuth extends BaseAuthStrategy {`
15.      `constructor({ clientId, dataPath, rmMaxRetries }={}) {`
16.          `super();`

18.          `const idRegex = /^[-_\w]+$/i;`
19.          `if(clientId &amp;&amp; !idRegex.test(clientId)) {`
20.              `throw new Error('Invalid clientId. Only alphanumeric characters, underscores and hyphens are allowed.');`
21.          `}`

23.          `this.dataPath = path.resolve(dataPath || './.wwebjs_auth/');`
24.          `this.clientId = clientId;`
25.          `this.rmMaxRetries = rmMaxRetries ?? 4;`
26.      `}`

28.      `async beforeBrowserInitialized() {`
29.          `const puppeteerOpts = this.client.options.puppeteer;`
30.          ``const sessionDirName = this.clientId ? `session-${this.clientId}` : 'session';``
31.          `const dirPath = path.join(this.dataPath, sessionDirName);`

33.          `if(puppeteerOpts.userDataDir &amp;&amp; puppeteerOpts.userDataDir !== dirPath) {`
34.              `throw new Error('LocalAuth is not compatible with a user-supplied userDataDir.');`
35.          `}`

37.          `fs.mkdirSync(dirPath, { recursive: true });`

39.          `this.client.options.puppeteer = {`
40.              `...puppeteerOpts,`
41.              `userDataDir: dirPath`
42.          `};`

44.          `this.userDataDir = dirPath;`
45.      `}`

47.      `async logout() {`
48.          `if (this.userDataDir) {`
49.              `await fs.promises.rm(this.userDataDir, { recursive: true, force: true, maxRetries: this.rmMaxRetries })`
50.                  `.catch((e) => {`
51.                      `throw new Error(e);`
52.                  `});`
53.          `}`
54.      `}`

56.  `}`

58.  `module.exports = LocalAuth;`