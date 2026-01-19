Source: https://docs.wwebjs.dev/structures_Reaction.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Represents a Reaction on WhatsApp`
7.   `* @extends {Base}`
8.   `*/`
9.  `class Reaction extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if (data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* Reaction ID`
19.           `* @type {object}`
20.           `*/`
21.          `this.id = data.msgKey;`
22.          `/**`
23.           `* Orphan`
24.           `* @type {number}`
25.           `*/`
26.          `this.orphan = data.orphan;`
27.          `/**`
28.           `* Orphan reason`
29.           `* @type {?string}`
30.           `*/`
31.          `this.orphanReason = data.orphanReason;`
32.          `/**`
33.           `* Unix timestamp for when the reaction was created`
34.           `* @type {number}`
35.           `*/`
36.          `this.timestamp = data.timestamp;`
37.          `/**`
38.           `* Reaction`
39.           `* @type {string}`
40.           `*/`
41.          `this.reaction = data.reactionText;`
42.          `/**`
43.           `* Read`
44.           `* @type {boolean}`
45.           `*/`
46.          `this.read = data.read;`
47.          `/**`
48.           `* Message ID`
49.           `* @type {object}`
50.           `*/`
51.          `this.msgId = data.parentMsgKey;`
52.          `/**`
53.           `* Sender ID`
54.           `* @type {string}`
55.           `*/`
56.          `this.senderId = data.senderUserJid;`
57.          `/**`
58.           `* ACK`
59.           `* @type {?number}`
60.           `*/`
61.          `this.ack = data.ack;`

64.          `return super._patch(data);`
65.      `}`

67.  `}`

69.  `module.exports = Reaction;`