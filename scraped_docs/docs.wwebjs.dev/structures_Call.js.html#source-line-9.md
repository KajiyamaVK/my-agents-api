Source: https://docs.wwebjs.dev/structures_Call.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Represents a Call on WhatsApp`
7.   `* @extends {Base}`
8.   `*/`
9.  `class Call extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if (data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* Call ID`
19.           `* @type {string}`
20.           `*/`
21.          `this.id = data.id;`
22.          `/**`
23.           `* From`
24.           `* @type {string}`
25.           `*/`
26.          `this.from = data.peerJid;`
27.          `/**`
28.           `* Unix timestamp for when the call was created`
29.           `* @type {number}`
30.           `*/`
31.          `this.timestamp = data.offerTime;`
32.          `/**`
33.           `* Is video`
34.           `* @type {boolean}`
35.           `*/`
36.          `this.isVideo = data.isVideo;`
37.          `/**`
38.           `* Is Group`
39.           `* @type {boolean}`
40.           `*/`
41.          `this.isGroup = data.isGroup;`
42.          `/**`
43.           `* Indicates if the call was sent by the current user`
44.           `* @type {boolean}`
45.           `*/`
46.          `this.fromMe = data.outgoing;`
47.          `/**`
48.           `* Indicates if the call can be handled in waweb`
49.           `* @type {boolean}`
50.           `*/`
51.          `this.canHandleLocally = data.canHandleLocally;`
52.          `/**`
53.           `* Indicates if the call Should be handled in waweb`
54.           `* @type {boolean}`
55.           `*/`
56.          `this.webClientShouldHandle = data.webClientShouldHandle;`
57.          `/**`
58.           `* Object with participants`
59.           `* @type {object}`
60.           `*/`
61.          `this.participants = data.participants;`

63.          `return super._patch(data);`
64.      `}`

66.      `/**`
67.       `* Reject the call`
68.      `*/`
69.      `async reject() {`
70.          `return this.client.pupPage.evaluate((peerJid, id) => {`
71.              `return window.WWebJS.rejectCall(peerJid, id);`
72.          `}, this.from, this.id);`
73.      `}`
74.  `}`

76.  `module.exports = Call;`