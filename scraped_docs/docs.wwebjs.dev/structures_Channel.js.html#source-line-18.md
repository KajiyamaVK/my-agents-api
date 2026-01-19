Source: https://docs.wwebjs.dev/structures_Channel.js.html#source-line-18

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Message = require('./Message');`

6.  `/**`
7.   `* Channel ID structure`
8.   `* @typedef {Object} ChannelId`
9.   `* @property {string} server`
10.   `* @property {string} user`
11.   `* @property {string} _serialized`
12.   `*/`

14.  `/**`
15.   `* Represents a Channel on WhatsApp`
16.   `* @extends {Base}`
17.   `*/`
18.  `class Channel extends Base {`
19.      `constructor(client, data) {`
20.          `super(client);`

22.          `if (data) this._patch(data);`
23.      `}`

25.      `_patch(data) {`
26.          `this.channelMetadata = data.channelMetadata;`

28.          `/**`
29.           `* ID that represents the channel`
30.           `* @type {ChannelId}`
31.           `*/`
32.          `this.id = data.id;`

34.          `/**`
35.           `* Title of the channel`
36.           `* @type {string}`
37.           `*/`
38.          `this.name = data.name;`

40.          `/**` 
41.           `* The channel description`
42.           `* @type {string}`
43.           `*/`
44.          `this.description = data.channelMetadata.description;`

46.          `/**`
47.           `* Indicates if it is a Channel`
48.           `* @type {boolean}`
49.           `*/`
50.          `this.isChannel = data.isChannel;`

52.          `/**`
53.           `* Indicates if it is a Group`
54.           `* @type {boolean}`
55.           `*/`
56.          `this.isGroup = data.isGroup;`

58.          `/**`
59.           `* Indicates if the channel is readonly`
60.           `* @type {boolean}`
61.           `*/`
62.          `this.isReadOnly = data.isReadOnly;`

64.          `/**`
65.           `* Amount of messages unread`
66.           `* @type {number}`
67.           `*/`
68.          `this.unreadCount = data.unreadCount;`

70.          `/**`
71.           `* Unix timestamp for when the last activity occurred`
72.           `* @type {number}`
73.           `*/`
74.          `this.timestamp = data.t;`

76.          `/**`
77.           `* Indicates if the channel is muted or not`
78.           `* @type {boolean}`
79.           `*/`
80.          `this.isMuted = data.isMuted;`

82.          `/**`
83.           `* Unix timestamp for when the mute expires`
84.           `* @type {number}`
85.           `*/`
86.          `this.muteExpiration = data.muteExpiration;`

88.          `/**`
89.           `* Last message in the channel`
90.           `* @type {Message}`
91.           `*/`
92.          `this.lastMessage = data.lastMessage ? new Message(super.client, data.lastMessage) : undefined;`

94.          `return super._patch(data);`
95.      `}`

97.      `/**`
98.       `* Gets the subscribers of the channel (only those who are in your contact list)`
99.       `* @param {?number} limit Optional parameter to specify the limit of subscribers to retrieve`
100.       `* @returns {Promise&lt;Array&lt;{contact: Contact, role: string}>>} Returns an array of objects that handle the subscribed contacts and their roles in the channel`
101.       `*/`
102.      `async getSubscribers(limit) {`
103.          `return await this.client.pupPage.evaluate(async (channelId, limit) => {`
104.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
105.              `if (!channel) return [];`
106.              `!limit &amp;&amp; (limit = window.Store.ChannelUtils.getMaxSubscriberNumber());`
107.              `const response = await window.Store.ChannelSubscribers.mexFetchNewsletterSubscribers(channelId, limit);`
108.              `const contacts = window.Store.ChannelSubscribers.getSubscribersInContacts(response.subscribers);`
109.              `return Promise.all(contacts.map((obj) => ({`
110.                  `...obj,`
111.                  `contact: window.WWebJS.getContactModel(obj.contact)`
112.              `})));`
113.          `}, this.id._serialized, limit);`
114.      `}`

116.      `/**`
117.       `* Updates the channel subject`
118.       `* @param {string} newSubject` 
119.       `* @returns {Promise&lt;boolean>} Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.`
120.       `*/`
121.      `async setSubject(newSubject) {`
122.          `const success = await this._setChannelMetadata({ name: newSubject }, { editName: true });`
123.          `success &amp;&amp; (this.name = newSubject);`
124.          `return success;`
125.      `}`

127.      `/**`
128.       `* Updates the channel description`
129.       `* @param {string} newDescription` 
130.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
131.       `*/`
132.      `async setDescription(newDescription) {`
133.          `const success = await this._setChannelMetadata({ description: newDescription }, { editDescription: true });`
134.          `success &amp;&amp; (this.description = newDescription);`
135.          `return success;`
136.      `}`

138.      `/**`
139.       `* Updates the channel profile picture`
140.       `* @param {MessageMedia} newProfilePicture` 
141.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
142.       `*/`
143.      `async setProfilePicture(newProfilePicture) {`
144.          `return await this._setChannelMetadata({ picture: newProfilePicture }, { editPicture: true });`
145.      `}`

147.      `/**`
148.       `* Updates available reactions to use in the channel`
149.       `*` 
150.       `* Valid values for passing to the method are:`
151.       `* 0 for NONE reactions to be avaliable`
152.       `* 1 for BASIC reactions to be available: 👍, ❤️, 😂, 😮, 😢, 🙏`
153.       `* 2 for ALL reactions to be available`
154.       `* @param {number} reactionCode` 
155.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
156.       `*/`
157.      `async setReactionSetting(reactionCode) {`
158.          `if (![0, 1, 2].includes(reactionCode)) return false;`
159.          `const reactionMapper = {`
160.              `0: 3,`
161.              `1: 1,`
162.              `2: 0`
163.          `};`
164.          `const success = await this._setChannelMetadata(`
165.              `{ reactionCodesSetting: reactionMapper[reactionCode] },`
166.              `{ editReactionCodesSetting: true }`
167.          `);`
168.          `success &amp;&amp; (this.channelMetadata.reactionCodesSetting = reactionCode);`
169.          `return success;`
170.      `}`

172.      `/**`
173.       `* Mutes the channel`
174.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
175.       `*/`
176.      `async mute() {`
177.          `const success = await this._muteUnmuteChannel('MUTE');`
178.          `if (success) {`
179.              `this.isMuted = true;`
180.              `this.muteExpiration = -1;`
181.          `}`
182.          `return success;`
183.      `}`

185.      `/**`
186.       `* Unmutes the channel`
187.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
188.       `*/`
189.      `async unmute() {`
190.          `const success = await this._muteUnmuteChannel('UNMUTE');`
191.          `if (success) {`
192.              `this.isMuted = false;`
193.              `this.muteExpiration = 0;`
194.          `}`
195.          `return success;`
196.      `}`

198.      `/**`
199.       `* Message options`
200.       `* @typedef {Object} MessageSendOptions`
201.       `* @property {?string} caption Image or video caption`
202.       `* @property {?string[]} mentions User IDs of user that will be mentioned in the message`
203.       `* @property {?MessageMedia} media Image or video to be sent`
204.       `*/`

206.      `/**`
207.       `* Sends a message to this channel`
208.       `* @param {string|MessageMedia} content`
209.       `* @param {?MessageSendOptions} options`
210.       `* @returns {Promise&lt;Message>} Message that was just sent`
211.       `*/`
212.      `async sendMessage(content, options) {`
213.          `return this.client.sendMessage(this.id._serialized, content, options);`
214.      `}`

216.      `/**`
217.       `* Sets the channel as seen`
218.       `* @returns {Promise&lt;boolean>}`
219.       `*/`
220.      `async sendSeen() {`
221.          `return this.client.sendSeen(this.id._serialized);`
222.      `}`

224.      `/**`
225.       `* @typedef {Object} SendChannelAdminInviteOptions`
226.       `* @property {?string} comment The comment to be added to an invitation`
227.       `*/`

229.      `/**`
230.       `* Sends a channel admin invitation to a user, allowing them to become an admin of the channel`
231.       `* @param {string} chatId The ID of a user to send the channel admin invitation to`
232.       `* @param {SendChannelAdminInviteOptions} options` 
233.       `* @returns {Promise&lt;boolean>} Returns true if an invitation was sent successfully, false otherwise`
234.       `*/`
235.      `async sendChannelAdminInvite(chatId, options = {}) {`
236.          `return this.client.sendChannelAdminInvite(chatId, this.id._serialized, options);`
237.      `}`

239.      `/**`
240.       `* Accepts a channel admin invitation and promotes the current user to a channel admin`
241.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
242.       `*/`
243.      `async acceptChannelAdminInvite() {`
244.          `return this.client.acceptChannelAdminInvite(this.id._serialized);`
245.      `}`

247.      `/**`
248.       `* Revokes a channel admin invitation sent to a user by a channel owner`
249.       `* @param {string} userId The user ID the invitation was sent to`
250.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
251.       `*/`
252.      `async revokeChannelAdminInvite(userId) {`
253.          `return this.client.revokeChannelAdminInvite(this.id._serialized, userId);`
254.      `}`

256.      `/**`
257.       `* Demotes a channel admin to a regular subscriber (can be used also for self-demotion)`
258.       `* @param {string} userId The user ID to demote`
259.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
260.       `*/`
261.      `async demoteChannelAdmin(userId) {`
262.          `return this.client.demoteChannelAdmin(this.id._serialized, userId);`
263.      `}`

265.      `/**`
266.       `* Options for transferring a channel ownership to another user`
267.       `* @typedef {Object} TransferChannelOwnershipOptions`
268.       `* @property {boolean} [shouldDismissSelfAsAdmin = false] If true, after the channel ownership is being transferred to another user, the current user will be dismissed as a channel admin and will become to a channel subscriber.`
269.       `*/`

271.      `/**`
272.       `* Transfers a channel ownership to another user.`
273.       `* Note: the user you are transferring the channel ownership to must be a channel admin.`
274.       `* @param {string} newOwnerId`
275.       `* @param {TransferChannelOwnershipOptions} options`
276.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
277.       `*/`
278.      `async transferChannelOwnership(newOwnerId, options = {}) {`
279.          `return this.client.transferChannelOwnership(this.id._serialized, newOwnerId, options);`
280.      `}`

282.      `/**`
283.       `* Loads channel messages, sorted from earliest to latest`
284.       `* @param {Object} searchOptions Options for searching messages. Right now only limit and fromMe is supported`
285.       `* @param {Number} [searchOptions.limit] The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages`
286.       `* @param {Boolean} [searchOptions.fromMe] Return only messages from the bot number or vise versa. To get all messages, leave the option undefined`
287.       `* @returns {Promise&lt;Array&lt;Message>>}`
288.       `*/`
289.      `async fetchMessages(searchOptions) {`
290.          `let messages = await this.client.pupPage.evaluate(async (channelId, searchOptions) => {`
291.              `const msgFilter = (m) => {`
292.                  `if (m.isNotification || m.type === 'newsletter_notification') {`
293.                      `return false; // dont include notification messages`
294.                  `}`
295.                  `if (searchOptions &amp;&amp; searchOptions.fromMe !== undefined &amp;&amp; m.id.fromMe !== searchOptions.fromMe) {`
296.                      `return false;`
297.                  `}`
298.                  `return true;`
299.              `};`

301.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
302.              `let msgs = channel.msgs.getModelsArray().filter(msgFilter);`

304.              `if (searchOptions &amp;&amp; searchOptions.limit > 0) {`
305.                  `while (msgs.length &lt; searchOptions.limit) {`
306.                      `const loadedMessages = await window.Store.ConversationMsgs.loadEarlierMsgs(channel);`
307.                      `if (!loadedMessages || !loadedMessages.length) break;`
308.                      `msgs = [...loadedMessages.filter(msgFilter), ...msgs];`
309.                  `}`

311.                  `if (msgs.length > searchOptions.limit) {`
312.                      `msgs.sort((a, b) => (a.t > b.t) ? 1 : -1);`
313.                      `msgs = msgs.splice(msgs.length - searchOptions.limit);`
314.                  `}`
315.              `}`

317.              `return msgs.map(m => window.WWebJS.getMessageModel(m));`

319.          `}, this.id._serialized, searchOptions);`

321.          `return messages.map((msg) => new Message(this.client, msg));`
322.      `}`

324.      `/**`
325.       `* Deletes the channel you created`
326.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
327.       `*/`
328.      `async deleteChannel() {`
329.          `return this.client.deleteChannel(this.id._serialized);`
330.      `}`

332.      `/**`
333.       `* Internal method to change the channel metadata`
334.       `* @param {string|number|MessageMedia} value The new value to set`
335.       `* @param {string} property The property of a channel metadata to change`
336.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
337.       `*/`
338.      `async _setChannelMetadata(value, property) {`
339.          `return await this.client.pupPage.evaluate(async (channelId, value, property) => {`
340.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
341.              `if (!channel) return false;`
342.              `if (property.editPicture) {`
343.                  `value.picture = value.picture`
344.                      `? await window.WWebJS.cropAndResizeImage(value.picture, {`
345.                          `asDataUrl: true,`
346.                          `mimetype: 'image/jpeg',`
347.                          `size: 640,`
348.                          `quality: 1`
349.                      `})`
350.                      `: null;`
351.              `}`
352.              `try {`
353.                  `await window.Store.ChannelUtils.editNewsletterMetadataAction(channel, property, value);`
354.                  `return true;`
355.              `} catch (err) {`
356.                  `if (err.name === 'ServerStatusCodeError') return false;`
357.                  `throw err;`
358.              `}`
359.          `}, this.id._serialized, value, property);`
360.      `}`

362.      `/**`
363.       `* Internal method to mute or unmute the channel`
364.       `* @param {string} action The action: 'MUTE' or 'UNMUTE'`
365.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
366.       `*/`
367.      `async _muteUnmuteChannel(action) {`
368.          `return await this.client.pupPage.evaluate(async (channelId, action) => {`
369.              `try {`
370.                  `action === 'MUTE'`
371.                      `? await window.Store.ChannelUtils.muteNewsletter([channelId])`
372.                      `: await window.Store.ChannelUtils.unmuteNewsletter([channelId]);`
373.                  `return true;`
374.              `} catch (err) {`
375.                  `if (err.name === 'ServerStatusCodeError') return false;`
376.                  `throw err;`
377.              `}`
378.          `}, this.id._serialized, action);`
379.      `}`
380.  `}`

382.  `module.exports = Channel;`