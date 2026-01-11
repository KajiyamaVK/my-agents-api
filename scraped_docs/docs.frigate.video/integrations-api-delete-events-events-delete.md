Source: https://docs.frigate.video/integrations/api/delete-events-events-delete

# Delete Events

DELETE 

## https://demo.frigate.video/api/events/

Delete Events

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**event\_ids**string\[\]required

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**deleted\_events**string\[\]required

**not\_found\_events**string\[\]required

```
{  "success": true,  "deleted_events": [    "string"  ],  "not_found_events": [    "string"  ]}
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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "event_ids": [    "string"  ]})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("DELETE", "/api/events/", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "event\_ids": \[    "string"  \]
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!