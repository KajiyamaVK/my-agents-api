Source: https://docs.wwebjs.dev/structures_Broadcast.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Message = require('./Message');`

6.  `/**`
7.   `* Represents a Status/Story on WhatsApp`
8.   `* @extends {Base}`
9.   `*/`
10.  `class Broadcast extends Base {`
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
25.           `* Unix timestamp of last status`
26.           `* @type {number}`
27.           `*/`
28.          `this.timestamp = data.t;`

30.          `/**`
31.           `* Number of available statuses`
32.           `* @type {number}`
33.           `*/`
34.          `this.totalCount = data.totalCount;`

36.          `/**`
37.           `* Number of not viewed`
38.           `* @type {number}`
39.           `*/`
40.          `this.unreadCount = data.unreadCount;`

42.          `/**`
43.           `* Messages statuses`
44.           `* @type {Message[]}`
45.           `*/`
46.          `this.msgs = data.msgs?.map(msg => new Message(this.client, msg));`

48.          `return super._patch(data);`
49.      `}`

51.      `/**`
52.       `* Returns the Chat this message was sent in`
53.       `* @returns {Promise&lt;Chat>}`
54.       `*/`
55.      `getChat() {`
56.          `return this.client.getChatById(this.id._serialized);`
57.      `}`

59.      `/**`
60.       `* Returns the Contact this message was sent from`
61.       `* @returns {Promise&lt;Contact>}`
62.       `*/`
63.      `getContact() {`
64.          `return this.client.getContactById(this.id._serialized);`
65.      `}`

67.  `}`

69.  `module.exports = Broadcast;`