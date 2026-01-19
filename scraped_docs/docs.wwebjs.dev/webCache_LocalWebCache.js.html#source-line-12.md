Source: https://docs.wwebjs.dev/webCache_LocalWebCache.js.html#source-line-12

1.  `const path = require('path');`
2.  `const fs = require('fs');`

4.  `const { WebCache, VersionResolveError } = require('./WebCache');`

6.  `/**`
7.   `* LocalWebCache - Fetches a WhatsApp Web version from a local file store`
8.   `* @param {object} options - options`
9.   `* @param {string} options.path - Path to the directory where cached versions are saved, default is: "./.wwebjs_cache/"` 
10.   `* @param {boolean} options.strict - If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version.`
11.   `*/`
12.  `class LocalWebCache extends WebCache {`
13.      `constructor(options = {}) {`
14.          `super();`

16.          `this.path = options.path || './.wwebjs_cache/';`
17.          `this.strict = options.strict || false;`
18.      `}`

20.      `async resolve(version) {`
21.          ``const filePath = path.join(this.path, `${version}.html`);``

23.          `try {`
24.              `return fs.readFileSync(filePath, 'utf-8');`
25.          `}`
26.          `catch (err) {`
27.              ``if (this.strict) throw new VersionResolveError(`Couldn't load version ${version} from the cache`);``
28.              `return null;`
29.          `}`
30.      `}`

32.      `async persist(indexHtml, version) {`
33.          `// version = (version+'').replace(/[^0-9.]/g,'');`
34.          ``const filePath = path.join(this.path, `${version}.html`);``
35.          `fs.mkdirSync(this.path, { recursive: true });`
36.          `fs.writeFileSync(filePath, indexHtml);`
37.      `}`
38.  `}`

40.  `module.exports = LocalWebCache;`