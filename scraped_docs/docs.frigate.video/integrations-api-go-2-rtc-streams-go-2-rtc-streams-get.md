Source: https://docs.frigate.video/integrations/api/go-2-rtc-streams-go-2-rtc-streams-get

# Go2Rtc Streams

GET 

## https://demo.frigate.video/api/go2rtc/streams

Go2Rtc Streams

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
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/go2rtc/streams", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!