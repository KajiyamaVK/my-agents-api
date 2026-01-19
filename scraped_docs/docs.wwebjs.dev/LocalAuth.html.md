Source: https://docs.wwebjs.dev/LocalAuth.html

## new LocalAuth(options)

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

clientId

Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance

dataPath

Change the default path for saving session files, default is: "./.wwebjs\_auth/"

rmMaxRetries

Sets the maximum number of retries for removing the session directory