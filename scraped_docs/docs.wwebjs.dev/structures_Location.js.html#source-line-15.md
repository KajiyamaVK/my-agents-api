Source: https://docs.wwebjs.dev/structures_Location.js.html#source-line-15

1.  `'use strict';`

3.  `/**`
4.   `* Location send options`
5.   `* @typedef {Object} LocationSendOptions`
6.   `* @property {string} [name] Location name`
7.   `* @property {string} [address] Location address`
8.   `* @property {string} [url] URL address to be shown within a location message`
9.   `* @property {string} [description] Location full description`
10.   `*/`

12.  `/**`
13.   `* Location information`
14.   `*/`
15.  `class Location {`
16.      `/**`
17.       `* @param {number} latitude`
18.       `* @param {number} longitude`
19.       `* @param {LocationSendOptions} [options] Location send options`
20.       `*/`
21.      `constructor(latitude, longitude, options = {}) {`
22.          `/**`
23.           `* Location latitude`
24.           `* @type {number}`
25.           `*/`
26.          `this.latitude = latitude;`

28.          `/**`
29.           `* Location longitude`
30.           `* @type {number}`
31.           `*/`
32.          `this.longitude = longitude;`

34.          `/**`
35.           `* Name for the location`
36.           `* @type {string|undefined}`
37.           `*/`
38.          `this.name = options.name;`

40.          `/**`
41.           `* Location address`
42.           `* @type {string|undefined}`
43.           `*/`
44.          `this.address = options.address;`

46.          `/**`
47.           `* URL address to be shown within a location message`
48.           `* @type {string|undefined}`
49.           `*/`
50.          `this.url = options.url;`

52.          `/**`
53.           `* Location full description`
54.           `* @type {string|undefined}`
55.           `*/`
56.          `this.description = this.name &amp;&amp; this.address`
57.              `` ? `${this.name}\n${this.address}` ``
58.              `: this.name || this.address || '';`
59.      `}`
60.  `}`

62.  `module.exports = Location;`