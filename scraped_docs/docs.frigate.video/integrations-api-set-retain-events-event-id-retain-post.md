Source: https://docs.frigate.video/integrations/api/set-retain-events-event-id-retain-post

# Set Retain

POST 

## https://demo.frigate.video/api/events/:event\_id/retain

Set Retain

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("POST", "/api/events/:event_id/retain", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!