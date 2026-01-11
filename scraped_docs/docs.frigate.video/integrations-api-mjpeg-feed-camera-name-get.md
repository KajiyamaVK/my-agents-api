Source: https://docs.frigate.video/integrations/api/mjpeg-feed-camera-name-get

# Mjpeg Feed

GET 

## https://demo.frigate.video/api/:camera\_name

Mjpeg Feed

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

### Query Parameters

**fps** Fps

**Default value:** `3`

**height** Height

**Default value:** `360`

**bbox** any

**timestamp** any

**zones** any

**mask** any

**motion** any

**regions** any

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Show optional parameters

fps — query

height — query

bbox — query

timestamp — query

zones — query

mask — query

motion — query

regions — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!