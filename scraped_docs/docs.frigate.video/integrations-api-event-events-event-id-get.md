Source: https://docs.frigate.video/integrations/api/event-events-event-id-get

# Event

GET 

## https://demo.frigate.video/api/events/:event\_id

Event

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

**id**Id (string)required

**label**Label (string)required

**sub\_label** objectrequired

anyOf

*   MOD1
*   MOD2

string

**camera**Camera (string)required

**start\_time**Start Time (number)required

**end\_time** objectrequired

anyOf

*   MOD1
*   MOD2

number

**false\_positive** objectrequired

anyOf

*   MOD1
*   MOD2

boolean

**zones**string\[\]required

**thumbnail** objectrequired

anyOf

*   MOD1
*   MOD2

string

**has\_clip**Has Clip (boolean)required

**has\_snapshot**Has Snapshot (boolean)required

**retain\_indefinitely**Retain Indefinitely (boolean)required

**plus\_id** objectrequired

anyOf

*   MOD1
*   MOD2

string

**model\_hash** objectrequired

anyOf

*   MOD1
*   MOD2

string

**detector\_type** objectrequired

anyOf

*   MOD1
*   MOD2

string

**model\_type** objectrequired

anyOf

*   MOD1
*   MOD2

string

**data**objectrequired

```
{  "id": "string",  "label": "string",  "sub_label": "string",  "camera": "string",  "start_time": 0,  "end_time": 0,  "false_positive": true,  "zones": [    "string"  ],  "thumbnail": "string",  "has_clip": true,  "has_snapshot": true,  "retain_indefinitely": true,  "plus_id": "string",  "model_hash": "string",  "detector_type": "string",  "model_type": "string",  "data": {}}
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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
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