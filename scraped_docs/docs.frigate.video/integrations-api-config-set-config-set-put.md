Source: https://docs.frigate.video/integrations/api/config-set-config-set-put

# Config Set

PUT 

## https://demo.frigate.video/api/config/set

Config Set

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**requires\_restart**Requires Restart (integer)

**Default value:** `1`

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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "requires_restart": 1})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PUT", "/api/config/set", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "requires\_restart": 1
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!