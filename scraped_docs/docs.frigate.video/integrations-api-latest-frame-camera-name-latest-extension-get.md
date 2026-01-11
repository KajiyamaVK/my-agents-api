Source: https://docs.frigate.video/integrations/api/latest-frame-camera-name-latest-extension-get

# Latest Frame

GET 

## https://demo.frigate.video/api/:camera\_name/latest.:extension

Latest Frame

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**extension** Extensionrequired

**Possible values:** \[`webp`, `png`, `jpg`, `jpeg`\]

### Query Parameters

**bbox** any

**timestamp** any

**zones** any

**mask** any

**motion** any

**regions** any

**quality** any

**height** any

**store** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

**loc** object\[\]required

*   Array \[
    
anyOf

*   MOD1
*   MOD2

string

integer

*   \]
    

**msg**Message (string)required

**type**Error Type (string)required

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

extension — pathrequired

\---webppngjpgjpeg

Show optional parameters

bbox — query

timestamp — query

zones — query

mask — query

motion — query

regions — query

quality — query

height — query

store — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!