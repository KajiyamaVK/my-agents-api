Source: https://docs.frigate.video/integrations/api/label-snapshot-camera-name-label-snapshot-jpg-get

# Label Snapshot

GET 

## https://demo.frigate.video/api/:camera\_name/:label/snapshot.jpg

Returns the snapshot image from the latest event for the given camera and label combo

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/:label/snapshot.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!