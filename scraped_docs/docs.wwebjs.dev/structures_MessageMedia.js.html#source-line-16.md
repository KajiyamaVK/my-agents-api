Source: https://docs.wwebjs.dev/structures_MessageMedia.js.html#source-line-16

1.  `'use strict';`

3.  `const fs = require('fs');`
4.  `const path = require('path');`
5.  `const mime = require('mime');`
6.  `const fetch = require('node-fetch');`
7.  `const { URL } = require('url');`

9.  `/**`
10.   `* Media attached to a message`
11.   `* @param {string} mimetype MIME type of the attachment`
12.   `* @param {string} data Base64-encoded data of the file`
13.   `* @param {?string} filename Document file name. Value can be null`
14.   `* @param {?number} filesize Document file size in bytes. Value can be null`
15.   `*/`
16.  `class MessageMedia {`
17.      `constructor(mimetype, data, filename, filesize) {`
18.          `/**`
19.           `* MIME type of the attachment`
20.           `* @type {string}`
21.           `*/`
22.          `this.mimetype = mimetype;`

24.          `/**`
25.           `* Base64 encoded data that represents the file`
26.           `* @type {string}`
27.           `*/`
28.          `this.data = data;`

30.          `/**`
31.           `* Document file name. Value can be null`
32.           `* @type {?string}`
33.           `*/`
34.          `this.filename = filename;`

36.          `/**`
37.           `* Document file size in bytes. Value can be null`
38.           `* @type {?number}`
39.           `*/`
40.          `this.filesize = filesize;`
41.      `}`

43.      `/**`
44.       `* Creates a MessageMedia instance from a local file path`
45.       `* @param {string} filePath` 
46.       `* @returns {MessageMedia}`
47.       `*/`
48.      `static fromFilePath(filePath) {`
49.          `const b64data = fs.readFileSync(filePath, {encoding: 'base64'});`
50.          `const mimetype = mime.getType(filePath);` 
51.          `const filename = path.basename(filePath);`

53.          `return new MessageMedia(mimetype, b64data, filename);`
54.      `}`

56.      `/**`
57.       `* Creates a MessageMedia instance from a URL`
58.       `* @param {string} url`
59.       `* @param {Object} [options]`
60.       `* @param {boolean} [options.unsafeMime=false]`
61.       `* @param {string} [options.filename]`
62.       `* @param {object} [options.client]`
63.       `* @param {object} [options.reqOptions]`
64.       `* @param {number} [options.reqOptions.size=0]`
65.       `* @returns {Promise&lt;MessageMedia>}`
66.       `*/`
67.      `static async fromUrl(url, options = {}) {`
68.          `const pUrl = new URL(url);`
69.          `let mimetype = mime.getType(pUrl.pathname);`

71.          `if (!mimetype &amp;&amp; !options.unsafeMime)`
72.              `throw new Error('Unable to determine MIME type using URL. Set unsafeMime to true to download it anyway.');`

74.          `async function fetchData (url, options) {`
75.              `const reqOptions = Object.assign({ headers: { accept: 'image/* video/* text/* audio/*' } }, options);`
76.              `const response = await fetch(url, reqOptions);`
77.              `const mime = response.headers.get('Content-Type');`
78.              `const size = response.headers.get('Content-Length');`

80.              `const contentDisposition = response.headers.get('Content-Disposition');`
81.              `const name = contentDisposition ? contentDisposition.match(/((?&lt;=filename=")(.*)(?="))/) : null;`

83.              `let data = '';`
84.              `if (response.buffer) {`
85.                  `data = (await response.buffer()).toString('base64');`
86.              `} else {`
87.                  `const bArray = new Uint8Array(await response.arrayBuffer());`
88.                  `bArray.forEach((b) => {`
89.                      `data += String.fromCharCode(b);`
90.                  `});`
91.                  `data = btoa(data);`
92.              `}`

94.              `return { data, mime, name, size };`
95.          `}`

97.          `const res = options.client`
98.              `? (await options.client.pupPage.evaluate(fetchData, url, options.reqOptions))`
99.              `: (await fetchData(url, options.reqOptions));`

101.          `const filename = options.filename ||`
102.              `(res.name ? res.name[0] : (pUrl.pathname.split('/').pop() || 'file'));`

104.          `if (!mimetype)`
105.              `mimetype = res.mime;`

107.          `return new MessageMedia(mimetype, res.data, filename, res.size || null);`
108.      `}`
109.  `}`

111.  `module.exports = MessageMedia;`