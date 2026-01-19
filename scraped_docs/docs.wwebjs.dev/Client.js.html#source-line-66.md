Source: https://docs.wwebjs.dev/Client.js.html#source-line-66

1.  `'use strict';`

3.  `const EventEmitter = require('events');`
4.  `const puppeteer = require('puppeteer');`
5.  `const moduleRaid = require('@pedroslopez/moduleraid/moduleraid');`

7.  `const Util = require('./util/Util');`
8.  `const InterfaceController = require('./util/InterfaceController');`
9.  `const { WhatsWebURL, DefaultOptions, Events, WAState, MessageTypes } = require('./util/Constants');`
10.  `const { ExposeAuthStore } = require('./util/Injected/AuthStore/AuthStore');`
11.  `const { ExposeStore } = require('./util/Injected/Store');`
12.  `const { ExposeLegacyAuthStore } = require('./util/Injected/AuthStore/LegacyAuthStore');`
13.  `const { ExposeLegacyStore } = require('./util/Injected/LegacyStore');`
14.  `const { LoadUtils } = require('./util/Injected/Utils');`
15.  `const ChatFactory = require('./factories/ChatFactory');`
16.  `const ContactFactory = require('./factories/ContactFactory');`
17.  `const WebCacheFactory = require('./webCache/WebCacheFactory');`
18.  `const { ClientInfo, Message, MessageMedia, Contact, Location, Poll, PollVote, GroupNotification, Label, Call, Buttons, List, Reaction, Broadcast, ScheduledEvent } = require('./structures');`
19.  `const NoAuth = require('./authStrategies/NoAuth');`
20.  `const {exposeFunctionIfAbsent} = require('./util/Puppeteer');`

22.  `/**`
23.   `* Starting point for interacting with the WhatsApp Web API`
24.   `* @extends {EventEmitter}`
25.   `* @param {object} options - Client options`
26.   `* @param {AuthStrategy} options.authStrategy - Determines how to save and restore sessions. Will use LegacySessionAuth if options.session is set. Otherwise, NoAuth will be used.`
27.   `* @param {string} options.webVersion - The version of WhatsApp Web to use. Use options.webVersionCache to configure how the version is retrieved.`
28.   `* @param {object} options.webVersionCache - Determines how to retrieve the WhatsApp Web version. Defaults to a local cache (LocalWebCache) that falls back to latest if the requested version is not found.`
29.   `* @param {number} options.authTimeoutMs - Timeout for authentication selector in puppeteer`
30.   `* @param {function} options.evalOnNewDoc - function to eval on new doc`
31.   `* @param {object} options.puppeteer - Puppeteer launch options. View docs here: https://github.com/puppeteer/puppeteer/`
32.   `* @param {number} options.qrMaxRetries - How many times should the qrcode be refreshed before giving up`
33.   `* @param {string} options.restartOnAuthFail  - @deprecated This option should be set directly on the LegacySessionAuth.`
34.   `* @param {object} options.session - @deprecated Only here for backwards-compatibility. You should move to using LocalAuth, or set the authStrategy to LegacySessionAuth explicitly.` 
35.   `* @param {number} options.takeoverOnConflict - If another whatsapp web session is detected (another browser), take over the session in the current browser`
36.   `* @param {number} options.takeoverTimeoutMs - How much time to wait before taking over the session`
37.   `* @param {string} options.userAgent - User agent to use in puppeteer`
38.   `* @param {string} options.ffmpegPath - Ffmpeg path to use when formatting videos to webp while sending stickers` 
39.   `* @param {boolean} options.bypassCSP - Sets bypassing of page's Content-Security-Policy.`
40.   `* @param {string} options.deviceName - Sets the device name of a current linked device., i.e.: 'TEST'.`
41.   `* @param {string} options.browserName - Sets the browser name of a current linked device, i.e.: 'Firefox'.`
42.   `* @param {object} options.proxyAuthentication - Proxy Authentication object.`
43.   `*` 
44.   `* @fires Client#qr`
45.   `* @fires Client#authenticated`
46.   `* @fires Client#auth_failure`
47.   `* @fires Client#ready`
48.   `* @fires Client#message`
49.   `* @fires Client#message_ack`
50.   `* @fires Client#message_create`
51.   `* @fires Client#message_revoke_me`
52.   `* @fires Client#message_revoke_everyone`
53.   `* @fires Client#message_ciphertext`
54.   `* @fires Client#message_edit`
55.   `* @fires Client#media_uploaded`
56.   `* @fires Client#group_join`
57.   `* @fires Client#group_leave`
58.   `* @fires Client#group_update`
59.   `* @fires Client#disconnected`
60.   `* @fires Client#change_state`
61.   `* @fires Client#contact_changed`
62.   `* @fires Client#group_admin_changed`
63.   `* @fires Client#group_membership_request`
64.   `* @fires Client#vote_update`
65.   `*/`
66.  `class Client extends EventEmitter {`
67.      `constructor(options = {}) {`
68.          `super();`

70.          `this.options = Util.mergeDefault(DefaultOptions, options);`

72.          `if(!this.options.authStrategy) {`
73.              `this.authStrategy = new NoAuth();`
74.          `} else {`
75.              `this.authStrategy = this.options.authStrategy;`
76.          `}`

78.          `this.authStrategy.setup(this);`

80.          `/**`
81.           `* @type {puppeteer.Browser}`
82.           `*/`
83.          `this.pupBrowser = null;`
84.          `/**`
85.           `* @type {puppeteer.Page}`
86.           `*/`
87.          `this.pupPage = null;`

89.          `this.currentIndexHtml = null;`
90.          `this.lastLoggedOut = false;`

92.          `Util.setFfmpegPath(this.options.ffmpegPath);`
93.      `}`
94.      `/**`
95.       `* Injection logic`
96.       `* Private function`
97.       `*/`
98.      `async inject() {`
99.          `if(this.options.authTimeoutMs === undefined || this.options.authTimeoutMs==0){`
100.              `this.options.authTimeoutMs = 30000;`
101.          `}`
102.          `let start = Date.now();`
103.          `let timeout = this.options.authTimeoutMs;`
104.          `let res = false;`
105.          `while(start > (Date.now() - timeout)){`
106.              `res = await this.pupPage.evaluate('window.Debug?.VERSION != undefined');`
107.              `if(res){break;}`
108.              `await new Promise(r => setTimeout(r, 200));`
109.          `}`
110.          `if(!res){` 
111.              `throw 'auth timeout';`
112.          `}`       
113.          `await this.setDeviceName(this.options.deviceName, this.options.browserName);`
114.          `const pairWithPhoneNumber = this.options.pairWithPhoneNumber;`
115.          `const version = await this.getWWebVersion();`
116.          `const isCometOrAbove = parseInt(version.split('.')?.[1]) >= 3000;`

118.          `if (isCometOrAbove) {`
119.              `await this.pupPage.evaluate(ExposeAuthStore);`
120.          `} else {`
121.              `await this.pupPage.evaluate(ExposeLegacyAuthStore, moduleRaid.toString());`
122.          `}`

124.          `const needAuthentication = await this.pupPage.evaluate(async () => {`
125.              `let state = window.AuthStore.AppState.state;`

127.              `if (state === 'OPENING' || state === 'UNLAUNCHED' || state === 'PAIRING') {`
128.                  `// wait till state changes`
129.                  `await new Promise(r => {`
130.                      `window.AuthStore.AppState.on('change:state', function waitTillInit(_AppState, state) {`
131.                          `if (state !== 'OPENING' &amp;&amp; state !== 'UNLAUNCHED' &amp;&amp; state !== 'PAIRING') {`
132.                              `window.AuthStore.AppState.off('change:state', waitTillInit);`
133.                              `r();`
134.                          `}` 
135.                      `});`
136.                  `});` 
137.              `}`
138.              `state = window.AuthStore.AppState.state;`
139.              `return state == 'UNPAIRED' || state == 'UNPAIRED_IDLE';`
140.          `});`

142.          `if (needAuthentication) {`
143.              `const { failed, failureEventPayload, restart } = await this.authStrategy.onAuthenticationNeeded();`

145.              `if(failed) {`
146.                  `/**`
147.                   `* Emitted when there has been an error while trying to restore an existing session`
148.                   `* @event Client#auth_failure`
149.                   `* @param {string} message`
150.                   `*/`
151.                  `this.emit(Events.AUTHENTICATION_FAILURE, failureEventPayload);`
152.                  `await this.destroy();`
153.                  `if (restart) {`
154.                      `// session restore failed so try again but without session to force new authentication`
155.                      `return this.initialize();`
156.                  `}`
157.                  `return;`
158.              `}`

160.              `// Register qr/code events`
161.              `if (pairWithPhoneNumber.phoneNumber) {`
162.                  `await exposeFunctionIfAbsent(this.pupPage, 'onCodeReceivedEvent', async (code) => {`
163.                      `/**`
164.                      `* Emitted when a pairing code is received`
165.                      `* @event Client#code`
166.                      `* @param {string} code Code`
167.                      `* @returns {string} Code that was just received`
168.                      `*/`
169.                      `this.emit(Events.CODE_RECEIVED, code);`
170.                      `return code;`
171.                  `});`
172.                  `this.requestPairingCode(pairWithPhoneNumber.phoneNumber, pairWithPhoneNumber.showNotification, pairWithPhoneNumber.intervalMs);`
173.              `} else {`
174.                  `let qrRetries = 0;`
175.                  `await exposeFunctionIfAbsent(this.pupPage, 'onQRChangedEvent', async (qr) => {`
176.                      `/**`
177.                      `* Emitted when a QR code is received`
178.                      `* @event Client#qr`
179.                      `* @param {string} qr QR Code`
180.                      `*/`
181.                      `this.emit(Events.QR_RECEIVED, qr);`
182.                      `if (this.options.qrMaxRetries > 0) {`
183.                          `qrRetries++;`
184.                          `if (qrRetries > this.options.qrMaxRetries) {`
185.                              `this.emit(Events.DISCONNECTED, 'Max qrcode retries reached');`
186.                              `await this.destroy();`
187.                          `}`
188.                      `}`
189.                  `});`

192.                  `await this.pupPage.evaluate(async () => {`
193.                      `const registrationInfo = await window.AuthStore.RegistrationUtils.waSignalStore.getRegistrationInfo();`
194.                      `const noiseKeyPair = await window.AuthStore.RegistrationUtils.waNoiseInfo.get();`
195.                      `const staticKeyB64 = window.AuthStore.Base64Tools.encodeB64(noiseKeyPair.staticKeyPair.pubKey);`
196.                      `const identityKeyB64 = window.AuthStore.Base64Tools.encodeB64(registrationInfo.identityKeyPair.pubKey);`
197.                      `const advSecretKey = await window.AuthStore.RegistrationUtils.getADVSecretKey();`
198.                      `const platform = window.AuthStore.RegistrationUtils.DEVICE_PLATFORM;`
199.                      `const getQR = (ref) => ref + ',' + staticKeyB64 + ',' + identityKeyB64 + ',' + advSecretKey + ',' + platform;`

201.                      `window.onQRChangedEvent(getQR(window.AuthStore.Conn.ref)); // initial qr`
202.                      `window.AuthStore.Conn.on('change:ref', (_, ref) => { window.onQRChangedEvent(getQR(ref)); }); // future QR changes`
203.                  `});`
204.              `}`
205.          `}`

207.          `await exposeFunctionIfAbsent(this.pupPage, 'onAuthAppStateChangedEvent', async (state) => {`
208.              `if (state == 'UNPAIRED_IDLE' &amp;&amp; !pairWithPhoneNumber.phoneNumber) {`
209.                  `// refresh qr code`
210.                  `window.Store.Cmd.refreshQR();`
211.              `}`
212.          `});`

214.          `await exposeFunctionIfAbsent(this.pupPage, 'onAppStateHasSyncedEvent', async () => {`
215.              `const authEventPayload = await this.authStrategy.getAuthEventPayload();`
216.              `/**`
217.                   `* Emitted when authentication is successful`
218.                   `* @event Client#authenticated`
219.                   `*/`
220.              `this.emit(Events.AUTHENTICATED, authEventPayload);`

222.              `const injected = await this.pupPage.evaluate(async () => {`
223.                  `return typeof window.Store !== 'undefined' &amp;&amp; typeof window.WWebJS !== 'undefined';`
224.              `});`

226.              `if (!injected) {`
227.                  `if (this.options.webVersionCache.type === 'local' &amp;&amp; this.currentIndexHtml) {`
228.                      `const { type: webCacheType, ...webCacheOptions } = this.options.webVersionCache;`
229.                      `const webCache = WebCacheFactory.createWebCache(webCacheType, webCacheOptions);`

231.                      `await webCache.persist(this.currentIndexHtml, version);`
232.                  `}`

234.                  `if (isCometOrAbove) {`
235.                      `await this.pupPage.evaluate(ExposeStore);`
236.                  `} else {`
237.                      `// make sure all modules are ready before injection`
238.                      `// 2 second delay after authentication makes sense and does not need to be made dyanmic or removed`
239.                      `await new Promise(r => setTimeout(r, 2000));` 
240.                      `await this.pupPage.evaluate(ExposeLegacyStore);`
241.                  `}`
242.                  `let start = Date.now();`
243.                  `let res = false;`
244.                  `while(start > (Date.now() - 30000)){`
245.                      `// Check window.Store Injection`
246.                      `res = await this.pupPage.evaluate('window.Store != undefined');`
247.                      `if(res){break;}`
248.                      `await new Promise(r => setTimeout(r, 200));`
249.                  `}`
250.                  `if(!res){`
251.                      `throw 'ready timeout';`
252.                  `}`

254.                  `/**`
255.                       `* Current connection information`
256.                       `* @type {ClientInfo}`
257.                       `*/`
258.                  `this.info = new ClientInfo(this, await this.pupPage.evaluate(() => {`
259.                      `return { ...window.Store.Conn.serialize(), wid: window.Store.User.getMaybeMePnUser() || window.Store.User.getMaybeMeLidUser() };`
260.                  `}));`

262.                  `this.interface = new InterfaceController(this);`

264.                  `//Load util functions (serializers, helper functions)`
265.                  `await this.pupPage.evaluate(LoadUtils);`

267.                  `await this.attachEventListeners();`
268.              `}`
269.              `/**`
270.                   `* Emitted when the client has initialized and is ready to receive messages.`
271.                   `* @event Client#ready`
272.                   `*/`
273.              `this.emit(Events.READY);`
274.              `this.authStrategy.afterAuthReady();`
275.          `});`
276.          `let lastPercent = null;`
277.          `await exposeFunctionIfAbsent(this.pupPage, 'onOfflineProgressUpdateEvent', async (percent) => {`
278.              `if (lastPercent !== percent) {`
279.                  `lastPercent = percent;`
280.                  `this.emit(Events.LOADING_SCREEN, percent, 'WhatsApp'); // Message is hardcoded as "WhatsApp" for now`
281.              `}`
282.          `});`
283.          `await exposeFunctionIfAbsent(this.pupPage, 'onLogoutEvent', async () => {`
284.              `this.lastLoggedOut = true;`
285.              `await this.pupPage.waitForNavigation({waitUntil: 'load', timeout: 5000}).catch((_) => _);`
286.          `});`
287.          `await this.pupPage.evaluate(() => {`
288.              `window.AuthStore.AppState.on('change:state', (_AppState, state) => { window.onAuthAppStateChangedEvent(state); });`
289.              `window.AuthStore.AppState.on('change:hasSynced', () => { window.onAppStateHasSyncedEvent(); });`
290.              `window.AuthStore.Cmd.on('offline_progress_update', () => {`
291.                  `window.onOfflineProgressUpdateEvent(window.AuthStore.OfflineMessageHandler.getOfflineDeliveryProgress());` 
292.              `});`
293.              `window.AuthStore.Cmd.on('logout', async () => {`
294.                  `await window.onLogoutEvent();`
295.              `});`
296.          `});`
297.      `}`

299.      `/**`
300.       `* Sets up events and requirements, kicks off authentication request`
301.       `*/`
302.      `async initialize() {`

304.          `let` 
305.              `/**`
306.               `* @type {puppeteer.Browser}`
307.               `*/`
308.              `browser,` 
309.              `/**`
310.               `* @type {puppeteer.Page}`
311.               `*/`
312.              `page;`

314.          `browser = null;`
315.          `page = null;`

317.          `await this.authStrategy.beforeBrowserInitialized();`

319.          `const puppeteerOpts = this.options.puppeteer;`
320.          `if (puppeteerOpts &amp;&amp; (puppeteerOpts.browserWSEndpoint || puppeteerOpts.browserURL)) {`
321.              `browser = await puppeteer.connect(puppeteerOpts);`
322.              `page = await browser.newPage();`
323.          `} else {`
324.              `const browserArgs = [...(puppeteerOpts.args || [])];`
325.              `if(this.options.userAgent !== false &amp;&amp; !browserArgs.find(arg => arg.includes('--user-agent'))) {`
326.                  ``browserArgs.push(`--user-agent=${this.options.userAgent}`);``
327.              `}`
328.              `// navigator.webdriver fix`
329.              `browserArgs.push('--disable-blink-features=AutomationControlled');`

331.              `browser = await puppeteer.launch({...puppeteerOpts, args: browserArgs});`
332.              `page = (await browser.pages())[0];`
333.          `}`

335.          `if (this.options.proxyAuthentication !== undefined) {`
336.              `await page.authenticate(this.options.proxyAuthentication);`
337.          `}`
338.          `if(this.options.userAgent !== false) {`
339.              `await page.setUserAgent(this.options.userAgent);`
340.          `}`
341.          `if (this.options.bypassCSP) await page.setBypassCSP(true);`

343.          `this.pupBrowser = browser;`
344.          `this.pupPage = page;`

346.          `await this.authStrategy.afterBrowserInitialized();`
347.          `await this.initWebVersionCache();`

349.          `if (this.options.evalOnNewDoc !== undefined) {`
350.              `await page.evaluateOnNewDocument(this.options.evalOnNewDoc);`
351.          `}`

353.          `// ocVersion (isOfficialClient patch)`
354.          `// remove after 2.3000.x hard release`
355.          `await page.evaluateOnNewDocument(() => {`
356.              `const originalError = Error;`
357.              `window.originalError = originalError;`
358.              `//eslint-disable-next-line no-global-assign`
359.              `Error = function (message) {`
360.                  `const error = new originalError(message);`
361.                  `const originalStack = error.stack;`
362.                  `if (error.stack.includes('moduleRaid')) error.stack = originalStack + '\n    at https://web.whatsapp.com/vendors~lazy_loaded_low_priority_components.05e98054dbd60f980427.js:2:44';`
363.                  `return error;`
364.              `};`
365.          `});`

367.          `await page.goto(WhatsWebURL, {`
368.              `waitUntil: 'load',`
369.              `timeout: 0,`
370.              `referer: 'https://whatsapp.com/'`
371.          `});`

373.          `await this.inject();`

375.          `this.pupPage.on('framenavigated', async (frame) => {`
376.              `if(frame.url().includes('post_logout=1') || this.lastLoggedOut) {`
377.                  `this.emit(Events.DISCONNECTED, 'LOGOUT');`
378.                  `await this.authStrategy.logout();`
379.                  `await this.authStrategy.beforeBrowserInitialized();`
380.                  `await this.authStrategy.afterBrowserInitialized();`
381.                  `this.lastLoggedOut = false;`
382.              `}`
383.              `await this.inject();`
384.          `});`
385.      `}`

387.      `/**`
388.       `* Request authentication via pairing code instead of QR code`
389.       `* @param {string} phoneNumber - Phone number in international, symbol-free format (e.g. 12025550108 for US, 551155501234 for Brazil)`
390.       `* @param {boolean} [showNotification = true] - Show notification to pair on phone number`
391.       `* @param {number} [intervalMs = 180000] - The interval in milliseconds on how frequent to generate pairing code (WhatsApp default to 3 minutes)`
392.       `* @returns {Promise&lt;string>} - Returns a pairing code in format "ABCDEFGH"`
393.       `*/`
394.      `async requestPairingCode(phoneNumber, showNotification = true, intervalMs = 180000) {`
395.          `return await this.pupPage.evaluate(async (phoneNumber, showNotification, intervalMs) => {`
396.              `const getCode = async () => {`
397.                  `while (!window.AuthStore.PairingCodeLinkUtils) {`
398.                      `await new Promise(resolve => setTimeout(resolve, 250));`
399.                  `}`
400.                  `window.AuthStore.PairingCodeLinkUtils.setPairingType('ALT_DEVICE_LINKING');`
401.                  `await window.AuthStore.PairingCodeLinkUtils.initializeAltDeviceLinking();`
402.                  `return window.AuthStore.PairingCodeLinkUtils.startAltLinkingFlow(phoneNumber, showNotification);`
403.              `};`
404.              `if (window.codeInterval) {`
405.                  `clearInterval(window.codeInterval); // remove existing interval`
406.              `}`
407.              `window.codeInterval = setInterval(async () => {`
408.                  `if (window.AuthStore.AppState.state != 'UNPAIRED' &amp;&amp; window.AuthStore.AppState.state != 'UNPAIRED_IDLE') {`
409.                      `clearInterval(window.codeInterval);`
410.                      `return;`
411.                  `}`
412.                  `window.onCodeReceivedEvent(await getCode());`
413.              `}, intervalMs);`
414.              `return window.onCodeReceivedEvent(await getCode());`
415.          `}, phoneNumber, showNotification, intervalMs);`
416.      `}`

418.      `/**`
419.       `* Attach event listeners to WA Web`
420.       `* Private function`
421.       `* @property {boolean} reinject is this a reinject?`
422.       `*/`
423.      `async attachEventListeners() {`
424.          `await exposeFunctionIfAbsent(this.pupPage, 'onAddMessageEvent', msg => {`
425.              `if (msg.type === 'gp2') {`
426.                  `const notification = new GroupNotification(this, msg);`
427.                  `if (['add', 'invite', 'linked_group_join'].includes(msg.subtype)) {`
428.                      `/**`
429.                           `* Emitted when a user joins the chat via invite link or is added by an admin.`
430.                           `* @event Client#group_join`
431.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
432.                           `*/`
433.                      `this.emit(Events.GROUP_JOIN, notification);`
434.                  `} else if (msg.subtype === 'remove' || msg.subtype === 'leave') {`
435.                      `/**`
436.                           `* Emitted when a user leaves the chat or is removed by an admin.`
437.                           `* @event Client#group_leave`
438.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
439.                           `*/`
440.                      `this.emit(Events.GROUP_LEAVE, notification);`
441.                  `} else if (msg.subtype === 'promote' || msg.subtype === 'demote') {`
442.                      `/**`
443.                           `* Emitted when a current user is promoted to an admin or demoted to a regular user.`
444.                           `* @event Client#group_admin_changed`
445.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
446.                           `*/`
447.                      `this.emit(Events.GROUP_ADMIN_CHANGED, notification);`
448.                  `} else if (msg.subtype === 'membership_approval_request') {`
449.                      `/**`
450.                           `* Emitted when some user requested to join the group`
451.                           `* that has the membership approval mode turned on`
452.                           `* @event Client#group_membership_request`
453.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
454.                           `* @param {string} notification.chatId The group ID the request was made for`
455.                           `* @param {string} notification.author The user ID that made a request`
456.                           `* @param {number} notification.timestamp The timestamp the request was made at`
457.                           `*/`
458.                      `this.emit(Events.GROUP_MEMBERSHIP_REQUEST, notification);`
459.                  `} else {`
460.                      `/**`
461.                           `* Emitted when group settings are updated, such as subject, description or picture.`
462.                           `* @event Client#group_update`
463.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
464.                           `*/`
465.                      `this.emit(Events.GROUP_UPDATE, notification);`
466.                  `}`
467.                  `return;`
468.              `}`

470.              `const message = new Message(this, msg);`

472.              `/**`
473.                   `* Emitted when a new message is created, which may include the current user's own messages.`
474.                   `* @event Client#message_create`
475.                   `* @param {Message} message The message that was created`
476.                   `*/`
477.              `this.emit(Events.MESSAGE_CREATE, message);`

479.              `if (msg.id.fromMe) return;`

481.              `/**`
482.                   `* Emitted when a new message is received.`
483.                   `* @event Client#message`
484.                   `* @param {Message} message The message that was received`
485.                   `*/`
486.              `this.emit(Events.MESSAGE_RECEIVED, message);`
487.          `});`

489.          `let last_message;`

491.          `await exposeFunctionIfAbsent(this.pupPage, 'onChangeMessageTypeEvent', (msg) => {`

493.              `if (msg.type === 'revoked') {`
494.                  `const message = new Message(this, msg);`
495.                  `let revoked_msg;`
496.                  `if (last_message &amp;&amp; msg.id.id === last_message.id.id) {`
497.                      `revoked_msg = new Message(this, last_message);`

499.                      `if (message.protocolMessageKey)`
500.                          `revoked_msg.id = { ...message.protocolMessageKey };`                    
501.                  `}`

503.                  `/**`
504.                       `* Emitted when a message is deleted for everyone in the chat.`
505.                       `* @event Client#message_revoke_everyone`
506.                       `* @param {Message} message The message that was revoked, in its current state. It will not contain the original message's data.`
507.                       `* @param {?Message} revoked_msg The message that was revoked, before it was revoked. It will contain the message's original data.` 
508.                       `* Note that due to the way this data is captured, it may be possible that this param will be undefined.`
509.                       `*/`
510.                  `this.emit(Events.MESSAGE_REVOKED_EVERYONE, message, revoked_msg);`
511.              `}`

513.          `});`

515.          `await exposeFunctionIfAbsent(this.pupPage, 'onChangeMessageEvent', (msg) => {`

517.              `if (msg.type !== 'revoked') {`
518.                  `last_message = msg;`
519.              `}`

521.              `/**`
522.                   `* The event notification that is received when one of`
523.                   `* the group participants changes their phone number.`
524.                   `*/`
525.              `const isParticipant = msg.type === 'gp2' &amp;&amp; msg.subtype === 'modify';`

527.              `/**`
528.                   `* The event notification that is received when one of`
529.                   `* the contacts changes their phone number.`
530.                   `*/`
531.              `const isContact = msg.type === 'notification_template' &amp;&amp; msg.subtype === 'change_number';`

533.              `if (isParticipant || isContact) {`
534.                  `/** @type {GroupNotification} object does not provide enough information about this event, so a @type {Message} object is used. */`
535.                  `const message = new Message(this, msg);`

537.                  `const newId = isParticipant ? msg.recipients[0] : msg.to;`
538.                  `const oldId = isParticipant ? msg.author : msg.templateParams.find(id => id !== newId);`

540.                  `/**`
541.                       `* Emitted when a contact or a group participant changes their phone number.`
542.                       `* @event Client#contact_changed`
543.                       `* @param {Message} message Message with more information about the event.`
544.                       `* @param {String} oldId The user's id (an old one) who changed their phone number`
545.                       `* and who triggered the notification.`
546.                       `* @param {String} newId The user's new id after the change.`
547.                       `* @param {Boolean} isContact Indicates if a contact or a group participant changed their phone number.`
548.                       `*/`
549.                  `this.emit(Events.CONTACT_CHANGED, message, oldId, newId, isContact);`
550.              `}`
551.          `});`

553.          `await exposeFunctionIfAbsent(this.pupPage, 'onRemoveMessageEvent', (msg) => {`

555.              `if (!msg.isNewMsg) return;`

557.              `const message = new Message(this, msg);`

559.              `/**`
560.                   `* Emitted when a message is deleted by the current user.`
561.                   `* @event Client#message_revoke_me`
562.                   `* @param {Message} message The message that was revoked`
563.                   `*/`
564.              `this.emit(Events.MESSAGE_REVOKED_ME, message);`

566.          `});`

568.          `await exposeFunctionIfAbsent(this.pupPage, 'onMessageAckEvent', (msg, ack) => {`

570.              `const message = new Message(this, msg);`

572.              `/**`
573.                   `* Emitted when an ack event occurrs on message type.`
574.                   `* @event Client#message_ack`
575.                   `* @param {Message} message The message that was affected`
576.                   `* @param {MessageAck} ack The new ACK value`
577.                   `*/`
578.              `this.emit(Events.MESSAGE_ACK, message, ack);`

580.          `});`

582.          `await exposeFunctionIfAbsent(this.pupPage, 'onChatUnreadCountEvent', async (data) =>{`
583.              `const chat = await this.getChatById(data.id);`

585.              `/**`
586.                   `* Emitted when the chat unread count changes`
587.                   `*/`
588.              `this.emit(Events.UNREAD_COUNT, chat);`
589.          `});`

591.          `await exposeFunctionIfAbsent(this.pupPage, 'onMessageMediaUploadedEvent', (msg) => {`

593.              `const message = new Message(this, msg);`

595.              `/**`
596.                   `* Emitted when media has been uploaded for a message sent by the client.`
597.                   `* @event Client#media_uploaded`
598.                   `* @param {Message} message The message with media that was uploaded`
599.                   `*/`
600.              `this.emit(Events.MEDIA_UPLOADED, message);`
601.          `});`

603.          `await exposeFunctionIfAbsent(this.pupPage, 'onAppStateChangedEvent', async (state) => {`
604.              `/**`
605.                   `* Emitted when the connection state changes`
606.                   `* @event Client#change_state`
607.                   `* @param {WAState} state the new connection state`
608.                   `*/`
609.              `this.emit(Events.STATE_CHANGED, state);`

611.              `const ACCEPTED_STATES = [WAState.CONNECTED, WAState.OPENING, WAState.PAIRING, WAState.TIMEOUT];`

613.              `if (this.options.takeoverOnConflict) {`
614.                  `ACCEPTED_STATES.push(WAState.CONFLICT);`

616.                  `if (state === WAState.CONFLICT) {`
617.                      `setTimeout(() => {`
618.                          `this.pupPage.evaluate(() => window.Store.AppState.takeover());`
619.                      `}, this.options.takeoverTimeoutMs);`
620.                  `}`
621.              `}`

623.              `if (!ACCEPTED_STATES.includes(state)) {`
624.                  `/**`
625.                       `* Emitted when the client has been disconnected`
626.                       `* @event Client#disconnected`
627.                       `* @param {WAState|"LOGOUT"} reason reason that caused the disconnect`
628.                       `*/`
629.                  `await this.authStrategy.disconnect();`
630.                  `this.emit(Events.DISCONNECTED, state);`
631.                  `this.destroy();`
632.              `}`
633.          `});`

635.          `await exposeFunctionIfAbsent(this.pupPage, 'onBatteryStateChangedEvent', (state) => {`
636.              `const { battery, plugged } = state;`

638.              `if (battery === undefined) return;`

640.              `/**`
641.                   `* Emitted when the battery percentage for the attached device changes. Will not be sent if using multi-device.`
642.                   `* @event Client#change_battery`
643.                   `* @param {object} batteryInfo`
644.                   `* @param {number} batteryInfo.battery - The current battery percentage`
645.                   `* @param {boolean} batteryInfo.plugged - Indicates if the phone is plugged in (true) or not (false)`
646.                   `* @deprecated`
647.                   `*/`
648.              `this.emit(Events.BATTERY_CHANGED, { battery, plugged });`
649.          `});`

651.          `await exposeFunctionIfAbsent(this.pupPage, 'onIncomingCall', (call) => {`
652.              `/**`
653.                   `* Emitted when a call is received`
654.                   `* @event Client#incoming_call`
655.                   `* @param {object} call`
656.                   `* @param {number} call.id - Call id`
657.                   `* @param {string} call.peerJid - Who called`
658.                   `* @param {boolean} call.isVideo - if is video`
659.                   `* @param {boolean} call.isGroup - if is group`
660.                   `* @param {boolean} call.canHandleLocally - if we can handle in waweb`
661.                   `* @param {boolean} call.outgoing - if is outgoing`
662.                   `* @param {boolean} call.webClientShouldHandle - If Waweb should handle`
663.                   `* @param {object} call.participants - Participants`
664.                   `*/`
665.              `const cll = new Call(this, call);`
666.              `this.emit(Events.INCOMING_CALL, cll);`
667.          `});`

669.          `await exposeFunctionIfAbsent(this.pupPage, 'onReaction', (reactions) => {`
670.              `for (const reaction of reactions) {`
671.                  `/**`
672.                       `* Emitted when a reaction is sent, received, updated or removed`
673.                       `* @event Client#message_reaction`
674.                       `* @param {object} reaction`
675.                       `* @param {object} reaction.id - Reaction id`
676.                       `* @param {number} reaction.orphan - Orphan`
677.                       `* @param {?string} reaction.orphanReason - Orphan reason`
678.                       `* @param {number} reaction.timestamp - Timestamp`
679.                       `* @param {string} reaction.reaction - Reaction`
680.                       `* @param {boolean} reaction.read - Read`
681.                       `* @param {object} reaction.msgId - Parent message id`
682.                       `* @param {string} reaction.senderId - Sender id`
683.                       `* @param {?number} reaction.ack - Ack`
684.                       `*/`

686.                  `this.emit(Events.MESSAGE_REACTION, new Reaction(this, reaction));`
687.              `}`
688.          `});`

690.          `await exposeFunctionIfAbsent(this.pupPage, 'onRemoveChatEvent', async (chat) => {`
691.              `const _chat = await this.getChatById(chat.id);`

693.              `/**`
694.                   `* Emitted when a chat is removed`
695.                   `* @event Client#chat_removed`
696.                   `* @param {Chat} chat`
697.                   `*/`
698.              `this.emit(Events.CHAT_REMOVED, _chat);`
699.          `});`

701.          `await exposeFunctionIfAbsent(this.pupPage, 'onArchiveChatEvent', async (chat, currState, prevState) => {`
702.              `const _chat = await this.getChatById(chat.id);`

704.              `/**`
705.                   `* Emitted when a chat is archived/unarchived`
706.                   `* @event Client#chat_archived`
707.                   `* @param {Chat} chat`
708.                   `* @param {boolean} currState`
709.                   `* @param {boolean} prevState`
710.                   `*/`
711.              `this.emit(Events.CHAT_ARCHIVED, _chat, currState, prevState);`
712.          `});`

714.          `await exposeFunctionIfAbsent(this.pupPage, 'onEditMessageEvent', (msg, newBody, prevBody) => {`

716.              `if(msg.type === 'revoked'){`
717.                  `return;`
718.              `}`
719.              `/**`
720.                   `* Emitted when messages are edited`
721.                   `* @event Client#message_edit`
722.                   `* @param {Message} message`
723.                   `* @param {string} newBody`
724.                   `* @param {string} prevBody`
725.                   `*/`
726.              `this.emit(Events.MESSAGE_EDIT, new Message(this, msg), newBody, prevBody);`
727.          `});`

729.          `await exposeFunctionIfAbsent(this.pupPage, 'onAddMessageCiphertextEvent', msg => {`

731.              `/**`
732.                   `* Emitted when messages are edited`
733.                   `* @event Client#message_ciphertext`
734.                   `* @param {Message} message`
735.                   `*/`
736.              `this.emit(Events.MESSAGE_CIPHERTEXT, new Message(this, msg));`
737.          `});`

739.          `await exposeFunctionIfAbsent(this.pupPage, 'onPollVoteEvent', (votes) => {`
740.              `for (const vote of votes) {`
741.                  `/**`
742.                   `* Emitted when some poll option is selected or deselected,`
743.                   `* shows a user's current selected option(s) on the poll`
744.                   `* @event Client#vote_update`
745.                   `*/`
746.                  `this.emit(Events.VOTE_UPDATE, new PollVote(this, vote));`
747.              `}`
748.          `});`

750.          `await this.pupPage.evaluate(() => {`
751.              `window.Store.Msg.on('change', (msg) => { window.onChangeMessageEvent(window.WWebJS.getMessageModel(msg)); });`
752.              `window.Store.Msg.on('change:type', (msg) => { window.onChangeMessageTypeEvent(window.WWebJS.getMessageModel(msg)); });`
753.              `window.Store.Msg.on('change:ack', (msg, ack) => { window.onMessageAckEvent(window.WWebJS.getMessageModel(msg), ack); });`
754.              `window.Store.Msg.on('change:isUnsentMedia', (msg, unsent) => { if (msg.id.fromMe &amp;&amp; !unsent) window.onMessageMediaUploadedEvent(window.WWebJS.getMessageModel(msg)); });`
755.              `window.Store.Msg.on('remove', (msg) => { if (msg.isNewMsg) window.onRemoveMessageEvent(window.WWebJS.getMessageModel(msg)); });`
756.              `window.Store.Msg.on('change:body change:caption', (msg, newBody, prevBody) => { window.onEditMessageEvent(window.WWebJS.getMessageModel(msg), newBody, prevBody); });`
757.              `window.Store.AppState.on('change:state', (_AppState, state) => { window.onAppStateChangedEvent(state); });`
758.              `window.Store.Conn.on('change:battery', (state) => { window.onBatteryStateChangedEvent(state); });`
759.              `window.Store.Call.on('add', (call) => { window.onIncomingCall(call); });`
760.              `window.Store.Chat.on('remove', async (chat) => { window.onRemoveChatEvent(await window.WWebJS.getChatModel(chat)); });`
761.              `window.Store.Chat.on('change:archive', async (chat, currState, prevState) => { window.onArchiveChatEvent(await window.WWebJS.getChatModel(chat), currState, prevState); });`
762.              `window.Store.Msg.on('add', (msg) => {` 
763.                  `if (msg.isNewMsg) {`
764.                      `if(msg.type === 'ciphertext') {`
765.                          `// defer message event until ciphertext is resolved (type changed)`
766.                          `msg.once('change:type', (_msg) => window.onAddMessageEvent(window.WWebJS.getMessageModel(_msg)));`
767.                          `window.onAddMessageCiphertextEvent(window.WWebJS.getMessageModel(msg));`
768.                      `} else {`
769.                          `window.onAddMessageEvent(window.WWebJS.getMessageModel(msg));` 
770.                      `}`
771.                  `}`
772.              `});`
773.              `window.Store.Chat.on('change:unreadCount', (chat) => {window.onChatUnreadCountEvent(chat);});`

775.              `if (window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.1014111620')) {`
776.                  `const module = window.Store.AddonReactionTable;`
777.                  `const ogMethod = module.bulkUpsert;`
778.                  `module.bulkUpsert = ((...args) => {`
779.                      `window.onReaction(args[0].map(reaction => {`
780.                          `const msgKey = reaction.id;`
781.                          `const parentMsgKey = reaction.reactionParentKey;`
782.                          `const timestamp = reaction.reactionTimestamp / 1000;`
783.                          `const sender = reaction.author ?? reaction.from;`
784.                          `const senderUserJid = sender._serialized;`

786.                          `return {...reaction, msgKey, parentMsgKey, senderUserJid, timestamp };`
787.                      `}));`

789.                      `return ogMethod(...args);`
790.                  `}).bind(module);`

792.                  `const pollVoteModule = window.Store.AddonPollVoteTable;`
793.                  `const ogPollVoteMethod = pollVoteModule.bulkUpsert;`

795.                  `pollVoteModule.bulkUpsert = (async (...args) => {`
796.                      `const votes = await Promise.all(args[0].map(async vote => {`
797.                          `const msgKey = vote.id;`
798.                          `const parentMsgKey = vote.pollUpdateParentKey;`
799.                          `const timestamp = vote.t / 1000;`
800.                          `const sender = vote.author ?? vote.from;`
801.                          `const senderUserJid = sender._serialized;`

803.                          `let parentMessage = window.Store.Msg.get(parentMsgKey._serialized);`
804.                          `if (!parentMessage) {`
805.                              `const fetched = await window.Store.Msg.getMessagesById([parentMsgKey._serialized]);`
806.                              `parentMessage = fetched?.messages?.[0] || null;`
807.                          `}`

809.                          `return {`
810.                              `...vote,`
811.                              `msgKey,`
812.                              `sender,`
813.                              `parentMsgKey,`
814.                              `senderUserJid,`
815.                              `timestamp,`
816.                              `parentMessage`
817.                          `};`
818.                      `}));`

820.                      `window.onPollVoteEvent(votes);`

822.                      `return ogPollVoteMethod.apply(pollVoteModule, args);`
823.                  `}).bind(pollVoteModule);`
824.              `} else {`
825.                  `const module = window.Store.createOrUpdateReactionsModule;`
826.                  `const ogMethod = module.createOrUpdateReactions;`
827.                  `module.createOrUpdateReactions = ((...args) => {`
828.                      `window.onReaction(args[0].map(reaction => {`
829.                          `const msgKey = window.Store.MsgKey.fromString(reaction.msgKey);`
830.                          `const parentMsgKey = window.Store.MsgKey.fromString(reaction.parentMsgKey);`
831.                          `const timestamp = reaction.timestamp / 1000;`

833.                          `return {...reaction, msgKey, parentMsgKey, timestamp };`
834.                      `}));`

836.                      `return ogMethod(...args);`
837.                  `}).bind(module);`
838.              `}`
839.          `});`
840.      `}`    

842.      `async initWebVersionCache() {`
843.          `const { type: webCacheType, ...webCacheOptions } = this.options.webVersionCache;`
844.          `const webCache = WebCacheFactory.createWebCache(webCacheType, webCacheOptions);`

846.          `const requestedVersion = this.options.webVersion;`
847.          `const versionContent = await webCache.resolve(requestedVersion);`

849.          `if(versionContent) {`
850.              `await this.pupPage.setRequestInterception(true);`
851.              `this.pupPage.on('request', async (req) => {`
852.                  `if(req.url() === WhatsWebURL) {`
853.                      `req.respond({`
854.                          `status: 200,`
855.                          `contentType: 'text/html',`
856.                          `body: versionContent`
857.                      `});` 
858.                  `} else {`
859.                      `req.continue();`
860.                  `}`
861.              `});`
862.          `} else {`
863.              `this.pupPage.on('response', async (res) => {`
864.                  `if(res.ok() &amp;&amp; res.url() === WhatsWebURL) {`
865.                      `const indexHtml = await res.text();`
866.                      `this.currentIndexHtml = indexHtml;`
867.                  `}`
868.              `});`
869.          `}`
870.      `}`

872.      `/**`
873.       `* Closes the client`
874.       `*/`
875.      `async destroy() {`
876.          `await this.pupBrowser.close();`
877.          `await this.authStrategy.destroy();`
878.      `}`

880.      `/**`
881.       `* Logs out the client, closing the current session`
882.       `*/`
883.      `async logout() {`
884.          `await this.pupPage.evaluate(() => {`
885.              `if (window.Store &amp;&amp; window.Store.AppState &amp;&amp; typeof window.Store.AppState.logout === 'function') {`
886.                  `return window.Store.AppState.logout();`
887.              `}`
888.          `});`
889.          `await this.pupBrowser.close();`

891.          `let maxDelay = 0;`
892.          `while (this.pupBrowser.isConnected() &amp;&amp; (maxDelay &lt; 10)) { // waits a maximum of 1 second before calling the AuthStrategy`
893.              `await new Promise(resolve => setTimeout(resolve, 100));`
894.              `maxDelay++;` 
895.          `}`

897.          `await this.authStrategy.logout();`
898.      `}`

900.      `/**`
901.       `* Returns the version of WhatsApp Web currently being run`
902.       `* @returns {Promise&lt;string>}`
903.       `*/`
904.      `async getWWebVersion() {`
905.          `return await this.pupPage.evaluate(() => {`
906.              `return window.Debug.VERSION;`
907.          `});`
908.      `}`

910.      `async setDeviceName(deviceName, browserName) {`
911.          `(deviceName || browserName) &amp;&amp; await this.pupPage.evaluate((deviceName, browserName) => {`
912.              `const func = window.require('WAWebMiscBrowserUtils').info;`
913.              `window.require('WAWebMiscBrowserUtils').info = () => {`
914.                  `return {`
915.                      `...func(),`
916.                      `...(deviceName ? { os: deviceName } : {}),`
917.                      `...(browserName ? { name: browserName } : {})`
918.                  `};`
919.              `};`
920.          `}, deviceName, browserName);`
921.      `}`

923.      `/**`
924.       `* Mark as seen for the Chat`
925.       `*  @param {string} chatId`
926.       `*  @returns {Promise&lt;boolean>} result`
927.       `*` 
928.       `*/`
929.      `async sendSeen(chatId) {`
930.          `return await this.pupPage.evaluate(async (chatId) => {`
931.              `return window.WWebJS.sendSeen(chatId);`
932.          `}, chatId);`
933.      `}`

935.      `/**`
936.       `* An object representing mentions of groups`
937.       `* @typedef {Object} GroupMention`
938.       `* @property {string} subject - The name of a group to mention (can be custom)`
939.       `* @property {string} id - The group ID, e.g.: 'XXXXXXXXXX@g.us'`
940.       `*/`

942.      `/**`
943.       `* Message options.`
944.       `* @typedef {Object} MessageSendOptions`
945.       `* @property {boolean} [linkPreview=true] - Show links preview. Has no effect on multi-device accounts.`
946.       `* @property {boolean} [sendAudioAsVoice=false] - Send audio as voice message with a generated waveform`
947.       `* @property {boolean} [sendVideoAsGif=false] - Send video as gif`
948.       `* @property {boolean} [sendMediaAsSticker=false] - Send media as a sticker`
949.       `* @property {boolean} [sendMediaAsDocument=false] - Send media as a document`
950.       `* @property {boolean} [sendMediaAsHd=false] - Send image as quality HD`
951.       `* @property {boolean} [isViewOnce=false] - Send photo/video as a view once message`
952.       `* @property {boolean} [parseVCards=true] - Automatically parse vCards and send them as contacts`
953.       `* @property {string} [caption] - Image or video caption`
954.       `* @property {string} [quotedMessageId] - Id of the message that is being quoted (or replied to)`
955.       `* @property {GroupMention[]} [groupMentions] - An array of object that handle group mentions`
956.       `* @property {string[]} [mentions] - User IDs to mention in the message`
957.       `* @property {boolean} [sendSeen=true] - Mark the conversation as seen after sending the message`
958.       `* @property {string} [invokedBotWid=undefined] - Bot Wid when doing a bot mention like @Meta AI`
959.       `* @property {string} [stickerAuthor=undefined] - Sets the author of the sticker, (if sendMediaAsSticker is true).`
960.       `* @property {string} [stickerName=undefined] - Sets the name of the sticker, (if sendMediaAsSticker is true).`
961.       `* @property {string[]} [stickerCategories=undefined] - Sets the categories of the sticker, (if sendMediaAsSticker is true). Provide emoji char array, can be null.`
962.       `* @property {boolean} [ignoreQuoteErrors = true] - Should the bot send a quoted message without the quoted message if it fails to get the quote?`
963.       `* @property {boolean} [waitUntilMsgSent = false] - Should the bot wait for the message send result?`
964.       `* @property {MessageMedia} [media] - Media to be sent`
965.       `* @property {any} [extra] - Extra options`
966.       `*/`

968.      `/**`
969.       `* Send a message to a specific chatId`
970.       `* @param {string} chatId`
971.       `* @param {string|MessageMedia|Location|Poll|Contact|Array&lt;Contact>|Buttons|List} content`
972.       `* @param {MessageSendOptions} [options] - Options used when sending the message`
973.       `*` 
974.       `* @returns {Promise&lt;Message>} Message that was just sent`
975.       `*/`
976.      `async sendMessage(chatId, content, options = {}) {`
977.          `const isChannel = /@\w*newsletter\b/.test(chatId);`
978.          `const isStatus = /@\w*broadcast\b/.test(chatId);`

980.          `if (isChannel &amp;&amp; [`
981.              `options.sendMediaAsDocument, options.quotedMessageId,`
982.              `options.parseVCards, options.isViewOnce,`
983.              `content instanceof Location, content instanceof Contact,`
984.              `content instanceof Buttons, content instanceof List,`
985.              `Array.isArray(content) &amp;&amp; content.length > 0 &amp;&amp; content[0] instanceof Contact`
986.          `].includes(true)) {`
987.              `console.warn('The message type is currently not supported for sending in channels,\nthe supported message types are: text, image, sticker, gif, video, voice and poll.');`
988.              `return null;`

990.          `} else if (isStatus &amp;&amp; [`
991.              `options.sendMediaAsDocument, options.quotedMessageId,`
992.              `options.parseVCards, options.isViewOnce, options.sendMediaAsSticker,`
993.              `content instanceof Location, content instanceof Contact,`
994.              `content instanceof Poll, content instanceof Buttons, content instanceof List,`
995.              `Array.isArray(content) &amp;&amp; content.length > 0 &amp;&amp; content[0] instanceof Contact`
996.          `].includes(true)) {`
997.              `console.warn('The message type is currently not supported for sending in status broadcast,\nthe supported message types are: text, image, gif, audio and video.');`
998.              `return null;`
999.          `}`

1001.          `if (options.mentions) {`
1002.              `!Array.isArray(options.mentions) &amp;&amp; (options.mentions = [options.mentions]);`
1003.              `if (options.mentions.some((possiblyContact) => possiblyContact instanceof Contact)) {`
1004.                  `console.warn('Mentions with an array of Contact are now deprecated. See more at https://github.com/pedroslopez/whatsapp-web.js/pull/2166.');`
1005.                  `options.mentions = options.mentions.map((a) => a.id._serialized);`
1006.              `}`
1007.          `}`

1009.          `options.groupMentions &amp;&amp; !Array.isArray(options.groupMentions) &amp;&amp; (options.groupMentions = [options.groupMentions]);`

1011.          `let internalOptions = {`
1012.              `linkPreview: options.linkPreview === false ? undefined : true,`
1013.              `sendAudioAsVoice: options.sendAudioAsVoice,`
1014.              `sendVideoAsGif: options.sendVideoAsGif,`
1015.              `sendMediaAsSticker: options.sendMediaAsSticker,`
1016.              `sendMediaAsDocument: options.sendMediaAsDocument,`
1017.              `sendMediaAsHd: options.sendMediaAsHd,`
1018.              `caption: options.caption,`
1019.              `quotedMessageId: options.quotedMessageId,`
1020.              `parseVCards: options.parseVCards !== false,`
1021.              `mentionedJidList: options.mentions || [],`
1022.              `groupMentions: options.groupMentions,`
1023.              `invokedBotWid: options.invokedBotWid,`
1024.              `ignoreQuoteErrors: options.ignoreQuoteErrors !== false,`
1025.              `waitUntilMsgSent: options.waitUntilMsgSent || false,`
1026.              `extraOptions: options.extra`
1027.          `};`

1029.          `const sendSeen = options.sendSeen !== false;`

1031.          `if (content instanceof MessageMedia) {`
1032.              `internalOptions.media = content;`
1033.              `internalOptions.isViewOnce = options.isViewOnce,`
1034.              `content = '';`
1035.          `} else if (options.media instanceof MessageMedia) {`
1036.              `internalOptions.media = options.media;`
1037.              `internalOptions.caption = content;`
1038.              `internalOptions.isViewOnce = options.isViewOnce,`
1039.              `content = '';`
1040.          `} else if (content instanceof Location) {`
1041.              `internalOptions.location = content;`
1042.              `content = '';`
1043.          `} else if (content instanceof Poll) {`
1044.              `internalOptions.poll = content;`
1045.              `content = '';`
1046.          `} else if (content instanceof ScheduledEvent) {`
1047.              `internalOptions.event = content;`
1048.              `content = '';`
1049.          `} else if (content instanceof Contact) {`
1050.              `internalOptions.contactCard = content.id._serialized;`
1051.              `content = '';`
1052.          `} else if (Array.isArray(content) &amp;&amp; content.length > 0 &amp;&amp; content[0] instanceof Contact) {`
1053.              `internalOptions.contactCardList = content.map(contact => contact.id._serialized);`
1054.              `content = '';`
1055.          `} else if (content instanceof Buttons) {`
1056.              `console.warn('Buttons are now deprecated. See more at https://www.youtube.com/watch?v=hv1R1rLeVVE.');`
1057.              `if (content.type !== 'chat') { internalOptions.attachment = content.body; }`
1058.              `internalOptions.buttons = content;`
1059.              `content = '';`
1060.          `} else if (content instanceof List) {`
1061.              `console.warn('Lists are now deprecated. See more at https://www.youtube.com/watch?v=hv1R1rLeVVE.');`
1062.              `internalOptions.list = content;`
1063.              `content = '';`
1064.          `}`

1066.          `if (internalOptions.sendMediaAsSticker &amp;&amp; internalOptions.media) {`
1067.              `internalOptions.media = await Util.formatToWebpSticker(`
1068.                  `internalOptions.media, {`
1069.                      `name: options.stickerName,`
1070.                      `author: options.stickerAuthor,`
1071.                      `categories: options.stickerCategories`
1072.                  `}, this.pupPage`
1073.              `);`
1074.          `}`

1076.          `const sentMsg = await this.pupPage.evaluate(async (chatId, content, options, sendSeen) => {`
1077.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`

1079.              `if (!chat) return null;`

1081.              `if (sendSeen) {`
1082.                  `await window.WWebJS.sendSeen(chatId);`
1083.              `}`

1085.              `const msg = await window.WWebJS.sendMessage(chat, content, options);`
1086.              `return msg`
1087.                  `? window.WWebJS.getMessageModel(msg)`
1088.                  `: undefined;`
1089.          `}, chatId, content, internalOptions, sendSeen);`

1091.          `return sentMsg`
1092.              `? new Message(this, sentMsg)`
1093.              `: undefined;`
1094.      `}`

1096.      `/**`
1097.       `* @typedef {Object} SendChannelAdminInviteOptions`
1098.       `* @property {?string} comment The comment to be added to an invitation`
1099.       `*/`

1101.      `/**`
1102.       `* Sends a channel admin invitation to a user, allowing them to become an admin of the channel`
1103.       `* @param {string} chatId The ID of a user to send the channel admin invitation to`
1104.       `* @param {string} channelId The ID of a channel for which the invitation is being sent`
1105.       `* @param {SendChannelAdminInviteOptions} options` 
1106.       `* @returns {Promise&lt;boolean>} Returns true if an invitation was sent successfully, false otherwise`
1107.       `*/`
1108.      `async sendChannelAdminInvite(chatId, channelId, options = {}) {`
1109.          `const response = await this.pupPage.evaluate(async (chatId, channelId, options) => {`
1110.              `const channelWid = window.Store.WidFactory.createWid(channelId);`
1111.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
1112.              `const chat = window.Store.Chat.get(chatWid) || (await window.Store.Chat.find(chatWid));`

1114.              `if (!chatWid.isUser()) {`
1115.                  `return false;`
1116.              `}`

1118.              `return await window.Store.SendChannelMessage.sendNewsletterAdminInviteMessage(`
1119.                  `chat,`
1120.                  `{`
1121.                      `newsletterWid: channelWid,`
1122.                      `invitee: chatWid,`
1123.                      `inviteMessage: options.comment,`
1124.                      `base64Thumb: await window.WWebJS.getProfilePicThumbToBase64(channelWid)`
1125.                  `}`
1126.              `);`
1127.          `}, chatId, channelId, options);`

1129.          `return response.messageSendResult === 'OK';`
1130.      `}`

1132.      `/**`
1133.       `* Searches for messages`
1134.       `* @param {string} query`
1135.       `* @param {Object} [options]`
1136.       `* @param {number} [options.page]`
1137.       `* @param {number} [options.limit]`
1138.       `* @param {string} [options.chatId]`
1139.       `* @returns {Promise&lt;Message[]>}`
1140.       `*/`
1141.      `async searchMessages(query, options = {}) {`
1142.          `const messages = await this.pupPage.evaluate(async (query, page, count, remote) => {`
1143.              `const { messages } = await window.Store.Msg.search(query, page, count, remote);`
1144.              `return messages.map(msg => window.WWebJS.getMessageModel(msg));`
1145.          `}, query, options.page, options.limit, options.chatId);`

1147.          `return messages.map(msg => new Message(this, msg));`
1148.      `}`

1150.      `/**`
1151.       `* Get all current chat instances`
1152.       `* @returns {Promise&lt;Array&lt;Chat>>}`
1153.       `*/`
1154.      `async getChats() {`
1155.          `const chats = await this.pupPage.evaluate(async () => {`
1156.              `return await window.WWebJS.getChats();`
1157.          `});`

1159.          `return chats.map(chat => ChatFactory.create(this, chat));`
1160.      `}`

1162.      `/**`
1163.       `* Gets all cached {@link Channel} instance`
1164.       `* @returns {Promise&lt;Array&lt;Channel>>}`
1165.       `*/`
1166.      `async getChannels() {`
1167.          `const channels = await this.pupPage.evaluate(async () => {`
1168.              `return await window.WWebJS.getChannels();`
1169.          `});`

1171.          `return channels.map((channel) => ChatFactory.create(this, channel));`
1172.      `}`

1174.      `/**`
1175.       `* Gets chat or channel instance by ID`
1176.       `* @param {string} chatId` 
1177.       `* @returns {Promise&lt;Chat|Channel>}`
1178.       `*/`
1179.      `async getChatById(chatId) {`
1180.          `const chat = await this.pupPage.evaluate(async chatId => {`
1181.              `return await window.WWebJS.getChat(chatId);`
1182.          `}, chatId);`
1183.          `return chat`
1184.              `? ChatFactory.create(this, chat)`
1185.              `: undefined;`
1186.      `}`

1188.      `/**`
1189.       `* Gets a {@link Channel} instance by invite code`
1190.       `* @param {string} inviteCode The code that comes after the 'https://whatsapp.com/channel/'`
1191.       `* @returns {Promise&lt;Channel>}`
1192.       `*/`
1193.      `async getChannelByInviteCode(inviteCode) {`
1194.          `const channel = await this.pupPage.evaluate(async (inviteCode) => {`
1195.              `let channelMetadata;`
1196.              `try {`
1197.                  `channelMetadata = await window.WWebJS.getChannelMetadata(inviteCode);`
1198.              `} catch (err) {`
1199.                  `if (err.name === 'ServerStatusCodeError') return null;`
1200.                  `throw err;`
1201.              `}`
1202.              `return await window.WWebJS.getChat(channelMetadata.id);`
1203.          `}, inviteCode);`

1205.          `return channel`
1206.              `? ChatFactory.create(this, channel)`
1207.              `: undefined;`
1208.      `}`

1210.      `/**`
1211.       `* Get all current contact instances`
1212.       `* @returns {Promise&lt;Array&lt;Contact>>}`
1213.       `*/`
1214.      `async getContacts() {`
1215.          `let contacts = await this.pupPage.evaluate(() => {`
1216.              `return window.WWebJS.getContacts();`
1217.          `});`

1219.          `return contacts.map(contact => ContactFactory.create(this, contact));`
1220.      `}`

1222.      `/**`
1223.       `* Get contact instance by ID`
1224.       `* @param {string} contactId`
1225.       `* @returns {Promise&lt;Contact>}`
1226.       `*/`
1227.      `async getContactById(contactId) {`
1228.          `let contact = await this.pupPage.evaluate(contactId => {`
1229.              `return window.WWebJS.getContact(contactId);`
1230.          `}, contactId);`

1232.          `return ContactFactory.create(this, contact);`
1233.      `}`

1235.      `/**`
1236.       `* Get message by ID`
1237.       `* @param {string} messageId`
1238.       `* @returns {Promise&lt;Message>}`
1239.       `*/`
1240.      `async getMessageById(messageId) {`
1241.          `const msg = await this.pupPage.evaluate(async messageId => {`
1242.              `let msg = window.Store.Msg.get(messageId);`
1243.              `if(msg) return window.WWebJS.getMessageModel(msg);`

1245.              `const params = messageId.split('_');`
1246.              `if (params.length !== 3 &amp;&amp; params.length !== 4) throw new Error('Invalid serialized message id specified');`

1248.              `let messagesObject = await window.Store.Msg.getMessagesById([messageId]);`
1249.              `if (messagesObject &amp;&amp; messagesObject.messages.length) msg = messagesObject.messages[0];`

1251.              `if(msg) return window.WWebJS.getMessageModel(msg);`
1252.          `}, messageId);`

1254.          `if(msg) return new Message(this, msg);`
1255.          `return null;`
1256.      `}`

1258.      `/**`
1259.       `* Gets instances of all pinned messages in a chat`
1260.       `* @param {string} chatId The chat ID`
1261.       `* @returns {Promise&lt;Array&lt;Message>>}`
1262.       `*/`
1263.      `async getPinnedMessages(chatId) {`
1264.          `const pinnedMsgs = await this.pupPage.evaluate(async (chatId) => {`
1265.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
1266.              `const chat = window.Store.Chat.get(chatWid) ?? await window.Store.Chat.find(chatWid);`
1267.              `if (!chat) return [];`

1269.              `const msgs = await window.Store.PinnedMsgUtils.getTable().equals(['chatId'], chatWid.toString());`

1271.              `const pinnedMsgs = (`
1272.                  `await Promise.all(`
1273.                      `msgs.filter(msg => msg.pinType == 1).map(async (msg) => {`
1274.                          `const res = await window.Store.Msg.getMessagesById([msg.parentMsgKey]);`
1275.                          `return res?.messages?.[0];`
1276.                      `})`
1277.                  `)`
1278.              `).filter(Boolean);`

1280.              `return !pinnedMsgs.length`
1281.                  `? []`
1282.                  `: await Promise.all(pinnedMsgs.map((msg) => window.WWebJS.getMessageModel(msg)));`
1283.          `}, chatId);`

1285.          `return pinnedMsgs.map((msg) => new Message(this, msg));`
1286.      `}`

1288.      `/**`
1289.       `* Returns an object with information about the invite code's group`
1290.       `* @param {string} inviteCode` 
1291.       `* @returns {Promise&lt;object>} Invite information`
1292.       `*/`
1293.      `async getInviteInfo(inviteCode) {`
1294.          `return await this.pupPage.evaluate(inviteCode => {`
1295.              `return window.Store.GroupInvite.queryGroupInvite(inviteCode);`
1296.          `}, inviteCode);`
1297.      `}`

1299.      `/**`
1300.       `* Accepts an invitation to join a group`
1301.       `* @param {string} inviteCode Invitation code`
1302.       `* @returns {Promise&lt;string>} Id of the joined Chat`
1303.       `*/`
1304.      `async acceptInvite(inviteCode) {`
1305.          `const res = await this.pupPage.evaluate(async inviteCode => {`
1306.              `return await window.Store.GroupInvite.joinGroupViaInvite(inviteCode);`
1307.          `}, inviteCode);`

1309.          `return res.gid._serialized;`
1310.      `}`

1312.      `/**`
1313.       `* Accepts a channel admin invitation and promotes the current user to a channel admin`
1314.       `* @param {string} channelId The channel ID to accept the admin invitation from`
1315.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1316.       `*/`
1317.      `async acceptChannelAdminInvite(channelId) {`
1318.          `return await this.pupPage.evaluate(async (channelId) => {`
1319.              `try {`
1320.                  `await window.Store.ChannelUtils.acceptNewsletterAdminInvite(channelId);`
1321.                  `return true;`
1322.              `} catch (err) {`
1323.                  `if (err.name === 'ServerStatusCodeError') return false;`
1324.                  `throw err;`
1325.              `}`
1326.          `}, channelId);`
1327.      `}`

1329.      `/**`
1330.       `* Revokes a channel admin invitation sent to a user by a channel owner`
1331.       `* @param {string} channelId The channel ID an invitation belongs to`
1332.       `* @param {string} userId The user ID the invitation was sent to`
1333.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1334.       `*/`
1335.      `async revokeChannelAdminInvite(channelId, userId) {`
1336.          `return await this.pupPage.evaluate(async (channelId, userId) => {`
1337.              `try {`
1338.                  `const userWid = window.Store.WidFactory.createWid(userId);`
1339.                  `await window.Store.ChannelUtils.revokeNewsletterAdminInvite(channelId, userWid);`
1340.                  `return true;`
1341.              `} catch (err) {`
1342.                  `if (err.name === 'ServerStatusCodeError') return false;`
1343.                  `throw err;`
1344.              `}`
1345.          `}, channelId, userId);`
1346.      `}`

1348.      `/**`
1349.       `* Demotes a channel admin to a regular subscriber (can be used also for self-demotion)`
1350.       `* @param {string} channelId The channel ID to demote an admin in`
1351.       `* @param {string} userId The user ID to demote`
1352.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1353.       `*/`
1354.      `async demoteChannelAdmin(channelId, userId) {`
1355.          `return await this.pupPage.evaluate(async (channelId, userId) => {`
1356.              `try {`
1357.                  `const userWid = window.Store.WidFactory.createWid(userId);`
1358.                  `await window.Store.ChannelUtils.demoteNewsletterAdmin(channelId, userWid);`
1359.                  `return true;`
1360.              `} catch (err) {`
1361.                  `if (err.name === 'ServerStatusCodeError') return false;`
1362.                  `throw err;`
1363.              `}`
1364.          `}, channelId, userId);`
1365.      `}`

1367.      `/**`
1368.       `* Accepts a private invitation to join a group`
1369.       `* @param {object} inviteInfo Invite V4 Info`
1370.       `* @returns {Promise&lt;Object>}`
1371.       `*/`
1372.      `async acceptGroupV4Invite(inviteInfo) {`
1373.          `if (!inviteInfo.inviteCode) throw 'Invalid invite code, try passing the message.inviteV4 object';`
1374.          `if (inviteInfo.inviteCodeExp == 0) throw 'Expired invite code';`
1375.          `return this.pupPage.evaluate(async inviteInfo => {`
1376.              `let { groupId, fromId, inviteCode, inviteCodeExp } = inviteInfo;`
1377.              `let userWid = window.Store.WidFactory.createWid(fromId);`
1378.              `return await window.Store.GroupInviteV4.joinGroupViaInviteV4(inviteCode, String(inviteCodeExp), groupId, userWid);`
1379.          `}, inviteInfo);`
1380.      `}`

1382.      `/**`
1383.       `* Sets the current user's status message`
1384.       `* @param {string} status New status message`
1385.       `*/`
1386.      `async setStatus(status) {`
1387.          `await this.pupPage.evaluate(async status => {`
1388.              `return await window.Store.StatusUtils.setMyStatus(status);`
1389.          `}, status);`
1390.      `}`

1392.      `/**`
1393.       `* Sets the current user's display name.` 
1394.       `* This is the name shown to WhatsApp users that have not added you as a contact beside your number in groups and in your profile.`
1395.       `* @param {string} displayName New display name`
1396.       `* @returns {Promise&lt;Boolean>}`
1397.       `*/`
1398.      `async setDisplayName(displayName) {`
1399.          `const couldSet = await this.pupPage.evaluate(async displayName => {`
1400.              `if(!window.Store.Conn.canSetMyPushname()) return false;`
1401.              `await window.Store.Settings.setPushname(displayName);`
1402.              `return true;`
1403.          `}, displayName);`

1405.          `return couldSet;`
1406.      `}`

1408.      `/**`
1409.       `* Gets the current connection state for the client`
1410.       `* @returns {WAState}` 
1411.       `*/`
1412.      `async getState() {`
1413.          `return await this.pupPage.evaluate(() => {`
1414.              `if(!window.Store) return null;`
1415.              `return window.Store.AppState.state;`
1416.          `});`
1417.      `}`

1419.      `/**`
1420.       `* Marks the client as online`
1421.       `*/`
1422.      `async sendPresenceAvailable() {`
1423.          `return await this.pupPage.evaluate(() => {`
1424.              `return window.Store.PresenceUtils.sendPresenceAvailable();`
1425.          `});`
1426.      `}`

1428.      `/**`
1429.       `* Marks the client as unavailable`
1430.       `*/`
1431.      `async sendPresenceUnavailable() {`
1432.          `return await this.pupPage.evaluate(() => {`
1433.              `return window.Store.PresenceUtils.sendPresenceUnavailable();`
1434.          `});`
1435.      `}`

1437.      `/**`
1438.       `* Enables and returns the archive state of the Chat`
1439.       `* @returns {boolean}`
1440.       `*/`
1441.      `async archiveChat(chatId) {`
1442.          `return await this.pupPage.evaluate(async chatId => {`
1443.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1444.              `await window.Store.Cmd.archiveChat(chat, true);`
1445.              `return true;`
1446.          `}, chatId);`
1447.      `}`

1449.      `/**`
1450.       `* Changes and returns the archive state of the Chat`
1451.       `* @returns {boolean}`
1452.       `*/`
1453.      `async unarchiveChat(chatId) {`
1454.          `return await this.pupPage.evaluate(async chatId => {`
1455.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1456.              `await window.Store.Cmd.archiveChat(chat, false);`
1457.              `return false;`
1458.          `}, chatId);`
1459.      `}`

1461.      `/**`
1462.       `* Pins the Chat`
1463.       `* @returns {Promise&lt;boolean>} New pin state. Could be false if the max number of pinned chats was reached.`
1464.       `*/`
1465.      `async pinChat(chatId) {`
1466.          `return this.pupPage.evaluate(async chatId => {`
1467.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1468.              `if (chat.pin) {`
1469.                  `return true;`
1470.              `}`
1471.              `const MAX_PIN_COUNT = 3;`
1472.              `const chatModels = window.Store.Chat.getModelsArray();`
1473.              `if (chatModels.length > MAX_PIN_COUNT) {`
1474.                  `let maxPinned = chatModels[MAX_PIN_COUNT - 1].pin;`
1475.                  `if (maxPinned) {`
1476.                      `return false;`
1477.                  `}`
1478.              `}`
1479.              `await window.Store.Cmd.pinChat(chat, true);`
1480.              `return true;`
1481.          `}, chatId);`
1482.      `}`

1484.      `/**`
1485.       `* Unpins the Chat`
1486.       `* @returns {Promise&lt;boolean>} New pin state`
1487.       `*/`
1488.      `async unpinChat(chatId) {`
1489.          `return this.pupPage.evaluate(async chatId => {`
1490.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1491.              `if (!chat.pin) {`
1492.                  `return false;`
1493.              `}`
1494.              `await window.Store.Cmd.pinChat(chat, false);`
1495.              `return false;`
1496.          `}, chatId);`
1497.      `}`

1499.      `/**`
1500.       `* Mutes this chat forever, unless a date is specified`
1501.       `* @param {string} chatId ID of the chat that will be muted`
1502.       `* @param {?Date} unmuteDate Date when the chat will be unmuted, don't provide a value to mute forever`
1503.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
1504.       `*/`
1505.      `async muteChat(chatId, unmuteDate) {`
1506.          `unmuteDate = unmuteDate ? Math.floor(unmuteDate.getTime() / 1000) : -1;`
1507.          `return this._muteUnmuteChat(chatId, 'MUTE', unmuteDate);`
1508.      `}`

1510.      `/**`
1511.       `* Unmutes the Chat`
1512.       `* @param {string} chatId ID of the chat that will be unmuted`
1513.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
1514.       `*/`
1515.      `async unmuteChat(chatId) {`
1516.          `return this._muteUnmuteChat(chatId, 'UNMUTE');`
1517.      `}`

1519.      `/**`
1520.       `* Internal method to mute or unmute the chat`
1521.       `* @param {string} chatId ID of the chat that will be muted/unmuted`
1522.       `* @param {string} action The action: 'MUTE' or 'UNMUTE'`
1523.       `* @param {number} unmuteDateTs Timestamp at which the chat will be unmuted`
1524.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
1525.       `*/`
1526.      `async _muteUnmuteChat (chatId, action, unmuteDateTs) {`
1527.          `return this.pupPage.evaluate(async (chatId, action, unmuteDateTs) => {`
1528.              `const chat = window.Store.Chat.get(chatId) ?? await window.Store.Chat.find(chatId);`
1529.              `action === 'MUTE'`
1530.                  `? await chat.mute.mute({ expiration: unmuteDateTs, sendDevice: true })`
1531.                  `: await chat.mute.unmute({ sendDevice: true });`
1532.              `return { isMuted: chat.mute.expiration !== 0, muteExpiration: chat.mute.expiration };`
1533.          `}, chatId, action, unmuteDateTs || -1);`
1534.      `}`

1536.      `/**`
1537.       `* Mark the Chat as unread`
1538.       `* @param {string} chatId ID of the chat that will be marked as unread`
1539.       `*/`
1540.      `async markChatUnread(chatId) {`
1541.          `await this.pupPage.evaluate(async chatId => {`
1542.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1543.              `await window.Store.Cmd.markChatUnread(chat, true);`
1544.          `}, chatId);`
1545.      `}`

1547.      `/**`
1548.       `* Returns the contact ID's profile picture URL, if privacy settings allow it`
1549.       `* @param {string} contactId the whatsapp user's ID`
1550.       `* @returns {Promise&lt;string>}`
1551.       `*/`
1552.      `async getProfilePicUrl(contactId) {`
1553.          `const profilePic = await this.pupPage.evaluate(async contactId => {`
1554.              `try {`
1555.                  `const chatWid = window.Store.WidFactory.createWid(contactId);`
1556.                  `return window.compareWwebVersions(window.Debug.VERSION, '&lt;', '2.3000.0')`
1557.                      `? await window.Store.ProfilePic.profilePicFind(chatWid)`
1558.                      `: await window.Store.ProfilePic.requestProfilePicFromServer(chatWid);`
1559.              `} catch (err) {`
1560.                  `if(err.name === 'ServerStatusCodeError') return undefined;`
1561.                  `throw err;`
1562.              `}`
1563.          `}, contactId);`

1565.          `return profilePic ? profilePic.eurl : undefined;`
1566.      `}`

1568.      `/**`
1569.       `* Gets the Contact's common groups with you. Returns empty array if you don't have any common group.`
1570.       `* @param {string} contactId the whatsapp user's ID (_serialized format)`
1571.       `* @returns {Promise&lt;WAWebJS.ChatId[]>}`
1572.       `*/`
1573.      `async getCommonGroups(contactId) {`
1574.          `const commonGroups = await this.pupPage.evaluate(async (contactId) => {`
1575.              `let contact = window.Store.Contact.get(contactId);`
1576.              `if (!contact) {`
1577.                  `const wid = window.Store.WidFactory.createWid(contactId);`
1578.                  `const chatConstructor = window.Store.Contact.getModelsArray().find(c=>!c.isGroup).constructor;`
1579.                  `contact = new chatConstructor({id: wid});`
1580.              `}`

1582.              `if (contact.commonGroups) {`
1583.                  `return contact.commonGroups.serialize();`
1584.              `}`
1585.              `const status = await window.Store.findCommonGroups(contact);`
1586.              `if (status) {`
1587.                  `return contact.commonGroups.serialize();`
1588.              `}`
1589.              `return [];`
1590.          `}, contactId);`
1591.          `const chats = [];`
1592.          `for (const group of commonGroups) {`
1593.              `chats.push(group.id);`
1594.          `}`
1595.          `return chats;`
1596.      `}`

1598.      `/**`
1599.       `* Force reset of connection state for the client`
1600.      `*/`
1601.      `async resetState() {`
1602.          `await this.pupPage.evaluate(() => {`
1603.              `window.Store.AppState.reconnect();` 
1604.          `});`
1605.      `}`

1607.      `/**`
1608.       `* Check if a given ID is registered in whatsapp`
1609.       `* @param {string} id the whatsapp user's ID`
1610.       `* @returns {Promise&lt;Boolean>}`
1611.       `*/`
1612.      `async isRegisteredUser(id) {`
1613.          `return Boolean(await this.getNumberId(id));`
1614.      `}`

1616.      `/**`
1617.       `* Get the registered WhatsApp ID for a number.` 
1618.       `* Will return null if the number is not registered on WhatsApp.`
1619.       `* @param {string} number Number or ID ("@c.us" will be automatically appended if not specified)`
1620.       `* @returns {Promise&lt;Object|null>}`
1621.       `*/`
1622.      `async getNumberId(number) {`
1623.          `if (!number.endsWith('@c.us')) {`
1624.              `number += '@c.us';`
1625.          `}`

1627.          `return await this.pupPage.evaluate(async number => {`
1628.              `const wid = window.Store.WidFactory.createWid(number);`
1629.              `const result = await window.Store.QueryExist(wid);`
1630.              `if (!result || result.wid === undefined) return null;`
1631.              `return result.wid;`
1632.          `}, number);`
1633.      `}`

1635.      `/**`
1636.       `* Get the formatted number of a WhatsApp ID.`
1637.       `* @param {string} number Number or ID`
1638.       `* @returns {Promise&lt;string>}`
1639.       `*/`
1640.      `async getFormattedNumber(number) {`
1641.          `if (!number.endsWith('@s.whatsapp.net')) number = number.replace('c.us', 's.whatsapp.net');`
1642.          ``if (!number.includes('@s.whatsapp.net')) number = `${number}@s.whatsapp.net`;``

1644.          `return await this.pupPage.evaluate(async numberId => {`
1645.              `return window.Store.NumberInfo.formattedPhoneNumber(numberId);`
1646.          `}, number);`
1647.      `}`

1649.      `/**`
1650.       `* Get the country code of a WhatsApp ID.`
1651.       `* @param {string} number Number or ID`
1652.       `* @returns {Promise&lt;string>}`
1653.       `*/`
1654.      `async getCountryCode(number) {`
1655.          `number = number.replace(' ', '').replace('+', '').replace('@c.us', '');`

1657.          `return await this.pupPage.evaluate(async numberId => {`
1658.              `return window.Store.NumberInfo.findCC(numberId);`
1659.          `}, number);`
1660.      `}`

1662.      `/**`
1663.       `* An object that represents the result for a participant added to a group`
1664.       `* @typedef {Object} ParticipantResult`
1665.       `* @property {number} statusCode The status code of the result`
1666.       `* @property {string} message The result message`
1667.       `* @property {boolean} isGroupCreator Indicates if the participant is a group creator`
1668.       `* @property {boolean} isInviteV4Sent Indicates if the inviteV4 was sent to the participant`
1669.       `*/`

1671.      `/**`
1672.       `* An object that handles the result for {@link createGroup} method`
1673.       `* @typedef {Object} CreateGroupResult`
1674.       `* @property {string} title A group title`
1675.       `* @property {Object} gid An object that handles the newly created group ID`
1676.       `* @property {string} gid.server`
1677.       `* @property {string} gid.user`
1678.       `* @property {string} gid._serialized`
1679.       `* @property {Object.&lt;string, ParticipantResult>} participants An object that handles the result value for each added to the group participant`
1680.       `*/`

1682.      `/**`
1683.       `* An object that handles options for group creation`
1684.       `* @typedef {Object} CreateGroupOptions`
1685.       `* @property {number} [messageTimer = 0] The number of seconds for the messages to disappear in the group (0 by default, won't take an effect if the group is been creating with myself only)`
1686.       `* @property {string|undefined} parentGroupId The ID of a parent community group to link the newly created group with (won't take an effect if the group is been creating with myself only)`
1687.       `* @property {boolean} [autoSendInviteV4 = true] If true, the inviteV4 will be sent to those participants who have restricted others from being automatically added to groups, otherwise the inviteV4 won't be sent (true by default)`
1688.       `* @property {string} [comment = ''] The comment to be added to an inviteV4 (empty string by default)`
1689.       `* @property {boolean} [memberAddMode = false] If true, only admins can add members to the group (false by default)`
1690.       `* @property {boolean} [membershipApprovalMode = false] If true, group admins will be required to approve anyone who wishes to join the group (false by default)`
1691.       `* @property {boolean} [isRestrict = true] If true, only admins can change group group info (true by default)`
1692.       `* @property {boolean} [isAnnounce = false] If true, only admins can send messages (false by default)`
1693.       `*/`

1695.      `/**`
1696.       `* Creates a new group`
1697.       `* @param {string} title Group title`
1698.       `* @param {string|Contact|Array&lt;Contact|string>|undefined} participants A single Contact object or an ID as a string or an array of Contact objects or contact IDs to add to the group`
1699.       `* @param {CreateGroupOptions} options An object that handles options for group creation`
1700.       `* @returns {Promise&lt;CreateGroupResult|string>} Object with resulting data or an error message as a string`
1701.       `*/`
1702.      `async createGroup(title, participants = [], options = {}) {`
1703.          `!Array.isArray(participants) &amp;&amp; (participants = [participants]);`
1704.          `participants.map(p => (p instanceof Contact) ? p.id._serialized : p);`

1706.          `return await this.pupPage.evaluate(async (title, participants, options) => {`
1707.              `const {`
1708.                  `messageTimer = 0,`
1709.                  `parentGroupId,`
1710.                  `autoSendInviteV4 = true,`
1711.                  `comment = '',`
1712.              `} = options;`
1713.              `const participantData = {}, participantWids = [], failedParticipants = [];`
1714.              `let createGroupResult, parentGroupWid;`

1716.              `const addParticipantResultCodes = {`
1717.                  `default: 'An unknown error occupied while adding a participant',`
1718.                  `200: 'The participant was added successfully',`
1719.                  `403: 'The participant can be added by sending private invitation only',`
1720.                  `404: 'The phone number is not registered on WhatsApp'`
1721.              `};`

1723.              `for (const participant of participants) {`
1724.                  `const pWid = window.Store.WidFactory.createWid(participant);`
1725.                  `if ((await window.Store.QueryExist(pWid))?.wid) {`
1726.                      `participantWids.push({ phoneNumber: pWid });`
1727.                  `}`
1728.                  `else failedParticipants.push(participant);`
1729.              `}`

1731.              `parentGroupId &amp;&amp; (parentGroupWid = window.Store.WidFactory.createWid(parentGroupId));`

1733.              `try {`
1734.                  `createGroupResult = await window.Store.GroupUtils.createGroup(`
1735.                      `{`
1736.                          `'addressingModeOverride': 'lid',`
1737.                          `'memberAddMode': options.memberAddMode ?? false,`
1738.                          `'membershipApprovalMode': options.membershipApprovalMode ?? false,`
1739.                          `'announce': options.announce ?? false,`
1740.                          `'restrict': options.isRestrict !== undefined ? !options.isRestrict : false,`
1741.                          `'ephemeralDuration': messageTimer,`
1742.                          `'parentGroupId': parentGroupWid,`
1743.                          `'title': title,`
1744.                      `},`
1745.                      `participantWids`
1746.                  `);`
1747.              `} catch (err) {`
1748.                  `return 'CreateGroupError: An unknown error occupied while creating a group';`
1749.              `}`

1751.              `for (const participant of createGroupResult.participants) {`
1752.                  `let isInviteV4Sent = false;`
1753.                  `participant.wid.server == 'lid' &amp;&amp; (participant.wid = window.Store.LidUtils.getPhoneNumber(participant.wid));`
1754.                  `const participantId = participant.wid._serialized;`
1755.                  `const statusCode = participant.error || 200;`

1757.                  `if (autoSendInviteV4 &amp;&amp; statusCode === 403) {`
1758.                      `window.Store.Contact.gadd(participant.wid, { silent: true });`
1759.                      `const addParticipantResult = await window.Store.GroupInviteV4.sendGroupInviteMessage(`
1760.                          `window.Store.Chat.get(participant.wid) || await window.Store.Chat.find(participant.wid),`
1761.                          `createGroupResult.wid._serialized,`
1762.                          `createGroupResult.subject,`
1763.                          `participant.invite_code,`
1764.                          `participant.invite_code_exp,`
1765.                          `comment,`
1766.                          `await window.WWebJS.getProfilePicThumbToBase64(createGroupResult.wid)`
1767.                      `);`
1768.                      `isInviteV4Sent = addParticipantResult.messageSendResult === 'OK';`
1769.                  `}`

1771.                  `participantData[participantId] = {`
1772.                      `statusCode: statusCode,`
1773.                      `message: addParticipantResultCodes[statusCode] || addParticipantResultCodes.default,`
1774.                      `isGroupCreator: participant.type === 'superadmin',`
1775.                      `isInviteV4Sent: isInviteV4Sent`
1776.                  `};`
1777.              `}`

1779.              `for (const f of failedParticipants) {`
1780.                  `participantData[f] = {`
1781.                      `statusCode: 404,`
1782.                      `message: addParticipantResultCodes[404],`
1783.                      `isGroupCreator: false,`
1784.                      `isInviteV4Sent: false`
1785.                  `};`
1786.              `}`

1788.              `return { title: title, gid: createGroupResult.wid, participants: participantData };`
1789.          `}, title, participants, options);`
1790.      `}`

1792.      `/**`
1793.       `* An object that handles the result for {@link createChannel} method`
1794.       `* @typedef {Object} CreateChannelResult`
1795.       `* @property {string} title A channel title`
1796.       `* @property {ChatId} nid An object that handels the newly created channel ID`
1797.       `* @property {string} nid.server 'newsletter'`
1798.       `* @property {string} nid.user 'XXXXXXXXXX'`
1799.       `* @property {string} nid._serialized 'XXXXXXXXXX@newsletter'`
1800.       `* @property {string} inviteLink The channel invite link, starts with 'https://whatsapp.com/channel/'`
1801.       `* @property {number} createdAtTs The timestamp the channel was created at`
1802.       `*/`

1804.      `/**`
1805.       `* Options for the channel creation`
1806.       `* @typedef {Object} CreateChannelOptions`
1807.       `* @property {?string} description The channel description`
1808.       `* @property {?MessageMedia} picture The channel profile picture`
1809.       `*/`

1811.      `/**`
1812.       `* Creates a new channel`
1813.       `* @param {string} title The channel name`
1814.       `* @param {CreateChannelOptions} options` 
1815.       `* @returns {Promise&lt;CreateChannelResult|string>} Returns an object that handles the result for the channel creation or an error message as a string`
1816.       `*/`
1817.      `async createChannel(title, options = {}) {`
1818.          `return await this.pupPage.evaluate(async (title, options) => {`
1819.              `let response, { description = null, picture = null } = options;`

1821.              `if (!window.Store.ChannelUtils.isNewsletterCreationEnabled()) {`
1822.                  `return 'CreateChannelError: A channel creation is not enabled';`
1823.              `}`

1825.              `if (picture) {`
1826.                  `picture = await window.WWebJS.cropAndResizeImage(picture, {`
1827.                      `asDataUrl: true,`
1828.                      `mimetype: 'image/jpeg',`
1829.                      `size: 640,`
1830.                      `quality: 1`
1831.                  `});`
1832.              `}`

1834.              `try {`
1835.                  `response = await window.Store.ChannelUtils.createNewsletterQuery({`
1836.                      `name: title,`
1837.                      `description: description,`
1838.                      `picture: picture,`
1839.                  `});`
1840.              `} catch (err) {`
1841.                  `if (err.name === 'ServerStatusCodeError') {`
1842.                      `return 'CreateChannelError: An error occupied while creating a channel';`
1843.                  `}`
1844.                  `throw err;`
1845.              `}`

1847.              `return {`
1848.                  `title: title,`
1849.                  `nid: window.Store.JidToWid.newsletterJidToWid(response.idJid),`
1850.                  ``inviteLink: `https://whatsapp.com/channel/${response.newsletterInviteLinkMetadataMixin.inviteCode}`,``
1851.                  `createdAtTs: response.newsletterCreationTimeMetadataMixin.creationTimeValue`
1852.              `};`
1853.          `}, title, options);`
1854.      `}`

1856.      `/**`
1857.       `* Subscribe to channel`
1858.       `* @param {string} channelId The channel ID`
1859.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1860.       `*/`
1861.      `async subscribeToChannel(channelId) {`
1862.          `return await this.pupPage.evaluate(async (channelId) => {`
1863.              `return await window.WWebJS.subscribeToUnsubscribeFromChannel(channelId, 'Subscribe');`
1864.          `}, channelId);`
1865.      `}`

1867.      `/**`
1868.       `* Options for unsubscribe from a channel`
1869.       `* @typedef {Object} UnsubscribeOptions`
1870.       `* @property {boolean} [deleteLocalModels = false] If true, after an unsubscription, it will completely remove a channel from the channel collection making it seem like the current user have never interacted with it. Otherwise it will only remove a channel from the list of channels the current user is subscribed to and will set the membership type for that channel to GUEST`
1871.       `*/`

1873.      `/**`
1874.       `* Unsubscribe from channel`
1875.       `* @param {string} channelId The channel ID`
1876.       `* @param {UnsubscribeOptions} options`
1877.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1878.       `*/`
1879.      `async unsubscribeFromChannel(channelId, options) {`
1880.          `return await this.pupPage.evaluate(async (channelId, options) => {`
1881.              `return await window.WWebJS.subscribeToUnsubscribeFromChannel(channelId, 'Unsubscribe', options);`
1882.          `}, channelId, options);`
1883.      `}`

1885.      `/**`
1886.       `* Options for transferring a channel ownership to another user`
1887.       `* @typedef {Object} TransferChannelOwnershipOptions`
1888.       `* @property {boolean} [shouldDismissSelfAsAdmin = false] If true, after the channel ownership is being transferred to another user, the current user will be dismissed as a channel admin and will become to a channel subscriber.`
1889.       `*/`

1891.      `/**`
1892.       `* Transfers a channel ownership to another user.`
1893.       `* Note: the user you are transferring the channel ownership to must be a channel admin.`
1894.       `* @param {string} channelId`
1895.       `* @param {string} newOwnerId`
1896.       `* @param {TransferChannelOwnershipOptions} options`
1897.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1898.       `*/`
1899.      `async transferChannelOwnership(channelId, newOwnerId, options = {}) {`
1900.          `return await this.pupPage.evaluate(async (channelId, newOwnerId, options) => {`
1901.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
1902.              `const newOwner = window.Store.Contact.get(newOwnerId) || (await window.Store.Contact.find(newOwnerId));`
1903.              `if (!channel.newsletterMetadata) {`
1904.                  `await window.Store.NewsletterMetadataCollection.update(channel.id);`
1905.              `}`

1907.              `try {`
1908.                  `await window.Store.ChannelUtils.changeNewsletterOwnerAction(channel, newOwner);`

1910.                  `if (options.shouldDismissSelfAsAdmin) {`
1911.                      `const meContact = window.Store.ContactCollection.getMeContact();`
1912.                      `meContact &amp;&amp; (await window.Store.ChannelUtils.demoteNewsletterAdminAction(channel, meContact));`
1913.                  `}`
1914.              `} catch (error) {`
1915.                  `return false;`
1916.              `}`

1918.              `return true;`
1919.          `}, channelId, newOwnerId, options);`
1920.      `}`

1922.      `/**`
1923.       `* Searches for channels based on search criteria, there are some notes:`
1924.       `* 1. The method finds only channels you are not subscribed to currently`
1925.       `* 2. If you have never been subscribed to a found channel`
1926.       `* or you have unsubscribed from it with {@link UnsubscribeOptions.deleteLocalModels} set to 'true',`
1927.       `* the lastMessage property of a found channel will be 'null'`
1928.       `*`
1929.       `* @param {Object} searchOptions Search options`
1930.       `* @param {string} [searchOptions.searchText = ''] Text to search`
1931.       `* @param {Array&lt;string>} [searchOptions.countryCodes = [your local region]] Array of country codes in 'ISO 3166-1 alpha-2' standart (@see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) to search for channels created in these countries`
1932.       `* @param {boolean} [searchOptions.skipSubscribedNewsletters = false] If true, channels that user is subscribed to won't appear in found channels`
1933.       `* @param {number} [searchOptions.view = 0] View type, makes sense only when the searchText is empty. Valid values to provide are:`
1934.       `* 0 for RECOMMENDED channels`
1935.       `* 1 for TRENDING channels`
1936.       `* 2 for POPULAR channels`
1937.       `* 3 for NEW channels`
1938.       `* @param {number} [searchOptions.limit = 50] The limit of found channels to be appear in the returnig result`
1939.       `* @returns {Promise&lt;Array&lt;Channel>>} Returns an array of Channel objects or an empty array if no channels were found`
1940.       `*/`
1941.      `async searchChannels(searchOptions = {}) {`
1942.          `return await this.pupPage.evaluate(async ({`
1943.              `searchText = '',`
1944.              `countryCodes = [window.Store.ChannelUtils.currentRegion],`
1945.              `skipSubscribedNewsletters = false,`
1946.              `view = 0,`
1947.              `limit = 50`
1948.          `}) => {`
1949.              `searchText = searchText.trim();`
1950.              `const currentRegion = window.Store.ChannelUtils.currentRegion;`
1951.              `if (![0, 1, 2, 3].includes(view)) view = 0;`

1953.              `countryCodes = countryCodes.length === 1 &amp;&amp; countryCodes[0] === currentRegion`
1954.                  `? countryCodes`
1955.                  `: countryCodes.filter((code) => Object.keys(window.Store.ChannelUtils.countryCodesIso).includes(code));`

1957.              `const viewTypeMapping = {`
1958.                  `0: 'RECOMMENDED',`
1959.                  `1: 'TRENDING',`
1960.                  `2: 'POPULAR',`
1961.                  `3: 'NEW'`
1962.              `};`

1964.              `searchOptions = {`
1965.                  `searchText: searchText,`
1966.                  `countryCodes: countryCodes,`
1967.                  `skipSubscribedNewsletters: skipSubscribedNewsletters,`
1968.                  `view: viewTypeMapping[view],`
1969.                  `categories: [],`
1970.                  `cursorToken: ''`
1971.              `};`

1973.              `const originalFunction = window.Store.ChannelUtils.getNewsletterDirectoryPageSize;`
1974.              `limit !== 50 &amp;&amp; (window.Store.ChannelUtils.getNewsletterDirectoryPageSize = () => limit);`

1976.              `const channels = (await window.Store.ChannelUtils.fetchNewsletterDirectories(searchOptions)).newsletters;`

1978.              `limit !== 50 &amp;&amp; (window.Store.ChannelUtils.getNewsletterDirectoryPageSize = originalFunction);`

1980.              `return channels`
1981.                  `? await Promise.all(channels.map((channel) => window.WWebJS.getChatModel(channel, { isChannel: true })))`
1982.                  `: [];`
1983.          `}, searchOptions);`
1984.      `}`

1986.      `/**`
1987.       `* Deletes the channel you created`
1988.       `* @param {string} channelId The ID of a channel to delete`
1989.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1990.       `*/`
1991.      `async deleteChannel(channelId) {`
1992.          `return await this.client.pupPage.evaluate(async (channelId) => {`
1993.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
1994.              `if (!channel) return false;`
1995.              `try {`
1996.                  `await window.Store.ChannelUtils.deleteNewsletterAction(channel);`
1997.                  `return true;`
1998.              `} catch (err) {`
1999.                  `if (err.name === 'ServerStatusCodeError') return false;`
2000.                  `throw err;`
2001.              `}`
2002.          `}, channelId);`
2003.      `}`

2005.      `/**`
2006.       `* Get all current Labels`
2007.       `* @returns {Promise&lt;Array&lt;Label>>}`
2008.       `*/`
2009.      `async getLabels() {`
2010.          `const labels = await this.pupPage.evaluate(async () => {`
2011.              `return window.WWebJS.getLabels();`
2012.          `});`

2014.          `return labels.map(data => new Label(this, data));`
2015.      `}`

2017.      `/**`
2018.       `* Get all current Broadcast`
2019.       `* @returns {Promise&lt;Array&lt;Broadcast>>}`
2020.       `*/`
2021.      `async getBroadcasts() {`
2022.          `const broadcasts = await this.pupPage.evaluate(async () => {`
2023.              `return window.WWebJS.getAllStatuses();`
2024.          `});`
2025.          `return broadcasts.map(data => new Broadcast(this, data));`
2026.      `}`

2028.      `/**`
2029.       `* Get broadcast instance by current user ID`
2030.       `* @param {string} contactId`
2031.       `* @returns {Promise&lt;Broadcast>}`
2032.       `*/`
2033.      `async getBroadcastById(contactId) {`
2034.          `const broadcast = await this.pupPage.evaluate(async (userId) => {`
2035.              `let status;`
2036.              `try {`
2037.                  `status = window.Store.Status.get(userId);`
2038.                  `if (!status) {`
2039.                      `status = await window.Store.Status.find(userId);`
2040.                  `}`
2041.              `} catch {`
2042.                  `status = null;`
2043.              `}`

2045.              `if (status) return window.WWebJS.getStatusModel(status);`
2046.          `}, contactId);`
2047.          `return new Broadcast(this, broadcast);`
2048.      `}`

2050.      `/**`
2051.       `* Revoke current own status messages`
2052.       `* @param {string} messageId`
2053.       `* @returns {Promise&lt;void>}`
2054.       `*/`
2055.      `async revokeStatusMessage(messageId) {`
2056.          `return await this.pupPage.evaluate(async (msgId) => {`
2057.              `const status = window.Store.Status.getMyStatus();`
2058.              `if (!status) return;`

2060.              `const msg =`
2061.                  `window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
2062.              `if (!msg) return;`

2064.              `if (!msg.id.fromMe || !msg.id.remote.isStatus())`
2065.                  `throw 'Invalid usage! Can only revoke the message its from own status broadcast';`

2067.              `return await window.Store.StatusUtils.sendStatusRevokeMsgAction(status, msg);`
2068.          `}, messageId);`
2069.      `}`

2071.      `/**`
2072.       `* Get Label instance by ID`
2073.       `* @param {string} labelId`
2074.       `* @returns {Promise&lt;Label>}`
2075.       `*/`
2076.      `async getLabelById(labelId) {`
2077.          `const label = await this.pupPage.evaluate(async (labelId) => {`
2078.              `return window.WWebJS.getLabel(labelId);`
2079.          `}, labelId);`

2081.          `return new Label(this, label);`
2082.      `}`

2084.      `/**`
2085.       `* Get all Labels assigned to a chat` 
2086.       `* @param {string} chatId`
2087.       `* @returns {Promise&lt;Array&lt;Label>>}`
2088.       `*/`
2089.      `async getChatLabels(chatId) {`
2090.          `const labels = await this.pupPage.evaluate(async (chatId) => {`
2091.              `return window.WWebJS.getChatLabels(chatId);`
2092.          `}, chatId);`

2094.          `return labels.map(data => new Label(this, data));`
2095.      `}`

2097.      `/**`
2098.       `* Get all Chats for a specific Label`
2099.       `* @param {string} labelId`
2100.       `* @returns {Promise&lt;Array&lt;Chat>>}`
2101.       `*/`
2102.      `async getChatsByLabelId(labelId) {`
2103.          `const chatIds = await this.pupPage.evaluate(async (labelId) => {`
2104.              `const label = window.Store.Label.get(labelId);`
2105.              `const labelItems = label.labelItemCollection.getModelsArray();`
2106.              `return labelItems.reduce((result, item) => {`
2107.                  `if (item.parentType === 'Chat') {`
2108.                      `result.push(item.parentId);`
2109.                  `}`
2110.                  `return result;`
2111.              `}, []);`
2112.          `}, labelId);`

2114.          `return Promise.all(chatIds.map(id => this.getChatById(id)));`
2115.      `}`

2117.      `/**`
2118.       `* Gets all blocked contacts by host account`
2119.       `* @returns {Promise&lt;Array&lt;Contact>>}`
2120.       `*/`
2121.      `async getBlockedContacts() {`
2122.          `const blockedContacts = await this.pupPage.evaluate(() => {`
2123.              `let chatIds = window.Store.Blocklist.getModelsArray().map(a => a.id._serialized);`
2124.              `return Promise.all(chatIds.map(id => window.WWebJS.getContact(id)));`
2125.          `});`

2127.          `return blockedContacts.map(contact => ContactFactory.create(this.client, contact));`
2128.      `}`

2130.      `/**`
2131.       `* Sets the current user's profile picture.`
2132.       `* @param {MessageMedia} media`
2133.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly updated.`
2134.       `*/`
2135.      `async setProfilePicture(media) {`
2136.          `const success = await this.pupPage.evaluate((chatid, media) => {`
2137.              `return window.WWebJS.setPicture(chatid, media);`
2138.          `}, this.info.wid._serialized, media);`

2140.          `return success;`
2141.      `}`

2143.      `/**`
2144.       `* Deletes the current user's profile picture.`
2145.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly deleted.`
2146.       `*/`
2147.      `async deleteProfilePicture() {`
2148.          `const success = await this.pupPage.evaluate((chatid) => {`
2149.              `return window.WWebJS.deletePicture(chatid);`
2150.          `}, this.info.wid._serialized);`

2152.          `return success;`
2153.      `}`

2155.      `/**`
2156.       `* Change labels in chats`
2157.       `* @param {Array&lt;number|string>} labelIds`
2158.       `* @param {Array&lt;string>} chatIds`
2159.       `* @returns {Promise&lt;void>}`
2160.       `*/`
2161.      `async addOrRemoveLabels(labelIds, chatIds) {`

2163.          `return this.pupPage.evaluate(async (labelIds, chatIds) => {`
2164.              `if (['smba', 'smbi'].indexOf(window.Store.Conn.platform) === -1) {`
2165.                  `throw '[LT01] Only Whatsapp business';`
2166.              `}`
2167.              `const labels = window.WWebJS.getLabels().filter(e => labelIds.find(l => l == e.id) !== undefined);`
2168.              `const chats = window.Store.Chat.filter(e => chatIds.includes(e.id._serialized));`

2170.              `let actions = labels.map(label => ({id: label.id, type: 'add'}));`

2172.              `chats.forEach(chat => {`
2173.                  `(chat.labels || []).forEach(n => {`
2174.                      `if (!actions.find(e => e.id == n)) {`
2175.                          `actions.push({id: n, type: 'remove'});`
2176.                      `}`
2177.                  `});`
2178.              `});`

2180.              `return await window.Store.Label.addOrRemoveLabels(actions, chats);`
2181.          `}, labelIds, chatIds);`
2182.      `}`

2184.      `/**`
2185.       `* An object that handles the information about the group membership request`
2186.       `* @typedef {Object} GroupMembershipRequest`
2187.       `* @property {Object} id The wid of a user who requests to enter the group`
2188.       `* @property {Object} addedBy The wid of a user who created that request`
2189.       `* @property {Object|null} parentGroupId The wid of a community parent group to which the current group is linked`
2190.       `* @property {string} requestMethod The method used to create the request: NonAdminAdd/InviteLink/LinkedGroupJoin`
2191.       `* @property {number} t The timestamp the request was created at`
2192.       `*/`

2194.      `/**`
2195.       `* Gets an array of membership requests`
2196.       `* @param {string} groupId The ID of a group to get membership requests for`
2197.       `* @returns {Promise&lt;Array&lt;GroupMembershipRequest>>} An array of membership requests`
2198.       `*/`
2199.      `async getGroupMembershipRequests(groupId) {`
2200.          `return await this.pupPage.evaluate(async (groupId) => {`
2201.              `const groupWid = window.Store.WidFactory.createWid(groupId);`
2202.              `return await window.Store.MembershipRequestUtils.getMembershipApprovalRequests(groupWid);`
2203.          `}, groupId);`
2204.      `}`

2206.      `/**`
2207.       `* An object that handles the result for membership request action`
2208.       `* @typedef {Object} MembershipRequestActionResult`
2209.       `* @property {string} requesterId User ID whos membership request was approved/rejected`
2210.       `* @property {number|undefined} error An error code that occurred during the operation for the participant`
2211.       `* @property {string} message A message with a result of membership request action`
2212.       `*/`

2214.      `/**`
2215.       `* An object that handles options for {@link approveGroupMembershipRequests} and {@link rejectGroupMembershipRequests} methods`
2216.       `* @typedef {Object} MembershipRequestActionOptions`
2217.       `* @property {Array&lt;string>|string|null} requesterIds User ID/s who requested to join the group, if no value is provided, the method will search for all membership requests for that group`
2218.       `* @property {Array&lt;number>|number|null} sleep The number of milliseconds to wait before performing an operation for the next requester. If it is an array, a random sleep time between the sleep[0] and sleep[1] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep[1] and sleep[1] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of [250, 500]`
2219.       `*/`

2221.      `/**`
2222.       `* Approves membership requests if any`
2223.       `* @param {string} groupId The group ID to get the membership request for`
2224.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
2225.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were approved and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
2226.       `*/`
2227.      `async approveGroupMembershipRequests(groupId, options = {}) {`
2228.          `return await this.pupPage.evaluate(async (groupId, options) => {`
2229.              `const { requesterIds = null, sleep = [250, 500] } = options;`
2230.              `return await window.WWebJS.membershipRequestAction(groupId, 'Approve', requesterIds, sleep);`
2231.          `}, groupId, options);`
2232.      `}`

2234.      `/**`
2235.       `* Rejects membership requests if any`
2236.       `* @param {string} groupId The group ID to get the membership request for`
2237.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
2238.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were rejected and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
2239.       `*/`
2240.      `async rejectGroupMembershipRequests(groupId, options = {}) {`
2241.          `return await this.pupPage.evaluate(async (groupId, options) => {`
2242.              `const { requesterIds = null, sleep = [250, 500] } = options;`
2243.              `return await window.WWebJS.membershipRequestAction(groupId, 'Reject', requesterIds, sleep);`
2244.          `}, groupId, options);`
2245.      `}`

2248.      `/**`
2249.       `* Setting  autoload download audio`
2250.       `* @param {boolean} flag true/false`
2251.       `*/`
2252.      `async setAutoDownloadAudio(flag) {`
2253.          `await this.pupPage.evaluate(async flag => {`
2254.              `const autoDownload = window.Store.Settings.getAutoDownloadAudio();`
2255.              `if (autoDownload === flag) {`
2256.                  `return flag;`
2257.              `}`
2258.              `await window.Store.Settings.setAutoDownloadAudio(flag);`
2259.              `return flag;`
2260.          `}, flag);`
2261.      `}`

2263.      `/**`
2264.       `* Setting  autoload download documents`
2265.       `* @param {boolean} flag true/false`
2266.       `*/`
2267.      `async setAutoDownloadDocuments(flag) {`
2268.          `await this.pupPage.evaluate(async flag => {`
2269.              `const autoDownload = window.Store.Settings.getAutoDownloadDocuments();`
2270.              `if (autoDownload === flag) {`
2271.                  `return flag;`
2272.              `}`
2273.              `await window.Store.Settings.setAutoDownloadDocuments(flag);`
2274.              `return flag;`
2275.          `}, flag);`
2276.      `}`

2278.      `/**`
2279.       `* Setting  autoload download photos`
2280.       `* @param {boolean} flag true/false`
2281.       `*/`
2282.      `async setAutoDownloadPhotos(flag) {`
2283.          `await this.pupPage.evaluate(async flag => {`
2284.              `const autoDownload = window.Store.Settings.getAutoDownloadPhotos();`
2285.              `if (autoDownload === flag) {`
2286.                  `return flag;`
2287.              `}`
2288.              `await window.Store.Settings.setAutoDownloadPhotos(flag);`
2289.              `return flag;`
2290.          `}, flag);`
2291.      `}`

2293.      `/**`
2294.       `* Setting  autoload download videos`
2295.       `* @param {boolean} flag true/false`
2296.       `*/`
2297.      `async setAutoDownloadVideos(flag) {`
2298.          `await this.pupPage.evaluate(async flag => {`
2299.              `const autoDownload = window.Store.Settings.getAutoDownloadVideos();`
2300.              `if (autoDownload === flag) {`
2301.                  `return flag;`
2302.              `}`
2303.              `await window.Store.Settings.setAutoDownloadVideos(flag);`
2304.              `return flag;`
2305.          `}, flag);`
2306.      `}`

2308.      `/**`
2309.       `* Setting background synchronization.`
2310.       `* NOTE: this action will take effect after you restart the client.`
2311.       `* @param {boolean} flag true/false`
2312.       `* @returns {Promise&lt;boolean>}`
2313.       `*/`
2314.      `async setBackgroundSync(flag) {`
2315.          `return await this.pupPage.evaluate(async flag => {`
2316.              `const backSync = window.Store.Settings.getGlobalOfflineNotifications();`
2317.              `if (backSync === flag) {`
2318.                  `return flag;`
2319.              `}`
2320.              `await window.Store.Settings.setGlobalOfflineNotifications(flag);`
2321.              `return flag;`
2322.          `}, flag);`
2323.      `}`

2325.      `/**`
2326.       `* Get user device count by ID`
2327.       `* Each WaWeb Connection counts as one device, and the phone (if exists) counts as one`
2328.       `* So for a non-enterprise user with one WaWeb connection it should return "2"`
2329.       `* @param {string} userId`
2330.       `* @returns {Promise&lt;number>}`
2331.       `*/`
2332.      `async getContactDeviceCount(userId) {`
2333.          `return await this.pupPage.evaluate(async (userId) => {`
2334.              `const devices = await window.Store.DeviceList.getDeviceIds([window.Store.WidFactory.createWid(userId)]);`
2335.              `if (devices &amp;&amp; devices.length &amp;&amp; devices[0] != null &amp;&amp; typeof devices[0].devices == 'object') {`
2336.                  `return devices[0].devices.length;`
2337.              `}`
2338.              `return 0;`
2339.          `}, userId);`
2340.      `}`

2342.      `/**`
2343.       `* Sync chat history conversation`
2344.       `* @param {string} chatId`
2345.       `* @return {Promise&lt;boolean>} True if operation completed successfully, false otherwise.`
2346.       `*/`
2347.      `async syncHistory(chatId) {`
2348.          `return await this.pupPage.evaluate(async (chatId) => {`
2349.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
2350.              `const chat = window.Store.Chat.get(chatWid) ?? (await window.Store.Chat.find(chatWid));`
2351.              `if (chat?.endOfHistoryTransferType === 0) {`
2352.                  `await window.Store.HistorySync.sendPeerDataOperationRequest(3, {`
2353.                      `chatId: chat.id`
2354.                  `});`
2355.                  `return true;`
2356.              `}`
2357.              `return false;`
2358.          `}, chatId);`
2359.      `}`

2361.      `/**`
2362.       `* Generates a WhatsApp call link (video call or voice call)`
2363.       `* @param {Date} startTime The start time of the call`
2364.       `` * @param {string} callType The type of a WhatsApp call link to generate, valid values are: `video` | `voice` ``
2365.       `* @returns {Promise&lt;string>} The WhatsApp call link (https://call.whatsapp.com/video/XxXxXxXxXxXxXx) or an empty string if a generation failed.`
2366.       `*/`
2367.      `async createCallLink(startTime, callType) {`
2368.          `if (!['video', 'voice'].includes(callType)) {`
2369.              `throw new class CreateCallLinkError extends Error {`
2370.                  `constructor(m) { super(m); }`
2371.              `}('Invalid \'callType\' parameter value is provided. Valid values are: \'voice\' | \'video\'.');`
2372.          `}`

2374.          `startTime = Math.floor(startTime.getTime() / 1000);`

2376.          `return await this.pupPage.evaluate(async (startTimeTs, callType) => {`
2377.              `const response = await window.Store.ScheduledEventMsgUtils.createEventCallLink(startTimeTs, callType);`
2378.              `return response ?? '';`
2379.          `}, startTime, callType);`
2380.      `}`

2382.      `/**`
2383.       `* Sends a response to the scheduled event message, indicating whether a user is going to attend the event or not`
2384.       ``* @param {number} response The response code to the scheduled event message. Valid values are: `0` for NONE response (removes a previous response) | `1` for GOING | `2` for NOT GOING | `3` for MAYBE going``
2385.       `* @param {string} eventMessageId The scheduled event message ID`
2386.       `* @returns {Promise&lt;boolean>}`
2387.       `*/`
2388.      `async sendResponseToScheduledEvent(response, eventMessageId) {`
2389.          `if (![0, 1, 2, 3].includes(response)) return false;`

2391.          `return await this.pupPage.evaluate(async (response, msgId) => {`
2392.              `const eventMsg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
2393.              `if (!eventMsg) return false;`

2395.              `await window.Store.ScheduledEventMsgUtils.sendEventResponseMsg(response, eventMsg);`
2396.              `return true;`
2397.          `}, response, eventMessageId);`
2398.      `}`

2400.      `/**`
2401.       `* Save new contact to user's addressbook or edit the existing one`
2402.       `* @param {string} phoneNumber The contact's phone number in a format "17182222222", where "1" is a country code`
2403.       `* @param {string} firstName` 
2404.       `* @param {string} lastName` 
2405.       `* @param {boolean} [syncToAddressbook = false] If set to true, the contact will also be saved to the user's address book on their phone. False by default`
2406.       `* @returns {Promise&lt;void>}`
2407.       `*/`
2408.      `async saveOrEditAddressbookContact(phoneNumber, firstName, lastName, syncToAddressbook = false)`
2409.      `{`
2410.          `return await this.pupPage.evaluate(async (phoneNumber, firstName, lastName, syncToAddressbook) => {`
2411.              `return await window.Store.AddressbookContactUtils.saveContactAction(`
2412.                  `phoneNumber,`
2413.                  `phoneNumber,`
2414.                  `null,`
2415.                  `null,`
2416.                  `firstName,`
2417.                  `lastName,`
2418.                  `syncToAddressbook`
2419.              `);`
2420.          `}, phoneNumber, firstName, lastName, syncToAddressbook);`
2421.      `}`

2423.      `/**`
2424.       `* Deletes the contact from user's addressbook`
2425.       `* @param {string} phoneNumber The contact's phone number in a format "17182222222", where "1" is a country code`
2426.       `* @returns {Promise&lt;void>}`
2427.       `*/`
2428.      `async deleteAddressbookContact(phoneNumber)`
2429.      `{`
2430.          `return await this.pupPage.evaluate(async (phoneNumber) => {`
2431.              `return await window.Store.AddressbookContactUtils.deleteContactAction(phoneNumber);`
2432.          `}, phoneNumber);`
2433.      `}`

2435.      `/**`
2436.       `* Get lid and phone number for multiple users`
2437.       `* @param {string[]} userIds - Array of user IDs`
2438.       `* @returns {Promise&lt;Array&lt;{ lid: string, pn: string }>>}`
2439.       `*/`
2440.      `async getContactLidAndPhone(userIds) {`
2441.          `return await this.pupPage.evaluate(async (userIds) => {`
2442.              `if (!Array.isArray(userIds)) userIds = [userIds];`

2444.              `return await Promise.all(userIds.map(async (userId) => {`
2445.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(userId);`

2447.                  `return {`
2448.                      `lid: lid?._serialized,`
2449.                      `pn: phone?._serialized`
2450.                  `};`
2451.              `}));`
2452.          `}, userIds);`
2453.      `}`

2455.      `/**`
2456.       `* Add or edit a customer note`
2457.       `* @see https://faq.whatsapp.com/1433099287594476`
2458.       `* @param {string} userId The ID of a customer to add a note to`
2459.       `* @param {string} note The note to add`
2460.       `* @returns {Promise&lt;void>}`
2461.       `*/`
2462.      `async addOrEditCustomerNote(userId, note) {`
2463.          `return await this.pupPage.evaluate(async (userId, note) => {`
2464.              `if (!window.Store.BusinessGatingUtils.smbNotesV1Enabled()) return;`

2466.              `return window.Store.CustomerNoteUtils.noteAddAction(`
2467.                  `'unstructured',`
2468.                  `window.Store.WidToJid.widToUserJid(window.Store.WidFactory.createWid(userId)),`
2469.                  `note`
2470.              `);`
2471.          `}, userId, note);`
2472.      `}`

2474.      `/**`
2475.       `* Get a customer note`
2476.       `* @see https://faq.whatsapp.com/1433099287594476`
2477.       `* @param {string} userId The ID of a customer to get a note from`
2478.       `* @returns {Promise&lt;{`
2479.       `*    chatId: string,`
2480.       `*    content: string,`
2481.       `*    createdAt: number,`
2482.       `*    id: string,`
2483.       `*    modifiedAt: number,`
2484.       `*    type: string`
2485.       `* }>}`
2486.       `*/`
2487.      `async getCustomerNote(userId) {`
2488.          `return await this.pupPage.evaluate(async (userId) => {`
2489.              `if (!window.Store.BusinessGatingUtils.smbNotesV1Enabled()) return null;`

2491.              `const note = await window.Store.CustomerNoteUtils.retrieveOnlyNoteForChatJid(`
2492.                  `window.Store.WidToJid.widToUserJid(window.Store.WidFactory.createWid(userId))`
2493.              `);`

2495.              `let serialized = note?.serialize();`

2497.              `if (!serialized) return null;`

2499.              `serialized.chatId = window.Store.JidToWid.userJidToUserWid(serialized.chatJid)._serialized;`
2500.              `delete serialized.chatJid;`

2502.              `return serialized;`
2503.          `}, userId);`
2504.      `}`

2506.      `/**`
2507.       `* Get Poll Votes`
2508.       `* @param {string} messageId`
2509.       `* @return {Promise&lt;Array&lt;PollVote>>}` 
2510.       `*/`
2511.      `async getPollVotes(messageId) {`
2512.          `const msg = await this.getMessageById(messageId);`
2513.          `if (!msg) return [];`
2514.          `if (msg.type != MessageTypes.POLL_CREATION) throw 'Invalid usage! Can only be used with a pollCreation message';`

2516.          `const pollVotes = await this.pupPage.evaluate( async (msg) => {`
2517.              `const msgKey = window.Store.MsgKey.fromString(msg.id._serialized);`
2518.              `let pollVotes = await window.Store.PollsVotesSchema.getTable().equals(['parentMsgKey'], msgKey.toString());`

2520.              `return pollVotes.map(item => {`
2521.                  `const typedArray = new Uint8Array(item.selectedOptionLocalIds);`
2522.                  `return {`
2523.                      `...item,`
2524.                      `selectedOptionLocalIds: Array.from(typedArray)`
2525.                  `};`
2526.              `});`
2527.          `}, msg);`

2529.          `return pollVotes.map((pollVote) => new PollVote(this.client, {...pollVote, parentMessage: msg}));`
2530.      `}`
2531.  `}`

2533.  `module.exports = Client;`