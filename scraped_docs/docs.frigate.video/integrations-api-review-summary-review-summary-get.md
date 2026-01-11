Source: https://docs.frigate.video/integrations/api/review-summary-review-summary-get

# Review Summary

GET 

## https://demo.frigate.video/api/review/summary

Review Summary

## Request[​](#request "Direct link to Request")

### Query Parameters

**cameras** Cameras

**Default value:** `all`

**labels** Labels

**Default value:** `all`

**zones** Zones

**Default value:** `all`

**timezone** Timezone

**Default value:** `utc`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**last24Hours** objectrequired

**reviewed\_alert**Reviewed Alert (integer)required

**reviewed\_detection**Reviewed Detection (integer)required

**total\_alert**Total Alert (integer)required

**total\_detection**Total Detection (integer)required

**root** objectrequired

**property name\*** DayReview

**day**date-timerequired

**reviewed\_alert**Reviewed Alert (integer)required

**reviewed\_detection**Reviewed Detection (integer)required

**total\_alert**Total Alert (integer)required

**total\_detection**Total Detection (integer)required

```
{  "last24Hours": {    "reviewed_alert": 0,    "reviewed_detection": 0,    "total_alert": 0,    "total_detection": 0  },  "root": {}}
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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/summary", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

cameras — query

labels — query

zones — query

timezone — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!