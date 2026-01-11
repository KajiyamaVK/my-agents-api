Source: https://docs.frigate.video/configuration/bird_classification

On this page

Bird classification identifies known birds using a quantized Tensorflow model. When a known bird is recognized, its common name will be added as a `sub_label`. This information is included in the UI, filters, as well as in notifications.

## Minimum System Requirements[​](#minimum-system-requirements "Direct link to Minimum System Requirements")

Bird classification runs a lightweight tflite model on the CPU, there are no significantly different system requirements than running Frigate itself.

## Model[​](#model "Direct link to Model")

The classification model used is the MobileNet INat Bird Classification, [available identifiers can be found here.](https://raw.githubusercontent.com/google-coral/test_data/master/inat_bird_labels.txt)

## Configuration[​](#configuration "Direct link to Configuration")

Bird classification is disabled by default, it must be enabled in your config file before it can be used. Bird classification is a global configuration setting.

```
classification:  bird:    enabled: true
```

## Advanced Configuration[​](#advanced-configuration "Direct link to Advanced Configuration")

Fine-tune bird classification with these optional parameters:

*   `threshold`: Classification confidence score required to set the sub label on the object.
    *   Default: `0.9`.

*   [Minimum System Requirements](#minimum-system-requirements)
*   [Model](#model)
*   [Configuration](#configuration)
*   [Advanced Configuration](#advanced-configuration)