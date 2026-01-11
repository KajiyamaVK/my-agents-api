Source: https://docs.frigate.video/integrations/api/events-events-get

# Events

GET 

## https://demo.frigate.video/api/events

Events

## Request[​](#request "Direct link to Request")

### Query Parameters

**camera** any

**cameras** any

**label** any

**labels** any

**sub\_label** any

**sub\_labels** any

**zone** any

**zones** any

**limit** any

**after** any

**before** any

**time\_range** any

**has\_clip** any

**has\_snapshot** any

**in\_progress** any

**include\_thumbnails** anydeprecated

Deprecated. Thumbnail data is no longer included in the response. Use the /api/events/:event\_id/thumbnail.:extension endpoint instead.

**favorites** any

**min\_score** any

**max\_score** any

**min\_speed** any

**max\_speed** any

**recognized\_license\_plate** any

**is\_submitted** any

**min\_length** any

**max\_length** any

**event\_id** any

**sort** any

**timezone** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

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

*   \]
    

```
[  {    "id": "string",    "label": "string",    "sub_label": "string",    "camera": "string",    "start_time": 0,    "end_time": 0,    "false_positive": true,    "zones": [      "string"    ],    "thumbnail": "string",    "has_clip": true,    "has_snapshot": true,    "retain_indefinitely": true,    "plus_id": "string",    "model_hash": "string",    "detector_type": "string",    "model_type": "string",    "data": {}  }]
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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

camera — query

cameras — query

label — query

labels — query

sub\_label — query

sub\_labels — query

zone — query

zones — query

limit — query

after — query

before — query

time\_range — query

has\_clip — query

has\_snapshot — query

in\_progress — query

include\_thumbnails — query

favorites — query

min\_score — query

max\_score — query

min\_speed — query

max\_speed — query

recognized\_license\_plate — query

is\_submitted — query

min\_length — query

max\_length — query

event\_id — query

sort — query

timezone — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!