Source: https://docs.frigate.video/integrations/api/events-search-events-search-get

# Events Search

GET 

## https://demo.frigate.video/api/events/search

Events Search

## Request[​](#request "Direct link to Request")

### Query Parameters

**query** any

**event\_id** any

**search\_type** any

**include\_thumbnails** anydeprecated

Deprecated. Thumbnail data is no longer included in the response. Use the /api/events/:event\_id/thumbnail.:extension endpoint instead.

**limit** any

**cameras** any

**labels** any

**zones** any

**after** any

**before** any

**time\_range** any

**has\_clip** any

**has\_snapshot** any

**is\_submitted** any

**timezone** any

**min\_score** any

**max\_score** any

**min\_speed** any

**max\_speed** any

**recognized\_license\_plate** any

**sort** any

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/search", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

query — query

event\_id — query

search\_type — query

include\_thumbnails — query

limit — query

cameras — query

labels — query

zones — query

after — query

before — query

time\_range — query

has\_clip — query

has\_snapshot — query

is\_submitted — query

timezone — query

min\_score — query

max\_score — query

min\_speed — query

max\_speed — query

recognized\_license\_plate — query

sort — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!