Source: https://docs.frigate.video/integrations/api/logs-logs-service-get

# Logs

GET 

## https://demo.frigate.video/api/logs/:service

Get logs for the requested service (frigate/nginx/go2rtc)

## Request[​](#request "Direct link to Request")

### Path Parameters

**service** Servicerequired

**Possible values:** \[`frigate`, `nginx`, `go2rtc`\]

### Query Parameters

**download** any

**stream** any

**start** any

**end** any

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/logs/:service", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

service — pathrequired

\---frigatenginxgo2rtc

Show optional parameters

download — query

stream — query

start — query

end — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!