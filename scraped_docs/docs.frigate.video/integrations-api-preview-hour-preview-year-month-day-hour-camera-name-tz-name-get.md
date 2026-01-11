Source: https://docs.frigate.video/integrations/api/preview-hour-preview-year-month-day-hour-camera-name-tz-name-get

# Preview Hour

GET 

## https://demo.frigate.video/api/preview/:year\_month/:day/:hour/:camera\_name/:tz\_name

Get all mp4 previews relevant for time period given the timezone

## Request[​](#request "Direct link to Request")

### Path Parameters

**year\_month** Year Monthrequired

**day** Dayrequired

**hour** Hourrequired

**camera\_name** Camera Namerequired

**tz\_name** Tz Namerequired

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/preview/:year_month/:day/:hour/:camera_name/:tz_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

year\_month — pathrequired

day — pathrequired

hour — pathrequired

camera\_name — pathrequired

tz\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!