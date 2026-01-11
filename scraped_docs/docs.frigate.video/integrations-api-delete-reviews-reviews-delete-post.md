Source: https://docs.frigate.video/integrations/api/delete-reviews-reviews-delete-post

# Delete Reviews

POST 

## https://demo.frigate.video/api/reviews/delete

Delete Reviews

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**ids**string\[\]required

**Possible values:** `>= 1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "ids": [    "string"  ]})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/reviews/delete", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "ids": \[    "string"  \]
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!