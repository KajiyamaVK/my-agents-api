Source: https://docs.frigate.video/integrations/api/motion-activity-review-activity-motion-get

# Motion Activity

GET 

## https://demo.frigate.video/api/review/activity/motion

Get motion and audio activity.

## Request[​](#request "Direct link to Request")

### Query Parameters

**cameras** Cameras

**Default value:** `all`

**before** Before

**after** After

**scale** Scale

**Default value:** `30`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

**start\_time**Start Time (integer)required

**motion**Motion (number)required

**camera**Camera (string)required

*   \]
    

```
[  {    "start_time": 0,    "motion": 0,    "camera": "string"  }]
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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/activity/motion", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

cameras — query

before — query

after — query

scale — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!