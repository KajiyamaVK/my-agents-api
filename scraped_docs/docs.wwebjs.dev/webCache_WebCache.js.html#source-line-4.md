Source: https://docs.wwebjs.dev/webCache_WebCache.js.html#source-line-4

1.  `/**`
2.   `* Default implementation of a web version cache that does nothing.`
3.   `*/`
4.  `class WebCache {`
5.      `async resolve() { return null; }`
6.      `async persist() { }`
7.  `}`

9.  `class VersionResolveError extends Error { }`

11.  `module.exports = {`
12.      `WebCache,`
13.      `VersionResolveError`
14.  `};`