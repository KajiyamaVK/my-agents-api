Source: https://docs.frigate.video/integrations/api/version-version-get

# Version

GET 

## https://demo.frigate.video/api/version

Version

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   text/plain

*   Schema
*   Example (auto)

**Schema**

**string**string

```
"string"
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'text/plain'}conn.request("GET", "/api/version", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!