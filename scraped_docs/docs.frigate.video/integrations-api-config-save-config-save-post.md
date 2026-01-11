Source: https://docs.frigate.video/integrations/api/config-save-config-save-post

# Config Save

POST 

## https://demo.frigate.video/api/config/save

Config Save

## Request[​](#request "Direct link to Request")

### Query Parameters

**save\_option** Save Optionrequired

*   text/plain

### Body**required**

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Content-Type': 'text/plain',  'Accept': 'application/json'}conn.request("POST", "/api/config/save", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

save\_option — queryrequired

Body required
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!