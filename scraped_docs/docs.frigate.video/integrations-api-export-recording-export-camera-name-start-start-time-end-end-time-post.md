Source: https://docs.frigate.video/integrations/api/export-recording-export-camera-name-start-start-time-end-end-time-post

# Export Recording

POST 

## https://demo.frigate.video/api/export/:camera\_name/start/:start\_time/end/:end\_time

Export Recording

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_time** Start Timerequired

**end\_time** End Timerequired

*   application/json

### Body**required**

**playback**Playback factor (string)

**Possible values:** \[`realtime`, `timelapse_25x`\]

**Default value:** `realtime`

**source**Playback source (string)

**Possible values:** \[`recordings`, `preview`\]

**Default value:** `recordings`

**name**Friendly name (string)

**Possible values:** `<= 256 characters`

**image\_path**Image Path (string)

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
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "playback": "realtime",  "source": "recordings",  "name": "string",  "image_path": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/export/:camera_name/start/:start_time/end/:end_time", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_time — pathrequired

end\_time — pathrequired

Body required

{
  "playback": "realtime",  "source": "recordings",  "name": "string",  "image\_path": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!