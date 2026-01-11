Source: https://docs.frigate.video/integrations/api/get-snapshot-from-recording-camera-name-recordings-frame-time-snapshot-format-get

# Get Snapshot From Recording

GET 

## https://demo.frigate.video/api/:camera\_name/recordings/:frame\_time/snapshot.:format

Get Snapshot From Recording

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**frame\_time** Frame Timerequired

**format** Formatrequired

**Possible values:** \[`png`, `jpg`\]

### Query Parameters

**height** Height

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

frame\_time — pathrequired

format — pathrequired

\---pngjpg

Show optional parameters

height — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!