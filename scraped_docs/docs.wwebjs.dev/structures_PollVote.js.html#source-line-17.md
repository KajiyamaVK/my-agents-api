Source: https://docs.wwebjs.dev/structures_PollVote.js.html#source-line-17

1.  `'use strict';`

3.  `const Message = require('./Message');`
4.  `const Base = require('./Base');`

6.  `/**`
7.   `* Selected poll option structure`
8.   `* @typedef {Object} SelectedPollOption`
9.   `* @property {number} id The local selected or deselected option ID`
10.   `* @property {string} name The option name`
11.   `*/`

13.  `/**`
14.   `* Represents a Poll Vote on WhatsApp`
15.   `* @extends {Base}`
16.   `*/`
17.  `class PollVote extends Base {`
18.      `constructor(client, data) {`
19.          `super(client);`

21.          `if (data) this._patch(data);`
22.      `}`

24.      `_patch(data) {`
25.          `/**`
26.           `* The person who voted`
27.           `* @type {string}`
28.           `*/`
29.          `this.voter = data.sender;`

31.          `/**`
32.           `* The selected poll option(s)`
33.           `* If it's an empty array, the user hasn't selected any options on the poll,`
34.           `* may occur when they deselected all poll options`
35.           `* @type {SelectedPollOption[]}`
36.           `*/`
37.          `if (data.selectedOptionLocalIds.length > 0) {`
38.              `if(data.parentMessage) { // temporary failsafe`
39.                  `this.selectedOptions = data.selectedOptionLocalIds.map((e) => ({`
40.                      `name: data.parentMessage.pollOptions.find((x) => x.localId === e).name,`
41.                      `localId: e`
42.                  `}));`
43.              `} else {`
44.                  `this.selectedOptions = data.selectedOptionLocalIds.map((e) => ({`
45.                      `name: undefined,`
46.                      `localId: e`
47.                  `}));`
48.              `}`
49.          `} else {`
50.              `this.selectedOptions = [];`
51.          `}`

53.          `/**`
54.           `* Timestamp the option was selected or deselected at`
55.           `* @type {number}`
56.           `*/`
57.          `this.interractedAtTs = data.senderTimestampMs;`

59.          `/**`
60.           `* The poll creation message associated with the poll vote`
61.           `* @type {Message}`
62.           `*/`
63.          `this.parentMessage = new Message(this.client, data.parentMessage);`

65.          `/**`
66.           `* The poll creation message id`
67.           `* @type {Object}`
68.           `*/`
69.          `this.parentMsgKey =  data.parentMsgKey;`

71.          `return super._patch(data);`
72.      `}`
73.  `}`

75.  `module.exports = PollVote;`