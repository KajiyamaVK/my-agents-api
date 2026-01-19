Source: https://docs.wwebjs.dev/webCache_RemoteWebCache.js.html#source-line-10

1.  `const fetch = require('node-fetch');`
2.  `const { WebCache, VersionResolveError } = require('./WebCache');`

4.  `/**`
5.   `* RemoteWebCache - Fetches a WhatsApp Web version index from a remote server`
6.   `* @param {object} options - options`
7.   `* @param {string} options.remotePath - Endpoint that should be used to fetch the version index. Use {version} as a placeholder for the version number.`
8.   `* @param {boolean} options.strict - If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version. Defaults to false.`
9.   `*/`
10.  `class RemoteWebCache extends WebCache {`
11.      `constructor(options = {}) {`
12.          `super();`

14.          `if (!options.remotePath) throw new Error('webVersionCache.remotePath is required when using the remote cache');`
15.          `this.remotePath = options.remotePath;`
16.          `this.strict = options.strict || false;`
17.      `}`

19.      `async resolve(version) {`
20.          `const remotePath = this.remotePath.replace('{version}', version);`

22.          `try {`
23.              `const cachedRes = await fetch(remotePath);`
24.              `if (cachedRes.ok) {`
25.                  `return cachedRes.text();`
26.              `}`
27.          `} catch (err) {`
28.              ``console.error(`Error fetching version ${version} from remote`, err);``
29.          `}`

31.          ``if (this.strict) throw new VersionResolveError(`Couldn't load version ${version} from the archive`);``
32.          `return null;`         
33.      `}`

35.      `async persist() {`
36.          `// Nothing to do here`
37.      `}`
38.  `}`

40.  `module.exports = RemoteWebCache;`