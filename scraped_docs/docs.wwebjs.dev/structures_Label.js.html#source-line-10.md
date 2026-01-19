Source: https://docs.wwebjs.dev/structures_Label.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `// eslint-disable-next-line no-unused-vars`
5.  `const Chat = require('./Chat');`

7.  `/**`
8.   `* WhatsApp Business Label information`
9.   `*/`
10.  `class Label extends Base {`
11.      `/**`
12.       `* @param {Base} client`
13.       `* @param {object} labelData`
14.       `*/`
15.      `constructor(client, labelData){`
16.          `super(client);`

18.          `if(labelData) this._patch(labelData);`
19.      `}`

21.      `_patch(labelData){`
22.          `/**`
23.           `* Label ID`
24.           `* @type {string}`
25.           `*/`
26.          `this.id = labelData.id;`

28.          `/**`
29.           `* Label name`
30.           `* @type {string}`
31.           `*/`
32.          `this.name = labelData.name;`

34.          `/**`
35.           `* Label hex color`
36.           `* @type {string}`
37.           `*/`
38.          `this.hexColor = labelData.hexColor;`
39.      `}`
40.      `/**`
41.       `* Get all chats that have been assigned this Label`
42.       `* @returns {Promise&lt;Array&lt;Chat>>}`
43.       `*/`
44.      `async getChats(){`
45.          `return this.client.getChatsByLabelId(this.id);`
46.      `}`

48.  `}`

50.  `module.exports = Label;`