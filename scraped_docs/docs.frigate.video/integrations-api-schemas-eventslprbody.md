Source: https://docs.frigate.video/integrations/api/schemas/eventslprbody

# EventsLPRBody

**recognizedLicensePlate**Recognized License Plate (string)required

**Possible values:** `<= 100 characters`

**recognizedLicensePlateScore** object

anyOf

*   MOD1
*   MOD2

number

**Possible values:** `> 0` and `<= 1`

EventsLPRBody

```
{  "recognizedLicensePlate": "string",  "recognizedLicensePlateScore": 0}
```