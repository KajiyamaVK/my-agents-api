Source: https://docs.frigate.video/integrations/api/get-vapid-pub-key-notifications-pubkey-get

# Get Vapid Pub Key

GET 

## https://demo.frigate.video/api/notifications/pubkey

Get Vapid Pub Key

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/notifications/pubkey", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!