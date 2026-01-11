Source: https://docs.frigate.video/integrations/api/schemas/eventresponse

# EventResponse

**id**Id (string)required

**label**Label (string)required

**sub\_label** objectrequired

anyOf

*   MOD1
*   MOD2

string

**camera**Camera (string)required

**start\_time**Start Time (number)required

**end\_time** objectrequired

anyOf

*   MOD1
*   MOD2

number

**false\_positive** objectrequired

anyOf

*   MOD1
*   MOD2

boolean

**zones**string\[\]required

**thumbnail** objectrequired

anyOf

*   MOD1
*   MOD2

string

**has\_clip**Has Clip (boolean)required

**has\_snapshot**Has Snapshot (boolean)required

**retain\_indefinitely**Retain Indefinitely (boolean)required

**plus\_id** objectrequired

anyOf

*   MOD1
*   MOD2

string

**model\_hash** objectrequired

anyOf

*   MOD1
*   MOD2

string

**detector\_type** objectrequired

anyOf

*   MOD1
*   MOD2

string

**model\_type** objectrequired

anyOf

*   MOD1
*   MOD2

string

**data**objectrequired

EventResponse

```
{  "id": "string",  "label": "string",  "sub_label": "string",  "camera": "string",  "start_time": 0,  "end_time": 0,  "false_positive": true,  "zones": [    "string"  ],  "thumbnail": "string",  "has_clip": true,  "has_snapshot": true,  "retain_indefinitely": true,  "plus_id": "string",  "model_hash": "string",  "detector_type": "string",  "model_type": "string",  "data": {}}
```