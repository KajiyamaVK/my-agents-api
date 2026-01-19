Source: https://docs.wwebjs.dev/RemoteWebCache.html

## new RemoteWebCache(options)

### Parameters

Name

Type

Optional

Description

options

options

Values in `options` have the following properties:

Name

Type

Optional

Description

remotePath

Endpoint that should be used to fetch the version index. Use {version} as a placeholder for the version number.

strict

If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version. Defaults to false.