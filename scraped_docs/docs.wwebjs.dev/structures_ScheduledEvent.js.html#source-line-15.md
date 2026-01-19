Source: https://docs.wwebjs.dev/structures_ScheduledEvent.js.html#source-line-15

1.  `'use strict';`

3.  `/**`
4.   `* ScheduledEvent send options`
5.   `* @typedef {Object} ScheduledEventSendOptions`
6.   `* @property {?string} description The scheduled event description`
7.   `* @property {?Date} endTime The end time of the event`
8.   `* @property {?string} location The location of the event`
9.   `` * @property {?string} callType The type of a WhatsApp call link to generate, valid values are: `video` | `voice` | `none` ``
10.   `* @property {boolean} [isEventCanceled = false] Indicates if a scheduled event should be sent as an already canceled`
11.   `* @property {?Array&lt;number>} messageSecret The custom message secret, can be used as an event ID. NOTE: it has to be a unique vector with a length of 32`
12.   `*/`

14.  `/** Represents a ScheduledEvent on WhatsApp */`
15.  `class ScheduledEvent {`
16.      `/**`
17.       `* @param {string} name`
18.       `* @param {Date} startTime`
19.       `* @param {ScheduledEventSendOptions} options`
20.       `*/`
21.      `constructor(name, startTime, options = {}) {`
22.          `/**`
23.           `* The name of the event`
24.           `* @type {string}`
25.           `*/`
26.          `this.name = this._validateInputs('name', name).trim();`

28.          `/**`
29.           `* The start time of the event`
30.           `* @type {number}`
31.           `*/`
32.          `this.startTimeTs = Math.floor(startTime.getTime() / 1000);`

34.          `/**`
35.           `* The send options for the event`
36.           `* @type {Object}`
37.           `*/`
38.          `this.eventSendOptions = {`
39.              `description: options.description?.trim(),`
40.              `endTimeTs: options.endTime ? Math.floor(options.endTime.getTime() / 1000) : null,`
41.              `location: options.location?.trim(),`
42.              `callType: this._validateInputs('callType', options.callType),`
43.              `isEventCanceled: options.isEventCanceled ?? false,`
44.              `messageSecret: options.messageSecret`
45.          `};`
46.      `}`

48.      `/**`
49.       `* Inner function to validate input values`
50.       `* @param {string} propName The property name to validate the value of`
51.       `* @param {string | number} propValue The property value to validate`
52.       `* @returns {string | number} The property value if a validation succeeded`
53.       `*/`
54.      `_validateInputs(propName, propValue) {`
55.          `if (propName === 'name' &amp;&amp; !propValue) {`
56.              `throw new class CreateScheduledEventError extends Error {`
57.                  `constructor(m) { super(m); }`
58.              ``}(`Empty '${propName}' parameter value is provided.`);``
59.          `}`

61.          `if (propName === 'callType' &amp;&amp; propValue &amp;&amp; !['video', 'voice', 'none'].includes(propValue)) {`
62.              `throw new class CreateScheduledEventError extends Error {`
63.                  `constructor(m) { super(m); }`
64.              ``}(`Invalid '${propName}' parameter value is provided. Valid values are: 'voice' | 'video' | 'none'.`);``
65.          `}`

67.          `return propValue;`
68.      `}`
69.  `}`

71.  `module.exports = ScheduledEvent;`