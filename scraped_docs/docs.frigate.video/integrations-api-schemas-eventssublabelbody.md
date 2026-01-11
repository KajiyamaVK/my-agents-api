Source: https://docs.frigate.video/integrations/api/schemas/eventssublabelbody

# EventsSubLabelBody

**subLabel**Sub label (string)required

**Possible values:** `<= 100 characters`

**subLabelScore** object

anyOf

*   MOD1
*   MOD2

number

**Possible values:** `> 0` and `<= 1`

**camera** object

anyOf

*   MOD1
*   MOD2

string

EventsSubLabelBody

```
{  "subLabel": "string",  "subLabelScore": 0,  "camera": "string"}
```