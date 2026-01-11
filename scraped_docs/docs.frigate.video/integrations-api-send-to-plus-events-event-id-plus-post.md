Source: https://docs.frigate.video/integrations/api/send-to-plus-events-event-id-plus-post

# Send To Plus

POST 

## https://demo.frigate.video/api/events/:event\_id/plus

Send To Plus

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body

**include\_annotation**Include Annotation (integer)

**Default value:** `1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**plus\_id**Plus Id (string)required

```
{  "success": true,  "plus_id": "string"}
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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "include_annotation": 1})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/events/:event_id/plus", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body

{
  "include\_annotation": 1
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!