Source: https://docs.frigate.video/integrations/api/export-rename-export-event-id-rename-patch

# Export Rename

PATCH 

## https://demo.frigate.video/api/export/:event\_id/rename

Export Rename

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body**required**

**name**Friendly name (string)required

**Possible values:** `<= 256 characters`

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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "name": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PATCH", "/api/export/:event_id/rename", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body required

{
  "name": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!