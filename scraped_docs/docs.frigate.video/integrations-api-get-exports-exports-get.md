Source: https://docs.frigate.video/integrations/api/get-exports-exports-get

# Get Exports

GET 

## https://demo.frigate.video/api/exports

Get Exports

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/exports", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!