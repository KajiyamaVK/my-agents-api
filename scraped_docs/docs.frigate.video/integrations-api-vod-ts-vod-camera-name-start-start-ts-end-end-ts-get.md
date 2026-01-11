Source: https://docs.frigate.video/integrations/api/vod-ts-vod-camera-name-start-start-ts-end-end-ts-get

# Vod Ts

GET 

## https://demo.frigate.video/api/vod/:camera\_name/start/:start\_ts/end/:end\_ts

Returns an HLS playlist for the specified timestamp-range on the specified camera. Append /master.m3u8 or /index.m3u8 for HLS playback.

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/vod/:camera_name/start/:start_ts/end/:end_ts", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!