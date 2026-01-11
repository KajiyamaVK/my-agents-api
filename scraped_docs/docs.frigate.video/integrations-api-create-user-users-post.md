Source: https://docs.frigate.video/integrations/api/create-user-users-post

# Create User

POST 

## https://demo.frigate.video/api/users

Create User

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**username**Username (string)required

**password**Password (string)required

**role** object

anyOf

*   MOD1
*   MOD2

string

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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "username": "string",  "password": "string",  "role": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/users", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "username": "string",  "password": "string",  "role": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!