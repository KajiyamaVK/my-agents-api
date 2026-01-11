Source: https://docs.frigate.video/configuration/objects

On this page

Frigate includes the object labels listed below from the Google Coral test data.

Please note:

*   `car` is listed twice because `truck` has been renamed to `car` by default. These object types are frequently confused.
*   `person` is the only tracked object by default. See the [full configuration reference](/configuration/reference) for an example of expanding the list of tracked objects.

*   person
*   bicycle
*   car
*   motorcycle
*   airplane
*   bus
*   train
*   car
*   boat
*   traffic light
*   fire hydrant
*   street sign
*   stop sign
*   parking meter
*   bench
*   bird
*   cat
*   dog
*   horse
*   sheep
*   cow
*   elephant
*   bear
*   zebra
*   giraffe
*   hat
*   backpack
*   umbrella
*   shoe
*   eye glasses
*   handbag
*   tie
*   suitcase
*   frisbee
*   skis
*   snowboard
*   sports ball
*   kite
*   baseball bat
*   baseball glove
*   skateboard
*   surfboard
*   tennis racket
*   bottle
*   plate
*   wine glass
*   cup
*   fork
*   knife
*   spoon
*   bowl
*   banana
*   apple
*   sandwich
*   orange
*   broccoli
*   carrot
*   hot dog
*   pizza
*   donut
*   cake
*   chair
*   couch
*   potted plant
*   bed
*   mirror
*   dining table
*   window
*   desk
*   toilet
*   door
*   tv
*   laptop
*   mouse
*   remote
*   keyboard
*   cell phone
*   microwave
*   oven
*   toaster
*   sink
*   refrigerator
*   blender
*   book
*   clock
*   vase
*   scissors
*   teddy bear
*   hair drier
*   toothbrush
*   hair brush

## Custom Models[​](#custom-models "Direct link to Custom Models")

Models for both CPU and EdgeTPU (Coral) are bundled in the image. You can use your own models with volume mounts:

*   CPU Model: `/cpu_model.tflite`
*   EdgeTPU Model: `/edgetpu_model.tflite`
*   Labels: `/labelmap.txt`

You also need to update the [model config](/configuration/advanced#model) if they differ from the defaults.

*   [Custom Models](#custom-models)