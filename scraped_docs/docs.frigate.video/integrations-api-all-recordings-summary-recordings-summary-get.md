Source: https://docs.frigate.video/integrations/api/all-recordings-summary-recordings-summary-get

# All Recordings Summary

GET 

## https://demo.frigate.video/api/recordings/summary

Returns true/false by day indicating if recordings exist

## Request[​](#request "Direct link to Request")

### Query Parameters

**timezone** Timezone

**Default value:** `utc`

**cameras** any

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/recordings/summary", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

timezone — query

cameras — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!