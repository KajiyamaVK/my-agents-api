Source: https://docs.wwebjs.dev/structures_GroupNotification.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Represents a GroupNotification on WhatsApp`
7.   `* @extends {Base}`
8.   `*/`
9.  `class GroupNotification extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if(data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* ID that represents the groupNotification`
19.           `* @type {object}`
20.           `*/`
21.          `this.id = data.id;`

23.          `/**`
24.           `* Extra content`
25.           `* @type {string}`
26.           `*/`
27.          `this.body = data.body || '';`

29.          `/**` 
30.           `* GroupNotification type`
31.           `* @type {GroupNotificationTypes}`
32.           `*/`
33.          `this.type = data.subtype;`

35.          `/**`
36.           `* Unix timestamp for when the groupNotification was created`
37.           `* @type {number}`
38.           `*/`
39.          `this.timestamp = data.t;`

41.          `/**`
42.           `* ID for the Chat that this groupNotification was sent for.`
43.           `*` 
44.           `* @type {string}`
45.           `*/`
46.          `this.chatId = typeof (data.id.remote) === 'object' ? data.id.remote._serialized : data.id.remote;`

48.          `/**`
49.           `* ContactId for the user that produced the GroupNotification.`
50.           `* @type {string}`
51.           `*/`
52.          `this.author = typeof (data.author) === 'object' ? data.author._serialized : data.author;`

54.          `/**`
55.           `* Contact IDs for the users that were affected by this GroupNotification.`
56.           `* @type {Array&lt;string>}`
57.           `*/`
58.          `this.recipientIds = [];`

60.          `if (data.recipients) {`
61.              `this.recipientIds = data.recipients;`
62.          `}`

64.          `return super._patch(data);`
65.      `}`

67.      `/**`
68.       `* Returns the Chat this groupNotification was sent in`
69.       `* @returns {Promise&lt;Chat>}`
70.       `*/`
71.      `getChat() {`
72.          `return this.client.getChatById(this.chatId);`
73.      `}`

75.      `/**`
76.       `* Returns the Contact this GroupNotification was produced by`
77.       `* @returns {Promise&lt;Contact>}`
78.       `*/`
79.      `getContact() {`
80.          `return this.client.getContactById(this.author);`
81.      `}`

83.      `/**`
84.       `* Returns the Contacts affected by this GroupNotification.`
85.       `* @returns {Promise&lt;Array&lt;Contact>>}`
86.       `*/`
87.      `async getRecipients() {`
88.          `return await Promise.all(this.recipientIds.map(async m => await this.client.getContactById(m)));`
89.      `}`

91.      `/**`
92.       `* Sends a message to the same chat this GroupNotification was produced in.`
93.       `*` 
94.       `* @param {string|MessageMedia|Location} content` 
95.       `* @param {object} options`
96.       `* @returns {Promise&lt;Message>}`
97.       `*/`
98.      `async reply(content, options={}) {`
99.          `return this.client.sendMessage(this.chatId, content, options);`
100.      `}`

102.  `}`

104.  `module.exports = GroupNotification;`