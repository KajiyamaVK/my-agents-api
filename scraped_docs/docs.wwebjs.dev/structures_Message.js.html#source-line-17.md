Source: https://docs.wwebjs.dev/structures_Message.js.html#source-line-17

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const MessageMedia = require('./MessageMedia');`
5.  `const Location = require('./Location');`
6.  `const Order = require('./Order');`
7.  `const Payment = require('./Payment');`
8.  `const Reaction = require('./Reaction');`
9.  `const Contact = require('./Contact');`
10.  `const ScheduledEvent = require('./ScheduledEvent'); // eslint-disable-line no-unused-vars`
11.  `const { MessageTypes } = require('../util/Constants');`

13.  `/**`
14.   `* Represents a Message on WhatsApp`
15.   `* @extends {Base}`
16.   `*/`
17.  `class Message extends Base {`
18.      `constructor(client, data) {`
19.          `super(client);`

21.          `if (data) this._patch(data);`
22.      `}`

24.      `_patch(data) {`
25.          `this._data = data;`

27.          `/**`
28.           `* MediaKey that represents the sticker 'ID'`
29.           `* @type {string}`
30.           `*/`
31.          `this.mediaKey = data.mediaKey;`

33.          `/**`
34.           `* ID that represents the message`
35.           `* @type {object}`
36.           `*/`
37.          `this.id = data.id;`

39.          `/**`
40.           `* ACK status for the message`
41.           `* @type {MessageAck}`
42.           `*/`
43.          `this.ack = data.ack;`

45.          `/**`
46.           `* Indicates if the message has media available for download`
47.           `* @type {boolean}`
48.           `*/`
49.          `this.hasMedia = Boolean(data.directPath);`

51.          `/**`
52.           `* Message content`
53.           `* @type {string}`
54.           `*/`
55.          `this.body = this.hasMedia ? data.caption || '' : data.body || data.pollName || data.eventName || '';`

57.          `/**`
58.           `* Message type`
59.           `* @type {MessageTypes}`
60.           `*/`
61.          `this.type = data.type;`

63.          `/**`
64.           `* Unix timestamp for when the message was created`
65.           `* @type {number}`
66.           `*/`
67.          `this.timestamp = data.t;`

69.          `/**`
70.           `* ID for the Chat that this message was sent to, except if the message was sent by the current user.`
71.           `* @type {string}`
72.           `*/`
73.          `this.from = (typeof (data.from) === 'object' &amp;&amp; data.from !== null) ? data.from._serialized : data.from;`

75.          `/**`
76.           `* ID for who this message is for.`
77.           `*`
78.           `* If the message is sent by the current user, it will be the Chat to which the message is being sent.`
79.           `* If the message is sent by another user, it will be the ID for the current user.`
80.           `* @type {string}`
81.           `*/`
82.          `this.to = (typeof (data.to) === 'object' &amp;&amp; data.to !== null) ? data.to._serialized : data.to;`

84.          `/**`
85.           `* If the message was sent to a group, this field will contain the user that sent the message.`
86.           `* @type {string}`
87.           `*/`
88.          `this.author = (typeof (data.author) === 'object' &amp;&amp; data.author !== null) ? data.author._serialized : data.author;`

90.          `/**`
91.           `* String that represents from which device type the message was sent`
92.           `* @type {string}`
93.           `*/`
94.          `this.deviceType = typeof data.id.id === 'string' &amp;&amp; data.id.id.length > 21 ? 'android' : typeof data.id.id === 'string' &amp;&amp; data.id.id.substring(0, 2) === '3A' ? 'ios' : 'web';`
95.          `/**`
96.           `* Indicates if the message was forwarded`
97.           `* @type {boolean}`
98.           `*/`
99.          `this.isForwarded = data.isForwarded;`

101.          `/**`
102.           `* Indicates how many times the message was forwarded.`
103.           `*`
104.           `* The maximum value is 127.`
105.           `* @type {number}`
106.           `*/`
107.          `this.forwardingScore = data.forwardingScore || 0;`

109.          `/**`
110.           `* Indicates if the message is a status update`
111.           `* @type {boolean}`
112.           `*/`
113.          `this.isStatus = data.isStatusV3 || data.id.remote === 'status@broadcast';`

115.          `/**`
116.           `* Indicates if the message was starred`
117.           `* @type {boolean}`
118.           `*/`
119.          `this.isStarred = data.star;`

121.          `/**`
122.           `* Indicates if the message was a broadcast`
123.           `* @type {boolean}`
124.           `*/`
125.          `this.broadcast = data.broadcast;`

127.          `/**`
128.           `* Indicates if the message was sent by the current user`
129.           `* @type {boolean}`
130.           `*/`
131.          `this.fromMe = data.id.fromMe;`

133.          `/**`
134.           `* Indicates if the message was sent as a reply to another message.`
135.           `* @type {boolean}`
136.           `*/`
137.          `this.hasQuotedMsg = data.quotedMsg ? true : false;`

139.          `/**`
140.           `* Indicates whether there are reactions to the message`
141.           `* @type {boolean}`
142.           `*/`
143.          `this.hasReaction = data.hasReaction ? true : false;`

145.          `/**`
146.           `* Indicates the duration of the message in seconds`
147.           `* @type {string}`
148.           `*/`
149.          `this.duration = data.duration ? data.duration : undefined;`

151.          `/**`
152.           `* Location information contained in the message, if the message is type "location"`
153.           `* @type {Location}`
154.           `*/`
155.          `this.location = (() => {`
156.              `if (data.type !== MessageTypes.LOCATION) {`
157.                  `return undefined;`
158.              `}`
159.              `let description;`
160.              `if (data.loc &amp;&amp; typeof data.loc === 'string') {`
161.                  `let splitted = data.loc.split('\n');`
162.                  `description = {`
163.                      `name: splitted[0],`
164.                      `address: splitted[1],`
165.                      `url: data.clientUrl`
166.                  `};`
167.              `}`
168.              `return new Location(data.lat, data.lng, description);`
169.          `})();`

171.          `/**`
172.           `* List of vCards contained in the message.`
173.           `* @type {Array&lt;string>}`
174.           `*/`
175.          `this.vCards = data.type === MessageTypes.CONTACT_CARD_MULTI ? data.vcardList.map((c) => c.vcard) : data.type === MessageTypes.CONTACT_CARD ? [data.body] : [];`

177.          `/**`
178.           `* Group Invite Data`
179.           `* @type {object}`
180.           `*/`
181.          `this.inviteV4 = data.type === MessageTypes.GROUP_INVITE ? {`
182.              `inviteCode: data.inviteCode,`
183.              `inviteCodeExp: data.inviteCodeExp,`
184.              `groupId: data.inviteGrp,`
185.              `groupName: data.inviteGrpName,`
186.              `fromId: typeof data.from === 'object' &amp;&amp; '_serialized' in data.from ? data.from._serialized : data.from,`
187.              `toId: typeof data.to === 'object' &amp;&amp; '_serialized' in data.to ? data.to._serialized : data.to`
188.          `} : undefined;`

190.          `/**`
191.           `* Indicates the mentions in the message body.`
192.           `* @type {string[]}`
193.           `*/`
194.          `this.mentionedIds = data.mentionedJidList || [];`

196.          `/**`
197.           `* @typedef {Object} GroupMention`
198.           `* @property {string} groupSubject The name  of the group`
199.           `* @property {string} groupJid The group ID`
200.           `*/`

202.          `/**`
203.           `* Indicates whether there are group mentions in the message body`
204.           `* @type {GroupMention[]}`
205.           `*/`
206.          `this.groupMentions = data.groupMentions || [];`

208.          `/**`
209.           `* Order ID for message type ORDER`
210.           `* @type {string}`
211.           `*/`
212.          `this.orderId = data.orderId ? data.orderId : undefined;`
213.          `/**`
214.           `* Order Token for message type ORDER`
215.           `* @type {string}`
216.           `*/`
217.          `this.token = data.token ? data.token : undefined;`

219.          `/**` 
220.           `* Indicates whether the message is a Gif`
221.           `* @type {boolean}`
222.           `*/`
223.          `this.isGif = Boolean(data.isGif);`

225.          `/**`
226.           `* Indicates if the message will disappear after it expires`
227.           `* @type {boolean}`
228.           `*/`
229.          `this.isEphemeral = data.isEphemeral;`

231.          `/** Title */`
232.          `if (data.title) {`
233.              `this.title = data.title;`
234.          `}`

236.          `/** Description */`
237.          `if (data.description) {`
238.              `this.description = data.description;`
239.          `}`

241.          `/** Business Owner JID */`
242.          `if (data.businessOwnerJid) {`
243.              `this.businessOwnerJid = data.businessOwnerJid;`
244.          `}`

246.          `/** Product ID */`
247.          `if (data.productId) {`
248.              `this.productId = data.productId;`
249.          `}`

251.          `/** Last edit time */`
252.          `if (data.latestEditSenderTimestampMs) {`
253.              `this.latestEditSenderTimestampMs = data.latestEditSenderTimestampMs;`
254.          `}`

256.          `/** Last edit message author */`
257.          `if (data.latestEditMsgKey) {`
258.              `this.latestEditMsgKey = data.latestEditMsgKey;`
259.          `}`

261.          `/**`
262.           `* Protocol message key.`
263.           `* Can be used to retrieve the ID of an original message that was revoked.`
264.           `*/`
265.          `if (data.protocolMessageKey) {`
266.              `this.protocolMessageKey = data.protocolMessageKey;`
267.          `}`

269.          `/**`
270.           `* Links included in the message.`
271.           `* @type {Array&lt;{link: string, isSuspicious: boolean}>}`
272.           `*`
273.           `*/`
274.          `this.links = data.links;`

276.          `/** Buttons */`
277.          `if (data.dynamicReplyButtons) {`
278.              `this.dynamicReplyButtons = data.dynamicReplyButtons;`
279.          `}`

281.          `/** Selected Button Id **/`
282.          `if (data.selectedButtonId) {`
283.              `this.selectedButtonId = data.selectedButtonId;`
284.          `}`

286.          `/** Selected List row Id **/`
287.          `if (data.listResponse &amp;&amp; data.listResponse.singleSelectReply.selectedRowId) {`
288.              `this.selectedRowId = data.listResponse.singleSelectReply.selectedRowId;`
289.          `}`

291.          `if (this.type === MessageTypes.POLL_CREATION) {`
292.              `this.pollName = data.pollName;`
293.              `this.pollOptions = data.pollOptions;`
294.              `this.allowMultipleAnswers = Boolean(!data.pollSelectableOptionsCount);`
295.              `this.pollInvalidated = data.pollInvalidated;`
296.              `this.isSentCagPollCreation = data.isSentCagPollCreation;`
297.              `this.messageSecret = data.messageSecret ? Object.keys(data.messageSecret).map((key) => data.messageSecret[key]) : [];`
298.          `}`

300.          `return super._patch(data);`
301.      `}`

303.      `_getChatId() {`
304.          `return this.fromMe ? this.to : this.from;`
305.      `}`

307.      `/**`
308.       `* Reloads this Message object's data in-place with the latest values from WhatsApp Web.` 
309.       `* Note that the Message must still be in the web app cache for this to work, otherwise will return null.`
310.       `* @returns {Promise&lt;Message>}`
311.       `*/`
312.      `async reload() {`
313.          `const newData = await this.client.pupPage.evaluate(async (msgId) => {`
314.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
315.              `if (!msg) return null;`
316.              `return window.WWebJS.getMessageModel(msg);`
317.          `}, this.id._serialized);`

319.          `if(!newData) return null;`

321.          `this._patch(newData);`
322.          `return this;`
323.      `}`

325.      `/**`
326.       `* Returns message in a raw format`
327.       `* @type {Object}`
328.       `*/`
329.      `get rawData() {`
330.          `return this._data;`
331.      `}`

333.      `/**`
334.       `* Returns the Chat this message was sent in`
335.       `* @returns {Promise&lt;Chat>}`
336.       `*/`
337.      `getChat() {`
338.          `return this.client.getChatById(this._getChatId());`
339.      `}`

341.      `/**`
342.       `* Returns the Contact this message was sent from`
343.       `* @returns {Promise&lt;Contact>}`
344.       `*/`
345.      `getContact() {`
346.          `return this.client.getContactById(this.author || this.from);`
347.      `}`

349.      `/**`
350.       `* Returns the Contacts mentioned in this message`
351.       `* @returns {Promise&lt;Array&lt;Contact>>}`
352.       `*/`
353.      `async getMentions() {`
354.          `return await Promise.all(this.mentionedIds.map(async m => await this.client.getContactById(m)));`
355.      `}`

357.      `/**`
358.       `* Returns groups mentioned in this message`
359.       `* @returns {Promise&lt;Array&lt;GroupChat>>}`
360.       `*/`
361.      `async getGroupMentions() {`
362.          `return await Promise.all(this.groupMentions.map(async (m) => await this.client.getChatById(m.groupJid._serialized)));`
363.      `}`

365.      `/**`
366.       `* Returns the quoted message, if any`
367.       `* @returns {Promise&lt;Message>}`
368.       `*/`
369.      `async getQuotedMessage() {`
370.          `if (!this.hasQuotedMsg) return undefined;`

372.          `const quotedMsg = await this.client.pupPage.evaluate(async (msgId) => {`
373.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
374.              `const quotedMsg = window.Store.QuotedMsg.getQuotedMsgObj(msg);`
375.              `return window.WWebJS.getMessageModel(quotedMsg);`
376.          `}, this.id._serialized);`

378.          `return new Message(this.client, quotedMsg);`
379.      `}`

381.      `/**`
382.       `* Sends a message as a reply to this message. If chatId is specified, it will be sent`
383.       `* through the specified Chat. If not, it will send the message`
384.       `* in the same Chat as the original message was sent.`
385.       `*`
386.       `* @param {string|MessageMedia|Location} content`
387.       `* @param {string} [chatId]`
388.       `* @param {MessageSendOptions} [options]`
389.       `* @returns {Promise&lt;Message>}`
390.       `*/`
391.      `async reply(content, chatId, options = {}) {`
392.          `if (!chatId) {`
393.              `chatId = this._getChatId();`
394.          `}`

396.          `options = {`
397.              `...options,`
398.              `quotedMessageId: this.id._serialized`
399.          `};`

401.          `return this.client.sendMessage(chatId, content, options);`
402.      `}`

404.      `/**`
405.       `* React to this message with an emoji`
406.       `* @param {string} reaction - Emoji to react with. Send an empty string to remove the reaction.`
407.       `* @return {Promise}`
408.       `*/`
409.      `async react(reaction){`
410.          `await this.client.pupPage.evaluate(async (messageId, reaction) => {`
411.              `if (!messageId) return null;`
412.              `const msg =`
413.                  `window.Store.Msg.get(messageId) || (await window.Store.Msg.getMessagesById([messageId]))?.messages?.[0];`
414.              `if(!msg) return null;`
415.              `await window.Store.sendReactionToMsg(msg, reaction);`
416.          `}, this.id._serialized, reaction);`
417.      `}`

419.      `/**`
420.       `* Accept Group V4 Invite`
421.       `* @returns {Promise&lt;Object>}`
422.       `*/`
423.      `async acceptGroupV4Invite() {`
424.          `return await this.client.acceptGroupV4Invite(this.inviteV4);`
425.      `}`

427.      `/**`
428.       `* Forwards this message to another chat (that you chatted before, otherwise it will fail)`
429.       `*`
430.       `* @param {string|Chat} chat Chat model or chat ID to which the message will be forwarded`
431.       `* @returns {Promise}`
432.       `*/`
433.      `async forward(chat) {`
434.          `const chatId = typeof chat === 'string' ? chat : chat.id._serialized;`

436.          `await this.client.pupPage.evaluate(async (msgId, chatId) => {`
437.              `return window.WWebJS.forwardMessage(chatId, msgId);`
438.          `}, this.id._serialized, chatId);`
439.      `}`

441.      `/**`
442.       `* Downloads and returns the attatched message media`
443.       `* @returns {Promise&lt;MessageMedia>}`
444.       `*/`
445.      `async downloadMedia() {`
446.          `if (!this.hasMedia) {`
447.              `return undefined;`
448.          `}`

450.          `const result = await this.client.pupPage.evaluate(async (msgId) => {`
451.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`

453.              `// REUPLOADING mediaStage means the media is expired and the download button is spinning, cannot be downloaded now`
454.              `if (!msg || !msg.mediaData || msg.mediaData.mediaStage === 'REUPLOADING') {`
455.                  `return null;`
456.              `}`
457.              `if (msg.mediaData.mediaStage != 'RESOLVED') {`
458.                  `// try to resolve media`
459.                  `await msg.downloadMedia({`
460.                      `downloadEvenIfExpensive: true,`
461.                      `rmrReason: 1`
462.                  `});`
463.              `}`

465.              `if (msg.mediaData.mediaStage.includes('ERROR') || msg.mediaData.mediaStage === 'FETCHING') {`
466.                  `// media could not be downloaded`
467.                  `return undefined;`
468.              `}`

470.              `try {`
471.                  `const mockQpl = {`
472.                      `addAnnotations: function() { return this; },`
473.                      `addPoint: function() { return this; }`
474.                  `};`
475.                  `const decryptedMedia = await window.Store.DownloadManager.downloadAndMaybeDecrypt({`
476.                      `directPath: msg.directPath,`
477.                      `encFilehash: msg.encFilehash,`
478.                      `filehash: msg.filehash,`
479.                      `mediaKey: msg.mediaKey,`
480.                      `mediaKeyTimestamp: msg.mediaKeyTimestamp,`
481.                      `type: msg.type,`
482.                      `signal: (new AbortController).signal,`
483.                      `downloadQpl: mockQpl`
484.                  `});`

486.                  `const data = await window.WWebJS.arrayBufferToBase64Async(decryptedMedia);`

488.                  `return {`
489.                      `data,`
490.                      `mimetype: msg.mimetype,`
491.                      `filename: msg.filename,`
492.                      `filesize: msg.size`
493.                  `};`
494.              `} catch (e) {`
495.                  `if(e.status &amp;&amp; e.status === 404) return undefined;`
496.                  `throw e;`
497.              `}`
498.          `}, this.id._serialized);`

500.          `if (!result) return undefined;`
501.          `return new MessageMedia(result.mimetype, result.data, result.filename, result.filesize);`
502.      `}`

504.      `/**`
505.       `* Deletes a message from the chat`
506.       `* @param {?boolean} everyone If true and the message is sent by the current user or the user is an admin, will delete it for everyone in the chat.`
507.       `* @param {?boolean} [clearMedia = true] If true, any associated media will also be deleted from a device.`
508.       `*/`
509.      `async delete(everyone, clearMedia = true) {`
510.          `await this.client.pupPage.evaluate(async (msgId, everyone, clearMedia) => {`
511.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
512.              `const chat = window.Store.Chat.get(msg.id.remote) || (await window.Store.Chat.find(msg.id.remote));`

514.              `const canRevoke =`
515.                  `window.Store.MsgActionChecks.canSenderRevokeMsg(msg) || window.Store.MsgActionChecks.canAdminRevokeMsg(msg);`

517.              `if (everyone &amp;&amp; canRevoke) {`
518.                  `return window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.0')`
519.                      `? window.Store.Cmd.sendRevokeMsgs(chat, { list: [msg], type: 'message' }, { clearMedia: clearMedia })`
520.                      `: window.Store.Cmd.sendRevokeMsgs(chat, [msg], { clearMedia: true, type: msg.id.fromMe ? 'Sender' : 'Admin' });`
521.              `}`

523.              `return window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.0')`
524.                  `? window.Store.Cmd.sendDeleteMsgs(chat, { list: [msg], type: 'message' }, clearMedia)`
525.                  `: window.Store.Cmd.sendDeleteMsgs(chat, [msg], clearMedia);`
526.          `}, this.id._serialized, everyone, clearMedia);`
527.      `}`

529.      `/**`
530.       `* Stars this message`
531.       `*/`
532.      `async star() {`
533.          `await this.client.pupPage.evaluate(async (msgId) => {`
534.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
535.              `if (window.Store.MsgActionChecks.canStarMsg(msg)) {`
536.                  `let chat = await window.Store.Chat.find(msg.id.remote);`
537.                  `return window.Store.Cmd.sendStarMsgs(chat, [msg], false);`
538.              `}`
539.          `}, this.id._serialized);`
540.      `}`

542.      `/**`
543.       `* Unstars this message`
544.       `*/`
545.      `async unstar() {`
546.          `await this.client.pupPage.evaluate(async (msgId) => {`
547.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
548.              `if (window.Store.MsgActionChecks.canStarMsg(msg)) {`
549.                  `let chat = await window.Store.Chat.find(msg.id.remote);`
550.                  `return window.Store.Cmd.sendUnstarMsgs(chat, [msg], false);`
551.              `}`
552.          `}, this.id._serialized);`
553.      `}`

555.      `/**`
556.       `* Pins the message (group admins can pin messages of all group members)`
557.       `* @param {number} duration The duration in seconds the message will be pinned in a chat`
558.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
559.       `*/`
560.      `async pin(duration) {`
561.          `return await this.client.pupPage.evaluate(async (msgId, duration) => {`
562.              `return await window.WWebJS.pinUnpinMsgAction(msgId, 1, duration);`
563.          `}, this.id._serialized, duration);`
564.      `}`

566.      `/**`
567.       `* Unpins the message (group admins can unpin messages of all group members)`
568.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
569.       `*/`
570.      `async unpin() {`
571.          `return await this.client.pupPage.evaluate(async (msgId) => {`
572.              `return await window.WWebJS.pinUnpinMsgAction(msgId, 2, 0);`
573.          `}, this.id._serialized);`
574.      `}`

576.      `/**`
577.       `* Message Info`
578.       `* @typedef {Object} MessageInfo`
579.       `* @property {Array&lt;{id: ContactId, t: number}>} delivery Contacts to which the message has been delivered to`
580.       `* @property {number} deliveryRemaining Amount of people to whom the message has not been delivered to`
581.       `* @property {Array&lt;{id: ContactId, t: number}>} played Contacts who have listened to the voice message`
582.       `* @property {number} playedRemaining Amount of people who have not listened to the message`
583.       `* @property {Array&lt;{id: ContactId, t: number}>} read Contacts who have read the message`
584.       `* @property {number} readRemaining Amount of people who have not read the message`
585.       `*/`

587.      `/**`
588.       `* Get information about message delivery status.`
589.       `* May return null if the message does not exist or is not sent by you.`
590.       `* @returns {Promise&lt;?MessageInfo>}`
591.       `*/`
592.      `async getInfo() {`
593.          `const info = await this.client.pupPage.evaluate(async (msgId) => {`
594.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
595.              `if (!msg || !msg.id.fromMe) return null;`

597.              `return new Promise((resolve) => {`
598.                  `setTimeout(async () => {`
599.                      `resolve(await window.Store.getMsgInfo(msg.id));`
600.                  `}, (Date.now() - msg.t * 1000 &lt; 1250) &amp;&amp; Math.floor(Math.random() * (1200 - 1100 + 1)) + 1100 || 0);`
601.              `});`
602.          `}, this.id._serialized);`

604.          `return info;`
605.      `}`

607.      `/**`
608.       `* Gets the order associated with a given message`
609.       `* @return {Promise&lt;Order>}`
610.       `*/`
611.      `async getOrder() {`
612.          `if (this.type === MessageTypes.ORDER) {`
613.              `const result = await this.client.pupPage.evaluate((orderId, token, chatId) => {`
614.                  `return window.WWebJS.getOrderDetail(orderId, token, chatId);`
615.              `}, this.orderId, this.token, this._getChatId());`
616.              `if (!result) return undefined;`
617.              `return new Order(this.client, result);`
618.          `}`
619.          `return undefined;`
620.      `}`
621.      `/**`
622.       `* Gets the payment details associated with a given message`
623.       `* @return {Promise&lt;Payment>}`
624.       `*/`
625.      `async getPayment() {`
626.          `if (this.type === MessageTypes.PAYMENT) {`
627.              `const msg = await this.client.pupPage.evaluate(async (msgId) => {`
628.                  `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
629.                  `if(!msg) return null;`
630.                  `return msg.serialize();`
631.              `}, this.id._serialized);`
632.              `return new Payment(this.client, msg);`
633.          `}`
634.          `return undefined;`
635.      `}`

638.      `/**`
639.       `* Reaction List`
640.       `* @typedef {Object} ReactionList`
641.       `* @property {string} id Original emoji`
642.       `* @property {string} aggregateEmoji aggregate emoji`
643.       `* @property {boolean} hasReactionByMe Flag who sent the reaction`
644.       `* @property {Array&lt;Reaction>} senders Reaction senders, to this message`
645.       `*/`

647.      `/**`
648.       `* Gets the reactions associated with the given message`
649.       `* @return {Promise&lt;ReactionList[]>}`
650.       `*/`
651.      `async getReactions() {`
652.          `if (!this.hasReaction) {`
653.              `return undefined;`
654.          `}`

656.          `const reactions = await this.client.pupPage.evaluate(async (msgId) => {`
657.              `const msgReactions = await window.Store.Reactions.find(msgId);`
658.              `if (!msgReactions || !msgReactions.reactions.length) return null;`
659.              `return msgReactions.reactions.serialize();`
660.          `}, this.id._serialized);`

662.          `if (!reactions) {`
663.              `return undefined;`
664.          `}`

666.          `return reactions.map(reaction => {`
667.              `reaction.senders = reaction.senders.map(sender => {`
668.                  `sender.timestamp = Math.round(sender.timestamp / 1000);`
669.                  `return new Reaction(this.client, sender);`
670.              `});`
671.              `return reaction;`
672.          `});`
673.      `}`

675.      `/**`
676.       `* Edits the current message.`
677.       `* @param {string} content`
678.       `* @param {MessageEditOptions} [options] - Options used when editing the message`
679.       `* @returns {Promise&lt;?Message>}`
680.       `*/`
681.      `async edit(content, options = {}) {`
682.          `if (options.mentions) {`
683.              `!Array.isArray(options.mentions) &amp;&amp; (options.mentions = [options.mentions]);`
684.              `if (options.mentions.some((possiblyContact) => possiblyContact instanceof Contact)) {`
685.                  `console.warn('Mentions with an array of Contact are now deprecated. See more at https://github.com/pedroslopez/whatsapp-web.js/pull/2166.');`
686.                  `options.mentions = options.mentions.map((a) => a.id._serialized);`
687.              `}`
688.          `}`

690.          `options.groupMentions &amp;&amp; !Array.isArray(options.groupMentions) &amp;&amp; (options.groupMentions = [options.groupMentions]);`

692.          `let internalOptions = {`
693.              `linkPreview: options.linkPreview === false ? undefined : true,`
694.              `mentionedJidList: options.mentions || [],`
695.              `groupMentions: options.groupMentions,`
696.              `extraOptions: options.extra`
697.          `};`

699.          `if (!this.fromMe) {`
700.              `return null;`
701.          `}`
702.          `const messageEdit = await this.client.pupPage.evaluate(async (msgId, message, options) => {`
703.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
704.              `if (!msg) return null;`

706.              `let canEdit = window.Store.MsgActionChecks.canEditText(msg) || window.Store.MsgActionChecks.canEditCaption(msg);`
707.              `if (canEdit) {`
708.                  `const msgEdit = await window.WWebJS.editMessage(msg, message, options);`
709.                  `return msgEdit.serialize();`
710.              `}`
711.              `return null;`
712.          `}, this.id._serialized, content, internalOptions);`
713.          `if (messageEdit) {`
714.              `return new Message(this.client, messageEdit);`
715.          `}`
716.          `return null;`
717.      `}`

719.      `/**`
720.       `* Edits the current ScheduledEvent message.`
721.       `* Once the scheduled event is canceled, it can not be edited.`
722.       `* @param {ScheduledEvent} editedEventObject`
723.       `* @returns {Promise&lt;?Message>}`
724.       `*/`
725.      `async editScheduledEvent(editedEventObject) {`
726.          `if (!this.fromMe) {`
727.              `return null;`
728.          `}`

730.          `const edittedEventMsg = await this.client.pupPage.evaluate(async (msgId, editedEventObject) => {`
731.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
732.              `if (!msg) return null;`

734.              `const { name, startTimeTs, eventSendOptions } = editedEventObject;`
735.              `const eventOptions = {`
736.                  `name: name,`
737.                  `description: eventSendOptions.description,`
738.                  `startTime: startTimeTs,`
739.                  `endTime: eventSendOptions.endTimeTs,`
740.                  `location: eventSendOptions.location,`
741.                  `callType: eventSendOptions.callType,`
742.                  `isEventCanceled: eventSendOptions.isEventCanceled,`
743.              `};`

745.              `await window.Store.ScheduledEventMsgUtils.sendEventEditMessage(eventOptions, msg);`
746.              `const editedMsg = window.Store.Msg.get(msg.id._serialized);`
747.              `return editedMsg?.serialize();`
748.          `}, this.id._serialized, editedEventObject);`

750.          `return edittedEventMsg &amp;&amp; new Message(this.client, edittedEventMsg);`
751.      `}`
752.      `/**`
753.       `* Returns the PollVote this poll message`
754.       `* @returns {Promise&lt;PollVote[]>}`
755.       `*/`
756.      `async getPollVotes() {`
757.          `return await this.client.getPollVotes(this.id._serialized);`
758.      `}`

760.      `/**`
761.       `* Send votes to the poll message`
762.       `* @param {Array&lt;string>} selectedOptions Array of options selected.`
763.       `* @returns {Promise}`
764.       `*/`
765.      `async vote(selectedOptions) {`
766.          `if (this.type != MessageTypes.POLL_CREATION) throw 'Invalid usage! Can only be used with a pollCreation message';`

768.          `await this.client.pupPage.evaluate(async (messageId, votes) => {`
769.              `if (!messageId) return null;`
770.              `if (!Array.isArray(votes)) votes = [votes];`
771.              `let localIdSet = new Set();`
772.              `const msg =`
773.                  `window.Store.Msg.get(messageId) || (await window.Store.Msg.getMessagesById([messageId]))?.messages?.[0];`
774.              `if (!msg) return null;`

776.              `msg.pollOptions.forEach(a => {`
777.                  `for (const option of votes) {`
778.                      `if (a.name === option) localIdSet.add(a.localId);`
779.                  `}`
780.              `});`

782.              `await window.Store.PollsSendVote.sendVote(msg, localIdSet);`
783.          `}, this.id._serialized, selectedOptions);`
784.      `}`
785.  `}`

787.  `module.exports = Message;`