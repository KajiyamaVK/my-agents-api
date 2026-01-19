Source: https://docs.wwebjs.dev/structures_Buttons.js.html#source-line-23

1.  `'use strict';`

3.  `const MessageMedia = require('./MessageMedia');`
4.  `const Util = require('../util/Util');`

6.  `/**`
7.   `* Button spec used in Buttons constructor`
8.   `* @typedef {Object} ButtonSpec`
9.   `* @property {string=} id - Custom ID to set on the button. A random one will be generated if one is not passed.`
10.   `* @property {string} body - The text to show on the button.`
11.   `*/`

13.  `/**`
14.   `* @typedef {Object} FormattedButtonSpec`
15.   `* @property {string} buttonId`
16.   `* @property {number} type`
17.   `* @property {Object} buttonText`
18.   `*/`

20.  `/**`
21.   `* Message type buttons`
22.   `*/`
23.  `class Buttons {`
24.      `/**`
25.       `* @param {string|MessageMedia} body`
26.       `* @param {ButtonSpec[]} buttons - See {@link ButtonSpec}`
27.       `* @param {string?} title`
28.       `* @param {string?} footer`
29.       `*/`
30.      `constructor(body, buttons, title, footer) {`
31.          `/**`
32.           `* Message body`
33.           `* @type {string|MessageMedia}`
34.           `*/`
35.          `this.body = body;`

37.          `/**`
38.           `* title of message`
39.           `* @type {string}`
40.           `*/`
41.          `this.title = title;`

43.          `/**`
44.           `* footer of message`
45.           `* @type {string}`
46.           `*/`
47.          `this.footer = footer;`

49.          `if (body instanceof MessageMedia) {`
50.              `this.type = 'media';`
51.              `this.title = '';`
52.          `}else{`
53.              `this.type = 'chat';`
54.          `}`

56.          `/**`
57.           `* buttons of message`
58.           `* @type {FormattedButtonSpec[]}`
59.           `*/`
60.          `this.buttons = this._format(buttons);`
61.          `if(!this.buttons.length){ throw '[BT01] No buttons';}`

63.      `}`

65.      `/**`
66.       `* Creates button array from simple array`
67.       `* @param {ButtonSpec[]} buttons`
68.       `* @returns {FormattedButtonSpec[]}`
69.       `* @example` 
70.       `* Input: [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}]`
71.       `* Returns: [{ buttonId:'customId',buttonText:{'displayText':'button1'},type: 1 },{buttonId:'n3XKsL',buttonText:{'displayText':'button2'},type:1},{buttonId:'NDJk0a',buttonText:{'displayText':'button3'},type:1}]`
72.       `*/`
73.      `_format(buttons){`
74.          `buttons = buttons.slice(0,3); // phone users can only see 3 buttons, so lets limit this`
75.          `return buttons.map((btn) => {`
76.              `return {'buttonId':btn.id ? String(btn.id) : Util.generateHash(6),'buttonText':{'displayText':btn.body},'type':1};`
77.          `});`
78.      `}`

80.  `}`

82.  `module.exports = Buttons;`