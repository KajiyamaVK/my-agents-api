Source: https://docs.wwebjs.dev/LocalWebCache.html

## new LocalWebCache(options)

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

path

Path to the directory where cached versions are saved, default is: "./.wwebjs\_cache/"

strict

If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version.