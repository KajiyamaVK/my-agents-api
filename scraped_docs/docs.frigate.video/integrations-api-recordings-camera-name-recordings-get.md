Source: https://docs.frigate.video/integrations/api/recordings-camera-name-recordings-get

# Recordings

GET 

## https://demo.frigate.video/api/:camera\_name/recordings

Return specific camera recordings between the given "after"/"end" times. If not provided the last hour will be used

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

### Query Parameters

**after** After

**Default value:** `1752611870.43948`

**before** Before

**Default value:** `1752615470.43949`

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/recordings", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Show optional parameters

after — query

before — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!