Source: https://docs.wwebjs.dev/structures_Poll.js.html#source-line-11

1.  `'use strict';`

3.  `/**`
4.   `* Poll send options`
5.   `* @typedef {Object} PollSendOptions`
6.   `* @property {boolean} [allowMultipleAnswers=false] If false it is a single choice poll, otherwise it is a multiple choice poll (false by default)`
7.   `* @property {?Array&lt;number>} messageSecret The custom message secret, can be used as a poll ID. NOTE: it has to be a unique vector with a length of 32`
8.   `*/`

10.  `/** Represents a Poll on WhatsApp */`
11.  `class Poll {`
12.      `/**`
13.       `* @param {string} pollName`
14.       `* @param {Array&lt;string>} pollOptions`
15.       `* @param {PollSendOptions} options`
16.       `*/`
17.      `constructor(pollName, pollOptions, options = {}) {`
18.          `/**`
19.           `* The name of the poll`
20.           `* @type {string}`
21.           `*/`
22.          `this.pollName = pollName.trim();`

24.          `/**`
25.           `* The array of poll options`
26.           `* @type {Array.&lt;{name: string, localId: number}>}`
27.           `*/`
28.          `this.pollOptions = pollOptions.map((option, index) => ({`
29.              `name: option.trim(),`
30.              `localId: index`
31.          `}));`

33.          `/**`
34.           `* The send options for the poll`
35.           `* @type {PollSendOptions}`
36.           `*/`
37.          `this.options = {`
38.              `allowMultipleAnswers: options.allowMultipleAnswers === true,`
39.              `messageSecret: options.messageSecret`
40.          `};`
41.      `}`
42.  `}`

44.  `module.exports = Poll;`