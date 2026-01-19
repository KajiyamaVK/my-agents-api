Source: https://docs.wwebjs.dev/util_Util.js.html#source-line-14

1.  `'use strict';`

3.  `const path = require('path');`
4.  `const Crypto = require('crypto');`
5.  `const { tmpdir } = require('os');`
6.  `const ffmpeg = require('fluent-ffmpeg');`
7.  `const webp = require('node-webpmux');`
8.  `const fs = require('fs').promises;`
9.  `const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);`

11.  `/**`
12.   `* Utility methods`
13.   `*/`
14.  `class Util {`
15.      `constructor() {`
16.          ``throw new Error(`The ${this.constructor.name} class may not be instantiated.`);``
17.      `}`

19.      `static generateHash(length) {`
20.          `var result = '';`
21.          `var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';`
22.          `var charactersLength = characters.length;`
23.          `for (var i = 0; i &lt; length; i++) {`
24.              `result += characters.charAt(Math.floor(Math.random() * charactersLength));`
25.          `}`
26.          `return result;`
27.      `}`

29.      `/**`
30.       `* Sets default properties on an object that aren't already specified.`
31.       `* @param {Object} def Default properties`
32.       `* @param {Object} given Object to assign defaults to`
33.       `* @returns {Object}`
34.       `* @private`
35.       `*/`
36.      `static mergeDefault(def, given) {`
37.          `if (!given) return def;`
38.          `for (const key in def) {`
39.              `if (!has(given, key) || given[key] === undefined) {`
40.                  `given[key] = def[key];`
41.              `} else if (given[key] === Object(given[key])) {`
42.                  `given[key] = Util.mergeDefault(def[key], given[key]);`
43.              `}`
44.          `}`

46.          `return given;`
47.      `}`

49.      `/**`
50.       `* Formats a image to webp`
51.       `* @param {MessageMedia} media`
52.       `*` 
53.       `* @returns {Promise&lt;MessageMedia>} media in webp format`
54.       `*/`
55.      `static async formatImageToWebpSticker(media, pupPage) {`
56.          `if (!media.mimetype.includes('image'))`
57.              `throw new Error('media is not a image');`

59.          `if (media.mimetype.includes('webp')) {`
60.              `return media;`
61.          `}`

63.          `return pupPage.evaluate((media) => {`
64.              `return window.WWebJS.toStickerData(media);`
65.          `}, media);`
66.      `}`

68.      `/**`
69.       `* Formats a video to webp`
70.       `* @param {MessageMedia} media`
71.       `*` 
72.       `* @returns {Promise&lt;MessageMedia>} media in webp format`
73.       `*/`
74.      `static async formatVideoToWebpSticker(media) {`
75.          `if (!media.mimetype.includes('video'))`
76.              `throw new Error('media is not a video');`

78.          `const videoType = media.mimetype.split('/')[1];`

80.          `const tempFile = path.join(`
81.              `tmpdir(),`
82.              `` `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp` ``
83.          `);`

85.          `const stream = new (require('stream').Readable)();`
86.          `const buffer = Buffer.from(`
87.              ``media.data.replace(`data:${media.mimetype};base64,`, ''),``
88.              `'base64'`
89.          `);`
90.          `stream.push(buffer);`
91.          `stream.push(null);`

93.          `await new Promise((resolve, reject) => {`
94.              `ffmpeg(stream)`
95.                  `.inputFormat(videoType)`
96.                  `.on('error', reject)`
97.                  `.on('end', () => resolve(true))`
98.                  `.addOutputOptions([`
99.                      `'-vcodec',`
100.                      `'libwebp',`
101.                      `'-vf',`
102.                      `// eslint-disable-next-line no-useless-escape`
103.                      `'scale=\'iw*min(300/iw\,300/ih)\':\'ih*min(300/iw\,300/ih)\',format=rgba,pad=300:300:\'(300-iw)/2\':\'(300-ih)/2\':\'#00000000\',setsar=1,fps=10',`
104.                      `'-loop',`
105.                      `'0',`
106.                      `'-ss',`
107.                      `'00:00:00.0',`
108.                      `'-t',`
109.                      `'00:00:05.0',`
110.                      `'-preset',`
111.                      `'default',`
112.                      `'-an',`
113.                      `'-vsync',`
114.                      `'0',`
115.                      `'-s',`
116.                      `'512:512',`
117.                  `])`
118.                  `.toFormat('webp')`
119.                  `.save(tempFile);`
120.          `});`

122.          `const data = await fs.readFile(tempFile, 'base64');`
123.          `await fs.unlink(tempFile);`

125.          `return {`
126.              `mimetype: 'image/webp',`
127.              `data: data,`
128.              `filename: media.filename,`
129.          `};`
130.      `}`

132.      `/**`
133.       `* Sticker metadata.`
134.       `* @typedef {Object} StickerMetadata`
135.       `* @property {string} [name]` 
136.       `* @property {string} [author]` 
137.       `* @property {string[]} [categories]`
138.       `*/`

140.      `/**`
141.       `* Formats a media to webp`
142.       `* @param {MessageMedia} media`
143.       `* @param {StickerMetadata} metadata`
144.       `*` 
145.       `* @returns {Promise&lt;MessageMedia>} media in webp format`
146.       `*/`
147.      `static async formatToWebpSticker(media, metadata, pupPage) {`
148.          `let webpMedia;`

150.          `if (media.mimetype.includes('image'))`
151.              `webpMedia = await this.formatImageToWebpSticker(media, pupPage);`
152.          `else if (media.mimetype.includes('video'))`
153.              `webpMedia = await this.formatVideoToWebpSticker(media);`
154.          `else`
155.              `throw new Error('Invalid media format');`

157.          `if (metadata.name || metadata.author) {`
158.              `const img = new webp.Image();`
159.              `const hash = this.generateHash(32);`
160.              `const stickerPackId = hash;`
161.              `const packname = metadata.name;`
162.              `const author = metadata.author;`
163.              `const categories = metadata.categories || [''];`
164.              `const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories };`
165.              `let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);`
166.              `let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');`
167.              `let exif = Buffer.concat([exifAttr, jsonBuffer]);`
168.              `exif.writeUIntLE(jsonBuffer.length, 14, 4);`
169.              `await img.load(Buffer.from(webpMedia.data, 'base64'));`
170.              `img.exif = exif;`
171.              `webpMedia.data = (await img.save(null)).toString('base64');`
172.          `}`

174.          `return webpMedia;`
175.      `}`

177.      `/**`
178.       `* Configure ffmpeg path`
179.       `* @param {string} path`
180.       `*/`
181.      `static setFfmpegPath(path) {`
182.          `ffmpeg.setFfmpegPath(path);`
183.      `}`
184.  `}`

186.  `module.exports = Util;`