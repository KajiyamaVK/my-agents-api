Source: https://docs.frigate.video/integrations/api/review-ids-review-ids-get

# Review Ids

GET 

## https://demo.frigate.video/api/review\_ids

Review Ids

## Request[​](#request "Direct link to Request")

### Query Parameters

**ids** Idsrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

**id**Id (string)required

**camera**Camera (string)required

**start\_time**date-timerequired

**end\_time**date-timerequired

**has\_been\_reviewed**Has Been Reviewed (boolean)required

**severity**SeverityEnum (string)required

**Possible values:** \[`alert`, `detection`\]

**thumb\_path**Thumb Path (string)required

**data**Datarequired

*   \]
    

```
[  {    "id": "string",    "camera": "string",    "start_time": "2024-07-29T15:51:28.071Z",    "end_time": "2024-07-29T15:51:28.071Z",    "has_been_reviewed": true,    "severity": "alert",    "thumb_path": "string"  }]
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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review_ids", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

ids — queryrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!