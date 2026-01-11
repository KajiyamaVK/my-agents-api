Source: https://docs.frigate.video/integrations/api/event-snapshot-events-event-id-snapshot-jpg-get

# Event Snapshot

GET 

## https://demo.frigate.video/api/events/:event\_id/snapshot.jpg

Returns a snapshot image for the specified object id. NOTE: The query params only take affect while the event is in-progress. Once the event has ended the snapshot configuration is used.

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

### Query Parameters

**download** any

**timestamp** any

**bbox** any

**crop** any

**height** any

**quality** any

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id/snapshot.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Show optional parameters

download — query

timestamp — query

bbox — query

crop — query

height — query

quality — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!