Source: https://docs.frigate.video/integrations/api/event-thumbnail-events-event-id-thumbnail-extension-get

# Event Thumbnail

GET 

## https://demo.frigate.video/api/events/:event\_id/thumbnail.:extension

Event Thumbnail

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

**extension** Extensionrequired

### Query Parameters

**max\_cache\_age** Max Cache Age

Max cache age in seconds. Default 30 days in seconds.

**Default value:** `2592000`

**format** Format

**Possible values:** \[`ios`, `android`\]

**Default value:** `ios`

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

extension — pathrequired

Show optional parameters

max\_cache\_age — query

format — query

\---iosandroid

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!