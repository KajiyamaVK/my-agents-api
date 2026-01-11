Source: https://docs.frigate.video/integrations/api/schemas/reviewsegmentresponse

# ReviewSegmentResponse

**id**Id (string)required

**camera**Camera (string)required

**start\_time**date-timerequired

**end\_time**date-timerequired

**has\_been\_reviewed**Has Been Reviewed (boolean)required

**severity**SeverityEnum (string)required

**Possible values:** \[`alert`, `detection`\]

**thumb\_path**Thumb Path (string)required

**data**Datarequired

ReviewSegmentResponse

```
{  "id": "string",  "camera": "string",  "start_time": "2024-07-29T15:51:28.071Z",  "end_time": "2024-07-29T15:51:28.071Z",  "has_been_reviewed": true,  "severity": "alert",  "thumb_path": "string"}
```