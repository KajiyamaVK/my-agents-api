Source: https://docs.frigate.video/integrations/api/schemas/exportrecordingsbody

# ExportRecordingsBody

**playback**Playback factor (string)

**Possible values:** \[`realtime`, `timelapse_25x`\]

**Default value:** `realtime`

**source**Playback source (string)

**Possible values:** \[`recordings`, `preview`\]

**Default value:** `recordings`

**name**Friendly name (string)

**Possible values:** `<= 256 characters`

**image\_path**Image Path (string)

ExportRecordingsBody

```
{  "playback": "realtime",  "source": "recordings",  "name": "string",  "image_path": "string"}
```