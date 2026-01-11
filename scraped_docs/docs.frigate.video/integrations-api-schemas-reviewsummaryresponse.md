Source: https://docs.frigate.video/integrations/api/schemas/reviewsummaryresponse

# ReviewSummaryResponse

**last24Hours** objectrequired

**reviewed\_alert**Reviewed Alert (integer)required

**reviewed\_detection**Reviewed Detection (integer)required

**total\_alert**Total Alert (integer)required

**total\_detection**Total Detection (integer)required

**root** objectrequired

**property name\*** DayReview

**day**date-timerequired

**reviewed\_alert**Reviewed Alert (integer)required

**reviewed\_detection**Reviewed Detection (integer)required

**total\_alert**Total Alert (integer)required

**total\_detection**Total Detection (integer)required

ReviewSummaryResponse

```
{  "last24Hours": {    "reviewed_alert": 0,    "reviewed_detection": 0,    "total_alert": 0,    "total_detection": 0  },  "root": {}}
```