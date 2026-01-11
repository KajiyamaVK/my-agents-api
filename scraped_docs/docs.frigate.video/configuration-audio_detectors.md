Source: https://docs.frigate.video/configuration/audio_detectors

On this page

Frigate provides a builtin audio detector which runs on the CPU. Compared to object detection in images, audio detection is a relatively lightweight operation so the only option is to run the detection on a CPU.

## Configuration[​](#configuration "Direct link to Configuration")

Audio events work by detecting a type of audio and creating an event, the event will end once the type of audio has not been heard for the configured amount of time. Audio events save a snapshot at the beginning of the event as well as recordings throughout the event. The recordings are retained using the configured recording retention.

### Enabling Audio Events[​](#enabling-audio-events "Direct link to Enabling Audio Events")

Audio events can be enabled for all cameras or only for specific cameras.

```
audio: # <- enable audio events for all camera  enabled: Truecameras:  front_camera:    ffmpeg:    ...    audio:      enabled: True # <- enable audio events for the front_camera
```

If you are using multiple streams then you must set the `audio` role on the stream that is going to be used for audio detection, this can be any stream but the stream must have audio included.

note

The ffmpeg process for capturing audio will be a separate connection to the camera along with the other roles assigned to the camera, for this reason it is recommended that the go2rtc restream is used for this purpose. See [the restream docs](/configuration/restream) for more information.

```
cameras:  front_camera:    ffmpeg:      inputs:        - path: rtsp://.../main_stream          roles:            - record        - path: rtsp://.../sub_stream # <- this stream must have audio enabled          roles:            - audio            - detect
```

### Configuring Minimum Volume[​](#configuring-minimum-volume "Direct link to Configuring Minimum Volume")

The audio detector uses volume levels in the same way that motion in a camera feed is used for object detection. This means that frigate will not run audio detection unless the audio volume is above the configured level in order to reduce resource usage. Audio levels can vary widely between camera models so it is important to run tests to see what volume levels are. MQTT explorer can be used on the audio topic to see what volume level is being detected.

tip

Volume is considered motion for recordings, this means when the `record -> retain -> mode` is set to `motion` any time audio volume is > min\_volume that recording segment for that camera will be kept.

### Configuring Audio Events[​](#configuring-audio-events "Direct link to Configuring Audio Events")

The included audio model has over [500 different types](https://github.com/blakeblackshear/frigate/blob/dev/audio-labelmap.txt) of audio that can be detected, many of which are not practical. By default `bark`, `fire_alarm`, `scream`, `speech`, and `yell` are enabled but these can be customized.

```
audio:  enabled: True  listen:    - bark    - fire_alarm    - scream    - speech    - yell
```

*   [Configuration](#configuration)
    *   [Enabling Audio Events](#enabling-audio-events)
    *   [Configuring Minimum Volume](#configuring-minimum-volume)
    *   [Configuring Audio Events](#configuring-audio-events)