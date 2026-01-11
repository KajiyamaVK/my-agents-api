Source: https://docs.frigate.video/integrations/api/schemas/validationerror

# ValidationError

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

ValidationError

```
{  "loc": [    "string",    0  ],  "msg": "string",  "type": "string"}
```