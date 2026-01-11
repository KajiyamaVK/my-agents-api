Source: https://docs.frigate.video/integrations/api/preview-mp-4-camera-name-start-start-ts-end-end-ts-preview-mp-4-get

# Preview Mp4

GET 

## https://demo.frigate.video/api/:camera\_name/start/:start\_ts/end/:end\_ts/preview.mp4

Preview Mp4

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

### Query Parameters

**max\_cache\_age** Max Cache Age

Max cache age in seconds. Default 7 days in seconds.

**Default value:** `604800`

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/start/:start_ts/end/:end_ts/preview.mp4", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Show optional parameters

max\_cache\_age — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!