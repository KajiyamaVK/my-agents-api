Source: https://docs.wwebjs.dev/structures_GroupChat.js.html#source-line-17

1.  `'use strict';`

3.  `const Chat = require('./Chat');`

5.  `/**`
6.   `* Group participant information`
7.   `* @typedef {Object} GroupParticipant`
8.   `* @property {ContactId} id`
9.   `* @property {boolean} isAdmin`
10.   `* @property {boolean} isSuperAdmin`
11.   `*/`

13.  `/**`
14.   `* Represents a Group Chat on WhatsApp`
15.   `* @extends {Chat}`
16.   `*/`
17.  `class GroupChat extends Chat {`
18.      `_patch(data) {`
19.          `this.groupMetadata = data.groupMetadata;`

21.          `return super._patch(data);`
22.      `}`

24.      `/**`
25.       `* Gets the group owner`
26.       `* @type {ContactId}`
27.       `*/`
28.      `get owner() {`
29.          `return this.groupMetadata.owner;`
30.      `}`

32.      `/**`
33.       `* Gets the date at which the group was created`
34.       `* @type {date}`
35.       `*/`
36.      `get createdAt() {`
37.          `return new Date(this.groupMetadata.creation * 1000);`
38.      `}`

40.      `/**` 
41.       `* Gets the group description`
42.       `* @type {string}`
43.       `*/`
44.      `get description() {`
45.          `return this.groupMetadata.desc;`
46.      `}`

48.      `/**`
49.       `* Gets the group participants`
50.       `* @type {Array&lt;GroupParticipant>}`
51.       `*/`
52.      `get participants() {`
53.          `return this.groupMetadata.participants;`
54.      `}`

56.      `/**`
57.       `* An object that handles the result for {@link addParticipants} method`
58.       `* @typedef {Object} AddParticipantsResult`
59.       `* @property {number} code The code of the result`
60.       `* @property {string} message The result message`
61.       `* @property {boolean} isInviteV4Sent Indicates if the inviteV4 was sent to the partitipant`
62.       `*/`

64.      `/**`
65.       `* An object that handles options for adding participants`
66.       `* @typedef {Object} AddParticipnatsOptions`
67.       `* @property {Array&lt;number>|number} [sleep = [250, 500]] The number of milliseconds to wait before adding the next participant. If it is an array, a random sleep time between the sleep[0] and sleep[1] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep[1] and sleep[1] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of [250, 500]`
68.       `* @property {boolean} [autoSendInviteV4 = true] If true, the inviteV4 will be sent to those participants who have restricted others from being automatically added to groups, otherwise the inviteV4 won't be sent (true by default)`
69.       `* @property {string} [comment = ''] The comment to be added to an inviteV4 (empty string by default)`
70.       `*/`

72.      `/**`
73.       `* Adds a list of participants by ID to the group`
74.       `* @param {string|Array&lt;string>} participantIds` 
75.       `* @param {AddParticipnatsOptions} options An object thay handles options for adding participants`
76.       `* @returns {Promise&lt;Object.&lt;string, AddParticipantsResult>|string>} Returns an object with the resulting data or an error message as a string`
77.       `*/`
78.      `async addParticipants(participantIds, options = {}) {`
79.          `return await this.client.pupPage.evaluate(async (groupId, participantIds, options) => {`
80.              `const { sleep = [250, 500], autoSendInviteV4 = true, comment = '' } = options;`
81.              `const participantData = {};`

83.              `!Array.isArray(participantIds) &amp;&amp; (participantIds = [participantIds]);`
84.              `const groupWid = window.Store.WidFactory.createWid(groupId);`
85.              `const group = window.Store.Chat.get(groupWid) || (await window.Store.Chat.find(groupWid));`
86.              `const participantWids = participantIds.map((p) => window.Store.WidFactory.createWid(p));`

88.              `const errorCodes = {`
89.                  `default: 'An unknown error occupied while adding a participant',`
90.                  `isGroupEmpty: 'AddParticipantsError: The participant can\'t be added to an empty group',`
91.                  `iAmNotAdmin: 'AddParticipantsError: You have no admin rights to add a participant to a group',`
92.                  `200: 'The participant was added successfully',`
93.                  `403: 'The participant can be added by sending private invitation only',`
94.                  `404: 'The phone number is not registered on WhatsApp',`
95.                  `408: 'You cannot add this participant because they recently left the group',`
96.                  `409: 'The participant is already a group member',`
97.                  `417: 'The participant can\'t be added to the community. You can invite them privately to join this group through its invite link',`
98.                  `419: 'The participant can\'t be added because the group is full'`
99.              `};`

101.              `await window.Store.GroupQueryAndUpdate({ id: groupId });`

103.              `let groupParticipants = group.groupMetadata?.participants.serialize();`

105.              `if (!groupParticipants) {`
106.                  `return errorCodes.isGroupEmpty;`
107.              `}`

109.              `if (!group.iAmAdmin()) {`
110.                  `return errorCodes.iAmNotAdmin;`
111.              `}`

113.              `groupParticipants.map(({ id }) => {`
114.                  `return id.server === 'lid' ? window.Store.LidUtils.getPhoneNumber(id) : id;`
115.              `});`

117.              `const _getSleepTime = (sleep) => {`
118.                  `if (!Array.isArray(sleep) || sleep.length === 2 &amp;&amp; sleep[0] === sleep[1]) {`
119.                      `return sleep;`
120.                  `}`
121.                  `if (sleep.length === 1) {`
122.                      `return sleep[0];`
123.                  `}`
124.                  `(sleep[1] - sleep[0]) &lt; 100 &amp;&amp; (sleep[0] = sleep[1]) &amp;&amp; (sleep[1] += 100);`
125.                  `return Math.floor(Math.random() * (sleep[1] - sleep[0] + 1)) + sleep[0];`
126.              `};`

128.              `for (let pWid of participantWids) {`
129.                  `const pId = pWid._serialized;`
130.                  `pWid = pWid.server === 'lid' ? window.Store.LidUtils.getPhoneNumber(pWid) : pWid;`

132.                  `participantData[pId] = {`
133.                      `code: undefined,`
134.                      `message: undefined,`
135.                      `isInviteV4Sent: false`
136.                  `};`

138.                  `if (groupParticipants.some(p => p._serialized === pId)) {`
139.                      `participantData[pId].code = 409;`
140.                      `participantData[pId].message = errorCodes[409];`
141.                      `continue;`
142.                  `}`

144.                  `if (!(await window.Store.QueryExist(pWid))?.wid) {`
145.                      `participantData[pId].code = 404;`
146.                      `participantData[pId].message = errorCodes[404];`
147.                      `continue;`
148.                  `}`

150.                  `const rpcResult =`
151.                      `await window.WWebJS.getAddParticipantsRpcResult(groupWid, pWid);`
152.                  `const { code: rpcResultCode } = rpcResult;`

154.                  `participantData[pId].code = rpcResultCode;`
155.                  `participantData[pId].message =`
156.                      `errorCodes[rpcResultCode] || errorCodes.default;`

158.                  `if (autoSendInviteV4 &amp;&amp; rpcResultCode === 403) {`
159.                      `let userChat, isInviteV4Sent = false;`
160.                      `window.Store.Contact.gadd(pWid, { silent: true });`

162.                      `if (rpcResult.name === 'ParticipantRequestCodeCanBeSent' &amp;&amp;`
163.                          `(userChat = window.Store.Chat.get(pWid) || (await window.Store.Chat.find(pWid)))) {`
164.                          `const groupName = group.formattedTitle || group.name;`
165.                          `const res = await window.Store.GroupInviteV4.sendGroupInviteMessage(`
166.                              `userChat,`
167.                              `group.id._serialized,`
168.                              `groupName,`
169.                              `rpcResult.inviteV4Code,`
170.                              `rpcResult.inviteV4CodeExp,`
171.                              `comment,`
172.                              `await window.WWebJS.getProfilePicThumbToBase64(groupWid)`
173.                          `);`
174.                          `isInviteV4Sent = res.messageSendResult === 'OK';`
175.                      `}`

177.                      `participantData[pId].isInviteV4Sent = isInviteV4Sent;`
178.                  `}`

180.                  `sleep &amp;&amp;`
181.                      `participantWids.length > 1 &amp;&amp;`
182.                      `participantWids.indexOf(pWid) !== participantWids.length - 1 &amp;&amp;`
183.                      `(await new Promise((resolve) => setTimeout(resolve, _getSleepTime(sleep))));`
184.              `}`

186.              `return participantData;`
187.          `}, this.id._serialized, participantIds, options);`
188.      `}`

190.      `/**`
191.       `* Removes a list of participants by ID to the group`
192.       `* @param {Array&lt;string>} participantIds` 
193.       `* @returns {Promise&lt;{ status: number }>}`
194.       `*/`
195.      `async removeParticipants(participantIds) {`
196.          `return await this.client.pupPage.evaluate(async (chatId, participantIds) => {`
197.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
198.              `const participants = (await Promise.all(participantIds.map(async p => {`
199.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(p);`

201.                  `return chat.groupMetadata.participants.get(lid?._serialized) ||`
202.                      `chat.groupMetadata.participants.get(phone?._serialized);`
203.              `}))).filter(Boolean);`
204.              `await window.Store.GroupParticipants.removeParticipants(chat, participants);`
205.              `return { status: 200 };`
206.          `}, this.id._serialized, participantIds);`
207.      `}`

209.      `/**`
210.       `* Promotes participants by IDs to admins`
211.       `* @param {Array&lt;string>} participantIds` 
212.       `* @returns {Promise&lt;{ status: number }>} Object with status code indicating if the operation was successful`
213.       `*/`
214.      `async promoteParticipants(participantIds) {`
215.          `return await this.client.pupPage.evaluate(async (chatId, participantIds) => {`
216.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
217.              `const participants = (await Promise.all(participantIds.map(async p => {`
218.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(p);`

220.                  `return chat.groupMetadata.participants.get(lid?._serialized) ||`
221.                      `chat.groupMetadata.participants.get(phone?._serialized);`
222.              `}))).filter(Boolean);`
223.              `await window.Store.GroupParticipants.promoteParticipants(chat, participants);`
224.              `return { status: 200 };`
225.          `}, this.id._serialized, participantIds);`
226.      `}`

228.      `/**`
229.       `* Demotes participants by IDs to regular users`
230.       `* @param {Array&lt;string>} participantIds` 
231.       `* @returns {Promise&lt;{ status: number }>} Object with status code indicating if the operation was successful`
232.       `*/`
233.      `async demoteParticipants(participantIds) {`
234.          `return await this.client.pupPage.evaluate(async (chatId, participantIds) => {`
235.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
236.              `const participants = (await Promise.all(participantIds.map(async p => {`
237.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(p);`

239.                  `return chat.groupMetadata.participants.get(lid?._serialized) ||`
240.                      `chat.groupMetadata.participants.get(phone?._serialized);`
241.              `}))).filter(Boolean);`
242.              `await window.Store.GroupParticipants.demoteParticipants(chat, participants);`
243.              `return { status: 200 };`
244.          `}, this.id._serialized, participantIds);`
245.      `}`

247.      `/**`
248.       `* Updates the group subject`
249.       `* @param {string} subject` 
250.       `* @returns {Promise&lt;boolean>} Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.`
251.       `*/`
252.      `async setSubject(subject) {`
253.          `const success = await this.client.pupPage.evaluate(async (chatId, subject) => {`
254.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
255.              `try {`
256.                  `await window.Store.GroupUtils.setGroupSubject(chatWid, subject);`
257.                  `return true;`
258.              `} catch (err) {`
259.                  `if(err.name === 'ServerStatusCodeError') return false;`
260.                  `throw err;`
261.              `}`
262.          `}, this.id._serialized, subject);`

264.          `if(!success) return false;`
265.          `this.name = subject;`
266.          `return true;`
267.      `}`

269.      `/**`
270.       `* Updates the group description`
271.       `* @param {string} description` 
272.       `* @returns {Promise&lt;boolean>} Returns true if the description was properly updated. This can return false if the user does not have the necessary permissions.`
273.       `*/`
274.      `async setDescription(description) {`
275.          `const success = await this.client.pupPage.evaluate(async (chatId, description) => {`
276.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
277.              `let descId = window.Store.GroupMetadata.get(chatWid).descId;`
278.              `let newId = await window.Store.MsgKey.newId();`
279.              `try {`
280.                  `await window.Store.GroupUtils.setGroupDescription(chatWid, description, newId, descId);`
281.                  `return true;`
282.              `} catch (err) {`
283.                  `if(err.name === 'ServerStatusCodeError') return false;`
284.                  `throw err;`
285.              `}`
286.          `}, this.id._serialized, description);`

288.          `if(!success) return false;`
289.          `this.groupMetadata.desc = description;`
290.          `return true;`
291.      `}`

293.      `/**`
294.       `* Updates the group setting to allow only admins to add members to the group.`
295.       `* @param {boolean} [adminsOnly=true] Enable or disable this option` 
296.       `* @returns {Promise&lt;boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.`
297.       `*/`
298.      `async setAddMembersAdminsOnly(adminsOnly=true) {`
299.          `const success = await this.client.pupPage.evaluate(async (groupId, adminsOnly) => {`
300.              `const chat = await window.WWebJS.getChat(groupId, { getAsModel: false });`
301.              `try {`
302.                  `await window.Store.GroupUtils.setGroupProperty(chat, 'member_add_mode', adminsOnly ? 0 : 1);`
303.                  `return true;`
304.              `} catch (err) {`
305.                  `if(err.name === 'ServerStatusCodeError') return false;`
306.                  `throw err;`
307.              `}`
308.          `}, this.id._serialized, adminsOnly);`

310.          `success &amp;&amp; (this.groupMetadata.memberAddMode = adminsOnly ? 'admin_add' : 'all_member_add');`
311.          `return success;`
312.      `}`

314.      `/**`
315.       `* Updates the group settings to only allow admins to send messages.`
316.       `* @param {boolean} [adminsOnly=true] Enable or disable this option` 
317.       `* @returns {Promise&lt;boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.`
318.       `*/`
319.      `async setMessagesAdminsOnly(adminsOnly=true) {`
320.          `const success = await this.client.pupPage.evaluate(async (chatId, adminsOnly) => {`
321.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
322.              `try {`
323.                  `await window.Store.GroupUtils.setGroupProperty(chat, 'announcement', adminsOnly ? 1 : 0);`
324.                  `return true;`
325.              `} catch (err) {`
326.                  `if(err.name === 'ServerStatusCodeError') return false;`
327.                  `throw err;`
328.              `}`
329.          `}, this.id._serialized, adminsOnly);`

331.          `if(!success) return false;`

333.          `this.groupMetadata.announce = adminsOnly;`
334.          `return true;`
335.      `}`

337.      `/**`
338.       `* Updates the group settings to only allow admins to edit group info (title, description, photo).`
339.       `* @param {boolean} [adminsOnly=true] Enable or disable this option` 
340.       `* @returns {Promise&lt;boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.`
341.       `*/`
342.      `async setInfoAdminsOnly(adminsOnly=true) {`
343.          `const success = await this.client.pupPage.evaluate(async (chatId, adminsOnly) => {`
344.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
345.              `try {`
346.                  `await window.Store.GroupUtils.setGroupProperty(chat, 'restrict', adminsOnly ? 1 : 0);`
347.                  `return true;`
348.              `} catch (err) {`
349.                  `if(err.name === 'ServerStatusCodeError') return false;`
350.                  `throw err;`
351.              `}`
352.          `}, this.id._serialized, adminsOnly);`

354.          `if(!success) return false;`

356.          `this.groupMetadata.restrict = adminsOnly;`
357.          `return true;`
358.      `}`

360.      `/**`
361.       `* Deletes the group's picture.`
362.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly deleted. This can return false if the user does not have the necessary permissions.`
363.       `*/`
364.      `async deletePicture() {`
365.          `const success = await this.client.pupPage.evaluate((chatid) => {`
366.              `return window.WWebJS.deletePicture(chatid);`
367.          `}, this.id._serialized);`

369.          `return success;`
370.      `}`

372.      `/**`
373.       `* Sets the group's picture.`
374.       `* @param {MessageMedia} media`
375.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly updated. This can return false if the user does not have the necessary permissions.`
376.       `*/`
377.      `async setPicture(media) {`
378.          `const success = await this.client.pupPage.evaluate((chatid, media) => {`
379.              `return window.WWebJS.setPicture(chatid, media);`
380.          `}, this.id._serialized, media);`

382.          `return success;`
383.      `}`

385.      `/**`
386.       `* Gets the invite code for a specific group`
387.       `* @returns {Promise&lt;string>} Group's invite code`
388.       `*/`
389.      `async getInviteCode() {`
390.          `const codeRes = await this.client.pupPage.evaluate(async chatId => {`
391.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
392.              `try {`
393.                  `return window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.1020730154')`
394.                      `? await window.Store.GroupInvite.fetchMexGroupInviteCode(chatId)`
395.                      `: await window.Store.GroupInvite.queryGroupInviteCode(chatWid, true);`
396.              `}`
397.              `catch (err) {`
398.                  `if(err.name === 'ServerStatusCodeError') return undefined;`
399.                  `throw err;`
400.              `}`
401.          `}, this.id._serialized);`

403.          `return codeRes?.code`
404.              `? codeRes?.code`
405.              `: codeRes;`
406.      `}`

408.      `/**`
409.       `* Invalidates the current group invite code and generates a new one`
410.       `* @returns {Promise&lt;string>} New invite code`
411.       `*/`
412.      `async revokeInvite() {`
413.          `const codeRes = await this.client.pupPage.evaluate(chatId => {`
414.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
415.              `return window.Store.GroupInvite.resetGroupInviteCode(chatWid);`
416.          `}, this.id._serialized);`

418.          `return codeRes.code;`
419.      `}`

421.      `/**`
422.       `* An object that handles the information about the group membership request`
423.       `* @typedef {Object} GroupMembershipRequest`
424.       `* @property {Object} id The wid of a user who requests to enter the group`
425.       `* @property {Object} addedBy The wid of a user who created that request`
426.       `* @property {Object|null} parentGroupId The wid of a community parent group to which the current group is linked`
427.       `* @property {string} requestMethod The method used to create the request: NonAdminAdd/InviteLink/LinkedGroupJoin`
428.       `* @property {number} t The timestamp the request was created at`
429.       `*/`

431.      `/**`
432.       `* Gets an array of membership requests`
433.       `* @returns {Promise&lt;Array&lt;GroupMembershipRequest>>} An array of membership requests`
434.       `*/`
435.      `async getGroupMembershipRequests() {`
436.          `return await this.client.getGroupMembershipRequests(this.id._serialized);`
437.      `}`

439.      `/**`
440.       `* An object that handles the result for membership request action`
441.       `* @typedef {Object} MembershipRequestActionResult`
442.       `* @property {string} requesterId User ID whos membership request was approved/rejected`
443.       `* @property {number} error An error code that occurred during the operation for the participant`
444.       `* @property {string} message A message with a result of membership request action`
445.       `*/`

447.      `/**`
448.       `* An object that handles options for {@link approveGroupMembershipRequests} and {@link rejectGroupMembershipRequests} methods`
449.       `* @typedef {Object} MembershipRequestActionOptions`
450.       `* @property {Array&lt;string>|string|null} requesterIds User ID/s who requested to join the group, if no value is provided, the method will search for all membership requests for that group`
451.       `* @property {Array&lt;number>|number|null} sleep The number of milliseconds to wait before performing an operation for the next requester. If it is an array, a random sleep time between the sleep[0] and sleep[1] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep[1] and sleep[1] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of [250, 500]`
452.       `*/`

454.      `/**`
455.       `* Approves membership requests if any`
456.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
457.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were approved and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
458.       `*/`
459.      `async approveGroupMembershipRequests(options = {}) {`
460.          `return await this.client.approveGroupMembershipRequests(this.id._serialized, options);`
461.      `}`

463.      `/**`
464.       `* Rejects membership requests if any`
465.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
466.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were rejected and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
467.       `*/`
468.      `async rejectGroupMembershipRequests(options = {}) {`
469.          `return await this.client.rejectGroupMembershipRequests(this.id._serialized, options);`
470.      `}`

472.      `/**`
473.       `* Makes the bot leave the group`
474.       `* @returns {Promise}`
475.       `*/`
476.      `async leave() {`
477.          `await this.client.pupPage.evaluate(async chatId => {`
478.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
479.              `return window.Store.GroupUtils.sendExitGroup(chat);`
480.          `}, this.id._serialized);`
481.      `}`

483.  `}`

485.  `module.exports = GroupChat;`