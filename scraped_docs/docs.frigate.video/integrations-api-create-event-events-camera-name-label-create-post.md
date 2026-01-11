Source: https://docs.frigate.video/integrations/api/create-event-events-camera-name-label-create-post

# Create Event

POST 

## https://demo.frigate.video/api/events/:camera\_name/:label/create

Create Event

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

*   application/json

### Body

**source\_type** object

anyOf

*   MOD1
*   MOD2

string

**sub\_label** object

anyOf

*   MOD1
*   MOD2

string

**score** object

anyOf

*   MOD1
*   MOD2

number

**duration** object

anyOf

*   MOD1
*   MOD2

integer

**include\_recording** object

anyOf

*   MOD1
*   MOD2

boolean

**draw** object

anyOf

*   MOD1
*   MOD2

object

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

**event\_id**Event Id (string)required

```
{  "success": true,  "message": "string",  "event_id": "string"}
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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "source_type": "string",  "sub_label": "string",  "score": 0,  "duration": 0,  "include_recording": True,  "draw": {}})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/events/:camera_name/:label/create", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Body

{
  "source\_type": "string",  "sub\_label": "string",  "score": 0,  "duration": 0,  "include\_recording": true,  "draw": {}
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!