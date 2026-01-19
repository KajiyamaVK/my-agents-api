Source: https://docs.wwebjs.dev/structures_Chat.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Message = require('./Message');`

6.  `/**`
7.   `* Represents a Chat on WhatsApp`
8.   `* @extends {Base}`
9.   `*/`
10.  `class Chat extends Base {`
11.      `constructor(client, data) {`
12.          `super(client);`

14.          `if (data) this._patch(data);`
15.      `}`

17.      `_patch(data) {`
18.          `/**`
19.           `* ID that represents the chat`
20.           `* @type {object}`
21.           `*/`
22.          `this.id = data.id;`

24.          `/**`
25.           `* Title of the chat`
26.           `* @type {string}`
27.           `*/`
28.          `this.name = data.formattedTitle;`

30.          `/**`
31.           `* Indicates if the Chat is a Group Chat`
32.           `* @type {boolean}`
33.           `*/`
34.          `this.isGroup = data.isGroup;`

36.          `/**`
37.           `* Indicates if the Chat is readonly`
38.           `* @type {boolean}`
39.           `*/`
40.          `this.isReadOnly = data.isReadOnly;`

42.          `/**`
43.           `* Amount of messages unread`
44.           `* @type {number}`
45.           `*/`
46.          `this.unreadCount = data.unreadCount;`

48.          `/**`
49.           `* Unix timestamp for when the last activity occurred`
50.           `* @type {number}`
51.           `*/`
52.          `this.timestamp = data.t;`

54.          `/**`
55.           `* Indicates if the Chat is archived`
56.           `* @type {boolean}`
57.           `*/`
58.          `this.archived = data.archive;`

60.          `/**`
61.           `* Indicates if the Chat is pinned`
62.           `* @type {boolean}`
63.           `*/`
64.          `this.pinned = !!data.pin;`

66.          `/**`
67.           `* Indicates if the chat is muted or not`
68.           `* @type {boolean}`
69.           `*/`
70.          `this.isMuted = data.isMuted;`

72.          `/**`
73.           `* Unix timestamp for when the mute expires`
74.           `* @type {number}`
75.           `*/`
76.          `this.muteExpiration = data.muteExpiration;`

78.          `/**`
79.           `* Last message fo chat`
80.           `* @type {Message}`
81.           `*/`
82.          `this.lastMessage = data.lastMessage ? new Message(this.client, data.lastMessage) : undefined;`

84.          `return super._patch(data);`
85.      `}`

87.      `/**`
88.       `* Send a message to this chat`
89.       `* @param {string|MessageMedia|Location} content`
90.       `* @param {MessageSendOptions} [options]` 
91.       `* @returns {Promise&lt;Message>} Message that was just sent`
92.       `*/`
93.      `async sendMessage(content, options) {`
94.          `return this.client.sendMessage(this.id._serialized, content, options);`
95.      `}`

97.      `/**`
98.       `* Sets the chat as seen`
99.       `* @returns {Promise&lt;Boolean>} result`
100.       `*/`
101.      `async sendSeen() {`
102.          `return this.client.sendSeen(this.id._serialized);`
103.      `}`

105.      `/**`
106.       `* Clears all messages from the chat`
107.       `* @returns {Promise&lt;boolean>} result`
108.       `*/`
109.      `async clearMessages() {`
110.          `return this.client.pupPage.evaluate(chatId => {`
111.              `return window.WWebJS.sendClearChat(chatId);`
112.          `}, this.id._serialized);`
113.      `}`

115.      `/**`
116.       `* Deletes the chat`
117.       `* @returns {Promise&lt;Boolean>} result`
118.       `*/`
119.      `async delete() {`
120.          `return this.client.pupPage.evaluate(chatId => {`
121.              `return window.WWebJS.sendDeleteChat(chatId);`
122.          `}, this.id._serialized);`
123.      `}`

125.      `/**`
126.       `* Archives this chat`
127.       `*/`
128.      `async archive() {`
129.          `return this.client.archiveChat(this.id._serialized);`
130.      `}`

132.      `/**`
133.       `* un-archives this chat`
134.       `*/`
135.      `async unarchive() {`
136.          `return this.client.unarchiveChat(this.id._serialized);`
137.      `}`

139.      `/**`
140.       `* Pins this chat`
141.       `* @returns {Promise&lt;boolean>} New pin state. Could be false if the max number of pinned chats was reached.`
142.       `*/`
143.      `async pin() {`
144.          `return this.client.pinChat(this.id._serialized);`
145.      `}`

147.      `/**`
148.       `* Unpins this chat`
149.       `* @returns {Promise&lt;boolean>} New pin state`
150.       `*/`
151.      `async unpin() {`
152.          `return this.client.unpinChat(this.id._serialized);`
153.      `}`

155.      `/**`
156.       `* Mutes this chat forever, unless a date is specified`
157.       `* @param {?Date} unmuteDate Date when the chat will be unmuted, don't provide a value to mute forever`
158.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
159.       `*/`
160.      `async mute(unmuteDate) {`
161.          `const result = await this.client.muteChat(this.id._serialized, unmuteDate);`
162.          `this.isMuted = result.isMuted;`
163.          `this.muteExpiration = result.muteExpiration;`
164.          `return result;`
165.      `}`

167.      `/**`
168.       `* Unmutes this chat`
169.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
170.       `*/`
171.      `async unmute() {`
172.          `const result = await this.client.unmuteChat(this.id._serialized);`
173.          `this.isMuted = result.isMuted;`
174.          `this.muteExpiration = result.muteExpiration;`
175.          `return result;`
176.      `}`

178.      `/**`
179.       `* Mark this chat as unread`
180.       `*/`
181.      `async markUnread(){`
182.          `return this.client.markChatUnread(this.id._serialized);`
183.      `}`

185.      `/**`
186.       `* Loads chat messages, sorted from earliest to latest.`
187.       `* @param {Object} searchOptions Options for searching messages. Right now only limit and fromMe is supported.`
188.       `* @param {Number} [searchOptions.limit] The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages.`
189.       `* @param {Boolean} [searchOptions.fromMe] Return only messages from the bot number or vise versa. To get all messages, leave the option undefined.`
190.       `* @returns {Promise&lt;Array&lt;Message>>}`
191.       `*/`
192.      `async fetchMessages(searchOptions) {`
193.          `let messages = await this.client.pupPage.evaluate(async (chatId, searchOptions) => {`
194.              `const msgFilter = (m) => {`
195.                  `if (m.isNotification) {`
196.                      `return false; // dont include notification messages`
197.                  `}`
198.                  `if (searchOptions &amp;&amp; searchOptions.fromMe !== undefined &amp;&amp; m.id.fromMe !== searchOptions.fromMe) {`
199.                      `return false;`
200.                  `}`
201.                  `return true;`
202.              `};`

204.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
205.              `let msgs = chat.msgs.getModelsArray().filter(msgFilter);`

207.              `if (searchOptions &amp;&amp; searchOptions.limit > 0) {`
208.                  `while (msgs.length &lt; searchOptions.limit) {`
209.                      `const loadedMessages = await window.Store.ConversationMsgs.loadEarlierMsgs(chat);`
210.                      `if (!loadedMessages || !loadedMessages.length) break;`
211.                      `msgs = [...loadedMessages.filter(msgFilter), ...msgs];`
212.                  `}`

214.                  `if (msgs.length > searchOptions.limit) {`
215.                      `msgs.sort((a, b) => (a.t > b.t) ? 1 : -1);`
216.                      `msgs = msgs.splice(msgs.length - searchOptions.limit);`
217.                  `}`
218.              `}`

220.              `return msgs.map(m => window.WWebJS.getMessageModel(m));`

222.          `}, this.id._serialized, searchOptions);`

224.          `return messages.map(m => new Message(this.client, m));`
225.      `}`

227.      `/**`
228.       `* Simulate typing in chat. This will last for 25 seconds.`
229.       `*/`
230.      `async sendStateTyping() {`
231.          `return this.client.pupPage.evaluate(chatId => {`
232.              `window.WWebJS.sendChatstate('typing', chatId);`
233.              `return true;`
234.          `}, this.id._serialized);`
235.      `}`

237.      `/**`
238.       `* Simulate recording audio in chat. This will last for 25 seconds.`
239.       `*/`
240.      `async sendStateRecording() {`
241.          `return this.client.pupPage.evaluate(chatId => {`
242.              `window.WWebJS.sendChatstate('recording', chatId);`
243.              `return true;`
244.          `}, this.id._serialized);`
245.      `}`

247.      `/**`
248.       `* Stops typing or recording in chat immediately.`
249.       `*/`
250.      `async clearState() {`
251.          `return this.client.pupPage.evaluate(chatId => {`
252.              `window.WWebJS.sendChatstate('stop', chatId);`
253.              `return true;`
254.          `}, this.id._serialized);`
255.      `}`

257.      `/**`
258.       `* Returns the Contact that corresponds to this Chat.`
259.       `* @returns {Promise&lt;Contact>}`
260.       `*/`
261.      `async getContact() {`
262.          `return await this.client.getContactById(this.id._serialized);`
263.      `}`

265.      `/**`
266.       `* Returns array of all Labels assigned to this Chat`
267.       `* @returns {Promise&lt;Array&lt;Label>>}`
268.       `*/`
269.      `async getLabels() {`
270.          `return this.client.getChatLabels(this.id._serialized);`
271.      `}`

273.      `/**`
274.       `* Add or remove labels to this Chat`
275.       `* @param {Array&lt;number|string>} labelIds`
276.       `* @returns {Promise&lt;void>}`
277.       `*/`
278.      `async changeLabels(labelIds) {`
279.          `return this.client.addOrRemoveLabels(labelIds, [this.id._serialized]);`
280.      `}`

282.      `/**`
283.       `* Gets instances of all pinned messages in a chat`
284.       `* @returns {Promise&lt;Array&lt;Message>>}`
285.       `*/`
286.      `async getPinnedMessages() {`
287.          `return this.client.getPinnedMessages(this.id._serialized);`
288.      `}`

290.      `/**`
291.       `* Sync chat history conversation`
292.       `* @return {Promise&lt;boolean>} True if operation completed successfully, false otherwise.`
293.       `*/`
294.      `async syncHistory() {`
295.          `return this.client.syncHistory(this.id._serialized);`
296.      `}`

298.      `/**`
299.       `* Add or edit a customer note`
300.       `* @see https://faq.whatsapp.com/1433099287594476`
301.       `* @param {string} note The note to add`
302.       `* @returns {Promise&lt;void>}`
303.       `*/`
304.      `async addOrEditCustomerNote(note) {`
305.          `if (this.isGroup || this.isChannel) return;`

307.          `return this.client.addOrEditCustomerNote(this.id._serialized, note);`
308.      `}`

310.      `/**`
311.       `* Get a customer note`
312.       `* @see https://faq.whatsapp.com/1433099287594476`
313.       `* @returns {Promise&lt;{`
314.       `*    chatId: string,`
315.       `*    content: string,`
316.       `*    createdAt: number,`
317.       `*    id: string,`
318.       `*    modifiedAt: number,`
319.       `*    type: string`
320.       `* }>}`
321.       `*/`
322.      `async getCustomerNote() {`
323.          `if (this.isGroup || this.isChannel) return null;`

325.          `return this.client.getCustomerNote(this.id._serialized);`
326.      `}`
327.  `}`

329.  `module.exports = Chat;`