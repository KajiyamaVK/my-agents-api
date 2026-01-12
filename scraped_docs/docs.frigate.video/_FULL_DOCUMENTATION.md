# Full Documentation for docs.frigate.video
Generated on: 2026-01-11T22:47:20.169Z



--- END OF FILE: configuration-.md ---
--- START OF FILE: configuration-.md ---

Source: https://docs.frigate.video/configuration/

On this page

For Home Assistant Add-on installations, the config file should be at `/addon_configs/<addon_directory>/config.yml`, where `<addon_directory>` is specific to the variant of the Frigate Add-on you are running. See the list of directories [here](#accessing-add-on-config-dir).

For all other installation types, the config file should be mapped to `/config/config.yml` inside the container.

It can be named `config.yml` or `config.yaml`, but if both files exist `config.yml` will be preferred and `config.yaml` will be ignored.

It is recommended to start with a minimal configuration and add to it as described in [this guide](/guides/getting_started) and use the built in configuration editor in Frigate's UI which supports validation.

```
mqtt:  enabled: Falsecameras:  dummy_camera: # <--- this will be changed to your actual camera later    enabled: False    ffmpeg:      inputs:        - path: rtsp://127.0.0.1:554/rtsp          roles:            - detect
```

## Accessing the Home Assistant Add-on configuration directory[​](#accessing-add-on-config-dir "Direct link to Accessing the Home Assistant Add-on configuration directory")

When running Frigate through the HA Add-on, the Frigate `/config` directory is mapped to `/addon_configs/<addon_directory>` in the host, where `<addon_directory>` is specific to the variant of the Frigate Add-on you are running.

Add-on Variant

Configuration directory

Frigate

`/addon_configs/ccab4aaf_frigate`

Frigate (Full Access)

`/addon_configs/ccab4aaf_frigate-fa`

Frigate Beta

`/addon_configs/ccab4aaf_frigate-beta`

Frigate Beta (Full Access)

`/addon_configs/ccab4aaf_frigate-fa-beta`

**Whenever you see `/config` in the documentation, it refers to this directory.**

If for example you are running the standard Add-on variant and use the [VS Code Add-on](https://github.com/hassio-addons/addon-vscode) to browse your files, you can click _File_ > _Open folder..._ and navigate to `/addon_configs/ccab4aaf_frigate` to access the Frigate `/config` directory and edit the `config.yaml` file. You can also use the built-in file editor in the Frigate UI to edit the configuration file.

## VS Code Configuration Schema[​](#vs-code-configuration-schema "Direct link to VS Code Configuration Schema")

VS Code supports JSON schemas for automatically validating configuration files. You can enable this feature by adding `# yaml-language-server: $schema=http://frigate_host:5000/api/config/schema.json` to the beginning of the configuration file. Replace `frigate_host` with the IP address or hostname of your Frigate server. If you're using both VS Code and Frigate as an Add-on, you should use `ccab4aaf-frigate` instead. Make sure to expose the internal unauthenticated port `5000` when accessing the config from VS Code on another machine.

## Environment Variable Substitution[​](#environment-variable-substitution "Direct link to Environment Variable Substitution")

Frigate supports the use of environment variables starting with `FRIGATE_` **only** where specifically indicated in the [reference config](/configuration/reference). For example, the following values can be replaced at runtime by using environment variables:

```
mqtt:  user: "{FRIGATE_MQTT_USER}"  password: "{FRIGATE_MQTT_PASSWORD}"
```

```
- path: rtsp://{FRIGATE_RTSP_USER}:{FRIGATE_RTSP_PASSWORD}@10.0.10.10:8554/unicast
```

```
onvif:  host: 10.0.10.10  port: 8000  user: "{FRIGATE_RTSP_USER}"  password: "{FRIGATE_RTSP_PASSWORD}"
```

```
go2rtc:  rtsp:    username: "{FRIGATE_GO2RTC_RTSP_USERNAME}"    password: "{FRIGATE_GO2RTC_RTSP_PASSWORD}"
```

```
genai:  api_key: "{FRIGATE_GENAI_API_KEY}"
```

## Common configuration examples[​](#common-configuration-examples "Direct link to Common configuration examples")

Here are some common starter configuration examples. Refer to the [reference config](/configuration/reference) for detailed information about all the config values.

### Raspberry Pi Home Assistant Add-on with USB Coral[​](#raspberry-pi-home-assistant-add-on-with-usb-coral "Direct link to Raspberry Pi Home Assistant Add-on with USB Coral")

*   Single camera with 720p, 5fps stream for detect
*   MQTT connected to the Home Assistant Mosquitto Add-on
*   Hardware acceleration for decoding video
*   USB Coral detector
*   Save all video with any detectable motion for 7 days regardless of whether any objects were detected or not
*   Continue to keep all video if it qualified as an alert or detection for 30 days
*   Save snapshots for 30 days
*   Motion mask for the camera timestamp

```
mqtt:  host: core-mosquitto  user: mqtt-user  password: xxxxxxxxxxffmpeg:  hwaccel_args: preset-rpi-64-h264detectors:  coral:    type: edgetpu    device: usbrecord:  enabled: True  retain:    days: 7    mode: motion  alerts:    retain:      days: 30  detections:    retain:      days: 30snapshots:  enabled: True  retain:    default: 30cameras:  name_of_your_camera:    detect:      width: 1280      height: 720      fps: 5    ffmpeg:      inputs:        - path: rtsp://10.0.10.10:554/rtsp          roles:            - detect    motion:      mask:        - 0.000,0.427,0.002,0.000,0.999,0.000,0.999,0.781,0.885,0.456,0.700,0.424,0.701,0.311,0.507,0.294,0.453,0.347,0.451,0.400
```

### Standalone Intel Mini PC with USB Coral[​](#standalone-intel-mini-pc-with-usb-coral "Direct link to Standalone Intel Mini PC with USB Coral")

*   Single camera with 720p, 5fps stream for detect
*   MQTT disabled (not integrated with home assistant)
*   VAAPI hardware acceleration for decoding video
*   USB Coral detector
*   Save all video with any detectable motion for 7 days regardless of whether any objects were detected or not
*   Continue to keep all video if it qualified as an alert or detection for 30 days
*   Save snapshots for 30 days
*   Motion mask for the camera timestamp

```
mqtt:  enabled: Falseffmpeg:  hwaccel_args: preset-vaapidetectors:  coral:    type: edgetpu    device: usbrecord:  enabled: True  retain:    days: 7    mode: motion  alerts:    retain:      days: 30  detections:    retain:      days: 30snapshots:  enabled: True  retain:    default: 30cameras:  name_of_your_camera:    detect:      width: 1280      height: 720      fps: 5    ffmpeg:      inputs:        - path: rtsp://10.0.10.10:554/rtsp          roles:            - detect    motion:      mask:        - 0.000,0.427,0.002,0.000,0.999,0.000,0.999,0.781,0.885,0.456,0.700,0.424,0.701,0.311,0.507,0.294,0.453,0.347,0.451,0.400
```

### Home Assistant integrated Intel Mini PC with OpenVino[​](#home-assistant-integrated-intel-mini-pc-with-openvino "Direct link to Home Assistant integrated Intel Mini PC with OpenVino")

*   Single camera with 720p, 5fps stream for detect
*   MQTT connected to same mqtt server as home assistant
*   VAAPI hardware acceleration for decoding video
*   OpenVino detector
*   Save all video with any detectable motion for 7 days regardless of whether any objects were detected or not
*   Continue to keep all video if it qualified as an alert or detection for 30 days
*   Save snapshots for 30 days
*   Motion mask for the camera timestamp

```
mqtt:  host: 192.168.X.X # <---- same mqtt broker that home assistant uses  user: mqtt-user  password: xxxxxxxxxxffmpeg:  hwaccel_args: preset-vaapidetectors:  ov:    type: openvino    device: AUTOmodel:  width: 300  height: 300  input_tensor: nhwc  input_pixel_format: bgr  path: /openvino-model/ssdlite_mobilenet_v2.xml  labelmap_path: /openvino-model/coco_91cl_bkgr.txtrecord:  enabled: True  retain:    days: 7    mode: motion  alerts:    retain:      days: 30  detections:    retain:      days: 30snapshots:  enabled: True  retain:    default: 30cameras:  name_of_your_camera:    detect:      width: 1280      height: 720      fps: 5    ffmpeg:      inputs:        - path: rtsp://10.0.10.10:554/rtsp          roles:            - detect    motion:      mask:        - 0.000,0.427,0.002,0.000,0.999,0.000,0.999,0.781,0.885,0.456,0.700,0.424,0.701,0.311,0.507,0.294,0.453,0.347,0.451,0.400
```

*   [Accessing the Home Assistant Add-on configuration directory](#accessing-add-on-config-dir)
*   [VS Code Configuration Schema](#vs-code-configuration-schema)
*   [Environment Variable Substitution](#environment-variable-substitution)
*   [Common configuration examples](#common-configuration-examples)
    *   [Raspberry Pi Home Assistant Add-on with USB Coral](#raspberry-pi-home-assistant-add-on-with-usb-coral)
    *   [Standalone Intel Mini PC with USB Coral](#standalone-intel-mini-pc-with-usb-coral)
    *   [Home Assistant integrated Intel Mini PC with OpenVino](#home-assistant-integrated-intel-mini-pc-with-openvino)

--- END OF FILE: configuration-advanced.md ---
--- START OF FILE: configuration-advanced.md ---

Source: https://docs.frigate.video/configuration/advanced

On this page

### Logging[​](#logging "Direct link to Logging")

#### Frigate `logger`[​](#frigate-logger "Direct link to frigate-logger")

Change the default log level for troubleshooting purposes.

```
logger:  # Optional: default log level (default: shown below)  default: info  # Optional: module by module log level configuration  logs:    frigate.mqtt: error
```

Available log levels are: `debug`, `info`, `warning`, `error`, `critical`

Examples of available modules are:

*   `frigate.app`
*   `frigate.mqtt`
*   `frigate.object_detection`
*   `detector.<detector_name>`
*   `watchdog.<camera_name>`
*   `ffmpeg.<camera_name>.<sorted_roles>` NOTE: All FFmpeg logs are sent as `error` level.

#### Go2RTC Logging[​](#go2rtc-logging "Direct link to Go2RTC Logging")

See [the go2rtc docs](https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#module-log) for logging configuration

```
go2rtc:  streams:    # ...  log:    exec: trace
```

### `environment_vars`[​](#environment_vars "Direct link to environment_vars")

This section can be used to set environment variables for those unable to modify the environment of the container, like within Home Assistant OS.

Example:

```
environment_vars:  VARIABLE_NAME: variable_value
```

### `database`[​](#database "Direct link to database")

Tracked object and recording information is managed in a sqlite database at `/config/frigate.db`. If that database is deleted, recordings will be orphaned and will need to be cleaned up manually. They also won't show up in the Media Browser within Home Assistant.

If you are storing your database on a network share (SMB, NFS, etc), you may get a `database is locked` error message on startup. You can customize the location of the database in the config if necessary.

This may need to be in a custom location if network storage is used for the media folder.

```
database:  path: /path/to/frigate.db
```

### `model`[​](#model "Direct link to model")

If using a custom model, the width and height will need to be specified.

Custom models may also require different input tensor formats. The colorspace conversion supports RGB, BGR, or YUV frames to be sent to the object detector. The input tensor shape parameter is an enumeration to match what specified by the model.

Tensor Dimension

Description

N

Batch Size

H

Model Height

W

Model Width

C

Color Channels

Available Input Tensor Shapes

"nhwc"

"nchw"

```
# Optional: model configmodel:  path: /path/to/model  width: 320  height: 320  input_tensor: "nhwc"  input_pixel_format: "bgr"
```

#### `labelmap`[​](#labelmap "Direct link to labelmap")

warning

If the labelmap is customized then the labels used for alerts will need to be adjusted as well. See [alert labels](/configuration/review#restricting-alerts-to-specific-labels) for more info.

The labelmap can be customized to your needs. A common reason to do this is to combine multiple object types that are easily confused when you don't need to be as granular such as car/truck. By default, truck is renamed to car because they are often confused. You cannot add new object types, but you can change the names of existing objects in the model.

```
model:  labelmap:    2: vehicle    3: vehicle    5: vehicle    7: vehicle    15: animal    16: animal    17: animal
```

Note that if you rename objects in the labelmap, you will also need to update your `objects -> track` list as well.

warning

Some labels have special handling and modifications can disable functionality.

`person` objects are associated with `face` and `amazon`

`car` objects are associated with `license_plate`, `ups`, `fedex`, `amazon`

## Network Configuration[​](#network-configuration "Direct link to Network Configuration")

Changes to Frigate's internal network configuration can be made by bind mounting nginx.conf into the container. For example:

```
services:  frigate:    container_name: frigate    ...    volumes:      ...      - /path/to/your/nginx.conf:/usr/local/nginx/conf/nginx.conf
```

### Enabling IPv6[​](#enabling-ipv6 "Direct link to Enabling IPv6")

IPv6 is disabled by default, to enable IPv6 listen.gotmpl needs to be bind mounted with IPv6 enabled. For example:

```
{{ if not .enabled }}# intended for external traffic, protected by authlisten 8971;{{ else }}# intended for external traffic, protected by authlisten 8971 ssl;# intended for internal traffic, not protected by authlisten 5000;
```

becomes

```
{{ if not .enabled }}# intended for external traffic, protected by authlisten [::]:8971 ipv6only=off;{{ else }}# intended for external traffic, protected by authlisten [::]:8971 ipv6only=off ssl;# intended for internal traffic, not protected by authlisten [::]:5000 ipv6only=off;
```

## Base path[​](#base-path "Direct link to Base path")

By default, Frigate runs at the root path (`/`). However some setups require to run Frigate under a custom path prefix (e.g. `/frigate`), especially when Frigate is located behind a reverse proxy that requires path-based routing.

### Set Base Path via HTTP Header[​](#set-base-path-via-http-header "Direct link to Set Base Path via HTTP Header")

The preferred way to configure the base path is through the `X-Ingress-Path` HTTP header, which needs to be set to the desired base path in an upstream reverse proxy.

For example, in Nginx:

```
location /frigate {    proxy_set_header X-Ingress-Path /frigate;    proxy_pass http://frigate_backend;}
```

### Set Base Path via Environment Variable[​](#set-base-path-via-environment-variable "Direct link to Set Base Path via Environment Variable")

When it is not feasible to set the base path via a HTTP header, it can also be set via the `FRIGATE_BASE_PATH` environment variable in the Docker Compose file.

For example:

```
services:  frigate:    image: blakeblackshear/frigate:latest    environment:      - FRIGATE_BASE_PATH=/frigate
```

This can be used for example to access Frigate via a Tailscale agent (https), by simply forwarding all requests to the base path (http):

```
tailscale serve --https=443 --bg --set-path /frigate http://localhost:5000/frigate
```

## Custom Dependencies[​](#custom-dependencies "Direct link to Custom Dependencies")

### Custom ffmpeg build[​](#custom-ffmpeg-build "Direct link to Custom ffmpeg build")

Included with Frigate is a build of ffmpeg that works for the vast majority of users. However, there exists some hardware setups which have incompatibilities with the included build. In this case, statically built `ffmpeg` and `ffprobe` binaries can be placed in `/config/custom-ffmpeg/bin` for Frigate to use.

To do this:

1.  Download your ffmpeg build and uncompress it to the `/config/custom-ffmpeg` folder. Verify that both the `ffmpeg` and `ffprobe` binaries are located in `/config/custom-ffmpeg/bin`.
2.  Update the `ffmpeg.path` in your Frigate config to `/config/custom-ffmpeg`.
3.  Restart Frigate and the custom version will be used if the steps above were done correctly.

### Custom go2rtc version[​](#custom-go2rtc-version "Direct link to Custom go2rtc version")

Frigate currently includes go2rtc v1.9.9, there may be certain cases where you want to run a different version of go2rtc.

To do this:

1.  Download the go2rtc build to the `/config` folder.
2.  Rename the build to `go2rtc`.
3.  Give `go2rtc` execute permission.
4.  Restart Frigate and the custom version will be used, you can verify by checking go2rtc logs.

## Validating your config.yml file updates[​](#validating-your-configyml-file-updates "Direct link to Validating your config.yml file updates")

When frigate starts up, it checks whether your config file is valid, and if it is not, the process exits. To minimize interruptions when updating your config, you have three options -- you can edit the config via the WebUI which has built in validation, use the config API, or you can validate on the command line using the frigate docker container.

### Via API[​](#via-api "Direct link to Via API")

Frigate can accept a new configuration file as JSON at the `/api/config/save` endpoint. When updating the config this way, Frigate will validate the config before saving it, and return a `400` if the config is not valid.

```
curl -X POST http://frigate_host:5000/api/config/save -d @config.json
```

if you'd like you can use your yaml config directly by using [`yq`](https://github.com/mikefarah/yq) to convert it to json:

```
yq r -j config.yml | curl -X POST http://frigate_host:5000/api/config/save -d @-
```

### Via Command Line[​](#via-command-line "Direct link to Via Command Line")

You can also validate your config at the command line by using the docker container itself. In CI/CD, you leverage the return code to determine if your config is valid, Frigate will return `1` if the config is invalid, or `0` if it's valid.

```
docker run                                \  -v $(pwd)/config.yml:/config/config.yml \  --entrypoint python3                    \  ghcr.io/blakeblackshear/frigate:stable  \  -u -m frigate                           \  --validate-config
```

*   [Logging](#logging)
*   [`environment_vars`](#environment_vars)
*   [`database`](#database)
*   [`model`](#model)
*   [Network Configuration](#network-configuration)
    *   [Enabling IPv6](#enabling-ipv6)
*   [Base path](#base-path)
    *   [Set Base Path via HTTP Header](#set-base-path-via-http-header)
    *   [Set Base Path via Environment Variable](#set-base-path-via-environment-variable)
*   [Custom Dependencies](#custom-dependencies)
    *   [Custom ffmpeg build](#custom-ffmpeg-build)
    *   [Custom go2rtc version](#custom-go2rtc-version)
*   [Validating your config.yml file updates](#validating-your-configyml-file-updates)
    *   [Via API](#via-api)
    *   [Via Command Line](#via-command-line)

--- END OF FILE: configuration-audio_detectors.md ---
--- START OF FILE: configuration-audio_detectors.md ---

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

--- END OF FILE: configuration-authentication.md ---
--- START OF FILE: configuration-authentication.md ---

Source: https://docs.frigate.video/configuration/authentication

On this page

Frigate stores user information in its database. Password hashes are generated using industry standard PBKDF2-SHA256 with 600,000 iterations. Upon successful login, a JWT token is issued with an expiration date and set as a cookie. The cookie is refreshed as needed automatically. This JWT token can also be passed in the Authorization header as a bearer token.

Users are managed in the UI under Settings > Users.

The following ports are available to access the Frigate web UI.

Port

Description

`8971`

Authenticated UI and API. Reverse proxies should use this port.

`5000`

Internal unauthenticated UI and API access. Access to this port should be limited. Intended to be used within the docker network for services that integrate with Frigate and do not support authentication.

## Onboarding[​](#onboarding "Direct link to Onboarding")

On startup, an admin user and password are generated and printed in the logs. It is recommended to set a new password for the admin account after logging in for the first time under Settings > Users.

## Resetting admin password[​](#resetting-admin-password "Direct link to Resetting admin password")

In the event that you are locked out of your instance, you can tell Frigate to reset the admin password and print it in the logs on next startup using the `reset_admin_password` setting in your config file.

```
auth:  reset_admin_password: true
```

## Login failure rate limiting[​](#login-failure-rate-limiting "Direct link to Login failure rate limiting")

In order to limit the risk of brute force attacks, rate limiting is available for login failures. This is implemented with SlowApi, and the string notation for valid values is available in [the documentation](https://limits.readthedocs.io/en/stable/quickstart.html#examples).

For example, `1/second;5/minute;20/hour` will rate limit the login endpoint when failures occur more than:

*   1 time per second
*   5 times per minute
*   20 times per hour

Restarting Frigate will reset the rate limits.

If you are running Frigate behind a proxy, you will want to set `trusted_proxies` or these rate limits will apply to the upstream proxy IP address. This means that a brute force attack will rate limit login attempts from other devices and could temporarily lock you out of your instance. In order to ensure rate limits only apply to the actual IP address where the requests are coming from, you will need to list the upstream networks that you want to trust. These trusted proxies are checked against the `X-Forwarded-For` header when looking for the IP address where the request originated.

If you are running a reverse proxy in the same Docker Compose file as Frigate, here is an example of how your auth config might look:

```
auth:  failed_login_rate_limit: "1/second;5/minute;20/hour"  trusted_proxies:    - 172.18.0.0/16 # <---- this is the subnet for the internal Docker Compose network
```

## Session Length[​](#session-length "Direct link to Session Length")

The default session length for user authentication in Frigate is 24 hours. This setting determines how long a user's authenticated session remains active before a token refresh is required — otherwise, the user will need to log in again.

While the default provides a balance of security and convenience, you can customize this duration to suit your specific security requirements and user experience preferences. The session length is configured in seconds.

The default value of `86400` will expire the authentication session after 24 hours. Some other examples:

*   `0`: Setting the session length to 0 will require a user to log in every time they access the application or after a very short, immediate timeout.
*   `604800`: Setting the session length to 604800 will require a user to log in if the token is not refreshed for 7 days.

```
auth:  session_length: 86400
```

## JWT Token Secret[​](#jwt-token-secret "Direct link to JWT Token Secret")

The JWT token secret needs to be kept secure. Anyone with this secret can generate valid JWT tokens to authenticate with Frigate. This should be a cryptographically random string of at least 64 characters.

You can generate a token using the Python secret library with the following command:

```
python3 -c 'import secrets; print(secrets.token_hex(64))'
```

Frigate looks for a JWT token secret in the following order:

1.  An environment variable named `FRIGATE_JWT_SECRET`
2.  A docker secret named `FRIGATE_JWT_SECRET` in `/run/secrets/`
3.  A `jwt_secret` option from the Home Assistant Add-on options
4.  A `.jwt_secret` file in the config directory

If no secret is found on startup, Frigate generates one and stores it in a `.jwt_secret` file in the config directory.

Changing the secret will invalidate current tokens.

## Proxy configuration[​](#proxy-configuration "Direct link to Proxy configuration")

Frigate can be configured to leverage features of common upstream authentication proxies such as Authelia, Authentik, oauth2\_proxy, or traefik-forward-auth.

If you are leveraging the authentication of an upstream proxy, you likely want to disable Frigate's authentication as there is no correspondence between users in Frigate's database and users authenticated via the proxy. Optionally, if communication between the reverse proxy and Frigate is over an untrusted network, you should set an `auth_secret` in the `proxy` config and configure the proxy to send the secret value as a header named `X-Proxy-Secret`. Assuming this is an untrusted network, you will also want to [configure a real TLS certificate](/configuration/tls) to ensure the traffic can't simply be sniffed to steal the secret.

Here is an example of how to disable Frigate's authentication and also ensure the requests come only from your known proxy.

```
auth:  enabled: Falseproxy:  auth_secret: <some random long string>
```

You can use the following code to generate a random secret.

```
python3 -c 'import secrets; print(secrets.token_hex(64))'
```

### Header mapping[​](#header-mapping "Direct link to Header mapping")

If you have disabled Frigate's authentication and your proxy supports passing a header with authenticated usernames and/or roles, you can use the `header_map` config to specify the header name so it is passed to Frigate. For example, the following will map the `X-Forwarded-User` and `X-Forwarded-Groups` values. Header names are not case sensitive. Multiple values can be included in the role header. Frigate expects that the character separating the roles is a comma, but this can be specified using the `separator` config entry.

```
proxy:  ...  separator: "|" # This value defaults to a comma, but Authentik uses a pipe, for example.  header_map:    user: x-forwarded-user    role: x-forwarded-groups
```

Frigate supports both `admin` and `viewer` roles (see below). When using port `8971`, Frigate validates these headers and subsequent requests use the headers `remote-user` and `remote-role` for authorization.

A default role can be provided. Any value in the mapped `role` header will override the default.

```
proxy:  ...  default_role: viewer
```

#### Port Considerations[​](#port-considerations "Direct link to Port Considerations")

**Authenticated Port (8971)**

*   Header mapping is **fully supported**.
*   The `remote-role` header determines the user’s privileges:
    *   **admin** → Full access (user management, configuration changes).
    *   **viewer** → Read-only access.
*   Ensure your **proxy sends both user and role headers** for proper role enforcement.

**Unauthenticated Port (5000)**

*   Headers are **ignored** for role enforcement.
*   All requests are treated as **anonymous**.
*   The `remote-role` value is **overridden** to **admin-level access**.
*   This design ensures **unauthenticated internal use** within a trusted network.

Note that only the following list of headers are permitted by default:

```
Remote-UserRemote-GroupsRemote-EmailRemote-NameX-Forwarded-UserX-Forwarded-GroupsX-Forwarded-EmailX-Forwarded-Preferred-UsernameX-authentik-usernameX-authentik-groupsX-authentik-emailX-authentik-nameX-authentik-uid
```

If you would like to add more options, you can overwrite the default file with a docker bind mount at `/usr/local/nginx/conf/proxy_trusted_headers.conf`. Reference the source code for the default file formatting.

### Login page redirection[​](#login-page-redirection "Direct link to Login page redirection")

Frigate gracefully performs login page redirection that should work with most authentication proxies. If your reverse proxy returns a `Location` header on `401`, `302`, or `307` unauthorized responses, Frigate's frontend will automatically detect it and redirect to that URL.

### Custom logout url[​](#custom-logout-url "Direct link to Custom logout url")

If your reverse proxy has a dedicated logout url, you can specify using the `logout_url` config option. This will update the link for the `Logout` link in the UI.

## User Roles[​](#user-roles "Direct link to User Roles")

Frigate supports user roles to control access to certain features in the UI and API, such as managing users or modifying configuration settings. Roles are assigned to users in the database or through proxy headers and are enforced when accessing the UI or API through the authenticated port (`8971`).

### Supported Roles[​](#supported-roles "Direct link to Supported Roles")

*   **admin**: Full access to all features, including user management and configuration.
*   **viewer**: Read-only access to the UI and API, including viewing cameras, review items, and historical footage. Configuration editor and settings in the UI are inaccessible.

### Role Enforcement[​](#role-enforcement "Direct link to Role Enforcement")

When using the authenticated port (`8971`), roles are validated via the JWT token or proxy headers (e.g., `remote-role`).

On the internal **unauthenticated** port (`5000`), roles are **not enforced**. All requests are treated as **anonymous**, granting access equivalent to the **admin** role without restrictions.

To use role-based access control, you must connect to Frigate via the **authenticated port (`8971`)** directly or through a reverse proxy.

### Role Visibility in the UI[​](#role-visibility-in-the-ui "Direct link to Role Visibility in the UI")

*   When logged in via port `8971`, your **username and role** are displayed in the **account menu** (bottom corner).
*   When using port `5000`, the UI will always display "anonymous" for the username and "admin" for the role.

### Managing User Roles[​](#managing-user-roles "Direct link to Managing User Roles")

1.  Log in as an **admin** user via port `8971`.
2.  Navigate to **Settings > Users**.
3.  Edit a user’s role by selecting **admin** or **viewer**.

*   [Onboarding](#onboarding)
*   [Resetting admin password](#resetting-admin-password)
*   [Login failure rate limiting](#login-failure-rate-limiting)
*   [Session Length](#session-length)
*   [JWT Token Secret](#jwt-token-secret)
*   [Proxy configuration](#proxy-configuration)
    *   [Header mapping](#header-mapping)
    *   [Login page redirection](#login-page-redirection)
    *   [Custom logout url](#custom-logout-url)
*   [User Roles](#user-roles)
    *   [Supported Roles](#supported-roles)
    *   [Role Enforcement](#role-enforcement)
    *   [Role Visibility in the UI](#role-visibility-in-the-ui)
    *   [Managing User Roles](#managing-user-roles)

--- END OF FILE: configuration-autotracking.md ---
--- START OF FILE: configuration-autotracking.md ---

Source: https://docs.frigate.video/configuration/autotracking

On this page

An ONVIF-capable, PTZ (pan-tilt-zoom) camera that supports relative movement within the field of view (FOV) can be configured to automatically track moving objects and keep them in the center of the frame.

![Autotracking example with zooming](/assets/images/frigate-autotracking-example-f86a3f71dc0d0d86e3e7df59ef713648.gif)

## Autotracking behavior[​](#autotracking-behavior "Direct link to Autotracking behavior")

Once Frigate determines that an object is not a false positive and has entered one of the required zones, the autotracker will move the PTZ camera to keep the object centered in the frame until the object either moves out of the frame, the PTZ is not capable of any more movement, or Frigate loses track of it.

Upon loss of tracking, Frigate will scan the region of the lost object for `timeout` seconds. If an object of the same type is found in that region, Frigate will autotrack that new object.

When tracking has ended, Frigate will return to the camera firmware's PTZ preset specified by the `return_preset` configuration entry.

## Checking ONVIF camera support[​](#checking-onvif-camera-support "Direct link to Checking ONVIF camera support")

Frigate autotracking functions with PTZ cameras capable of relative movement within the field of view (as specified in the [ONVIF spec](https://www.onvif.org/specs/srv/ptz/ONVIF-PTZ-Service-Spec-v1712.pdf) as `RelativePanTiltTranslationSpace` having a `TranslationSpaceFov` entry).

Many cheaper or older PTZs may not support this standard. Frigate will report an error message in the log and disable autotracking if your PTZ is unsupported.

Alternatively, you can download and run [this simple Python script](https://gist.github.com/hawkeye217/152a1d4ba80760dac95d46e143d37112), replacing the details on line 4 with your camera's IP address, ONVIF port, username, and password to check your camera.

A growing list of cameras and brands that have been reported by users to work with Frigate's autotracking can be found [here](/configuration/cameras).

## Configuration[​](#configuration "Direct link to Configuration")

First, set up a PTZ preset in your camera's firmware and give it a name. If you're unsure how to do this, consult the documentation for your camera manufacturer's firmware. Some tutorials for common brands: [Amcrest](https://www.youtube.com/watch?v=lJlE9-krmrM), [Reolink](https://www.youtube.com/watch?v=VAnxHUY5i5w), [Dahua](https://www.youtube.com/watch?v=7sNbc5U-k54).

Edit your Frigate configuration file and enter the ONVIF parameters for your camera. Specify the object types to track, a required zone the object must enter to begin autotracking, and the camera preset name you configured in your camera's firmware to return to when tracking has ended. Optionally, specify a delay in seconds before Frigate returns the camera to the preset.

An [ONVIF connection](/configuration/cameras) is required for autotracking to function. Also, a [motion mask](/configuration/masks) over your camera's timestamp and any overlay text is recommended to ensure they are completely excluded from scene change calculations when the camera is moving.

Note that `autotracking` is disabled by default but can be enabled in the configuration or by MQTT.

```
cameras:  ptzcamera:    ...    onvif:      # Required: host of the camera being connected to.      # NOTE: HTTP is assumed by default; HTTPS is supported if you specify the scheme, ex: "https://0.0.0.0".      host: 0.0.0.0      # Optional: ONVIF port for device (default: shown below).      port: 8000      # Optional: username for login.      # NOTE: Some devices require admin to access ONVIF.      user: admin      # Optional: password for login.      password: admin      # Optional: Skip TLS verification from the ONVIF server (default: shown below)      tls_insecure: False      # Optional: PTZ camera object autotracking. Keeps a moving object in      # the center of the frame by automatically moving the PTZ camera.      autotracking:        # Optional: enable/disable object autotracking. (default: shown below)        enabled: False        # Optional: calibrate the camera on startup (default: shown below)        # A calibration will move the PTZ in increments and measure the time it takes to move.        # The results are used to help estimate the position of tracked objects after a camera move.        # Frigate will update your config file automatically after a calibration with        # a "movement_weights" entry for the camera. You should then set calibrate_on_startup to False.        calibrate_on_startup: False        # Optional: the mode to use for zooming in/out on objects during autotracking. (default: shown below)        # Available options are: disabled, absolute, and relative        #   disabled - don't zoom in/out on autotracked objects, use pan/tilt only        #   absolute - use absolute zooming (supported by most PTZ capable cameras)        #   relative - use relative zooming (not supported on all PTZs, but makes concurrent pan/tilt/zoom movements)        zooming: disabled        # Optional: A value to change the behavior of zooming on autotracked objects. (default: shown below)        # A lower value will keep more of the scene in view around a tracked object.        # A higher value will zoom in more on a tracked object, but Frigate may lose tracking more quickly.        # The value should be between 0.1 and 0.75        zoom_factor: 0.3        # Optional: list of objects to track from labelmap.txt (default: shown below)        track:          - person        # Required: Begin automatically tracking an object when it enters any of the listed zones.        required_zones:          - zone_name        # Required: Name of ONVIF preset in camera's firmware to return to when tracking is over. (default: shown below)        return_preset: home        # Optional: Seconds to delay before returning to preset. (default: shown below)        timeout: 10        # Optional: Values generated automatically by a camera calibration. Do not modify these manually. (default: shown below)        movement_weights: []
```

## Calibration[​](#calibration "Direct link to Calibration")

PTZ motors operate at different speeds. Performing a calibration will direct Frigate to measure this speed over a variety of movements and use those measurements to better predict the amount of movement necessary to keep autotracked objects in the center of the frame.

Calibration is optional, but will greatly assist Frigate in autotracking objects that move across the camera's field of view more quickly.

To begin calibration, set the `calibrate_on_startup` for your camera to `True` and restart Frigate. Frigate will then make a series of small and large movements with your camera. Don't move the PTZ manually while calibration is in progress. Once complete, camera motion will stop and your config file will be automatically updated with a `movement_weights` parameter to be used in movement calculations. You should not modify this parameter manually.

After calibration has ended, your PTZ will be moved to the preset specified by `return_preset`.

note

Frigate's web UI and all other cameras will be unresponsive while calibration is in progress. This is expected and normal to avoid excessive network traffic or CPU usage during calibration. Calibration for most PTZs will take about two minutes. The Frigate log will show calibration progress and any errors.

At this point, Frigate will be running and will continue to refine and update the `movement_weights` parameter in your config automatically as the PTZ moves during autotracking and more measurements are obtained.

Before restarting Frigate, you should set `calibrate_on_startup` in your config file to `False`, otherwise your refined `movement_weights` will be overwritten and calibration will occur when starting again.

You can recalibrate at any time by removing the `movement_weights` parameter, setting `calibrate_on_startup` to `True`, and then restarting Frigate. You may need to recalibrate or remove `movement_weights` from your config altogether if autotracking is erratic. If you change your `return_preset` in any way or if you change your camera's detect `fps` value, a recalibration is also recommended.

If you initially calibrate with zooming disabled and then enable zooming at a later point, you should also recalibrate.

## Best practices and considerations[​](#best-practices-and-considerations "Direct link to Best practices and considerations")

Every PTZ camera is different, so autotracking may not perform ideally in every situation. This experimental feature was initially developed using an EmpireTech/Dahua SD1A404XB-GNR.

The object tracker in Frigate estimates the motion of the PTZ so that tracked objects are preserved when the camera moves. In most cases 5 fps is sufficient, but if you plan to track faster moving objects, you may want to increase this slightly. Higher frame rates (> 10fps) will only slow down Frigate and the motion estimator and may lead to dropped frames, especially if you are using experimental zooming.

A fast [detector](/configuration/object_detectors) is recommended. CPU detectors will not perform well or won't work at all. You can watch Frigate's debug viewer for your camera to see a thicker colored box around the object currently being autotracked.

![Autotracking Debug View](/assets/images/autotracking-debug-6502b11759706f915d11c1d6116aad74.gif)

A full-frame zone in `required_zones` is not recommended, especially if you've calibrated your camera and there are `movement_weights` defined in the configuration file. Frigate will continue to autotrack an object that has entered one of the `required_zones`, even if it moves outside of that zone.

Some users have found it helpful to adjust the zone `inertia` value. See the [configuration reference](/configuration/).

## Zooming[​](#zooming "Direct link to Zooming")

Zooming is a very experimental feature and may use significantly more CPU when tracking objects than panning/tilting only.

Absolute zooming makes zoom movements separate from pan/tilt movements. Most PTZ cameras will support absolute zooming. Absolute zooming was developed to be very conservative to work best with a variety of cameras and scenes. Absolute zooming usually will not occur until an object has stopped moving or is moving very slowly.

Relative zooming attempts to make a zoom movement concurrently with any pan/tilt movements. It was tested to work with some Dahua and Amcrest PTZs. But the ONVIF specification indicates that there no assumption about how the generic zoom range is mapped to magnification, field of view or other physical zoom dimension when using relative zooming. So if relative zooming behavior is erratic or just doesn't work, try absolute zooming.

You can optionally adjust the `zoom_factor` for your camera in your configuration file. Lower values will leave more space from the scene around the tracked object while higher values will cause your camera to zoom in more on the object. However, keep in mind that Frigate needs a fair amount of pixels and scene details outside of the bounding box of the tracked object to estimate the motion of your camera. If the object is taking up too much of the frame, Frigate will not be able to track the motion of the camera and your object will be lost.

The range of this option is from 0.1 to 0.75. The default value of 0.3 is conservative and should be sufficient for most users. Because every PTZ and scene is different, you should experiment to determine what works best for you.

## Usage applications[​](#usage-applications "Direct link to Usage applications")

In security and surveillance, it's common to use "spotter" cameras in combination with your PTZ. When your fixed spotter camera detects an object, you could use an automation platform like Home Assistant to move the PTZ to a specific preset so that Frigate can begin automatically tracking the object. For example: a residence may have fixed cameras on the east and west side of the property, capturing views up and down a street. When the spotter camera on the west side detects a person, a Home Assistant automation could move the PTZ to a camera preset aimed toward the west. When the object enters the specified zone, Frigate's autotracker could then continue to track the person as it moves out of view of any of the fixed cameras.

## Troubleshooting and FAQ[​](#troubleshooting-and-faq "Direct link to Troubleshooting and FAQ")

### The autotracker loses track of my object. Why?[​](#the-autotracker-loses-track-of-my-object-why "Direct link to The autotracker loses track of my object. Why?")

There are many reasons this could be the case. If you are using experimental zooming, your `zoom_factor` value might be too high, the object might be traveling too quickly, the scene might be too dark, there are not enough details in the scene (for example, a PTZ looking down on a driveway or other monotone background without a sufficient number of hard edges or corners), or the scene is otherwise less than optimal for Frigate to maintain tracking.

Your camera's shutter speed may also be set too low so that blurring occurs with motion. Check your camera's firmware to see if you can increase the shutter speed.

Watching Frigate's debug view can help to determine a possible cause. The autotracked object will have a thicker colored box around it.

### I'm seeing an error in the logs that my camera "is still in ONVIF 'MOVING' status." What does this mean?[​](#im-seeing-an-error-in-the-logs-that-my-camera-is-still-in-onvif-moving-status-what-does-this-mean "Direct link to I'm seeing an error in the logs that my camera \"is still in ONVIF 'MOVING' status.\" What does this mean?")

There are two possible known reasons for this (and perhaps others yet unknown): a slow PTZ motor or buggy camera firmware. Frigate uses an ONVIF parameter provided by the camera, `MoveStatus`, to determine when the PTZ's motor is moving or idle. According to some users, Hikvision PTZs (even with the latest firmware), are not updating this value after PTZ movement. Unfortunately there is no workaround to this bug in Hikvision firmware, so autotracking will not function correctly and should be disabled in your config. This may also be the case with other non-Hikvision cameras utilizing Hikvision firmware.

### I tried calibrating my camera, but the logs show that it is stuck at 0% and Frigate is not starting up.[​](#i-tried-calibrating-my-camera-but-the-logs-show-that-it-is-stuck-at-0-and-frigate-is-not-starting-up "Direct link to I tried calibrating my camera, but the logs show that it is stuck at 0% and Frigate is not starting up.")

This is often caused by the same reason as above - the `MoveStatus` ONVIF parameter is not changing due to a bug in your camera's firmware. Also, see the note above: Frigate's web UI and all other cameras will be unresponsive while calibration is in progress. This is expected and normal. But if you don't see log entries every few seconds for calibration progress, your camera is not compatible with autotracking.

### I'm seeing this error in the logs: "Autotracker: motion estimator couldn't get transformations". What does this mean?[​](#im-seeing-this-error-in-the-logs-autotracker-motion-estimator-couldnt-get-transformations-what-does-this-mean "Direct link to I'm seeing this error in the logs: \"Autotracker: motion estimator couldn't get transformations\". What does this mean?")

To maintain object tracking during PTZ moves, Frigate tracks the motion of your camera based on the details of the frame. If you are seeing this message, it could mean that your `zoom_factor` may be set too high, the scene around your detected object does not have enough details (like hard edges or color variations), or your camera's shutter speed is too slow and motion blur is occurring. Try reducing `zoom_factor`, finding a way to alter the scene around your object, or changing your camera's shutter speed.

### Calibration seems to have completed, but the camera is not actually moving to track my object. Why?[​](#calibration-seems-to-have-completed-but-the-camera-is-not-actually-moving-to-track-my-object-why "Direct link to Calibration seems to have completed, but the camera is not actually moving to track my object. Why?")

Some cameras have firmware that reports that FOV RelativeMove, the ONVIF command that Frigate uses for autotracking, is supported. However, if the camera does not pan or tilt when an object comes into the required zone, your camera's firmware does not actually support FOV RelativeMove. One such camera is the Uniview IPC672LR-AX4DUPK. It actually moves its zoom motor instead of panning and tilting and does not follow the ONVIF standard whatsoever.

### Frigate reports an error saying that calibration has failed. Why?[​](#frigate-reports-an-error-saying-that-calibration-has-failed-why "Direct link to Frigate reports an error saying that calibration has failed. Why?")

Calibration measures the amount of time it takes for Frigate to make a series of movements with your PTZ. This error message is recorded in the log if these values are too high for Frigate to support calibrated autotracking. This is often the case when your camera's motor or network connection is too slow or your camera's firmware doesn't report the motor status in a timely manner. You can try running without calibration (just remove the `movement_weights` line from your config and restart), but if calibration fails, this often means that autotracking will behave unpredictably.

*   [Autotracking behavior](#autotracking-behavior)
*   [Checking ONVIF camera support](#checking-onvif-camera-support)
*   [Configuration](#configuration)
*   [Calibration](#calibration)
*   [Best practices and considerations](#best-practices-and-considerations)
*   [Zooming](#zooming)
*   [Usage applications](#usage-applications)
*   [Troubleshooting and FAQ](#troubleshooting-and-faq)
    *   [The autotracker loses track of my object. Why?](#the-autotracker-loses-track-of-my-object-why)
    *   [I'm seeing an error in the logs that my camera "is still in ONVIF 'MOVING' status." What does this mean?](#im-seeing-an-error-in-the-logs-that-my-camera-is-still-in-onvif-moving-status-what-does-this-mean)
    *   [I tried calibrating my camera, but the logs show that it is stuck at 0% and Frigate is not starting up.](#i-tried-calibrating-my-camera-but-the-logs-show-that-it-is-stuck-at-0-and-frigate-is-not-starting-up)
    *   [I'm seeing this error in the logs: "Autotracker: motion estimator couldn't get transformations". What does this mean?](#im-seeing-this-error-in-the-logs-autotracker-motion-estimator-couldnt-get-transformations-what-does-this-mean)
    *   [Calibration seems to have completed, but the camera is not actually moving to track my object. Why?](#calibration-seems-to-have-completed-but-the-camera-is-not-actually-moving-to-track-my-object-why)
    *   [Frigate reports an error saying that calibration has failed. Why?](#frigate-reports-an-error-saying-that-calibration-has-failed-why)

--- END OF FILE: configuration-bird_classification.md ---
--- START OF FILE: configuration-bird_classification.md ---

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

--- END OF FILE: configuration-birdseye.md ---
--- START OF FILE: configuration-birdseye.md ---

Source: https://docs.frigate.video/configuration/birdseye

On this page

In addition to Frigate's Live camera dashboard, Birdseye allows a portable heads-up view of your cameras to see what is going on around your property / space without having to watch all cameras that may have nothing happening. Birdseye allows specific modes that intelligently show and disappear based on what you care about.

Birdseye can be viewed by adding the "Birdseye" camera to a Camera Group in the Web UI. Add a Camera Group by pressing the "+" icon on the Live page, and choose "Birdseye" as one of the cameras.

Birdseye can also be used in Home Assistant dashboards, cast to media devices, etc.

## Birdseye Behavior[​](#birdseye-behavior "Direct link to Birdseye Behavior")

### Birdseye Modes[​](#birdseye-modes "Direct link to Birdseye Modes")

Birdseye offers different modes to customize which cameras show under which circumstances.

*   **continuous:** All cameras are always included
*   **motion:** Cameras that have detected motion within the last 30 seconds are included
*   **objects:** Cameras that have tracked an active object within the last 30 seconds are included

### Custom Birdseye Icon[​](#custom-birdseye-icon "Direct link to Custom Birdseye Icon")

A custom icon can be added to the birdseye background by providing a 180x180 image named `custom.png` inside of the Frigate `media` folder. The file must be a png with the icon as transparent, any non-transparent pixels will be white when displayed in the birdseye view.

### Birdseye view override at camera level[​](#birdseye-view-override-at-camera-level "Direct link to Birdseye view override at camera level")

If you want to include a camera in Birdseye view only for specific circumstances, or just don't include it at all, the Birdseye setting can be set at the camera level.

```
# Include all cameras by default in Birdseye viewbirdseye:  enabled: True  mode: continuouscameras:  front:    # Only include the "front" camera in Birdseye view when objects are detected    birdseye:      mode: objects  back:    # Exclude the "back" camera from Birdseye view    birdseye:      enabled: False
```

### Birdseye Inactivity[​](#birdseye-inactivity "Direct link to Birdseye Inactivity")

By default birdseye shows all cameras that have had the configured activity in the last 30 seconds, this can be configured:

```
birdseye:  enabled: True  inactivity_threshold: 15
```

## Birdseye Layout[​](#birdseye-layout "Direct link to Birdseye Layout")

### Birdseye Dimensions[​](#birdseye-dimensions "Direct link to Birdseye Dimensions")

The resolution and aspect ratio of birdseye can be configured. Resolution will increase the quality but does not affect the layout. Changing the aspect ratio of birdseye does affect how cameras are laid out.

```
birdseye:  enabled: True  width: 1280  height: 720
```

### Sorting cameras in the Birdseye view[​](#sorting-cameras-in-the-birdseye-view "Direct link to Sorting cameras in the Birdseye view")

It is possible to override the order of cameras that are being shown in the Birdseye view. The order needs to be set at the camera level.

```
# Include all cameras by default in Birdseye viewbirdseye:  enabled: True  mode: continuouscameras:  front:    birdseye:      order: 1  back:    birdseye:      order: 2
```

_Note_: Cameras are sorted by default using their name to ensure a constant view inside Birdseye.

### Birdseye Cameras[​](#birdseye-cameras "Direct link to Birdseye Cameras")

It is possible to limit the number of cameras shown on birdseye at one time. When this is enabled, birdseye will show the cameras with most recent activity. There is a cooldown to ensure that cameras do not switch too frequently.

For example, this can be configured to only show the most recently active camera.

```
birdseye:  enabled: True  layout:    max_cameras: 1
```

### Birdseye Scaling[​](#birdseye-scaling "Direct link to Birdseye Scaling")

By default birdseye tries to fit 2 cameras in each row and then double in size until a suitable layout is found. The scaling can be configured with a value between 1.0 and 5.0 depending on use case.

```
birdseye:  enabled: True  layout:    scaling_factor: 3.0
```

*   [Birdseye Behavior](#birdseye-behavior)
    *   [Birdseye Modes](#birdseye-modes)
    *   [Custom Birdseye Icon](#custom-birdseye-icon)
    *   [Birdseye view override at camera level](#birdseye-view-override-at-camera-level)
    *   [Birdseye Inactivity](#birdseye-inactivity)
*   [Birdseye Layout](#birdseye-layout)
    *   [Birdseye Dimensions](#birdseye-dimensions)
    *   [Sorting cameras in the Birdseye view](#sorting-cameras-in-the-birdseye-view)
    *   [Birdseye Cameras](#birdseye-cameras)
    *   [Birdseye Scaling](#birdseye-scaling)

--- END OF FILE: configuration-camera_specific.md ---
--- START OF FILE: configuration-camera_specific.md ---

Source: https://docs.frigate.video/configuration/camera_specific

On this page

note

This page makes use of presets of FFmpeg args. For more information on presets, see the [FFmpeg Presets](/configuration/ffmpeg_presets) page.

note

Many cameras support encoding options which greatly affect the live view experience, see the [Live view](/configuration/live) page for more info.

## H.265 Cameras via Safari[​](#h265-cameras-via-safari "Direct link to H.265 Cameras via Safari")

Some cameras support h265 with different formats, but Safari only supports the annexb format. When using h265 camera streams for recording with devices that use the Safari browser, the `apple_compatibility` option should be used.

```
cameras:  h265_cam: # <------ Doesn't matter what the camera is called    ffmpeg:      apple_compatibility: true # <- Adds compatibility with MacOS and iPhone
```

## MJPEG Cameras[​](#mjpeg-cameras "Direct link to MJPEG Cameras")

Note that mjpeg cameras require encoding the video into h264 for recording, and restream roles. This will use significantly more CPU than if the cameras supported h264 feeds directly. It is recommended to use the restream role to create an h264 restream and then use that as the source for ffmpeg.

```
go2rtc:  streams:    mjpeg_cam: "ffmpeg:http://your_mjpeg_stream_url#video=h264#hardware" # <- use hardware acceleration to create an h264 stream usable for other components.cameras:  ...  mjpeg_cam:    ffmpeg:      inputs:        - path: rtsp://127.0.0.1:8554/mjpeg_cam          roles:            - detect            - record
```

## JPEG Stream Cameras[​](#jpeg-stream-cameras "Direct link to JPEG Stream Cameras")

Cameras using a live changing jpeg image will need input parameters as below

```
input_args: preset-http-jpeg-generic
```

Outputting the stream will have the same args and caveats as per [MJPEG Cameras](#mjpeg-cameras)

## RTMP Cameras[​](#rtmp-cameras "Direct link to RTMP Cameras")

The input parameters need to be adjusted for RTMP cameras

```
ffmpeg:  input_args: preset-rtmp-generic
```

## UDP Only Cameras[​](#udp-only-cameras "Direct link to UDP Only Cameras")

If your cameras do not support TCP connections for RTSP, you can use UDP.

```
ffmpeg:  input_args: preset-rtsp-udp
```

## Model/vendor specific setup[​](#modelvendor-specific-setup "Direct link to Model/vendor specific setup")

### Amcrest & Dahua[​](#amcrest--dahua "Direct link to Amcrest & Dahua")

Amcrest & Dahua cameras should be connected to via RTSP using the following format:

```
rtsp://USERNAME:PASSWORD@CAMERA-IP/cam/realmonitor?channel=1&subtype=0 # this is the main streamrtsp://USERNAME:PASSWORD@CAMERA-IP/cam/realmonitor?channel=1&subtype=1 # this is the sub stream, typically supporting low resolutions onlyrtsp://USERNAME:PASSWORD@CAMERA-IP/cam/realmonitor?channel=1&subtype=2 # higher end cameras support a third stream with a mid resolution (1280x720, 1920x1080)rtsp://USERNAME:PASSWORD@CAMERA-IP/cam/realmonitor?channel=1&subtype=3 # new higher end cameras support a fourth stream with another mid resolution (1280x720, 1920x1080)
```

### Annke C800[​](#annke-c800 "Direct link to Annke C800")

This camera is H.265 only. To be able to play clips on some devices (like MacOs or iPhone) the H.265 stream has to be adjusted using the `apple_compatibility` config.

```
cameras:  annkec800: # <------ Name the camera    ffmpeg:      apple_compatibility: true # <- Adds compatibility with MacOS and iPhone      output_args:        record: preset-record-generic-audio-aac      inputs:        - path: rtsp://USERNAME:PASSWORD@CAMERA-IP/H264/ch1/main/av_stream # <----- Update for your camera          roles:            - detect            - record    detect:      width: # <- optional, by default Frigate tries to automatically detect resolution      height: # <- optional, by default Frigate tries to automatically detect resolution
```

### Blue Iris RTSP Cameras[​](#blue-iris-rtsp-cameras "Direct link to Blue Iris RTSP Cameras")

You will need to remove `nobuffer` flag for Blue Iris RTSP cameras

```
ffmpeg:  input_args: preset-rtsp-blue-iris
```

### Hikvision Cameras[​](#hikvision-cameras "Direct link to Hikvision Cameras")

Hikvision cameras should be connected to via RTSP using the following format:

```
rtsp://USERNAME:PASSWORD@CAMERA-IP/streaming/channels/101 # this is the main streamrtsp://USERNAME:PASSWORD@CAMERA-IP/streaming/channels/102 # this is the sub stream, typically supporting low resolutions onlyrtsp://USERNAME:PASSWORD@CAMERA-IP/streaming/channels/103 # higher end cameras support a third stream with a mid resolution (1280x720, 1920x1080)
```

note

[Some users have reported](https://www.reddit.com/r/frigate_nvr/comments/1hg4ze7/hikvision_security_settings) that newer Hikvision cameras require adjustments to the security settings:

```
RTSP Authentication - digest/basicRTSP Digest Algorithm - MD5WEB Authentication - digest/basicWEB Digest Algorithm  - MD5
```

### Reolink Cameras[​](#reolink-cameras "Direct link to Reolink Cameras")

Reolink has many different camera models with inconsistently supported features and behavior. The below table shows a summary of various features and recommendations.

Camera Resolution

Camera Generation

Recommended Stream Type

Additional Notes

5MP or lower

All

http-flv

Stream is h264

6MP or higher

Latest (ex: Duo3, CX-8##)

http-flv with ffmpeg 8.0, or rtsp

This uses the new http-flv-enhanced over H265 which requires ffmpeg 8.0

6MP or higher

Older (ex: RLC-8##)

rtsp

Frigate works much better with newer reolink cameras that are setup with the below options:

If available, recommended settings are:

*   `On, fluency first` this sets the camera to CBR (constant bit rate)
*   `Interframe Space 1x` this sets the iframe interval to the same as the frame rate

According to [this discussion](https://github.com/blakeblackshear/frigate/issues/3235#issuecomment-1135876973), the http video streams seem to be the most reliable for Reolink.

Cameras connected via a Reolink NVR can be connected with the http stream, use `channel[0..15]` in the stream url for the additional channels. The setup of main stream can be also done via RTSP, but isn't always reliable on all hardware versions. The example configuration is working with the oldest HW version RLN16-410 device with multiple types of cameras.

Example Config

tip

Reolink's latest cameras support two way audio via go2rtc and other applications. It is important that the http-flv stream is still used for stability, a secondary rtsp stream can be added that will be using for the two way audio only.

NOTE: The RTSP stream can not be prefixed with `ffmpeg:`, as go2rtc needs to handle the stream to support two way audio.

Ensure HTTP is enabled in the camera's advanced network settings. To use two way talk with Frigate, see the [Live view documentation](/configuration/live#two-way-talk).

```
go2rtc:  streams:    # example for connecting to a standard Reolink camera    your_reolink_camera:      - "ffmpeg:http://reolink_ip/flv?port=1935&app=bcs&stream=channel0_main.bcs&user=username&password=password#video=copy#audio=copy#audio=opus"    your_reolink_camera_sub:      - "ffmpeg:http://reolink_ip/flv?port=1935&app=bcs&stream=channel0_ext.bcs&user=username&password=password"    # example for connectin to a Reolink camera that supports two way talk    your_reolink_camera_twt:      - "ffmpeg:http://reolink_ip/flv?port=1935&app=bcs&stream=channel0_main.bcs&user=username&password=password#video=copy#audio=copy#audio=opus"      - "rtsp://username:password@reolink_ip/Preview_01_sub"    your_reolink_camera_twt_sub:      - "ffmpeg:http://reolink_ip/flv?port=1935&app=bcs&stream=channel0_ext.bcs&user=username&password=password"      - "rtsp://username:password@reolink_ip/Preview_01_sub"    # example for connecting to a Reolink NVR    your_reolink_camera_via_nvr:      - "ffmpeg:http://reolink_nvr_ip/flv?port=1935&app=bcs&stream=channel3_main.bcs&user=username&password=password" # channel numbers are 0-15      - "ffmpeg:your_reolink_camera_via_nvr#audio=aac"    your_reolink_camera_via_nvr_sub:      - "ffmpeg:http://reolink_nvr_ip/flv?port=1935&app=bcs&stream=channel3_ext.bcs&user=username&password=password"cameras:  your_reolink_camera:    ffmpeg:      inputs:        - path: rtsp://127.0.0.1:8554/your_reolink_camera          input_args: preset-rtsp-restream          roles:            - record        - path: rtsp://127.0.0.1:8554/your_reolink_camera_sub          input_args: preset-rtsp-restream          roles:            - detect  reolink_via_nvr:    ffmpeg:      inputs:        - path: rtsp://127.0.0.1:8554/your_reolink_camera_via_nvr?video=copy&audio=aac          input_args: preset-rtsp-restream          roles:            - record        - path: rtsp://127.0.0.1:8554/your_reolink_camera_via_nvr_sub?video=copy          input_args: preset-rtsp-restream          roles:            - detect
```

### Unifi Protect Cameras[​](#unifi-protect-cameras "Direct link to Unifi Protect Cameras")

note

Unifi G5s cameras and newer need a Unifi Protect server to enable rtsps stream, it's not posible to enable it in standalone mode.

Unifi protect cameras require the rtspx stream to be used with go2rtc. To utilize a Unifi protect camera, modify the rtsps link to begin with rtspx. Additionally, remove the "?enableSrtp" from the end of the Unifi link.

```
go2rtc:  streams:    front:      - rtspx://192.168.1.1:7441/abcdefghijk
```

[See the go2rtc docs for more information](https://github.com/AlexxIT/go2rtc/tree/v1.9.9#source-rtsp)

In the Unifi 2.0 update Unifi Protect Cameras had a change in audio sample rate which causes issues for ffmpeg. The input rate needs to be set for record if used directly with unifi protect.

```
ffmpeg:  output_args:    record: preset-record-ubiquiti
```

### TP-Link VIGI Cameras[​](#tp-link-vigi-cameras "Direct link to TP-Link VIGI Cameras")

TP-Link VIGI cameras need some adjustments to the main stream settings on the camera itself to avoid issues. The stream needs to be configured as `H264` with `Smart Coding` set to `off`. Without these settings you may have problems when trying to watch recorded footage. For example Firefox will stop playback after a few seconds and show the following error message: `The media playback was aborted due to a corruption problem or because the media used features your browser did not support.`.

### Wyze Wireless Cameras[​](#wyze-wireless-cameras "Direct link to Wyze Wireless Cameras")

Some community members have found better performance on Wyze cameras by using an alternative firmware known as [Thingino](https://thingino.com/).

## USB Cameras (aka Webcams)[​](#usb-cameras-aka-webcams "Direct link to USB Cameras (aka Webcams)")

To use a USB camera (webcam) with Frigate, the recommendation is to use go2rtc's [FFmpeg Device](https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#source-ffmpeg-device) support:

*   Preparation outside of Frigate:
    
    *   Get USB camera path. Run `v4l2-ctl --list-devices` to get a listing of locally-connected cameras available. (You may need to install `v4l-utils` in a way appropriate for your Linux distribution). In the sample configuration below, we use `video=0` to correlate with a detected device path of `/dev/video0`
    *   Get USB camera formats & resolutions. Run `ffmpeg -f v4l2 -list_formats all -i /dev/video0` to get an idea of what formats and resolutions the USB Camera supports. In the sample configuration below, we use a width of 1024 and height of 576 in the stream and detection settings based on what was reported back.
    *   If using Frigate in a container (e.g. Docker on TrueNAS), ensure you have USB Passthrough support enabled, along with a specific Host Device (`/dev/video0`) + Container Device (`/dev/video0`) listed.
*   In your Frigate Configuration File, add the go2rtc stream and roles as appropriate:
    

```
go2rtc:  streams:    usb_camera:      - "ffmpeg:device?video=0&video_size=1024x576#video=h264"cameras:  usb_camera:    enabled: true    ffmpeg:      inputs:        - path: rtsp://127.0.0.1:8554/usb_camera          input_args: preset-rtsp-restream          roles:            - detect            - record    detect:      enabled: false # <---- disable detection until you have a working camera feed      width: 1024      height: 576
```

*   [H.265 Cameras via Safari](#h265-cameras-via-safari)
*   [MJPEG Cameras](#mjpeg-cameras)
*   [JPEG Stream Cameras](#jpeg-stream-cameras)
*   [RTMP Cameras](#rtmp-cameras)
*   [UDP Only Cameras](#udp-only-cameras)
*   [Model/vendor specific setup](#modelvendor-specific-setup)
    *   [Amcrest & Dahua](#amcrest--dahua)
    *   [Annke C800](#annke-c800)
    *   [Blue Iris RTSP Cameras](#blue-iris-rtsp-cameras)
    *   [Hikvision Cameras](#hikvision-cameras)
    *   [Reolink Cameras](#reolink-cameras)
    *   [Unifi Protect Cameras](#unifi-protect-cameras)
    *   [TP-Link VIGI Cameras](#tp-link-vigi-cameras)
    *   [Wyze Wireless Cameras](#wyze-wireless-cameras)
*   [USB Cameras (aka Webcams)](#usb-cameras-aka-webcams)

--- END OF FILE: configuration-cameras.md ---
--- START OF FILE: configuration-cameras.md ---

Source: https://docs.frigate.video/configuration/cameras

On this page

## Setting Up Camera Inputs[​](#setting-up-camera-inputs "Direct link to Setting Up Camera Inputs")

Several inputs can be configured for each camera and the role of each input can be mixed and matched based on your needs. This allows you to use a lower resolution stream for object detection, but create recordings from a higher resolution stream, or vice versa.

A camera is enabled by default but can be disabled by using `enabled: False`. Cameras that are disabled through the configuration file will not appear in the Frigate UI and will not consume system resources.

Each role can only be assigned to one input per camera. The options for roles are as follows:

Role

Description

`detect`

Main feed for object detection. [docs](/configuration/object_detectors)

`record`

Saves segments of the video feed based on configuration settings. [docs](/configuration/record)

`audio`

Feed for audio based detection. [docs](/configuration/audio_detectors)

```
mqtt:  host: mqtt.server.comcameras:  back:    enabled: True    ffmpeg:      inputs:        - path: rtsp://viewer:{FRIGATE_RTSP_PASSWORD}@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2          roles:            - detect        - path: rtsp://viewer:{FRIGATE_RTSP_PASSWORD}@10.0.10.10:554/live          roles:            - record    detect:      width: 1280 # <- optional, by default Frigate tries to automatically detect resolution      height: 720 # <- optional, by default Frigate tries to automatically detect resolution
```

Additional cameras are simply added to the config under the `cameras` entry.

```
mqtt: ...cameras:  back: ...  front: ...  side: ...
```

note

If you only define one stream in your `inputs` and do not assign a `detect` role to it, Frigate will automatically assign it the `detect` role. Frigate will always decode a stream to support motion detection, Birdseye, the API image endpoints, and other features, even if you have disabled object detection with `enabled: False` in your config's `detect` section.

If you plan to use Frigate for recording only, it is still recommended to define a `detect` role for a low resolution stream to minimize resource usage from the required stream decoding.

For camera model specific settings check the [camera specific](/configuration/camera_specific) infos.

## Setting up camera PTZ controls[​](#setting-up-camera-ptz-controls "Direct link to Setting up camera PTZ controls")

warning

Not every PTZ supports ONVIF, which is the standard protocol Frigate uses to communicate with your camera. Check the [official list of ONVIF conformant products](https://www.onvif.org/conformant-products/), your camera documentation, or camera manufacturer's website to ensure your PTZ supports ONVIF. Also, ensure your camera is running the latest firmware.

Add the onvif section to your camera in your configuration file:

```
cameras:  back:    ffmpeg: ...    onvif:      host: 10.0.10.10      port: 8000      user: admin      password: password
```

If the ONVIF connection is successful, PTZ controls will be available in the camera's WebUI.

tip

If your ONVIF camera does not require authentication credentials, you may still need to specify an empty string for `user` and `password`, eg: `user: ""` and `password: ""`.

An ONVIF-capable camera that supports relative movement within the field of view (FOV) can also be configured to automatically track moving objects and keep them in the center of the frame. For autotracking setup, see the [autotracking](/configuration/autotracking) docs.

## ONVIF PTZ camera recommendations[​](#onvif-ptz-camera-recommendations "Direct link to ONVIF PTZ camera recommendations")

This list of working and non-working PTZ cameras is based on user feedback.

Brand or specific camera

PTZ Controls

Autotracking

Notes

Amcrest

✅

✅

⛔️ Generally, Amcrest should work, but some older models (like the common IP2M-841) don't support autotracking

Amcrest ASH21

✅

❌

ONVIF service port: 80

Amcrest IP4M-S2112EW-AI

✅

❌

FOV relative movement not supported.

Amcrest IP5M-1190EW

✅

❌

ONVIF Port: 80. FOV relative movement not supported.

Annke CZ504

✅

✅

Annke support provide specific firmware ([V5.7.1 build 250227](https://github.com/pierrepinon/annke_cz504/raw/refs/heads/main/digicap_V5-7-1_build_250227.dav)) to fix issue with ONVIF "TranslationSpaceFov"

Axis Q-6155E

✅

❌

ONVIF service port: 80; Camera does not support MoveStatus.

Ctronics PTZ

✅

❌

Dahua

✅

✅

Some low-end Dahuas (lite series, among others) have been reported to not support autotracking

Dahua DH-SD2A500HB

✅

❌

Dahua DH-SD49825GB-HNR

✅

✅

Dahua DH-P5AE-PV

❌

❌

Foscam R5

✅

❌

Hanwha XNP-6550RH

✅

❌

Hikvision

✅

❌

Incomplete ONVIF support (MoveStatus won't update even on latest firmware) - reported with HWP-N4215IH-DE and DS-2DE3304W-DE, but likely others

Hikvision DS-2DE3A404IWG-E/W

✅

✅

Reolink

✅

❌

Speco O8P32X

✅

❌

Sunba 405-D20X

✅

❌

Incomplete ONVIF support reported on original, and 4k models. All models are suspected incompatable.

Tapo

✅

❌

Many models supported, ONVIF Service Port: 2020

Uniview IPC672LR-AX4DUPK

✅

❌

Firmware says FOV relative movement is supported, but camera doesn't actually move when sending ONVIF commands

Uniview IPC6612SR-X33-VG

✅

✅

Leave `calibrate_on_startup` as `False`. A user has reported that zooming with `absolute` is working.

Vikylin PTZ-2804X-I2

❌

❌

Incomplete ONVIF support

## Setting up camera groups[​](#setting-up-camera-groups "Direct link to Setting up camera groups")

tip

It is recommended to set up camera groups using the UI.

Cameras can be grouped together and assigned a name and icon, this allows them to be reviewed and filtered together. There will always be the default group for all cameras.

```
camera_groups:  front:    cameras:      - driveway_cam      - garage_cam    icon: LuCar    order: 0
```

*   [Setting Up Camera Inputs](#setting-up-camera-inputs)
*   [Setting up camera PTZ controls](#setting-up-camera-ptz-controls)
*   [ONVIF PTZ camera recommendations](#onvif-ptz-camera-recommendations)
*   [Setting up camera groups](#setting-up-camera-groups)

--- END OF FILE: configuration-face_recognition.md ---
--- START OF FILE: configuration-face_recognition.md ---

Source: https://docs.frigate.video/configuration/face_recognition

On this page

Face recognition identifies known individuals by matching detected faces with previously learned facial data. When a known `person` is recognized, their name will be added as a `sub_label`. This information is included in the UI, filters, as well as in notifications.

## Model Requirements[​](#model-requirements "Direct link to Model Requirements")

### Face Detection[​](#face-detection "Direct link to Face Detection")

When running a Frigate+ model (or any custom model that natively detects faces) should ensure that `face` is added to the [list of objects to track](/configuration/plus/#available-label-types) either globally or for a specific camera. This will allow face detection to run at the same time as object detection and be more efficient.

When running a default COCO model or another model that does not include `face` as a detectable label, face detection will run via CV2 using a lightweight DNN model that runs on the CPU. In this case, you should _not_ define `face` in your list of objects to track.

note

Frigate needs to first detect a `person` before it can detect and recognize a face.

### Face Recognition[​](#face-recognition "Direct link to Face Recognition")

Frigate has support for two face recognition model types:

*   **small**: Frigate will run a FaceNet embedding model to recognize faces, which runs locally on the CPU. This model is optimized for efficiency and is not as accurate.
*   **large**: Frigate will run a large ArcFace embedding model that is optimized for accuracy. It is only recommended to be run when an integrated or dedicated GPU is available.

In both cases, a lightweight face landmark detection model is also used to align faces before running recognition.

All of these features run locally on your system.

## Minimum System Requirements[​](#minimum-system-requirements "Direct link to Minimum System Requirements")

The `small` model is optimized for efficiency and runs on the CPU, most CPUs should run the model efficiently.

The `large` model is optimized for accuracy, an integrated or discrete GPU is required. See the [Hardware Accelerated Enrichments](/configuration/hardware_acceleration_enrichments) documentation.

## Configuration[​](#configuration "Direct link to Configuration")

Face recognition is disabled by default, face recognition must be enabled in the UI or in your config file before it can be used. Face recognition is a global configuration setting.

```
face_recognition:  enabled: true
```

Like the other real-time processors in Frigate, face recognition runs on the camera stream defined by the `detect` role in your config. To ensure optimal performance, select a suitable resolution for this stream in your camera's firmware that fits your specific scene and requirements.

## Advanced Configuration[​](#advanced-configuration "Direct link to Advanced Configuration")

Fine-tune face recognition with these optional parameters at the global level of your config. The only optional parameters that can be set at the camera level are `enabled` and `min_area`.

### Detection[​](#detection "Direct link to Detection")

*   `detection_threshold`: Face detection confidence score required before recognition runs:
    *   Default: `0.7`
    *   Note: This is field only applies to the standalone face detection model, `min_score` should be used to filter for models that have face detection built in.
*   `min_area`: Defines the minimum size (in pixels) a face must be before recognition runs.
    *   Default: `500` pixels.
    *   Depending on the resolution of your camera's `detect` stream, you can increase this value to ignore small or distant faces.

### Recognition[​](#recognition "Direct link to Recognition")

*   `model_size`: Which model size to use, options are `small` or `large`
*   `unknown_score`: Min score to mark a person as a potential match, matches at or below this will be marked as unknown.
    *   Default: `0.8`.
*   `recognition_threshold`: Recognition confidence score required to add the face to the object as a sub label.
    *   Default: `0.9`.
*   `min_faces`: Min face recognitions for the sub label to be applied to the person object.
    *   Default: `1`
*   `save_attempts`: Number of images of recognized faces to save for training.
    *   Default: `100`.
*   `blur_confidence_filter`: Enables a filter that calculates how blurry the face is and adjusts the confidence based on this.
    *   Default: `True`.

## Usage[​](#usage "Direct link to Usage")

Follow these steps to begin:

1.  **Enable face recognition** in your configuration file and restart Frigate.
2.  **Upload one face** using the **Add Face** button's wizard in the Face Library section of the Frigate UI. Read below for the best practices on expanding your training set.
3.  When Frigate detects and attempts to recognize a face, it will appear in the **Train** tab of the Face Library, along with its associated recognition confidence.
4.  From the **Train** tab, you can **assign the face** to a new or existing person to improve recognition accuracy for the future.

## Creating a Robust Training Set[​](#creating-a-robust-training-set "Direct link to Creating a Robust Training Set")

The number of images needed for a sufficient training set for face recognition varies depending on several factors:

*   Diversity of the dataset: A dataset with diverse images, including variations in lighting, pose, and facial expressions, will require fewer images per person than a less diverse dataset.
*   Desired accuracy: The higher the desired accuracy, the more images are typically needed.

However, here are some general guidelines:

*   Minimum: For basic face recognition tasks, a minimum of 5-10 images per person is often recommended.
*   Recommended: For more robust and accurate systems, 20-30 images per person is a good starting point.
*   Ideal: For optimal performance, especially in challenging conditions, 50-100 images per person can be beneficial.

The accuracy of face recognition is heavily dependent on the quality of data given to it for training. It is recommended to build the face training library in phases.

tip

When choosing images to include in the face training set it is recommended to always follow these recommendations:

*   If it is difficult to make out details in a persons face it will not be helpful in training.
*   Avoid images with extreme under/over-exposure.
*   Avoid blurry / pixelated images.
*   Avoid training on infrared (gray-scale). The models are trained on color images and will be able to extract features from gray-scale images.
*   Using images of people wearing hats / sunglasses may confuse the model.
*   Do not upload too many similar images at the same time, it is recommended to train no more than 4-6 similar images for each person to avoid over-fitting.

### Understanding the Train Tab[​](#understanding-the-train-tab "Direct link to Understanding the Train Tab")

The Train tab in the face library displays recent face recognition attempts. Detected face images are grouped according to the person they were identified as potentially matching.

Each face image is labeled with a name (or `Unknown`) along with the confidence score of the recognition attempt. While each image can be used to train the system for a specific person, not all images are suitable for training.

Refer to the guidelines below for best practices on selecting images for training.

### Step 1 - Building a Strong Foundation[​](#step-1---building-a-strong-foundation "Direct link to Step 1 - Building a Strong Foundation")

When first enabling face recognition it is important to build a foundation of strong images. It is recommended to start by uploading 1-5 photos containing just this person's face. It is important that the person's face in the photo is front-facing and not turned, this will ensure a good starting point.

Then it is recommended to use the `Face Library` tab in Frigate to select and train images for each person as they are detected. When building a strong foundation it is strongly recommended to only train on images that are front-facing. Ignore images from cameras that recognize faces from an angle. Aim to strike a balance between the quality of images while also having a range of conditions (day / night, different weather conditions, different times of day, etc.) in order to have diversity in the images used for each person and not have over-fitting.

You do not want to train images that are 90%+ as these are already being confidently recognized. In this step the goal is to train on clear, lower scoring front-facing images until the majority of front-facing images for a given person are consistently recognized correctly. Then it is time to move on to step 2.

### Step 2 - Expanding The Dataset[​](#step-2---expanding-the-dataset "Direct link to Step 2 - Expanding The Dataset")

Once front-facing images are performing well, start choosing slightly off-angle images to include for training. It is important to still choose images where enough face detail is visible to recognize someone, and you still only want to train on images that score lower.

## FAQ[​](#faq "Direct link to FAQ")

### How do I debug Face Recognition issues?[​](#how-do-i-debug-face-recognition-issues "Direct link to How do I debug Face Recognition issues?")

Start with the [Usage](#usage) section and re-read the [Model Requirements](#model-requirements) above.

1.  Ensure `person` is being _detected_. A `person` will automatically be scanned by Frigate for a face. Any detected faces will appear in the Train tab in the Frigate UI's Face Library.
    
    If you are using a Frigate+ or `face` detecting model:
    
    *   Watch the debug view (Settings --> Debug) to ensure that `face` is being detected along with `person`.
    *   You may need to adjust the `min_score` for the `face` object if faces are not being detected.
    
    If you are **not** using a Frigate+ or `face` detecting model:
    
    *   Check your `detect` stream resolution and ensure it is sufficiently high enough to capture face details on `person` objects.
    *   You may need to lower your `detection_threshold` if faces are not being detected.
2.  Any detected faces will then be _recognized_.
    
    *   Make sure you have trained at least one face per the recommendations above.
    *   Adjust `recognition_threshold` settings per the suggestions [above](#advanced-configuration).

### Detection does not work well with blurry images?[​](#detection-does-not-work-well-with-blurry-images "Direct link to Detection does not work well with blurry images?")

Accuracy is definitely a going to be improved with higher quality cameras / streams. It is important to look at the DORI (Detection Observation Recognition Identification) range of your camera, if that specification is posted. This specification explains the distance from the camera that a person can be detected, observed, recognized, and identified. The identification range is the most relevant here, and the distance listed by the camera is the furthest that face recognition will realistically work.

Some users have also noted that setting the stream in camera firmware to a constant bit rate (CBR) leads to better image clarity than with a variable bit rate (VBR).

### Why can't I bulk upload photos?[​](#why-cant-i-bulk-upload-photos "Direct link to Why can't I bulk upload photos?")

It is important to methodically add photos to the library, bulk importing photos (especially from a general photo library) will lead to over-fitting in that particular scenario and hurt recognition performance.

### Why can't I bulk reprocess faces?[​](#why-cant-i-bulk-reprocess-faces "Direct link to Why can't I bulk reprocess faces?")

Face embedding models work by breaking apart faces into different features. This means that when reprocessing an image, only images from a similar angle will have its score affected.

### Why do unknown people score similarly to known people?[​](#why-do-unknown-people-score-similarly-to-known-people "Direct link to Why do unknown people score similarly to known people?")

This can happen for a few different reasons, but this is usually an indicator that the training set needs to be improved. This is often related to over-fitting:

*   If you train with only a few images per person, especially if those images are very similar, the recognition model becomes overly specialized to those specific images.
*   When you provide images with different poses, lighting, and expressions, the algorithm extracts features that are consistent across those variations.
*   By training on a diverse set of images, the algorithm becomes less sensitive to minor variations and noise in the input image.

Review your face collections and remove most of the unclear or low-quality images. Then, use the **Reprocess** button on each face in the **Train** tab to evaluate how the changes affect recognition scores.

Avoid training on images that already score highly, as this can lead to over-fitting. Instead, focus on relatively clear images that score lower - ideally with different lighting, angles, and conditions—to help the model generalize more effectively.

### Frigate misidentified a face. Can I tell it that a face is "not" a specific person?[​](#frigate-misidentified-a-face-can-i-tell-it-that-a-face-is-not-a-specific-person "Direct link to Frigate misidentified a face. Can I tell it that a face is \"not\" a specific person?")

No, face recognition does not support negative training (i.e., explicitly telling it who someone is _not_). Instead, the best approach is to improve the training data by using a more diverse and representative set of images for each person. For more guidance, refer to the section above on improving recognition accuracy.

### I see scores above the threshold in the train tab, but a sub label wasn't assigned?[​](#i-see-scores-above-the-threshold-in-the-train-tab-but-a-sub-label-wasnt-assigned "Direct link to I see scores above the threshold in the train tab, but a sub label wasn't assigned?")

The Frigate considers the recognition scores across all recognition attempts for each person object. The scores are continually weighted based on the area of the face, and a sub label will only be assigned to person if a person is confidently recognized consistently. This avoids cases where a single high confidence recognition would throw off the results.

### Can I use other face recognition software like DoubleTake at the same time as the built in face recognition?[​](#can-i-use-other-face-recognition-software-like-doubletake-at-the-same-time-as-the-built-in-face-recognition "Direct link to Can I use other face recognition software like DoubleTake at the same time as the built in face recognition?")

No, using another face recognition service will interfere with Frigate's built in face recognition. When using double-take the sub\_label feature must be disabled if the built in face recognition is also desired.

### Does face recognition run on the recording stream?[​](#does-face-recognition-run-on-the-recording-stream "Direct link to Does face recognition run on the recording stream?")

Face recognition does not run on the recording stream, this would be suboptimal for many reasons:

1.  The latency of accessing the recordings means the notifications would not include the names of recognized people because recognition would not complete until after.
2.  The embedding models used run on a set image size, so larger images will be scaled down to match this anyway.
3.  Motion clarity is much more important than extra pixels, over-compression and motion blur are much more detrimental to results than resolution.

### I get an unknown error when taking a photo directly with my iPhone[​](#i-get-an-unknown-error-when-taking-a-photo-directly-with-my-iphone "Direct link to I get an unknown error when taking a photo directly with my iPhone")

By default iOS devices will use HEIC (High Efficiency Image Container) for images, but this format is not supported for uploads. Choosing `large` as the format instead of `original` will use JPG which will work correctly.

### How can I delete the face database and start over?[​](#how-can-i-delete-the-face-database-and-start-over "Direct link to How can I delete the face database and start over?")

Frigate does not store anything in its database related to face recognition. You can simply delete all of your faces through the Frigate UI or remove the contents of the `/media/frigate/clips/faces` directory.

*   [Model Requirements](#model-requirements)
    *   [Face Detection](#face-detection)
    *   [Face Recognition](#face-recognition)
*   [Minimum System Requirements](#minimum-system-requirements)
*   [Configuration](#configuration)
*   [Advanced Configuration](#advanced-configuration)
    *   [Detection](#detection)
    *   [Recognition](#recognition)
*   [Usage](#usage)
*   [Creating a Robust Training Set](#creating-a-robust-training-set)
    *   [Understanding the Train Tab](#understanding-the-train-tab)
    *   [Step 1 - Building a Strong Foundation](#step-1---building-a-strong-foundation)
    *   [Step 2 - Expanding The Dataset](#step-2---expanding-the-dataset)
*   [FAQ](#faq)
    *   [How do I debug Face Recognition issues?](#how-do-i-debug-face-recognition-issues)
    *   [Detection does not work well with blurry images?](#detection-does-not-work-well-with-blurry-images)
    *   [Why can't I bulk upload photos?](#why-cant-i-bulk-upload-photos)
    *   [Why can't I bulk reprocess faces?](#why-cant-i-bulk-reprocess-faces)
    *   [Why do unknown people score similarly to known people?](#why-do-unknown-people-score-similarly-to-known-people)
    *   [Frigate misidentified a face. Can I tell it that a face is "not" a specific person?](#frigate-misidentified-a-face-can-i-tell-it-that-a-face-is-not-a-specific-person)
    *   [I see scores above the threshold in the train tab, but a sub label wasn't assigned?](#i-see-scores-above-the-threshold-in-the-train-tab-but-a-sub-label-wasnt-assigned)
    *   [Can I use other face recognition software like DoubleTake at the same time as the built in face recognition?](#can-i-use-other-face-recognition-software-like-doubletake-at-the-same-time-as-the-built-in-face-recognition)
    *   [Does face recognition run on the recording stream?](#does-face-recognition-run-on-the-recording-stream)
    *   [I get an unknown error when taking a photo directly with my iPhone](#i-get-an-unknown-error-when-taking-a-photo-directly-with-my-iphone)
    *   [How can I delete the face database and start over?](#how-can-i-delete-the-face-database-and-start-over)

--- END OF FILE: configuration-ffmpeg_presets.md ---
--- START OF FILE: configuration-ffmpeg_presets.md ---

Source: https://docs.frigate.video/configuration/ffmpeg_presets

On this page

Some presets of FFmpeg args are provided by default to make the configuration easier. All presets can be seen in [this file](https://github.com/blakeblackshear/frigate/blob/master/frigate/ffmpeg_presets.py).

### Hwaccel Presets[​](#hwaccel-presets "Direct link to Hwaccel Presets")

It is highly recommended to use hwaccel presets in the config. These presets not only replace the longer args, but they also give Frigate hints of what hardware is available and allows Frigate to make other optimizations using the GPU such as when encoding the birdseye restream or when scaling a stream that has a size different than the native stream size.

See [the hwaccel docs](/configuration/hardware_acceleration_video) for more info on how to setup hwaccel for your GPU / iGPU.

Preset

Usage

Other Notes

preset-rpi-64-h264

64 bit Rpi with h264 stream

preset-rpi-64-h265

64 bit Rpi with h265 stream

preset-vaapi

Intel & AMD VAAPI

Check hwaccel docs to ensure correct driver is chosen

preset-intel-qsv-h264

Intel QSV with h264 stream

If issues occur recommend using vaapi preset instead

preset-intel-qsv-h265

Intel QSV with h265 stream

If issues occur recommend using vaapi preset instead

preset-nvidia

Nvidia GPU

preset-jetson-h264

Nvidia Jetson with h264 stream

preset-jetson-h265

Nvidia Jetson with h265 stream

preset-rkmpp

Rockchip MPP

Use image with \*-rk suffix and privileged mode

### Input Args Presets[​](#input-args-presets "Direct link to Input Args Presets")

Input args presets help make the config more readable and handle use cases for different types of streams to ensure maximum compatibility.

See [the camera specific docs](/configuration/camera_specific) for more info on non-standard cameras and recommendations for using them in Frigate.

Preset

Usage

Other Notes

preset-http-jpeg-generic

HTTP Live Jpeg

Recommend restreaming live jpeg instead

preset-http-mjpeg-generic

HTTP Mjpeg Stream

Recommend restreaming mjpeg stream instead

preset-http-reolink

Reolink HTTP-FLV Stream

Only for reolink http, not when restreaming as rtsp

preset-rtmp-generic

RTMP Stream

preset-rtsp-generic

RTSP Stream

This is the default when nothing is specified

preset-rtsp-restream

RTSP Stream from restream

Use for rtsp restream as source for frigate

preset-rtsp-restream-low-latency

RTSP Stream from restream

Use for rtsp restream as source for frigate to lower latency, may cause issues with some cameras

preset-rtsp-udp

RTSP Stream via UDP

Use when camera is UDP only

preset-rtsp-blue-iris

Blue Iris RTSP Stream

Use when consuming a stream from Blue Iris

warning

It is important to be mindful of input args when using restream because you can have a mix of protocols. `http` and `rtmp` presets cannot be used with `rtsp` streams. For example, when using a reolink cam with the rtsp restream as a source for record the preset-http-reolink will cause a crash. In this case presets will need to be set at the stream level. See the example below.

```
go2rtc:  streams:    reolink_cam: http://192.168.0.139/flv?port=1935&app=bcs&stream=channel0_main.bcs&user=admin&password=passwordcameras:  reolink_cam:    ffmpeg:      inputs:        - path: http://192.168.0.139/flv?port=1935&app=bcs&stream=channel0_ext.bcs&user=admin&password=password          input_args: preset-http-reolink          roles:            - detect        - path: rtsp://127.0.0.1:8554/reolink_cam          input_args: preset-rtsp-generic          roles:            - record
```

### Output Args Presets[​](#output-args-presets "Direct link to Output Args Presets")

Output args presets help make the config more readable and handle use cases for different types of streams to ensure consistent recordings.

Preset

Usage

Other Notes

preset-record-generic

Record WITHOUT audio

If your camera doesn’t have audio, or if you don’t want to record audio, use this option

preset-record-generic-audio-copy

Record WITH original audio

Use this to enable audio in recordings

preset-record-generic-audio-aac

Record WITH transcoded aac audio

This is the default when no option is specified. Use it to transcode audio to AAC. If the source is already in AAC format, use preset-record-generic-audio-copy instead to avoid unnecessary re-encoding

preset-record-mjpeg

Record an mjpeg stream

Recommend restreaming mjpeg stream instead

preset-record-jpeg

Record live jpeg

Recommend restreaming live jpeg instead

preset-record-ubiquiti

Record ubiquiti stream with audio

Recordings with ubiquiti non-standard audio

*   [Hwaccel Presets](#hwaccel-presets)
*   [Input Args Presets](#input-args-presets)
*   [Output Args Presets](#output-args-presets)

--- END OF FILE: configuration-genai.md ---
--- START OF FILE: configuration-genai.md ---

Source: https://docs.frigate.video/configuration/genai

On this page

Generative AI can be used to automatically generate descriptive text based on the thumbnails of your tracked objects. This helps with [Semantic Search](/configuration/semantic_search) in Frigate to provide more context about your tracked objects. Descriptions are accessed via the _Explore_ view in the Frigate UI by clicking on a tracked object's thumbnail.

Requests for a description are sent off automatically to your AI provider at the end of the tracked object's lifecycle, or can optionally be sent earlier after a number of significantly changed frames, for example in use in more real-time notifications. Descriptions can also be regenerated manually via the Frigate UI. Note that if you are manually entering a description for tracked objects prior to its end, this will be overwritten by the generated response.

## Configuration[​](#configuration "Direct link to Configuration")

Generative AI can be enabled for all cameras or only for specific cameras. There are currently 3 native providers available to integrate with Frigate. Other providers that support the OpenAI standard API can also be used. See the OpenAI section below.

To use Generative AI, you must define a single provider at the global level of your Frigate configuration. If the provider you choose requires an API key, you may either directly paste it in your configuration, or store it in an environment variable prefixed with `FRIGATE_`.

```
genai:  enabled: True  provider: gemini  api_key: "{FRIGATE_GEMINI_API_KEY}"  model: gemini-2.0-flashcameras:  front_camera:    genai:      enabled: True # <- enable GenAI for your front camera      use_snapshot: True      objects:        - person      required_zones:        - steps  indoor_camera:    genai:      enabled: False # <- disable GenAI for your indoor camera
```

By default, descriptions will be generated for all tracked objects and all zones. But you can also optionally specify `objects` and `required_zones` to only generate descriptions for certain tracked objects or zones.

Optionally, you can generate the description using a snapshot (if enabled) by setting `use_snapshot` to `True`. By default, this is set to `False`, which sends the uncompressed images from the `detect` stream collected over the object's lifetime to the model. Once the object lifecycle ends, only a single compressed and cropped thumbnail is saved with the tracked object. Using a snapshot might be useful when you want to _regenerate_ a tracked object's description as it will provide the AI with a higher-quality image (typically downscaled by the AI itself) than the cropped/compressed thumbnail. Using a snapshot otherwise has a trade-off in that only a single image is sent to your provider, which will limit the model's ability to determine object movement or direction.

## Ollama[​](#ollama "Direct link to Ollama")

warning

Using Ollama on CPU is not recommended, high inference times make using Generative AI impractical.

[Ollama](https://ollama.com/) allows you to self-host large language models and keep everything running locally. It provides a nice API over [llama.cpp](https://github.com/ggerganov/llama.cpp). It is highly recommended to host this server on a machine with an Nvidia graphics card, or on a Apple silicon Mac for best performance.

Most of the 7b parameter 4-bit vision models will fit inside 8GB of VRAM. There is also a [Docker container](https://hub.docker.com/r/ollama/ollama) available.

Parallel requests also come with some caveats. You will need to set `OLLAMA_NUM_PARALLEL=1` and choose a `OLLAMA_MAX_QUEUE` and `OLLAMA_MAX_LOADED_MODELS` values that are appropriate for your hardware and preferences. See the [Ollama documentation](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-does-ollama-handle-concurrent-requests).

### Supported Models[​](#supported-models "Direct link to Supported Models")

You must use a vision capable model with Frigate. Current model variants can be found [in their model library](https://ollama.com/library). At the time of writing, this includes `llava`, `llava-llama3`, `llava-phi3`, and `moondream`. Note that Frigate will not automatically download the model you specify in your config, you must download the model to your local instance of Ollama first i.e. by running `ollama pull llava:7b` on your Ollama server/Docker container. Note that the model specified in Frigate's config must match the downloaded model tag.

note

You should have at least 8 GB of RAM available (or VRAM if running on GPU) to run the 7B models, 16 GB to run the 13B models, and 32 GB to run the 33B models.

### Configuration[​](#configuration-1 "Direct link to Configuration")

```
genai:  enabled: True  provider: ollama  base_url: http://localhost:11434  model: llava:7b
```

## Google Gemini[​](#google-gemini "Direct link to Google Gemini")

Google Gemini has a free tier allowing [15 queries per minute](https://ai.google.dev/pricing) to the API, which is more than sufficient for standard Frigate usage.

### Supported Models[​](#supported-models-1 "Direct link to Supported Models")

You must use a vision capable model with Frigate. Current model variants can be found [in their documentation](https://ai.google.dev/gemini-api/docs/models/gemini).

### Get API Key[​](#get-api-key "Direct link to Get API Key")

To start using Gemini, you must first get an API key from [Google AI Studio](https://aistudio.google.com).

1.  Accept the Terms of Service
2.  Click "Get API Key" from the right hand navigation
3.  Click "Create API key in new project"
4.  Copy the API key for use in your config

### Configuration[​](#configuration-2 "Direct link to Configuration")

```
genai:  enabled: True  provider: gemini  api_key: "{FRIGATE_GEMINI_API_KEY}"  model: gemini-2.0-flash
```

note

To use a different Gemini-compatible API endpoint, set the `GEMINI_BASE_URL` environment variable to your provider's API URL.

## OpenAI[​](#openai "Direct link to OpenAI")

OpenAI does not have a free tier for their API. With the release of gpt-4o, pricing has been reduced and each generation should cost fractions of a cent if you choose to go this route.

### Supported Models[​](#supported-models-2 "Direct link to Supported Models")

You must use a vision capable model with Frigate. Current model variants can be found [in their documentation](https://platform.openai.com/docs/models).

### Get API Key[​](#get-api-key-1 "Direct link to Get API Key")

To start using OpenAI, you must first [create an API key](https://platform.openai.com/api-keys) and [configure billing](https://platform.openai.com/settings/organization/billing/overview).

### Configuration[​](#configuration-3 "Direct link to Configuration")

```
genai:  enabled: True  provider: openai  api_key: "{FRIGATE_OPENAI_API_KEY}"  model: gpt-4o
```

note

To use a different OpenAI-compatible API endpoint, set the `OPENAI_BASE_URL` environment variable to your provider's API URL.

## Azure OpenAI[​](#azure-openai "Direct link to Azure OpenAI")

Microsoft offers several vision models through Azure OpenAI. A subscription is required.

### Supported Models[​](#supported-models-3 "Direct link to Supported Models")

You must use a vision capable model with Frigate. Current model variants can be found [in their documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models).

### Create Resource and Get API Key[​](#create-resource-and-get-api-key "Direct link to Create Resource and Get API Key")

To start using Azure OpenAI, you must first [create a resource](https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource). You'll need your API key, model name, and resource URL, which must include the `api-version` parameter (see the example below).

### Configuration[​](#configuration-4 "Direct link to Configuration")

```
genai:  enabled: True  provider: azure_openai  base_url: https://instance.cognitiveservices.azure.com/openai/responses?api-version=2025-04-01-preview  model: gpt-5-mini  api_key: "{FRIGATE_OPENAI_API_KEY}"
```

## Usage and Best Practices[​](#usage-and-best-practices "Direct link to Usage and Best Practices")

Frigate's thumbnail search excels at identifying specific details about tracked objects – for example, using an "image caption" approach to find a "person wearing a yellow vest," "a white dog running across the lawn," or "a red car on a residential street." To enhance this further, Frigate’s default prompts are designed to ask your AI provider about the intent behind the object's actions, rather than just describing its appearance.

While generating simple descriptions of detected objects is useful, understanding intent provides a deeper layer of insight. Instead of just recognizing "what" is in a scene, Frigate’s default prompts aim to infer "why" it might be there or "what" it could do next. Descriptions tell you what’s happening, but intent gives context. For instance, a person walking toward a door might seem like a visitor, but if they’re moving quickly after hours, you can infer a potential break-in attempt. Detecting a person loitering near a door at night can trigger an alert sooner than simply noting "a person standing by the door," helping you respond based on the situation’s context.

### Using GenAI for notifications[​](#using-genai-for-notifications "Direct link to Using GenAI for notifications")

Frigate provides an [MQTT topic](/integrations/mqtt), `frigate/tracked_object_update`, that is updated with a JSON payload containing `event_id` and `description` when your AI provider returns a description for a tracked object. This description could be used directly in notifications, such as sending alerts to your phone or making audio announcements. If additional details from the tracked object are needed, you can query the [HTTP API](/integrations/api/event-events-event-id-get) using the `event_id`, eg: `http://frigate_ip:5000/api/events/<event_id>`.

If looking to get notifications earlier than when an object ceases to be tracked, an additional send trigger can be configured of `after_significant_updates`.

```
genai:  send_triggers:    tracked_object_end: true # default    after_significant_updates: 3 # how many updates to a tracked object before we should send an image
```

## Custom Prompts[​](#custom-prompts "Direct link to Custom Prompts")

Frigate sends multiple frames from the tracked object along with a prompt to your Generative AI provider asking it to generate a description. The default prompt is as follows:

```
Analyze the sequence of images containing the {label}. Focus on the likely intent or behavior of the {label} based on its actions and movement, rather than describing its appearance or the surroundings. Consider what the {label} is doing, why, and what it might do next.
```

tip

Prompts can use variable replacements `{label}`, `{sub_label}`, and `{camera}` to substitute information from the tracked object as part of the prompt.

You are also able to define custom prompts in your configuration.

```
genai:  enabled: True  provider: ollama  base_url: http://localhost:11434  model: llava  prompt: "Analyze the {label} in these images from the {camera} security camera. Focus on the actions, behavior, and potential intent of the {label}, rather than just describing its appearance."  object_prompts:    person: "Examine the main person in these images. What are they doing and what might their actions suggest about their intent (e.g., approaching a door, leaving an area, standing still)? Do not describe the surroundings or static details."    car: "Observe the primary vehicle in these images. Focus on its movement, direction, or purpose (e.g., parking, approaching, circling). If it's a delivery vehicle, mention the company."
```

Prompts can also be overriden at the camera level to provide a more detailed prompt to the model about your specific camera, if you desire.

```
cameras:  front_door:    genai:      use_snapshot: True      prompt: "Analyze the {label} in these images from the {camera} security camera at the front door. Focus on the actions and potential intent of the {label}."      object_prompts:        person: "Examine the person in these images. What are they doing, and how might their actions suggest their purpose (e.g., delivering something, approaching, leaving)? If they are carrying or interacting with a package, include details about its source or destination."        cat: "Observe the cat in these images. Focus on its movement and intent (e.g., wandering, hunting, interacting with objects). If the cat is near the flower pots or engaging in any specific actions, mention it."      objects:        - person        - cat      required_zones:        - steps
```

### Experiment with prompts[​](#experiment-with-prompts "Direct link to Experiment with prompts")

Many providers also have a public facing chat interface for their models. Download a couple of different thumbnails or snapshots from Frigate and try new things in the playground to get descriptions to your liking before updating the prompt in Frigate.

*   OpenAI - [ChatGPT](https://chatgpt.com)
*   Gemini - [Google AI Studio](https://aistudio.google.com)
*   Ollama - [Open WebUI](https://docs.openwebui.com/)

*   [Configuration](#configuration)
*   [Ollama](#ollama)
    *   [Supported Models](#supported-models)
    *   [Configuration](#configuration-1)
*   [Google Gemini](#google-gemini)
    *   [Supported Models](#supported-models-1)
    *   [Get API Key](#get-api-key)
    *   [Configuration](#configuration-2)
*   [OpenAI](#openai)
    *   [Supported Models](#supported-models-2)
    *   [Get API Key](#get-api-key-1)
    *   [Configuration](#configuration-3)
*   [Azure OpenAI](#azure-openai)
    *   [Supported Models](#supported-models-3)
    *   [Create Resource and Get API Key](#create-resource-and-get-api-key)
    *   [Configuration](#configuration-4)
*   [Usage and Best Practices](#usage-and-best-practices)
    *   [Using GenAI for notifications](#using-genai-for-notifications)
*   [Custom Prompts](#custom-prompts)
    *   [Experiment with prompts](#experiment-with-prompts)

--- END OF FILE: configuration-hardware_acceleration_enrichments.md ---
--- START OF FILE: configuration-hardware_acceleration_enrichments.md ---

Source: https://docs.frigate.video/configuration/hardware_acceleration_enrichments

On this page

Some of Frigate's enrichments can use a discrete GPU for accelerated processing.

## Requirements[​](#requirements "Direct link to Requirements")

Object detection and enrichments (like Semantic Search, Face Recognition, and License Plate Recognition) are independent features. To use a GPU for object detection, see the [Object Detectors](/configuration/object_detectors) documentation. If you want to use your GPU for any supported enrichments, you must choose the appropriate Frigate Docker image for your GPU and configure the enrichment according to its specific documentation.

*   **AMD**
    
    *   ROCm will automatically be detected and used for enrichments in the `-rocm` Frigate image.
*   **Intel**
    
    *   OpenVINO will automatically be detected and used for enrichments in the default Frigate image.
*   **Nvidia**
    
    *   Nvidia GPUs will automatically be detected and used for enrichments in the `-tensorrt` Frigate image.
    *   Jetson devices will automatically be detected and used for enrichments in the `-tensorrt-jp6` Frigate image.

Utilizing a GPU for enrichments does not require you to use the same GPU for object detection. For example, you can run the `tensorrt` Docker image for enrichments and still use other dedicated hardware like a Coral or Hailo for object detection. However, one combination that is not supported is TensorRT for object detection and OpenVINO for enrichments.

note

A Google Coral is a TPU (Tensor Processing Unit), not a dedicated GPU (Graphics Processing Unit) and therefore does not provide any kind of acceleration for Frigate's enrichments.

*   [Requirements](#requirements)

--- END OF FILE: configuration-hardware_acceleration_video.md ---
--- START OF FILE: configuration-hardware_acceleration_video.md ---

Source: https://docs.frigate.video/configuration/hardware_acceleration_video

On this page

It is highly recommended to use a GPU for hardware acceleration video decoding in Frigate. Some types of hardware acceleration are detected and used automatically, but you may need to update your configuration to enable hardware accelerated decoding in ffmpeg.

Depending on your system, these parameters may not be compatible. More information on hardware accelerated decoding for ffmpeg can be found here: [https://trac.ffmpeg.org/wiki/HWAccelIntro](https://trac.ffmpeg.org/wiki/HWAccelIntro)

## Raspberry Pi 3/4[​](#raspberry-pi-34 "Direct link to Raspberry Pi 3/4")

Ensure you increase the allocated RAM for your GPU to at least 128 (`raspi-config` > Performance Options > GPU Memory). If you are using the HA Add-on, you may need to use the full access variant and turn off _Protection mode_ for hardware acceleration.

```
# if you want to decode a h264 streamffmpeg:  hwaccel_args: preset-rpi-64-h264# if you want to decode a h265 (hevc) streamffmpeg:  hwaccel_args: preset-rpi-64-h265
```

note

If running Frigate through Docker, you either need to run in privileged mode or map the `/dev/video*` devices to Frigate. With Docker Compose add:

```
services:  frigate:    ...    devices:      - /dev/video11:/dev/video11
```

Or with `docker run`:

```
docker run -d \  --name frigate \  ...  --device /dev/video11 \  ghcr.io/blakeblackshear/frigate:stable
```

`/dev/video11` is the correct device (on Raspberry Pi 4B). You can check by running the following and looking for `H264`:

```
for d in /dev/video*; do  echo -e "---\n$d"  v4l2-ctl --list-formats-ext -d $ddone
```

Or map in all the `/dev/video*` devices.

## Intel-based CPUs[​](#intel-based-cpus "Direct link to Intel-based CPUs")

info

**Recommended hwaccel Preset**

CPU Generation

Intel Driver

Recommended Preset

Notes

gen1 - gen5

i965

preset-vaapi

qsv is not supported

gen6 - gen7

iHD

preset-vaapi

qsv is not supported

gen8 - gen12

iHD

preset-vaapi

preset-intel-qsv-\* can also be used

gen13+

iHD / Xe

preset-intel-qsv-\*

Intel Arc GPU

iHD / Xe

preset-intel-qsv-\*

note

The default driver is `iHD`. You may need to change the driver to `i965` by adding the following environment variable `LIBVA_DRIVER_NAME=i965` to your docker-compose file or [in the `config.yml` for HA Add-on users](/configuration/advanced#environment_vars).

See [The Intel Docs](https://www.intel.com/content/www/us/en/support/articles/000005505/processors.html) to figure out what generation your CPU is.

### Via VAAPI[​](#via-vaapi "Direct link to Via VAAPI")

VAAPI supports automatic profile selection so it will work automatically with both H.264 and H.265 streams.

```
ffmpeg:  hwaccel_args: preset-vaapi
```

### Via Quicksync[​](#via-quicksync "Direct link to Via Quicksync")

#### H.264 streams[​](#h264-streams "Direct link to H.264 streams")

```
ffmpeg:  hwaccel_args: preset-intel-qsv-h264
```

#### H.265 streams[​](#h265-streams "Direct link to H.265 streams")

```
ffmpeg:  hwaccel_args: preset-intel-qsv-h265
```

### Configuring Intel GPU Stats in Docker[​](#configuring-intel-gpu-stats-in-docker "Direct link to Configuring Intel GPU Stats in Docker")

Additional configuration is needed for the Docker container to be able to access the `intel_gpu_top` command for GPU stats. There are two options:

1.  Run the container as privileged.
2.  Add the `CAP_PERFMON` capability (note: you might need to set the `perf_event_paranoid` low enough to allow access to the performance event system.)

#### Run as privileged[​](#run-as-privileged "Direct link to Run as privileged")

This method works, but it gives more permissions to the container than are actually needed.

##### Docker Compose - Privileged[​](#docker-compose---privileged "Direct link to Docker Compose - Privileged")

```
services:  frigate:    ...    image: ghcr.io/blakeblackshear/frigate:stable    privileged: true
```

##### Docker Run CLI - Privileged[​](#docker-run-cli---privileged "Direct link to Docker Run CLI - Privileged")

```
docker run -d \  --name frigate \  ...  --privileged \  ghcr.io/blakeblackshear/frigate:stable
```

#### CAP\_PERFMON[​](#cap_perfmon "Direct link to CAP_PERFMON")

Only recent versions of Docker support the `CAP_PERFMON` capability. You can test to see if yours supports it by running: `docker run --cap-add=CAP_PERFMON hello-world`

##### Docker Compose - CAP\_PERFMON[​](#docker-compose---cap_perfmon "Direct link to Docker Compose - CAP_PERFMON")

```
services:  frigate:    ...    image: ghcr.io/blakeblackshear/frigate:stable    cap_add:      - CAP_PERFMON
```

##### Docker Run CLI - CAP\_PERFMON[​](#docker-run-cli---cap_perfmon "Direct link to Docker Run CLI - CAP_PERFMON")

```
docker run -d \  --name frigate \  ...  --cap-add=CAP_PERFMON \  ghcr.io/blakeblackshear/frigate:stable
```

#### perf\_event\_paranoid[​](#perf_event_paranoid "Direct link to perf_event_paranoid")

_Note: This setting must be changed for the entire system._

For more information on the various values across different distributions, see [https://askubuntu.com/questions/1400874/what-does-perf-paranoia-level-four-do](https://askubuntu.com/questions/1400874/what-does-perf-paranoia-level-four-do).

Depending on your OS and kernel configuration, you may need to change the `/proc/sys/kernel/perf_event_paranoid` kernel tunable. You can test the change by running `sudo sh -c 'echo 2 >/proc/sys/kernel/perf_event_paranoid'` which will persist until a reboot. Make it permanent by running `sudo sh -c 'echo kernel.perf_event_paranoid=2 >> /etc/sysctl.d/local.conf'`

#### Stats for SR-IOV or other devices[​](#stats-for-sr-iov-or-other-devices "Direct link to Stats for SR-IOV or other devices")

When using virtualized GPUs via SR-IOV, you need to specify the device path to use to gather stats from `intel_gpu_top`. This example may work for some systems using SR-IOV:

```
telemetry:  stats:    intel_gpu_device: "sriov"
```

For other virtualized GPUs, try specifying the direct path to the device instead:

```
telemetry:  stats:    intel_gpu_device: "drm:/dev/dri/card0"
```

If you are passing in a device path, make sure you've passed the device through to the container.

## AMD/ATI GPUs (Radeon HD 2000 and newer GPUs) via libva-mesa-driver[​](#amdati-gpus-radeon-hd-2000-and-newer-gpus-via-libva-mesa-driver "Direct link to AMD/ATI GPUs (Radeon HD 2000 and newer GPUs) via libva-mesa-driver")

VAAPI supports automatic profile selection so it will work automatically with both H.264 and H.265 streams.

note

You need to change the driver to `radeonsi` by adding the following environment variable `LIBVA_DRIVER_NAME=radeonsi` to your docker-compose file or [in the `config.yml` for HA Add-on users](/configuration/advanced#environment_vars).

```
ffmpeg:  hwaccel_args: preset-vaapi
```

## NVIDIA GPUs[​](#nvidia-gpus "Direct link to NVIDIA GPUs")

While older GPUs may work, it is recommended to use modern, supported GPUs. NVIDIA provides a [matrix of supported GPUs and features](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new). If your card is on the list and supports CUVID/NVDEC, it will most likely work with Frigate for decoding. However, you must also use [a driver version that will work with FFmpeg](https://github.com/FFmpeg/nv-codec-headers/blob/master/README). Older driver versions may be missing symbols and fail to work, and older cards are not supported by newer driver versions. The only way around this is to [provide your own FFmpeg](/configuration/advanced#custom-ffmpeg-build) that will work with your driver version, but this is unsupported and may not work well if at all.

A more complete list of cards and their compatible drivers is available in the [driver release readme](https://download.nvidia.com/XFree86/Linux-x86_64/525.85.05/README/supportedchips.html).

If your distribution does not offer NVIDIA driver packages, you can [download them here](https://www.nvidia.com/en-us/drivers/unix/).

### Configuring Nvidia GPUs in Docker[​](#configuring-nvidia-gpus-in-docker "Direct link to Configuring Nvidia GPUs in Docker")

Additional configuration is needed for the Docker container to be able to access the NVIDIA GPU. The supported method for this is to install the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker) and specify the GPU to Docker. How you do this depends on how Docker is being run:

#### Docker Compose - Nvidia GPU[​](#docker-compose---nvidia-gpu "Direct link to Docker Compose - Nvidia GPU")

```
services:  frigate:    ...    image: ghcr.io/blakeblackshear/frigate:stable-tensorrt    deploy:    # <------------- Add this section      resources:        reservations:          devices:            - driver: nvidia              device_ids: ['0'] # this is only needed when using multiple GPUs              count: 1 # number of GPUs              capabilities: [gpu]
```

#### Docker Run CLI - Nvidia GPU[​](#docker-run-cli---nvidia-gpu "Direct link to Docker Run CLI - Nvidia GPU")

```
docker run -d \  --name frigate \  ...  --gpus=all \  ghcr.io/blakeblackshear/frigate:stable-tensorrt
```

### Setup Decoder[​](#setup-decoder "Direct link to Setup Decoder")

Using `preset-nvidia` ffmpeg will automatically select the necessary profile for the incoming video, and will log an error if the profile is not supported by your GPU.

```
ffmpeg:  hwaccel_args: preset-nvidia
```

If everything is working correctly, you should see a significant improvement in performance. Verify that hardware decoding is working by running `nvidia-smi`, which should show `ffmpeg` processes:

note

`nvidia-smi` may not show `ffmpeg` processes when run inside the container [due to docker limitations](https://github.com/NVIDIA/nvidia-docker/issues/179#issuecomment-645579458).

```
+-----------------------------------------------------------------------------+| NVIDIA-SMI 455.38       Driver Version: 455.38       CUDA Version: 11.1     ||-------------------------------+----------------------+----------------------+| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC || Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. ||                               |                      |               MIG M. ||===============================+======================+======================||   0  GeForce GTX 166...  Off  | 00000000:03:00.0 Off |                  N/A || 38%   41C    P2    36W / 125W |   2082MiB /  5942MiB |      5%      Default ||                               |                      |                  N/A |+-------------------------------+----------------------+----------------------++-----------------------------------------------------------------------------+| Processes:                                                                  ||  GPU   GI   CI        PID   Type   Process name                  GPU Memory ||        ID   ID                                                   Usage      ||=============================================================================||    0   N/A  N/A     12737      C   ffmpeg                            249MiB ||    0   N/A  N/A     12751      C   ffmpeg                            249MiB ||    0   N/A  N/A     12772      C   ffmpeg                            249MiB ||    0   N/A  N/A     12775      C   ffmpeg                            249MiB ||    0   N/A  N/A     12800      C   ffmpeg                            249MiB ||    0   N/A  N/A     12811      C   ffmpeg                            417MiB ||    0   N/A  N/A     12827      C   ffmpeg                            417MiB |+-----------------------------------------------------------------------------+
```

If you do not see these processes, check the `docker logs` for the container and look for decoding errors.

These instructions were originally based on the [Jellyfin documentation](https://jellyfin.org/docs/general/administration/hardware-acceleration.html#nvidia-hardware-acceleration-on-docker-linux).

# Community Supported

## NVIDIA Jetson (Orin AGX, Orin NX, Orin Nano\*, Xavier AGX, Xavier NX, TX2, TX1, Nano)[​](#nvidia-jetson-orin-agx-orin-nx-orin-nano-xavier-agx-xavier-nx-tx2-tx1-nano "Direct link to NVIDIA Jetson (Orin AGX, Orin NX, Orin Nano*, Xavier AGX, Xavier NX, TX2, TX1, Nano)")

A separate set of docker images is available that is based on Jetpack/L4T. They come with an `ffmpeg` build with codecs that use the Jetson's dedicated media engine. If your Jetson host is running Jetpack 6.0+ use the `stable-tensorrt-jp6` tagged image. Note that the Orin Nano has no video encoder, so frigate will use software encoding on this platform, but the image will still allow hardware decoding and tensorrt object detection.

You will need to use the image with the nvidia container runtime:

### Docker Run CLI - Jetson[​](#docker-run-cli---jetson "Direct link to Docker Run CLI - Jetson")

```
docker run -d \  ...  --runtime nvidia  ghcr.io/blakeblackshear/frigate:stable-tensorrt-jp6
```

### Docker Compose - Jetson[​](#docker-compose---jetson "Direct link to Docker Compose - Jetson")

```
services:  frigate:    ...    image: ghcr.io/blakeblackshear/frigate:stable-tensorrt-jp6    runtime: nvidia   # Add this
```

note

The `runtime:` tag is not supported on older versions of docker-compose. If you run into this, you can instead use the nvidia runtime system-wide by adding `"default-runtime": "nvidia"` to `/etc/docker/daemon.json`:

```
{    "runtimes": {        "nvidia": {            "path": "nvidia-container-runtime",            "runtimeArgs": []        }    },    "default-runtime": "nvidia"}
```

### Setup Decoder[​](#setup-decoder-1 "Direct link to Setup Decoder")

The decoder you need to pass in the `hwaccel_args` will depend on the input video.

A list of supported codecs (you can use `ffmpeg -decoders | grep nvmpi` in the container to get the ones your card supports)

```
 V..... h264_nvmpi           h264 (nvmpi) (codec h264) V..... hevc_nvmpi           hevc (nvmpi) (codec hevc) V..... mpeg2_nvmpi          mpeg2 (nvmpi) (codec mpeg2video) V..... mpeg4_nvmpi          mpeg4 (nvmpi) (codec mpeg4) V..... vp8_nvmpi            vp8 (nvmpi) (codec vp8) V..... vp9_nvmpi            vp9 (nvmpi) (codec vp9)
```

For example, for H264 video, you'll select `preset-jetson-h264`.

```
ffmpeg:  hwaccel_args: preset-jetson-h264
```

If everything is working correctly, you should see a significant reduction in ffmpeg CPU load and power consumption. Verify that hardware decoding is working by running `jtop` (`sudo pip3 install -U jetson-stats`), which should show that NVDEC/NVDEC1 are in use.

## Rockchip platform[​](#rockchip-platform "Direct link to Rockchip platform")

Hardware accelerated video de-/encoding is supported on all Rockchip SoCs using [Nyanmisaka's FFmpeg 6.1 Fork](https://github.com/nyanmisaka/ffmpeg-rockchip) based on [Rockchip's mpp library](https://github.com/rockchip-linux/mpp).

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Make sure to follow the [Rockchip specific installation instructions](/frigate/installation#rockchip-platform).

### Configuration[​](#configuration "Direct link to Configuration")

Add one of the following FFmpeg presets to your `config.yml` to enable hardware video processing:

```
ffmpeg:  hwaccel_args: preset-rkmpp
```

note

Make sure that your SoC supports hardware acceleration for your input stream. For example, if your camera streams with h265 encoding and a 4k resolution, your SoC must be able to de- and encode h265 with a 4k resolution or higher. If you are unsure whether your SoC meets the requirements, take a look at the datasheet.

warning

If one or more of your cameras are not properly processed and this error is shown in the logs:

```
[segment @ 0xaaaaff694790] Timestamps are unset in a packet for stream 0. This is deprecated and will stop working in the future. Fix your code to set the timestamps properly[Parsed_scale_rkrga_0 @ 0xaaaaff819070] No hw context provided on input[Parsed_scale_rkrga_0 @ 0xaaaaff819070] Failed to configure output pad on Parsed_scale_rkrga_0Error initializing filters!Error marking filters as finished[out#1/rawvideo @ 0xaaaaff3d8730] Nothing was written into output file, because at least one of its streams received no packets.Restarting ffmpeg...
```

you should try to uprade to FFmpeg 7. This can be done using this config option:

```
ffmpeg:  path: "7.0"
```

You can set this option globally to use FFmpeg 7 for all cameras or on camera level to use it only for specific cameras. Do not confuse this option with:

```
cameras:  name:    ffmpeg:      inputs:        - path: rtsp://viewer:{FRIGATE_RTSP_PASSWORD}@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2
```

*   [Raspberry Pi 3/4](#raspberry-pi-34)
*   [Intel-based CPUs](#intel-based-cpus)
    *   [Via VAAPI](#via-vaapi)
    *   [Via Quicksync](#via-quicksync)
    *   [Configuring Intel GPU Stats in Docker](#configuring-intel-gpu-stats-in-docker)
*   [AMD/ATI GPUs (Radeon HD 2000 and newer GPUs) via libva-mesa-driver](#amdati-gpus-radeon-hd-2000-and-newer-gpus-via-libva-mesa-driver)
*   [NVIDIA GPUs](#nvidia-gpus)
    *   [Configuring Nvidia GPUs in Docker](#configuring-nvidia-gpus-in-docker)
    *   [Setup Decoder](#setup-decoder)
*   [NVIDIA Jetson (Orin AGX, Orin NX, Orin Nano\*, Xavier AGX, Xavier NX, TX2, TX1, Nano)](#nvidia-jetson-orin-agx-orin-nx-orin-nano-xavier-agx-xavier-nx-tx2-tx1-nano)
    *   [Docker Run CLI - Jetson](#docker-run-cli---jetson)
    *   [Docker Compose - Jetson](#docker-compose---jetson)
    *   [Setup Decoder](#setup-decoder-1)
*   [Rockchip platform](#rockchip-platform)
    *   [Prerequisites](#prerequisites)
    *   [Configuration](#configuration)

--- END OF FILE: configuration-license_plate_recognition.md ---
--- START OF FILE: configuration-license_plate_recognition.md ---

Source: https://docs.frigate.video/configuration/license_plate_recognition

On this page

Frigate can recognize license plates on vehicles and automatically add the detected characters to the `recognized_license_plate` field or a known name as a `sub_label` to tracked objects of type `car` or `motorcycle`. A common use case may be to read the license plates of cars pulling into a driveway or cars passing by on a street.

LPR works best when the license plate is clearly visible to the camera. For moving vehicles, Frigate continuously refines the recognition process, keeping the most confident result. However, LPR does not run on stationary vehicles.

When a plate is recognized, the details are:

*   Added as a `sub_label` (if known) or the `recognized_license_plate` field (if unknown) to a tracked object.
*   Viewable in the Review Item Details pane in Review (sub labels).
*   Viewable in the Tracked Object Details pane in Explore (sub labels and recognized license plates).
*   Filterable through the More Filters menu in Explore.
*   Published via the `frigate/events` MQTT topic as a `sub_label` (known) or `recognized_license_plate` (unknown) for the `car` or `motorcycle` tracked object.
*   Published via the `frigate/tracked_object_update` MQTT topic with `name` (if known) and `plate`.

## Model Requirements[​](#model-requirements "Direct link to Model Requirements")

Users running a Frigate+ model (or any custom model that natively detects license plates) should ensure that `license_plate` is added to the [list of objects to track](https://docs.frigate.video/plus/#available-label-types) either globally or for a specific camera. This will improve the accuracy and performance of the LPR model.

Users without a model that detects license plates can still run LPR. Frigate uses a lightweight YOLOv9 license plate detection model that can be configured to run on your CPU or GPU. In this case, you should _not_ define `license_plate` in your list of objects to track.

note

In the default mode, Frigate's LPR needs to first detect a `car` or `motorcycle` before it can recognize a license plate. If you're using a dedicated LPR camera and have a zoomed-in view where a `car` or `motorcycle` will not be detected, you can still run LPR, but the configuration parameters will differ from the default mode. See the [Dedicated LPR Cameras](#dedicated-lpr-cameras) section below.

## Minimum System Requirements[​](#minimum-system-requirements "Direct link to Minimum System Requirements")

License plate recognition works by running AI models locally on your system. The YOLOv9 plate detector model and the OCR models ([PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)) are relatively lightweight and can run on your CPU or GPU, depending on your configuration. At least 4GB of RAM is required.

## Configuration[​](#configuration "Direct link to Configuration")

License plate recognition is disabled by default. Enable it in your config file:

```
lpr:  enabled: True
```

Like other enrichments in Frigate, LPR **must be enabled globally** to use the feature. You should disable it for specific cameras at the camera level if you don't want to run LPR on cars on those cameras:

```
cameras:  garage:    ...    lpr:      enabled: False
```

For non-dedicated LPR cameras, ensure that your camera is configured to detect objects of type `car` or `motorcycle`, and that a car or motorcycle is actually being detected by Frigate. Otherwise, LPR will not run.

Like the other real-time processors in Frigate, license plate recognition runs on the camera stream defined by the `detect` role in your config. To ensure optimal performance, select a suitable resolution for this stream in your camera's firmware that fits your specific scene and requirements.

## Advanced Configuration[​](#advanced-configuration "Direct link to Advanced Configuration")

Fine-tune the LPR feature using these optional parameters at the global level of your config. The only optional parameters that can be set at the camera level are `enabled`, `min_area`, and `enhancement`.

### Detection[​](#detection "Direct link to Detection")

*   **`detection_threshold`**: License plate object detection confidence score required before recognition runs.
    *   Default: `0.7`
    *   Note: This is field only applies to the standalone license plate detection model, `threshold` and `min_score` object filters should be used for models like Frigate+ that have license plate detection built in.
*   **`min_area`**: Defines the minimum area (in pixels) a license plate must be before recognition runs.
    *   Default: `1000` pixels. Note: this is intentionally set very low as it is an _area_ measurement (length x width). For reference, 1000 pixels represents a ~32x32 pixel square in your camera image.
    *   Depending on the resolution of your camera's `detect` stream, you can increase this value to ignore small or distant plates.
*   **`device`**: Device to use to run license plate recognition models.
    *   Default: `CPU`
    *   This can be `CPU` or `GPU`. For users without a model that detects license plates natively, using a GPU may increase performance of the models, especially the YOLOv9 license plate detector model. See the [Hardware Accelerated Enrichments](/configuration/hardware_acceleration_enrichments) documentation.
*   **`model_size`**: The size of the model used to detect text on plates.
    *   Default: `small`
    *   This can be `small` or `large`. The `large` model uses an enhanced text detector and is more accurate at finding text on plates but slower than the `small` model. For most users, the small model is recommended. For users in countries with multiple lines of text on plates, the large model is recommended. Note that using the large model does not improve _text recognition_, but it may improve _text detection_.

### Recognition[​](#recognition "Direct link to Recognition")

*   **`recognition_threshold`**: Recognition confidence score required to add the plate to the object as a `recognized_license_plate` and/or `sub_label`.
    *   Default: `0.9`.
*   **`min_plate_length`**: Specifies the minimum number of characters a detected license plate must have to be added as a `recognized_license_plate` and/or `sub_label` to an object.
    *   Use this to filter out short, incomplete, or incorrect detections.
*   **`format`**: A regular expression defining the expected format of detected plates. Plates that do not match this format will be discarded.
    *   `"^[A-Z]{1,3} [A-Z]{1,2} [0-9]{1,4}$"` matches plates like "B AB 1234" or "M X 7"
    *   `"^[A-Z]{2}[0-9]{2} [A-Z]{3}$"` matches plates like "AB12 XYZ" or "XY68 ABC"
    *   Websites like [https://regex101.com/](https://regex101.com/) can help test regular expressions for your plates.

### Matching[​](#matching "Direct link to Matching")

*   **`known_plates`**: List of strings or regular expressions that assign custom a `sub_label` to `car` and `motorcycle` objects when a recognized plate matches a known value.
    *   These labels appear in the UI, filters, and notifications.
    *   Unknown plates are still saved but are added to the `recognized_license_plate` field rather than the `sub_label`.
*   **`match_distance`**: Allows for minor variations (missing/incorrect characters) when matching a detected plate to a known plate.
    *   For example, setting `match_distance: 1` allows a plate `ABCDE` to match `ABCBE` or `ABCD`.
    *   This parameter will _not_ operate on known plates that are defined as regular expressions. You should define the full string of your plate in `known_plates` in order to use `match_distance`.

### Image Enhancement[​](#image-enhancement "Direct link to Image Enhancement")

*   **`enhancement`**: A value between 0 and 10 that adjusts the level of image enhancement applied to captured license plates before they are processed for recognition. This preprocessing step can sometimes improve accuracy but may also have the opposite effect.
    *   Default: `0` (no enhancement)
    *   Higher values increase contrast, sharpen details, and reduce noise, but excessive enhancement can blur or distort characters, actually making them much harder for Frigate to recognize.
    *   This setting is best adjusted at the camera level if running LPR on multiple cameras.
    *   If Frigate is already recognizing plates correctly, leave this setting at the default of `0`. However, if you're experiencing frequent character issues or incomplete plates and you can already easily read the plates yourself, try increasing the value gradually, starting at 5 and adjusting as needed. You should see how different enhancement levels affect your plates. Use the `debug_save_plates` configuration option (see below).

### Debugging[​](#debugging "Direct link to Debugging")

*   **`debug_save_plates`**: Set to `True` to save captured text on plates for debugging. These images are stored in `/media/frigate/clips/lpr`, organized into subdirectories by `<camera>/<event_id>`, and named based on the capture timestamp.
    *   These saved images are not full plates but rather the specific areas of text detected on the plates. It is normal for the text detection model to sometimes find multiple areas of text on the plate. Use them to analyze what text Frigate recognized and how image enhancement affects detection.
    *   **Note:** Frigate does **not** automatically delete these debug images. Once LPR is functioning correctly, you should disable this option and manually remove the saved files to free up storage.

## Configuration Examples[​](#configuration-examples "Direct link to Configuration Examples")

These configuration parameters are available at the global level of your config. The only optional parameters that should be set at the camera level are `enabled`, `min_area`, and `enhancement`.

```
lpr:  enabled: True  min_area: 1500 # Ignore plates with an area (length x width) smaller than 1500 pixels  min_plate_length: 4 # Only recognize plates with 4 or more characters  known_plates:    Wife's Car:      - "ABC-1234"      - "ABC-I234" # Accounts for potential confusion between the number one (1) and capital letter I    Johnny:      - "J*N-*234" # Matches JHN-1234 and JMN-I234, but also note that "*" matches any number of characters    Sally:      - "[S5]LL 1234" # Matches both SLL 1234 and 5LL 1234    Work Trucks:      - "EMP-[0-9]{3}[A-Z]" # Matches plates like EMP-123A, EMP-456Z
```

```
lpr:  enabled: True  min_area: 4000 # Run recognition on larger plates only (4000 pixels represents a 63x63 pixel square in your image)  recognition_threshold: 0.85  format: "^[A-Z]{2} [A-Z][0-9]{4}$" # Only recognize plates that are two letters, followed by a space, followed by a single letter and 4 numbers  match_distance: 1 # Allow one character variation in plate matching  known_plates:    Delivery Van:      - "RJ K5678"      - "UP A1234"    Supervisor:      - "MN D3163"
```

note

If you want to detect cars on cameras but don't want to use resources to run LPR on those cars, you should disable LPR for those specific cameras.

```
cameras:  side_yard:    lpr:      enabled: False    ...
```

## Dedicated LPR Cameras[​](#dedicated-lpr-cameras "Direct link to Dedicated LPR Cameras")

Dedicated LPR cameras are single-purpose cameras with powerful optical zoom to capture license plates on distant vehicles, often with fine-tuned settings to capture plates at night.

To mark a camera as a dedicated LPR camera, add `type: "lpr"` the camera configuration.

note

Frigate's dedicated LPR mode is optimized for cameras with a narrow field of view, specifically positioned and zoomed to capture license plates exclusively. If your camera provides a general overview of a scene rather than a tightly focused view, this mode is not recommended.

Users can configure Frigate's dedicated LPR mode in two different ways depending on whether a Frigate+ (or native `license_plate` detecting) model is used:

### Using a Frigate+ (or Native `license_plate` Detecting) Model[​](#using-a-frigate-or-native-license_plate-detecting-model "Direct link to using-a-frigate-or-native-license_plate-detecting-model")

Users running a Frigate+ model (or any model that natively detects `license_plate`) can take advantage of `license_plate` detection. This allows license plates to be treated as standard objects in dedicated LPR mode, meaning that alerts, detections, snapshots, and other Frigate features work as usual, and plates are detected efficiently through your configured object detector.

An example configuration for a dedicated LPR camera using a `license_plate`\-detecting model:

```
# LPR global configurationlpr:  enabled: True  device: CPU # can also be GPU if available# Dedicated LPR camera configurationcameras:  dedicated_lpr_camera:    type: "lpr" # required to use dedicated LPR camera mode    ffmpeg: ... # add your streams    detect:      enabled: True      fps: 5 # increase to 10 if vehicles move quickly across your frame. Higher than 10 is unnecessary and is not recommended.      min_initialized: 2      width: 1920      height: 1080    objects:      track:        - license_plate      filters:        license_plate:          threshold: 0.7    motion:      threshold: 30      contour_area: 60 # use an increased value to tune out small motion changes      improve_contrast: false      mask: 0.704,0.007,0.709,0.052,0.989,0.055,0.993,0.001 # ensure your camera's timestamp is masked    record:      enabled: True # disable recording if you only want snapshots    snapshots:      enabled: True    review:      detections:        labels:          - license_plate
```

With this setup:

*   License plates are treated as normal objects in Frigate.
*   Scores, alerts, detections, and snapshots work as expected.
*   Snapshots will have license plate bounding boxes on them.
*   The `frigate/events` MQTT topic will publish tracked object updates.
*   Debug view will display `license_plate` bounding boxes.
*   If you are using a Frigate+ model and want to submit images from your dedicated LPR camera for model training and fine-tuning, annotate both the `car` / `motorcycle` and the `license_plate` in the snapshots on the Frigate+ website, even if the car is barely visible.

### Using the Secondary LPR Pipeline (Without Frigate+)[​](#using-the-secondary-lpr-pipeline-without-frigate "Direct link to Using the Secondary LPR Pipeline (Without Frigate+)")

If you are not running a Frigate+ model, you can use Frigate’s built-in secondary dedicated LPR pipeline. In this mode, Frigate bypasses the standard object detection pipeline and runs a local license plate detector model on the full frame whenever motion activity occurs.

An example configuration for a dedicated LPR camera using the secondary pipeline:

```
# LPR global configurationlpr:  enabled: True  device: CPU # can also be GPU if available and correct Docker image is used  detection_threshold: 0.7 # change if necessary# Dedicated LPR camera configurationcameras:  dedicated_lpr_camera:    type: "lpr" # required to use dedicated LPR camera mode    lpr:      enabled: True      enhancement: 3 # optional, enhance the image before trying to recognize characters    ffmpeg: ... # add your streams    detect:      enabled: False # disable Frigate's standard object detection pipeline      fps: 5 # increase if necessary, though high values may slow down Frigate's enrichments pipeline and use considerable CPU      width: 1920      height: 1080    objects:      track: [] # required when not using a Frigate+ model for dedicated LPR mode    motion:      threshold: 30      contour_area: 60 # use an increased value here to tune out small motion changes      improve_contrast: false      mask: 0.704,0.007,0.709,0.052,0.989,0.055,0.993,0.001 # ensure your camera's timestamp is masked    record:      enabled: True # disable recording if you only want snapshots    review:      detections:        enabled: True        retain:          default: 7
```

With this setup:

*   The standard object detection pipeline is bypassed. Any detected license plates on dedicated LPR cameras are treated similarly to manual events in Frigate. You must **not** specify `license_plate` as an object to track.
*   The license plate detector runs on the full frame whenever motion is detected and processes frames according to your detect `fps` setting.
*   Review items will always be classified as a `detection`.
*   Snapshots will always be saved.
*   Zones and object masks are **not** used.
*   The `frigate/events` MQTT topic will **not** publish tracked object updates with the license plate bounding box and score, though `frigate/reviews` will publish if recordings are enabled. If a plate is recognized as a known plate, publishing will occur with an updated `sub_label` field. If characters are recognized, publishing will occur with an updated `recognized_license_plate` field.
*   License plate snapshots are saved at the highest-scoring moment and appear in Explore.
*   Debug view will not show `license_plate` bounding boxes.

### Summary[​](#summary "Direct link to Summary")

Feature

Native `license_plate` detecting Model (like Frigate+)

Secondary Pipeline (without native model or Frigate+)

License Plate Detection

Uses `license_plate` as a tracked object

Runs a dedicated LPR pipeline

FPS Setting

5 (increase for fast-moving cars)

5 (increase for fast-moving cars, but it may use much more CPU)

Object Detection

Standard Frigate+ detection applies

Bypasses standard object detection

Debug View

May show `license_plate` bounding boxes

May **not** show `license_plate` bounding boxes

MQTT `frigate/events`

Publishes tracked object updates

Publishes limited updates

Explore

Recognized plates available in More Filters

Recognized plates available in More Filters

By selecting the appropriate configuration, users can optimize their dedicated LPR cameras based on whether they are using a Frigate+ model or the secondary LPR pipeline.

### Best practices for using Dedicated LPR camera mode[​](#best-practices-for-using-dedicated-lpr-camera-mode "Direct link to Best practices for using Dedicated LPR camera mode")

*   Tune your motion detection and increase the `contour_area` until you see only larger motion boxes being created as cars pass through the frame (likely somewhere between 50-90 for a 1920x1080 detect stream). Increasing the `contour_area` filters out small areas of motion and will prevent excessive resource use from looking for license plates in frames that don't even have a car passing through it.
*   Disable the `improve_contrast` motion setting, especially if you are running LPR at night and the frame is mostly dark. This will prevent small pixel changes and smaller areas of motion from triggering license plate detection.
*   Ensure your camera's timestamp is covered with a motion mask so that it's not incorrectly detected as a license plate.
*   For non-Frigate+ users, you may need to change your camera settings for a clearer image or decrease your global `recognition_threshold` config if your plates are not being accurately recognized at night.
*   The secondary pipeline mode runs a local AI model on your CPU or GPU (depending on how `device` is configured) to detect plates. Increasing detect `fps` will increase resource usage proportionally.

## FAQ[​](#faq "Direct link to FAQ")

### Why isn't my license plate being detected and recognized?[​](#why-isnt-my-license-plate-being-detected-and-recognized "Direct link to Why isn't my license plate being detected and recognized?")

Ensure that:

*   Your camera has a clear, human-readable, well-lit view of the plate. If you can't read the plate's characters, Frigate certainly won't be able to, even if the model is recognizing a `license_plate`. This may require changing video size, quality, or frame rate settings on your camera, depending on your scene and how fast the vehicles are traveling.
*   The plate is large enough in the image (try adjusting `min_area`) or increasing the resolution of your camera's stream.
*   Your `enhancement` level (if you've changed it from the default of `0`) is not too high. Too much enhancement will run too much denoising and cause the plate characters to become blurry and unreadable.

If you are using a Frigate+ model or a custom model that detects license plates, ensure that `license_plate` is added to your list of objects to track. If you are using the free model that ships with Frigate, you should _not_ add `license_plate` to the list of objects to track.

Recognized plates will show as object labels in the debug view and will appear in the "Recognized License Plates" select box in the More Filters popout in Explore.

If you are still having issues detecting plates, start with a basic configuration and see the debugging tips below.

### Can I run LPR without detecting `car` or `motorcycle` objects?[​](#can-i-run-lpr-without-detecting-car-or-motorcycle-objects "Direct link to can-i-run-lpr-without-detecting-car-or-motorcycle-objects")

In normal LPR mode, Frigate requires a `car` or `motorcycle` to be detected first before recognizing a license plate. If you have a dedicated LPR camera, you can change the camera `type` to `"lpr"` to use the Dedicated LPR Camera algorithm. This comes with important caveats, though. See the [Dedicated LPR Cameras](#dedicated-lpr-cameras) section above.

### How can I improve detection accuracy?[​](#how-can-i-improve-detection-accuracy "Direct link to How can I improve detection accuracy?")

*   Use high-quality cameras with good resolution.
*   Adjust `detection_threshold` and `recognition_threshold` values.
*   Define a `format` regex to filter out invalid detections.

### Does LPR work at night?[​](#does-lpr-work-at-night "Direct link to Does LPR work at night?")

Yes, but performance depends on camera quality, lighting, and infrared capabilities. Make sure your camera can capture clear images of plates at night.

### Can I limit LPR to specific zones?[​](#can-i-limit-lpr-to-specific-zones "Direct link to Can I limit LPR to specific zones?")

LPR, like other Frigate enrichments, runs at the camera level rather than the zone level. While you can't restrict LPR to specific zones directly, you can control when recognition runs by setting a `min_area` value to filter out smaller detections.

### How can I match known plates with minor variations?[​](#how-can-i-match-known-plates-with-minor-variations "Direct link to How can I match known plates with minor variations?")

Use `match_distance` to allow small character mismatches. Alternatively, define multiple variations in `known_plates`.

### How do I debug LPR issues?[​](#how-do-i-debug-lpr-issues "Direct link to How do I debug LPR issues?")

Start with ["Why isn't my license plate being detected and recognized?"](#why-isnt-my-license-plate-being-detected-and-recognized). If you are still having issues, work through these steps.

1.  Enable debug logs to see exactly what Frigate is doing.
    
    *   Enable debug logs for LPR by adding `frigate.data_processing.common.license_plate: debug` to your `logger` configuration. These logs are _very_ verbose, so only keep this enabled when necessary.
        
        ```
        logger:  default: info  logs:    frigate.data_processing.common.license_plate: debug
        ```
        
2.  Ensure your plates are being _detected_.
    
    If you are using a Frigate+ or `license_plate` detecting model:
    
    *   Watch the debug view (Settings --> Debug) to ensure that `license_plate` is being detected.
    *   View MQTT messages for `frigate/events` to verify detected plates.
    *   You may need to adjust your `min_score` and/or `threshold` for the `license_plate` object if your plates are not being detected.
    
    If you are **not** using a Frigate+ or `license_plate` detecting model:
    
    *   Watch the debug logs for messages from the YOLOv9 plate detector.
    *   You may need to adjust your `detection_threshold` if your plates are not being detected.
3.  Ensure the characters on detected plates are being _recognized_.
    
    *   Enable `debug_save_plates` to save images of detected text on plates to the clips directory (`/media/frigate/clips/lpr`). Ensure these images are readable and the text is clear.
    *   Watch the debug view to see plates recognized in real-time. For non-dedicated LPR cameras, the `car` or `motorcycle` label will change to the recognized plate when LPR is enabled and working.
    *   Adjust `recognition_threshold` settings per the suggestions [above](#advanced-configuration).

### Will LPR slow down my system?[​](#will-lpr-slow-down-my-system "Direct link to Will LPR slow down my system?")

LPR's performance impact depends on your hardware. Ensure you have at least 4GB RAM and a capable CPU or GPU for optimal results. If you are running the Dedicated LPR Camera mode, resource usage will be higher compared to users who run a model that natively detects license plates. Tune your motion detection settings for your dedicated LPR camera so that the license plate detection model runs only when necessary.

### I am seeing a YOLOv9 plate detection metric in Enrichment Metrics, but I have a Frigate+ or custom model that detects `license_plate`. Why is the YOLOv9 model running?[​](#i-am-seeing-a-yolov9-plate-detection-metric-in-enrichment-metrics-but-i-have-a-frigate-or-custom-model-that-detects-license_plate-why-is-the-yolov9-model-running "Direct link to i-am-seeing-a-yolov9-plate-detection-metric-in-enrichment-metrics-but-i-have-a-frigate-or-custom-model-that-detects-license_plate-why-is-the-yolov9-model-running")

The YOLOv9 license plate detector model will run (and the metric will appear) if you've enabled LPR but haven't defined `license_plate` as an object to track, either at the global or camera level.

If you are detecting `car` or `motorcycle` on cameras where you don't want to run LPR, make sure you disable LPR it at the camera level. And if you do want to run LPR on those cameras, make sure you define `license_plate` as an object to track.

### It looks like Frigate picked up my camera's timestamp or overlay text as the license plate. How can I prevent this?[​](#it-looks-like-frigate-picked-up-my-cameras-timestamp-or-overlay-text-as-the-license-plate-how-can-i-prevent-this "Direct link to It looks like Frigate picked up my camera's timestamp or overlay text as the license plate. How can I prevent this?")

This could happen if cars or motorcycles travel close to your camera's timestamp or overlay text. You could either move the text through your camera's firmware, or apply a mask to it in Frigate.

If you are using a model that natively detects `license_plate`, add an _object mask_ of type `license_plate` and a _motion mask_ over your text.

If you are not using a model that natively detects `license_plate` or you are using dedicated LPR camera mode, only a _motion mask_ over your text is required.

### I see "Error running ... model" in my logs. How can I fix this?[​](#i-see-error-running--model-in-my-logs-how-can-i-fix-this "Direct link to I see \"Error running ... model\" in my logs. How can I fix this?")

This usually happens when your GPU is unable to compile or use one of the LPR models. Set your `device` to `CPU` and try again. GPU acceleration only provides a slight performance increase, and the models are lightweight enough to run without issue on most CPUs.

*   [Model Requirements](#model-requirements)
*   [Minimum System Requirements](#minimum-system-requirements)
*   [Configuration](#configuration)
*   [Advanced Configuration](#advanced-configuration)
    *   [Detection](#detection)
    *   [Recognition](#recognition)
    *   [Matching](#matching)
    *   [Image Enhancement](#image-enhancement)
    *   [Debugging](#debugging)
*   [Configuration Examples](#configuration-examples)
*   [Dedicated LPR Cameras](#dedicated-lpr-cameras)
    *   [Using a Frigate+ (or Native `license_plate` Detecting) Model](#using-a-frigate-or-native-license_plate-detecting-model)
    *   [Using the Secondary LPR Pipeline (Without Frigate+)](#using-the-secondary-lpr-pipeline-without-frigate)
    *   [Summary](#summary)
    *   [Best practices for using Dedicated LPR camera mode](#best-practices-for-using-dedicated-lpr-camera-mode)
*   [FAQ](#faq)
    *   [Why isn't my license plate being detected and recognized?](#why-isnt-my-license-plate-being-detected-and-recognized)
    *   [Can I run LPR without detecting `car` or `motorcycle` objects?](#can-i-run-lpr-without-detecting-car-or-motorcycle-objects)
    *   [How can I improve detection accuracy?](#how-can-i-improve-detection-accuracy)
    *   [Does LPR work at night?](#does-lpr-work-at-night)
    *   [Can I limit LPR to specific zones?](#can-i-limit-lpr-to-specific-zones)
    *   [How can I match known plates with minor variations?](#how-can-i-match-known-plates-with-minor-variations)
    *   [How do I debug LPR issues?](#how-do-i-debug-lpr-issues)
    *   [Will LPR slow down my system?](#will-lpr-slow-down-my-system)
    *   [I am seeing a YOLOv9 plate detection metric in Enrichment Metrics, but I have a Frigate+ or custom model that detects `license_plate`. Why is the YOLOv9 model running?](#i-am-seeing-a-yolov9-plate-detection-metric-in-enrichment-metrics-but-i-have-a-frigate-or-custom-model-that-detects-license_plate-why-is-the-yolov9-model-running)
    *   [It looks like Frigate picked up my camera's timestamp or overlay text as the license plate. How can I prevent this?](#it-looks-like-frigate-picked-up-my-cameras-timestamp-or-overlay-text-as-the-license-plate-how-can-i-prevent-this)
    *   [I see "Error running ... model" in my logs. How can I fix this?](#i-see-error-running--model-in-my-logs-how-can-i-fix-this)

--- END OF FILE: configuration-live.md ---
--- START OF FILE: configuration-live.md ---

Source: https://docs.frigate.video/configuration/live

On this page

Frigate intelligently displays your camera streams on the Live view dashboard. By default, Frigate employs "smart streaming" where camera images update once per minute when no detectable activity is occurring to conserve bandwidth and resources. As soon as any motion or active objects are detected, cameras seamlessly switch to a live stream.

### Live View technologies[​](#live-view-technologies "Direct link to Live View technologies")

Frigate intelligently uses three different streaming technologies to display your camera streams on the dashboard and the single camera view, switching between available modes based on network bandwidth, player errors, or required features like two-way talk. The highest quality and fluency of the Live view requires the bundled `go2rtc` to be configured as shown in the [step by step guide](/guides/configuring_go2rtc).

The jsmpeg live view will use more browser and client GPU resources. Using go2rtc is highly recommended and will provide a superior experience.

Source

Frame Rate

Resolution

Audio

Requires go2rtc

Notes

jsmpeg

same as `detect -> fps`, capped at 10

720p

no

no

Resolution is configurable, but go2rtc is recommended if you want higher resolutions and better frame rates. jsmpeg is Frigate's default without go2rtc configured.

mse

native

native

yes (depends on audio codec)

yes

iPhone requires iOS 17.1+, Firefox is h.264 only. This is Frigate's default when go2rtc is configured.

webrtc

native

native

yes (depends on audio codec)

yes

Requires extra configuration. Frigate attempts to use WebRTC when MSE fails or when using a camera's two-way talk feature.

### Camera Settings Recommendations[​](#camera-settings-recommendations "Direct link to Camera Settings Recommendations")

If you are using go2rtc, you should adjust the following settings in your camera's firmware for the best experience with Live view:

*   Video codec: **H.264** - provides the most compatible video codec with all Live view technologies and browsers. Avoid any kind of "smart codec" or "+" codec like _H.264+_ or _H.265+_. as these non-standard codecs remove keyframes (see below).
*   Audio codec: **AAC** - provides the most compatible audio codec with all Live view technologies and browsers that support audio.
*   I-frame interval (sometimes called the keyframe interval, the interframe space, or the GOP length): match your camera's frame rate, or choose "1x" (for interframe space on Reolink cameras). For example, if your stream outputs 20fps, your i-frame interval should be 20 (or 1x on Reolink). Values higher than the frame rate will cause the stream to take longer to begin playback. See [this page](https://gardinal.net/understanding-the-keyframe-interval/) for more on keyframes. For many users this may not be an issue, but it should be noted that a 1x i-frame interval will cause more storage utilization if you are using the stream for the `record` role as well.

The default video and audio codec on your camera may not always be compatible with your browser, which is why setting them to H.264 and AAC is recommended. See the [go2rtc docs](https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#codecs-madness) for codec support information.

### Audio Support[​](#audio-support "Direct link to Audio Support")

MSE Requires PCMA/PCMU or AAC audio, WebRTC requires PCMA/PCMU or opus audio. If you want to support both MSE and WebRTC then your restream config needs to make sure both are enabled.

```
go2rtc:  streams:    rtsp_cam: # <- for RTSP streams      - rtsp://192.168.1.5:554/live0 # <- stream which supports video & aac audio      - "ffmpeg:rtsp_cam#audio=opus" # <- copy of the stream which transcodes audio to the missing codec (usually will be opus)    http_cam: # <- for http streams      - http://192.168.50.155/flv?port=1935&app=bcs&stream=channel0_main.bcs&user=user&password=password # <- stream which supports video & aac audio      - "ffmpeg:http_cam#audio=opus" # <- copy of the stream which transcodes audio to the missing codec (usually will be opus)
```

If your camera does not support AAC audio or are having problems with Live view, try transcoding to AAC audio directly:

```
go2rtc:  streams:    rtsp_cam: # <- for RTSP streams      - "ffmpeg:rtsp://192.168.1.5:554/live0#video=copy#audio=aac" # <- copies video stream and transcodes to aac audio      - "ffmpeg:rtsp_cam#audio=opus" # <- provides support for WebRTC
```

If your camera does not have audio and you are having problems with Live view, you should have go2rtc send video only:

```
go2rtc:  streams:    no_audio_camera:      - ffmpeg:rtsp://192.168.1.5:554/live0#video=copy
```

### Setting Streams For Live UI[​](#setting-streams-for-live-ui "Direct link to Setting Streams For Live UI")

You can configure Frigate to allow manual selection of the stream you want to view in the Live UI. For example, you may want to view your camera's substream on mobile devices, but the full resolution stream on desktop devices. Setting the `live -> streams` list will populate a dropdown in the UI's Live view that allows you to choose between the streams. This stream setting is _per device_ and is saved in your browser's local storage.

Additionally, when creating and editing camera groups in the UI, you can choose the stream you want to use for your camera group's Live dashboard.

note

Frigate's default dashboard ("All Cameras") will always use the first entry you've defined in `streams:` when playing live streams from your cameras.

Configure the `streams` option with a "friendly name" for your stream followed by the go2rtc stream name.

Using Frigate's internal version of go2rtc is required to use this feature. You cannot specify paths in the `streams` configuration, only go2rtc stream names.

```
go2rtc:  streams:    test_cam:      - rtsp://192.168.1.5:554/live_main # <- stream which supports video & aac audio.      - "ffmpeg:test_cam#audio=opus" # <- copy of the stream which transcodes audio to opus for webrtc    test_cam_sub:      - rtsp://192.168.1.5:554/live_sub # <- stream which supports video & aac audio.    test_cam_another_sub:      - rtsp://192.168.1.5:554/live_alt # <- stream which supports video & aac audio.cameras:  test_cam:    ffmpeg:      output_args:        record: preset-record-generic-audio-copy      inputs:        - path: rtsp://127.0.0.1:8554/test_cam # <--- the name here must match the name of the camera in restream          input_args: preset-rtsp-restream          roles:            - record        - path: rtsp://127.0.0.1:8554/test_cam_sub # <--- the name here must match the name of the camera_sub in restream          input_args: preset-rtsp-restream          roles:            - detect    live:      streams: # <--- Multiple streams for Frigate 0.16 and later        Main Stream: test_cam # <--- Specify a "friendly name" followed by the go2rtc stream name        Sub Stream: test_cam_sub        Special Stream: test_cam_another_sub
```

### WebRTC extra configuration:[​](#webrtc-extra-configuration "Direct link to WebRTC extra configuration:")

WebRTC works by creating a TCP or UDP connection on port `8555`. However, it requires additional configuration:

*   For external access, over the internet, setup your router to forward port `8555` to port `8555` on the Frigate device, for both TCP and UDP.
    
*   For internal/local access, unless you are running through the HA Add-on, you will also need to set the WebRTC candidates list in the go2rtc config. For example, if `192.168.1.10` is the local IP of the device running Frigate:
    
    config.yml
    
    ```
    go2rtc:  streams:    test_cam: ...  webrtc:    candidates:      - 192.168.1.10:8555      - stun:8555
    ```
    
*   For access through Tailscale, the Frigate system's Tailscale IP must be added as a WebRTC candidate. Tailscale IPs all start with `100.`, and are reserved within the `100.64.0.0/10` CIDR block.
    
*   Note that some browsers may not support H.265 (HEVC). You can check your browser's current version for H.265 compatibility [here](https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#codecs-madness).
    

tip

This extra configuration may not be required if Frigate has been installed as a Home Assistant Add-on, as Frigate uses the Supervisor's API to generate a WebRTC candidate.

However, it is recommended if issues occur to define the candidates manually. You should do this if the Frigate Add-on fails to generate a valid candidate. If an error occurs you will see some warnings like the below in the Add-on logs page during the initialization:

```
[WARN] Failed to get IP address from supervisor[WARN] Failed to get WebRTC port from supervisor
```

note

If you are having difficulties getting WebRTC to work and you are running Frigate with docker, you may want to try changing the container network mode:

*   `network: host`, in this mode you don't need to forward any ports. The services inside of the Frigate container will have full access to the network interfaces of your host machine as if they were running natively and not in a container. Any port conflicts will need to be resolved. This network mode is recommended by go2rtc, but we recommend you only use it if necessary.
*   `network: bridge` is the default network driver, a bridge network is a Link Layer device which forwards traffic between network segments. You need to forward any ports that you want to be accessible from the host IP.

If not running in host mode, port 8555 will need to be mapped for the container:

docker-compose.yml

```
services:  frigate:    ...    ports:      - "8555:8555/tcp" # WebRTC over tcp      - "8555:8555/udp" # WebRTC over udp
```

See [go2rtc WebRTC docs](https://github.com/AlexxIT/go2rtc/tree/v1.8.3#module-webrtc) for more information about this.

### Two way talk[​](#two-way-talk "Direct link to Two way talk")

For devices that support two way talk, Frigate can be configured to use the feature from the camera's Live view in the Web UI. You should:

*   Set up go2rtc with [WebRTC](#webrtc-extra-configuration).
*   Ensure you access Frigate via https (may require [opening port 8971](/frigate/installation/#ports)).
*   For the Home Assistant Frigate card, [follow the docs](http://card.camera/#/usage/2-way-audio) for the correct source.

To use the Reolink Doorbell with two way talk, you should use the [recommended Reolink configuration](/configuration/camera_specific#reolink-cameras)

### Streaming options on camera group dashboards[​](#streaming-options-on-camera-group-dashboards "Direct link to Streaming options on camera group dashboards")

Frigate provides a dialog in the Camera Group Edit pane with several options for streaming on a camera group's dashboard. These settings are _per device_ and are saved in your device's local storage.

*   Stream selection using the `live -> streams` configuration option (see _Setting Streams For Live UI_ above)
*   Streaming type:
    *   _No streaming_: Camera images will only update once per minute and no live streaming will occur.
    *   _Smart Streaming_ (default, recommended setting): Smart streaming will update your camera image once per minute when no detectable activity is occurring to conserve bandwidth and resources, since a static picture is the same as a streaming image with no motion or objects. When motion or objects are detected, the image seamlessly switches to a live stream.
    *   _Continuous Streaming_: Camera image will always be a live stream when visible on the dashboard, even if no activity is being detected. Continuous streaming may cause high bandwidth usage and performance issues. **Use with caution.**
*   _Compatibility mode_: Enable this option only if your camera's live stream is displaying color artifacts and has a diagonal line on the right side of the image. Before enabling this, try setting your camera's `detect` width and height to a standard aspect ratio (for example: 640x352 becomes 640x360, and 800x443 becomes 800x450, 2688x1520 becomes 2688x1512, etc). Depending on your browser and device, more than a few cameras in compatibility mode may not be supported, so only use this option if changing your config fails to resolve the color artifacts and diagonal line.

note

The default dashboard ("All Cameras") will always use:

*   Smart Streaming, unless you've disabled the global Automatic Live View in Settings.
*   The first entry set in your `streams` configuration, if defined.

Use a camera group if you want to change any of these settings from the defaults.

### Disabling cameras[​](#disabling-cameras "Direct link to Disabling cameras")

Cameras can be temporarily disabled through the Frigate UI and through [MQTT](/integrations/mqtt#frigatecamera_nameenabledset) to conserve system resources. When disabled, Frigate's ffmpeg processes are terminated — recording stops, object detection is paused, and the Live dashboard displays a blank image with a disabled message. Review items, tracked objects, and historical footage for disabled cameras can still be accessed via the UI.

note

Disabling a camera via the Frigate UI or MQTT is temporary and does not persist through restarts of Frigate.

For restreamed cameras, go2rtc remains active but does not use system resources for decoding or processing unless there are active external consumers (such as the Advanced Camera Card in Home Assistant using a go2rtc source).

Note that disabling a camera through the config file (`enabled: False`) removes all related UI elements, including historical footage access. To retain access while disabling the camera, keep it enabled in the config and use the UI or MQTT to disable it temporarily.

## Live view FAQ[​](#live-view-faq "Direct link to Live view FAQ")

1.  **Why don't I have audio in my Live view?**
    
    You must use go2rtc to hear audio in your live streams. If you have go2rtc already configured, you need to ensure your camera is sending PCMA/PCMU or AAC audio. If you can't change your camera's audio codec, you need to [transcode the audio](https://github.com/AlexxIT/go2rtc?tab=readme-ov-file#source-ffmpeg) using go2rtc.
    
    Note that the low bandwidth mode player is a video-only stream. You should not expect to hear audio when in low bandwidth mode, even if you've set up go2rtc.
    
2.  **Frigate shows that my live stream is in "low bandwidth mode". What does this mean?**
    
    Frigate intelligently selects the live streaming technology based on a number of factors (user-selected modes like two-way talk, camera settings, browser capabilities, available bandwidth) and prioritizes showing an actual up-to-date live view of your camera's stream as quickly as possible.
    
    When you have go2rtc configured, Live view initially attempts to load and play back your stream with a clearer, fluent stream technology (MSE). An initial timeout, a low bandwidth condition that would cause buffering of the stream, or decoding errors in the stream will cause Frigate to switch to the stream defined by the `detect` role, using the jsmpeg format. This is what the UI labels as "low bandwidth mode". On Live dashboards, the mode will automatically reset when smart streaming is configured and activity stops. Continuous streaming mode does not have an automatic reset mechanism, but you can use the _Reset_ option to force a reload of your stream.
    
    If you are using continuous streaming or you are loading more than a few high resolution streams at once on the dashboard, your browser may struggle to begin playback of your streams before the timeout. Frigate always prioritizes showing a live stream as quickly as possible, even if it is a lower quality jsmpeg stream. You can use the "Reset" link/button to try loading your high resolution stream again.
    
    If you are still experiencing Frigate falling back to low bandwidth mode, you may need to adjust your camera's settings per the [recommendations above](#camera_settings_recommendations).
    
3.  **It doesn't seem like my cameras are streaming on the Live dashboard. Why?**
    
    On the default Live dashboard ("All Cameras"), your camera images will update once per minute when no detectable activity is occurring to conserve bandwidth and resources. As soon as any activity is detected, cameras seamlessly switch to a full-resolution live stream. If you want to customize this behavior, use a camera group.
    
4.  **I see a strange diagonal line on my live view, but my recordings look fine. How can I fix it?**
    
    This is caused by incorrect dimensions set in your detect width or height (or incorrectly auto-detected), causing the jsmpeg player's rendering engine to display a slightly distorted image. You should enlarge the width and height of your `detect` resolution up to a standard aspect ratio (example: 640x352 becomes 640x360, and 800x443 becomes 800x450, 2688x1520 becomes 2688x1512, etc). If changing the resolution to match a standard (4:3, 16:9, or 32:9, etc) aspect ratio does not solve the issue, you can enable "compatibility mode" in your camera group dashboard's stream settings. Depending on your browser and device, more than a few cameras in compatibility mode may not be supported, so only use this option if changing your `detect` width and height fails to resolve the color artifacts and diagonal line.
    
5.  **How does "smart streaming" work?**
    
    Because a static image of a scene looks exactly the same as a live stream with no motion or activity, smart streaming updates your camera images once per minute when no detectable activity is occurring to conserve bandwidth and resources. As soon as any activity (motion or object/audio detection) occurs, cameras seamlessly switch to a live stream.
    
    This static image is pulled from the stream defined in your config with the `detect` role. When activity is detected, images from the `detect` stream immediately begin updating at ~5 frames per second so you can see the activity until the live player is loaded and begins playing. This usually only takes a second or two. If the live player times out, buffers, or has streaming errors, the jsmpeg player is loaded and plays a video-only stream from the `detect` role. When activity ends, the players are destroyed and a static image is displayed until activity is detected again, and the process repeats.
    
    Smart streaming depends on having your camera's motion `threshold` and `contour_area` config values dialed in. Use the Motion Tuner in Settings in the UI to tune these values in real-time.
    
    This is Frigate's default and recommended setting because it results in a significant bandwidth savings, especially for high resolution cameras.
    
6.  **I have unmuted some cameras on my dashboard, but I do not hear sound. Why?**
    
    If your camera is streaming (as indicated by a red dot in the upper right, or if it has been set to continuous streaming mode), your browser may be blocking audio until you interact with the page. This is an intentional browser limitation. See [this article](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#autoplay_availability). Many browsers have a whitelist feature to change this behavior.
    
7.  **My camera streams have lots of visual artifacts / distortion.**
    
    Some cameras don't include the hardware to support multiple connections to the high resolution stream, and this can cause unexpected behavior. In this case it is recommended to [restream](/configuration/restream) the high resolution stream so that it can be used for live view and recordings.
    

*   [Live View technologies](#live-view-technologies)
*   [Camera Settings Recommendations](#camera-settings-recommendations)
*   [Audio Support](#audio-support)
*   [Setting Streams For Live UI](#setting-streams-for-live-ui)
*   [WebRTC extra configuration:](#webrtc-extra-configuration)
*   [Two way talk](#two-way-talk)
*   [Streaming options on camera group dashboards](#streaming-options-on-camera-group-dashboards)
*   [Disabling cameras](#disabling-cameras)
*   [Live view FAQ](#live-view-faq)

--- END OF FILE: configuration-masks.md ---
--- START OF FILE: configuration-masks.md ---

Source: https://docs.frigate.video/configuration/masks

On this page

## Motion masks[​](#motion-masks "Direct link to Motion masks")

Motion masks are used to prevent unwanted types of motion from triggering detection. Try watching the Debug feed (Settings --> Debug) with `Motion Boxes` enabled to see what may be regularly detected as motion. For example, you want to mask out your timestamp, the sky, rooftops, etc. Keep in mind that this mask only prevents motion from being detected and does not prevent objects from being detected if object detection was started due to motion in unmasked areas. Motion is also used during object tracking to refine the object detection area in the next frame. _Over-masking will make it more difficult for objects to be tracked._

See [further clarification](#further-clarification) below on why you may not want to use a motion mask.

## Object filter masks[​](#object-filter-masks "Direct link to Object filter masks")

Object filter masks are used to filter out false positives for a given object type based on location. These should be used to filter any areas where it is not possible for an object of that type to be. The bottom center of the detected object's bounding box is evaluated against the mask. If it is in a masked area, it is assumed to be a false positive. For example, you may want to mask out rooftops, walls, the sky, treetops for people. For cars, masking locations other than the street or your driveway will tell Frigate that anything in your yard is a false positive.

Object filter masks can be used to filter out stubborn false positives in fixed locations. For example, the base of this tree may be frequently detected as a person. The following image shows an example of an object filter mask (shaded red area) over the location where the bottom center is typically located to filter out person detections in a precise location.

![object mask](/assets/images/bottom-center-mask-057616b2b7d545688f32b2eb9a857b7d.jpg)

## Using the mask creator[​](#using-the-mask-creator "Direct link to Using the mask creator")

To create a poly mask:

1.  Visit the Web UI
2.  Click/tap the gear icon and open "Settings"
3.  Select "Mask / zone editor"
4.  At the top right, select the camera you wish to create a mask or zone for
5.  Click the plus icon under the type of mask or zone you would like to create
6.  Click on the camera's latest image to create the points for a masked area. Click the first point again to close the polygon.
7.  When you've finished creating your mask, press Save.
8.  Restart Frigate to apply your changes.

Your config file will be updated with the relative coordinates of the mask/zone:

```
motion:  mask: "0.000,0.427,0.002,0.000,0.999,0.000,0.999,0.781,0.885,0.456,0.700,0.424,0.701,0.311,0.507,0.294,0.453,0.347,0.451,0.400"
```

Multiple masks can be listed in your config.

```
motion:  mask:    - 0.239,1.246,0.175,0.901,0.165,0.805,0.195,0.802    - 0.000,0.427,0.002,0.000,0.999,0.000,0.999,0.781,0.885,0.456
```

### Further Clarification[​](#further-clarification "Direct link to Further Clarification")

This is a response to a [question posed on reddit](https://www.reddit.com/r/homeautomation/comments/ppxdve/replacing_my_doorbell_with_a_security_camera_a_6/hd876w4?utm_source=share&utm_medium=web2x&context=3):

It is helpful to understand a bit about how Frigate uses motion detection and object detection together.

First, Frigate uses motion detection as a first line check to see if there is anything happening in the frame worth checking with object detection.

Once motion is detected, it tries to group up nearby areas of motion together in hopes of identifying a rectangle in the image that will capture the area worth inspecting. These are the red "motion boxes" you see in the debug viewer.

After the area with motion is identified, Frigate creates a "region" (the green boxes in the debug viewer) to run object detection on. The models are trained on square images, so these regions are always squares. It adds a margin around the motion area in hopes of capturing a cropped view of the object moving that fills most of the image passed to object detection, but doesn't cut anything off. It also takes into consideration the location of the bounding box from the previous frame if it is tracking an object.

After object detection runs, if there are detected objects that seem to be cut off, Frigate reframes the region and runs object detection again on the same frame to get a better look.

All of this happens for each area of motion and tracked object.

> Are you simply saying that INITIAL triggering of any kind of detection will only happen in un-masked areas, but that once this triggering happens, the masks become irrelevant and object detection takes precedence?

Essentially, yes. I wouldn't describe it as object detection taking precedence though. The motion masks just prevent those areas from being counted as motion. Those masks do not modify the regions passed to object detection in any way, so you can absolutely detect objects in areas masked for motion.

> If so, this is completely expected and intuitive behavior for me. Because obviously if a "foot" starts motion detection the camera should be able to check if it's an entire person before it fully crosses into the zone. The docs imply this is the behavior, so I also don't understand why this would be detrimental to object detection on the whole.

When just a foot is triggering motion, Frigate will zoom in and look only at the foot. If that even qualifies as a person, it will determine the object is being cut off and look again and again until it zooms back out enough to find the whole person.

It is also detrimental to how Frigate tracks a moving object. Motion nearby the bounding box from the previous frame is used to intelligently determine where the region should be in the next frame. With too much masking, tracking is hampered and if an object walks from an unmasked area into a fully masked area, they essentially disappear and will be picked up as a "new" object if they leave the masked area. This is important because Frigate uses the history of scores while tracking an object to determine if it is a false positive or not. It takes a minimum of 3 frames for Frigate to determine is the object type it thinks it is, and the median score must be greater than the threshold. If a person meets this threshold while on the sidewalk before they walk into your stoop, you will get an alert the instant they step a single foot into a zone.

> I thought the main point of this feature was to cut down on CPU use when motion is happening in unnecessary areas.

It is, but the definition of "unnecessary" varies. I want to ignore areas of motion that I know are definitely not being triggered by objects of interest. Timestamps, trees, sky, rooftops. I don't want to ignore motion from objects that I want to track and know where they go.

> For me, giving my masks ANY padding results in a lot of people detection I'm not interested in. I live in the city and catch a lot of the sidewalk on my camera. People walk by my front door all the time and the margin between the sidewalk and actually walking onto my stoop is very thin, so I basically have everything but the exact contours of my stoop masked out. This results in very tidy detections but this info keeps throwing me off. Am I just overthinking it?

This is what `required_zones` are for. You should define a zone (remember this is evaluated based on the bottom center of the bounding box) and make it required to save snapshots and clips (previously events in 0.9.0 to 0.13.0 and review items in 0.14.0 and later). You can also use this in your conditions for a notification.

> Maybe my specific situation just warrants this. I've just been having a hard time understanding the relevance of this information - it seems to be that it's exactly what would be expected when "masking out" an area of ANY image.

That may be the case for you. Frigate will definitely work harder tracking people on the sidewalk to make sure it doesn't miss anyone who steps foot on your stoop. The trade off with the way you have it now is slower recognition of objects and potential misses. That may be acceptable based on your needs. Also, if your resolution is low enough on the detect stream, your regions may already be so big that they grab the entire object anyway.

*   [Motion masks](#motion-masks)
*   [Object filter masks](#object-filter-masks)
*   [Using the mask creator](#using-the-mask-creator)
    *   [Further Clarification](#further-clarification)

--- END OF FILE: configuration-metrics.md ---
--- START OF FILE: configuration-metrics.md ---

Source: https://docs.frigate.video/configuration/metrics

On this page

Frigate exposes Prometheus metrics at the `/api/metrics` endpoint that can be used to monitor the performance and health of your Frigate instance.

## Available Metrics[​](#available-metrics "Direct link to Available Metrics")

### System Metrics[​](#system-metrics "Direct link to System Metrics")

*   `frigate_cpu_usage_percent{pid="", name="", process="", type="", cmdline=""}` - Process CPU usage percentage
*   `frigate_mem_usage_percent{pid="", name="", process="", type="", cmdline=""}` - Process memory usage percentage
*   `frigate_gpu_usage_percent{gpu_name=""}` - GPU utilization percentage
*   `frigate_gpu_mem_usage_percent{gpu_name=""}` - GPU memory usage percentage

### Camera Metrics[​](#camera-metrics "Direct link to Camera Metrics")

*   `frigate_camera_fps{camera_name=""}` - Frames per second being consumed from your camera
*   `frigate_detection_fps{camera_name=""}` - Number of times detection is run per second
*   `frigate_process_fps{camera_name=""}` - Frames per second being processed
*   `frigate_skipped_fps{camera_name=""}` - Frames per second skipped for processing
*   `frigate_detection_enabled{camera_name=""}` - Detection enabled status for camera
*   `frigate_audio_dBFS{camera_name=""}` - Audio dBFS for camera
*   `frigate_audio_rms{camera_name=""}` - Audio RMS for camera

### Detector Metrics[​](#detector-metrics "Direct link to Detector Metrics")

*   `frigate_detector_inference_speed_seconds{name=""}` - Time spent running object detection in seconds
*   `frigate_detection_start{name=""}` - Detector start time (unix timestamp)

### Storage Metrics[​](#storage-metrics "Direct link to Storage Metrics")

*   `frigate_storage_free_bytes{storage=""}` - Storage free bytes
*   `frigate_storage_total_bytes{storage=""}` - Storage total bytes
*   `frigate_storage_used_bytes{storage=""}` - Storage used bytes
*   `frigate_storage_mount_type{mount_type="", storage=""}` - Storage mount type info

### Service Metrics[​](#service-metrics "Direct link to Service Metrics")

*   `frigate_service_uptime_seconds` - Uptime in seconds
*   `frigate_service_last_updated_timestamp` - Stats recorded time (unix timestamp)
*   `frigate_device_temperature{device=""}` - Device Temperature

### Event Metrics[​](#event-metrics "Direct link to Event Metrics")

*   `frigate_camera_events{camera="", label=""}` - Count of camera events since exporter started

## Configuring Prometheus[​](#configuring-prometheus "Direct link to Configuring Prometheus")

To scrape metrics from Frigate, add the following to your Prometheus configuration:

```
scrape_configs:  - job_name: 'frigate'    metrics_path: '/api/metrics'    static_configs:      - targets: ['frigate:5000']    scrape_interval: 15s
```

## Example Queries[​](#example-queries "Direct link to Example Queries")

Here are some example PromQL queries that might be useful:

```
# Average CPU usage across all processesavg(frigate_cpu_usage_percent)# Total GPU memory usagesum(frigate_gpu_mem_usage_percent)# Detection FPS by camerarate(frigate_detection_fps{camera_name="front_door"}[5m])# Storage usage percentage(frigate_storage_used_bytes / frigate_storage_total_bytes) * 100# Event count by camera in last hourincrease(frigate_camera_events[1h])
```

## Grafana Dashboard[​](#grafana-dashboard "Direct link to Grafana Dashboard")

You can use these metrics to create Grafana dashboards to monitor your Frigate instance. Here's an example of metrics you might want to track:

*   CPU, Memory and GPU usage over time
*   Camera FPS and detection rates
*   Storage usage and trends
*   Event counts by camera
*   System temperatures

A sample Grafana dashboard JSON will be provided in a future update.

## Metric Types[​](#metric-types "Direct link to Metric Types")

The metrics exposed by Frigate use the following Prometheus metric types:

*   **Counter**: Cumulative values that only increase (e.g., `frigate_camera_events`)
*   **Gauge**: Values that can go up and down (e.g., `frigate_cpu_usage_percent`)
*   **Info**: Key-value pairs for metadata (e.g., `frigate_storage_mount_type`)

For more information about Prometheus metric types, see the [Prometheus documentation](https://prometheus.io/docs/concepts/metric_types/).

*   [Available Metrics](#available-metrics)
    *   [System Metrics](#system-metrics)
    *   [Camera Metrics](#camera-metrics)
    *   [Detector Metrics](#detector-metrics)
    *   [Storage Metrics](#storage-metrics)
    *   [Service Metrics](#service-metrics)
    *   [Event Metrics](#event-metrics)
*   [Configuring Prometheus](#configuring-prometheus)
*   [Example Queries](#example-queries)
*   [Grafana Dashboard](#grafana-dashboard)
*   [Metric Types](#metric-types)

--- END OF FILE: configuration-motion_detection.md ---
--- START OF FILE: configuration-motion_detection.md ---

Source: https://docs.frigate.video/configuration/motion_detection

On this page

Frigate uses motion detection as a first line check to see if there is anything happening in the frame worth checking with object detection.

Once motion is detected, it tries to group up nearby areas of motion together in hopes of identifying a rectangle in the image that will capture the area worth inspecting. These are the red "motion boxes" you see in the debug viewer.

## The Goal[​](#the-goal "Direct link to The Goal")

The default motion settings should work well for the majority of cameras, however there are cases where tuning motion detection can lead to better and more optimal results. Each camera has its own environment with different variables that affect motion, this means that the same motion settings will not fit all of your cameras.

Before tuning motion it is important to understand the goal. In an optimal configuration, motion from people and cars would be detected, but not grass moving, lighting changes, timestamps, etc. If your motion detection is too sensitive, you will experience higher CPU loads and greater false positives from the increased rate of object detection. If it is not sensitive enough, you will miss objects that you want to track.

## Create Motion Masks[​](#create-motion-masks "Direct link to Create Motion Masks")

First, mask areas with regular motion not caused by the objects you want to detect. The best way to find candidates for motion masks is by watching the debug stream with motion boxes enabled. Good use cases for motion masks are timestamps or tree limbs and large bushes that regularly move due to wind. When possible, avoid creating motion masks that would block motion detection for objects you want to track **even if they are in locations where you don't want alerts or detections**. Motion masks should not be used to avoid detecting objects in specific areas. More details can be found [in the masks docs.](/configuration/masks).

## Prepare For Testing[​](#prepare-for-testing "Direct link to Prepare For Testing")

The easiest way to tune motion detection is to use the Frigate UI under Settings > Motion Tuner. This screen allows the changing of motion detection values live to easily see the immediate effect on what is detected as motion.

## Tuning Motion Detection During The Day[​](#tuning-motion-detection-during-the-day "Direct link to Tuning Motion Detection During The Day")

Now that things are set up, find a time to tune that represents normal circumstances. For example, if you tune your motion on a day that is sunny and windy you may find later that the motion settings are not sensitive enough on a cloudy and still day.

note

Remember that motion detection is just used to determine when object detection should be used. You should aim to have motion detection sensitive enough that you won't miss objects you want to detect with object detection. The goal is to prevent object detection from running constantly for every small pixel change in the image. Windy days are still going to result in lots of motion being detected.

### Threshold[​](#threshold "Direct link to Threshold")

The threshold value dictates how much of a change in a pixels luminance is required to be considered motion.

```
# default threshold valuemotion:  # Optional: The threshold passed to cv2.threshold to determine if a pixel is different enough to be counted as motion. (default: shown below)  # Increasing this value will make motion detection less sensitive and decreasing it will make motion detection more sensitive.  # The value should be between 1 and 255.  threshold: 30
```

Lower values mean motion detection is more sensitive to changes in color, making it more likely for example to detect motion when a brown dogs blends in with a brown fence or a person wearing a red shirt blends in with a red car. If the threshold is too low however, it may detect things like grass blowing in the wind, shadows, etc. to be detected as motion.

Watching the motion boxes in the debug view, increase the threshold until you only see motion that is visible to the eye. Once this is done, it is important to test and ensure that desired motion is still detected.

### Contour Area[​](#contour-area "Direct link to Contour Area")

```
# default contour_area valuemotion:  # Optional: Minimum size in pixels in the resized motion image that counts as motion (default: shown below)  # Increasing this value will prevent smaller areas of motion from being detected. Decreasing will  # make motion detection more sensitive to smaller moving objects.  # As a rule of thumb:  #  - 10 - high sensitivity  #  - 30 - medium sensitivity  #  - 50 - low sensitivity  contour_area: 10
```

Once the threshold calculation is run, the pixels that have changed are grouped together. The contour area value is used to decide which groups of changed pixels qualify as motion. Smaller values are more sensitive meaning people that are far away, small animals, etc. are more likely to be detected as motion, but it also means that small changes in shadows, leaves, etc. are detected as motion. Higher values are less sensitive meaning these things won't be detected as motion but with the risk that desired motion won't be detected until closer to the camera.

Watching the motion boxes in the debug view, adjust the contour area until there are no motion boxes smaller than the smallest you'd expect frigate to detect something moving.

### Improve Contrast[​](#improve-contrast "Direct link to Improve Contrast")

At this point if motion is working as desired there is no reason to continue with tuning for the day. If you were unable to find a balance between desired and undesired motion being detected, you can try disabling improve contrast and going back to the threshold and contour area steps.

## Tuning Motion Detection During The Night[​](#tuning-motion-detection-during-the-night "Direct link to Tuning Motion Detection During The Night")

Once daytime motion detection is tuned, there is a chance that the settings will work well for motion detection during the night as well. If this is the case then the preferred settings can be written to the config file and left alone.

However, if the preferred day settings do not work well at night it is recommended to use Home Assistant or some other solution to automate changing the settings. That way completely separate sets of motion settings can be used for optimal day and night motion detection.

## Tuning For Large Changes In Motion[​](#tuning-for-large-changes-in-motion "Direct link to Tuning For Large Changes In Motion")

```
# default lightning_threshold:motion:  # Optional: The percentage of the image used to detect lightning or other substantial changes where motion detection  #           needs to recalibrate. (default: shown below)  # Increasing this value will make motion detection more likely to consider lightning or ir mode changes as valid motion.  # Decreasing this value will make motion detection more likely to ignore large amounts of motion such as a person approaching  # a doorbell camera.  lightning_threshold: 0.8
```

warning

Some cameras like doorbell cameras may have missed detections when someone walks directly in front of the camera and the lightning\_threshold causes motion detection to be re-calibrated. In this case, it may be desirable to increase the `lightning_threshold` to ensure these objects are not missed.

note

Lightning threshold does not stop motion based recordings from being saved.

Large changes in motion like PTZ moves and camera switches between Color and IR mode should result in a pause in object detection. This is done via the `lightning_threshold` configuration. It is defined as the percentage of the image used to detect lightning or other substantial changes where motion detection needs to recalibrate. Increasing this value will make motion detection more likely to consider lightning or IR mode changes as valid motion. Decreasing this value will make motion detection more likely to ignore large amounts of motion such as a person approaching a doorbell camera.

*   [The Goal](#the-goal)
*   [Create Motion Masks](#create-motion-masks)
*   [Prepare For Testing](#prepare-for-testing)
*   [Tuning Motion Detection During The Day](#tuning-motion-detection-during-the-day)
    *   [Threshold](#threshold)
    *   [Contour Area](#contour-area)
    *   [Improve Contrast](#improve-contrast)
*   [Tuning Motion Detection During The Night](#tuning-motion-detection-during-the-night)
*   [Tuning For Large Changes In Motion](#tuning-for-large-changes-in-motion)

--- END OF FILE: configuration-notifications.md ---
--- START OF FILE: configuration-notifications.md ---

Source: https://docs.frigate.video/configuration/notifications

On this page

Frigate offers native notifications using the [WebPush Protocol](https://web.dev/articles/push-notifications-web-push-protocol) which uses the [VAPID spec](https://tools.ietf.org/html/draft-thomson-webpush-vapid) to deliver notifications to web apps using encryption.

## Setting up Notifications[​](#setting-up-notifications "Direct link to Setting up Notifications")

In order to use notifications the following requirements must be met:

*   Frigate must be accessed via a secure `https` connection ([see the authorization docs](/configuration/authentication)).
*   A supported browser must be used. Currently Chrome, Firefox, and Safari are known to be supported.
*   In order for notifications to be usable externally, Frigate must be accessible externally.
*   For iOS devices, some users have also indicated that the Notifications switch needs to be enabled in iOS Settings --> Apps --> Safari --> Advanced --> Features.

### Configuration[​](#configuration "Direct link to Configuration")

To configure notifications, go to the Frigate WebUI -> Settings -> Notifications and enable, then fill out the fields and save.

Optionally, you can change the default cooldown period for notifications through the `cooldown` parameter in your config file. This parameter can also be overridden at the camera level.

Notifications will be prevented if either:

*   The global cooldown period hasn't elapsed since any camera's last notification
*   The camera-specific cooldown period hasn't elapsed for the specific camera

```
notifications:  enabled: True  email: "johndoe@gmail.com"  cooldown: 10 # wait 10 seconds before sending another notification from any camera
```

```
cameras:  doorbell:    ...    notifications:      enabled: True      cooldown: 30 # wait 30 seconds before sending another notification from the doorbell camera
```

### Registration[​](#registration "Direct link to Registration")

Once notifications are enabled, press the `Register for Notifications` button on all devices that you would like to receive notifications on. This will register the background worker. After this Frigate must be restarted and then notifications will begin to be sent.

## Supported Notifications[​](#supported-notifications "Direct link to Supported Notifications")

Currently notifications are only supported for review alerts. More notifications will be supported in the future.

note

Currently, only Chrome supports images in notifications. Safari and Firefox will only show a title and message in the notification.

## Reduce Notification Latency[​](#reduce-notification-latency "Direct link to Reduce Notification Latency")

Different platforms handle notifications differently, some settings changes may be required to get optimal notification delivery.

### Android[​](#android "Direct link to Android")

Most Android phones have battery optimization settings. To get reliable Notification delivery the browser (Chrome, Firefox) should have battery optimizations disabled. If Frigate is running as a PWA then the Frigate app should have battery optimizations disabled as well.

*   [Setting up Notifications](#setting-up-notifications)
    *   [Configuration](#configuration)
    *   [Registration](#registration)
*   [Supported Notifications](#supported-notifications)
*   [Reduce Notification Latency](#reduce-notification-latency)
    *   [Android](#android)

--- END OF FILE: configuration-object_detectors.md ---
--- START OF FILE: configuration-object_detectors.md ---

Source: https://docs.frigate.video/configuration/object_detectors

On this page

info

Frigate supports multiple different detectors that work on different types of hardware:

**Most Hardware**

*   [Coral EdgeTPU](#edge-tpu-detector): The Google Coral EdgeTPU is available in USB and m.2 format allowing for a wide range of compatibility with devices.
*   [Hailo](#hailo-8): The Hailo8 and Hailo8L AI Acceleration module is available in m.2 format with a HAT for RPi devices, offering a wide range of compatibility with devices.

**AMD**

*   [ROCm](#amdrocm-gpu-detector): ROCm can run on AMD Discrete GPUs to provide efficient object detection.
*   [ONNX](#onnx): ROCm will automatically be detected and used as a detector in the `-rocm` Frigate image when a supported ONNX model is configured.

**Intel**

*   [OpenVino](#openvino-detector): OpenVino can run on Intel Arc GPUs, Intel integrated GPUs, and Intel CPUs to provide efficient object detection.
*   [ONNX](#onnx): OpenVINO will automatically be detected and used as a detector in the default Frigate image when a supported ONNX model is configured.

**Nvidia GPU**

*   [ONNX](#onnx): TensorRT will automatically be detected and used as a detector in the `-tensorrt` Frigate image when a supported ONNX model is configured.

**Nvidia Jetson**

*   [TensortRT](#nvidia-tensorrt-detector): TensorRT can run on Jetson devices, using one of many default models.
*   [ONNX](#onnx): TensorRT will automatically be detected and used as a detector in the `-tensorrt-jp6` Frigate image when a supported ONNX model is configured.

**Rockchip**

*   [RKNN](#rockchip-platform): RKNN models can run on Rockchip devices with included NPUs.

**For Testing**

*   [CPU Detector (not recommended for actual use](#cpu-detector-not-recommended): Use a CPU to run tflite model, this is not recommended and in most cases OpenVINO can be used in CPU mode with better results.

note

Multiple detectors can not be mixed for object detection (ex: OpenVINO and Coral EdgeTPU can not be used for object detection at the same time).

This does not affect using hardware for accelerating other tasks such as [semantic search](/configuration/semantic_search)

# Officially Supported Detectors

Frigate provides the following builtin detector types: `cpu`, `edgetpu`, `hailo8l`, `onnx`, `openvino`, `rknn`, and `tensorrt`. By default, Frigate will use a single CPU detector. Other detectors may require additional configuration as described below. When using multiple detectors they will run in dedicated processes, but pull from a common queue of detection requests from across all cameras.

## Edge TPU Detector[​](#edge-tpu-detector "Direct link to Edge TPU Detector")

The Edge TPU detector type runs a TensorFlow Lite model utilizing the Google Coral delegate for hardware acceleration. To configure an Edge TPU detector, set the `"type"` attribute to `"edgetpu"`.

The Edge TPU device can be specified using the `"device"` attribute according to the [Documentation for the TensorFlow Lite Python API](https://coral.ai/docs/edgetpu/multiple-edgetpu/#using-the-tensorflow-lite-python-api). If not set, the delegate will use the first device it finds.

A TensorFlow Lite model is provided in the container at `/edgetpu_model.tflite` and is used by this detector type by default. To provide your own model, bind mount the file into the container and provide the path with `model.path`.

tip

See [common Edge TPU troubleshooting steps](/troubleshooting/edgetpu) if the Edge TPU is not detected.

### Single USB Coral[​](#single-usb-coral "Direct link to Single USB Coral")

```
detectors:  coral:    type: edgetpu    device: usb
```

### Multiple USB Corals[​](#multiple-usb-corals "Direct link to Multiple USB Corals")

```
detectors:  coral1:    type: edgetpu    device: usb:0  coral2:    type: edgetpu    device: usb:1
```

### Native Coral (Dev Board)[​](#native-coral-dev-board "Direct link to Native Coral (Dev Board)")

_warning: may have [compatibility issues](https://github.com/blakeblackshear/frigate/issues/1706) after `v0.9.x`_

```
detectors:  coral:    type: edgetpu    device: ""
```

### Single PCIE/M.2 Coral[​](#single-pciem2-coral "Direct link to Single PCIE/M.2 Coral")

```
detectors:  coral:    type: edgetpu    device: pci
```

### Multiple PCIE/M.2 Corals[​](#multiple-pciem2-corals "Direct link to Multiple PCIE/M.2 Corals")

```
detectors:  coral1:    type: edgetpu    device: pci:0  coral2:    type: edgetpu    device: pci:1
```

### Mixing Corals[​](#mixing-corals "Direct link to Mixing Corals")

```
detectors:  coral_usb:    type: edgetpu    device: usb  coral_pci:    type: edgetpu    device: pci
```

* * *

## Hailo-8[​](#hailo-8 "Direct link to Hailo-8")

This detector is available for use with both Hailo-8 and Hailo-8L AI Acceleration Modules. The integration automatically detects your hardware architecture via the Hailo CLI and selects the appropriate default model if no custom model is specified.

See the [installation docs](/frigate/installation#hailo-8l) for information on configuring the Hailo hardware.

### Configuration[​](#configuration "Direct link to Configuration")

When configuring the Hailo detector, you have two options to specify the model: a local **path** or a **URL**. If both are provided, the detector will first check for the model at the given local path. If the file is not found, it will download the model from the specified URL. The model file is cached under `/config/model_cache/hailo`.

#### YOLO[​](#yolo "Direct link to YOLO")

Use this configuration for YOLO-based models. When no custom model path or URL is provided, the detector automatically downloads the default model based on the detected hardware:

*   **Hailo-8 hardware:** Uses **YOLOv6n** (default: `yolov6n.hef`)
*   **Hailo-8L hardware:** Uses **YOLOv6n** (default: `yolov6n.hef`)

```
detectors:  hailo:    type: hailo8l    device: PCIemodel:  width: 320  height: 320  input_tensor: nhwc  input_pixel_format: rgb  input_dtype: int  model_type: yolo-generic  labelmap_path: /labelmap/coco-80.txt  # The detector automatically selects the default model based on your hardware:  # - For Hailo-8 hardware: YOLOv6n (default: yolov6n.hef)  # - For Hailo-8L hardware: YOLOv6n (default: yolov6n.hef)  #  # Optionally, you can specify a local model path to override the default.  # If a local path is provided and the file exists, it will be used instead of downloading.  # Example:  # path: /config/model_cache/hailo/yolov6n.hef  #  # You can also override using a custom URL:  # path: https://hailo-model-zoo.s3.eu-west-2.amazonaws.com/ModelZoo/Compiled/v2.14.0/hailo8/yolov6n.hef  # just make sure to give it the write configuration based on the model
```

#### SSD[​](#ssd "Direct link to SSD")

For SSD-based models, provide either a model path or URL to your compiled SSD model. The integration will first check the local path before downloading if necessary.

```
detectors:  hailo:    type: hailo8l    device: PCIemodel:  width: 300  height: 300  input_tensor: nhwc  input_pixel_format: rgb  model_type: ssd  # Specify the local model path (if available) or URL for SSD MobileNet v1.  # Example with a local path:  # path: /config/model_cache/h8l_cache/ssd_mobilenet_v1.hef  #  # Or override using a custom URL:  # path: https://hailo-model-zoo.s3.eu-west-2.amazonaws.com/ModelZoo/Compiled/v2.14.0/hailo8l/ssd_mobilenet_v1.hef
```

#### Custom Models[​](#custom-models "Direct link to Custom Models")

The Hailo detector supports all YOLO models compiled for Hailo hardware that include post-processing. You can specify a custom URL or a local path to download or use your model directly. If both are provided, the detector checks the local path first.

```
detectors:  hailo:    type: hailo8l    device: PCIemodel:  width: 640  height: 640  input_tensor: nhwc  input_pixel_format: rgb  input_dtype: int  model_type: yolo-generic  labelmap_path: /labelmap/coco-80.txt  # Optional: Specify a local model path.  # path: /config/model_cache/hailo/custom_model.hef  #  # Alternatively, or as a fallback, provide a custom URL:  # path: https://custom-model-url.com/path/to/model.hef
```

For additional ready-to-use models, please visit: [https://github.com/hailo-ai/hailo\_model\_zoo](https://github.com/hailo-ai/hailo_model_zoo)

Hailo8 supports all models in the Hailo Model Zoo that include HailoRT post-processing. You're welcome to choose any of these pre-configured models for your implementation.

> **Note:** The config.path parameter can accept either a local file path or a URL ending with .hef. When provided, the detector will first check if the path is a local file path. If the file exists locally, it will use it directly. If the file is not found locally or if a URL was provided, it will attempt to download the model from the specified URL.

* * *

## OpenVINO Detector[​](#openvino-detector "Direct link to OpenVINO Detector")

The OpenVINO detector type runs an OpenVINO IR model on AMD and Intel CPUs, Intel GPUs and Intel VPU hardware. To configure an OpenVINO detector, set the `"type"` attribute to `"openvino"`.

The OpenVINO device to be used is specified using the `"device"` attribute according to the naming conventions in the [Device Documentation](https://docs.openvino.ai/2024/openvino-workflow/running-inference/inference-devices-and-modes.html). The most common devices are `CPU` and `GPU`. Currently, there is a known issue with using `AUTO`. For backwards compatibility, Frigate will attempt to use `GPU` if `AUTO` is set in your configuration.

OpenVINO is supported on 6th Gen Intel platforms (Skylake) and newer. It will also run on AMD CPUs despite having no official support for it. A supported Intel platform is required to use the `GPU` device with OpenVINO. For detailed system requirements, see [OpenVINO System Requirements](https://docs.openvino.ai/2024/about-openvino/release-notes-openvino/system-requirements.html)

tip

When using many cameras one detector may not be enough to keep up. Multiple detectors can be defined assuming GPU resources are available. An example configuration would be:

```
detectors:  ov_0:    type: openvino    device: GPU  ov_1:    type: openvino    device: GPU
```

### Supported Models[​](#supported-models "Direct link to Supported Models")

#### SSDLite MobileNet v2[​](#ssdlite-mobilenet-v2 "Direct link to SSDLite MobileNet v2")

An OpenVINO model is provided in the container at `/openvino-model/ssdlite_mobilenet_v2.xml` and is used by this detector type by default. The model comes from Intel's Open Model Zoo [SSDLite MobileNet V2](https://github.com/openvinotoolkit/open_model_zoo/tree/master/models/public/ssdlite_mobilenet_v2) and is converted to an FP16 precision IR model.

Use the model configuration shown below when using the OpenVINO detector with the default OpenVINO model:

```
detectors:  ov:    type: openvino    device: GPUmodel:  width: 300  height: 300  input_tensor: nhwc  input_pixel_format: bgr  path: /openvino-model/ssdlite_mobilenet_v2.xml  labelmap_path: /openvino-model/coco_91cl_bkgr.txt
```

#### YOLOX[​](#yolox "Direct link to YOLOX")

This detector also supports YOLOX. Frigate does not come with any YOLOX models preloaded, so you will need to supply your own models.

#### YOLO-NAS[​](#yolo-nas "Direct link to YOLO-NAS")

[YOLO-NAS](https://github.com/Deci-AI/super-gradients/blob/master/YOLONAS.md) models are supported, but not included by default. See [the models section](#downloading-yolo-nas-model) for more information on downloading the YOLO-NAS model for use in Frigate.

After placing the downloaded onnx model in your config folder, you can use the following configuration:

```
detectors:  ov:    type: openvino    device: GPUmodel:  model_type: yolonas  width: 320 # <--- should match whatever was set in notebook  height: 320 # <--- should match whatever was set in notebook  input_tensor: nchw  input_pixel_format: bgr  path: /config/yolo_nas_s.onnx  labelmap_path: /labelmap/coco-80.txt
```

Note that the labelmap uses a subset of the complete COCO label set that has only 80 objects.

#### YOLO (v3, v4, v7, v9)[​](#yolo-v3-v4-v7-v9 "Direct link to YOLO (v3, v4, v7, v9)")

YOLOv3, YOLOv4, YOLOv7, and [YOLOv9](https://github.com/WongKinYiu/yolov9) models are supported, but not included by default.

tip

The YOLO detector has been designed to support YOLOv3, YOLOv4, YOLOv7, and YOLOv9 models, but may support other YOLO model architectures as well.

warning

If you are using a Frigate+ YOLOv9 model, you should not define any of the below `model` parameters in your config except for `path`. See [the Frigate+ model docs](/plus/first_model#step-3-set-your-model-id-in-the-config) for more information on setting up your model.

After placing the downloaded onnx model in your config folder, you can use the following configuration:

```
detectors:  ov:    type: openvino    device: GPUmodel:  model_type: yolo-generic  width: 320 # <--- should match the imgsize set during model export  height: 320 # <--- should match the imgsize set during model export  input_tensor: nchw  input_dtype: float  path: /config/model_cache/yolo.onnx  labelmap_path: /labelmap/coco-80.txt
```

Note that the labelmap uses a subset of the complete COCO label set that has only 80 objects.

#### RF-DETR[​](#rf-detr "Direct link to RF-DETR")

[RF-DETR](https://github.com/roboflow/rf-detr) is a DETR based model. The ONNX exported models are supported, but not included by default. See [the models section](#downloading-rf-detr-model) for more informatoin on downloading the RF-DETR model for use in Frigate.

warning

Due to the size and complexity of the RF-DETR model, it is only recommended to be run with discrete Arc Graphics Cards.

After placing the downloaded onnx model in your `config/model_cache` folder, you can use the following configuration:

```
detectors:  ov:    type: openvino    device: GPUmodel:  model_type: rfdetr  width: 320  height: 320  input_tensor: nchw  input_dtype: float  path: /config/model_cache/rfdetr.onnx
```

#### D-FINE[​](#d-fine "Direct link to D-FINE")

[D-FINE](https://github.com/Peterande/D-FINE) is a DETR based model. The ONNX exported models are supported, but not included by default. See [the models section](#downloading-d-fine-model) for more information on downloading the D-FINE model for use in Frigate.

warning

Currently D-FINE models only run on OpenVINO in CPU mode, GPUs currently fail to compile the model

After placing the downloaded onnx model in your config/model\_cache folder, you can use the following configuration:

```
detectors:  ov:    type: openvino    device: CPUmodel:  model_type: dfine  width: 640  height: 640  input_tensor: nchw  input_dtype: float  path: /config/model_cache/dfine_s_obj2coco.onnx  labelmap_path: /labelmap/coco-80.txt
```

Note that the labelmap uses a subset of the complete COCO label set that has only 80 objects.

## AMD/ROCm GPU detector[​](#amdrocm-gpu-detector "Direct link to AMD/ROCm GPU detector")

### Setup[​](#setup "Direct link to Setup")

Support for AMD GPUs is provided using the [ONNX detector](#ONNX). In order to utilize the AMD GPU for object detection use a frigate docker image with `-rocm` suffix, for example `ghcr.io/blakeblackshear/frigate:stable-rocm`.

### Docker settings for GPU access[​](#docker-settings-for-gpu-access "Direct link to Docker settings for GPU access")

ROCm needs access to the `/dev/kfd` and `/dev/dri` devices. When docker or frigate is not run under root then also `video` (and possibly `render` and `ssl/_ssl`) groups should be added.

When running docker directly the following flags should be added for device access:

```
$ docker run --device=/dev/kfd --device=/dev/dri  \    ...
```

When using Docker Compose:

```
services:  frigate:    ...    devices:      - /dev/dri      - /dev/kfd
```

For reference on recommended settings see [running ROCm/pytorch in Docker](https://rocm.docs.amd.com/projects/install-on-linux/en/develop/how-to/3rd-party/pytorch-install.html#using-docker-with-pytorch-pre-installed).

### Docker settings for overriding the GPU chipset[​](#docker-settings-for-overriding-the-gpu-chipset "Direct link to Docker settings for overriding the GPU chipset")

Your GPU might work just fine without any special configuration but in many cases they need manual settings. AMD/ROCm software stack comes with a limited set of GPU drivers and for newer or missing models you will have to override the chipset version to an older/generic version to get things working.

Also AMD/ROCm does not "officially" support integrated GPUs. It still does work with most of them just fine but requires special settings. One has to configure the `HSA_OVERRIDE_GFX_VERSION` environment variable. See the [ROCm bug report](https://github.com/ROCm/ROCm/issues/1743) for context and examples.

For the rocm frigate build there is some automatic detection:

*   gfx1031 -> 10.3.0
*   gfx1103 -> 11.0.0

If you have something else you might need to override the `HSA_OVERRIDE_GFX_VERSION` at Docker launch. Suppose the version you want is `10.0.0`, then you should configure it from command line as:

```
$ docker run -e HSA_OVERRIDE_GFX_VERSION=10.0.0 \    ...
```

When using Docker Compose:

```
services:  frigate:    ...    environment:      HSA_OVERRIDE_GFX_VERSION: "10.0.0"
```

Figuring out what version you need can be complicated as you can't tell the chipset name and driver from the AMD brand name.

*   first make sure that rocm environment is running properly by running `/opt/rocm/bin/rocminfo` in the frigate container -- it should list both the CPU and the GPU with their properties
*   find the chipset version you have (gfxNNN) from the output of the `rocminfo` (see below)
*   use a search engine to query what `HSA_OVERRIDE_GFX_VERSION` you need for the given gfx name ("gfxNNN ROCm HSA\_OVERRIDE\_GFX\_VERSION")
*   override the `HSA_OVERRIDE_GFX_VERSION` with relevant value
*   if things are not working check the frigate docker logs

#### Figuring out if AMD/ROCm is working and found your GPU[​](#figuring-out-if-amdrocm-is-working-and-found-your-gpu "Direct link to Figuring out if AMD/ROCm is working and found your GPU")

```
$ docker exec -it frigate /opt/rocm/bin/rocminfo
```

#### Figuring out your AMD GPU chipset version:[​](#figuring-out-your-amd-gpu-chipset-version "Direct link to Figuring out your AMD GPU chipset version:")

We unset the `HSA_OVERRIDE_GFX_VERSION` to prevent an existing override from messing up the result:

```
$ docker exec -it frigate /bin/bash -c '(unset HSA_OVERRIDE_GFX_VERSION && /opt/rocm/bin/rocminfo |grep gfx)'
```

### Supported Models[​](#supported-models-1 "Direct link to Supported Models")

See [ONNX supported models](#supported-models) for supported models, there are some caveats:

*   D-FINE models are not supported
*   YOLO-NAS models are known to not run well on integrated GPUs

## ONNX[​](#onnx "Direct link to ONNX")

ONNX is an open format for building machine learning models, Frigate supports running ONNX models on CPU, OpenVINO, ROCm, and TensorRT. On startup Frigate will automatically try to use a GPU if one is available.

info

If the correct build is used for your GPU then the GPU will be detected and used automatically.

*   **AMD**
    
    *   ROCm will automatically be detected and used with the ONNX detector in the `-rocm` Frigate image.
*   **Intel**
    
    *   OpenVINO will automatically be detected and used with the ONNX detector in the default Frigate image.
*   **Nvidia**
    
    *   Nvidia GPUs will automatically be detected and used with the ONNX detector in the `-tensorrt` Frigate image.
    *   Jetson devices will automatically be detected and used with the ONNX detector in the `-tensorrt-jp6` Frigate image.

tip

When using many cameras one detector may not be enough to keep up. Multiple detectors can be defined assuming GPU resources are available. An example configuration would be:

```
detectors:  onnx_0:    type: onnx  onnx_1:    type: onnx
```

### Supported Models[​](#supported-models-2 "Direct link to Supported Models")

There is no default model provided, the following formats are supported:

#### YOLO-NAS[​](#yolo-nas-1 "Direct link to YOLO-NAS")

[YOLO-NAS](https://github.com/Deci-AI/super-gradients/blob/master/YOLONAS.md) models are supported, but not included by default. See [the models section](#downloading-yolo-nas-model) for more information on downloading the YOLO-NAS model for use in Frigate.

warning

If you are using a Frigate+ YOLO-NAS model, you should not define any of the below `model` parameters in your config except for `path`. See [the Frigate+ model docs](/plus/first_model#step-3-set-your-model-id-in-the-config) for more information on setting up your model.

After placing the downloaded onnx model in your config folder, you can use the following configuration:

```
detectors:  onnx:    type: onnxmodel:  model_type: yolonas  width: 320 # <--- should match whatever was set in notebook  height: 320 # <--- should match whatever was set in notebook  input_pixel_format: bgr  input_tensor: nchw  path: /config/yolo_nas_s.onnx  labelmap_path: /labelmap/coco-80.txt
```

#### YOLO (v3, v4, v7, v9)[​](#yolo-v3-v4-v7-v9-1 "Direct link to YOLO (v3, v4, v7, v9)")

YOLOv3, YOLOv4, YOLOv7, and [YOLOv9](https://github.com/WongKinYiu/yolov9) models are supported, but not included by default.

tip

The YOLO detector has been designed to support YOLOv3, YOLOv4, YOLOv7, and YOLOv9 models, but may support other YOLO model architectures as well. See [the models section](#downloading-yolo-models) for more information on downloading YOLO models for use in Frigate.

warning

If you are using a Frigate+ YOLOv9 model, you should not define any of the below `model` parameters in your config except for `path`. See [the Frigate+ model docs](/plus/first_model#step-3-set-your-model-id-in-the-config) for more information on setting up your model.

After placing the downloaded onnx model in your config folder, you can use the following configuration:

```
detectors:  onnx:    type: onnxmodel:  model_type: yolo-generic  width: 320 # <--- should match the imgsize set during model export  height: 320 # <--- should match the imgsize set during model export  input_tensor: nchw  input_dtype: float  path: /config/model_cache/yolo.onnx  labelmap_path: /labelmap/coco-80.txt
```

Note that the labelmap uses a subset of the complete COCO label set that has only 80 objects.

#### YOLOx[​](#yolox-1 "Direct link to YOLOx")

[YOLOx](https://github.com/Megvii-BaseDetection/YOLOX) models are supported, but not included by default. See [the models section](#downloading-yolo-models) for more information on downloading the YOLOx model for use in Frigate.

After placing the downloaded onnx model in your config folder, you can use the following configuration:

```
detectors:  onnx:    type: onnxmodel:  model_type: yolox  width: 416 # <--- should match the imgsize set during model export  height: 416 # <--- should match the imgsize set during model export  input_tensor: nchw  input_dtype: float_denorm  path: /config/model_cache/yolox_tiny.onnx  labelmap_path: /labelmap/coco-80.txt
```

Note that the labelmap uses a subset of the complete COCO label set that has only 80 objects.

#### RF-DETR[​](#rf-detr-1 "Direct link to RF-DETR")

[RF-DETR](https://github.com/roboflow/rf-detr) is a DETR based model. The ONNX exported models are supported, but not included by default. See [the models section](#downloading-rf-detr-model) for more information on downloading the RF-DETR model for use in Frigate.

After placing the downloaded onnx model in your `config/model_cache` folder, you can use the following configuration:

```
detectors:  onnx:    type: onnxmodel:  model_type: rfdetr  width: 320  height: 320  input_tensor: nchw  input_dtype: float  path: /config/model_cache/rfdetr.onnx
```

#### D-FINE[​](#d-fine-1 "Direct link to D-FINE")

[D-FINE](https://github.com/Peterande/D-FINE) is a DETR based model. The ONNX exported models are supported, but not included by default. See [the models section](#downloading-d-fine-model) for more information on downloading the D-FINE model for use in Frigate.

After placing the downloaded onnx model in your `config/model_cache` folder, you can use the following configuration:

```
detectors:  onnx:    type: onnxmodel:  model_type: dfine  width: 640  height: 640  input_tensor: nchw  input_dtype: float  path: /config/model_cache/dfine_m_obj2coco.onnx  labelmap_path: /labelmap/coco-80.txt
```

Note that the labelmap uses a subset of the complete COCO label set that has only 80 objects.

## CPU Detector (not recommended)[​](#cpu-detector-not-recommended "Direct link to CPU Detector (not recommended)")

The CPU detector type runs a TensorFlow Lite model utilizing the CPU without hardware acceleration. It is recommended to use a hardware accelerated detector type instead for better performance. To configure a CPU based detector, set the `"type"` attribute to `"cpu"`.

danger

The CPU detector is not recommended for general use. If you do not have GPU or Edge TPU hardware, using the [OpenVINO Detector](#openvino-detector) in CPU mode is often more efficient than using the CPU detector.

The number of threads used by the interpreter can be specified using the `"num_threads"` attribute, and defaults to `3.`

A TensorFlow Lite model is provided in the container at `/cpu_model.tflite` and is used by this detector type by default. To provide your own model, bind mount the file into the container and provide the path with `model.path`.

```
detectors:  cpu1:    type: cpu    num_threads: 3  cpu2:    type: cpu    num_threads: 3model:  path: "/custom_model.tflite"
```

When using CPU detectors, you can add one CPU detector per camera. Adding more detectors than the number of cameras should not improve performance.

## Deepstack / CodeProject.AI Server Detector[​](#deepstack--codeprojectai-server-detector "Direct link to Deepstack / CodeProject.AI Server Detector")

The Deepstack / CodeProject.AI Server detector for Frigate allows you to integrate Deepstack and CodeProject.AI object detection capabilities into Frigate. CodeProject.AI and DeepStack are open-source AI platforms that can be run on various devices such as the Raspberry Pi, Nvidia Jetson, and other compatible hardware. It is important to note that the integration is performed over the network, so the inference times may not be as fast as native Frigate detectors, but it still provides an efficient and reliable solution for object detection and tracking.

### Setup[​](#setup-1 "Direct link to Setup")

To get started with CodeProject.AI, visit their [official website](https://www.codeproject.com/Articles/5322557/CodeProject-AI-Server-AI-the-easy-way) to follow the instructions to download and install the AI server on your preferred device. Detailed setup instructions for CodeProject.AI are outside the scope of the Frigate documentation.

To integrate CodeProject.AI into Frigate, you'll need to make the following changes to your Frigate configuration file:

```
detectors:  deepstack:    api_url: http://<your_codeproject_ai_server_ip>:<port>/v1/vision/detection    type: deepstack    api_timeout: 0.1 # seconds
```

Replace `<your_codeproject_ai_server_ip>` and `<port>` with the IP address and port of your CodeProject.AI server.

To verify that the integration is working correctly, start Frigate and observe the logs for any error messages related to CodeProject.AI. Additionally, you can check the Frigate web interface to see if the objects detected by CodeProject.AI are being displayed and tracked properly.

# Community Supported Detectors

## NVidia TensorRT Detector[​](#nvidia-tensorrt-detector "Direct link to NVidia TensorRT Detector")

Nvidia Jetson devices may be used for object detection using the TensorRT libraries. Due to the size of the additional libraries, this detector is only provided in images with the `-tensorrt-jp6` tag suffix, e.g. `ghcr.io/blakeblackshear/frigate:stable-tensorrt-jp6`. This detector is designed to work with Yolo models for object detection.

### Generate Models[​](#generate-models "Direct link to Generate Models")

The model used for TensorRT must be preprocessed on the same hardware platform that they will run on. This means that each user must run additional setup to generate a model file for the TensorRT library. A script is included that will build several common models.

The Frigate image will generate model files during startup if the specified model is not found. Processed models are stored in the `/config/model_cache` folder. Typically the `/config` path is mapped to a directory on the host already and the `model_cache` does not need to be mapped separately unless the user wants to store it in a different location on the host.

By default, no models will be generated, but this can be overridden by specifying the `YOLO_MODELS` environment variable in Docker. One or more models may be listed in a comma-separated format, and each one will be generated. Models will only be generated if the corresponding `{model}.trt` file is not present in the `model_cache` folder, so you can force a model to be regenerated by deleting it from your Frigate data folder.

If you have a Jetson device with DLAs (Xavier or Orin), you can generate a model that will run on the DLA by appending `-dla` to your model name, e.g. specify `YOLO_MODELS=yolov7-320-dla`. The model will run on DLA0 (Frigate does not currently support DLA1). DLA-incompatible layers will fall back to running on the GPU.

If your GPU does not support FP16 operations, you can pass the environment variable `USE_FP16=False` to disable it.

Specific models can be selected by passing an environment variable to the `docker run` command or in your `docker-compose.yml` file. Use the form `-e YOLO_MODELS=yolov4-416,yolov4-tiny-416` to select one or more model names. The models available are shown below.

Available Models

```
yolov3-288yolov3-416yolov3-608yolov3-spp-288yolov3-spp-416yolov3-spp-608yolov3-tiny-288yolov3-tiny-416yolov4-288yolov4-416yolov4-608yolov4-csp-256yolov4-csp-512yolov4-p5-448yolov4-p5-896yolov4-tiny-288yolov4-tiny-416yolov4x-mish-320yolov4x-mish-640yolov7-tiny-288yolov7-tiny-416yolov7-640yolov7-416yolov7-320yolov7x-640yolov7x-320
```

An example `docker-compose.yml` fragment that converts the `yolov4-608` and `yolov7x-640` models would look something like this:

```
frigate:  environment:    - YOLO_MODELS=yolov7-320,yolov7x-640    - USE_FP16=false
```

### Configuration Parameters[​](#configuration-parameters "Direct link to Configuration Parameters")

The TensorRT detector can be selected by specifying `tensorrt` as the model type. The GPU will need to be passed through to the docker container using the same methods described in the [Hardware Acceleration](/configuration/hardware_acceleration_video#nvidia-gpus) section. If you pass through multiple GPUs, you can select which GPU is used for a detector with the `device` configuration parameter. The `device` parameter is an integer value of the GPU index, as shown by `nvidia-smi` within the container.

The TensorRT detector uses `.trt` model files that are located in `/config/model_cache/tensorrt` by default. These model path and dimensions used will depend on which model you have generated.

Use the config below to work with generated TRT models:

```
detectors:  tensorrt:    type: tensorrt    device: 0 #This is the default, select the first GPUmodel:  path: /config/model_cache/tensorrt/yolov7-320.trt  labelmap_path: /labelmap/coco-80.txt  input_tensor: nchw  input_pixel_format: rgb  width: 320 # MUST match the chosen model i.e yolov7-320 -> 320, yolov4-416 -> 416  height: 320 # MUST match the chosen model i.e yolov7-320 -> 320 yolov4-416 -> 416
```

## Rockchip platform[​](#rockchip-platform "Direct link to Rockchip platform")

Hardware accelerated object detection is supported on the following SoCs:

*   RK3562
*   RK3566
*   RK3568
*   RK3576
*   RK3588

This implementation uses the [Rockchip's RKNN-Toolkit2](https://github.com/airockchip/rknn-toolkit2/), version v2.3.2.

tip

When using many cameras one detector may not be enough to keep up. Multiple detectors can be defined assuming NPU resources are available. An example configuration would be:

```
detectors:  rknn_0:    type: rknn    num_cores: 0  rknn_1:    type: rknn    num_cores: 0
```

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Make sure to follow the [Rockchip specific installation instructions](/frigate/installation#rockchip-platform).

tip

You can get the load of your NPU with the following command:

```
$ cat /sys/kernel/debug/rknpu/load>> NPU load:  Core0:  0%, Core1:  0%, Core2:  0%,
```

### Supported Models[​](#supported-models-3 "Direct link to Supported Models")

This `config.yml` shows all relevant options to configure the detector and explains them. All values shown are the default values (except for two). Lines that are required at least to use the detector are labeled as required, all other lines are optional.

```
detectors: # required  rknn: # required    type: rknn # required    # number of NPU cores to use    # 0 means choose automatically    # increase for better performance if you have a multicore NPU e.g. set to 3 on rk3588    num_cores: 0
```

The inference time was determined on a rk3588 with 3 NPU cores.

Model

Size in mb

Inference time in ms

deci-fp16-yolonas\_s

24

25

deci-fp16-yolonas\_m

62

35

deci-fp16-yolonas\_l

81

45

frigate-fp16-yolov9-t

6

35

rock-i8-yolox\_nano

3

14

rock-i8\_yolox\_tiny

6

18

*   All models are automatically downloaded and stored in the folder `config/model_cache/rknn_cache`. After upgrading Frigate, you should remove older models to free up space.
*   You can also provide your own `.rknn` model. You should not save your own models in the `rknn_cache` folder, store them directly in the `model_cache` folder or another subfolder. To convert a model to `.rknn` format see the `rknn-toolkit2` (requires a x86 machine). Note, that there is only post-processing for the supported models.

#### YOLO-NAS[​](#yolo-nas-2 "Direct link to YOLO-NAS")

```
model: # required  # name of model (will be automatically downloaded) or path to your own .rknn model file  # possible values are:  # - deci-fp16-yolonas_s  # - deci-fp16-yolonas_m  # - deci-fp16-yolonas_l  # your yolonas_model.rknn  path: deci-fp16-yolonas_s  model_type: yolonas  width: 320  height: 320  input_pixel_format: bgr  input_tensor: nhwc  labelmap_path: /labelmap/coco-80.txt
```

warning

The pre-trained YOLO-NAS weights from DeciAI are subject to their license and can't be used commercially. For more information, see: [https://docs.deci.ai/super-gradients/latest/LICENSE.YOLONAS.html](https://docs.deci.ai/super-gradients/latest/LICENSE.YOLONAS.html)

#### YOLO (v9)[​](#yolo-v9 "Direct link to YOLO (v9)")

```
model: # required  # name of model (will be automatically downloaded) or path to your own .rknn model file  # possible values are:  # - frigate-fp16-yolov9-t  # - frigate-fp16-yolov9-s  # - frigate-fp16-yolov9-m  # - frigate-fp16-yolov9-c  # - frigate-fp16-yolov9-e  # your yolo_model.rknn  path: frigate-fp16-yolov9-t  model_type: yolo-generic  width: 320  height: 320  input_tensor: nhwc  labelmap_path: /labelmap/coco-80.txt
```

#### YOLOx[​](#yolox-2 "Direct link to YOLOx")

```
model: # required  # name of model (will be automatically downloaded) or path to your own .rknn model file  # possible values are:  # - rock-i8-yolox_nano  # - rock-i8-yolox_tiny  # - rock-fp16-yolox_nano  # - rock-fp16-yolox_tiny  # your yolox_model.rknn  path: rock-i8-yolox_nano  model_type: yolox  width: 416  height: 416  input_tensor: nhwc  labelmap_path: /labelmap/coco-80.txt
```

### Converting your own onnx model to rknn format[​](#converting-your-own-onnx-model-to-rknn-format "Direct link to Converting your own onnx model to rknn format")

To convert a onnx model to the rknn format using the [rknn-toolkit2](https://github.com/airockchip/rknn-toolkit2/) you have to:

*   Place one ore more models in onnx format in the directory `config/model_cache/rknn_cache/onnx` on your docker host (this might require `sudo` privileges).
*   Save the configuration file under `config/conv2rknn.yaml` (see below for details).
*   Run `docker exec <frigate_container_id> python3 /opt/conv2rknn.py`. If the conversion was successful, the rknn models will be placed in `config/model_cache/rknn_cache`.

This is an example configuration file that you need to adjust to your specific onnx model:

```
soc: ["rk3562", "rk3566", "rk3568", "rk3576", "rk3588"]quantization: falseoutput_name: "{input_basename}"config:  mean_values: [[0, 0, 0]]  std_values: [[255, 255, 255]]  quant_img_RGB2BGR: true
```

Explanation of the paramters:

*   `soc`: A list of all SoCs you want to build the rknn model for. If you don't specify this parameter, the script tries to find out your SoC and builds the rknn model for this one.
*   `quantization`: true: 8 bit integer (i8) quantization, false: 16 bit float (fp16). Default: false.
*   `output_name`: The output name of the model. The following variables are available:
    *   `quant`: "i8" or "fp16" depending on the config
    *   `input_basename`: the basename of the input model (e.g. "my\_model" if the input model is calles "my\_model.onnx")
    *   `soc`: the SoC this model was build for (e.g. "rk3588")
    *   `tk_version`: Version of `rknn-toolkit2` (e.g. "2.3.0")
    *   **example**: Specifying `output_name = "frigate-{quant}-{input_basename}-{soc}-v{tk_version}"` could result in a model called `frigate-i8-my_model-rk3588-v2.3.0.rknn`.
*   `config`: Configuration passed to `rknn-toolkit2` for model conversion. For an explanation of all available parameters have a look at section "2.2. Model configuration" of [this manual](https://github.com/MarcA711/rknn-toolkit2/releases/download/v2.3.2/03_Rockchip_RKNPU_API_Reference_RKNN_Toolkit2_V2.3.2_EN.pdf).

# Models

Some model types are not included in Frigate by default.

## Downloading Models[​](#downloading-models "Direct link to Downloading Models")

Here are some tips for getting different model types

### Downloading D-FINE Model[​](#downloading-d-fine-model "Direct link to Downloading D-FINE Model")

D-FINE can be exported as ONNX by running the command below. You can copy and paste the whole thing to your terminal and execute, altering `MODEL_SIZE=s` in the first line to `s`, `m`, or `l` size.

```
docker build . --build-arg MODEL_SIZE=s --output . -f- <<'EOF'FROM python:3.11 AS buildRUN apt-get update && apt-get install --no-install-recommends -y libgl1 && rm -rf /var/lib/apt/lists/*COPY --from=ghcr.io/astral-sh/uv:0.8.0 /uv /bin/WORKDIR /dfineRUN git clone https://github.com/Peterande/D-FINE.git .RUN uv pip install --system -r requirements.txtRUN uv pip install --system onnx onnxruntime onnxsim onnxscript# Create output directory and download checkpointRUN mkdir -p outputARG MODEL_SIZERUN wget https://github.com/Peterande/storage/releases/download/dfinev1.0/dfine_${MODEL_SIZE}_obj2coco.pth -O output/dfine_${MODEL_SIZE}_obj2coco.pth# Modify line 58 of export_onnx.py to change batch size to 1RUN sed -i '58s/data = torch.rand(.*)/data = torch.rand(1, 3, 640, 640)/' tools/deployment/export_onnx.pyRUN python3 tools/deployment/export_onnx.py -c configs/dfine/objects365/dfine_hgnetv2_${MODEL_SIZE}_obj2coco.yml -r output/dfine_${MODEL_SIZE}_obj2coco.pthFROM scratchARG MODEL_SIZECOPY --from=build /dfine/output/dfine_${MODEL_SIZE}_obj2coco.onnx /dfine-${MODEL_SIZE}.onnxEOF
```

### Downloading RF-DETR Model[​](#downloading-rf-detr-model "Direct link to Downloading RF-DETR Model")

RF-DETR can be exported as ONNX by running the command below. You can copy and paste the whole thing to your terminal and execute, altering `MODEL_SIZE=Nano` in the first line to `Nano`, `Small`, or `Medium` size.

```
docker build . --build-arg MODEL_SIZE=Nano --rm --output . -f- <<'EOF'FROM python:3.11 AS buildRUN apt-get update && apt-get install --no-install-recommends -y libgl1 && rm -rf /var/lib/apt/lists/*COPY --from=ghcr.io/astral-sh/uv:0.8.0 /uv /bin/WORKDIR /rfdetrRUN uv pip install --system rfdetr[onnxexport] torch==2.8.0 onnx==1.19.1 onnxscriptARG MODEL_SIZERUN python3 -c "from rfdetr import RFDETR${MODEL_SIZE}; x = RFDETR${MODEL_SIZE}(resolution=320); x.export(simplify=True)"FROM scratchARG MODEL_SIZECOPY --from=build /rfdetr/output/inference_model.onnx /rfdetr-${MODEL_SIZE}.onnxEOF
```

### Downloading YOLO-NAS Model[​](#downloading-yolo-nas-model "Direct link to Downloading YOLO-NAS Model")

You can build and download a compatible model with pre-trained weights using [this notebook](https://github.com/blakeblackshear/frigate/blob/dev/notebooks/YOLO_NAS_Pretrained_Export.ipynb) [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/blakeblackshear/frigate/blob/dev/notebooks/YOLO_NAS_Pretrained_Export.ipynb) which can be run directly in [Google Colab](https://colab.research.google.com/github/blakeblackshear/frigate/blob/dev/notebooks/YOLO_NAS_Pretrained_Export.ipynb).

warning

The pre-trained YOLO-NAS weights from DeciAI are subject to their license and can't be used commercially. For more information, see: [https://docs.deci.ai/super-gradients/latest/LICENSE.YOLONAS.html](https://docs.deci.ai/super-gradients/latest/LICENSE.YOLONAS.html)

The input image size in this notebook is set to 320x320. This results in lower CPU usage and faster inference times without impacting performance in most cases due to the way Frigate crops video frames to areas of interest before running detection. The notebook and config can be updated to 640x640 if desired.

### Downloading YOLO Models[​](#downloading-yolo-models "Direct link to Downloading YOLO Models")

#### YOLOx[​](#yolox-3 "Direct link to YOLOx")

YOLOx models can be downloaded [from the YOLOx repo](https://github.com/Megvii-BaseDetection/YOLOX/tree/main/demo/ONNXRuntime).

#### YOLOv3, YOLOv4, and YOLOv7[​](#yolov3-yolov4-and-yolov7 "Direct link to YOLOv3, YOLOv4, and YOLOv7")

To export as ONNX:

```
git clone https://github.com/NateMeyer/tensorrt_demoscd tensorrt_demos/yolo./download_yolo.shpython3 yolo_to_onnx.py -m yolov7-320
```

#### YOLOv9[​](#yolov9 "Direct link to YOLOv9")

YOLOv9 model can be exported as ONNX using the command below. You can copy and paste the whole thing to your terminal and execute, altering `MODEL_SIZE=t` and `IMG_SIZE=320` in the first line to the [model size](https://github.com/WongKinYiu/yolov9#performance) you would like to convert (available model sizes are `t`, `s`, `m`, `c`, and `e`, common image sizes are `320` and `640`).

```
docker build . --build-arg MODEL_SIZE=t --build-arg IMG_SIZE=320 --output . -f- <<'EOF'FROM python:3.11 AS buildRUN apt-get update && apt-get install --no-install-recommends -y libgl1 && rm -rf /var/lib/apt/lists/*COPY --from=ghcr.io/astral-sh/uv:0.8.0 /uv /bin/WORKDIR /yolov9ADD https://github.com/WongKinYiu/yolov9.git .RUN uv pip install --system -r requirements.txtRUN uv pip install --system onnx==1.18.0 onnxruntime onnx-simplifier>=0.4.1 onnxscriptARG MODEL_SIZEARG IMG_SIZEADD https://github.com/WongKinYiu/yolov9/releases/download/v0.1/yolov9-${MODEL_SIZE}-converted.pt yolov9-${MODEL_SIZE}.ptRUN sed -i "s/ckpt = torch.load(attempt_download(w), map_location='cpu')/ckpt = torch.load(attempt_download(w), map_location='cpu', weights_only=False)/g" models/experimental.pyRUN python3 export.py --weights ./yolov9-${MODEL_SIZE}.pt --imgsz ${IMG_SIZE} --simplify --include onnxFROM scratchARG MODEL_SIZEARG IMG_SIZECOPY --from=build /yolov9/yolov9-${MODEL_SIZE}.onnx /yolov9-${MODEL_SIZE}-${IMG_SIZE}.onnxEOF
```

*   [Edge TPU Detector](#edge-tpu-detector)
    *   [Single USB Coral](#single-usb-coral)
    *   [Multiple USB Corals](#multiple-usb-corals)
    *   [Native Coral (Dev Board)](#native-coral-dev-board)
    *   [Single PCIE/M.2 Coral](#single-pciem2-coral)
    *   [Multiple PCIE/M.2 Corals](#multiple-pciem2-corals)
    *   [Mixing Corals](#mixing-corals)
*   [Hailo-8](#hailo-8)
    *   [Configuration](#configuration)
*   [OpenVINO Detector](#openvino-detector)
    *   [Supported Models](#supported-models)
*   [AMD/ROCm GPU detector](#amdrocm-gpu-detector)
    *   [Setup](#setup)
    *   [Docker settings for GPU access](#docker-settings-for-gpu-access)
    *   [Docker settings for overriding the GPU chipset](#docker-settings-for-overriding-the-gpu-chipset)
    *   [Supported Models](#supported-models-1)
*   [ONNX](#onnx)
    *   [Supported Models](#supported-models-2)
*   [CPU Detector (not recommended)](#cpu-detector-not-recommended)
*   [Deepstack / CodeProject.AI Server Detector](#deepstack--codeprojectai-server-detector)
    *   [Setup](#setup-1)
*   [NVidia TensorRT Detector](#nvidia-tensorrt-detector)
    *   [Generate Models](#generate-models)
    *   [Configuration Parameters](#configuration-parameters)
*   [Rockchip platform](#rockchip-platform)
    *   [Prerequisites](#prerequisites)
    *   [Supported Models](#supported-models-3)
    *   [Converting your own onnx model to rknn format](#converting-your-own-onnx-model-to-rknn-format)
*   [Downloading Models](#downloading-models)
    *   [Downloading D-FINE Model](#downloading-d-fine-model)
    *   [Downloading RF-DETR Model](#downloading-rf-detr-model)
    *   [Downloading YOLO-NAS Model](#downloading-yolo-nas-model)
    *   [Downloading YOLO Models](#downloading-yolo-models)

--- END OF FILE: configuration-object_filters.md ---
--- START OF FILE: configuration-object_filters.md ---

Source: https://docs.frigate.video/configuration/object_filters

On this page

There are several types of object filters that can be used to reduce false positive rates.

## Object Scores[​](#object-scores "Direct link to Object Scores")

For object filters in your configuration, any single detection below `min_score` will be ignored as a false positive. `threshold` is based on the median of the history of scores (padded to 3 values) for a tracked object. Consider the following frames when `min_score` is set to 0.6 and threshold is set to 0.85:

Frame

Current Score

Score History

Computed Score

Detected Object

1

0.7

0.0, 0, 0.7

0.0

No

2

0.55

0.0, 0.7, 0.0

0.0

No

3

0.85

0.7, 0.0, 0.85

0.7

No

4

0.90

0.7, 0.85, 0.95, 0.90

0.875

Yes

5

0.88

0.7, 0.85, 0.95, 0.90, 0.88

0.88

Yes

6

0.95

0.7, 0.85, 0.95, 0.90, 0.88, 0.95

0.89

Yes

In frame 2, the score is below the `min_score` value, so Frigate ignores it and it becomes a 0.0. The computed score is the median of the score history (padding to at least 3 values), and only when that computed score crosses the `threshold` is the object marked as a true positive. That happens in frame 4 in the example.

### Minimum Score[​](#minimum-score "Direct link to Minimum Score")

Any detection below `min_score` will be immediately thrown out and never tracked because it is considered a false positive. If `min_score` is too low then false positives may be detected and tracked which can confuse the object tracker and may lead to wasted resources. If `min_score` is too high then lower scoring true positives like objects that are further away or partially occluded may be thrown out which can also confuse the tracker and cause valid tracked objects to be lost or disjointed.

### Threshold[​](#threshold "Direct link to Threshold")

`threshold` is used to determine that the object is a true positive. Once an object is detected with a score >= `threshold` object is considered a true positive. If `threshold` is too low then some higher scoring false positives may create an tracked object. If `threshold` is too high then true positive tracked objects may be missed due to the object never scoring high enough.

## Object Shape[​](#object-shape "Direct link to Object Shape")

False positives can also be reduced by filtering a detection based on its shape.

### Object Area[​](#object-area "Direct link to Object Area")

`min_area` and `max_area` filter on the area of an objects bounding box and can be used to reduce false positives that are outside the range of expected sizes. For example when a leaf is detected as a dog or when a large tree is detected as a person, these can be reduced by adding a `min_area` / `max_area` filter. These values can either be in pixels or as a percentage of the frame (for example, 0.12 represents 12% of the frame).

### Object Proportions[​](#object-proportions "Direct link to Object Proportions")

`min_ratio` and `max_ratio` values are compared against a given detected object's width/height ratio (in pixels). If the ratio is outside this range, the object will be ignored as a false positive. This allows objects that are proportionally too short-and-wide (higher ratio) or too tall-and-narrow (smaller ratio) to be ignored.

info

Conceptually, a ratio of 1 is a square, 0.5 is a "tall skinny" box, and 2 is a "wide flat" box. If `min_ratio` is 1.0, any object that is taller than it is wide will be ignored. Similarly, if `max_ratio` is 1.0, then any object that is wider than it is tall will be ignored.

## Other Tools[​](#other-tools "Direct link to Other Tools")

### Zones[​](#zones "Direct link to Zones")

[Required zones](/configuration/zones) can be a great tool to reduce false positives that may be detected in the sky or other areas that are not of interest. The required zones will only create tracked objects for objects that enter the zone.

### Object Masks[​](#object-masks "Direct link to Object Masks")

[Object Filter Masks](/configuration/masks) are a last resort but can be useful when false positives are in the relatively same place but can not be filtered due to their size or shape.

*   [Object Scores](#object-scores)
    *   [Minimum Score](#minimum-score)
    *   [Threshold](#threshold)
*   [Object Shape](#object-shape)
    *   [Object Area](#object-area)
    *   [Object Proportions](#object-proportions)
*   [Other Tools](#other-tools)
    *   [Zones](#zones)
    *   [Object Masks](#object-masks)

--- END OF FILE: configuration-objects.md ---
--- START OF FILE: configuration-objects.md ---

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

--- END OF FILE: configuration-plus-#available-label-types.md ---
--- START OF FILE: configuration-plus-#available-label-types.md ---

Source: https://docs.frigate.video/configuration/plus/#available-label-types

# Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

--- END OF FILE: configuration-pwa.md ---
--- START OF FILE: configuration-pwa.md ---

Source: https://docs.frigate.video/configuration/pwa

On this page

Frigate supports being installed as a [Progressive Web App](https://web.dev/explore/progressive-web-apps) on Desktop, Android, and iOS.

This adds features including the ability to deep link directly into the app.

## Requirements[​](#requirements "Direct link to Requirements")

In order to install Frigate as a PWA, the following requirements must be met:

*   Frigate must be accessed via a secure context (localhost, secure https, VPN, etc.)
*   On Android, Firefox, Chrome, Edge, Opera, and Samsung Internet Browser all support installing PWAs.
*   On iOS 16.4 and later, PWAs can be installed from the Share menu in Safari, Chrome, Edge, Firefox, and Orion.

## Installation[​](#installation "Direct link to Installation")

Installation varies slightly based on the device that is being used:

*   Desktop: Use the install button typically found in right edge of the address bar
*   Android: Use the `Install as App` button in the more options menu for Chrome, and the `Add app to Home screen` button for Firefox
*   iOS: Use the `Add to Homescreen` button in the share menu

## Usage[​](#usage "Direct link to Usage")

Once setup, the Frigate app can be used wherever it has access to Frigate. This means it can be setup as local-only, VPN-only, or fully accessible depending on your needs.

*   [Requirements](#requirements)
*   [Installation](#installation)
*   [Usage](#usage)

--- END OF FILE: configuration-record.md ---
--- START OF FILE: configuration-record.md ---

Source: https://docs.frigate.video/configuration/record

On this page

Recordings can be enabled and are stored at `/media/frigate/recordings`. The folder structure for the recordings is `YYYY-MM-DD/HH/<camera_name>/MM.SS.mp4` in **UTC time**. These recordings are written directly from your camera stream without re-encoding. Each camera supports a configurable retention policy in the config. Frigate chooses the largest matching retention value between the recording retention and the tracked object retention when determining if a recording should be removed.

New recording segments are written from the camera stream to cache, they are only moved to disk if they match the setup recording retention policy.

H265 recordings can be viewed in Chrome 108+, Edge and Safari only. All other browsers require recordings to be encoded with H264.

## Common recording configurations[​](#common-recording-configurations "Direct link to Common recording configurations")

### Most conservative: Ensure all video is saved[​](#most-conservative-ensure-all-video-is-saved "Direct link to Most conservative: Ensure all video is saved")

For users deploying Frigate in environments where it is important to have contiguous video stored even if there was no detectable motion, the following config will store all video for 3 days. After 3 days, only video containing motion and overlapping with alerts or detections will be retained until 30 days have passed.

```
record:  enabled: True  retain:    days: 3    mode: all  alerts:    retain:      days: 30      mode: motion  detections:    retain:      days: 30      mode: motion
```

### Reduced storage: Only saving video when motion is detected[​](#reduced-storage-only-saving-video-when-motion-is-detected "Direct link to Reduced storage: Only saving video when motion is detected")

In order to reduce storage requirements, you can adjust your config to only retain video where motion was detected.

```
record:  enabled: True  retain:    days: 3    mode: motion  alerts:    retain:      days: 30      mode: motion  detections:    retain:      days: 30      mode: motion
```

### Minimum: Alerts only[​](#minimum-alerts-only "Direct link to Minimum: Alerts only")

If you only want to retain video that occurs during a tracked object, this config will discard video unless an alert is ongoing.

```
record:  enabled: True  retain:    days: 0  alerts:    retain:      days: 30      mode: motion
```

## Will Frigate delete old recordings if my storage runs out?[​](#will-frigate-delete-old-recordings-if-my-storage-runs-out "Direct link to Will Frigate delete old recordings if my storage runs out?")

As of Frigate 0.12 if there is less than an hour left of storage, the oldest 2 hours of recordings will be deleted.

## Configuring Recording Retention[​](#configuring-recording-retention "Direct link to Configuring Recording Retention")

Frigate supports both continuous and tracked object based recordings with separate retention modes and retention periods.

tip

Retention configs support decimals meaning they can be configured to retain `0.5` days, for example.

### Continuous Recording[​](#continuous-recording "Direct link to Continuous Recording")

The number of days to retain continuous recordings can be set via the following config where X is a number, by default continuous recording is disabled.

```
record:  enabled: True  retain:    days: 1 # <- number of days to keep continuous recordings
```

Continuous recording supports different retention modes [which are described below](#what-do-the-different-retain-modes-mean)

### Object Recording[​](#object-recording "Direct link to Object Recording")

The number of days to record review items can be specified for review items classified as alerts as well as tracked objects.

```
record:  enabled: True  alerts:    retain:      days: 10 # <- number of days to keep alert recordings  detections:    retain:      days: 10 # <- number of days to keep detections recordings
```

This configuration will retain recording segments that overlap with alerts and detections for 10 days. Because multiple tracked objects can reference the same recording segments, this avoids storing duplicate footage for overlapping tracked objects and reduces overall storage needs.

**WARNING**: Recordings still must be enabled in the config. If a camera has recordings disabled in the config, enabling via the methods listed above will have no effect.

## What do the different retain modes mean?[​](#what-do-the-different-retain-modes-mean "Direct link to What do the different retain modes mean?")

Frigate saves from the stream with the `record` role in 10 second segments. These options determine which recording segments are kept for continuous recording (but can also affect tracked objects).

Let's say you have Frigate configured so that your doorbell camera would retain the last **2** days of continuous recording.

*   With the `all` option all 48 hours of those two days would be kept and viewable.
*   With the `motion` option the only parts of those 48 hours would be segments that Frigate detected motion. This is the middle ground option that won't keep all 48 hours, but will likely keep all segments of interest along with the potential for some extra segments.
*   With the `active_objects` option the only segments that would be kept are those where there was a true positive object that was not considered stationary.

The same options are available with alerts and detections, except it will only save the recordings when it overlaps with a review item of that type.

A configuration example of the above retain modes where all `motion` segments are stored for 7 days and `active objects` are stored for 14 days would be as follows:

```
record:  enabled: True  retain:    days: 7    mode: motion  alerts:    retain:      days: 14      mode: active_objects  detections:    retain:      days: 14      mode: active_objects
```

The above configuration example can be added globally or on a per camera basis.

## Can I have "continuous" recordings, but only at certain times?[​](#can-i-have-continuous-recordings-but-only-at-certain-times "Direct link to Can I have \"continuous\" recordings, but only at certain times?")

Using Frigate UI, Home Assistant, or MQTT, cameras can be automated to only record in certain situations or at certain times.

## How do I export recordings?[​](#how-do-i-export-recordings "Direct link to How do I export recordings?")

Footage can be exported from Frigate by right-clicking (desktop) or long pressing (mobile) on a review item in the Review pane or by clicking the Export button in the History view. Exported footage is then organized and searchable through the Export view, accessible from the main navigation bar.

### Time-lapse export[​](#time-lapse-export "Direct link to Time-lapse export")

Time lapse exporting is available only via the [HTTP API](/integrations/api/export-recording-export-camera-name-start-start-time-end-end-time-post).

When exporting a time-lapse the default speed-up is 25x with 30 FPS. This means that every 25 seconds of (real-time) recording is condensed into 1 second of time-lapse video (always without audio) with a smoothness of 30 FPS.

To configure the speed-up factor, the frame rate and further custom settings, the configuration parameter `timelapse_args` can be used. The below configuration example would change the time-lapse speed to 60x (for fitting 1 hour of recording into 1 minute of time-lapse) with 25 FPS:

```
record:  enabled: True  export:    timelapse_args: "-vf setpts=PTS/60 -r 25"
```

tip

When using `hwaccel_args` globally hardware encoding is used for time lapse generation. The encoder determines its own behavior so the resulting file size may be undesirably large. To reduce the output file size the ffmpeg parameter `-qp n` can be utilized (where `n` stands for the value of the quantisation parameter). The value can be adjusted to get an acceptable tradeoff between quality and file size for the given scenario.

## Apple Compatibility with H.265 Streams[​](#apple-compatibility-with-h265-streams "Direct link to Apple Compatibility with H.265 Streams")

Apple devices running the Safari browser may fail to playback h.265 recordings. The [apple compatibility option](/configuration/camera_specific#h265-cameras-via-safari) should be used to ensure seamless playback on Apple devices.

## Syncing Recordings With Disk[​](#syncing-recordings-with-disk "Direct link to Syncing Recordings With Disk")

In some cases the recordings files may be deleted but Frigate will not know this has happened. Recordings sync can be enabled which will tell Frigate to check the file system and delete any db entries for files which don't exist.

```
record:  sync_recordings: True
```

This feature is meant to fix variations in files, not completely delete entries in the database. If you delete all of your media, don't use `sync_recordings`, just stop Frigate, delete the `frigate.db` database, and restart.

warning

The sync operation uses considerable CPU resources and in most cases is not needed, only enable when necessary.

*   [Common recording configurations](#common-recording-configurations)
    *   [Most conservative: Ensure all video is saved](#most-conservative-ensure-all-video-is-saved)
    *   [Reduced storage: Only saving video when motion is detected](#reduced-storage-only-saving-video-when-motion-is-detected)
    *   [Minimum: Alerts only](#minimum-alerts-only)
*   [Will Frigate delete old recordings if my storage runs out?](#will-frigate-delete-old-recordings-if-my-storage-runs-out)
*   [Configuring Recording Retention](#configuring-recording-retention)
    *   [Continuous Recording](#continuous-recording)
    *   [Object Recording](#object-recording)
*   [What do the different retain modes mean?](#what-do-the-different-retain-modes-mean)
*   [Can I have "continuous" recordings, but only at certain times?](#can-i-have-continuous-recordings-but-only-at-certain-times)
*   [How do I export recordings?](#how-do-i-export-recordings)
    *   [Time-lapse export](#time-lapse-export)
*   [Apple Compatibility with H.265 Streams](#apple-compatibility-with-h265-streams)
*   [Syncing Recordings With Disk](#syncing-recordings-with-disk)

--- END OF FILE: configuration-reference.md ---
--- START OF FILE: configuration-reference.md ---

Source: https://docs.frigate.video/configuration/reference

On this page

### Full configuration reference:[​](#full-configuration-reference "Direct link to Full configuration reference:")

warning

It is not recommended to copy this full configuration file. Only specify values that are different from the defaults. Configuration options and default values may change in future versions.

```
mqtt:  # Optional: Enable mqtt server (default: shown below)  enabled: True  # Required: host name  host: mqtt.server.com  # Optional: port (default: shown below)  port: 1883  # Optional: topic prefix (default: shown below)  # NOTE: must be unique if you are running multiple instances  topic_prefix: frigate  # Optional: client id (default: shown below)  # NOTE: must be unique if you are running multiple instances  client_id: frigate  # Optional: user  # NOTE: MQTT user can be specified with an environment variable or docker secrets that must begin with 'FRIGATE_'.  #       e.g. user: '{FRIGATE_MQTT_USER}'  user: mqtt_user  # Optional: password  # NOTE: MQTT password can be specified with an environment variable or docker secrets that must begin with 'FRIGATE_'.  #       e.g. password: '{FRIGATE_MQTT_PASSWORD}'  password: password  # Optional: tls_ca_certs for enabling TLS using self-signed certs (default: None)  tls_ca_certs: /path/to/ca.crt  # Optional: tls_client_cert and tls_client key in order to use self-signed client  # certificates (default: None)  # NOTE: certificate must not be password-protected  #       do not set user and password when using a client certificate  tls_client_cert: /path/to/client.crt  tls_client_key: /path/to/client.key  # Optional: tls_insecure (true/false) for enabling TLS verification of  # the server hostname in the server certificate (default: None)  tls_insecure: false  # Optional: interval in seconds for publishing stats (default: shown below)  stats_interval: 60  # Optional: QoS level for subscriptions and publishing (default: shown below)  # 0 = at most once  # 1 = at least once  # 2 = exactly once  qos: 0# Optional: Detectors configuration. Defaults to a single CPU detectordetectors:  # Required: name of the detector  detector_name:    # Required: type of the detector    # Frigate provides many types, see https://docs.frigate.video/configuration/object_detectors for more details (default: shown below)    # Additional detector types can also be plugged in.    # Detectors may require additional configuration.    # Refer to the Detectors configuration page for more information.    type: cpu# Optional: Database configurationdatabase:  # The path to store the SQLite DB (default: shown below)  path: /config/frigate.db# Optional: TLS configurationtls:  # Optional: Enable TLS for port 8971 (default: shown below)  enabled: True# Optional: Proxy configurationproxy:  # Optional: Mapping for headers from upstream proxies. Only used if Frigate's auth  # is disabled.  # NOTE: Many authentication proxies pass a header downstream with the authenticated  #       user name and role. Not all values are supported. It must be a whitelisted header.  #       See the docs for more info.  header_map:    user: x-forwarded-user    role: x-forwarded-role  # Optional: Url for logging out a user. This sets the location of the logout url in  # the UI.  logout_url: /api/logout  # Optional: Auth secret that is checked against the X-Proxy-Secret header sent from  # the proxy. If not set, all requests are trusted regardless of origin.  auth_secret: None  # Optional: The default role to use for proxy auth. Must be "admin" or "viewer"  default_role: viewer  # Optional: The character used to separate multiple values in the proxy headers. (default: shown below)  separator: ","# Optional: Authentication configurationauth:  # Optional: Enable authentication  enabled: True  # Optional: Reset the admin user password on startup (default: shown below)  # New password is printed in the logs  reset_admin_password: False  # Optional: Cookie to store the JWT token for native auth (default: shown below)  cookie_name: frigate_token  # Optional: Set secure flag on cookie. (default: shown below)  # NOTE: This should be set to True if you are using TLS  cookie_secure: False  # Optional: Session length in seconds (default: shown below)  session_length: 86400 # 24 hours  # Optional: Refresh time in seconds (default: shown below)  # When the session is going to expire in less time than this setting,  # it will be refreshed back to the session_length.  refresh_time: 43200 # 12 hours  # Optional: Rate limiting for login failures to help prevent brute force  # login attacks (default: shown below)  # See the docs for more information on valid values  failed_login_rate_limit: None  # Optional: Trusted proxies for determining IP address to rate limit  # NOTE: This is only used for rate limiting login attempts and does not bypass  # authentication. See the authentication docs for more details.  trusted_proxies: []  # Optional: Number of hashing iterations for user passwords  # As of Feb 2023, OWASP recommends 600000 iterations for PBKDF2-SHA256  # NOTE: changing this value will not automatically update password hashes, you  #       will need to change each user password for it to apply  hash_iterations: 600000# Optional: model modifications# NOTE: The default values are for the EdgeTPU detector.# Other detectors will require the model config to be set.model:  # Required: path to the model. Frigate+ models use plus://<model_id> (default: automatic based on detector)  path: /edgetpu_model.tflite  # Required: path to the labelmap (default: shown below)  labelmap_path: /labelmap.txt  # Required: Object detection model input width (default: shown below)  width: 320  # Required: Object detection model input height (default: shown below)  height: 320  # Required: Object detection model input colorspace  # Valid values are rgb, bgr, or yuv. (default: shown below)  input_pixel_format: rgb  # Required: Object detection model input tensor format  # Valid values are nhwc or nchw (default: shown below)  input_tensor: nhwc  # Required: Object detection model type, currently only used with the OpenVINO detector  # Valid values are ssd, yolox, yolonas (default: shown below)  model_type: ssd  # Required: Label name modifications. These are merged into the standard labelmap.  labelmap:    2: vehicle  # Optional: Map of object labels to their attribute labels (default: depends on model)  attributes_map:    person:      - amazon      - face    car:      - amazon      - fedex      - license_plate      - ups# Optional: Audio Events Configuration# NOTE: Can be overridden at the camera levelaudio:  # Optional: Enable audio events (default: shown below)  enabled: False  # Optional: Configure the amount of seconds without detected audio to end the event (default: shown below)  max_not_heard: 30  # Optional: Configure the min rms volume required to run audio detection (default: shown below)  # As a rule of thumb:  #  - 200 - high sensitivity  #  - 500 - medium sensitivity  #  - 1000 - low sensitivity  min_volume: 500  # Optional: Types of audio to listen for (default: shown below)  listen:    - bark    - fire_alarm    - scream    - speech    - yell  # Optional: Filters to configure detection.  filters:    # Label that matches label in listen config.    speech:      # Minimum score that triggers an audio event (default: shown below)      threshold: 0.8# Optional: logger verbosity settingslogger:  # Optional: Default log verbosity (default: shown below)  default: info  # Optional: Component specific logger overrides  logs:    frigate.event: debug# Optional: set environment variablesenvironment_vars:  EXAMPLE_VAR: value# Optional: birdseye configuration# NOTE: Can (enabled, mode) be overridden at the camera levelbirdseye:  # Optional: Enable birdseye view (default: shown below)  enabled: True  # Optional: Restream birdseye via RTSP (default: shown below)  # NOTE: Enabling this will set birdseye to run 24/7 which may increase CPU usage somewhat.  restream: False  # Optional: Width of the output resolution (default: shown below)  width: 1280  # Optional: Height of the output resolution (default: shown below)  height: 720  # Optional: Encoding quality of the mpeg1 feed (default: shown below)  # 1 is the highest quality, and 31 is the lowest. Lower quality feeds utilize less CPU resources.  quality: 8  # Optional: Mode of the view. Available options are: objects, motion, and continuous  #   objects - cameras are included if they have had a tracked object within the last 30 seconds  #   motion - cameras are included if motion was detected in the last 30 seconds  #   continuous - all cameras are included always  mode: objects  # Optional: Threshold for camera activity to stop showing camera (default: shown below)  inactivity_threshold: 30  # Optional: Configure the birdseye layout  layout:    # Optional: Scaling factor for the layout calculator, range 1.0-5.0 (default: shown below)    scaling_factor: 2.0    # Optional: Maximum number of cameras to show at one time, showing the most recent (default: show all cameras)    max_cameras: 1# Optional: ffmpeg configuration# More information about presets at https://docs.frigate.video/configuration/ffmpeg_presetsffmpeg:  # Optional: ffmpeg binry path (default: shown below)  # can also be set to `7.0` or `5.0` to specify one of the included versions  # or can be set to any path that holds `bin/ffmpeg` & `bin/ffprobe`  path: "default"  # Optional: global ffmpeg args (default: shown below)  global_args: -hide_banner -loglevel warning -threads 2  # Optional: global hwaccel args (default: auto detect)  # NOTE: See hardware acceleration docs for your specific device  hwaccel_args: "auto"  # Optional: global input args (default: shown below)  input_args: preset-rtsp-generic  # Optional: global output args  output_args:    # Optional: output args for detect streams (default: shown below)    detect: -threads 2 -f rawvideo -pix_fmt yuv420p    # Optional: output args for record streams (default: shown below)    record: preset-record-generic  # Optional: Time in seconds to wait before ffmpeg retries connecting to the camera. (default: shown below)  # If set too low, frigate will retry a connection to the camera's stream too frequently, using up the limited streams some cameras can allow at once  # If set too high, then if a ffmpeg crash or camera stream timeout occurs, you could potentially lose up to a maximum of retry_interval second(s) of footage  # NOTE: this can be a useful setting for Wireless / Battery cameras to reduce how much footage is potentially lost during a connection timeout.  retry_interval: 10  # Optional: Set tag on HEVC (H.265) recording stream to improve compatibility with Apple players. (default: shown below)  apple_compatibility: false# Optional: Detect configuration# NOTE: Can be overridden at the camera leveldetect:  # Optional: enables detection for the camera (default: shown below)  enabled: False  # Optional: width of the frame for the input with the detect role (default: use native stream resolution)  width: 1280  # Optional: height of the frame for the input with the detect role (default: use native stream resolution)  height: 720  # Optional: desired fps for your camera for the input with the detect role (default: shown below)  # NOTE: Recommended value of 5. Ideally, try and reduce your FPS on the camera.  fps: 5  # Optional: Number of consecutive detection hits required for an object to be initialized in the tracker. (default: 1/2 the frame rate)  min_initialized: 2  # Optional: Number of frames without a detection before Frigate considers an object to be gone. (default: 5x the frame rate)  max_disappeared: 25  # Optional: Configuration for stationary object tracking  stationary:    # Optional: Frequency for confirming stationary objects (default: same as threshold)    # When set to 1, object detection will run to confirm the object still exists on every frame.    # If set to 10, object detection will run to confirm the object still exists on every 10th frame.    interval: 50    # Optional: Number of frames without a position change for an object to be considered stationary (default: 10x the frame rate or 10s)    threshold: 50    # Optional: Define a maximum number of frames for tracking a stationary object (default: not set, track forever)    # This can help with false positives for objects that should only be stationary for a limited amount of time.    # It can also be used to disable stationary object tracking. For example, you may want to set a value for person, but leave    # car at the default.    # WARNING: Setting these values overrides default behavior and disables stationary object tracking.    #          There are very few situations where you would want it disabled. It is NOT recommended to    #          copy these values from the example config into your config unless you know they are needed.    max_frames:      # Optional: Default for all object types (default: not set, track forever)      default: 3000      # Optional: Object specific values      objects:        person: 1000  # Optional: Milliseconds to offset detect annotations by (default: shown below).  # There can often be latency between a recording and the detect process,  # especially when using separate streams for detect and record.  # Use this setting to make the timeline bounding boxes more closely align  # with the recording. The value can be positive or negative.  # TIP: Imagine there is an tracked object clip with a person walking from left to right.  #      If the tracked object lifecycle bounding box is consistently to the left of the person  #      then the value should be decreased. Similarly, if a person is walking from  #      left to right and the bounding box is consistently ahead of the person  #      then the value should be increased.  # TIP: This offset is dynamic so you can change the value and it will update existing  #      tracked objects, this makes it easy to tune.  # WARNING: Fast moving objects will likely not have the bounding box align.  annotation_offset: 0# Optional: Object configuration# NOTE: Can be overridden at the camera levelobjects:  # Optional: list of objects to track from labelmap.txt (default: shown below)  track:    - person  # Optional: mask to prevent all object types from being detected in certain areas (default: no mask)  # Checks based on the bottom center of the bounding box of the object.  # NOTE: This mask is COMBINED with the object type specific mask below  mask: 0.000,0.000,0.781,0.000,0.781,0.278,0.000,0.278  # Optional: filters to reduce false positives for specific object types  filters:    person:      # Optional: minimum size of the bounding box for the detected object (default: 0).      # Can be specified as an integer for width*height in pixels or as a decimal representing the percentage of the frame (0.000001 to 0.99).      min_area: 5000      # Optional: maximum size of the bounding box for the detected object (default: 24000000).      # Can be specified as an integer for width*height in pixels or as a decimal representing the percentage of the frame (0.000001 to 0.99).      max_area: 100000      # Optional: minimum width/height of the bounding box for the detected object (default: 0)      min_ratio: 0.5      # Optional: maximum width/height of the bounding box for the detected object (default: 24000000)      max_ratio: 2.0      # Optional: minimum score for the object to initiate tracking (default: shown below)      min_score: 0.5      # Optional: minimum decimal percentage for tracked object's computed score to be considered a true positive (default: shown below)      threshold: 0.7      # Optional: mask to prevent this object type from being detected in certain areas (default: no mask)      # Checks based on the bottom center of the bounding box of the object      mask: 0.000,0.000,0.781,0.000,0.781,0.278,0.000,0.278# Optional: Review configuration# NOTE: Can be overridden at the camera levelreview:  # Optional: alerts configuration  alerts:    # Optional: enables alerts for the camera (default: shown below)    enabled: True    # Optional: labels that qualify as an alert (default: shown below)    labels:      - car      - person    # Optional: required zones for an object to be marked as an alert (default: none)    # NOTE: when settings required zones globally, this zone must exist on all cameras    #       or the config will be considered invalid. In that case the required_zones    #       should be configured at the camera level.    required_zones:      - driveway  # Optional: detections configuration  detections:    # Optional: enables detections for the camera (default: shown below)    enabled: True    # Optional: labels that qualify as a detection (default: all labels that are tracked / listened to)    labels:      - car      - person    # Optional: required zones for an object to be marked as a detection (default: none)    # NOTE: when settings required zones globally, this zone must exist on all cameras    #       or the config will be considered invalid. In that case the required_zones    #       should be configured at the camera level.    required_zones:      - driveway# Optional: Motion configuration# NOTE: Can be overridden at the camera levelmotion:  # Optional: enables detection for the camera (default: True)  # NOTE: Motion detection is required for object detection,  #       setting this to False and leaving detect enabled  #       will result in an error on startup.  enabled: False  # Optional: The threshold passed to cv2.threshold to determine if a pixel is different enough to be counted as motion. (default: shown below)  # Increasing this value will make motion detection less sensitive and decreasing it will make motion detection more sensitive.  # The value should be between 1 and 255.  threshold: 30  # Optional: The percentage of the image used to detect lightning or other substantial changes where motion detection  #           needs to recalibrate. (default: shown below)  # Increasing this value will make motion detection more likely to consider lightning or ir mode changes as valid motion.  # Decreasing this value will make motion detection more likely to ignore large amounts of motion such as a person approaching  # a doorbell camera.  lightning_threshold: 0.8  # Optional: Minimum size in pixels in the resized motion image that counts as motion (default: shown below)  # Increasing this value will prevent smaller areas of motion from being detected. Decreasing will  # make motion detection more sensitive to smaller moving objects.  # As a rule of thumb:  #  - 10 - high sensitivity  #  - 30 - medium sensitivity  #  - 50 - low sensitivity  contour_area: 10  # Optional: Alpha value passed to cv2.accumulateWeighted when averaging frames to determine the background (default: shown below)  # Higher values mean the current frame impacts the average a lot, and a new object will be averaged into the background faster.  # Low values will cause things like moving shadows to be detected as motion for longer.  # https://www.geeksforgeeks.org/background-subtraction-in-an-image-using-concept-of-running-average/  frame_alpha: 0.01  # Optional: Height of the resized motion frame  (default: 100)  # Higher values will result in more granular motion detection at the expense of higher CPU usage.  # Lower values result in less CPU, but small changes may not register as motion.  frame_height: 100  # Optional: motion mask  # NOTE: see docs for more detailed info on creating masks  mask: 0.000,0.469,1.000,0.469,1.000,1.000,0.000,1.000  # Optional: improve contrast (default: shown below)  # Enables dynamic contrast improvement. This should help improve night detections at the cost of making motion detection more sensitive  # for daytime.  improve_contrast: True  # Optional: Delay when updating camera motion through MQTT from ON -> OFF (default: shown below).  mqtt_off_delay: 30# Optional: Notification Configuration# NOTE: Can be overridden at the camera level (except email)notifications:  # Optional: Enable notification service (default: shown below)  enabled: False  # Optional: Email for push service to reach out to  # NOTE: This is required to use notifications  email: "admin@example.com"  # Optional: Cooldown time for notifications in seconds (default: shown below)  cooldown: 0# Optional: Record configuration# NOTE: Can be overridden at the camera levelrecord:  # Optional: Enable recording (default: shown below)  # WARNING: If recording is disabled in the config, turning it on via  #          the UI or MQTT later will have no effect.  enabled: False  # Optional: Number of minutes to wait between cleanup runs (default: shown below)  # This can be used to reduce the frequency of deleting recording segments from disk if you want to minimize i/o  expire_interval: 60  # Optional: Two-way sync recordings database with disk on startup and once a day (default: shown below).  sync_recordings: False  # Optional: Retention settings for recording  retain:    # Optional: Number of days to retain recordings regardless of tracked objects (default: shown below)    # NOTE: This should be set to 0 and retention should be defined in alerts and detections section below    #       if you only want to retain recordings of alerts and detections.    days: 0    # Optional: Mode for retention. Available options are: all, motion, and active_objects    #   all - save all recording segments regardless of activity    #   motion - save all recordings segments with any detected motion    #   active_objects - save all recording segments with active/moving objects    # NOTE: this mode only applies when the days setting above is greater than 0    mode: all  # Optional: Recording Export Settings  export:    # Optional: Timelapse Output Args (default: shown below).    # NOTE: The default args are set to fit 24 hours of recording into 1 hour playback.    # See https://stackoverflow.com/a/58268695 for more info on how these args work.    # As an example: if you wanted to go from 24 hours to 30 minutes that would be going    # from 86400 seconds to 1800 seconds which would be 1800 / 86400 = 0.02.    # The -r (framerate) dictates how smooth the output video is.    # So the args would be -vf setpts=0.02*PTS -r 30 in that case.    timelapse_args: "-vf setpts=0.04*PTS -r 30"  # Optional: Recording Preview Settings  preview:    # Optional: Quality of recording preview (default: shown below).    # Options are: very_low, low, medium, high, very_high    quality: medium  # Optional: alert recording settings  alerts:    # Optional: Number of seconds before the alert to include (default: shown below)    pre_capture: 5    # Optional: Number of seconds after the alert to include (default: shown below)    post_capture: 5    # Optional: Retention settings for recordings of alerts    retain:      # Required: Retention days (default: shown below)      days: 14      # Optional: Mode for retention. (default: shown below)      #   all - save all recording segments for alerts regardless of activity      #   motion - save all recordings segments for alerts with any detected motion      #   active_objects - save all recording segments for alerts with active/moving objects      #      # NOTE: If the retain mode for the camera is more restrictive than the mode configured      #       here, the segments will already be gone by the time this mode is applied.      #       For example, if the camera retain mode is "motion", the segments without motion are      #       never stored, so setting the mode to "all" here won't bring them back.      mode: motion  # Optional: detection recording settings  detections:    # Optional: Number of seconds before the detection to include (default: shown below)    pre_capture: 5    # Optional: Number of seconds after the detection to include (default: shown below)    post_capture: 5    # Optional: Retention settings for recordings of detections    retain:      # Required: Retention days (default: shown below)      days: 14      # Optional: Mode for retention. (default: shown below)      #   all - save all recording segments for detections regardless of activity      #   motion - save all recordings segments for detections with any detected motion      #   active_objects - save all recording segments for detections with active/moving objects      #      # NOTE: If the retain mode for the camera is more restrictive than the mode configured      #       here, the segments will already be gone by the time this mode is applied.      #       For example, if the camera retain mode is "motion", the segments without motion are      #       never stored, so setting the mode to "all" here won't bring them back.      mode: motion# Optional: Configuration for the jpg snapshots written to the clips directory for each tracked object# NOTE: Can be overridden at the camera levelsnapshots:  # Optional: Enable writing jpg snapshot to /media/frigate/clips (default: shown below)  enabled: False  # Optional: save a clean PNG copy of the snapshot image (default: shown below)  clean_copy: True  # Optional: print a timestamp on the snapshots (default: shown below)  timestamp: False  # Optional: draw bounding box on the snapshots (default: shown below)  bounding_box: True  # Optional: crop the snapshot (default: shown below)  crop: False  # Optional: height to resize the snapshot to (default: original size)  height: 175  # Optional: Restrict snapshots to objects that entered any of the listed zones (default: no required zones)  required_zones: []  # Optional: Camera override for retention settings (default: global values)  retain:    # Required: Default retention days (default: shown below)    default: 10    # Optional: Per object retention days    objects:      person: 15  # Optional: quality of the encoded jpeg, 0-100 (default: shown below)  quality: 70# Optional: Configuration for semantic search capabilitysemantic_search:  # Optional: Enable semantic search (default: shown below)  enabled: False  # Optional: Re-index embeddings database from historical tracked objects (default: shown below)  reindex: False  # Optional: Set the model used for embeddings. (default: shown below)  model: "jinav1"  # Optional: Set the model size used for embeddings. (default: shown below)  # NOTE: small model runs on CPU and large model runs on GPU  model_size: "small"# Optional: Configuration for face recognition capability# NOTE: enabled, min_area can be overridden at the camera levelface_recognition:  # Optional: Enable face recognition (default: shown below)  enabled: False  # Optional: Minimum face distance score required to mark as a potential match (default: shown below)  unknown_score: 0.8  # Optional: Minimum face detection score required to detect a face (default: shown below)  # NOTE: This only applies when not running a Frigate+ model  detection_threshold: 0.7  # Optional: Minimum face distance score required to be considered a match (default: shown below)  recognition_threshold: 0.9  # Optional: Min area of detected face box to consider running face recognition (default: shown below)  min_area: 500  # Optional: Min face recognitions for the sub label to be applied to the person object (default: shown below)  min_faces: 1  # Optional: Number of images of recognized faces to save for training (default: shown below)  save_attempts: 100  # Optional: Apply a blur quality filter to adjust confidence based on the blur level of the image (default: shown below)  blur_confidence_filter: True  # Optional: Set the model size used face recognition. (default: shown below)  model_size: small# Optional: Configuration for license plate recognition capability# NOTE: enabled, min_area, and enhancement can be overridden at the camera levellpr:  # Optional: Enable license plate recognition (default: shown below)  enabled: False  # Optional: The device to run the models on (default: shown below)  device: CPU  # Optional: Set the model size used for text detection. (default: shown below)  model_size: small  # Optional: License plate object confidence score required to begin running recognition (default: shown below)  detection_threshold: 0.7  # Optional: Minimum area of license plate to begin running recognition (default: shown below)  min_area: 1000  # Optional: Recognition confidence score required to add the plate to the object as a sub label (default: shown below)  recognition_threshold: 0.9  # Optional: Minimum number of characters a license plate must have to be added to the object as a sub label (default: shown below)  min_plate_length: 4  # Optional: Regular expression for the expected format of a license plate (default: shown below)  format: None  # Optional: Allow this number of missing/incorrect characters to still cause a detected plate to match a known plate  match_distance: 1  # Optional: Known plates to track (strings or regular expressions) (default: shown below)  known_plates: {}  # Optional: Enhance the detected plate image with contrast adjustment and denoising (default: shown below)  # A value between 0 and 10. Higher values are not always better and may perform worse than lower values.  enhancement: 0  # Optional: Save plate images to /media/frigate/clips/lpr for debugging purposes (default: shown below)  debug_save_plates: False# Optional: Configuration for AI generated tracked object descriptions# WARNING: Depending on the provider, this will send thumbnails over the internet# to Google or OpenAI's LLMs to generate descriptions. It can be overridden at# the camera level (enabled: False) to enhance privacy for indoor cameras.genai:  # Optional: Enable AI description generation (default: shown below)  enabled: False  # Required if enabled: Provider must be one of ollama, gemini, or openai  provider: ollama  # Required if provider is ollama. May also be used for an OpenAI API compatible backend with the openai provider.  base_url: http://localhost::11434  # Required if gemini or openai  api_key: "{FRIGATE_GENAI_API_KEY}"  # Optional: The default prompt for generating descriptions. Can use replacement  # variables like "label", "sub_label", "camera" to make more dynamic. (default: shown below)  prompt: "Describe the {label} in the sequence of images with as much detail as possible. Do not describe the background."  # Optional: Object specific prompts to customize description results  # Format: {label}: {prompt}  object_prompts:    person: "My special person prompt."# Optional: Restream configuration# Uses https://github.com/AlexxIT/go2rtc (v1.9.9)# NOTE: The default go2rtc API port (1984) must be used,#       changing this port for the integrated go2rtc instance is not supported.go2rtc:# Optional: Live stream configuration for WebUI.# NOTE: Can be overridden at the camera levellive:  # Optional: Set the streams configured in go2rtc  # that should be used for live view in frigate WebUI. (default: name of camera)  # NOTE: In most cases this should be set at the camera level only.  streams:    main_stream: main_stream_name    sub_stream: sub_stream_name  # Optional: Set the height of the jsmpeg stream. (default: 720)  # This must be less than or equal to the height of the detect stream. Lower resolutions  # reduce bandwidth required for viewing the jsmpeg stream. Width is computed to match known aspect ratio.  height: 720  # Optional: Set the encode quality of the jsmpeg stream (default: shown below)  # 1 is the highest quality, and 31 is the lowest. Lower quality feeds utilize less CPU resources.  quality: 8# Optional: in-feed timestamp style configuration# NOTE: Can be overridden at the camera leveltimestamp_style:  # Optional: Position of the timestamp (default: shown below)  #           "tl" (top left), "tr" (top right), "bl" (bottom left), "br" (bottom right)  position: "tl"  # Optional: Format specifier conform to the Python package "datetime" (default: shown below)  #           Additional Examples:  #             german: "%d.%m.%Y %H:%M:%S"  format: "%m/%d/%Y %H:%M:%S"  # Optional: Color of font  color:    # All Required when color is specified (default: shown below)    red: 255    green: 255    blue: 255  # Optional: Line thickness of font (default: shown below)  thickness: 2  # Optional: Effect of lettering (default: shown below)  #           None (No effect),  #           "solid" (solid background in inverse color of font)  #           "shadow" (shadow for font)  effect: None# Requiredcameras:  # Required: name of the camera  back:    # Optional: Enable/Disable the camera (default: shown below).    # If disabled: config is used but no live stream and no capture etc.    # Events/Recordings are still viewable.    enabled: True    # Optional: camera type used for some Frigate features (default: shown below)    # Options are "generic" and "lpr"    type: "generic"    # Required: ffmpeg settings for the camera    ffmpeg:      # Required: A list of input streams for the camera. See documentation for more information.      inputs:        # Required: the path to the stream        # NOTE: path may include environment variables or docker secrets, which must begin with 'FRIGATE_' and be referenced in {}        - path: rtsp://viewer:{FRIGATE_RTSP_PASSWORD}@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2          # Required: list of roles for this stream. valid values are: audio,detect,record          # NOTICE: In addition to assigning the audio, detect, and record roles          # they must also be enabled in the camera config.          roles:            - audio            - detect            - record          # Optional: stream specific global args (default: inherit)          # global_args:          # Optional: stream specific hwaccel args (default: inherit)          # hwaccel_args:          # Optional: stream specific input args (default: inherit)          # input_args:      # Optional: camera specific global args (default: inherit)      # global_args:      # Optional: camera specific hwaccel args (default: inherit)      # hwaccel_args:      # Optional: camera specific input args (default: inherit)      # input_args:      # Optional: camera specific output args (default: inherit)      # output_args:    # Optional: timeout for highest scoring image before allowing it    # to be replaced by a newer image. (default: shown below)    best_image_timeout: 60    # Optional: URL to visit the camera web UI directly from the system page. Might not be available on every camera.    webui_url: ""    # Optional: zones for this camera    zones:      # Required: name of the zone      # NOTE: This must be different than any camera names, but can match with another zone on another      #       camera.      front_steps:        # Required: List of x,y coordinates to define the polygon of the zone.        # NOTE: Presence in a zone is evaluated only based on the bottom center of the objects bounding box.        coordinates: 0.033,0.306,0.324,0.138,0.439,0.185,0.042,0.428        # Optional: The real-world distances of a 4-sided zone used for zones with speed estimation enabled (default: none)        # List distances in order of the zone points coordinates and use the unit system defined in the ui config        distances: 10,15,12,11        # Optional: Number of consecutive frames required for object to be considered present in the zone (default: shown below).        inertia: 3        # Optional: Number of seconds that an object must loiter to be considered in the zone (default: shown below)        loitering_time: 0        # Optional: List of objects that can trigger this zone (default: all tracked objects)        objects:          - person        # Optional: Zone level object filters.        # NOTE: The global and camera filters are applied upstream.        filters:          person:            min_area: 5000            max_area: 100000            threshold: 0.7    # Optional: Configuration for the jpg snapshots published via MQTT    mqtt:      # Optional: Enable publishing snapshot via mqtt for camera (default: shown below)      # NOTE: Only applies to publishing image data to MQTT via 'frigate/<camera_name>/<object_name>/snapshot'.      # All other messages will still be published.      enabled: True      # Optional: print a timestamp on the snapshots (default: shown below)      timestamp: True      # Optional: draw bounding box on the snapshots (default: shown below)      bounding_box: True      # Optional: crop the snapshot (default: shown below)      crop: True      # Optional: height to resize the snapshot to (default: shown below)      height: 270      # Optional: jpeg encode quality (default: shown below)      quality: 70      # Optional: Restrict mqtt messages to objects that entered any of the listed zones (default: no required zones)      required_zones: []    # Optional: Configuration for how camera is handled in the GUI.    ui:      # Optional: Adjust sort order of cameras in the UI. Larger numbers come later (default: shown below)      # By default the cameras are sorted alphabetically.      order: 0      # Optional: Whether or not to show the camera in the Frigate UI (default: shown below)      dashboard: True    # Optional: connect to ONVIF camera    # to enable PTZ controls.    onvif:      # Required: host of the camera being connected to.      # NOTE: HTTP is assumed by default; HTTPS is supported if you specify the scheme, ex: "https://0.0.0.0".      host: 0.0.0.0      # Optional: ONVIF port for device (default: shown below).      port: 8000      # Optional: username for login.      # NOTE: Some devices require admin to access ONVIF.      user: admin      # Optional: password for login.      password: admin      # Optional: Skip TLS verification from the ONVIF server (default: shown below)      tls_insecure: False      # Optional: Ignores time synchronization mismatches between the camera and the server during authentication.      # Using NTP on both ends is recommended and this should only be set to True in a "safe" environment due to the security risk it represents.      ignore_time_mismatch: False      # Optional: PTZ camera object autotracking. Keeps a moving object in      # the center of the frame by automatically moving the PTZ camera.      autotracking:        # Optional: enable/disable object autotracking. (default: shown below)        enabled: False        # Optional: calibrate the camera on startup (default: shown below)        # A calibration will move the PTZ in increments and measure the time it takes to move.        # The results are used to help estimate the position of tracked objects after a camera move.        # Frigate will update your config file automatically after a calibration with        # a "movement_weights" entry for the camera. You should then set calibrate_on_startup to False.        calibrate_on_startup: False        # Optional: the mode to use for zooming in/out on objects during autotracking. (default: shown below)        # Available options are: disabled, absolute, and relative        #   disabled - don't zoom in/out on autotracked objects, use pan/tilt only        #   absolute - use absolute zooming (supported by most PTZ capable cameras)        #   relative - use relative zooming (not supported on all PTZs, but makes concurrent pan/tilt/zoom movements)        zooming: disabled        # Optional: A value to change the behavior of zooming on autotracked objects. (default: shown below)        # A lower value will keep more of the scene in view around a tracked object.        # A higher value will zoom in more on a tracked object, but Frigate may lose tracking more quickly.        # The value should be between 0.1 and 0.75        zoom_factor: 0.3        # Optional: list of objects to track from labelmap.txt (default: shown below)        track:          - person        # Required: Begin automatically tracking an object when it enters any of the listed zones.        required_zones:          - zone_name        # Required: Name of ONVIF preset in camera's firmware to return to when tracking is over. (default: shown below)        return_preset: home        # Optional: Seconds to delay before returning to preset. (default: shown below)        timeout: 10        # Optional: Values generated automatically by a camera calibration. Do not modify these manually. (default: shown below)        movement_weights: []    # Optional: Configuration for how to sort the cameras in the Birdseye view.    birdseye:      # Optional: Adjust sort order of cameras in the Birdseye view. Larger numbers come later (default: shown below)      # By default the cameras are sorted alphabetically.      order: 0    # Optional: Configuration for AI generated tracked object descriptions    genai:      # Optional: Enable AI description generation (default: shown below)      enabled: False      # Optional: Use the object snapshot instead of thumbnails for description generation (default: shown below)      use_snapshot: False      # Optional: The default prompt for generating descriptions. Can use replacement      # variables like "label", "sub_label", "camera" to make more dynamic. (default: shown below)      prompt: "Describe the {label} in the sequence of images with as much detail as possible. Do not describe the background."      # Optional: Object specific prompts to customize description results      # Format: {label}: {prompt}      object_prompts:        person: "My special person prompt."      # Optional: objects to generate descriptions for (default: all objects that are tracked)      objects:        - person        - cat      # Optional: Restrict generation to objects that entered any of the listed zones (default: none, all zones qualify)      required_zones: []      # Optional: What triggers to use to send frames for a tracked object to generative AI (default: shown below)      send_triggers:        # Once the object is no longer tracked        tracked_object_end: True        # Optional: After X many significant updates are received (default: shown below)        after_significant_updates: None      # Optional: Save thumbnails sent to generative AI for review/debugging purposes (default: shown below)      debug_save_thumbnails: False# Optionalui:  # Optional: Set a timezone to use in the UI (default: use browser local time)  # timezone: America/Denver  # Optional: Set the time format used.  # Options are browser, 12hour, or 24hour (default: shown below)  time_format: browser  # Optional: Set the date style for a specified length.  # Options are: full, long, medium, short  # Examples:  #    short: 2/11/23  #    medium: Feb 11, 2023  #    full: Saturday, February 11, 2023  # (default: shown below).  date_style: short  # Optional: Set the time style for a specified length.  # Options are: full, long, medium, short  # Examples:  #    short: 8:14 PM  #    medium: 8:15:22 PM  #    full: 8:15:22 PM Mountain Standard Time  # (default: shown below).  time_style: medium  # Optional: Ability to manually override the date / time styling to use strftime format  # https://www.gnu.org/software/libc/manual/html_node/Formatting-Calendar-Time.html  # possible values are shown above (default: not set)  strftime_fmt: "%Y/%m/%d %H:%M"  # Optional: Set the unit system to either "imperial" or "metric" (default: metric)  # Used in the UI and in MQTT topics  unit_system: metric# Optional: Telemetry configurationtelemetry:  # Optional: Enabled network interfaces for bandwidth stats monitoring (default: empty list, let nethogs search all)  network_interfaces:    - eth    - enp    - eno    - ens    - wl    - lo  # Optional: Configure system stats  stats:    # Optional: Enable AMD GPU stats (default: shown below)    amd_gpu_stats: True    # Optional: Enable Intel GPU stats (default: shown below)    intel_gpu_stats: True    # Optional: Treat GPU as SR-IOV to fix GPU stats (default: shown below)    intel_gpu_device: None    # Optional: Enable network bandwidth stats monitoring for camera ffmpeg processes, go2rtc, and object detectors. (default: shown below)    # NOTE: The container must either be privileged or have cap_net_admin, cap_net_raw capabilities enabled.    network_bandwidth: False  # Optional: Enable the latest version outbound check (default: shown below)  # NOTE: If you use the Home Assistant integration, disabling this will prevent it from reporting new versions  version_check: True# Optional: Camera groups (default: no groups are setup)# NOTE: It is recommended to use the UI to setup camera groupscamera_groups:  # Required: Name of camera group  front:    # Required: list of cameras in the group    cameras:      - front_cam      - side_cam      - front_doorbell_cam    # Required: icon used for group    icon: LuCar    # Required: index of this group    order: 0
```

*   [Full configuration reference:](#full-configuration-reference)

--- END OF FILE: configuration-restream.md ---
--- START OF FILE: configuration-restream.md ---

Source: https://docs.frigate.video/configuration/restream

On this page

## RTSP[​](#rtsp "Direct link to RTSP")

Frigate can restream your video feed as an RTSP feed for other applications such as Home Assistant to utilize it at `rtsp://<frigate_host>:8554/<camera_name>`. Port 8554 must be open. [This allows you to use a video feed for detection in Frigate and Home Assistant live view at the same time without having to make two separate connections to the camera](#reduce-connections-to-camera). The video feed is copied from the original video feed directly to avoid re-encoding. This feed does not include any annotation by Frigate.

Frigate uses [go2rtc](https://github.com/AlexxIT/go2rtc/tree/v1.9.9) to provide its restream and MSE/WebRTC capabilities. The go2rtc config is hosted at the `go2rtc` in the config, see [go2rtc docs](https://github.com/AlexxIT/go2rtc/tree/v1.9.9#configuration) for more advanced configurations and features.

note

You can access the go2rtc stream info at `/api/go2rtc/streams` which can be helpful to debug as well as provide useful information about your camera streams.

### Birdseye Restream[​](#birdseye-restream "Direct link to Birdseye Restream")

Birdseye RTSP restream can be accessed at `rtsp://<frigate_host>:8554/birdseye`. Enabling the birdseye restream will cause birdseye to run 24/7 which may increase CPU usage somewhat.

```
birdseye:  restream: True
```

### Securing Restream With Authentication[​](#securing-restream-with-authentication "Direct link to Securing Restream With Authentication")

The go2rtc restream can be secured with RTSP based username / password authentication. Ex:

```
go2rtc:  rtsp:    username: "admin"    password: "pass"  streams: ...
```

**NOTE:** This does not apply to localhost requests, there is no need to provide credentials when using the restream as a source for frigate cameras.

## Reduce Connections To Camera[​](#reduce-connections-to-camera "Direct link to Reduce Connections To Camera")

Some cameras only support one active connection or you may just want to have a single connection open to the camera. The RTSP restream allows this to be possible.

### With Single Stream[​](#with-single-stream "Direct link to With Single Stream")

One connection is made to the camera. One for the restream, `detect` and `record` connect to the restream.

```
go2rtc:  streams:    name_your_rtsp_cam: # <- for RTSP streams      - rtsp://192.168.1.5:554/live0 # <- stream which supports video & aac audio      - "ffmpeg:name_your_rtsp_cam#audio=opus" # <- copy of the stream which transcodes audio to the missing codec (usually will be opus)    name_your_http_cam: # <- for other streams      - http://192.168.50.155/flv?port=1935&app=bcs&stream=channel0_main.bcs&user=user&password=password # <- stream which supports video & aac audio      - "ffmpeg:name_your_http_cam#audio=opus" # <- copy of the stream which transcodes audio to the missing codec (usually will be opus)cameras:  name_your_rtsp_cam:    ffmpeg:      output_args:        record: preset-record-generic-audio-copy      inputs:        - path: rtsp://127.0.0.1:8554/name_your_rtsp_cam # <--- the name here must match the name of the camera in restream          input_args: preset-rtsp-restream          roles:            - record            - detect            - audio # <- only necessary if audio detection is enabled  name_your_http_cam:    ffmpeg:      output_args:        record: preset-record-generic-audio-copy      inputs:        - path: rtsp://127.0.0.1:8554/name_your_http_cam # <--- the name here must match the name of the camera in restream          input_args: preset-rtsp-restream          roles:            - record            - detect            - audio # <- only necessary if audio detection is enabled
```

### With Sub Stream[​](#with-sub-stream "Direct link to With Sub Stream")

Two connections are made to the camera. One for the sub stream, one for the restream, `record` connects to the restream.

```
go2rtc:  streams:    name_your_rtsp_cam:      - rtsp://192.168.1.5:554/live0 # <- stream which supports video & aac audio. This is only supported for rtsp streams, http must use ffmpeg      - "ffmpeg:name_your_rtsp_cam#audio=opus" # <- copy of the stream which transcodes audio to opus    name_your_rtsp_cam_sub:      - rtsp://192.168.1.5:554/substream # <- stream which supports video & aac audio. This is only supported for rtsp streams, http must use ffmpeg      - "ffmpeg:name_your_rtsp_cam_sub#audio=opus" # <- copy of the stream which transcodes audio to opus    name_your_http_cam:      - http://192.168.50.155/flv?port=1935&app=bcs&stream=channel0_main.bcs&user=user&password=password # <- stream which supports video & aac audio. This is only supported for rtsp streams, http must use ffmpeg      - "ffmpeg:name_your_http_cam#audio=opus" # <- copy of the stream which transcodes audio to opus    name_your_http_cam_sub:      - http://192.168.50.155/flv?port=1935&app=bcs&stream=channel0_ext.bcs&user=user&password=password # <- stream which supports video & aac audio. This is only supported for rtsp streams, http must use ffmpeg      - "ffmpeg:name_your_http_cam_sub#audio=opus" # <- copy of the stream which transcodes audio to opuscameras:  name_your_rtsp_cam:    ffmpeg:      output_args:        record: preset-record-generic-audio-copy      inputs:        - path: rtsp://127.0.0.1:8554/name_your_rtsp_cam # <--- the name here must match the name of the camera in restream          input_args: preset-rtsp-restream          roles:            - record        - path: rtsp://127.0.0.1:8554/name_your_rtsp_cam_sub # <--- the name here must match the name of the camera_sub in restream          input_args: preset-rtsp-restream          roles:            - audio # <- only necessary if audio detection is enabled            - detect  name_your_http_cam:    ffmpeg:      output_args:        record: preset-record-generic-audio-copy      inputs:        - path: rtsp://127.0.0.1:8554/name_your_http_cam # <--- the name here must match the name of the camera in restream          input_args: preset-rtsp-restream          roles:            - record        - path: rtsp://127.0.0.1:8554/name_your_http_cam_sub # <--- the name here must match the name of the camera_sub in restream          input_args: preset-rtsp-restream          roles:            - audio # <- only necessary if audio detection is enabled            - detect
```

## Handling Complex Passwords[​](#handling-complex-passwords "Direct link to Handling Complex Passwords")

go2rtc expects URL-encoded passwords in the config, [urlencoder.org](https://urlencoder.org) can be used for this purpose.

For example:

```
go2rtc:  streams:    my_camera: rtsp://username:$@foo%@192.168.1.100
```

becomes

```
go2rtc:  streams:    my_camera: rtsp://username:$%40foo%25@192.168.1.100
```

See [this comment](https://github.com/AlexxIT/go2rtc/issues/1217#issuecomment-2242296489) for more information.

## Advanced Restream Configurations[​](#advanced-restream-configurations "Direct link to Advanced Restream Configurations")

The [exec](https://github.com/AlexxIT/go2rtc/tree/v1.9.9#source-exec) source in go2rtc can be used for custom ffmpeg commands. An example is below:

NOTE: The output will need to be passed with two curly braces `{{output}}`

```
go2rtc:  streams:    stream1: exec:ffmpeg -hide_banner -re -stream_loop -1 -i /media/BigBuckBunny.mp4 -c copy -rtsp_transport tcp -f rtsp {{output}}
```

*   [RTSP](#rtsp)
    *   [Birdseye Restream](#birdseye-restream)
    *   [Securing Restream With Authentication](#securing-restream-with-authentication)
*   [Reduce Connections To Camera](#reduce-connections-to-camera)
    *   [With Single Stream](#with-single-stream)
    *   [With Sub Stream](#with-sub-stream)
*   [Handling Complex Passwords](#handling-complex-passwords)
*   [Advanced Restream Configurations](#advanced-restream-configurations)

--- END OF FILE: configuration-review.md ---
--- START OF FILE: configuration-review.md ---

Source: https://docs.frigate.video/configuration/review

On this page

The Review page of the Frigate UI is for quickly reviewing historical footage of interest from your cameras. _Review items_ are indicated on a vertical timeline and displayed as a grid of previews - bandwidth-optimized, low frame rate, low resolution videos. Hovering over or swiping a preview plays the video and marks it as reviewed. If more in-depth analysis is required, the preview can be clicked/tapped and the full frame rate, full resolution recording is displayed.

Review items are filterable by date, object type, and camera.

### Review items vs. tracked objects (formerly "events")[​](#review-items-vs-tracked-objects-formerly-events "Direct link to Review items vs. tracked objects (formerly \"events\")")

In Frigate 0.13 and earlier versions, the UI presented "events". An event was synonymous with a tracked or detected object. In Frigate 0.14 and later, a review item is a time period where any number of tracked objects were active.

For example, consider a situation where two people walked past your house. One was walking a dog. At the same time, a car drove by on the street behind them.

In this scenario, Frigate 0.13 and earlier would show 4 "events" in the UI - one for each person, another for the dog, and yet another for the car. You would have had 4 separate videos to watch even though they would have all overlapped.

In 0.14 and later, all of that is bundled into a single review item which starts and ends to capture all of that activity. Reviews for a single camera cannot overlap. Once you have watched that time period on that camera, it is marked as reviewed.

## Alerts and Detections[​](#alerts-and-detections "Direct link to Alerts and Detections")

Not every segment of video captured by Frigate may be of the same level of interest to you. Video of people who enter your property may be a different priority than those walking by on the sidewalk. For this reason, Frigate 0.14 categorizes review items as _alerts_ and _detections_. By default, all person and car objects are considered alerts. You can refine categorization of your review items by configuring required zones for them.

note

Alerts and detections categorize the tracked objects in review items, but Frigate must first detect those objects with your configured object detector (Coral, OpenVINO, etc). By default, the object tracker only detects `person`. Setting `labels` for `alerts` and `detections` does not automatically enable detection of new objects. To detect more than `person`, you should add the following to your config:

```
objects:  track:    - person    - car    - ...
```

See the [objects documentation](/configuration/objects) for the list of objects that Frigate's default model tracks.

## Restricting alerts to specific labels[​](#restricting-alerts-to-specific-labels "Direct link to Restricting alerts to specific labels")

By default a review item will only be marked as an alert if a person or car is detected. This can be configured to include any object or audio label using the following config:

```
# can be overridden at the camera levelreview:  alerts:    labels:      - car      - cat      - dog      - person      - speech
```

## Restricting detections to specific labels[​](#restricting-detections-to-specific-labels "Direct link to Restricting detections to specific labels")

By default all detections that do not qualify as an alert qualify as a detection. However, detections can further be filtered to only include certain labels or certain zones.

```
# can be overridden at the camera levelreview:  detections:    labels:      - bark      - dog
```

## Excluding a camera from alerts or detections[​](#excluding-a-camera-from-alerts-or-detections "Direct link to Excluding a camera from alerts or detections")

To exclude a specific camera from alerts or detections, simply provide an empty list to the alerts or detections field _at the camera level_.

For example, to exclude objects on the camera _gatecamera_ from any detections, include this in your config:

```
cameras:  gatecamera:    review:      detections:        labels: []
```

## Restricting review items to specific zones[​](#restricting-review-items-to-specific-zones "Direct link to Restricting review items to specific zones")

By default a review item will be created if any `review -> alerts -> labels` and `review -> detections -> labels` are detected anywhere in the camera frame. You will likely want to configure review items to only be created when the object enters an area of interest, [see the zone docs for more information](/configuration/zones#restricting-alerts-and-detections-to-specific-zones)

info

Because zones don't apply to audio, audio labels will always be marked as a detection by default.

*   [Review items vs. tracked objects (formerly "events")](#review-items-vs-tracked-objects-formerly-events)
*   [Alerts and Detections](#alerts-and-detections)
*   [Restricting alerts to specific labels](#restricting-alerts-to-specific-labels)
*   [Restricting detections to specific labels](#restricting-detections-to-specific-labels)
*   [Excluding a camera from alerts or detections](#excluding-a-camera-from-alerts-or-detections)
*   [Restricting review items to specific zones](#restricting-review-items-to-specific-zones)

--- END OF FILE: configuration-semantic_search.md ---
--- START OF FILE: configuration-semantic_search.md ---

Source: https://docs.frigate.video/configuration/semantic_search

On this page

Semantic Search in Frigate allows you to find tracked objects within your review items using either the image itself, a user-defined text description, or an automatically generated one. This feature works by creating _embeddings_ — numerical vector representations — for both the images and text descriptions of your tracked objects. By comparing these embeddings, Frigate assesses their similarities to deliver relevant search results.

Frigate uses models from [Jina AI](https://huggingface.co/jinaai) to create and save embeddings to Frigate's database. All of this runs locally.

Semantic Search is accessed via the _Explore_ view in the Frigate UI.

## Minimum System Requirements[​](#minimum-system-requirements "Direct link to Minimum System Requirements")

Semantic Search works by running a large AI model locally on your system. Small or underpowered systems like a Raspberry Pi will not run Semantic Search reliably or at all.

A minimum of 8GB of RAM is required to use Semantic Search. A GPU is not strictly required but will provide a significant performance increase over CPU-only systems.

For best performance, 16GB or more of RAM and a dedicated GPU are recommended.

## Configuration[​](#configuration "Direct link to Configuration")

Semantic Search is disabled by default, and must be enabled in your config file or in the UI's Enrichments Settings page before it can be used. Semantic Search is a global configuration setting.

```
semantic_search:  enabled: True  reindex: False
```

tip

The embeddings database can be re-indexed from the existing tracked objects in your database by pressing the "Reindex" button in the Enrichments Settings in the UI or by adding `reindex: True` to your `semantic_search` configuration and restarting Frigate. Depending on the number of tracked objects you have, it can take a long while to complete and may max out your CPU while indexing.

If you are enabling Semantic Search for the first time, be advised that Frigate does not automatically index older tracked objects. You will need to reindex as described above.

### Jina AI CLIP (version 1)[​](#jina-ai-clip-version-1 "Direct link to Jina AI CLIP (version 1)")

The [V1 model from Jina](https://huggingface.co/jinaai/jina-clip-v1) has a vision model which is able to embed both images and text into the same vector space, which allows `image -> image` and `text -> image` similarity searches. Frigate uses this model on tracked objects to encode the thumbnail image and store it in the database. When searching for tracked objects via text in the search box, Frigate will perform a `text -> image` similarity search against this embedding. When clicking "Find Similar" in the tracked object detail pane, Frigate will perform an `image -> image` similarity search to retrieve the closest matching thumbnails.

The V1 text model is used to embed tracked object descriptions and perform searches against them. Descriptions can be created, viewed, and modified on the Explore page when clicking on thumbnail of a tracked object. See [the Generative AI docs](/configuration/genai) for more information on how to automatically generate tracked object descriptions.

Differently weighted versions of the Jina models are available and can be selected by setting the `model_size` config option as `small` or `large`:

```
semantic_search:  enabled: True  model: "jinav1"  model_size: small
```

*   Configuring the `large` model employs the full Jina model and will automatically run on the GPU if applicable.
*   Configuring the `small` model employs a quantized version of the Jina model that uses less RAM and runs on CPU with a very negligible difference in embedding quality.

### Jina AI CLIP (version 2)[​](#jina-ai-clip-version-2 "Direct link to Jina AI CLIP (version 2)")

Frigate also supports the [V2 model from Jina](https://huggingface.co/jinaai/jina-clip-v2), which introduces multilingual support (89 languages). In contrast, the V1 model only supports English.

V2 offers only a 3% performance improvement over V1 in both text-image and text-text retrieval tasks, an upgrade that is unlikely to yield noticeable real-world benefits. Additionally, V2 has _significantly_ higher RAM and GPU requirements, leading to increased inference time and memory usage. If you plan to use V2, ensure your system has ample RAM and a discrete GPU. CPU inference (with the `small` model) using V2 is not recommended.

To use the V2 model, update the `model` parameter in your config:

```
semantic_search:  enabled: True  model: "jinav2"  model_size: large
```

For most users, especially native English speakers, the V1 model remains the recommended choice.

note

Switching between V1 and V2 requires reindexing your embeddings. The embeddings from V1 and V2 are incompatible, and failing to reindex will result in incorrect search results.

### GPU Acceleration[​](#gpu-acceleration "Direct link to GPU Acceleration")

The CLIP models are downloaded in ONNX format, and the `large` model can be accelerated using GPU hardware, when available. This depends on the Docker build that is used.

```
semantic_search:  enabled: True  model_size: large
```

info

If the correct build is used for your GPU and the `large` model is configured, then the GPU will be detected and used automatically.

See the [Hardware Accelerated Enrichments](/configuration/hardware_acceleration_enrichments) documentation.

## Usage and Best Practices[​](#usage-and-best-practices "Direct link to Usage and Best Practices")

1.  Semantic Search is used in conjunction with the other filters available on the Explore page. Use a combination of traditional filtering and Semantic Search for the best results.
2.  Use the thumbnail search type when searching for particular objects in the scene. Use the description search type when attempting to discern the intent of your object.
3.  Because of how the AI models Frigate uses have been trained, the comparison between text and image embedding distances generally means that with multi-modal (`thumbnail` and `description`) searches, results matching `description` will appear first, even if a `thumbnail` embedding may be a better match. Play with the "Search Type" setting to help find what you are looking for. Note that if you are generating descriptions for specific objects or zones only, this may cause search results to prioritize the objects with descriptions even if the the ones without them are more relevant.
4.  Make your search language and tone closely match exactly what you're looking for. If you are using thumbnail search, **phrase your query as an image caption**. Searching for "red car" may not work as well as "red sedan driving down a residential street on a sunny day".
5.  Semantic search on thumbnails tends to return better results when matching large subjects that take up most of the frame. Small things like "cat" tend to not work well.
6.  Experiment! Find a tracked object you want to test and start typing keywords and phrases to see what works for you.

*   [Minimum System Requirements](#minimum-system-requirements)
*   [Configuration](#configuration)
    *   [Jina AI CLIP (version 1)](#jina-ai-clip-version-1)
    *   [Jina AI CLIP (version 2)](#jina-ai-clip-version-2)
    *   [GPU Acceleration](#gpu-acceleration)
*   [Usage and Best Practices](#usage-and-best-practices)

--- END OF FILE: configuration-snapshots.md ---
--- START OF FILE: configuration-snapshots.md ---

Source: https://docs.frigate.video/configuration/snapshots

Frigate can save a snapshot image to `/media/frigate/clips` for each object that is detected named as `<camera>-<id>.jpg`. They are also accessible [via the api](/integrations/api/event-snapshot-events-event-id-snapshot-jpg-get)

Snapshots are accessible in the UI in the Explore pane. This allows for quick submission to the Frigate+ service.

To only save snapshots for objects that enter a specific zone, [see the zone docs](/configuration/zones#restricting-snapshots-to-specific-zones)

Snapshots sent via MQTT are configured in the [config file](https://docs.frigate.video/configuration/) under `cameras -> your_camera -> mqtt`

--- END OF FILE: configuration-stationary_objects.md ---
--- START OF FILE: configuration-stationary_objects.md ---

Source: https://docs.frigate.video/configuration/stationary_objects

On this page

An object is considered stationary when it is being tracked and has been in a very similar position for a certain number of frames. This number is defined in the configuration under `detect -> stationary -> threshold`, and is 10x the frame rate (or 10 seconds) by default. Once an object is considered stationary, it will remain stationary until motion occurs within the object at which point object detection will start running again. If the object changes location, it will be considered active.

## Why does it matter if an object is stationary?[​](#why-does-it-matter-if-an-object-is-stationary "Direct link to Why does it matter if an object is stationary?")

Once an object becomes stationary, object detection will not be continually run on that object. This serves to reduce resource usage and redundant detections when there has been no motion near the tracked object. This also means that Frigate is contextually aware, and can for example [filter out recording segments](/configuration/record#what-do-the-different-retain-modes-mean) to only when the object is considered active. Motion alone does not determine if an object is "active" for active\_objects segment retention. Lighting changes for a parked car won't make an object active.

## Tuning stationary behavior[​](#tuning-stationary-behavior "Direct link to Tuning stationary behavior")

The default config is:

```
detect:  stationary:    interval: 50    threshold: 50
```

`interval` is defined as the frequency for running detection on stationary objects. This means that by default once an object is considered stationary, detection will not be run on it until motion is detected or until the interval (every 50th frame by default). With `interval >= 1`, every nth frames detection will be run to make sure the object is still there.

NOTE: There is no way to disable stationary object tracking with this value.

`threshold` is the number of frames an object needs to remain relatively still before it is considered stationary.

## Why does Frigate track stationary objects?[​](#why-does-frigate-track-stationary-objects "Direct link to Why does Frigate track stationary objects?")

Frigate didn't always track stationary objects. In fact, it didn't even track objects at all initially.

Let's look at an example use case: I want to record any cars that enter my driveway.

One might simply think "Why not just run object detection any time there is motion around the driveway area and notify if the bounding box is in that zone?"

With that approach, what video is related to the car that entered the driveway? Did it come from the left or right? Was it parked across the street for an hour before turning into the driveway? One approach is to just record 24/7 or for motion (on any changed changed pixels) and not attempt to do that at all. This is what most other NVRs do. Just don't even try to identify a start and end for that object since it's hard and you will be wrong some portion of the time.

Couldn't you just look at when motion stopped and started? Motion for a video feed is nothing more than looking for pixels that are different than they were in previous frames. If the car entered the driveway while someone was mowing the grass, how would you know which motion was for the car and which was for the person when they mow along the driveway or street? What if another car was driving the other direction on the street? Or what if its a windy day and the bush by your mailbox is blowing around?

In order to do it more accurately, you need to identify objects and track them with a unique id. In each subsequent frame, everything has moved a little and you need to determine which bounding boxes go with each object from the previous frame.

Tracking objects across frames is a challenging problem. Especially if you want to do it in real time. There are entire competitions for research algorithms to see which of them can do it the most accurately. Zero of them are accurate 100% of the time. Even the ones that can't do it in realtime. There is always an error rate in the algorithm.

Now consider that the car is driving down a street that has other cars parked along it. It will drive behind some of these cars and in front of others. There may even be a car driving the opposite direction.

Let's assume for now that we are NOT already tracking two parked cars on the street or the car parked in the driveway, ie, there is no stationary object tracking.

As the car you are tracking approaches an area with 2 cars parked, the headlights reflect off the parked cars and the car parked in your driveway. The pixel values are different in that area, so there is motion detected. Object detection runs and identifies the remaining 3 cars. In the previous frame, you had a single bounding box from the car you are tracking. Now you have 4. The original object, the 2 cars on the street and the one in your driveway.

Now you have to determine which of the bounding boxes in this frame should be matched to the tracking id from the previous frame where you only had one. Remember, you have never seen these additional 3 cars before, so you know nothing about them. On top of that the bounding box for the car you are tracking has now moved to a new location, so which of the 4 belongs to the car you were originally tracking? The algorithms here are fairly good. They use a Kalman filter to predict the next location of an object using the historical bounding boxes and the bounding box closest to the predicted location is linked. It's right sometimes, but the error rate is going to be high when there are 4 possible bounding boxes.

Now let's assume that those other 3 cars were already being tracked as stationary objects, so the car driving down the street is a new 4th car. The object tracker knows we have had 3 cars and we now have 4. As the new car approaches the parked cars, the bounding boxes for all 4 cars is predicted based on the previous frames. The predicted boxes for the parked cars is pretty much a 100% overlap with the bounding boxes in the new frame. The parked cars are slam dunk matches to the tracking ids they had before and the only one left is the remaining bounding box which gets assigned to the new car. This results in a much lower error rate. Not perfect, but better.

The most difficult scenario that causes IDs to be assigned incorrectly is when an object completely occludes another object. When a car drives in front of another car and its no longer visible, a bounding box disappeared and it's a bit of a toss up when assigning the id since it's difficult to know which one is in front of the other. This happens for cars passing in front of other cars fairly often. It's something that we want to improve in the future.

*   [Why does it matter if an object is stationary?](#why-does-it-matter-if-an-object-is-stationary)
*   [Tuning stationary behavior](#tuning-stationary-behavior)
*   [Why does Frigate track stationary objects?](#why-does-frigate-track-stationary-objects)

--- END OF FILE: configuration-tls.md ---
--- START OF FILE: configuration-tls.md ---

Source: https://docs.frigate.video/configuration/tls

On this page

Frigate's integrated NGINX server supports TLS certificates. By default Frigate will generate a self signed certificate that will be used for port 8971. Frigate is designed to make it easy to use whatever tool you prefer to manage certificates.

Frigate is often running behind a reverse proxy that manages TLS certificates for multiple services. You will likely need to set your reverse proxy to allow self signed certificates or you can disable TLS in Frigate's config. However, if you are running on a dedicated device that's separate from your proxy or if you expose Frigate directly to the internet, you may want to configure TLS with valid certificates.

In many deployments, TLS will be unnecessary. It can be disabled in the config with the following yaml:

```
tls:  enabled: False
```

## Certificates[​](#certificates "Direct link to Certificates")

TLS certificates can be mounted at `/etc/letsencrypt/live/frigate` using a bind mount or docker volume.

```
frigate:  ...  volumes:    - /path/to/your/certificate_folder:/etc/letsencrypt/live/frigate:ro  ...
```

Within the folder, the private key is expected to be named `privkey.pem` and the certificate is expected to be named `fullchain.pem`.

Note that certbot uses symlinks, and those can't be followed by the container unless it has access to the targets as well, so if using certbot you'll also have to mount the `archive` folder for your domain, e.g.:

```
frigate:  ...  volumes:    - /etc/letsencrypt/live/your.fqdn.net:/etc/letsencrypt/live/frigate:ro    - /etc/letsencrypt/archive/your.fqdn.net:/etc/letsencrypt/archive/your.fqdn.net:ro  ...
```

Frigate automatically compares the fingerprint of the certificate at `/etc/letsencrypt/live/frigate/fullchain.pem` against the fingerprint of the TLS cert in NGINX every minute. If these differ, the NGINX config is reloaded to pick up the updated certificate.

If you issue Frigate valid certificates you will likely want to configure it to run on port 443 so you can access it without a port number like `https://your-frigate-domain.com` by mapping 8971 to 443.

```
frigate:  ...  ports:    - "443:8971"  ...
```

## ACME Challenge[​](#acme-challenge "Direct link to ACME Challenge")

Frigate also supports hosting the acme challenge files for the HTTP challenge method if needed. The challenge files should be mounted at `/etc/letsencrypt/www`.

*   [Certificates](#certificates)
*   [ACME Challenge](#acme-challenge)

--- END OF FILE: configuration-zones.md ---
--- START OF FILE: configuration-zones.md ---

Source: https://docs.frigate.video/configuration/zones

On this page

Zones allow you to define a specific area of the frame and apply additional filters for object types so you can determine whether or not an object is within a particular area. Presence in a zone is evaluated based on the bottom center of the bounding box for the object. It does not matter how much of the bounding box overlaps with the zone.

For example, the cat in this image is currently in Zone 1, but **not** Zone 2. ![bottom center](/assets/images/bottom-center-8624476e23c8973f865c84a8a677ec8a.jpg)

Zones cannot have the same name as a camera. If desired, a single zone can include multiple cameras if you have multiple cameras covering the same area by configuring zones with the same name for each camera.

During testing, enable the Zones option for the Debug view of your camera (Settings --> Debug) so you can adjust as needed. The zone line will increase in thickness when any object enters the zone.

To create a zone, follow [the steps for a "Motion mask"](/configuration/masks), but use the section of the web UI for creating a zone instead.

### Restricting alerts and detections to specific zones[​](#restricting-alerts-and-detections-to-specific-zones "Direct link to Restricting alerts and detections to specific zones")

Often you will only want alerts to be created when an object enters areas of interest. This is done using zones along with setting required\_zones. Let's say you only want to have an alert created when an object enters your entire\_yard zone, the config would be:

```
cameras:  name_of_your_camera:    review:      alerts:        required_zones:          - entire_yard    zones:      entire_yard:        coordinates: ...
```

You may also want to filter detections to only be created when an object enters a secondary area of interest. This is done using zones along with setting required\_zones. Let's say you want alerts when an object enters the inner area of the yard but detections when an object enters the edge of the yard, the config would be

```
cameras:  name_of_your_camera:    review:      alerts:        required_zones:          - inner_yard      detections:        required_zones:          - edge_yard    zones:      edge_yard:        coordinates: ...      inner_yard:        coordinates: ...
```

### Restricting snapshots to specific zones[​](#restricting-snapshots-to-specific-zones "Direct link to Restricting snapshots to specific zones")

```
cameras:  name_of_your_camera:    snapshots:      required_zones:        - entire_yard    zones:      entire_yard:        coordinates: ...
```

### Restricting zones to specific objects[​](#restricting-zones-to-specific-objects "Direct link to Restricting zones to specific objects")

Sometimes you want to limit a zone to specific object types to have more granular control of when alerts, detections, and snapshots are saved. The following example will limit one zone to person objects and the other to cars.

```
cameras:  name_of_your_camera:    zones:      entire_yard:        coordinates: ... (everywhere you want a person)        objects:          - person      front_yard_street:        coordinates: ... (just the street)        objects:          - car
```

Only car objects can trigger the `front_yard_street` zone and only person can trigger the `entire_yard`. Objects will be tracked for any `person` that enter anywhere in the yard, and for cars only if they enter the street.

### Zone Loitering[​](#zone-loitering "Direct link to Zone Loitering")

Sometimes objects are expected to be passing through a zone, but an object loitering in an area is unexpected. Zones can be configured to have a minimum loitering time after which the object will be considered in the zone.

note

When using loitering zones, a review item will remain active until the object leaves. Loitering zones are only meant to be used in areas where loitering is not expected behavior.

```
cameras:  name_of_your_camera:    zones:      sidewalk:        loitering_time: 4 # unit is in seconds        objects:          - person
```

### Zone Inertia[​](#zone-inertia "Direct link to Zone Inertia")

Sometimes an objects bounding box may be slightly incorrect and the bottom center of the bounding box is inside the zone while the object is not actually in the zone. Zone inertia helps guard against this by requiring an object's bounding box to be within the zone for multiple consecutive frames. This value can be configured:

```
cameras:  name_of_your_camera:    zones:      front_yard:        inertia: 3        objects:          - person
```

There may also be cases where you expect an object to quickly enter and exit a zone, like when a car is pulling into the driveway, and you may want to have the object be considered present in the zone immediately:

```
cameras:  name_of_your_camera:    zones:      driveway_entrance:        inertia: 1        objects:          - car
```

### Speed Estimation[​](#speed-estimation "Direct link to Speed Estimation")

Frigate can be configured to estimate the speed of objects moving through a zone. This works by combining data from Frigate's object tracker and "real world" distance measurements of the edges of the zone. The recommended use case for this feature is to track the speed of vehicles on a road as they move through the zone.

Your zone must be defined with exactly 4 points and should be aligned to the ground where objects are moving.

![Ground plane 4-point zone](/assets/images/ground-plane-cfad72ca2f2c63ab664c411fa78412e6.jpg)

Speed estimation requires a minimum number of frames for your object to be tracked before a valid estimate can be calculated, so create your zone away from places where objects enter and exit for the best results. The object's bounding box must be stable and remain a constant size as it enters and exits the zone. _Your zone should not take up the full frame, and the zone does **not** need to be the same size or larger than the objects passing through it._ An object's speed is tracked while it passes through the zone and then saved to Frigate's database.

Accurate real-world distance measurements are required to estimate speeds. These distances can be specified in your zone config through the `distances` field.

```
cameras:  name_of_your_camera:    zones:      street:        coordinates: 0.033,0.306,0.324,0.138,0.439,0.185,0.042,0.428        distances: 10,12,11,13.5 # in meters or feet
```

Each number in the `distance` field represents the real-world distance between the points in the `coordinates` list. So in the example above, the distance between the first two points (\[0.033,0.306\] and \[0.324,0.138\]) is 10. The distance between the second and third set of points (\[0.324,0.138\] and \[0.439,0.185\]) is 12, and so on. The fastest and most accurate way to configure this is through the Zone Editor in the Frigate UI.

The `distance` values are measured in meters (metric) or feet (imperial), depending on how `unit_system` is configured in your `ui` config:

```
ui:  # can be "metric" or "imperial", default is metric  unit_system: metric
```

The average speed of your object as it moved through your zone is saved in Frigate's database and can be seen in the UI in the Tracked Object Details pane in Explore. Current estimated speed can also be seen on the debug view as the third value in the object label (see the caveats below). Current estimated speed, average estimated speed, and velocity angle (the angle of the direction the object is moving relative to the frame) of tracked objects is also sent through the `events` MQTT topic. See the [MQTT docs](/integrations/mqtt#frigateevents).

These speed values are output as a number in miles per hour (mph) or kilometers per hour (kph). For miles per hour, set `unit_system` to `imperial`. For kilometers per hour, set `unit_system` to `metric`.

#### Best practices and caveats[​](#best-practices-and-caveats "Direct link to Best practices and caveats")

*   Speed estimation works best with a straight road or path when your object travels in a straight line across that path. Avoid creating your zone near intersections or anywhere that objects would make a turn.
*   Create a zone where the bottom center of your object's bounding box travels directly through it and does not become obscured at any time.
*   A large zone can be used (as in the photo example above), but it may cause inaccurate estimation if the object's bounding box changes shape (such as when it turns or becomes partially hidden). Generally it's best to make your zone large enough to capture a few frames, but small enough so that the bounding box doesn't change size as it enters, travels through, and exits the zone.
*   Depending on the size and location of your zone, you may want to decrease the zone's `inertia` value from the default of 3.
*   The more accurate your real-world dimensions can be measured, the more accurate speed estimation will be. However, due to the way Frigate's tracking algorithm works, you may need to tweak the real-world distance values so that estimated speeds better match real-world speeds.
*   Once an object leaves the zone, speed accuracy will likely decrease due to perspective distortion and misalignment with the calibrated area. Therefore, speed values will show as a zero through MQTT and will not be visible on the debug view when an object is outside of a speed tracking zone.
*   The speeds are only an _estimation_ and are highly dependent on camera position, zone points, and real-world measurements. This feature should not be used for law enforcement.

### Speed Threshold[​](#speed-threshold "Direct link to Speed Threshold")

Zones can be configured with a minimum speed requirement, meaning an object must be moving at or above this speed to be considered inside the zone. Zone `distances` must be defined as described above.

```
cameras:  name_of_your_camera:    zones:      sidewalk:        coordinates: ...        distances: ...        inertia: 1        speed_threshold: 20 # unit is in kph or mph, depending on how unit_system is set (see above)
```

*   [Restricting alerts and detections to specific zones](#restricting-alerts-and-detections-to-specific-zones)
*   [Restricting snapshots to specific zones](#restricting-snapshots-to-specific-zones)
*   [Restricting zones to specific objects](#restricting-zones-to-specific-objects)
*   [Zone Loitering](#zone-loitering)
*   [Zone Inertia](#zone-inertia)
*   [Speed Estimation](#speed-estimation)
*   [Speed Threshold](#speed-threshold)

--- END OF FILE: development-contributing-boards.md ---
--- START OF FILE: development-contributing-boards.md ---

Source: https://docs.frigate.video/development/contributing-boards

On this page

## About Community Supported Boards[​](#about-community-supported-boards "Direct link to About Community Supported Boards")

There are many SBCs (small board computers) that have a passionate community behind them, Jetson Nano for example. These SBCs often have dedicated hardware that can greatly accelerate Frigate's AI and video workloads, but this hardware requires very specific frameworks for interfacing with it.

This means it would be very difficult for Frigate's maintainers to support these different boards especially given the relatively low userbase.

The community support boards framework allows a user in the community to be the codeowner to add support for an SBC or other detector by providing the code, maintenance, and user support.

## Getting Started[​](#getting-started "Direct link to Getting Started")

1.  Follow the steps from [the main contributing docs](/development/contributing).
2.  Create a new build type under `docker/`
3.  Get build working as expected, all board-specific changes should be done inside of the board specific docker file.

## Required Structure[​](#required-structure "Direct link to Required Structure")

Each board will have different build requirements, run on different architectures, etc. however there are set of files that all boards will need.

### Bake File .hcl[​](#bake-file-hcl "Direct link to Bake File .hcl")

The `board.hcl` file is what allows the community boards build to be built using the main build as a cache. This enables a clean base and quicker build times. For more information on the format and options available in the Bake file, [see the official Buildx Bake docs](https://docs.docker.com/build/bake/reference/)

### Board Make File[​](#board-make-file "Direct link to Board Make File")

The `board.mk` file is what allows automated and configurable Make targets to be included in the main Make file. Below is the general format for this file:

```
BOARDS += board # Replace `board` with the board suffix ex: rpilocal-rpi: version	docker buildx bake --load --file=docker/board/board.hcl --set board.tags=frigate:latest-board bake-target # Replace `board` with the board suffix ex: rpi. Bake target is the target in the board.hcl file ex: boardbuild-rpi: version	docker buildx bake --file=docker/board/board.hcl --set board.tags=$(IMAGE_REPO):${GITHUB_REF_NAME}-$(COMMIT_HASH)-board bake-target # Replace `board` with the board suffix ex: rpi. Bake target is the target in the board.hcl file ex: boardpush-rpi: build-rpi	docker buildx bake --push --file=docker/board/board.hcl --set board.tags=$(IMAGE_REPO):${GITHUB_REF_NAME}-$(COMMIT_HASH)-board bake-target # Replace `board` with the board suffix ex: rpi. Bake target is the target in the board.hcl file ex: board
```

### Dockerfile[​](#dockerfile "Direct link to Dockerfile")

The `Dockerfile` is what orchestrates the build, this will vary greatly depending on the board but some parts are required for things to work. Below are the required parts of the Dockerfile:

```
# syntax=docker/dockerfile:1.4# https://askubuntu.com/questions/972516/debian-frontend-environment-variableARG DEBIAN_FRONTEND=noninteractive# All board-specific work should be done with `deps` as the baseFROM deps AS board-deps# do stuff specific# to the board# set workdirWORKDIR /opt/frigate/# copies base files from the main frigate buildCOPY --from=rootfs / /
```

## Other Required Changes[​](#other-required-changes "Direct link to Other Required Changes")

### CI/CD[​](#cicd "Direct link to CI/CD")

The images for each board will be built for each Frigate release, this is done in the `.github/workflows/ci.yml` file. The board build workflow will need to be added here.

```
- name: Build and push board build  uses: docker/bake-action@v3  with:    push: true    targets: board # this is the target in the board.hcl file    files: docker/board/board.hcl # this should be updated with the actual board type    # the tags should be updated with the actual board types as well    # the community board builds should never push to cache, but it can pull from cache    set: |      board.tags=ghcr.io/${{ steps.lowercaseRepo.outputs.lowercase }}:${{ github.ref_name }}-${{ env.SHORT_SHA }}-board      *.cache-from=type=gha
```

### Code Owner File[​](#code-owner-file "Direct link to Code Owner File")

The `CODEOWNERS` file should be updated to include the `docker/board` along with `@user` for each user that is a code owner of this board

# Docs

At a minimum the `installation`, `object_detectors`, `hardware_acceleration_video`, and `ffmpeg-presets` docs should be updated (if applicable) to reflect the configuration of this community board.

*   [About Community Supported Boards](#about-community-supported-boards)
*   [Getting Started](#getting-started)
*   [Required Structure](#required-structure)
    *   [Bake File .hcl](#bake-file-hcl)
    *   [Board Make File](#board-make-file)
    *   [Dockerfile](#dockerfile)
*   [Other Required Changes](#other-required-changes)
    *   [CI/CD](#cicd)
    *   [Code Owner File](#code-owner-file)

--- END OF FILE: development-contributing.md ---
--- START OF FILE: development-contributing.md ---

Source: https://docs.frigate.video/development/contributing

On this page

## Getting the source[​](#getting-the-source "Direct link to Getting the source")

### Core, Web, Docker, and Documentation[​](#core-web-docker-and-documentation "Direct link to Core, Web, Docker, and Documentation")

This repository holds the main Frigate application and all of its dependencies.

Fork [blakeblackshear/frigate](https://github.com/blakeblackshear/frigate.git) to your own GitHub profile, then clone the forked repo to your local machine.

From here, follow the guides for:

*   [Core](#core)
*   [Web Interface](#web-interface)
*   [Documentation](#documentation)

### Frigate Home Assistant Add-on[​](#frigate-home-assistant-add-on "Direct link to Frigate Home Assistant Add-on")

This repository holds the Home Assistant Add-on, for use with Home Assistant OS and compatible installations. It is the piece that allows you to run Frigate from your Home Assistant Supervisor tab.

Fork [blakeblackshear/frigate-hass-addons](https://github.com/blakeblackshear/frigate-hass-addons) to your own Github profile, then clone the forked repo to your local machine.

### Frigate Home Assistant Integration[​](#frigate-home-assistant-integration "Direct link to Frigate Home Assistant Integration")

This repository holds the custom integration that allows your Home Assistant installation to automatically create entities for your Frigate instance, whether you are running Frigate as a standalone Docker container or as a [Home Assistant Add-on](#frigate-home-assistant-add-on).

Fork [blakeblackshear/frigate-hass-integration](https://github.com/blakeblackshear/frigate-hass-integration) to your own GitHub profile, then clone the forked repo to your local machine.

## Core[​](#core "Direct link to Core")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

*   GNU make
*   Docker (including buildx plugin)
*   An extra detector (Coral, OpenVINO, etc.) is optional but recommended to simulate real world performance.

note

A Coral device can only be used by a single process at a time, so an extra Coral device is recommended if using a coral for development purposes.

### Setup[​](#setup "Direct link to Setup")

#### 1\. Open the repo with Visual Studio Code[​](#1-open-the-repo-with-visual-studio-code "Direct link to 1. Open the repo with Visual Studio Code")

Upon opening, you should be prompted to open the project in a remote container. This will build a container on top of the base Frigate container with all the development dependencies installed. This ensures everyone uses a consistent development environment without the need to install any dependencies on your host machine.

#### 2\. Modify your local config file for testing[​](#2-modify-your-local-config-file-for-testing "Direct link to 2. Modify your local config file for testing")

Place the file at `config/config.yml` in the root of the repo.

Here is an example, but modify for your needs:

```
mqtt:  host: mqttcameras:  test:    ffmpeg:      inputs:        - path: /media/frigate/car-stopping.mp4          input_args: -re -stream_loop -1 -fflags +genpts          roles:            - detect
```

These input args tell ffmpeg to read the mp4 file in an infinite loop. You can use any valid ffmpeg input here.

#### 3\. Gather some mp4 files for testing[​](#3-gather-some-mp4-files-for-testing "Direct link to 3. Gather some mp4 files for testing")

Create and place these files in a `debug` folder in the root of the repo. This is also where recordings will be created if you enable them in your test config. Update your config from step 2 above to point at the right file. You can check the `docker-compose.yml` file in the repo to see how the volumes are mapped.

#### 4\. Run Frigate from the command line[​](#4-run-frigate-from-the-command-line "Direct link to 4. Run Frigate from the command line")

VS Code will start the Docker Compose file for you and open a terminal window connected to `frigate-dev`.

*   Depending on what hardware you're developing on, you may need to amend `docker-compose.yml` in the project root to pass through a USB Coral or GPU for hardware acceleration.
*   Run `python3 -m frigate` to start the backend.
*   In a separate terminal window inside VS Code, change into the `web` directory and run `npm install && npm run dev` to start the frontend.

#### 5\. Teardown[​](#5-teardown "Direct link to 5. Teardown")

After closing VS Code, you may still have containers running. To close everything down, just run `docker-compose down -v` to cleanup all containers.

### Testing[​](#testing "Direct link to Testing")

#### FFMPEG Hardware Acceleration[​](#ffmpeg-hardware-acceleration "Direct link to FFMPEG Hardware Acceleration")

The following commands are used inside the container to ensure hardware acceleration is working properly.

**Raspberry Pi (64bit)**

This should show less than 50% CPU in top, and ~80% CPU without `-c:v h264_v4l2m2m`.

```
ffmpeg -c:v h264_v4l2m2m -re -stream_loop -1 -i https://streams.videolan.org/ffmpeg/incoming/720p60.mp4 -f rawvideo -pix_fmt yuv420p pipe: > /dev/null
```

**NVIDIA GPU**

```
ffmpeg -c:v h264_cuvid -re -stream_loop -1 -i https://streams.videolan.org/ffmpeg/incoming/720p60.mp4 -f rawvideo -pix_fmt yuv420p pipe: > /dev/null
```

**NVIDIA Jetson**

```
ffmpeg -c:v h264_nvmpi -re -stream_loop -1 -i https://streams.videolan.org/ffmpeg/incoming/720p60.mp4 -f rawvideo -pix_fmt yuv420p pipe: > /dev/null
```

**VAAPI**

```
ffmpeg -hwaccel vaapi -hwaccel_device /dev/dri/renderD128 -hwaccel_output_format yuv420p -re -stream_loop -1 -i https://streams.videolan.org/ffmpeg/incoming/720p60.mp4 -f rawvideo -pix_fmt yuv420p pipe: > /dev/null
```

**QSV**

```
ffmpeg -c:v h264_qsv -re -stream_loop -1 -i https://streams.videolan.org/ffmpeg/incoming/720p60.mp4 -f rawvideo -pix_fmt yuv420p pipe: > /dev/null
```

## Web Interface[​](#web-interface "Direct link to Web Interface")

### Prerequisites[​](#prerequisites-1 "Direct link to Prerequisites")

*   All [core](#core) prerequisites _or_ another running Frigate instance locally available
*   Node.js 20

### Making changes[​](#making-changes "Direct link to Making changes")

#### 1\. Set up a Frigate instance[​](#1-set-up-a-frigate-instance "Direct link to 1. Set up a Frigate instance")

The Web UI requires an instance of Frigate to interact with for all of its data. You can either run an instance locally (recommended) or attach to a separate instance accessible on your network.

To run the local instance, follow the [core](#core) development instructions.

If you won't be making any changes to the Frigate HTTP API, you can attach the web development server to any Frigate instance on your network. Skip this step and go to [3a](#3a-run-the-development-server-against-a-non-local-instance).

#### 2\. Install dependencies[​](#2-install-dependencies "Direct link to 2. Install dependencies")

```
cd web && npm install
```

#### 3\. Run the development server[​](#3-run-the-development-server "Direct link to 3. Run the development server")

```
cd web && npm run dev
```

##### 3a. Run the development server against a non-local instance[​](#3a-run-the-development-server-against-a-non-local-instance "Direct link to 3a. Run the development server against a non-local instance")

To run the development server against a non-local instance, you will need to replace the `localhost` values in `vite.config.ts` with the IP address of the non-local backend server.

#### 4\. Making changes[​](#4-making-changes "Direct link to 4. Making changes")

The Web UI is built using [Vite](https://vitejs.dev/), [Preact](https://preactjs.com), and [Tailwind CSS](https://tailwindcss.com).

Light guidelines and advice:

*   Avoid adding more dependencies. The web UI intends to be lightweight and fast to load.
*   Do not make large sweeping changes. [Open a discussion on GitHub](https://github.com/blakeblackshear/frigate/discussions/new) for any large or architectural ideas.
*   Ensure `lint` passes. This command will ensure basic conformance to styles, applying as many automatic fixes as possible, including Prettier formatting.

```
npm run lint
```

*   Add to unit tests and ensure they pass. As much as possible, you should strive to _increase_ test coverage whenever making changes. This will help ensure features do not accidentally become broken in the future.
*   If you run into error messages like "TypeError: Cannot read properties of undefined (reading 'context')" when running tests, this may be due to these issues ([https://github.com/vitest-dev/vitest/issues/1910](https://github.com/vitest-dev/vitest/issues/1910), [https://github.com/vitest-dev/vitest/issues/1652](https://github.com/vitest-dev/vitest/issues/1652)) in vitest, but I haven't been able to resolve them.

```
npm run test
```

*   Test in different browsers. Firefox, Chrome, and Safari all have different quirks that make them unique targets to interact with.

## Documentation[​](#documentation "Direct link to Documentation")

### Prerequisites[​](#prerequisites-2 "Direct link to Prerequisites")

*   Node.js 20

### Making changes[​](#making-changes-1 "Direct link to Making changes")

#### 1\. Installation[​](#1-installation "Direct link to 1. Installation")

```
cd docs && npm install
```

#### 2\. Local Development[​](#2-local-development "Direct link to 2. Local Development")

```
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

The docs are built using [Docusaurus v3](https://docusaurus.io). Please refer to the Docusaurus docs for more information on how to modify Frigate's documentation.

#### 3\. Build (optional)[​](#3-build-optional "Direct link to 3. Build (optional)")

```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Official builds[​](#official-builds "Direct link to Official builds")

Setup buildx for multiarch

```
docker buildx stop builder && docker buildx rm builder # <---- if existingdocker run --privileged --rm tonistiigi/binfmt --install alldocker buildx create --name builder --driver docker-container --driver-opt network=host --usedocker buildx inspect builder --bootstrapmake push
```

## Other[​](#other "Direct link to Other")

### Nginx[​](#nginx "Direct link to Nginx")

When testing nginx config changes from within the dev container, the following command can be used to copy and reload the config for testing without rebuilding the container:

```
sudo cp docker/main/rootfs/usr/local/nginx/conf/* /usr/local/nginx/conf/ && sudo /usr/local/nginx/sbin/nginx -s reload
```

## Contributing translations of the Web UI[​](#contributing-translations-of-the-web-ui "Direct link to Contributing translations of the Web UI")

Frigate uses [Weblate](https://weblate.org) to manage translations of the Web UI. To contribute translation, sign up for an account at Weblate and navigate to the Frigate NVR project:

[https://hosted.weblate.org/projects/frigate-nvr/](https://hosted.weblate.org/projects/frigate-nvr/)

When translating, maintain the existing key structure while translating only the values. Ensure your translations maintain proper formatting, including any placeholder variables (like `{{example}}`).

*   [Getting the source](#getting-the-source)
    *   [Core, Web, Docker, and Documentation](#core-web-docker-and-documentation)
    *   [Frigate Home Assistant Add-on](#frigate-home-assistant-add-on)
    *   [Frigate Home Assistant Integration](#frigate-home-assistant-integration)
*   [Core](#core)
    *   [Prerequisites](#prerequisites)
    *   [Setup](#setup)
    *   [Testing](#testing)
*   [Web Interface](#web-interface)
    *   [Prerequisites](#prerequisites-1)
    *   [Making changes](#making-changes)
*   [Documentation](#documentation)
    *   [Prerequisites](#prerequisites-2)
    *   [Making changes](#making-changes-1)
*   [Official builds](#official-builds)
*   [Other](#other)
    *   [Nginx](#nginx)
*   [Contributing translations of the Web UI](#contributing-translations-of-the-web-ui)

--- END OF FILE: frigate-camera_setup.md ---
--- START OF FILE: frigate-camera_setup.md ---

Source: https://docs.frigate.video/frigate/camera_setup

On this page

Cameras configured to output H.264 video and AAC audio will offer the most compatibility with all features of Frigate and Home Assistant. H.265 has better compression, but less compatibility. Firefox 134+/136+/137+ (Windows/Mac/Linux & Android), Chrome 108+, Safari and Edge are the only browsers able to play H.265 and only support a limited number of H.265 profiles. Ideally, cameras should be configured directly for the desired resolutions and frame rates you want to use in Frigate. Reducing frame rates within Frigate will waste CPU resources decoding extra frames that are discarded. There are three different goals that you want to tune your stream configurations around.

*   **Detection**: This is the only stream that Frigate will decode for processing. Also, this is the stream where snapshots will be generated from. The resolution for detection should be tuned for the size of the objects you want to detect. See [Choosing a detect resolution](#choosing-a-detect-resolution) for more details. The recommended frame rate is 5fps, but may need to be higher (10fps is the recommended maximum for most users) for very fast moving objects. Higher resolutions and frame rates will drive higher CPU usage on your server.
    
*   **Recording**: This stream should be the resolution you wish to store for reference. Typically, this will be the highest resolution your camera supports. I recommend setting this feed in your camera's firmware to 15 fps.
    
*   **Stream Viewing**: This stream will be rebroadcast as is to Home Assistant for viewing with the stream component. Setting this resolution too high will use significant bandwidth when viewing streams in Home Assistant, and they may not load reliably over slower connections.
    

### Choosing a detect resolution[​](#choosing-a-detect-resolution "Direct link to Choosing a detect resolution")

The ideal resolution for detection is one where the objects you want to detect fit inside the dimensions of the model used by Frigate (320x320). Frigate does not pass the entire camera frame to object detection. It will crop an area of motion from the full frame and look in that portion of the frame. If the area being inspected is larger than 320x320, Frigate must resize it before running object detection. Higher resolutions do not improve the detection accuracy because the additional detail is lost in the resize. Below you can see a reference for how large a 320x320 area is against common resolutions.

Larger resolutions **do** improve performance if the objects are very small in the frame.

![Resolutions](/assets/images/resolutions-min-ebb4aa1e70f55947c8013c3ab8978201.jpg)

### Example Camera Configuration[​](#example-camera-configuration "Direct link to Example Camera Configuration")

For the Dahua/Loryta 5442 camera, I use the following settings:

**Main Stream (Recording & RTSP)**

*   Encode Mode: H.264
*   Resolution: 2688\*1520
*   Frame Rate(FPS): 15
*   I Frame Interval: 30 (15 can also be used to prioritize streaming performance - see the [camera settings recommendations](/configuration/live#camera_settings_recommendations) for more info)

**Sub Stream (Detection)**

*   Enable: Sub Stream 2
*   Encode Mode: H.264
*   Resolution: 1280\*720
*   Frame Rate: 5
*   I Frame Interval: 5

*   [Choosing a detect resolution](#choosing-a-detect-resolution)
*   [Example Camera Configuration](#example-camera-configuration)

--- END OF FILE: frigate-glossary.md ---
--- START OF FILE: frigate-glossary.md ---

Source: https://docs.frigate.video/frigate/glossary

On this page

The glossary explains terms commonly used in Frigate's documentation.

## Bounding Box[​](#bounding-box "Direct link to Bounding Box")

A box returned from the object detection model that outlines an object in the frame. These have multiple colors depending on object type in the debug live view.

### Bounding Box Colors[​](#bounding-box-colors "Direct link to Bounding Box Colors")

*   At startup different colors will be assigned to each object label
*   A dark blue thin line indicates that object is not detected at this current point in time
*   A gray thin line indicates that object is detected as being stationary
*   A thick line indicates that object is the subject of autotracking (when enabled).

## False Positive[​](#false-positive "Direct link to False Positive")

An incorrect detection of an object type. For example a dog being detected as a person, a chair being detected as a dog, etc. A person being detected in an area you want to ignore is not a false positive.

## Mask[​](#mask "Direct link to Mask")

There are two types of masks in Frigate. [See the mask docs for more info](/configuration/masks)

### Motion Mask[​](#motion-mask "Direct link to Motion Mask")

Motion masks prevent detection of [motion](#motion) in masked areas from triggering Frigate to run object detection, but do not prevent objects from being detected if object detection runs due to motion in nearby areas. For example: camera timestamps, skies, the tops of trees, etc.

### Object Mask[​](#object-mask "Direct link to Object Mask")

Object filter masks drop any bounding boxes where the bottom center (overlap doesn't matter) is in the masked area. It forces them to be considered a [false positive](#false-positive) so that they are ignored.

## Min Score[​](#min-score "Direct link to Min Score")

The lowest score that an object can be detected with during tracking, any detection with a lower score will be assumed to be a false positive

## Motion[​](#motion "Direct link to Motion")

When pixels in the current camera frame are different than previous frames. When many nearby pixels are different in the current frame they grouped together and indicated with a red motion box in the live debug view. [See the motion detection docs for more info](/configuration/motion_detection)

## Region[​](#region "Direct link to Region")

A portion of the camera frame that is sent to object detection, regions can be sent due to motion, active objects, or occasionally for stationary objects. These are represented by green boxes in the debug live view.

## Review Item[​](#review-item "Direct link to Review Item")

A review item is a time period where any number of events/tracked objects were active. [See the review docs for more info](/configuration/review)

## Snapshot Score[​](#snapshot-score "Direct link to Snapshot Score")

The score shown in a snapshot is the score of that object at that specific moment in time.

## Threshold[​](#threshold "Direct link to Threshold")

The threshold is the median score that an object must reach in order to be considered a true positive.

## Top Score[​](#top-score "Direct link to Top Score")

The top score for an object is the highest median score for an object.

## Tracked Object ("event" in previous versions)[​](#tracked-object-event-in-previous-versions "Direct link to Tracked Object (\"event\" in previous versions)")

The time period starting when a tracked object entered the frame and ending when it left the frame, including any time that the object remained still. Tracked objects are saved when it is considered a [true positive](#threshold) and meets the requirements for a snapshot or recording to be saved.

## Zone[​](#zone "Direct link to Zone")

Zones are areas of interest, zones can be used for notifications and for limiting the areas where Frigate will create a [review item](#review-item). [See the zone docs for more info](/configuration/zones)

*   [Bounding Box](#bounding-box)
    *   [Bounding Box Colors](#bounding-box-colors)
*   [False Positive](#false-positive)
*   [Mask](#mask)
    *   [Motion Mask](#motion-mask)
    *   [Object Mask](#object-mask)
*   [Min Score](#min-score)
*   [Motion](#motion)
*   [Region](#region)
*   [Review Item](#review-item)
*   [Snapshot Score](#snapshot-score)
*   [Threshold](#threshold)
*   [Top Score](#top-score)
*   [Tracked Object ("event" in previous versions)](#tracked-object-event-in-previous-versions)
*   [Zone](#zone)

--- END OF FILE: frigate-guides-getting_started#configuring-frigate.md ---
--- START OF FILE: frigate-guides-getting_started#configuring-frigate.md ---

Source: https://docs.frigate.video/frigate/guides/getting_started#configuring-frigate

# Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

--- END OF FILE: frigate-hardware.md ---
--- START OF FILE: frigate-hardware.md ---

Source: https://docs.frigate.video/frigate/hardware

On this page

## Cameras[​](#cameras "Direct link to Cameras")

Cameras that output H.264 video and AAC audio will offer the most compatibility with all features of Frigate and Home Assistant. It is also helpful if your camera supports multiple substreams to allow different resolutions to be used for detection, streaming, and recordings without re-encoding.

I recommend Dahua, Hikvision, and Amcrest in that order. Dahua edges out Hikvision because they are easier to find and order, not because they are better cameras. I personally use Dahua cameras because they are easier to purchase directly. In my experience Dahua and Hikvision both have multiple streams with configurable resolutions and frame rates and rock solid streams. They also both have models with large sensors well known for excellent image quality at night. Not all the models are equal. Larger sensors are better than higher resolutions; especially at night. Amcrest is the fallback recommendation because they are rebranded Dahuas. They are rebranding the lower end models with smaller sensors or less configuration options.

WiFi cameras are not recommended as [their streams are less reliable and cause connection loss and/or lost video data](https://ipcamtalk.com/threads/camera-conflicts.68142/#post-738821), especially when more than a few WiFi cameras will be used at the same time.

Many users have reported various issues with 4K-plus Reolink cameras, it is best to stick with 5MP and lower for Reolink cameras. If you are using Reolink, I suggest the [Reolink specific configuration](/configuration/camera_specific#reolink-cameras).

Here are some of the cameras I recommend:

*   [Loryta(Dahua) IPC-T549M-ALED-S3](https://amzn.to/4fwoNWA) (affiliate link)
*   [Loryta(Dahua) IPC-T54IR-AS](https://amzn.to/3YXpcMw) (affiliate link)
*   [Amcrest IP5M-T1179EW-AI-V3](https://amzn.to/3AvBHoY) (affiliate link)
*   [HIKVISION DS-2CD2387G2P-LSU/SL ColorVu 8MP Panoramic Turret IP Camera](https://www.bhphotovideo.com/c/product/1705511-REG/hikvision_colorvu_ds_2cd2387g2p_lsu_sl_8mp_network.html) (affiliate link)

I may earn a small commission for my endorsement, recommendation, testimonial, or link to any products or services from this website.

## Server[​](#server "Direct link to Server")

My current favorite is the Beelink EQ13 because of the efficient N100 CPU and dual NICs that allow you to setup a dedicated private network for your cameras where they can be blocked from accessing the internet. There are many used workstation options on eBay that work very well. Anything with an Intel CPU and capable of running Debian should work fine. As a bonus, you may want to look for devices with a M.2 or PCIe express slot that is compatible with the Google Coral, Hailo, or other AI accelerators.

Note that many of these mini PCs come with Windows pre-installed, and you will need to install Linux according to the [getting started guide](/guides/getting_started).

I may earn a small commission for my endorsement, recommendation, testimonial, or link to any products or services from this website.

warning

If the EQ13 is out of stock, the link below may take you to a suggested alternative on Amazon. The Beelink EQ14 has some known compatibility issues, so you should avoid that model for now.

Name

Capabilities

Notes

Beelink EQ13 ([Amazon](https://amzn.to/4jn2qVr))

Can run object detection on several 1080p cameras with low-medium activity

Dual gigabit NICs for easy isolated camera network.

Intel 1120p ([Amazon](https://www.amazon.com/Beelink-i3-1220P-Computer-Display-Gigabit/dp/B0DDCKT9YP)

Can handle a large number of 1080p cameras with high activity

Intel 125H ([Amazon](https://www.amazon.com/MINISFORUM-Pro-125H-Barebone-Computer-HDMI2-1/dp/B0FH21FSZM)

Can handle a significant number of 1080p cameras with high activity

Includes NPU for more efficient detection in 0.17+

## Detectors[​](#detectors "Direct link to Detectors")

A detector is a device which is optimized for running inferences efficiently to detect objects. Using a recommended detector means there will be less latency between detections and more detections can be run per second. Frigate is designed around the expectation that a detector is used to achieve very low inference speeds. Offloading TensorFlow to a detector is an order of magnitude faster and will reduce your CPU load dramatically.

info

Frigate supports multiple different detectors that work on different types of hardware:

**Most Hardware**

*   [Hailo](#hailo-8): The Hailo8 and Hailo8L AI Acceleration module is available in m.2 format with a HAT for RPi devices offering a wide range of compatibility with devices.
    
    *   [Supports many model architectures](/configuration/object_detectors#configuration)
    *   Runs best with tiny or small size models
*   [Google Coral EdgeTPU](#google-coral-tpu): The Google Coral EdgeTPU is available in USB and m.2 format allowing for a wide range of compatibility with devices.
    
    *   [Supports primarily ssdlite and mobilenet model architectures](/configuration/object_detectors#edge-tpu-detector)

**AMD**

*   [ROCm](#rocm---amd-gpu): ROCm can run on AMD Discrete GPUs to provide efficient object detection
    *   [Supports limited model architectures](/configuration/object_detectors#supported-models-1)
    *   Runs best on discrete AMD GPUs

**Intel**

*   [OpenVino](#openvino---intel): OpenVino can run on Intel Arc GPUs, Intel integrated GPUs, and Intel CPUs to provide efficient object detection.
    *   [Supports majority of model architectures](/configuration/object_detectors#supported-models)
    *   Runs best with tiny, small, or medium models

**Nvidia**

*   [TensortRT](#tensorrt---nvidia-gpu): TensorRT can run on Nvidia GPUs and Jetson devices.
    *   [Supports majority of model architectures via ONNX](/configuration/object_detectors#supported-models-2)
    *   Runs well with any size models including large

**Rockchip**

*   [RKNN](#rockchip-platform): RKNN models can run on Rockchip devices with included NPUs to provide efficient object detection.
    *   [Supports limited model architectures](/configuration/object_detectors#choosing-a-model)
    *   Runs best with tiny or small size models
    *   Runs efficiently on low power hardware

### Hailo-8[​](#hailo-8 "Direct link to Hailo-8")

Frigate supports both the Hailo-8 and Hailo-8L AI Acceleration Modules on compatible hardware platforms—including the Raspberry Pi 5 with the PCIe hat from the AI kit. The Hailo detector integration in Frigate automatically identifies your hardware type and selects the appropriate default model when a custom model isn’t provided.

**Default Model Configuration:**

*   **Hailo-8L:** Default model is **YOLOv6n**.
*   **Hailo-8:** Default model is **YOLOv6n**.

In real-world deployments, even with multiple cameras running concurrently, Frigate has demonstrated consistent performance. Testing on x86 platforms—with dual PCIe lanes—yields further improvements in FPS, throughput, and latency compared to the Raspberry Pi setup.

Name

Hailo‑8 Inference Time

Hailo‑8L Inference Time

ssd mobilenet v1

~ 6 ms

~ 10 ms

yolov9-tiny

320: 18ms

yolov6n

~ 7 ms

~ 11 ms

### Google Coral TPU[​](#google-coral-tpu "Direct link to Google Coral TPU")

warning

The Coral is no longer recommended for new Frigate installations, except in deployments with particularly low power requirements or hardware incapable of utilizing alternative AI accelerators for object detection. Instead, we suggest using one of the numerous other supported object detectors. Frigate will continue to provide support for the Coral TPU for as long as practicably possible given its still one of the most power-efficient devices for executing object detection models.

Frigate supports both the USB and M.2 versions of the Google Coral.

*   The USB version is compatible with the widest variety of hardware and does not require a driver on the host machine. However, it does lack the automatic throttling features of the other versions.
*   The PCIe and M.2 versions require installation of a driver on the host. [https://github.com/jnicolson/gasket-builder](https://github.com/jnicolson/gasket-builder) should be used.

A single Coral can handle many cameras using the default model and will be sufficient for the majority of users. You can calculate the maximum performance of your Coral based on the inference speed reported by Frigate. With an inference speed of 10, your Coral will top out at `1000/10=100`, or 100 frames per second. If your detection fps is regularly getting close to that, you should first consider tuning motion masks. If those are already properly configured, a second Coral may be needed.

### OpenVINO - Intel[​](#openvino---intel "Direct link to OpenVINO - Intel")

The OpenVINO detector type is able to run on:

*   6th Gen Intel Platforms and newer that have an iGPU
*   x86 hosts with an Intel Arc GPU
*   Most modern AMD CPUs (though this is officially not supported by Intel)
*   x86 & Arm64 hosts via CPU (generally not recommended)

note

Intel NPUs have seen [limited success in community deployments](https://github.com/blakeblackshear/frigate/discussions/13248#discussioncomment-12347357), although they remain officially unsupported.

In testing, the NPU delivered performance that was only comparable to — or in some cases worse than — the integrated GPU.

More information is available [in the detector docs](/configuration/object_detectors#openvino-detector)

Inference speeds vary greatly depending on the CPU or GPU used, some known examples of GPU inference times are below:

Name

MobileNetV2 Inference Time

YOLOv9

YOLO-NAS Inference Time

RF-DETR Inference Time

Notes

Intel HD 530

15 - 35 ms

Can only run one detector instance

Intel HD 620

15 - 25 ms

320: ~ 35 ms

Intel HD 630

~ 15 ms

320: ~ 30 ms

Intel UHD 730

~ 10 ms

320: ~ 19 ms 640: ~ 54 ms

Intel UHD 770

~ 15 ms

t-320: ~ 16 ms s-320: ~ 20 ms s-640: ~ 40 ms

320: ~ 20 ms 640: ~ 46 ms

Intel N100

~ 15 ms

s-320: 30 ms

320: ~ 25 ms

Can only run one detector instance

Intel N150

~ 15 ms

t-320: 16 ms s-320: 24 ms

Intel Iris XE

~ 10 ms

s-320: 12 ms s-640: 30 ms

320: ~ 18 ms 640: ~ 50 ms

Intel Arc A310

~ 5 ms

t-320: 7 ms t-640: 11 ms s-320: 8 ms s-640: 15 ms

320: ~ 8 ms 640: ~ 14 ms

Intel Arc A380

~ 6 ms

320: ~ 10 ms 640: ~ 22 ms

336: 20 ms 448: 27 ms

Intel Arc A750

~ 4 ms

320: ~ 8 ms

### TensorRT - Nvidia GPU[​](#tensorrt---nvidia-gpu "Direct link to TensorRT - Nvidia GPU")

Frigate is able to utilize an Nvidia GPU which supports the 12.x series of CUDA libraries.

#### Minimum Hardware Support[​](#minimum-hardware-support "Direct link to Minimum Hardware Support")

12.x series of CUDA libraries are used which have minor version compatibility. The minimum driver version on the host system must be `>=545`. Also the GPU must support a Compute Capability of `5.0` or greater. This generally correlates to a Maxwell-era GPU or newer, check the NVIDIA GPU Compute Capability table linked below.

Make sure your host system has the [nvidia-container-runtime](https://docs.docker.com/config/containers/resource_constraints/#access-an-nvidia-gpu) installed to pass through the GPU to the container and the host system has a compatible driver installed for your GPU.

There are improved capabilities in newer GPU architectures that TensorRT can benefit from, such as INT8 operations and Tensor cores. The features compatible with your hardware will be optimized when the model is converted to a trt file. Currently the script provided for generating the model provides a switch to enable/disable FP16 operations. If you wish to use newer features such as INT8 optimization, more work is required.

#### Compatibility References:[​](#compatibility-references "Direct link to Compatibility References:")

[NVIDIA TensorRT Support Matrix](https://docs.nvidia.com/deeplearning/tensorrt/archives/tensorrt-841/support-matrix/index.html)

[NVIDIA CUDA Compatibility](https://docs.nvidia.com/deploy/cuda-compatibility/index.html)

[NVIDIA GPU Compute Capability](https://developer.nvidia.com/cuda-gpus)

Inference speeds will vary greatly depending on the GPU and the model used. `tiny` variants are faster than the equivalent non-tiny model, some known examples are below:

Name

YOLOv9 Inference Time

YOLO-NAS Inference Time

RF-DETR Inference Time

GTX 1070

s-320: 16 ms

320: 14 ms

RTX 3050

t-320: 15 ms s-320: 17 ms

320: ~ 10 ms 640: ~ 16 ms

Nano-320: ~ 12 ms

RTX 3070

t-320: 11 ms s-320: 13 ms

320: ~ 8 ms 640: ~ 14 ms

Nano-320: ~ 9 ms

RTX A4000

320: ~ 15 ms

Tesla P40

320: ~ 105 ms

### ROCm - AMD GPU[​](#rocm---amd-gpu "Direct link to ROCm - AMD GPU")

With the [rocm](/configuration/object_detectors#amdrocm-gpu-detector) detector Frigate can take advantage of many discrete AMD GPUs.

Name

YOLOv9 Inference Time

YOLO-NAS Inference Time

AMD 780M

320: ~ 14 ms

320: ~ 25 ms 640: ~ 50 ms

AMD 8700G

320: ~ 20 ms 640: ~ 40 ms

## Community Supported Detectors[​](#community-supported-detectors "Direct link to Community Supported Detectors")

### Nvidia Jetson[​](#nvidia-jetson "Direct link to Nvidia Jetson")

Frigate supports all Jetson boards, from the inexpensive Jetson Nano to the powerful Jetson Orin AGX. It will [make use of the Jetson's hardware media engine](/configuration/hardware_acceleration_video#nvidia-jetson-orin-agx-orin-nx-orin-nano-xavier-agx-xavier-nx-tx2-tx1-nano) when configured with the [appropriate presets](/configuration/ffmpeg_presets#hwaccel-presets), and will make use of the Jetson's GPU and DLA for object detection when configured with the [TensorRT detector](/configuration/object_detectors#nvidia-tensorrt-detector).

Inference speed will vary depending on the YOLO model, jetson platform and jetson nvpmodel (GPU/DLA/EMC clock speed). It is typically 20-40 ms for most models. The DLA is more efficient than the GPU, but not faster, so using the DLA will reduce power consumption but will slightly increase inference time.

### Rockchip platform[​](#rockchip-platform "Direct link to Rockchip platform")

Frigate supports hardware video processing on all Rockchip boards. However, hardware object detection is only supported on these boards:

*   RK3562
*   RK3566
*   RK3568
*   RK3576
*   RK3588

Name

YOLOv9 Inference Time

YOLO-NAS Inference Time

YOLOx Inference Time

rk3588 3 cores

tiny: ~ 35 ms

small: ~ 20 ms med: ~ 30 ms

nano: 14 ms tiny: 18 ms

rk3566 1 core

small: ~ 96 ms

The inference time of a rk3588 with all 3 cores enabled is typically 25-30 ms for yolo-nas s.

## What does Frigate use the CPU for and what does it use a detector for? (ELI5 Version)[​](#what-does-frigate-use-the-cpu-for-and-what-does-it-use-a-detector-for-eli5-version "Direct link to What does Frigate use the CPU for and what does it use a detector for? (ELI5 Version)")

This is taken from a [user question on reddit](https://www.reddit.com/r/homeassistant/comments/q8mgau/comment/hgqbxh5/?utm_source=share&utm_medium=web2x&context=3). Modified slightly for clarity.

CPU Usage: I am a CPU, Mendel is a Google Coral

My buddy Mendel and I have been tasked with keeping the neighbor's red footed booby off my parent's yard. Now I'm really bad at identifying birds. It takes me forever, but my buddy Mendel is incredible at it.

Mendel however, struggles at pretty much anything else. So we make an agreement. I wait till I see something that moves, and snap a picture of it for Mendel. I then show him the picture and he tells me what it is. Most of the time it isn't anything. But eventually I see some movement and Mendel tells me it is the Booby. Score!

_What happens when I increase the resolution of my camera?_

However we realize that there is a problem. There is still booby poop all over the yard. How could we miss that! I've been watching all day! My parents check the window and realize its dirty and a bit small to see the entire yard so they clean it and put a bigger one in there. Now there is so much more to see! However I now have a much bigger area to scan for movement and have to work a lot harder! Even my buddy Mendel has to work harder, as now the pictures have a lot more detail in them that he has to look at to see if it is our sneaky booby.

Basically - When you increase the resolution and/or the frame rate of the stream there is now significantly more data for the CPU to parse. That takes additional computing power. The Google Coral is really good at doing object detection, but it doesn't have time to look everywhere all the time (especially when there are many windows to check). To balance it, Frigate uses the CPU to look for movement, then sends those frames to the Coral to do object detection. This allows the Coral to be available to a large number of cameras and not overload it.

## Do hwaccel args help if I am using a Coral?[​](#do-hwaccel-args-help-if-i-am-using-a-coral "Direct link to Do hwaccel args help if I am using a Coral?")

YES! The Coral does not help with decoding video streams.

Decompressing video streams takes a significant amount of CPU power. Video compression uses key frames (also known as I-frames) to send a full frame in the video stream. The following frames only include the difference from the key frame, and the CPU has to compile each frame by merging the differences with the key frame. [More detailed explanation](https://support.video.ibm.com/hc/en-us/articles/18106203580316-Keyframes-InterFrame-Video-Compression). Higher resolutions and frame rates mean more processing power is needed to decode the video stream, so try and set them on the camera to avoid unnecessary decoding work.

*   [Cameras](#cameras)
*   [Server](#server)
*   [Detectors](#detectors)
    *   [Hailo-8](#hailo-8)
    *   [Google Coral TPU](#google-coral-tpu)
    *   [OpenVINO - Intel](#openvino---intel)
    *   [TensorRT - Nvidia GPU](#tensorrt---nvidia-gpu)
    *   [ROCm - AMD GPU](#rocm---amd-gpu)
*   [Community Supported Detectors](#community-supported-detectors)
    *   [Nvidia Jetson](#nvidia-jetson)
    *   [Rockchip platform](#rockchip-platform)
*   [What does Frigate use the CPU for and what does it use a detector for? (ELI5 Version)](#what-does-frigate-use-the-cpu-for-and-what-does-it-use-a-detector-for-eli5-version)
*   [Do hwaccel args help if I am using a Coral?](#do-hwaccel-args-help-if-i-am-using-a-coral)

--- END OF FILE: frigate-installation.md ---
--- START OF FILE: frigate-installation.md ---

Source: https://docs.frigate.video/frigate/installation

On this page

Frigate is a Docker container that can be run on any Docker host including as a [Home Assistant Add-on](https://www.home-assistant.io/addons/). Note that the Home Assistant Add-on is **not** the same thing as the integration. The [integration](/integrations/home-assistant) is required to integrate Frigate into Home Assistant, whether you are running Frigate as a standalone Docker container or as a Home Assistant Add-on.

tip

If you already have Frigate installed as a Home Assistant Add-on, check out the [getting started guide](/frigate/guides/getting_started#configuring-frigate) to configure Frigate.

## Dependencies[​](#dependencies "Direct link to Dependencies")

**MQTT broker (optional)** - An MQTT broker is optional with Frigate, but is required for the Home Assistant integration. If using Home Assistant, Frigate and Home Assistant must be connected to the same MQTT broker.

## Preparing your hardware[​](#preparing-your-hardware "Direct link to Preparing your hardware")

### Operating System[​](#operating-system "Direct link to Operating System")

Frigate runs best with Docker installed on bare metal Debian-based distributions. For ideal performance, Frigate needs low overhead access to underlying hardware for the Coral and GPU devices. Running Frigate in a VM on top of Proxmox, ESXi, Virtualbox, etc. is not recommended though [some users have had success with Proxmox](#proxmox).

Windows is not officially supported, but some users have had success getting it to run under WSL or Virtualbox. Getting the GPU and/or Coral devices properly passed to Frigate may be difficult or impossible. Search previous discussions or issues for help.

### Storage[​](#storage "Direct link to Storage")

Frigate uses the following locations for read/write operations in the container. Docker volume mappings can be used to map these to any location on your host machine.

*   `/config`: Used to store the Frigate config file and sqlite database. You will also see a few files alongside the database file while Frigate is running.
*   `/media/frigate/clips`: Used for snapshot storage. In the future, it will likely be renamed from `clips` to `snapshots`. The file structure here cannot be modified and isn't intended to be browsed or managed manually.
*   `/media/frigate/recordings`: Internal system storage for recording segments. The file structure here cannot be modified and isn't intended to be browsed or managed manually.
*   `/media/frigate/exports`: Storage for clips and timelapses that have been exported via the WebUI or API.
*   `/tmp/cache`: Cache location for recording segments. Initial recordings are written here before being checked and converted to mp4 and moved to the recordings folder. Segments generated via the `clip.mp4` endpoints are also concatenated and processed here. It is recommended to use a [`tmpfs`](https://docs.docker.com/storage/tmpfs/) mount for this.
*   `/dev/shm`: Internal cache for raw decoded frames in shared memory. It is not recommended to modify this directory or map it with docker. The minimum size is impacted by the `shm-size` calculations below.

### Ports[​](#ports "Direct link to Ports")

The following ports are used by Frigate and can be mapped via docker as required.

Port

Description

`8971`

Authenticated UI and API access without TLS. Reverse proxies should use this port.

`5000`

Internal unauthenticated UI and API access. Access to this port should be limited. Intended to be used within the docker network for services that integrate with Frigate.

`8554`

RTSP restreaming. By default, these streams are unauthenticated. Authentication can be configured in go2rtc section of config.

`8555`

WebRTC connections for cameras with two-way talk support.

#### Common Docker Compose storage configurations[​](#common-docker-compose-storage-configurations "Direct link to Common Docker Compose storage configurations")

Writing to a local disk or external USB drive:

```
services:  frigate:    ...    volumes:      - /path/to/your/config:/config      - /path/to/your/storage:/media/frigate      - type: tmpfs # Optional: 1GB of memory, reduces SSD/SD Card wear        target: /tmp/cache        tmpfs:          size: 1000000000    ...
```

warning

Users of the Snapcraft build of Docker cannot use storage locations outside your $HOME folder.

### Calculating required shm-size[​](#calculating-required-shm-size "Direct link to Calculating required shm-size")

Frigate utilizes shared memory to store frames during processing. The default `shm-size` provided by Docker is **64MB**.

The default shm size of **128MB** is fine for setups with **2 cameras** detecting at **720p**. If Frigate is exiting with "Bus error" messages, it is likely because you have too many high resolution cameras and you need to specify a higher shm size, using [`--shm-size`](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources) (or [`service.shm_size`](https://docs.docker.com/compose/compose-file/compose-file-v2/#shm_size) in Docker Compose).

The Frigate container also stores logs in shm, which can take up to **40MB**, so make sure to take this into account in your math as well.

You can calculate the **minimum** shm size for each camera with the following formula using the resolution specified for detect:

```
# Template for one camera without logs, replace <width> and <height>$ python -c 'print("{:.2f}MB".format((<width> * <height> * 1.5 * 20 + 270480) / 1048576))'# Example for 1280x720, including logs$ python -c 'print("{:.2f}MB".format((1280 * 720 * 1.5 * 20 + 270480) / 1048576 + 40))'66.63MB# Example for eight cameras detecting at 1280x720, including logs$ python -c 'print("{:.2f}MB".format(((1280 * 720 * 1.5 * 20 + 270480) / 1048576) * 8 + 40))'253MB
```

The shm size cannot be set per container for Home Assistant add-ons. However, this is probably not required since by default Home Assistant Supervisor allocates `/dev/shm` with half the size of your total memory. If your machine has 8GB of memory, chances are that Frigate will have access to up to 4GB without any additional configuration.

## Extra Steps for Specific Hardware[​](#extra-steps-for-specific-hardware "Direct link to Extra Steps for Specific Hardware")

The following sections contain additional setup steps that are only required if you are using specific hardware. If you are not using any of these hardware types, you can skip to the [Docker](#docker) installation section.

### Raspberry Pi 3/4[​](#raspberry-pi-34 "Direct link to Raspberry Pi 3/4")

By default, the Raspberry Pi limits the amount of memory available to the GPU. In order to use ffmpeg hardware acceleration, you must increase the available memory by setting `gpu_mem` to the maximum recommended value in `config.txt` as described in the [official docs](https://www.raspberrypi.org/documentation/computers/config_txt.html#memory-options).

Additionally, the USB Coral draws a considerable amount of power. If using any other USB devices such as an SSD, you will experience instability due to the Pi not providing enough power to USB devices. You will need to purchase an external USB hub with it's own power supply. Some have reported success with [this](https://amzn.to/3a2mH0P) (affiliate link).

### Hailo-8[​](#hailo-8 "Direct link to Hailo-8")

The Hailo-8 and Hailo-8L AI accelerators are available in both M.2 and HAT form factors for the Raspberry Pi. The M.2 version typically connects to a carrier board for PCIe, which then interfaces with the Raspberry Pi 5 as part of the AI Kit. The HAT version can be mounted directly onto compatible Raspberry Pi models. Both form factors have been successfully tested on x86 platforms as well, making them versatile options for various computing environments.

#### Installation[​](#installation "Direct link to Installation")

warning

The Raspberry Pi kernel includes an older version of the Hailo driver that is incompatible with Frigate. You **must** follow the installation steps below to install the correct driver version, and you **must** disable the built-in kernel driver as described in step 1.

1.  **Disable the built-in Hailo driver (Raspberry Pi only)**:
    
    note
    
    If you are **not** using a Raspberry Pi, skip this step and proceed directly to step 2.
    
    If you are using a Raspberry Pi, you need to blacklist the built-in kernel Hailo driver to prevent conflicts. First, check if the driver is currently loaded:
    
    ```
    lsmod | grep hailo
    ```
    
    If it shows `hailo_pci`, unload it:
    
    ```
    sudo rmmod hailo_pci
    ```
    
    Now blacklist the driver to prevent it from loading on boot:
    
    ```
    echo "blacklist hailo_pci" | sudo tee /etc/modprobe.d/blacklist-hailo_pci.conf
    ```
    
    Update initramfs to ensure the blacklist takes effect:
    
    ```
    sudo update-initramfs -u
    ```
    
    Reboot your Raspberry Pi:
    
    ```
    sudo reboot
    ```
    
    After rebooting, verify the built-in driver is not loaded:
    
    ```
    lsmod | grep hailo
    ```
    
    This command should return no results. If it still shows `hailo_pci`, the blacklist did not take effect properly and you may need to check for other Hailo packages installed via apt that are loading the driver.
    
2.  **Run the installation script**:
    
    Download the installation script:
    
    ```
    wget https://raw.githubusercontent.com/blakeblackshear/frigate/dev/docker/hailo8l/user_installation.sh
    ```
    
    Make it executable:
    
    ```
    sudo chmod +x user_installation.sh
    ```
    
    Run the script:
    
    ```
    ./user_installation.sh
    ```
    
    The script will:
    
    *   Install necessary build dependencies
    *   Clone and build the Hailo driver from the official repository
    *   Install the driver
    *   Download and install the required firmware
    *   Set up udev rules
3.  **Reboot your system**:
    
    After the script completes successfully, reboot to load the firmware:
    
    ```
    sudo reboot
    ```
    
4.  **Verify the installation**:
    
    After rebooting, verify that the Hailo device is available:
    
    ```
    ls -l /dev/hailo0
    ```
    
    You should see the device listed. You can also verify the driver is loaded:
    
    ```
    lsmod | grep hailo_pci
    ```
    

#### Setup[​](#setup "Direct link to Setup")

To set up Frigate, follow the default installation instructions, for example: `ghcr.io/blakeblackshear/frigate:stable`

Next, grant Docker permissions to access your hardware by adding the following lines to your `docker-compose.yml` file:

```
devices:  - /dev/hailo0
```

If you are using `docker run`, add this option to your command `--device /dev/hailo0`

#### Configuration[​](#configuration "Direct link to Configuration")

Finally, configure [hardware object detection](/configuration/object_detectors#hailo-8l) to complete the setup.

### Rockchip platform[​](#rockchip-platform "Direct link to Rockchip platform")

Make sure that you use a linux distribution that comes with the rockchip BSP kernel 5.10 or 6.1 and necessary drivers (especially rkvdec2 and rknpu). To check, enter the following commands:

```
$ uname -r5.10.xxx-rockchip # or 6.1.xxx; the -rockchip suffix is important$ ls /dev/driby-path  card0  card1  renderD128  renderD129 # should list renderD128 (VPU) and renderD129 (NPU)$ sudo cat /sys/kernel/debug/rknpu/versionRKNPU driver: v0.9.2 # or later version
```

I recommend [Armbian](https://www.armbian.com/download/?arch=aarch64), if your board is supported.

#### Setup[​](#setup-1 "Direct link to Setup")

Follow Frigate's default installation instructions, but use a docker image with `-rk` suffix for example `ghcr.io/blakeblackshear/frigate:stable-rk`.

Next, you need to grant docker permissions to access your hardware:

*   During the configuration process, you should run docker in privileged mode to avoid any errors due to insufficient permissions. To do so, add `privileged: true` to your `docker-compose.yml` file or the `--privileged` flag to your docker run command.
*   After everything works, you should only grant necessary permissions to increase security. Disable the privileged mode and add the lines below to your `docker-compose.yml` file:

```
security_opt:  - apparmor=unconfined  - systempaths=unconfineddevices:  - /dev/dri  - /dev/dma_heap  - /dev/rga  - /dev/mpp_servicevolumes:  - /sys/:/sys/:ro
```

or add these options to your `docker run` command:

```
--security-opt systempaths=unconfined \--security-opt apparmor=unconfined \--device /dev/dri \--device /dev/dma_heap \--device /dev/rga \--device /dev/mpp_service \--volume /sys/:/sys/:ro
```

#### Configuration[​](#configuration-1 "Direct link to Configuration")

Next, you should configure [hardware object detection](/configuration/object_detectors#rockchip-platform) and [hardware video processing](/configuration/hardware_acceleration_video#rockchip-platform).

## Docker[​](#docker "Direct link to Docker")

Running through Docker with Docker Compose is the recommended install method.

```
services:  frigate:    container_name: frigate    privileged: true # this may not be necessary for all setups    restart: unless-stopped    stop_grace_period: 30s # allow enough time to shut down the various services    image: ghcr.io/blakeblackshear/frigate:stable    shm_size: "512mb" # update for your cameras based on calculation above    devices:      - /dev/bus/usb:/dev/bus/usb # Passes the USB Coral, needs to be modified for other versions      - /dev/apex_0:/dev/apex_0 # Passes a PCIe Coral, follow driver instructions here https://github.com/jnicolson/gasket-builder      - /dev/video11:/dev/video11 # For Raspberry Pi 4B      - /dev/dri/renderD128:/dev/dri/renderD128 # For intel hwaccel, needs to be updated for your hardware    volumes:      - /etc/localtime:/etc/localtime:ro      - /path/to/your/config:/config      - /path/to/your/storage:/media/frigate      - type: tmpfs # Optional: 1GB of memory, reduces SSD/SD Card wear        target: /tmp/cache        tmpfs:          size: 1000000000    ports:      - "8971:8971"      # - "5000:5000" # Internal unauthenticated access. Expose carefully.      - "8554:8554" # RTSP feeds      - "8555:8555/tcp" # WebRTC over tcp      - "8555:8555/udp" # WebRTC over udp    environment:      FRIGATE_RTSP_PASSWORD: "password"
```

If you can't use Docker Compose, you can run the container with something similar to this:

```
docker run -d \  --name frigate \  --restart=unless-stopped \  --stop-timeout 30 \  --mount type=tmpfs,target=/tmp/cache,tmpfs-size=1000000000 \  --device /dev/bus/usb:/dev/bus/usb \  --device /dev/dri/renderD128 \  --shm-size=64m \  -v /path/to/your/storage:/media/frigate \  -v /path/to/your/config:/config \  -v /etc/localtime:/etc/localtime:ro \  -e FRIGATE_RTSP_PASSWORD='password' \  -p 8971:8971 \  -p 8554:8554 \  -p 8555:8555/tcp \  -p 8555:8555/udp \  ghcr.io/blakeblackshear/frigate:stable
```

The official docker image tags for the current stable version are:

*   `stable` - Standard Frigate build for amd64 & RPi Optimized Frigate build for arm64. This build includes support for Hailo devices as well.
*   `stable-standard-arm64` - Standard Frigate build for arm64
*   `stable-tensorrt` - Frigate build specific for amd64 devices running an nvidia GPU
*   `stable-rocm` - Frigate build for [AMD GPUs](/configuration/object_detectors#amdrocm-gpu-detector)

The community supported docker image tags for the current stable version are:

*   `stable-tensorrt-jp6` - Frigate build optimized for nvidia Jetson devices running Jetpack 6
*   `stable-rk` - Frigate build for SBCs with Rockchip SoC

## Home Assistant Add-on[​](#home-assistant-add-on "Direct link to Home Assistant Add-on")

warning

As of Home Assistant Operating System 10.2 and Home Assistant 2023.6 defining separate network storage for media is supported.

There are important limitations in HA OS to be aware of:

*   Separate local storage for media is not yet supported by Home Assistant
*   AMD GPUs are not supported because HA OS does not include the mesa driver.
*   Nvidia GPUs are not supported because addons do not support the nvidia runtime.

tip

See [the network storage guide](/guides/ha_network_storage) for instructions to setup network storage for frigate.

Home Assistant OS users can install via the Add-on repository.

1.  In Home Assistant, navigate to _Settings_ > _Add-ons_ > _Add-on Store_ > _Repositories_
2.  Add `https://github.com/blakeblackshear/frigate-hass-addons`
3.  Install the desired variant of the Frigate Add-on (see below)
4.  Setup your network configuration in the `Configuration` tab
5.  Start the Add-on
6.  Use the _Open Web UI_ button to access the Frigate UI, then click in the _cog icon_ > _Configuration editor_ and configure Frigate to your liking

There are several variants of the Add-on available:

Add-on Variant

Description

Frigate

Current release with protection mode on

Frigate (Full Access)

Current release with the option to disable protection mode

Frigate Beta

Beta release with protection mode on

Frigate Beta (Full Access)

Beta release with the option to disable protection mode

If you are using hardware acceleration for ffmpeg, you **may** need to use the _Full Access_ variant of the Add-on. This is because the Frigate Add-on runs in a container with limited access to the host system. The _Full Access_ variant allows you to disable _Protection mode_ and give Frigate full access to the host system.

You can also edit the Frigate configuration file through the [VS Code Add-on](https://github.com/hassio-addons/addon-vscode) or similar. In that case, the configuration file will be at `/addon_configs/<addon_directory>/config.yml`, where `<addon_directory>` is specific to the variant of the Frigate Add-on you are running. See the list of directories [here](/configuration/#accessing-add-on-config-dir).

## Kubernetes[​](#kubernetes "Direct link to Kubernetes")

Use the [helm chart](https://github.com/blakeblackshear/blakeshome-charts/tree/master/charts/frigate).

## Unraid[​](#unraid "Direct link to Unraid")

Many people have powerful enough NAS devices or home servers to also run docker. There is a Unraid Community App. To install make sure you have the [community app plugin here](https://forums.unraid.net/topic/38582-plug-in-community-applications/). Then search for "Frigate" in the apps section within Unraid - you can see the online store [here](https://unraid.net/community/apps?q=frigate#r)

## Proxmox[​](#proxmox "Direct link to Proxmox")

[According to Proxmox documentation](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#chapter_pct) it is recommended that you run application containers like Frigate inside a Proxmox QEMU VM. This will give you all the advantages of application containerization, while also providing the benefits that VMs offer, such as strong isolation from the host and the ability to live-migrate, which otherwise isn’t possible with containers.

warning

If you choose to run Frigate via LXC in Proxmox the setup can be complex so be prepared to read the Proxmox and LXC documentation, Frigate does not officially support running inside of an LXC.

Suggestions include:

*   For Intel-based hardware acceleration, to allow access to the `/dev/dri/renderD128` device with major number 226 and minor number 128, add the following lines to the `/etc/pve/lxc/<id>.conf` LXC configuration:
    *   `lxc.cgroup2.devices.allow: c 226:128 rwm`
    *   `lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file`
*   The LXC configuration will likely also need `features: fuse=1,nesting=1`. This allows running a Docker container in an LXC container (`nesting`) and prevents duplicated files and wasted storage (`fuse`).
*   Successfully passing hardware devices through multiple levels of containerization (LXC then Docker) can be difficult. Many people make devices like `/dev/dri/renderD128` world-readable in the host or run Frigate in a privileged LXC container.
*   The virtualization layer often introduces a sizable amount of overhead for communication with Coral devices, but [not in all circumstances](https://github.com/blakeblackshear/frigate/discussions/1837).

See the [Proxmox LXC discussion](https://github.com/blakeblackshear/frigate/discussions/5773) for more general information.

## ESXi[​](#esxi "Direct link to ESXi")

For details on running Frigate using ESXi, please see the instructions [here](https://williamlam.com/2023/05/frigate-nvr-with-coral-tpu-igpu-passthrough-using-esxi-on-intel-nuc.html).

If you're running Frigate on a rack mounted server and want to passthrough the Google Coral, [read this.](https://github.com/blakeblackshear/frigate/issues/305)

## Synology NAS on DSM 7[​](#synology-nas-on-dsm-7 "Direct link to Synology NAS on DSM 7")

These settings were tested on DSM 7.1.1-42962 Update 4

**General:**

The `Execute container using high privilege` option needs to be enabled in order to give the frigate container the elevated privileges it may need.

The `Enable auto-restart` option can be enabled if you want the container to automatically restart whenever it improperly shuts down due to an error.

![image](https://user-images.githubusercontent.com/4516296/232586790-0b659a82-561d-4bc5-899b-0f5b39c6b11d.png)

**Advanced Settings:**

If you want to use the password template feature, you should add the "FRIGATE\_RTSP\_PASSWORD" environment variable and set it to your preferred password under advanced settings. The rest of the environment variables should be left as default for now.

![image](https://user-images.githubusercontent.com/4516296/232587163-0eb662d4-5e28-4914-852f-9db1ec4b9c3d.png)

**Port Settings:**

The network mode should be set to `bridge`. You need to map the default frigate container ports to your local Synology NAS ports that you want to use to access Frigate.

There may be other services running on your NAS that are using the same ports that frigate uses. In that instance you can set the ports to auto or a specific port.

![image](https://user-images.githubusercontent.com/4516296/232582642-773c0e37-7ef5-4373-8ce3-41401b1626e6.png)

**Volume Settings:**

You need to configure 2 paths:

*   The location of your config directory which will be different depending on your NAS folder structure e.g. `/docker/frigate/config` will mount to `/config` within the container.
*   The location on your NAS where the recordings will be saved this needs to be a folder e.g. `/docker/volumes/frigate-0-media`

![image](https://user-images.githubusercontent.com/4516296/232585872-44431d15-55e0-4004-b78b-1e512702b911.png)

## QNAP NAS[​](#qnap-nas "Direct link to QNAP NAS")

These instructions were tested on a QNAP with an Intel J3455 CPU and 16G RAM, running QTS 4.5.4.2117.

QNAP has a graphic tool named Container Station to install and manage docker containers. However, there are two limitations with Container Station that make it unsuitable to install Frigate:

1.  Container Station does not incorporate GitHub Container Registry (ghcr), which hosts Frigate docker image version 0.12.0 and above.
2.  Container Station uses default 64 Mb shared memory size (shm-size), and does not have a mechanism to adjust it. Frigate requires a larger shm-size to be able to work properly with more than two high resolution cameras.

Because of above limitations, the installation has to be done from command line. Here are the steps:

**Preparation**

1.  Install Container Station from QNAP App Center if it is not installed.
2.  Enable ssh on your QNAP (please do an Internet search on how to do this).
3.  Prepare Frigate config file, name it `config.yml`.
4.  Calculate shared memory size according to [documentation](https://docs.frigate.video/frigate/installation).
5.  Find your time zone value from [https://en.wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
6.  ssh to QNAP.

**Installation**

Run the following commands to install Frigate (using `stable` version as example):

```
# Download Frigate imagedocker pull ghcr.io/blakeblackshear/frigate:stable# Create directory to host Frigate config file on QNAP file system.# E.g., you can choose to create it under /share/Container.mkdir -p /share/Container/frigate/config# Copy the config file prepared in step 2 into the newly created config directory.cp path/to/your/config/file /share/Container/frigate/config# Create directory to host Frigate media files on QNAP file system.# (if you have a surveillance disk, create media directory on the surveillance disk.# Example command assumes share_vol2 is the surveillance drivemkdir -p /share/share_vol2/frigate/media# Create Frigate docker container.  Replace shm-size value with the value from preparation step 3.# Also replace the time zone value for 'TZ' in the sample command.# Example command will create a docker container that uses at most 2 CPUs and 4G RAM.# You may need to add "--env=LIBVA_DRIVER_NAME=i965 \" to the following docker run command if you# have certain CPU (e.g., J4125). See https://docs.frigate.video/configuration/hardware_acceleration_video.docker run \  --name=frigate \  --shm-size=256m \  --restart=unless-stopped \  --env=TZ=America/New_York \  --volume=/share/Container/frigate/config:/config:rw \  --volume=/share/share_vol2/frigate/media:/media/frigate:rw \  --network=bridge \  --privileged \  --workdir=/opt/frigate \  -p 8971:8971 \  -p 8554:8554 \  -p 8555:8555 \  -p 8555:8555/udp \  --label='com.qnap.qcs.network.mode=nat' \  --label='com.qnap.qcs.gpu=False' \  --memory="4g" \  --cpus="2" \  --detach=true \  -t \  ghcr.io/blakeblackshear/frigate:stable
```

Log into QNAP, open Container Station. Frigate docker container should be listed under 'Overview' and running. Visit Frigate Web UI by clicking Frigate docker, and then clicking the URL shown at the top of the detail page.

*   [Dependencies](#dependencies)
*   [Preparing your hardware](#preparing-your-hardware)
    *   [Operating System](#operating-system)
    *   [Storage](#storage)
    *   [Ports](#ports)
    *   [Calculating required shm-size](#calculating-required-shm-size)
*   [Extra Steps for Specific Hardware](#extra-steps-for-specific-hardware)
    *   [Raspberry Pi 3/4](#raspberry-pi-34)
    *   [Hailo-8](#hailo-8)
    *   [Rockchip platform](#rockchip-platform)
*   [Docker](#docker)
*   [Home Assistant Add-on](#home-assistant-add-on)
*   [Kubernetes](#kubernetes)
*   [Unraid](#unraid)
*   [Proxmox](#proxmox)
*   [ESXi](#esxi)
*   [Synology NAS on DSM 7](#synology-nas-on-dsm-7)
*   [QNAP NAS](#qnap-nas)

--- END OF FILE: frigate-planning_setup.md ---
--- START OF FILE: frigate-planning_setup.md ---

Source: https://docs.frigate.video/frigate/planning_setup

On this page

Choosing the right hardware for your Frigate NVR setup is important for optimal performance and a smooth experience. This guide will walk you through the key considerations, focusing on the number of cameras and the hardware required for efficient object detection.

## Key Considerations[​](#key-considerations "Direct link to Key Considerations")

### Number of Cameras and Simultaneous Activity[​](#number-of-cameras-and-simultaneous-activity "Direct link to Number of Cameras and Simultaneous Activity")

The most fundamental factor in your hardware decision is the number of cameras you plan to use. However, it's not just about the raw count; it's also about how many of those cameras are likely to see activity and require object detection simultaneously.

When motion is detected in a camera's feed, regions of that frame are sent to your chosen [object detection hardware](/configuration/object_detectors).

*   **Low Simultaneous Activity (1-6 cameras with occasional motion)**: If you have a few cameras in areas with infrequent activity (e.g., a seldom-used backyard, a quiet interior), the demand on your object detection hardware will be lower. A single, entry-level AI accelerator will suffice.
*   **Moderate Simultaneous Activity (6-12 cameras with some overlapping motion)**: For setups with more cameras, especially in areas like a busy street or a property with multiple access points, it's more likely that several cameras will capture activity at the same time. This increases the load on your object detection hardware, requiring more processing power.
*   **High Simultaneous Activity (12+ cameras or highly active zones)**: Large installations or scenarios where many cameras frequently capture activity (e.g., busy street with overview, identification, dedicated LPR cameras, etc.) will necessitate robust object detection capabilities. You'll likely need multiple entry-level AI accelerators or a more powerful single unit such as a discrete GPU.
*   **Commercial Installations (40+ cameras)**: Commercial installations or scenarios where a substantial number of cameras capture activity (e.g., a commercial property, an active public space) will necessitate robust object detection capabilities. You'll likely need a modern discrete GPU.

### Video Decoding[​](#video-decoding "Direct link to Video Decoding")

Modern CPUs with integrated GPUs (Intel Quick Sync, AMD VCN) or dedicated GPUs can significantly offload video decoding from the main CPU, freeing up resources. This is highly recommended, especially for multiple cameras.

tip

For commercial installations it is important to verify the number of supported concurrent streams on your GPU, many consumer GPUs max out at ~20 concurrent camera streams.

## Hardware Considerations[​](#hardware-considerations "Direct link to Hardware Considerations")

### Object Detection[​](#object-detection "Direct link to Object Detection")

There are many different hardware options for object detection depending on priorities and available hardware. See [the recommended hardware page](/frigate/hardware#detectors) for more specifics on what hardware is recommended for object detection.

### Storage[​](#storage "Direct link to Storage")

Storage is an important consideration when planning a new installation. To get a more precise estimate of your storage requirements, you can use an IP camera storage calculator. Websites like [IPConfigure Storage Calculator](https://calculator.ipconfigure.com/) can help you determine the necessary disk space based on your camera settings.

#### SSDs (Solid State Drives)[​](#ssds-solid-state-drives "Direct link to SSDs (Solid State Drives)")

SSDs are an excellent choice for Frigate, offering high speed and responsiveness. The older concern that SSDs would quickly "wear out" from constant video recording is largely no longer valid for modern consumer and enterprise-grade SSDs.

*   Longevity: Modern SSDs are designed with advanced wear-leveling algorithms and significantly higher "Terabytes Written" (TBW) ratings than earlier models. For typical home NVR use, a good quality SSD will likely outlast the useful life of your NVR hardware itself.
*   Performance: SSDs excel at handling the numerous small write operations that occur during continuous video recording and can significantly improve the responsiveness of the Frigate UI and clip retrieval.
*   Silence and Efficiency: SSDs produce no noise and consume less power than traditional HDDs.

#### HDDs (Hard Disk Drives)[​](#hdds-hard-disk-drives "Direct link to HDDs (Hard Disk Drives)")

Traditional Hard Disk Drives (HDDs) remain a great and often more cost-effective option for long-term video storage, especially for larger setups where raw capacity is prioritized.

*   Cost-Effectiveness: HDDs offer the best cost per gigabyte, making them ideal for storing many days, weeks, or months of continuous footage.
*   Capacity: HDDs are available in much larger capacities than most consumer SSDs, which is beneficial for extensive video archives.
*   NVR-Rated Drives: If choosing an HDD, consider drives specifically designed for surveillance (NVR) use, such as Western Digital Purple or Seagate SkyHawk. These drives are engineered for 24/7 operation and continuous write workloads, offering improved reliability compared to standard desktop drives.

Determining Your Storage Needs The amount of storage you need will depend on several factors:

*   Number of Cameras: More cameras naturally require more space.
*   Resolution and Framerate: Higher resolution (e.g., 4K) and higher framerate (e.g., 30fps) streams consume significantly more storage.
*   Recording Method: Continuous recording uses the most space. motion-only recording or object-triggered recording can save space, but may miss some footage.
*   Retention Period: How many days, weeks, or months of footage do you want to keep?

#### Network Storage (NFS/SMB)[​](#network-storage-nfssmb "Direct link to Network Storage (NFS/SMB)")

While supported, using network-attached storage (NAS) for recordings can introduce latency and network dependency considerations. For optimal performance and reliability, it is generally recommended to have local storage for your Frigate recordings. If using a NAS, ensure your network connection to it is robust and fast (Gigabit Ethernet at minimum) and that the NAS itself can handle the continuous write load.

### RAM (Memory)[​](#ram-memory "Direct link to RAM (Memory)")

*   **Basic Minimum: 4GB RAM**: This is generally sufficient for a very basic Frigate setup with a few cameras and a dedicated object detection accelerator, without running any enrichments. Performance might be tight, especially with higher resolution streams or numerous detections.
*   **Minimum for Enrichments: 8GB RAM**: If you plan to utilize Frigate's enrichment features (e.g., facial recognition, license plate recognition, or other AI models that run alongside standard object detection), 8GB of RAM should be considered the minimum. Enrichments require additional memory to load and process their respective models and data.
*   **Recommended: 16GB RAM**: For most users, especially those with many cameras (8+) or who plan to heavily leverage enrichments, 16GB of RAM is highly recommended. This provides ample headroom for smooth operation, reduces the likelihood of swapping to disk (which can impact performance), and allows for future expansion.

*   [Key Considerations](#key-considerations)
    *   [Number of Cameras and Simultaneous Activity](#number-of-cameras-and-simultaneous-activity)
    *   [Video Decoding](#video-decoding)
*   [Hardware Considerations](#hardware-considerations)
    *   [Object Detection](#object-detection)
    *   [Storage](#storage)
    *   [RAM (Memory)](#ram-memory)

--- END OF FILE: frigate-updating.md ---
--- START OF FILE: frigate-updating.md ---

Source: https://docs.frigate.video/frigate/updating

On this page

The current stable version of Frigate is **0.16.3**. The release notes and any breaking changes for this version can be found on the [Frigate GitHub releases page](https://github.com/blakeblackshear/frigate/releases/tag/v0.16.3).

Keeping Frigate up to date ensures you benefit from the latest features, performance improvements, and bug fixes. The update process varies slightly depending on your installation method (Docker, Home Assistant Addon, etc.). Below are instructions for the most common setups.

## Before You Begin[​](#before-you-begin "Direct link to Before You Begin")

*   **Stop Frigate**: For most methods, you’ll need to stop the running Frigate instance before backing up and updating.
*   **Backup Your Configuration**: Always back up your `/config` directory (e.g., `config.yml` and `frigate.db`, the SQLite database) before updating. This ensures you can roll back if something goes wrong.
*   **Check Release Notes**: Carefully review the [Frigate GitHub releases page](https://github.com/blakeblackshear/frigate/releases) for breaking changes or configuration updates that might affect your setup.

## Updating with Docker[​](#updating-with-docker "Direct link to Updating with Docker")

If you’re running Frigate via Docker (recommended method), follow these steps:

1.  **Stop the Container**:
    
    *   If using Docker Compose:
        
        ```
        docker compose down frigate
        ```
        
    *   If using `docker run`:
        
        ```
        docker stop frigate
        ```
        
2.  **Update and Pull the Latest Image**:
    
    *   If using Docker Compose:
        *   Edit your `docker-compose.yml` file to specify the desired version tag (e.g., `0.16.3` instead of `0.15.2`). For example:
            
            ```
            services:  frigate:    image: ghcr.io/blakeblackshear/frigate:0.16.3
            ```
            
        *   Then pull the image:
            
            ```
            docker pull ghcr.io/blakeblackshear/frigate:0.16.3
            ```
            
        *   **Note for `stable` Tag Users**: If your `docker-compose.yml` uses the `stable` tag (e.g., `ghcr.io/blakeblackshear/frigate:stable`), you don’t need to update the tag manually. The `stable` tag always points to the latest stable release after pulling.
    *   If using `docker run`:
        *   Pull the image with the appropriate tag (e.g., `0.16.3`, `0.16.3-tensorrt`, or `stable`):
            
            ```
            docker pull ghcr.io/blakeblackshear/frigate:0.16.3
            ```
            
3.  **Start the Container**:
    
    *   If using Docker Compose:
        
        ```
        docker compose up -d
        ```
        
    *   If using `docker run`, re-run your original command (e.g., from the [Installation](/frigate/installation#docker) section) with the updated image tag.
4.  **Verify the Update**:
    
    *   Check the container logs to ensure Frigate starts successfully:
        
        ```
        docker logs frigate
        ```
        
    *   Visit the Frigate Web UI (default: `http://<your-ip>:5000`) to confirm the new version is running. The version number is displayed at the top of the System Metrics page.

### Notes[​](#notes "Direct link to Notes")

*   If you’ve customized other settings (e.g., `shm-size`), ensure they’re still appropriate after the update.
*   Docker will automatically use the updated image when you restart the container, as long as you pulled the correct version.

## Updating the Home Assistant Addon[​](#updating-the-home-assistant-addon "Direct link to Updating the Home Assistant Addon")

For users running Frigate as a Home Assistant Addon:

1.  **Check for Updates**:
    
    *   Navigate to **Settings > Add-ons** in Home Assistant.
    *   Find your installed Frigate addon (e.g., "Frigate NVR" or "Frigate NVR (Full Access)").
    *   If an update is available, you’ll see an "Update" button.
2.  **Update the Addon**:
    
    *   Click the "Update" button next to the Frigate addon.
    *   Wait for the process to complete. Home Assistant will handle downloading and installing the new version.
3.  **Restart the Addon**:
    
    *   After updating, go to the addon’s page and click "Restart" to apply the changes.
4.  **Verify the Update**:
    
    *   Check the addon logs (under the "Log" tab) to ensure Frigate starts without errors.
    *   Access the Frigate Web UI to confirm the new version is running.

### Notes[​](#notes-1 "Direct link to Notes")

*   Ensure your `/config/frigate.yml` is compatible with the new version by reviewing the [Release notes](https://github.com/blakeblackshear/frigate/releases).
*   If using custom hardware (e.g., Coral or GPU), verify that configurations still work, as addon updates don’t modify your hardware settings.

## Rolling Back[​](#rolling-back "Direct link to Rolling Back")

If an update causes issues:

1.  Stop Frigate.
2.  Restore your backed-up config file and database.
3.  Revert to the previous image version:
    *   For Docker: Specify an older tag (e.g., `ghcr.io/blakeblackshear/frigate:0.15.2`) in your `docker run` command.
    *   For Docker Compose: Edit your `docker-compose.yml`, specify the older version tag (e.g., `ghcr.io/blakeblackshear/frigate:0.15.2`), and re-run `docker compose up -d`.
    *   For Home Assistant: Reinstall the previous addon version manually via the repository if needed and restart the addon.
4.  Verify the old version is running again.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

*   **Container Fails to Start**: Check logs (`docker logs frigate`) for errors.
*   **UI Not Loading**: Ensure ports (e.g., 5000, 8971) are still mapped correctly and the service is running.
*   **Hardware Issues**: Revisit hardware-specific setup (e.g., Coral, GPU) if detection or decoding fails post-update.

Common questions are often answered in the [FAQ](https://github.com/blakeblackshear/frigate/discussions), pinned at the top of the support discussions.

*   [Before You Begin](#before-you-begin)
*   [Updating with Docker](#updating-with-docker)
    *   [Notes](#notes)
*   [Updating the Home Assistant Addon](#updating-the-home-assistant-addon)
    *   [Notes](#notes-1)
*   [Rolling Back](#rolling-back)
*   [Troubleshooting](#troubleshooting)

--- END OF FILE: frigate-video_pipeline.md ---
--- START OF FILE: frigate-video_pipeline.md ---

Source: https://docs.frigate.video/frigate/video_pipeline

On this page

Frigate uses a sophisticated video pipeline that starts with the camera feed and progressively applies transformations to it (e.g. decoding, motion detection, etc.).

This guide provides an overview to help users understand some of the key Frigate concepts.

## Overview[​](#overview "Direct link to Overview")

At a high level, there are five processing steps that could be applied to a camera feed

As the diagram shows, all feeds first need to be acquired. Depending on the data source, it may be as simple as using FFmpeg to connect to an RTSP source via TCP or something more involved like connecting to an Apple Homekit camera using go2rtc. A single camera can produce a main (i.e. high resolution) and a sub (i.e. lower resolution) video feed.

Typically, the sub-feed will be decoded to produce full-frame images. As part of this process, the resolution may be downscaled and an image sampling frequency may be imposed (e.g. keep 5 frames per second).

These frames will then be compared over time to detect movement areas (a.k.a. motion boxes). These motion boxes are combined into motion regions and are analyzed by a machine learning model to detect known objects. Finally, the snapshot and recording retention config will decide what video clips and events should be saved.

## Detailed view of the video pipeline[​](#detailed-view-of-the-video-pipeline "Direct link to Detailed view of the video pipeline")

The following diagram adds a lot more detail than the simple view explained before. The goal is to show the detailed data paths between the processing steps.

*   [Overview](#overview)
*   [Detailed view of the video pipeline](#detailed-view-of-the-video-pipeline)

--- END OF FILE: guides-configuring_go2rtc.md ---
--- START OF FILE: guides-configuring_go2rtc.md ---

Source: https://docs.frigate.video/guides/configuring_go2rtc

On this page

Use of the bundled go2rtc is optional. You can still configure FFmpeg to connect directly to your cameras. However, adding go2rtc to your configuration is required for the following features:

*   WebRTC or MSE for live viewing with audio, higher resolutions and frame rates than the jsmpeg stream which is limited to the detect stream and does not support audio
*   Live stream support for cameras in Home Assistant Integration
*   RTSP relay for use with other consumers to reduce the number of connections to your camera streams

# Setup a go2rtc stream

First, you will want to configure go2rtc to connect to your camera stream by adding the stream you want to use for live view in your Frigate config file. Avoid changing any other parts of your config at this step. Note that go2rtc supports [many different stream types](https://github.com/AlexxIT/go2rtc/tree/v1.9.9#module-streams), not just rtsp.

tip

For the best experience, you should set the stream name under `go2rtc` to match the name of your camera so that Frigate will automatically map it and be able to use better live view options for the camera.

See [the live view docs](/configuration/live#setting-stream-for-live-ui) for more information.

```
go2rtc:  streams:    back:      - rtsp://user:password@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2
```

After adding this to the config, restart Frigate and try to watch the live stream for a single camera by clicking on it from the dashboard. It should look much clearer and more fluent than the original jsmpeg stream.

### What if my video doesn't play?[​](#what-if-my-video-doesnt-play "Direct link to What if my video doesn't play?")

*   Check Logs:
    
    *   Access the go2rtc logs in the Frigate UI under Logs in the sidebar.
    *   If go2rtc is having difficulty connecting to your camera, you should see some error messages in the log.
*   Check go2rtc Web Interface: if you don't see any errors in the logs, try viewing the camera through go2rtc's web interface.
    
    *   Navigate to port 1984 in your browser to access go2rtc's web interface.
        *   If using Frigate through Home Assistant, enable the web interface at port 1984.
        *   If using Docker, forward port 1984 before accessing the web interface.
    *   Click `stream` for the specific camera to see if the camera's stream is being received.
*   Check Video Codec:
    
    *   If the camera stream works in go2rtc but not in your browser, the video codec might be unsupported.
    *   If using H265, switch to H264. Refer to [video codec compatibility](https://github.com/AlexxIT/go2rtc/tree/v1.9.9#codecs-madness) in go2rtc documentation.
    *   If unable to switch from H265 to H264, or if the stream format is different (e.g., MJPEG), re-encode the video using [FFmpeg parameters](https://github.com/AlexxIT/go2rtc/tree/v1.9.9#source-ffmpeg). It supports rotating and resizing video feeds and hardware acceleration. Keep in mind that transcoding video from one format to another is a resource intensive task and you may be better off using the built-in jsmpeg view.
        
        ```
        go2rtc:  streams:    back:      - rtsp://user:password@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2      - "ffmpeg:back#video=h264#hardware"
        ```
        
*   Switch to FFmpeg if needed:
    
    *   Some camera streams may need to use the ffmpeg module in go2rtc. This has the downside of slower startup times, but has compatibility with more stream types.
        
        ```
        go2rtc:  streams:    back:      - ffmpeg:rtsp://user:password@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2
        ```
        
    *   If you can see the video but do not have audio, this is most likely because your camera's audio stream codec is not AAC.
        
    *   If possible, update your camera's audio settings to AAC in your camera's firmware.
        
    *   If your cameras do not support AAC audio, you will need to tell go2rtc to re-encode the audio to AAC on demand if you want audio. This will use additional CPU and add some latency. To add AAC audio on demand, you can update your go2rtc config as follows:
        
        ```
        go2rtc:  streams:    back:      - rtsp://user:password@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2      - "ffmpeg:back#audio=aac"
        ```
        
        If you need to convert **both** the audio and video streams, you can use the following:
        
        ```
        go2rtc:  streams:    back:      - rtsp://user:password@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2      - "ffmpeg:back#video=h264#audio=aac#hardware"
        ```
        
        When using the ffmpeg module, you would add AAC audio like this:
        
        ```
        go2rtc:  streams:    back:      - "ffmpeg:rtsp://user:password@10.0.10.10:554/cam/realmonitor?channel=1&subtype=2#video=copy#audio=copy#audio=aac#hardware"
        ```
        

warning

To access the go2rtc stream externally when utilizing the Frigate Add-On (for instance through VLC), you must first enable the RTSP Restream port. You can do this by visiting the Frigate Add-On configuration page within Home Assistant and revealing the hidden options under the "Show disabled ports" section.

## Next steps[​](#next-steps "Direct link to Next steps")

1.  If the stream you added to go2rtc is also used by Frigate for the `record` or `detect` role, you can migrate your config to pull from the RTSP restream to reduce the number of connections to your camera as shown [here](/configuration/restream#reduce-connections-to-camera).
2.  You can [set up WebRTC](/configuration/live#webrtc-extra-configuration) if your camera supports two-way talk. Note that WebRTC only supports specific audio formats and may require opening ports on your router.

## Important considerations[​](#important-considerations "Direct link to Important considerations")

If you are configuring go2rtc to publish HomeKit camera streams, on pairing the configuration is written to the `/dev/shm/go2rtc.yaml` file inside the container. These changes must be manually copied across to the `go2rtc` section of your Frigate configuration in order to persist through restarts.

*   [What if my video doesn't play?](#what-if-my-video-doesnt-play)
*   [Next steps](#next-steps)
*   [Important considerations](#important-considerations)

--- END OF FILE: guides-getting_started.md ---
--- START OF FILE: guides-getting_started.md ---

Source: https://docs.frigate.video/guides/getting_started

On this page

tip

If you already have an environment with Linux and Docker installed, you can continue to [Installing Frigate](#installing-frigate) below.

If you already have Frigate installed through Docker or through a Home Assistant Add-on, you can continue to [Configuring Frigate](#configuring-frigate) below.

## Setting up hardware[​](#setting-up-hardware "Direct link to Setting up hardware")

This section guides you through setting up a server with Debian Bookworm and Docker.

### Install Debian 12 (Bookworm)[​](#install-debian-12-bookworm "Direct link to Install Debian 12 (Bookworm)")

There are many guides on how to install Debian Server, so this will be an abbreviated guide. Connect a temporary monitor and keyboard to your device so you can install a minimal server without a desktop environment.

#### Prepare installation media[​](#prepare-installation-media "Direct link to Prepare installation media")

1.  Download the small installation image from the [Debian website](https://www.debian.org/distrib/netinst)
2.  Flash the ISO to a USB device (popular tool is [balena Etcher](https://etcher.balena.io/))
3.  Boot your device from USB

#### Install and setup Debian for remote access[​](#install-and-setup-debian-for-remote-access "Direct link to Install and setup Debian for remote access")

1.  Ensure your device is connected to the network so updates and software options can be installed
2.  Choose the non-graphical install option if you don't have a mouse connected, but either install method works fine
3.  You will be prompted to set the root user password and create a user with a password
4.  Install the minimum software. Fewer dependencies result in less maintenance.
    1.  Uncheck "Debian desktop environment" and "GNOME"
    2.  Check "SSH server"
    3.  Keep "standard system utilities" checked
5.  After reboot, login as root at the command prompt to add user to sudoers
    1.  Install sudo
        
        ```
        apt update && apt install -y sudo
        ```
        
    2.  Add the user you created to the sudo group (change `blake` to your own user)
        
        ```
        usermod -aG sudo blake
        ```
        
6.  Shutdown by running `poweroff`

At this point, you can install the device in a permanent location. The remaining steps can be performed via SSH from another device. If you don't have an SSH client, you can install one of the options listed in the [Visual Studio Code documentation](https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client).

#### Finish setup via SSH[​](#finish-setup-via-ssh "Direct link to Finish setup via SSH")

1.  Connect via SSH and login with your non-root user created during install
    
2.  Setup passwordless sudo so you don't have to type your password for each sudo command (change `blake` in the command below to your user)
    
    ```
    echo 'blake    ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/user
    ```
    
3.  Logout and login again to activate passwordless sudo
    
4.  Setup automatic security updates for the OS (optional)
    
    1.  Ensure everything is up to date by running
        
        ```
        sudo apt update && sudo apt upgrade -y
        ```
        
    2.  Install unattended upgrades
        
        ```
        sudo apt install -y unattended-upgradesecho unattended-upgrades unattended-upgrades/enable_auto_updates boolean true | sudo debconf-set-selectionssudo dpkg-reconfigure -f noninteractive unattended-upgrades
        ```
        

Now you have a minimal Debian server that requires very little maintenance.

### Install Docker[​](#install-docker "Direct link to Install Docker")

1.  Install Docker Engine (not Docker Desktop) using the [official docs](https://docs.docker.com/engine/install/debian/)
    1.  Specifically, follow the steps in the [Install using the apt repository](https://docs.docker.com/engine/install/debian/#install-using-the-repository) section
2.  Add your user to the docker group as described in the [Linux postinstall steps](https://docs.docker.com/engine/install/linux-postinstall/)

## Installing Frigate[​](#installing-frigate "Direct link to Installing Frigate")

This section shows how to create a minimal directory structure for a Docker installation on Debian. If you have installed Frigate as a Home Assistant Add-on or another way, you can continue to [Configuring Frigate](#configuring-frigate).

### Setup directories[​](#setup-directories "Direct link to Setup directories")

Frigate will create a config file if one does not exist on the initial startup. The following directory structure is the bare minimum to get started. Once Frigate is running, you can use the built-in config editor which supports config validation.

```
.├── docker-compose.yml├── config/└── storage/
```

This will create the above structure:

```
mkdir storage config && touch docker-compose.yml
```

If you are setting up Frigate on a Linux device via SSH, you can use [nano](https://itsfoss.com/nano-editor-guide/) to edit the following files. If you prefer to edit remote files with a full editor instead of a terminal, I recommend using [Visual Studio Code](https://code.visualstudio.com/) with the [Remote SSH extension](https://code.visualstudio.com/docs/remote/ssh-tutorial).

note

This `docker-compose.yml` file is just a starter for amd64 devices. You will need to customize it for your setup as detailed in the [Installation docs](/frigate/installation#docker).

`docker-compose.yml`

```
services:  frigate:    container_name: frigate    restart: unless-stopped    stop_grace_period: 30s    image: ghcr.io/blakeblackshear/frigate:stable    volumes:      - ./config:/config      - ./storage:/media/frigate      - type: tmpfs # Optional: 1GB of memory, reduces SSD/SD Card wear        target: /tmp/cache        tmpfs:          size: 1000000000    ports:      - "8971:8971"      - "8554:8554" # RTSP feeds
```

Now you should be able to start Frigate by running `docker compose up -d` from within the folder containing `docker-compose.yml`. On startup, an admin user and password will be created and outputted in the logs. You can see this by running `docker logs frigate`. Frigate should now be accessible at `https://server_ip:8971` where you can login with the `admin` user and finish the configuration using the built-in configuration editor.

## Configuring Frigate[​](#configuring-frigate "Direct link to Configuring Frigate")

This section assumes that you already have an environment setup as described in [Installation](/frigate/installation). You should also configure your cameras according to the [camera setup guide](/frigate/camera_setup). Pay particular attention to the section on choosing a detect resolution.

### Step 1: Add a detect stream[​](#step-1-add-a-detect-stream "Direct link to Step 1: Add a detect stream")

First we will add the detect stream for the camera:

```
mqtt:  enabled: Falsecameras:  name_of_your_camera: # <------ Name the camera    enabled: True    ffmpeg:      inputs:        - path: rtsp://10.0.10.10:554/rtsp # <----- The stream you want to use for detection          roles:            - detect
```

### Step 2: Start Frigate[​](#step-2-start-frigate "Direct link to Step 2: Start Frigate")

At this point you should be able to start Frigate and see the video feed in the UI.

If you get an error image from the camera, this means ffmpeg was not able to get the video feed from your camera. Check the logs for error messages from ffmpeg. The default ffmpeg arguments are designed to work with H264 RTSP cameras that support TCP connections.

FFmpeg arguments for other types of cameras can be found [here](/configuration/camera_specific).

### Step 3: Configure hardware acceleration (recommended)[​](#step-3-configure-hardware-acceleration-recommended "Direct link to Step 3: Configure hardware acceleration (recommended)")

Now that you have a working camera configuration, you want to setup hardware acceleration to minimize the CPU required to decode your video streams. See the [hardware acceleration](/configuration/hardware_acceleration_video) config reference for examples applicable to your hardware.

Here is an example configuration with hardware acceleration configured to work with most Intel processors with an integrated GPU using the [preset](/configuration/ffmpeg_presets):

`docker-compose.yml` (after modifying, you will need to run `docker compose up -d` to apply changes)

```
services:  frigate:    ...    devices:      - /dev/dri/renderD128:/dev/dri/renderD128 # for intel hwaccel, needs to be updated for your hardware    ...
```

`config.yml`

```
mqtt: ...cameras:  name_of_your_camera:    ffmpeg:      inputs: ...      hwaccel_args: preset-vaapi    detect: ...
```

### Step 4: Configure detectors[​](#step-4-configure-detectors "Direct link to Step 4: Configure detectors")

By default, Frigate will use a single CPU detector. If you have a USB Coral, you will need to add a detectors section to your config.

`docker-compose.yml` (after modifying, you will need to run `docker compose up -d` to apply changes)

```
services:  frigate:    ...    devices:      - /dev/bus/usb:/dev/bus/usb # passes the USB Coral, needs to be modified for other versions      - /dev/apex_0:/dev/apex_0 # passes a PCIe Coral, follow driver instructions here https://github.com/jnicolson/gasket-builder    ...
```

```
mqtt: ...detectors: # <---- add detectors  coral:    type: edgetpu    device: usbcameras:  name_of_your_camera:    ffmpeg: ...    detect:      enabled: True # <---- turn on detection      ...
```

More details on available detectors can be found [here](/configuration/object_detectors).

Restart Frigate and you should start seeing detections for `person`. If you want to track other objects, they will need to be added according to the [configuration file reference](/configuration/reference).

### Step 5: Setup motion masks[​](#step-5-setup-motion-masks "Direct link to Step 5: Setup motion masks")

Now that you have optimized your configuration for decoding the video stream, you will want to check to see where to implement motion masks. To do this, navigate to the camera in the UI, select "Debug" at the top, and enable "Motion boxes" in the options below the video feed. Watch for areas that continuously trigger unwanted motion to be detected. Common areas to mask include camera timestamps and trees that frequently blow in the wind. The goal is to avoid wasting object detection cycles looking at these areas.

Now that you know where you need to mask, use the "Mask & Zone creator" in the options pane to generate the coordinates needed for your config file. More information about masks can be found [here](/configuration/masks).

warning

Note that motion masks should not be used to mark out areas where you do not want objects to be detected or to reduce false positives. They do not alter the image sent to object detection, so you can still get tracked objects, alerts, and detections in areas with motion masks. These only prevent motion in these areas from initiating object detection.

Your configuration should look similar to this now.

```
mqtt:  enabled: Falsedetectors:  coral:    type: edgetpu    device: usbcameras:  name_of_your_camera:    ffmpeg:      inputs:        - path: rtsp://10.0.10.10:554/rtsp          roles:            - detect    motion:      mask:        - 0,461,3,0,1919,0,1919,843,1699,492,1344,458,1346,336,973,317,869,375,866,432
```

### Step 6: Enable recordings[​](#step-6-enable-recordings "Direct link to Step 6: Enable recordings")

In order to review activity in the Frigate UI, recordings need to be enabled.

To enable recording video, add the `record` role to a stream and enable it in the config. If record is disabled in the config, it won't be possible to enable it in the UI.

```
mqtt: ...detectors: ...cameras:  name_of_your_camera:    ffmpeg:      inputs:        - path: rtsp://10.0.10.10:554/rtsp          roles:            - detect        - path: rtsp://10.0.10.10:554/high_res_stream # <----- Add stream you want to record from          roles:            - record    detect: ...    record: # <----- Enable recording      enabled: True    motion: ...
```

If you don't have separate streams for detect and record, you would just add the record role to the list on the first input.

note

If you only define one stream in your `inputs` and do not assign a `detect` role to it, Frigate will automatically assign it the `detect` role. Frigate will always decode a stream to support motion detection, Birdseye, the API image endpoints, and other features, even if you have disabled object detection with `enabled: False` in your config's `detect` section.

If you only plan to use Frigate for recording, it is still recommended to define a `detect` role for a low resolution stream to minimize resource usage from the required stream decoding.

By default, Frigate will retain video of all tracked objects for 10 days. The full set of options for recording can be found [here](/configuration/reference).

### Step 7: Complete config[​](#step-7-complete-config "Direct link to Step 7: Complete config")

At this point you have a complete config with basic functionality.

*   View [common configuration examples](/configuration/#common-configuration-examples) for a list of common configuration examples.
*   View [full config reference](/configuration/reference) for a complete list of configuration options.

### Follow up[​](#follow-up "Direct link to Follow up")

Now that you have a working install, you can use the following documentation for additional features:

1.  [Configuring go2rtc](/guides/configuring_go2rtc) - Additional live view options and RTSP relay
2.  [Zones](/configuration/zones)
3.  [Review](/configuration/review)
4.  [Masks](/configuration/masks)
5.  [Home Assistant Integration](/integrations/home-assistant) - Integrate with Home Assistant

*   [Setting up hardware](#setting-up-hardware)
    *   [Install Debian 12 (Bookworm)](#install-debian-12-bookworm)
    *   [Install Docker](#install-docker)
*   [Installing Frigate](#installing-frigate)
    *   [Setup directories](#setup-directories)
*   [Configuring Frigate](#configuring-frigate)
    *   [Step 1: Add a detect stream](#step-1-add-a-detect-stream)
    *   [Step 2: Start Frigate](#step-2-start-frigate)
    *   [Step 3: Configure hardware acceleration (recommended)](#step-3-configure-hardware-acceleration-recommended)
    *   [Step 4: Configure detectors](#step-4-configure-detectors)
    *   [Step 5: Setup motion masks](#step-5-setup-motion-masks)
    *   [Step 6: Enable recordings](#step-6-enable-recordings)
    *   [Step 7: Complete config](#step-7-complete-config)
    *   [Follow up](#follow-up)

--- END OF FILE: guides-ha_network_storage.md ---
--- START OF FILE: guides-ha_network_storage.md ---

Source: https://docs.frigate.video/guides/ha_network_storage

On this page

As of Home Assistant 2023.6, Network Mounted Storage is supported for Add-ons.

## Setting Up Remote Storage For Frigate[​](#setting-up-remote-storage-for-frigate "Direct link to Setting Up Remote Storage For Frigate")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

*   Home Assistant 2023.6 or newer is installed
*   Running Home Assistant Operating System 10.2 or newer OR Running Supervised with latest os-agent installed (this is required for supervised install)

### Initial Setup[​](#initial-setup "Direct link to Initial Setup")

1.  Stop the Frigate Add-on

### Move current data[​](#move-current-data "Direct link to Move current data")

Keeping the current data is optional, but the data will need to be moved regardless so the share can be created successfully.

#### If you want to keep the current data[​](#if-you-want-to-keep-the-current-data "Direct link to If you want to keep the current data")

1.  Move the frigate.db, frigate.db-shm, frigate.db-wal files to the /config directory
2.  Rename the /media/frigate folder to /media/frigate\_tmp

#### If you don't want to keep the current data[​](#if-you-dont-want-to-keep-the-current-data "Direct link to If you don't want to keep the current data")

1.  Delete the /media/frigate folder and all of its contents

### Create the media share[​](#create-the-media-share "Direct link to Create the media share")

1.  Go to **Settings -> System -> Storage -> Add Network Storage**
2.  Name the share `frigate` (this is required)
3.  Choose type `media`
4.  Fill out the additional required info for your particular NAS
5.  Connect
6.  Move files from `/media/frigate_tmp` to `/media/frigate` if they were kept in previous step
7.  Start the Frigate Add-on

*   [Setting Up Remote Storage For Frigate](#setting-up-remote-storage-for-frigate)
    *   [Prerequisites](#prerequisites)
    *   [Initial Setup](#initial-setup)
    *   [Move current data](#move-current-data)
    *   [Create the media share](#create-the-media-share)

--- END OF FILE: guides-ha_notifications.md ---
--- START OF FILE: guides-ha_notifications.md ---

Source: https://docs.frigate.video/guides/ha_notifications

The best way to get started with notifications for Frigate is to use the [Blueprint](https://community.home-assistant.io/t/frigate-mobile-app-notifications-2-0/559732). You can use the yaml generated from the Blueprint as a starting point and customize from there.

It is generally recommended to trigger notifications based on the `frigate/reviews` mqtt topic. This provides the event\_id(s) needed to fetch [thumbnails/snapshots/clips](/integrations/home-assistant#notification-api) and other useful information to customize when and where you want to receive alerts. The data is published in the form of a change feed, which means you can reference the "previous state" of the object in the `before` section and the "current state" of the object in the `after` section. You can see an example [here](/integrations/mqtt#frigateevents).

Here is a simple example of a notification automation of tracked objects which will update the existing notification for each change. This means the image you see in the notification will update as Frigate finds a "better" image.

```
automation:  - alias: Notify of tracked object    trigger:      platform: mqtt      topic: frigate/events    action:      - service: notify.mobile_app_pixel_3        data:          message: 'A {{trigger.payload_json["after"]["label"]}} was detected.'          data:            image: 'https://your.public.hass.address.com/api/frigate/notifications/{{trigger.payload_json["after"]["id"]}}/thumbnail.jpg?format=android'            tag: '{{trigger.payload_json["after"]["id"]}}'            when: '{{trigger.payload_json["after"]["start_time"]|int}}'
```

Note that iOS devices support live previews of cameras by adding a camera entity id to the message data.

```
automation:  - alias: Security_Frigate_Notifications    description: ""    trigger:      - platform: mqtt        topic: frigate/reviews        payload: alert        value_template: "{{ value_json['after']['severity'] }}"    action:      - service: notify.mobile_app_iphone        data:          message: 'A {{trigger.payload_json["after"]["data"]["objects"] | sort | join(", ") | title}} was detected.'          data:            image: >-              https://your.public.hass.address.com/api/frigate/notifications/{{trigger.payload_json["after"]["data"]["detections"][0]}}/thumbnail.jpg            tag: '{{trigger.payload_json["after"]["id"]}}'            when: '{{trigger.payload_json["after"]["start_time"]|int}}'            entity_id: camera.{{trigger.payload_json["after"]["camera"] | replace("-","_") | lower}}    mode: single
```

--- END OF FILE: guides-reverse_proxy.md ---
--- START OF FILE: guides-reverse_proxy.md ---

Source: https://docs.frigate.video/guides/reverse_proxy

On this page

This guide outlines the basic configuration steps needed to set up a reverse proxy in front of your Frigate instance.

A reverse proxy is typically needed if you want to set up Frigate on a custom URL, on a subdomain, or on a host serving multiple sites. It could also be used to set up your own authentication provider or for more advanced HTTP routing.

Before setting up a reverse proxy, check if any of the built-in functionality in Frigate suits your needs:

Topic

Docs

TLS

Please see the `tls` [configuration option](/configuration/tls)

Authentication

Please see the [authentication](/configuration/authentication) documentation

IPv6

[Enabling IPv6](/configuration/advanced#enabling-ipv6)

**Note about TLS**  
When using a reverse proxy, the TLS session is usually terminated at the proxy, sending the internal request over plain HTTP. If this is the desired behavior, TLS must first be disabled in Frigate, or you will encounter an HTTP 400 error: "The plain HTTP request was sent to HTTPS port."  
To disable TLS, set the following in your Frigate configuration:

```
tls:  enabled: false
```

warning

A reverse proxy can be used to secure access to an internal web server, but the user will be entirely reliant on the steps they have taken. You must ensure you are following security best practices. This page does not attempt to outline the specific steps needed to secure your internal website.  
Please use your own knowledge to assess and vet the reverse proxy software before you install anything on your system.

## Proxies[​](#proxies "Direct link to Proxies")

There are many solutions available to implement reverse proxies and the community is invited to help out documenting others through a contribution to this page.

*   [Apache2](#apache2-reverse-proxy)
*   [Nginx](#nginx-reverse-proxy)
*   [Traefik](#traefik-reverse-proxy)
*   [Caddy](#caddy-reverse-proxy)

## Apache2 Reverse Proxy[​](#apache2-reverse-proxy "Direct link to Apache2 Reverse Proxy")

In the configuration examples below, only the directives relevant to the reverse proxy approach above are included. On Debian Apache2 the configuration file will be named along the lines of `/etc/apache2/sites-available/cctv.conf`

### Step 1: Configure the Apache2 Reverse Proxy[​](#step-1-configure-the-apache2-reverse-proxy "Direct link to Step 1: Configure the Apache2 Reverse Proxy")

Make life easier for yourself by presenting your Frigate interface as a DNS sub-domain rather than as a sub-folder of your main domain. Here we access Frigate via [https://cctv.mydomain.co.uk](https://cctv.mydomain.co.uk)

```
<VirtualHost *:443>    ServerName cctv.mydomain.co.uk    ProxyPreserveHost On    ProxyPass "/"  "http://frigatepi.local:8971/"    ProxyPassReverse "/"  "http://frigatepi.local:8971/"    ProxyPass /ws ws://frigatepi.local:8971/ws    ProxyPassReverse /ws ws://frigatepi.local:8971/ws    ProxyPass /live/ ws://frigatepi.local:8971/live/    ProxyPassReverse /live/ ws://frigatepi.local:8971/live/    RewriteEngine on    RewriteCond %{HTTP:Upgrade} =websocket [NC]    RewriteRule /(.*)  ws://frigatepi.local:8971/$1 [P,L]    RewriteCond %{HTTP:Upgrade} !=websocket [NC]    RewriteRule /(.*)  http://frigatepi.local:8971/$1 [P,L]</VirtualHost>
```

### Step 2: Use SSL to encrypt access to your Frigate instance[​](#step-2-use-ssl-to-encrypt-access-to-your-frigate-instance "Direct link to Step 2: Use SSL to encrypt access to your Frigate instance")

Whilst this won't, on its own, prevent access to your Frigate webserver it will encrypt all content (such as login credentials). Installing SSL is beyond the scope of this document but [Let's Encrypt](https://letsencrypt.org/) is a widely used approach. This Apache2 configuration snippet then results in unencrypted requests being redirected to the webserver SSL port

```
<VirtualHost *:80>ServerName cctv.mydomain.co.ukRewriteEngine onRewriteCond %{SERVER_NAME} =cctv.mydomain.co.ukRewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]</VirtualHost>
```

### Step 3: Authenticate users at the proxy[​](#step-3-authenticate-users-at-the-proxy "Direct link to Step 3: Authenticate users at the proxy")

There are many ways to authenticate a website but a straightforward approach is to use [Apache2 password files](https://httpd.apache.org/docs/2.4/howto/auth.html).

```
<VirtualHost *:443>    <Location />        AuthType Basic        AuthName "Restricted Files"        AuthUserFile "/var/www/passwords"        Require user paul    </Location></VirtualHost>
```

## Nginx Reverse Proxy[​](#nginx-reverse-proxy "Direct link to Nginx Reverse Proxy")

This method shows a working example for subdomain type reverse proxy with SSL enabled.

### Setup server and port to reverse proxy[​](#setup-server-and-port-to-reverse-proxy "Direct link to Setup server and port to reverse proxy")

This is set in `$server` and `$port` this should match your ports you have exposed to your docker container. Optionally you listen on port `443` and enable `SSL`

```
# ------------------------------------------------------------# frigate.domain.com# ------------------------------------------------------------server {  set $forward_scheme http;  set $server         "192.168.100.2"; # FRIGATE SERVER LOCATION  set $port           8971;  listen 80;  listen 443 ssl;  http2 on;  server_name frigate.domain.com;}
```

### Setup SSL (optional)[​](#setup-ssl-optional "Direct link to Setup SSL (optional)")

This section points to your SSL files, the example below shows locations to a default Lets Encrypt SSL certificate.

```
  # Let's Encrypt SSL  include conf.d/include/letsencrypt-acme-challenge.conf;  include conf.d/include/ssl-ciphers.conf;  ssl_certificate /etc/letsencrypt/live/npm-1/fullchain.pem;  ssl_certificate_key /etc/letsencrypt/live/npm-1/privkey.pem;
```

### Setup reverse proxy settings[​](#setup-reverse-proxy-settings "Direct link to Setup reverse proxy settings")

The settings below enabled connection upgrade, sets up logging (optional) and proxies everything from the `/` context to the docker host and port specified earlier in the configuration

```
  proxy_set_header Upgrade $http_upgrade;  proxy_set_header Connection $http_connection;  proxy_http_version 1.1;  access_log /data/logs/proxy-host-40_access.log proxy;  error_log /data/logs/proxy-host-40_error.log warn;  location / {    proxy_set_header Upgrade $http_upgrade;    proxy_set_header Connection $http_connection;    proxy_http_version 1.1;  }
```

## Traefik Reverse Proxy[​](#traefik-reverse-proxy "Direct link to Traefik Reverse Proxy")

This example shows how to add a `label` to the Frigate Docker compose file, enabling Traefik to automatically discover your Frigate instance.  
Before using the example below, you must first set up Traefik with the [Docker provider](https://doc.traefik.io/traefik/providers/docker/)

```
services:  frigate:    container_name: frigate    image: ghcr.io/blakeblackshear/frigate:stable    ...    ...    labels:      - "traefik.enable=true"      - "traefik.http.services.frigate.loadbalancer.server.port=8971"      - "traefik.http.routers.frigate.rule=Host(`traefik.example.com`)"
```

The above configuration will create a "service" in Traefik, automatically adding your container's IP on port 8971 as a backend. It will also add a router, routing requests to "traefik.example.com" to your local container.

Note that with this approach, you don't need to expose any ports for the Frigate instance since all traffic will be routed over the internal Docker network.

## Caddy Reverse Proxy[​](#caddy-reverse-proxy "Direct link to Caddy Reverse Proxy")

This example shows Frigate running under a subdomain with logging and a tls cert (in this case a wildcard domain cert obtained independently of caddy) handled via imports

```
(logging) {        log {                output file /var/log/caddy/{args[0]}.log {                        roll_size 10MiB                        roll_keep 5                        roll_keep_for 10d                }                format json                level INFO        }}(tls) {        tls /var/lib/caddy/wildcard.YOUR_DOMAIN.TLD.fullchain.pem /var/lib/caddy/wildcard.YOUR_DOMAIN.TLD.privkey.pem}frigate.YOUR_DOMAIN.TLD {        reverse_proxy http://localhost:8971         import tls        import logging frigate.YOUR_DOMAIN.TLD}
```

*   [Proxies](#proxies)
*   [Apache2 Reverse Proxy](#apache2-reverse-proxy)
    *   [Step 1: Configure the Apache2 Reverse Proxy](#step-1-configure-the-apache2-reverse-proxy)
    *   [Step 2: Use SSL to encrypt access to your Frigate instance](#step-2-use-ssl-to-encrypt-access-to-your-frigate-instance)
    *   [Step 3: Authenticate users at the proxy](#step-3-authenticate-users-at-the-proxy)
*   [Nginx Reverse Proxy](#nginx-reverse-proxy)
    *   [Setup server and port to reverse proxy](#setup-server-and-port-to-reverse-proxy)
    *   [Setup SSL (optional)](#setup-ssl-optional)
    *   [Setup reverse proxy settings](#setup-reverse-proxy-settings)
*   [Traefik Reverse Proxy](#traefik-reverse-proxy)
*   [Caddy Reverse Proxy](#caddy-reverse-proxy)

--- END OF FILE: index.md ---
--- START OF FILE: index.md ---

Source: https://docs.frigate.video

On this page

A complete and local NVR designed for Home Assistant with AI object detection. Uses OpenCV and Tensorflow to perform realtime object detection locally for IP cameras.

Use of a [Recommended Detector](/frigate/hardware#detectors) is optional, but strongly recommended. CPU detection should only be used for testing purposes.

*   Tight integration with Home Assistant via a [custom component](https://github.com/blakeblackshear/frigate-hass-integration)
*   Designed to minimize resource use and maximize performance by only looking for objects when and where it is necessary
*   Leverages multiprocessing heavily with an emphasis on realtime over processing every frame
*   Uses a very low overhead motion detection to determine where to run object detection
*   Object detection with TensorFlow runs in separate processes for maximum FPS
*   Communicates over MQTT for easy integration into other systems
*   Recording with retention based on detected objects
*   Re-streaming via RTSP to reduce the number of connections to your camera
*   A dynamic combined camera view of all tracked cameras.

## Screenshots[​](#screenshots "Direct link to Screenshots")

![Live View](/assets/images/live-view-c0b5423966d937ac7f750b67bf8cdf50.png)

![Review Items](/assets/images/review-items-c7914c6f1b3d92d38b56e6d3559074bc.png)

![Media Browser](/assets/images/media_browser-min-1f8a7c629d1bdbee1c78f99a97a0219a.png)

![Notification](/assets/images/notification-min-2f4dd1c2ad07e908a34c04e02e2c78b7.png)

*   [Screenshots](#screenshots)

--- END OF FILE: integrations-api-all-recordings-summary-recordings-summary-get.md ---
--- START OF FILE: integrations-api-all-recordings-summary-recordings-summary-get.md ---

Source: https://docs.frigate.video/integrations/api/all-recordings-summary-recordings-summary-get

# All Recordings Summary

GET 

## https://demo.frigate.video/api/recordings/summary

Returns true/false by day indicating if recordings exist

## Request[​](#request "Direct link to Request")

### Query Parameters

**timezone** Timezone

**Default value:** `utc`

**cameras** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/recordings/summary", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

timezone — query

cameras — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-auth-auth-get.md ---
--- START OF FILE: integrations-api-auth-auth-get.md ---

Source: https://docs.frigate.video/integrations/api/auth-auth-get

# Auth

GET 

## https://demo.frigate.video/api/auth

Auth

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/auth", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-camera-ptz-info-camera-name-ptz-info-get.md ---
--- START OF FILE: integrations-api-camera-ptz-info-camera-name-ptz-info-get.md ---

Source: https://docs.frigate.video/integrations/api/camera-ptz-info-camera-name-ptz-info-get

# Camera Ptz Info

GET 

## https://demo.frigate.video/api/:camera\_name/ptz/info

Camera Ptz Info

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/ptz/info", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-config-config-get.md ---
--- START OF FILE: integrations-api-config-config-get.md ---

Source: https://docs.frigate.video/integrations/api/config-config-get

# Config

GET 

## https://demo.frigate.video/api/config

Config

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/config", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-config-raw-config-raw-get.md ---
--- START OF FILE: integrations-api-config-raw-config-raw-get.md ---

Source: https://docs.frigate.video/integrations/api/config-raw-config-raw-get

# Config Raw

GET 

## https://demo.frigate.video/api/config/raw

Config Raw

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/config/raw", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-config-save-config-save-post.md ---
--- START OF FILE: integrations-api-config-save-config-save-post.md ---

Source: https://docs.frigate.video/integrations/api/config-save-config-save-post

# Config Save

POST 

## https://demo.frigate.video/api/config/save

Config Save

## Request[​](#request "Direct link to Request")

### Query Parameters

**save\_option** Save Optionrequired

*   text/plain

### Body**required**

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Content-Type': 'text/plain',  'Accept': 'application/json'}conn.request("POST", "/api/config/save", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

save\_option — queryrequired

Body required
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-config-schema-config-schema-json-get.md ---
--- START OF FILE: integrations-api-config-schema-config-schema-json-get.md ---

Source: https://docs.frigate.video/integrations/api/config-schema-config-schema-json-get

# Config Schema

GET 

## https://demo.frigate.video/api/config/schema.json

Config Schema

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/config/schema.json", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-config-set-config-set-put.md ---
--- START OF FILE: integrations-api-config-set-config-set-put.md ---

Source: https://docs.frigate.video/integrations/api/config-set-config-set-put

# Config Set

PUT 

## https://demo.frigate.video/api/config/set

Config Set

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**requires\_restart**Requires Restart (integer)

**Default value:** `1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "requires_restart": 1})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PUT", "/api/config/set", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "requires\_restart": 1
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-create-event-events-camera-name-label-create-post.md ---
--- START OF FILE: integrations-api-create-event-events-camera-name-label-create-post.md ---

Source: https://docs.frigate.video/integrations/api/create-event-events-camera-name-label-create-post

# Create Event

POST 

## https://demo.frigate.video/api/events/:camera\_name/:label/create

Create Event

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

*   application/json

### Body

**source\_type** object

anyOf

*   MOD1
*   MOD2

string

**sub\_label** object

anyOf

*   MOD1
*   MOD2

string

**score** object

anyOf

*   MOD1
*   MOD2

number

**duration** object

anyOf

*   MOD1
*   MOD2

integer

**include\_recording** object

anyOf

*   MOD1
*   MOD2

boolean

**draw** object

anyOf

*   MOD1
*   MOD2

object

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

**event\_id**Event Id (string)required

```
{  "success": true,  "message": "string",  "event_id": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "source_type": "string",  "sub_label": "string",  "score": 0,  "duration": 0,  "include_recording": True,  "draw": {}})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/events/:camera_name/:label/create", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Body

{
  "source\_type": "string",  "sub\_label": "string",  "score": 0,  "duration": 0,  "include\_recording": true,  "draw": {}
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-create-face-faces-name-create-post.md ---
--- START OF FILE: integrations-api-create-face-faces-name-create-post.md ---

Source: https://docs.frigate.video/integrations/api/create-face-faces-name-create-post

# Create Face

POST 

## https://demo.frigate.video/api/faces/:name/create

Create Face

## Request[​](#request "Direct link to Request")

### Path Parameters

**name** Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("POST", "/api/faces/:name/create", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-create-user-users-post.md ---
--- START OF FILE: integrations-api-create-user-users-post.md ---

Source: https://docs.frigate.video/integrations/api/create-user-users-post

# Create User

POST 

## https://demo.frigate.video/api/users

Create User

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**username**Username (string)required

**password**Password (string)required

**role** object

anyOf

*   MOD1
*   MOD2

string

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "username": "string",  "password": "string",  "role": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/users", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "username": "string",  "password": "string",  "role": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-delete-event-events-event-id-delete.md ---
--- START OF FILE: integrations-api-delete-event-events-event-id-delete.md ---

Source: https://docs.frigate.video/integrations/api/delete-event-events-event-id-delete

# Delete Event

DELETE 

## https://demo.frigate.video/api/events/:event\_id

Delete Event

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("DELETE", "/api/events/:event_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-delete-events-events-delete.md ---
--- START OF FILE: integrations-api-delete-events-events-delete.md ---

Source: https://docs.frigate.video/integrations/api/delete-events-events-delete

# Delete Events

DELETE 

## https://demo.frigate.video/api/events/

Delete Events

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**event\_ids**string\[\]required

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**deleted\_events**string\[\]required

**not\_found\_events**string\[\]required

```
{  "success": true,  "deleted_events": [    "string"  ],  "not_found_events": [    "string"  ]}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "event_ids": [    "string"  ]})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("DELETE", "/api/events/", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "event\_ids": \[    "string"  \]
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-delete-retain-events-event-id-retain-delete.md ---
--- START OF FILE: integrations-api-delete-retain-events-event-id-retain-delete.md ---

Source: https://docs.frigate.video/integrations/api/delete-retain-events-event-id-retain-delete

# Delete Retain

DELETE 

## https://demo.frigate.video/api/events/:event\_id/retain

Delete Retain

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("DELETE", "/api/events/:event_id/retain", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-delete-reviews-reviews-delete-post.md ---
--- START OF FILE: integrations-api-delete-reviews-reviews-delete-post.md ---

Source: https://docs.frigate.video/integrations/api/delete-reviews-reviews-delete-post

# Delete Reviews

POST 

## https://demo.frigate.video/api/reviews/delete

Delete Reviews

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**ids**string\[\]required

**Possible values:** `>= 1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "ids": [    "string"  ]})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/reviews/delete", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "ids": \[    "string"  \]
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-delete-user-users-username-delete.md ---
--- START OF FILE: integrations-api-delete-user-users-username-delete.md ---

Source: https://docs.frigate.video/integrations/api/delete-user-users-username-delete

# Delete User

DELETE 

## https://demo.frigate.video/api/users/:username

Delete User

## Request[​](#request "Direct link to Request")

### Path Parameters

**username** Usernamerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("DELETE", "/api/users/:username", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

username — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-deregister-faces-faces-name-delete-post.md ---
--- START OF FILE: integrations-api-deregister-faces-faces-name-delete-post.md ---

Source: https://docs.frigate.video/integrations/api/deregister-faces-faces-name-delete-post

# Deregister Faces

POST 

## https://demo.frigate.video/api/faces/:name/delete

Deregister Faces

## Request[​](#request "Direct link to Request")

### Path Parameters

**name** Namerequired

*   application/json

### Body

**object**object

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/faces/:name/delete", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

name — pathrequired

Body

{}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-end-event-events-event-id-end-put.md ---
--- START OF FILE: integrations-api-end-event-events-event-id-end-put.md ---

Source: https://docs.frigate.video/integrations/api/end-event-events-event-id-end-put

# End Event

PUT 

## https://demo.frigate.video/api/events/:event\_id/end

End Event

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body**required**

**end\_time** object

anyOf

*   MOD1
*   MOD2

number

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "end_time": 0})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PUT", "/api/events/:event_id/end", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body required

{
  "end\_time": 0
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-clip-events-event-id-clip-mp-4-get.md ---
--- START OF FILE: integrations-api-event-clip-events-event-id-clip-mp-4-get.md ---

Source: https://docs.frigate.video/integrations/api/event-clip-events-event-id-clip-mp-4-get

# Event Clip

GET 

## https://demo.frigate.video/api/events/:event\_id/clip.mp4

Event Clip

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id/clip.mp4", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-events-event-id-get.md ---
--- START OF FILE: integrations-api-event-events-event-id-get.md ---

Source: https://docs.frigate.video/integrations/api/event-events-event-id-get

# Event

GET 

## https://demo.frigate.video/api/events/:event\_id

Event

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

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

```
{  "id": "string",  "label": "string",  "sub_label": "string",  "camera": "string",  "start_time": 0,  "end_time": 0,  "false_positive": true,  "zones": [    "string"  ],  "thumbnail": "string",  "has_clip": true,  "has_snapshot": true,  "retain_indefinitely": true,  "plus_id": "string",  "model_hash": "string",  "detector_type": "string",  "model_type": "string",  "data": {}}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-ids-event-ids-get.md ---
--- START OF FILE: integrations-api-event-ids-event-ids-get.md ---

Source: https://docs.frigate.video/integrations/api/event-ids-event-ids-get

# Event Ids

GET 

## https://demo.frigate.video/api/event\_ids

Event Ids

## Request[​](#request "Direct link to Request")

### Query Parameters

**ids** Idsrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

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

*   \]
    

```
[  {    "id": "string",    "label": "string",    "sub_label": "string",    "camera": "string",    "start_time": 0,    "end_time": 0,    "false_positive": true,    "zones": [      "string"    ],    "thumbnail": "string",    "has_clip": true,    "has_snapshot": true,    "retain_indefinitely": true,    "plus_id": "string",    "model_hash": "string",    "detector_type": "string",    "model_type": "string",    "data": {}  }]
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/event_ids", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

ids — queryrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-preview-events-event-id-preview-gif-get.md ---
--- START OF FILE: integrations-api-event-preview-events-event-id-preview-gif-get.md ---

Source: https://docs.frigate.video/integrations/api/event-preview-events-event-id-preview-gif-get

# Event Preview

GET 

## https://demo.frigate.video/api/events/:event\_id/preview.gif

Event Preview

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id/preview.gif", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-snapshot-clean-events-event-id-snapshot-clean-png-get.md ---
--- START OF FILE: integrations-api-event-snapshot-clean-events-event-id-snapshot-clean-png-get.md ---

Source: https://docs.frigate.video/integrations/api/event-snapshot-clean-events-event-id-snapshot-clean-png-get

# Event Snapshot Clean

GET 

## https://demo.frigate.video/api/events/:event\_id/snapshot-clean.png

Event Snapshot Clean

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

### Query Parameters

**download** Download

**Default value:** `false`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id/snapshot-clean.png", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Show optional parameters

download — query

\---truefalse

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-snapshot-events-event-id-snapshot-jpg-get.md ---
--- START OF FILE: integrations-api-event-snapshot-events-event-id-snapshot-jpg-get.md ---

Source: https://docs.frigate.video/integrations/api/event-snapshot-events-event-id-snapshot-jpg-get

# Event Snapshot

GET 

## https://demo.frigate.video/api/events/:event\_id/snapshot.jpg

Returns a snapshot image for the specified object id. NOTE: The query params only take affect while the event is in-progress. Once the event has ended the snapshot configuration is used.

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

### Query Parameters

**download** any

**timestamp** any

**bbox** any

**crop** any

**height** any

**quality** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/:event_id/snapshot.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Show optional parameters

download — query

timestamp — query

bbox — query

crop — query

height — query

quality — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-event-thumbnail-events-event-id-thumbnail-extension-get.md ---
--- START OF FILE: integrations-api-event-thumbnail-events-event-id-thumbnail-extension-get.md ---

Source: https://docs.frigate.video/integrations/api/event-thumbnail-events-event-id-thumbnail-extension-get

# Event Thumbnail

GET 

## https://demo.frigate.video/api/events/:event\_id/thumbnail.:extension

Event Thumbnail

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

**extension** Extensionrequired

### Query Parameters

**max\_cache\_age** Max Cache Age

Max cache age in seconds. Default 30 days in seconds.

**Default value:** `2592000`

**format** Format

**Possible values:** \[`ios`, `android`\]

**Default value:** `ios`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

extension — pathrequired

Show optional parameters

max\_cache\_age — query

format — query

\---iosandroid

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-events-events-get.md ---
--- START OF FILE: integrations-api-events-events-get.md ---

Source: https://docs.frigate.video/integrations/api/events-events-get

# Events

GET 

## https://demo.frigate.video/api/events

Events

## Request[​](#request "Direct link to Request")

### Query Parameters

**camera** any

**cameras** any

**label** any

**labels** any

**sub\_label** any

**sub\_labels** any

**zone** any

**zones** any

**limit** any

**after** any

**before** any

**time\_range** any

**has\_clip** any

**has\_snapshot** any

**in\_progress** any

**include\_thumbnails** anydeprecated

Deprecated. Thumbnail data is no longer included in the response. Use the /api/events/:event\_id/thumbnail.:extension endpoint instead.

**favorites** any

**min\_score** any

**max\_score** any

**min\_speed** any

**max\_speed** any

**recognized\_license\_plate** any

**is\_submitted** any

**min\_length** any

**max\_length** any

**event\_id** any

**sort** any

**timezone** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

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

*   \]
    

```
[  {    "id": "string",    "label": "string",    "sub_label": "string",    "camera": "string",    "start_time": 0,    "end_time": 0,    "false_positive": true,    "zones": [      "string"    ],    "thumbnail": "string",    "has_clip": true,    "has_snapshot": true,    "retain_indefinitely": true,    "plus_id": "string",    "model_hash": "string",    "detector_type": "string",    "model_type": "string",    "data": {}  }]
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

camera — query

cameras — query

label — query

labels — query

sub\_label — query

sub\_labels — query

zone — query

zones — query

limit — query

after — query

before — query

time\_range — query

has\_clip — query

has\_snapshot — query

in\_progress — query

include\_thumbnails — query

favorites — query

min\_score — query

max\_score — query

min\_speed — query

max\_speed — query

recognized\_license\_plate — query

is\_submitted — query

min\_length — query

max\_length — query

event\_id — query

sort — query

timezone — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-events-explore-events-explore-get.md ---
--- START OF FILE: integrations-api-events-explore-events-explore-get.md ---

Source: https://docs.frigate.video/integrations/api/events-explore-events-explore-get

# Events Explore

GET 

## https://demo.frigate.video/api/events/explore

Events Explore

## Request[​](#request "Direct link to Request")

### Query Parameters

**limit** Limit

**Default value:** `10`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

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

*   \]
    

```
[  {    "id": "string",    "label": "string",    "sub_label": "string",    "camera": "string",    "start_time": 0,    "end_time": 0,    "false_positive": true,    "zones": [      "string"    ],    "thumbnail": "string",    "has_clip": true,    "has_snapshot": true,    "retain_indefinitely": true,    "plus_id": "string",    "model_hash": "string",    "detector_type": "string",    "model_type": "string",    "data": {}  }]
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/explore", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

limit — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-events-search-events-search-get.md ---
--- START OF FILE: integrations-api-events-search-events-search-get.md ---

Source: https://docs.frigate.video/integrations/api/events-search-events-search-get

# Events Search

GET 

## https://demo.frigate.video/api/events/search

Events Search

## Request[​](#request "Direct link to Request")

### Query Parameters

**query** any

**event\_id** any

**search\_type** any

**include\_thumbnails** anydeprecated

Deprecated. Thumbnail data is no longer included in the response. Use the /api/events/:event\_id/thumbnail.:extension endpoint instead.

**limit** any

**cameras** any

**labels** any

**zones** any

**after** any

**before** any

**time\_range** any

**has\_clip** any

**has\_snapshot** any

**is\_submitted** any

**timezone** any

**min\_score** any

**max\_score** any

**min\_speed** any

**max\_speed** any

**recognized\_license\_plate** any

**sort** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/search", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

query — query

event\_id — query

search\_type — query

include\_thumbnails — query

limit — query

cameras — query

labels — query

zones — query

after — query

before — query

time\_range — query

has\_clip — query

has\_snapshot — query

is\_submitted — query

timezone — query

min\_score — query

max\_score — query

min\_speed — query

max\_speed — query

recognized\_license\_plate — query

sort — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-events-summary-events-summary-get.md ---
--- START OF FILE: integrations-api-events-summary-events-summary-get.md ---

Source: https://docs.frigate.video/integrations/api/events-summary-events-summary-get

# Events Summary

GET 

## https://demo.frigate.video/api/events/summary

Events Summary

## Request[​](#request "Direct link to Request")

### Query Parameters

**timezone** any

**has\_clip** any

**has\_snapshot** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/events/summary", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

timezone — query

has\_clip — query

has\_snapshot — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-export-delete-export-event-id-delete.md ---
--- START OF FILE: integrations-api-export-delete-export-event-id-delete.md ---

Source: https://docs.frigate.video/integrations/api/export-delete-export-event-id-delete

# Export Delete

DELETE 

## https://demo.frigate.video/api/export/:event\_id

Export Delete

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("DELETE", "/api/export/:event_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-export-recording-export-camera-name-start-start-time-end-end-time-post.md ---
--- START OF FILE: integrations-api-export-recording-export-camera-name-start-start-time-end-end-time-post.md ---

Source: https://docs.frigate.video/integrations/api/export-recording-export-camera-name-start-start-time-end-end-time-post

# Export Recording

POST 

## https://demo.frigate.video/api/export/:camera\_name/start/:start\_time/end/:end\_time

Export Recording

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_time** Start Timerequired

**end\_time** End Timerequired

*   application/json

### Body**required**

**playback**Playback factor (string)

**Possible values:** \[`realtime`, `timelapse_25x`\]

**Default value:** `realtime`

**source**Playback source (string)

**Possible values:** \[`recordings`, `preview`\]

**Default value:** `recordings`

**name**Friendly name (string)

**Possible values:** `<= 256 characters`

**image\_path**Image Path (string)

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "playback": "realtime",  "source": "recordings",  "name": "string",  "image_path": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/export/:camera_name/start/:start_time/end/:end_time", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_time — pathrequired

end\_time — pathrequired

Body required

{
  "playback": "realtime",  "source": "recordings",  "name": "string",  "image\_path": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-export-rename-export-event-id-rename-patch.md ---
--- START OF FILE: integrations-api-export-rename-export-event-id-rename-patch.md ---

Source: https://docs.frigate.video/integrations/api/export-rename-export-event-id-rename-patch

# Export Rename

PATCH 

## https://demo.frigate.video/api/export/:event\_id/rename

Export Rename

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body**required**

**name**Friendly name (string)required

**Possible values:** `<= 256 characters`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "name": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PATCH", "/api/export/:event_id/rename", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body required

{
  "name": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-false-positive-events-event-id-false-positive-put.md ---
--- START OF FILE: integrations-api-false-positive-events-event-id-false-positive-put.md ---

Source: https://docs.frigate.video/integrations/api/false-positive-events-event-id-false-positive-put

# False Positive

PUT 

## https://demo.frigate.video/api/events/:event\_id/false\_positive

False Positive

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**plus\_id**Plus Id (string)required

```
{  "success": true,  "plus_id": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("PUT", "/api/events/:event_id/false_positive", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-ffprobe-ffprobe-get.md ---
--- START OF FILE: integrations-api-ffprobe-ffprobe-get.md ---

Source: https://docs.frigate.video/integrations/api/ffprobe-ffprobe-get

# Ffprobe

GET 

## https://demo.frigate.video/api/ffprobe

Ffprobe

## Request[​](#request "Direct link to Request")

### Query Parameters

**paths** Paths

**Default value:**

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/ffprobe", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

paths — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-frigate-http-api.md ---
--- START OF FILE: integrations-api-frigate-http-api.md ---

Source: https://docs.frigate.video/integrations/api/frigate-http-api

[

## 🗃️ Auth

9 items

](/integrations/api/auth-auth-get)

[

## 🗃️ Events

28 items

](/integrations/api/get-faces-faces-get)

[

## 🗃️ Review

9 items

](/integrations/api/review-review-get)

[

## 🗃️ App

23 items

](/integrations/api/is-healthy-get)

[

## 🗃️ Logs

1 item

](/integrations/api/logs-logs-service-get)

[

## 🗃️ Preview

3 items

](/integrations/api/preview-ts-preview-camera-name-start-start-ts-end-end-ts-get)

[

## 🗃️ Notifications

2 items

](/integrations/api/get-vapid-pub-key-notifications-pubkey-get)

[

## 🗃️ Export

5 items

](/integrations/api/get-exports-exports-get)

[

## 🗃️ Media

29 items

](/integrations/api/mjpeg-feed-camera-name-get)

[

## 🗃️ Schemas

35 items

](/integrations/api/schemas/appconfigsetbody)

--- END OF FILE: integrations-api-get-export-exports-export-id-get.md ---
--- START OF FILE: integrations-api-get-export-exports-export-id-get.md ---

Source: https://docs.frigate.video/integrations/api/get-export-exports-export-id-get

# Get Export

GET 

## https://demo.frigate.video/api/exports/:export\_id

Get Export

## Request[​](#request "Direct link to Request")

### Path Parameters

**export\_id** Export Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/exports/:export_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

export\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-exports-exports-get.md ---
--- START OF FILE: integrations-api-get-exports-exports-get.md ---

Source: https://docs.frigate.video/integrations/api/get-exports-exports-get

# Get Exports

GET 

## https://demo.frigate.video/api/exports

Get Exports

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/exports", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-faces-faces-get.md ---
--- START OF FILE: integrations-api-get-faces-faces-get.md ---

Source: https://docs.frigate.video/integrations/api/get-faces-faces-get

# Get Faces

GET 

## https://demo.frigate.video/api/faces

Get Faces

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/faces", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-labels-labels-get.md ---
--- START OF FILE: integrations-api-get-labels-labels-get.md ---

Source: https://docs.frigate.video/integrations/api/get-labels-labels-get

# Get Labels

GET 

## https://demo.frigate.video/api/labels

Get Labels

## Request[​](#request "Direct link to Request")

### Query Parameters

**camera** Camera

**Default value:**

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/labels", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

camera — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-preview-frames-from-cache-preview-camera-name-start-start-ts-end-end-ts-frames-get.md ---
--- START OF FILE: integrations-api-get-preview-frames-from-cache-preview-camera-name-start-start-ts-end-end-ts-frames-get.md ---

Source: https://docs.frigate.video/integrations/api/get-preview-frames-from-cache-preview-camera-name-start-start-ts-end-end-ts-frames-get

# Get Preview Frames From Cache

GET 

## /preview/:camera\_name/start/:start\_ts/end/:end\_ts/frames

Get list of cached preview frames

## Request[​](#request "Direct link to Request")

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

Validation Error

--- END OF FILE: integrations-api-get-recognized-license-plates-recognized-license-plates-get.md ---
--- START OF FILE: integrations-api-get-recognized-license-plates-recognized-license-plates-get.md ---

Source: https://docs.frigate.video/integrations/api/get-recognized-license-plates-recognized-license-plates-get

# Get Recognized License Plates

GET 

## https://demo.frigate.video/api/recognized\_license\_plates

Get Recognized License Plates

## Request[​](#request "Direct link to Request")

### Query Parameters

**split\_joined** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/recognized_license_plates", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

split\_joined — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-recordings-storage-usage-recordings-storage-get.md ---
--- START OF FILE: integrations-api-get-recordings-storage-usage-recordings-storage-get.md ---

Source: https://docs.frigate.video/integrations/api/get-recordings-storage-usage-recordings-storage-get

# Get Recordings Storage Usage

GET 

## https://demo.frigate.video/api/recordings/storage

Get Recordings Storage Usage

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/recordings/storage", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-review-from-event-review-event-event-id-get.md ---
--- START OF FILE: integrations-api-get-review-from-event-review-event-event-id-get.md ---

Source: https://docs.frigate.video/integrations/api/get-review-from-event-review-event-event-id-get

# Get Review From Event

GET 

## https://demo.frigate.video/api/review/event/:event\_id

Get Review From Event

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**id**Id (string)required

**camera**Camera (string)required

**start\_time**date-timerequired

**end\_time**date-timerequired

**has\_been\_reviewed**Has Been Reviewed (boolean)required

**severity**SeverityEnum (string)required

**Possible values:** \[`alert`, `detection`\]

**thumb\_path**Thumb Path (string)required

**data**Datarequired

```
{  "id": "string",  "camera": "string",  "start_time": "2024-07-29T15:51:28.071Z",  "end_time": "2024-07-29T15:51:28.071Z",  "has_been_reviewed": true,  "severity": "alert",  "thumb_path": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/event/:event_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-review-review-review-id-get.md ---
--- START OF FILE: integrations-api-get-review-review-review-id-get.md ---

Source: https://docs.frigate.video/integrations/api/get-review-review-review-id-get

# Get Review

GET 

## https://demo.frigate.video/api/review/:review\_id

Get Review

## Request[​](#request "Direct link to Request")

### Path Parameters

**review\_id** Review Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**id**Id (string)required

**camera**Camera (string)required

**start\_time**date-timerequired

**end\_time**date-timerequired

**has\_been\_reviewed**Has Been Reviewed (boolean)required

**severity**SeverityEnum (string)required

**Possible values:** \[`alert`, `detection`\]

**thumb\_path**Thumb Path (string)required

**data**Datarequired

```
{  "id": "string",  "camera": "string",  "start_time": "2024-07-29T15:51:28.071Z",  "end_time": "2024-07-29T15:51:28.071Z",  "has_been_reviewed": true,  "severity": "alert",  "thumb_path": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/:review_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

review\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-snapshot-from-recording-camera-name-recordings-frame-time-snapshot-format-get.md ---
--- START OF FILE: integrations-api-get-snapshot-from-recording-camera-name-recordings-frame-time-snapshot-format-get.md ---

Source: https://docs.frigate.video/integrations/api/get-snapshot-from-recording-camera-name-recordings-frame-time-snapshot-format-get

# Get Snapshot From Recording

GET 

## https://demo.frigate.video/api/:camera\_name/recordings/:frame\_time/snapshot.:format

Get Snapshot From Recording

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**frame\_time** Frame Timerequired

**format** Formatrequired

**Possible values:** \[`png`, `jpg`\]

### Query Parameters

**height** Height

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

frame\_time — pathrequired

format — pathrequired

\---pngjpg

Show optional parameters

height — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-sub-labels-sub-labels-get.md ---
--- START OF FILE: integrations-api-get-sub-labels-sub-labels-get.md ---

Source: https://docs.frigate.video/integrations/api/get-sub-labels-sub-labels-get

# Get Sub Labels

GET 

## https://demo.frigate.video/api/sub\_labels

Get Sub Labels

## Request[​](#request "Direct link to Request")

### Query Parameters

**split\_joined** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/sub_labels", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

split\_joined — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-users-users-get.md ---
--- START OF FILE: integrations-api-get-users-users-get.md ---

Source: https://docs.frigate.video/integrations/api/get-users-users-get

# Get Users

GET 

## https://demo.frigate.video/api/users

Get Users

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/users", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-get-vapid-pub-key-notifications-pubkey-get.md ---
--- START OF FILE: integrations-api-get-vapid-pub-key-notifications-pubkey-get.md ---

Source: https://docs.frigate.video/integrations/api/get-vapid-pub-key-notifications-pubkey-get

# Get Vapid Pub Key

GET 

## https://demo.frigate.video/api/notifications/pubkey

Get Vapid Pub Key

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/notifications/pubkey", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-go-2-rtc-camera-stream-go-2-rtc-streams-camera-name-get.md ---
--- START OF FILE: integrations-api-go-2-rtc-camera-stream-go-2-rtc-streams-camera-name-get.md ---

Source: https://docs.frigate.video/integrations/api/go-2-rtc-camera-stream-go-2-rtc-streams-camera-name-get

# Go2Rtc Camera Stream

GET 

## https://demo.frigate.video/api/go2rtc/streams/:camera\_name

Go2Rtc Camera Stream

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/go2rtc/streams/:camera_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-go-2-rtc-streams-go-2-rtc-streams-get.md ---
--- START OF FILE: integrations-api-go-2-rtc-streams-go-2-rtc-streams-get.md ---

Source: https://docs.frigate.video/integrations/api/go-2-rtc-streams-go-2-rtc-streams-get

# Go2Rtc Streams

GET 

## https://demo.frigate.video/api/go2rtc/streams

Go2Rtc Streams

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/go2rtc/streams", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-grid-snapshot-camera-name-grid-jpg-get.md ---
--- START OF FILE: integrations-api-grid-snapshot-camera-name-grid-jpg-get.md ---

Source: https://docs.frigate.video/integrations/api/grid-snapshot-camera-name-grid-jpg-get

# Grid Snapshot

GET 

## https://demo.frigate.video/api/:camera\_name/grid.jpg

Grid Snapshot

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

### Query Parameters

**color** Color

**Default value:** `green`

**font\_scale** Font Scale

**Default value:** `0.5`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/grid.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Show optional parameters

color — query

font\_scale — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-hourly-timeline-timeline-hourly-get.md ---
--- START OF FILE: integrations-api-hourly-timeline-timeline-hourly-get.md ---

Source: https://docs.frigate.video/integrations/api/hourly-timeline-timeline-hourly-get

# Hourly Timeline

GET 

## https://demo.frigate.video/api/timeline/hourly

Get hourly summary for timeline.

## Request[​](#request "Direct link to Request")

### Query Parameters

**cameras** any

**labels** any

**after** any

**before** any

**limit** any

**timezone** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/timeline/hourly", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

cameras — query

labels — query

after — query

before — query

limit — query

timezone — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-is-healthy-get.md ---
--- START OF FILE: integrations-api-is-healthy-get.md ---

Source: https://docs.frigate.video/integrations/api/is-healthy-get

# Is Healthy

GET 

## https://demo.frigate.video/api/

Is Healthy

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   text/plain

*   Schema
*   Example (auto)

**Schema**

**string**string

```
"string"
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'text/plain'}conn.request("GET", "/api/", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-label-clip-camera-name-label-clip-mp-4-get.md ---
--- START OF FILE: integrations-api-label-clip-camera-name-label-clip-mp-4-get.md ---

Source: https://docs.frigate.video/integrations/api/label-clip-camera-name-label-clip-mp-4-get

# Label Clip

GET 

## https://demo.frigate.video/api/:camera\_name/:label/clip.mp4

Label Clip

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/:label/clip.mp4", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-label-snapshot-camera-name-label-snapshot-jpg-get.md ---
--- START OF FILE: integrations-api-label-snapshot-camera-name-label-snapshot-jpg-get.md ---

Source: https://docs.frigate.video/integrations/api/label-snapshot-camera-name-label-snapshot-jpg-get

# Label Snapshot

GET 

## https://demo.frigate.video/api/:camera\_name/:label/snapshot.jpg

Returns the snapshot image from the latest event for the given camera and label combo

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/:label/snapshot.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-label-thumbnail-camera-name-label-best-jpg-get.md ---
--- START OF FILE: integrations-api-label-thumbnail-camera-name-label-best-jpg-get.md ---

Source: https://docs.frigate.video/integrations/api/label-thumbnail-camera-name-label-best-jpg-get

# Label Thumbnail

GET 

## https://demo.frigate.video/api/:camera\_name/:label/best.jpg

Label Thumbnail

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/:label/best.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-label-thumbnail-camera-name-label-thumbnail-jpg-get.md ---
--- START OF FILE: integrations-api-label-thumbnail-camera-name-label-thumbnail-jpg-get.md ---

Source: https://docs.frigate.video/integrations/api/label-thumbnail-camera-name-label-thumbnail-jpg-get

# Label Thumbnail

GET 

## https://demo.frigate.video/api/:camera\_name/:label/thumbnail.jpg

Label Thumbnail

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**label** Labelrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/:label/thumbnail.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

label — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-latest-frame-camera-name-latest-extension-get.md ---
--- START OF FILE: integrations-api-latest-frame-camera-name-latest-extension-get.md ---

Source: https://docs.frigate.video/integrations/api/latest-frame-camera-name-latest-extension-get

# Latest Frame

GET 

## https://demo.frigate.video/api/:camera\_name/latest.:extension

Latest Frame

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**extension** Extensionrequired

**Possible values:** \[`webp`, `png`, `jpg`, `jpeg`\]

### Query Parameters

**bbox** any

**timestamp** any

**zones** any

**mask** any

**motion** any

**regions** any

**quality** any

**height** any

**store** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

extension — pathrequired

\---webppngjpgjpeg

Show optional parameters

bbox — query

timestamp — query

zones — query

mask — query

motion — query

regions — query

quality — query

height — query

store — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-login-login-post.md ---
--- START OF FILE: integrations-api-login-login-post.md ---

Source: https://docs.frigate.video/integrations/api/login-login-post

# Login

POST 

## https://demo.frigate.video/api/login

Login

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**user**User (string)required

**password**Password (string)required

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "user": "string",  "password": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/login", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "user": "string",  "password": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-logout-logout-get.md ---
--- START OF FILE: integrations-api-logout-logout-get.md ---

Source: https://docs.frigate.video/integrations/api/logout-logout-get

# Logout

GET 

## https://demo.frigate.video/api/logout

Logout

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/logout", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-logs-logs-service-get.md ---
--- START OF FILE: integrations-api-logs-logs-service-get.md ---

Source: https://docs.frigate.video/integrations/api/logs-logs-service-get

# Logs

GET 

## https://demo.frigate.video/api/logs/:service

Get logs for the requested service (frigate/nginx/go2rtc)

## Request[​](#request "Direct link to Request")

### Path Parameters

**service** Servicerequired

**Possible values:** \[`frigate`, `nginx`, `go2rtc`\]

### Query Parameters

**download** any

**stream** any

**start** any

**end** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/logs/:service", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

service — pathrequired

\---frigatenginxgo2rtc

Show optional parameters

download — query

stream — query

start — query

end — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-metrics-metrics-get.md ---
--- START OF FILE: integrations-api-metrics-metrics-get.md ---

Source: https://docs.frigate.video/integrations/api/metrics-metrics-get

# Metrics

GET 

## https://demo.frigate.video/api/metrics

Expose Prometheus metrics endpoint and update metrics with latest stats

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/metrics", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-mjpeg-feed-camera-name-get.md ---
--- START OF FILE: integrations-api-mjpeg-feed-camera-name-get.md ---

Source: https://docs.frigate.video/integrations/api/mjpeg-feed-camera-name-get

# Mjpeg Feed

GET 

## https://demo.frigate.video/api/:camera\_name

Mjpeg Feed

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

### Query Parameters

**fps** Fps

**Default value:** `3`

**height** Height

**Default value:** `360`

**bbox** any

**timestamp** any

**zones** any

**mask** any

**motion** any

**regions** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Show optional parameters

fps — query

height — query

bbox — query

timestamp — query

zones — query

mask — query

motion — query

regions — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-motion-activity-review-activity-motion-get.md ---
--- START OF FILE: integrations-api-motion-activity-review-activity-motion-get.md ---

Source: https://docs.frigate.video/integrations/api/motion-activity-review-activity-motion-get

# Motion Activity

GET 

## https://demo.frigate.video/api/review/activity/motion

Get motion and audio activity.

## Request[​](#request "Direct link to Request")

### Query Parameters

**cameras** Cameras

**Default value:** `all`

**before** Before

**after** After

**scale** Scale

**Default value:** `30`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

**start\_time**Start Time (integer)required

**motion**Motion (number)required

**camera**Camera (string)required

*   \]
    

```
[  {    "start_time": 0,    "motion": 0,    "camera": "string"  }]
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/activity/motion", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

cameras — query

before — query

after — query

scale — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-nvinfo-nvinfo-get.md ---
--- START OF FILE: integrations-api-nvinfo-nvinfo-get.md ---

Source: https://docs.frigate.video/integrations/api/nvinfo-nvinfo-get

# Nvinfo

GET 

## https://demo.frigate.video/api/nvinfo

Nvinfo

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/nvinfo", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-plus-models-plus-models-get.md ---
--- START OF FILE: integrations-api-plus-models-plus-models-get.md ---

Source: https://docs.frigate.video/integrations/api/plus-models-plus-models-get

# Plusmodels

GET 

## https://demo.frigate.video/api/plus/models

Plusmodels

## Request[​](#request "Direct link to Request")

### Query Parameters

**filterByCurrentModelDetector** Filterbycurrentmodeldetector

**Default value:** `false`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/plus/models", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

filterByCurrentModelDetector — query

\---truefalse

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-preview-gif-camera-name-start-start-ts-end-end-ts-preview-gif-get.md ---
--- START OF FILE: integrations-api-preview-gif-camera-name-start-start-ts-end-end-ts-preview-gif-get.md ---

Source: https://docs.frigate.video/integrations/api/preview-gif-camera-name-start-start-ts-end-end-ts-preview-gif-get

# Preview Gif

GET 

## https://demo.frigate.video/api/:camera\_name/start/:start\_ts/end/:end\_ts/preview.gif

Preview Gif

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

### Query Parameters

**max\_cache\_age** Max Cache Age

Max cache age in seconds. Default 30 days in seconds.

**Default value:** `2592000`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/start/:start_ts/end/:end_ts/preview.gif", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Show optional parameters

max\_cache\_age — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-preview-hour-preview-year-month-day-hour-camera-name-tz-name-get.md ---
--- START OF FILE: integrations-api-preview-hour-preview-year-month-day-hour-camera-name-tz-name-get.md ---

Source: https://docs.frigate.video/integrations/api/preview-hour-preview-year-month-day-hour-camera-name-tz-name-get

# Preview Hour

GET 

## https://demo.frigate.video/api/preview/:year\_month/:day/:hour/:camera\_name/:tz\_name

Get all mp4 previews relevant for time period given the timezone

## Request[​](#request "Direct link to Request")

### Path Parameters

**year\_month** Year Monthrequired

**day** Dayrequired

**hour** Hourrequired

**camera\_name** Camera Namerequired

**tz\_name** Tz Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/preview/:year_month/:day/:hour/:camera_name/:tz_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

year\_month — pathrequired

day — pathrequired

hour — pathrequired

camera\_name — pathrequired

tz\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-preview-mp-4-camera-name-start-start-ts-end-end-ts-preview-mp-4-get.md ---
--- START OF FILE: integrations-api-preview-mp-4-camera-name-start-start-ts-end-end-ts-preview-mp-4-get.md ---

Source: https://docs.frigate.video/integrations/api/preview-mp-4-camera-name-start-start-ts-end-end-ts-preview-mp-4-get

# Preview Mp4

GET 

## https://demo.frigate.video/api/:camera\_name/start/:start\_ts/end/:end\_ts/preview.mp4

Preview Mp4

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

### Query Parameters

**max\_cache\_age** Max Cache Age

Max cache age in seconds. Default 7 days in seconds.

**Default value:** `604800`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/start/:start_ts/end/:end_ts/preview.mp4", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Show optional parameters

max\_cache\_age — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-preview-thumbnail-preview-file-name-thumbnail-jpg-get.md ---
--- START OF FILE: integrations-api-preview-thumbnail-preview-file-name-thumbnail-jpg-get.md ---

Source: https://docs.frigate.video/integrations/api/preview-thumbnail-preview-file-name-thumbnail-jpg-get

# Preview Thumbnail

GET 

## https://demo.frigate.video/api/preview/:file\_name/thumbnail.jpg

Get a thumbnail from the cached preview frames.

## Request[​](#request "Direct link to Request")

### Path Parameters

**file\_name** File Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/preview/:file_name/thumbnail.jpg", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

file\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-preview-thumbnail-preview-file-name-thumbnail-webp-get.md ---
--- START OF FILE: integrations-api-preview-thumbnail-preview-file-name-thumbnail-webp-get.md ---

Source: https://docs.frigate.video/integrations/api/preview-thumbnail-preview-file-name-thumbnail-webp-get

# Preview Thumbnail

GET 

## https://demo.frigate.video/api/preview/:file\_name/thumbnail.webp

Get a thumbnail from the cached preview frames.

## Request[​](#request "Direct link to Request")

### Path Parameters

**file\_name** File Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/preview/:file_name/thumbnail.webp", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

file\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-preview-ts-preview-camera-name-start-start-ts-end-end-ts-get.md ---
--- START OF FILE: integrations-api-preview-ts-preview-camera-name-start-start-ts-end-end-ts-get.md ---

Source: https://docs.frigate.video/integrations/api/preview-ts-preview-camera-name-start-start-ts-end-end-ts-get

# Preview Ts

GET 

## https://demo.frigate.video/api/preview/:camera\_name/start/:start\_ts/end/:end\_ts

Get all mp4 previews relevant for time period.

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/preview/:camera_name/start/:start_ts/end/:end_ts", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-profile-profile-get.md ---
--- START OF FILE: integrations-api-profile-profile-get.md ---

Source: https://docs.frigate.video/integrations/api/profile-profile-get

# Profile

GET 

## https://demo.frigate.video/api/profile

Profile

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/profile", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-reclassify-face-faces-reprocess-post.md ---
--- START OF FILE: integrations-api-reclassify-face-faces-reprocess-post.md ---

Source: https://docs.frigate.video/integrations/api/reclassify-face-faces-reprocess-post

# Reclassify Face

POST 

## https://demo.frigate.video/api/faces/reprocess

Reclassify Face

## Request[​](#request "Direct link to Request")

*   application/json

### Body

**object**object

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/faces/reprocess", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body

{}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-recognize-face-faces-recognize-post.md ---
--- START OF FILE: integrations-api-recognize-face-faces-recognize-post.md ---

Source: https://docs.frigate.video/integrations/api/recognize-face-faces-recognize-post

# Recognize Face

POST 

## https://demo.frigate.video/api/faces/recognize

Recognize Face

## Request[​](#request "Direct link to Request")

*   multipart/form-data

### Body**required**

**file**binaryrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Content-Type': 'multipart/form-data',  'Accept': 'application/json'}conn.request("POST", "/api/faces/recognize", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

filerequired

file

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-recording-clip-camera-name-start-start-ts-end-end-ts-clip-mp-4-get.md ---
--- START OF FILE: integrations-api-recording-clip-camera-name-start-start-ts-end-end-ts-clip-mp-4-get.md ---

Source: https://docs.frigate.video/integrations/api/recording-clip-camera-name-start-start-ts-end-end-ts-clip-mp-4-get

# Recording Clip

GET 

## https://demo.frigate.video/api/:camera\_name/start/:start\_ts/end/:end\_ts/clip.mp4

For iOS devices, use the master.m3u8 HLS link instead of clip.mp4. Safari does not reliably process progressive mp4 files.

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/start/:start_ts/end/:end_ts/clip.mp4", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-recordings-camera-name-recordings-get.md ---
--- START OF FILE: integrations-api-recordings-camera-name-recordings-get.md ---

Source: https://docs.frigate.video/integrations/api/recordings-camera-name-recordings-get

# Recordings

GET 

## https://demo.frigate.video/api/:camera\_name/recordings

Return specific camera recordings between the given "after"/"end" times. If not provided the last hour will be used

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

### Query Parameters

**after** After

**Default value:** `1752611870.43948`

**before** Before

**Default value:** `1752615470.43949`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/recordings", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Show optional parameters

after — query

before — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-recordings-summary-camera-name-recordings-summary-get.md ---
--- START OF FILE: integrations-api-recordings-summary-camera-name-recordings-summary-get.md ---

Source: https://docs.frigate.video/integrations/api/recordings-summary-camera-name-recordings-summary-get

# Recordings Summary

GET 

## https://demo.frigate.video/api/:camera\_name/recordings/summary

Returns hourly summary for recordings of given camera

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

### Query Parameters

**timezone** Timezone

**Default value:** `utc`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/:camera_name/recordings/summary", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

Show optional parameters

timezone — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-regenerate-description-events-event-id-description-regenerate-put.md ---
--- START OF FILE: integrations-api-regenerate-description-events-event-id-description-regenerate-put.md ---

Source: https://docs.frigate.video/integrations/api/regenerate-description-events-event-id-description-regenerate-put

# Regenerate Description

PUT 

## https://demo.frigate.video/api/events/:event\_id/description/regenerate

Regenerate Description

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

### Query Parameters

**source** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("PUT", "/api/events/:event_id/description/regenerate", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Show optional parameters

source — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-register-face-faces-name-register-post.md ---
--- START OF FILE: integrations-api-register-face-faces-name-register-post.md ---

Source: https://docs.frigate.video/integrations/api/register-face-faces-name-register-post

# Register Face

POST 

## https://demo.frigate.video/api/faces/:name/register

Register Face

## Request[​](#request "Direct link to Request")

### Path Parameters

**name** Namerequired

*   multipart/form-data

### Body**required**

**file**binaryrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Content-Type': 'multipart/form-data',  'Accept': 'application/json'}conn.request("POST", "/api/faces/:name/register", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

name — pathrequired

Body required

filerequired

file

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-register-notifications-notifications-register-post.md ---
--- START OF FILE: integrations-api-register-notifications-notifications-register-post.md ---

Source: https://docs.frigate.video/integrations/api/register-notifications-notifications-register-post

# Register Notifications

POST 

## https://demo.frigate.video/api/notifications/register

Register Notifications

## Request[​](#request "Direct link to Request")

*   application/json

### Body

**object**object

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/notifications/register", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body

{}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-reindex-embeddings-reindex-put.md ---
--- START OF FILE: integrations-api-reindex-embeddings-reindex-put.md ---

Source: https://docs.frigate.video/integrations/api/reindex-embeddings-reindex-put

# Reindex Embeddings

PUT 

## https://demo.frigate.video/api/reindex

Reindex Embeddings

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("PUT", "/api/reindex", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-rename-face-faces-old-name-rename-put.md ---
--- START OF FILE: integrations-api-rename-face-faces-old-name-rename-put.md ---

Source: https://docs.frigate.video/integrations/api/rename-face-faces-old-name-rename-put

# Rename Face

PUT 

## https://demo.frigate.video/api/faces/:old\_name/rename

Rename Face

## Request[​](#request "Direct link to Request")

### Path Parameters

**old\_name** Old Namerequired

*   application/json

### Body**required**

**new\_name**New Name (string)required

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "new_name": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PUT", "/api/faces/:old_name/rename", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

old\_name — pathrequired

Body required

{
  "new\_name": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-reprocess-license-plate-lpr-reprocess-put.md ---
--- START OF FILE: integrations-api-reprocess-license-plate-lpr-reprocess-put.md ---

Source: https://docs.frigate.video/integrations/api/reprocess-license-plate-lpr-reprocess-put

# Reprocess License Plate

PUT 

## https://demo.frigate.video/api/lpr/reprocess

Reprocess License Plate

## Request[​](#request "Direct link to Request")

### Query Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("PUT", "/api/lpr/reprocess", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — queryrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-restart-restart-post.md ---
--- START OF FILE: integrations-api-restart-restart-post.md ---

Source: https://docs.frigate.video/integrations/api/restart-restart-post

# Restart

POST 

## https://demo.frigate.video/api/restart

Restart

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("POST", "/api/restart", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-review-ids-review-ids-get.md ---
--- START OF FILE: integrations-api-review-ids-review-ids-get.md ---

Source: https://docs.frigate.video/integrations/api/review-ids-review-ids-get

# Review Ids

GET 

## https://demo.frigate.video/api/review\_ids

Review Ids

## Request[​](#request "Direct link to Request")

### Query Parameters

**ids** Idsrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

**id**Id (string)required

**camera**Camera (string)required

**start\_time**date-timerequired

**end\_time**date-timerequired

**has\_been\_reviewed**Has Been Reviewed (boolean)required

**severity**SeverityEnum (string)required

**Possible values:** \[`alert`, `detection`\]

**thumb\_path**Thumb Path (string)required

**data**Datarequired

*   \]
    

```
[  {    "id": "string",    "camera": "string",    "start_time": "2024-07-29T15:51:28.071Z",    "end_time": "2024-07-29T15:51:28.071Z",    "has_been_reviewed": true,    "severity": "alert",    "thumb_path": "string"  }]
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review_ids", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

ids — queryrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-review-preview-review-event-id-preview-get.md ---
--- START OF FILE: integrations-api-review-preview-review-event-id-preview-get.md ---

Source: https://docs.frigate.video/integrations/api/review-preview-review-event-id-preview-get

# Review Preview

GET 

## https://demo.frigate.video/api/review/:event\_id/preview

Review Preview

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

### Query Parameters

**format** Format

**Possible values:** \[`gif`, `mp4`\]

**Default value:** `gif`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/:event_id/preview", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Show optional parameters

format — query

\---gifmp4

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-review-review-get.md ---
--- START OF FILE: integrations-api-review-review-get.md ---

Source: https://docs.frigate.video/integrations/api/review-review-get

# Review

GET 

## https://demo.frigate.video/api/review

Review

## Request[​](#request "Direct link to Request")

### Query Parameters

**cameras** Cameras

**Default value:** `all`

**labels** Labels

**Default value:** `all`

**zones** Zones

**Default value:** `all`

**reviewed** Reviewed

**Default value:** `0`

**limit** Limit

**severity** SeverityEnum

**Possible values:** \[`alert`, `detection`\]

**before** Before

**after** After

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

*   Array \[
    

**id**Id (string)required

**camera**Camera (string)required

**start\_time**date-timerequired

**end\_time**date-timerequired

**has\_been\_reviewed**Has Been Reviewed (boolean)required

**severity**SeverityEnum (string)required

**Possible values:** \[`alert`, `detection`\]

**thumb\_path**Thumb Path (string)required

**data**Datarequired

*   \]
    

```
[  {    "id": "string",    "camera": "string",    "start_time": "2024-07-29T15:51:28.071Z",    "end_time": "2024-07-29T15:51:28.071Z",    "has_been_reviewed": true,    "severity": "alert",    "thumb_path": "string"  }]
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

cameras — query

labels — query

zones — query

reviewed — query

limit — query

severity — query

\---alertdetection

before — query

after — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-review-summary-review-summary-get.md ---
--- START OF FILE: integrations-api-review-summary-review-summary-get.md ---

Source: https://docs.frigate.video/integrations/api/review-summary-review-summary-get

# Review Summary

GET 

## https://demo.frigate.video/api/review/summary

Review Summary

## Request[​](#request "Direct link to Request")

### Query Parameters

**cameras** Cameras

**Default value:** `all`

**labels** Labels

**Default value:** `all`

**zones** Zones

**Default value:** `all`

**timezone** Timezone

**Default value:** `utc`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

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

```
{  "last24Hours": {    "reviewed_alert": 0,    "reviewed_detection": 0,    "total_alert": 0,    "total_detection": 0  },  "root": {}}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/review/summary", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

cameras — query

labels — query

zones — query

timezone — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-schemas-appconfigsetbody.md ---
--- START OF FILE: integrations-api-schemas-appconfigsetbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/appconfigsetbody

# AppConfigSetBody

**requires\_restart**Requires Restart (integer)

**Default value:** `1`

AppConfigSetBody

```
{  "requires_restart": 1}
```

--- END OF FILE: integrations-api-schemas-apppostloginbody.md ---
--- START OF FILE: integrations-api-schemas-apppostloginbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/apppostloginbody

# AppPostLoginBody

**user**User (string)required

**password**Password (string)required

AppPostLoginBody

```
{  "user": "string",  "password": "string"}
```

--- END OF FILE: integrations-api-schemas-apppostusersbody.md ---
--- START OF FILE: integrations-api-schemas-apppostusersbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/apppostusersbody

# AppPostUsersBody

**username**Username (string)required

**password**Password (string)required

**role** object

anyOf

*   MOD1
*   MOD2

string

AppPostUsersBody

```
{  "username": "string",  "password": "string",  "role": "string"}
```

--- END OF FILE: integrations-api-schemas-appputpasswordbody.md ---
--- START OF FILE: integrations-api-schemas-appputpasswordbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/appputpasswordbody

# AppPutPasswordBody

**password**Password (string)required

AppPutPasswordBody

```
{  "password": "string"}
```

--- END OF FILE: integrations-api-schemas-appputrolebody.md ---
--- START OF FILE: integrations-api-schemas-appputrolebody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/appputrolebody

# AppPutRoleBody

**role**Role (string)required

AppPutRoleBody

```
{  "role": "string"}
```

--- END OF FILE: integrations-api-schemas-body-recognize-face-faces-recognize-post.md ---
--- START OF FILE: integrations-api-schemas-body-recognize-face-faces-recognize-post.md ---

Source: https://docs.frigate.video/integrations/api/schemas/body-recognize-face-faces-recognize-post

# Body\_recognize\_face\_faces\_recognize\_post

**file**binaryrequired

Body\_recognize\_face\_faces\_recognize\_post

```
{  "file": "string"}
```

--- END OF FILE: integrations-api-schemas-body-register-face-faces-name-register-post.md ---
--- START OF FILE: integrations-api-schemas-body-register-face-faces-name-register-post.md ---

Source: https://docs.frigate.video/integrations/api/schemas/body-register-face-faces-name-register-post

# Body\_register\_face\_faces\_\_name\_\_register\_post

**file**binaryrequired

Body\_register\_face\_faces\_\_name\_\_register\_post

```
{  "file": "string"}
```

--- END OF FILE: integrations-api-schemas-dayreview.md ---
--- START OF FILE: integrations-api-schemas-dayreview.md ---

Source: https://docs.frigate.video/integrations/api/schemas/dayreview

# DayReview

**day**date-timerequired

**reviewed\_alert**Reviewed Alert (integer)required

**reviewed\_detection**Reviewed Detection (integer)required

**total\_alert**Total Alert (integer)required

**total\_detection**Total Detection (integer)required

DayReview

```
{  "day": "2024-07-29T15:51:28.071Z",  "reviewed_alert": 0,  "reviewed_detection": 0,  "total_alert": 0,  "total_detection": 0}
```

--- END OF FILE: integrations-api-schemas-eventcreateresponse.md ---
--- START OF FILE: integrations-api-schemas-eventcreateresponse.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventcreateresponse

# EventCreateResponse

**success**Success (boolean)required

**message**Message (string)required

**event\_id**Event Id (string)required

EventCreateResponse

```
{  "success": true,  "message": "string",  "event_id": "string"}
```

--- END OF FILE: integrations-api-schemas-eventmultideleteresponse.md ---
--- START OF FILE: integrations-api-schemas-eventmultideleteresponse.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventmultideleteresponse

# EventMultiDeleteResponse

**success**Success (boolean)required

**deleted\_events**string\[\]required

**not\_found\_events**string\[\]required

EventMultiDeleteResponse

```
{  "success": true,  "deleted_events": [    "string"  ],  "not_found_events": [    "string"  ]}
```

--- END OF FILE: integrations-api-schemas-eventresponse.md ---
--- START OF FILE: integrations-api-schemas-eventresponse.md ---

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

--- END OF FILE: integrations-api-schemas-eventscreatebody.md ---
--- START OF FILE: integrations-api-schemas-eventscreatebody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventscreatebody

# EventsCreateBody

**source\_type** object

anyOf

*   MOD1
*   MOD2

string

**sub\_label** object

anyOf

*   MOD1
*   MOD2

string

**score** object

anyOf

*   MOD1
*   MOD2

number

**duration** object

anyOf

*   MOD1
*   MOD2

integer

**include\_recording** object

anyOf

*   MOD1
*   MOD2

boolean

**draw** object

anyOf

*   MOD1
*   MOD2

object

EventsCreateBody

```
{  "source_type": "string",  "sub_label": "string",  "score": 0,  "duration": 0,  "include_recording": true,  "draw": {}}
```

--- END OF FILE: integrations-api-schemas-eventsdeletebody.md ---
--- START OF FILE: integrations-api-schemas-eventsdeletebody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventsdeletebody

# EventsDeleteBody

**event\_ids**string\[\]required

EventsDeleteBody

```
{  "event_ids": [    "string"  ]}
```

--- END OF FILE: integrations-api-schemas-eventsdescriptionbody.md ---
--- START OF FILE: integrations-api-schemas-eventsdescriptionbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventsdescriptionbody

# EventsDescriptionBody

**description** objectrequired

anyOf

*   MOD1
*   MOD2

string

EventsDescriptionBody

```
{  "description": "string"}
```

--- END OF FILE: integrations-api-schemas-eventsendbody.md ---
--- START OF FILE: integrations-api-schemas-eventsendbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventsendbody

# EventsEndBody

**end\_time** object

anyOf

*   MOD1
*   MOD2

number

EventsEndBody

```
{  "end_time": 0}
```

--- END OF FILE: integrations-api-schemas-eventslprbody.md ---
--- START OF FILE: integrations-api-schemas-eventslprbody.md ---

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

--- END OF FILE: integrations-api-schemas-eventssublabelbody.md ---
--- START OF FILE: integrations-api-schemas-eventssublabelbody.md ---

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

--- END OF FILE: integrations-api-schemas-eventuploadplusresponse.md ---
--- START OF FILE: integrations-api-schemas-eventuploadplusresponse.md ---

Source: https://docs.frigate.video/integrations/api/schemas/eventuploadplusresponse

# EventUploadPlusResponse

**success**Success (boolean)required

**plus\_id**Plus Id (string)required

EventUploadPlusResponse

```
{  "success": true,  "plus_id": "string"}
```

--- END OF FILE: integrations-api-schemas-exportrecordingsbody.md ---
--- START OF FILE: integrations-api-schemas-exportrecordingsbody.md ---

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

--- END OF FILE: integrations-api-schemas-exportrenamebody.md ---
--- START OF FILE: integrations-api-schemas-exportrenamebody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/exportrenamebody

# ExportRenameBody

**name**Friendly name (string)required

**Possible values:** `<= 256 characters`

ExportRenameBody

```
{  "name": "string"}
```

--- END OF FILE: integrations-api-schemas-extension.md ---
--- START OF FILE: integrations-api-schemas-extension.md ---

Source: https://docs.frigate.video/integrations/api/schemas/extension

# Extension

**string**Extension (string)

**Possible values:** \[`webp`, `png`, `jpg`, `jpeg`\]

Extension

```
"webp"
```

--- END OF FILE: integrations-api-schemas-genericresponse.md ---
--- START OF FILE: integrations-api-schemas-genericresponse.md ---

Source: https://docs.frigate.video/integrations/api/schemas/genericresponse

# GenericResponse

**success**Success (boolean)required

**message**Message (string)required

GenericResponse

```
{  "success": true,  "message": "string"}
```

--- END OF FILE: integrations-api-schemas-httpvalidationerror.md ---
--- START OF FILE: integrations-api-schemas-httpvalidationerror.md ---

Source: https://docs.frigate.video/integrations/api/schemas/httpvalidationerror

# HTTPValidationError

**detail** object\[\]

*   Array \[
    

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

*   \]
    

HTTPValidationError

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

--- END OF FILE: integrations-api-schemas-last-24-hoursreview.md ---
--- START OF FILE: integrations-api-schemas-last-24-hoursreview.md ---

Source: https://docs.frigate.video/integrations/api/schemas/last-24-hoursreview

# Last24HoursReview

**reviewed\_alert**Reviewed Alert (integer)required

**reviewed\_detection**Reviewed Detection (integer)required

**total\_alert**Total Alert (integer)required

**total\_detection**Total Detection (integer)required

Last24HoursReview

```
{  "reviewed_alert": 0,  "reviewed_detection": 0,  "total_alert": 0,  "total_detection": 0}
```

--- END OF FILE: integrations-api-schemas-playbackfactorenum.md ---
--- START OF FILE: integrations-api-schemas-playbackfactorenum.md ---

Source: https://docs.frigate.video/integrations/api/schemas/playbackfactorenum

# PlaybackFactorEnum

**string**PlaybackFactorEnum (string)

**Possible values:** \[`realtime`, `timelapse_25x`\]

PlaybackFactorEnum

```
"realtime"
```

--- END OF FILE: integrations-api-schemas-playbacksourceenum.md ---
--- START OF FILE: integrations-api-schemas-playbacksourceenum.md ---

Source: https://docs.frigate.video/integrations/api/schemas/playbacksourceenum

# PlaybackSourceEnum

**string**PlaybackSourceEnum (string)

**Possible values:** \[`recordings`, `preview`\]

PlaybackSourceEnum

```
"recordings"
```

--- END OF FILE: integrations-api-schemas-regeneratedescriptionenum.md ---
--- START OF FILE: integrations-api-schemas-regeneratedescriptionenum.md ---

Source: https://docs.frigate.video/integrations/api/schemas/regeneratedescriptionenum

# RegenerateDescriptionEnum

**string**RegenerateDescriptionEnum (string)

**Possible values:** \[`thumbnails`, `snapshot`\]

RegenerateDescriptionEnum

```
"thumbnails"
```

--- END OF FILE: integrations-api-schemas-renamefacebody.md ---
--- START OF FILE: integrations-api-schemas-renamefacebody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/renamefacebody

# RenameFaceBody

**new\_name**New Name (string)required

RenameFaceBody

```
{  "new_name": "string"}
```

--- END OF FILE: integrations-api-schemas-reviewactivitymotionresponse.md ---
--- START OF FILE: integrations-api-schemas-reviewactivitymotionresponse.md ---

Source: https://docs.frigate.video/integrations/api/schemas/reviewactivitymotionresponse

# ReviewActivityMotionResponse

**start\_time**Start Time (integer)required

**motion**Motion (number)required

**camera**Camera (string)required

ReviewActivityMotionResponse

```
{  "start_time": 0,  "motion": 0,  "camera": "string"}
```

--- END OF FILE: integrations-api-schemas-reviewmodifymultiplebody.md ---
--- START OF FILE: integrations-api-schemas-reviewmodifymultiplebody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/reviewmodifymultiplebody

# ReviewModifyMultipleBody

**ids**string\[\]required

**Possible values:** `>= 1`

ReviewModifyMultipleBody

```
{  "ids": [    "string"  ]}
```

--- END OF FILE: integrations-api-schemas-reviewsegmentresponse.md ---
--- START OF FILE: integrations-api-schemas-reviewsegmentresponse.md ---

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

--- END OF FILE: integrations-api-schemas-reviewsummaryresponse.md ---
--- START OF FILE: integrations-api-schemas-reviewsummaryresponse.md ---

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

--- END OF FILE: integrations-api-schemas-severityenum.md ---
--- START OF FILE: integrations-api-schemas-severityenum.md ---

Source: https://docs.frigate.video/integrations/api/schemas/severityenum

# SeverityEnum

**string**SeverityEnum (string)

**Possible values:** \[`alert`, `detection`\]

SeverityEnum

```
"alert"
```

--- END OF FILE: integrations-api-schemas-submitplusbody.md ---
--- START OF FILE: integrations-api-schemas-submitplusbody.md ---

Source: https://docs.frigate.video/integrations/api/schemas/submitplusbody

# SubmitPlusBody

**include\_annotation**Include Annotation (integer)

**Default value:** `1`

SubmitPlusBody

```
{  "include_annotation": 1}
```

--- END OF FILE: integrations-api-schemas-validationerror.md ---
--- START OF FILE: integrations-api-schemas-validationerror.md ---

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

--- END OF FILE: integrations-api-send-to-plus-events-event-id-plus-post.md ---
--- START OF FILE: integrations-api-send-to-plus-events-event-id-plus-post.md ---

Source: https://docs.frigate.video/integrations/api/send-to-plus-events-event-id-plus-post

# Send To Plus

POST 

## https://demo.frigate.video/api/events/:event\_id/plus

Send To Plus

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body

**include\_annotation**Include Annotation (integer)

**Default value:** `1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**plus\_id**Plus Id (string)required

```
{  "success": true,  "plus_id": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "include_annotation": 1})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/events/:event_id/plus", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body

{
  "include\_annotation": 1
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-set-description-events-event-id-description-post.md ---
--- START OF FILE: integrations-api-set-description-events-event-id-description-post.md ---

Source: https://docs.frigate.video/integrations/api/set-description-events-event-id-description-post

# Set Description

POST 

## https://demo.frigate.video/api/events/:event\_id/description

Set Description

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body**required**

**description** objectrequired

anyOf

*   MOD1
*   MOD2

string

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "description": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/events/:event_id/description", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body required

{
  "description": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-set-multiple-reviewed-reviews-viewed-post.md ---
--- START OF FILE: integrations-api-set-multiple-reviewed-reviews-viewed-post.md ---

Source: https://docs.frigate.video/integrations/api/set-multiple-reviewed-reviews-viewed-post

# Set Multiple Reviewed

POST 

## https://demo.frigate.video/api/reviews/viewed

Set Multiple Reviewed

## Request[​](#request "Direct link to Request")

*   application/json

### Body**required**

**ids**string\[\]required

**Possible values:** `>= 1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "ids": [    "string"  ]})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/reviews/viewed", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Body required

{
  "ids": \[    "string"  \]
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-set-not-reviewed-review-review-id-viewed-delete.md ---
--- START OF FILE: integrations-api-set-not-reviewed-review-review-id-viewed-delete.md ---

Source: https://docs.frigate.video/integrations/api/set-not-reviewed-review-review-id-viewed-delete

# Set Not Reviewed

DELETE 

## https://demo.frigate.video/api/review/:review\_id/viewed

Set Not Reviewed

## Request[​](#request "Direct link to Request")

### Path Parameters

**review\_id** Review Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("DELETE", "/api/review/:review_id/viewed", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

review\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-set-plate-events-event-id-recognized-license-plate-post.md ---
--- START OF FILE: integrations-api-set-plate-events-event-id-recognized-license-plate-post.md ---

Source: https://docs.frigate.video/integrations/api/set-plate-events-event-id-recognized-license-plate-post

# Set Plate

POST 

## https://demo.frigate.video/api/events/:event\_id/recognized\_license\_plate

Set Plate

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

*   application/json

### Body**required**

**recognizedLicensePlate**Recognized License Plate (string)required

**Possible values:** `<= 100 characters`

**recognizedLicensePlateScore** object

anyOf

*   MOD1
*   MOD2

number

**Possible values:** `> 0` and `<= 1`

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "recognizedLicensePlate": "string",  "recognizedLicensePlateScore": 0})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/events/:event_id/recognized_license_plate", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Body required

{
  "recognizedLicensePlate": "string",  "recognizedLicensePlateScore": 0
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-set-retain-events-event-id-retain-post.md ---
--- START OF FILE: integrations-api-set-retain-events-event-id-retain-post.md ---

Source: https://docs.frigate.video/integrations/api/set-retain-events-event-id-retain-post

# Set Retain

POST 

## https://demo.frigate.video/api/events/:event\_id/retain

Set Retain

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema
*   Example (auto)

**Schema**

**success**Success (boolean)required

**message**Message (string)required

```
{  "success": true,  "message": "string"}
```

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("POST", "/api/events/:event_id/retain", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-set-sub-label-events-event-id-sub-label-post.md ---
--- START OF FILE: integrations-api-set-sub-label-events-event-id-sub-label-post.md ---

Source: https://docs.frigate.video/integrations/api/set-sub-label-events-event-id-sub-label-post

# Set Sub Label

POST 

## /events/:event\_id/sub\_label

Set Sub Label

## Request[​](#request "Direct link to Request")

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

Validation Error

--- END OF FILE: integrations-api-stats-history-stats-history-get.md ---
--- START OF FILE: integrations-api-stats-history-stats-history-get.md ---

Source: https://docs.frigate.video/integrations/api/stats-history-stats-history-get

# Stats History

GET 

## https://demo.frigate.video/api/stats/history

Stats History

## Request[​](#request "Direct link to Request")

### Query Parameters

**keys** Keys

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/stats/history", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

keys — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-stats-stats-get.md ---
--- START OF FILE: integrations-api-stats-stats-get.md ---

Source: https://docs.frigate.video/integrations/api/stats-stats-get

# Stats

GET 

## https://demo.frigate.video/api/stats

Stats

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/stats", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-submit-recording-snapshot-to-plus-camera-name-plus-frame-time-post.md ---
--- START OF FILE: integrations-api-submit-recording-snapshot-to-plus-camera-name-plus-frame-time-post.md ---

Source: https://docs.frigate.video/integrations/api/submit-recording-snapshot-to-plus-camera-name-plus-frame-time-post

# Submit Recording Snapshot To Plus

POST 

## https://demo.frigate.video/api/:camera\_name/plus/:frame\_time

Submit Recording Snapshot To Plus

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**frame\_time** Frame Timerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("POST", "/api/:camera_name/plus/:frame_time", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

frame\_time — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-timeline-timeline-get.md ---
--- START OF FILE: integrations-api-timeline-timeline-get.md ---

Source: https://docs.frigate.video/integrations/api/timeline-timeline-get

# Timeline

GET 

## https://demo.frigate.video/api/timeline

Timeline

## Request[​](#request "Direct link to Request")

### Query Parameters

**camera** Camera

**Default value:** `all`

**limit** Limit

**Default value:** `100`

**source\_id** any

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/timeline", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

ParametersShow optional parameters

camera — query

limit — query

source\_id — query

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-train-face-faces-train-name-classify-post.md ---
--- START OF FILE: integrations-api-train-face-faces-train-name-classify-post.md ---

Source: https://docs.frigate.video/integrations/api/train-face-faces-train-name-classify-post

# Train Face

POST 

## https://demo.frigate.video/api/faces/train/:name/classify

Train Face

## Request[​](#request "Direct link to Request")

### Path Parameters

**name** Namerequired

*   application/json

### Body

**object**object

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("POST", "/api/faces/train/:name/classify", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

name — pathrequired

Body

{}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-update-password-users-username-password-put.md ---
--- START OF FILE: integrations-api-update-password-users-username-password-put.md ---

Source: https://docs.frigate.video/integrations/api/update-password-users-username-password-put

# Update Password

PUT 

## https://demo.frigate.video/api/users/:username/password

Update Password

## Request[​](#request "Direct link to Request")

### Path Parameters

**username** Usernamerequired

*   application/json

### Body**required**

**password**Password (string)required

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "password": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PUT", "/api/users/:username/password", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

username — pathrequired

Body required

{
  "password": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-update-role-users-username-role-put.md ---
--- START OF FILE: integrations-api-update-role-users-username-role-put.md ---

Source: https://docs.frigate.video/integrations/api/update-role-users-username-role-put

# Update Role

PUT 

## https://demo.frigate.video/api/users/:username/role

Update Role

## Request[​](#request "Direct link to Request")

### Path Parameters

**username** Usernamerequired

*   application/json

### Body**required**

**role**Role (string)required

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientimport jsonconn = http.client.HTTPSConnection("demo.frigate.video")payload = json.dumps({  "role": "string"})headers = {  'Content-Type': 'application/json',  'Accept': 'application/json'}conn.request("PUT", "/api/users/:username/role", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

username — pathrequired

Body required

{
  "role": "string"
}
Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-vainfo-vainfo-get.md ---
--- START OF FILE: integrations-api-vainfo-vainfo-get.md ---

Source: https://docs.frigate.video/integrations/api/vainfo-vainfo-get

# Vainfo

GET 

## https://demo.frigate.video/api/vainfo

Vainfo

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   application/json

*   Schema

**Schema**

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/vainfo", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-version-version-get.md ---
--- START OF FILE: integrations-api-version-version-get.md ---

Source: https://docs.frigate.video/integrations/api/version-version-get

# Version

GET 

## https://demo.frigate.video/api/version

Version

## Responses[​](#responses "Direct link to Responses")

*   200

Successful Response

*   text/plain

*   Schema
*   Example (auto)

**Schema**

**string**string

```
"string"
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'text/plain'}conn.request("GET", "/api/version", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-vod-event-vod-event-event-id-get.md ---
--- START OF FILE: integrations-api-vod-event-vod-event-event-id-get.md ---

Source: https://docs.frigate.video/integrations/api/vod-event-vod-event-event-id-get

# Vod Event

GET 

## https://demo.frigate.video/api/vod/event/:event\_id

Returns an HLS playlist for the specified object. Append /master.m3u8 or /index.m3u8 for HLS playback.

## Request[​](#request "Direct link to Request")

### Path Parameters

**event\_id** Event Idrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/vod/event/:event_id", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

event\_id — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-vod-hour-no-timezone-vod-year-month-day-hour-camera-name-get.md ---
--- START OF FILE: integrations-api-vod-hour-no-timezone-vod-year-month-day-hour-camera-name-get.md ---

Source: https://docs.frigate.video/integrations/api/vod-hour-no-timezone-vod-year-month-day-hour-camera-name-get

# Vod Hour No Timezone

GET 

## https://demo.frigate.video/api/vod/:year\_month/:day/:hour/:camera\_name

Returns an HLS playlist for the specified date-time on the specified camera. Append /master.m3u8 or /index.m3u8 for HLS playback.

## Request[​](#request "Direct link to Request")

### Path Parameters

**year\_month** Year Monthrequired

**day** Dayrequired

**hour** Hourrequired

**camera\_name** Camera Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/vod/:year_month/:day/:hour/:camera_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

year\_month — pathrequired

day — pathrequired

hour — pathrequired

camera\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-vod-hour-vod-year-month-day-hour-camera-name-tz-name-get.md ---
--- START OF FILE: integrations-api-vod-hour-vod-year-month-day-hour-camera-name-tz-name-get.md ---

Source: https://docs.frigate.video/integrations/api/vod-hour-vod-year-month-day-hour-camera-name-tz-name-get

# Vod Hour

GET 

## https://demo.frigate.video/api/vod/:year\_month/:day/:hour/:camera\_name/:tz\_name

Returns an HLS playlist for the specified date-time (with timezone) on the specified camera. Append /master.m3u8 or /index.m3u8 for HLS playback.

## Request[​](#request "Direct link to Request")

### Path Parameters

**year\_month** Year Monthrequired

**day** Dayrequired

**hour** Hourrequired

**camera\_name** Camera Namerequired

**tz\_name** Tz Namerequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/vod/:year_month/:day/:hour/:camera_name/:tz_name", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

year\_month — pathrequired

day — pathrequired

hour — pathrequired

camera\_name — pathrequired

tz\_name — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-api-vod-ts-vod-camera-name-start-start-ts-end-end-ts-get.md ---
--- START OF FILE: integrations-api-vod-ts-vod-camera-name-start-start-ts-end-end-ts-get.md ---

Source: https://docs.frigate.video/integrations/api/vod-ts-vod-camera-name-start-start-ts-end-end-ts-get

# Vod Ts

GET 

## https://demo.frigate.video/api/vod/:camera\_name/start/:start\_ts/end/:end\_ts

Returns an HLS playlist for the specified timestamp-range on the specified camera. Append /master.m3u8 or /index.m3u8 for HLS playback.

## Request[​](#request "Direct link to Request")

### Path Parameters

**camera\_name** Camera Namerequired

**start\_ts** Start Tsrequired

**end\_ts** End Tsrequired

## Responses[​](#responses "Direct link to Responses")

*   200
*   422

Successful Response

*   application/json

*   Schema

**Schema**

Validation Error

*   application/json

*   Schema
*   Example (auto)

**Schema**

**detail** object\[\]

*   Array \[
    

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

*   \]
    

```
{  "detail": [    {      "loc": [        "string",        0      ],      "msg": "string",      "type": "string"    }  ]}
```

*   python
*   nodejs
*   javascript
*   curl
*   rust

*   HTTP.CLIENT
*   REQUESTS

```
import http.clientconn = http.client.HTTPSConnection("demo.frigate.video")payload = ''headers = {  'Accept': 'application/json'}conn.request("GET", "/api/vod/:camera_name/start/:start_ts/end/:end_ts", payload, headers)res = conn.getresponse()data = res.read()print(data.decode("utf-8"))
```

Request Collapse all

Base URL

Edit

https://demo.frigate.video/api

Parameters

camera\_name — pathrequired

start\_ts — pathrequired

end\_ts — pathrequired

Send API Request

ResponseClear

Click the `Send API Request` button above and see the response here!

--- END OF FILE: integrations-configuration-tls.md ---
--- START OF FILE: integrations-configuration-tls.md ---

Source: https://docs.frigate.video/integrations/configuration/tls

# Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

--- END OF FILE: integrations-home-assistant-mqtt.md ---
--- START OF FILE: integrations-home-assistant-mqtt.md ---

Source: https://docs.frigate.video/integrations/home-assistant/mqtt

# Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

--- END OF FILE: integrations-home-assistant.md ---
--- START OF FILE: integrations-home-assistant.md ---

Source: https://docs.frigate.video/integrations/home-assistant

On this page

The best way to integrate with Home Assistant is to use the [official integration](https://github.com/blakeblackshear/frigate-hass-integration).

## Installation[​](#installation "Direct link to Installation")

### Preparation[​](#preparation "Direct link to Preparation")

The Frigate integration requires the `mqtt` integration to be installed and manually configured first.

See the [MQTT integration documentation](https://www.home-assistant.io/integrations/mqtt/) for more details.

In addition, MQTT must be enabled in your Frigate configuration file and Frigate must be connected to the same MQTT server as Home Assistant for many of the entities created by the integration to function.

### Integration installation[​](#integration-installation "Direct link to Integration installation")

Available via HACS as a default repository. To install:

*   Use [HACS](https://hacs.xyz/) to install the integration:

```
Home Assistant > HACS > Click in the Search bar and type "Frigate" > Frigate
```

*   Restart Home Assistant.
*   Then add/configure the integration:

```
Home Assistant > Settings > Devices & Services > Add Integration > Frigate
```

Note: You will also need [media\_source](https://www.home-assistant.io/integrations/media_source/) enabled in your Home Assistant configuration for the Media Browser to appear.

### (Optional) Lovelace Card Installation[​](#optional-lovelace-card-installation "Direct link to (Optional) Lovelace Card Installation")

To install the optional companion Lovelace card, please see the [separate installation instructions](https://github.com/dermotduffy/frigate-hass-card) for that card.

## Configuration[​](#configuration "Direct link to Configuration")

When configuring the integration, you will be asked for the `URL` of your Frigate instance which can be pointed at the internal unauthenticated port (`5000`) or the authenticated port (`8971`) for your instance. This may look like `http://<host>:5000/`.

### Docker Compose Examples[​](#docker-compose-examples "Direct link to Docker Compose Examples")

If you are running Home Assistant and Frigate with Docker Compose on the same device, here are some examples.

#### Home Assistant running with host networking[​](#home-assistant-running-with-host-networking "Direct link to Home Assistant running with host networking")

It is not recommended to run Frigate in host networking mode. In this example, you would use `http://172.17.0.1:5000` or `http://172.17.0.1:8971` when configuring the integration.

```
services:  homeassistant:    image: ghcr.io/home-assistant/home-assistant:stable    network_mode: host    ...  frigate:    image: ghcr.io/blakeblackshear/frigate:stable    ...    ports:      - "172.17.0.1:5000:5000"      ...
```

#### Home Assistant _not_ running with host networking or in a separate compose file[​](#home-assistant-not-running-with-host-networking-or-in-a-separate-compose-file "Direct link to home-assistant-not-running-with-host-networking-or-in-a-separate-compose-file")

In this example, it is recommended to connect to the authenticated port, for example, `http://frigate:8971` when configuring the integration. There is no need to map the port for the Frigate container.

```
services:  homeassistant:    image: ghcr.io/home-assistant/home-assistant:stable    # network_mode: host    ...  frigate:    image: ghcr.io/blakeblackshear/frigate:stable    ...    ports:      # - "172.17.0.1:5000:5000"      ...
```

### Home Assistant Add-on[​](#home-assistant-add-on "Direct link to Home Assistant Add-on")

If you are using Home Assistant Add-on, the URL should be one of the following depending on which Add-on variant you are using. Note that if you are using the Proxy Add-on, you should NOT point the integration at the proxy URL. Just enter the same URL used to access Frigate directly from your network.

Add-on Variant

URL

Frigate

`http://ccab4aaf-frigate:5000`

Frigate (Full Access)

`http://ccab4aaf-frigate-fa:5000`

Frigate Beta

`http://ccab4aaf-frigate-beta:5000`

Frigate Beta (Full Access)

`http://ccab4aaf-frigate-fa-beta:5000`

### Frigate running on a separate machine[​](#frigate-running-on-a-separate-machine "Direct link to Frigate running on a separate machine")

If you run Frigate on a separate device within your local network, Home Assistant will need access to port 8971.

#### Local network[​](#local-network "Direct link to Local network")

Use `http://<frigate_device_ip>:8971` as the URL for the integration so that authentication is required.

tip

The above URL assumes you have [disabled TLS](/integrations/configuration/tls). By default, TLS is enabled and Frigate will be using a self-signed certificate. HomeAssistant will fail to connect HTTPS to port 8971 since it fails to verify the self-signed certificate. Either disable TLS and use HTTP from HomeAssistant, or configure Frigate to be acessible with a valid certificate.

```
services:  frigate:    image: ghcr.io/blakeblackshear/frigate:stable    ...    ports:      - "8971:8971"      ...
```

#### Tailscale or other private networking[​](#tailscale-or-other-private-networking "Direct link to Tailscale or other private networking")

Use `http://<frigate_device_tailscale_ip>:5000` as the URL for the integration.

```
services:  frigate:    image: ghcr.io/blakeblackshear/frigate:stable    ...    ports:      - "<tailscale_ip>:5000:5000"      ...
```

## Options[​](#options "Direct link to Options")

```
Home Assistant > Configuration > Integrations > Frigate > Options
```

Option

Description

RTSP URL Template

A [jinja2](https://jinja.palletsprojects.com/) template that is used to override the standard RTSP stream URL (e.g. for use with reverse proxies). This option is only shown to users who have [advanced mode](https://www.home-assistant.io/blog/2019/07/17/release-96/#advanced-mode) enabled. See [RTSP streams](#rtsp-stream) below.

## Entities Provided[​](#entities-provided "Direct link to Entities Provided")

Platform

Description

`camera`

Live camera stream (requires RTSP).

`image`

Image of the latest detected object for each camera.

`sensor`

States to monitor Frigate performance, object counts for all zones and cameras.

`switch`

Switch entities to toggle detection, recordings and snapshots.

`binary_sensor`

A "motion" binary sensor entity per camera/zone/object.

## Media Browser Support[​](#media-browser-support "Direct link to Media Browser Support")

The integration provides:

*   Browsing tracked object recordings with thumbnails
*   Browsing snapshots
*   Browsing recordings by month, day, camera, time

This is accessible via "Media Browser" on the left menu panel in Home Assistant.

## Casting Clips To Media Devices[​](#casting-clips-to-media-devices "Direct link to Casting Clips To Media Devices")

The integration supports casting clips and camera streams to supported media devices.

tip

For clips to be castable to media devices, audio is required and may need to be [enabled for recordings](/troubleshooting/faqs#audio-in-recordings).

**NOTE: Even if you camera does not support audio, audio will need to be enabled for Casting to be accepted.**

## Camera API[​](#camera-api "Direct link to Camera API")

To disable a camera dynamically

```
action: camera.turn_offdata: {}target:  entity_id: camera.back_deck_cam  # your Frigate camera entity ID
```

To enable a camera that has been disabled dynamically

```
action: camera.turn_ondata: {}target:  entity_id: camera.back_deck_cam  # your Frigate camera entity ID
```

## Notification API[​](#notification-api "Direct link to Notification API")

Many people do not want to expose Frigate to the web, so the integration creates some public API endpoints that can be used for notifications.

To load a thumbnail for a tracked object:

```
https://HA_URL/api/frigate/notifications/<event-id>/thumbnail.jpg
```

To load a snapshot for a tracked object:

```
https://HA_URL/api/frigate/notifications/<event-id>/snapshot.jpg
```

To load a video clip of a tracked object using an Android device:

```
https://HA_URL/api/frigate/notifications/<event-id>/clip.mp4
```

To load a video clip of a tracked object using an iOS device:

```
https://HA_URL/api/frigate/notifications/<event-id>/master.m3u8
```

To load a preview gif of a tracked object:

```
https://HA_URL/api/frigate/notifications/<event-id>/event_preview.gif
```

To load a preview gif of a review item:

```
https://HA_URL/api/frigate/notifications/<review-id>/review_preview.gif
```

## RTSP stream[​](#rtsp-stream "Direct link to RTSP stream")

In order for the live streams to function they need to be accessible on the RTSP port (default: `8554`) at `<frigatehost>:8554`. Home Assistant will directly connect to that streaming port when the live camera is viewed.

#### RTSP URL Template[​](#rtsp-url-template "Direct link to RTSP URL Template")

For advanced usecases, this behavior can be changed with the [RTSP URL template](#options) option. When set, this string will override the default stream address that is derived from the default behavior described above. This option supports [jinja2 templates](https://jinja.palletsprojects.com/) and has the `camera` dict variables from [Frigate API](/integrations/integrations/api) available for the template. Note that no Home Assistant state is available to the template, only the camera dict from Frigate.

This is potentially useful when Frigate is behind a reverse proxy, and/or when the default stream port is otherwise not accessible to Home Assistant (e.g. firewall rules).

###### RTSP URL Template Examples[​](#rtsp-url-template-examples "Direct link to RTSP URL Template Examples")

Use a different port number:

```
rtsp://<frigate_host>:2000/front_door
```

Use the camera name in the stream URL:

```
rtsp://<frigate_host>:2000/{{ name }}
```

Use the camera name in the stream URL, converting it to lowercase first:

```
rtsp://<frigate_host>:2000/{{ name|lower }}
```

## Multiple Instance Support[​](#multiple-instance-support "Direct link to Multiple Instance Support")

The Frigate integration seamlessly supports the use of multiple Frigate servers.

### Requirements for Multiple Instances[​](#requirements-for-multiple-instances "Direct link to Requirements for Multiple Instances")

In order for multiple Frigate instances to function correctly, the `topic_prefix` and `client_id` parameters must be set differently per server. See [MQTT configuration](/integrations/home-assistant/mqtt) for how to set these.

#### API URLs[​](#api-urls "Direct link to API URLs")

When multiple Frigate instances are configured, [API](#notification-api) URLs should include an identifier to tell Home Assistant which Frigate instance to refer to. The identifier used is the MQTT `client_id` parameter included in the configuration, and is used like so:

```
https://HA_URL/api/frigate/<client-id>/notifications/<event-id>/thumbnail.jpg
```

```
https://HA_URL/api/frigate/<client-id>/clips/front_door-1624599978.427826-976jaa.mp4
```

#### Default Treatment[​](#default-treatment "Direct link to Default Treatment")

When a single Frigate instance is configured, the `client-id` parameter need not be specified in URLs/identifiers -- that single instance is assumed. When multiple Frigate instances are configured, the user **must** explicitly specify which server they are referring to.

## FAQ[​](#faq "Direct link to FAQ")

#### If I am detecting multiple objects, how do I assign the correct `binary_sensor` to the camera in HomeKit?[​](#if-i-am-detecting-multiple-objects-how-do-i-assign-the-correct-binary_sensor-to-the-camera-in-homekit "Direct link to if-i-am-detecting-multiple-objects-how-do-i-assign-the-correct-binary_sensor-to-the-camera-in-homekit")

The [HomeKit integration](https://www.home-assistant.io/integrations/homekit/) randomly links one of the binary sensors (motion sensor entities) grouped with the camera device in Home Assistant. You can specify a `linked_motion_sensor` in the Home Assistant [HomeKit configuration](https://www.home-assistant.io/integrations/homekit/#linked_motion_sensor) for each camera.

#### I have set up automations based on the occupancy sensors. Sometimes the automation runs because the sensors are turned on, but then I look at Frigate I can't find the object that triggered the sensor. Is this a bug?[​](#i-have-set-up-automations-based-on-the-occupancy-sensors-sometimes-the-automation-runs-because-the-sensors-are-turned-on-but-then-i-look-at-frigate-i-cant-find-the-object-that-triggered-the-sensor-is-this-a-bug "Direct link to I have set up automations based on the occupancy sensors. Sometimes the automation runs because the sensors are turned on, but then I look at Frigate I can't find the object that triggered the sensor. Is this a bug?")

No. The occupancy sensors have fewer checks in place because they are often used for things like turning the lights on where latency needs to be as low as possible. So false positives can sometimes trigger these sensors. If you want false positive filtering, you should use an mqtt sensor on the `frigate/events` or `frigate/reviews` topic.

*   [Installation](#installation)
    *   [Preparation](#preparation)
    *   [Integration installation](#integration-installation)
    *   [(Optional) Lovelace Card Installation](#optional-lovelace-card-installation)
*   [Configuration](#configuration)
    *   [Docker Compose Examples](#docker-compose-examples)
    *   [Home Assistant Add-on](#home-assistant-add-on)
    *   [Frigate running on a separate machine](#frigate-running-on-a-separate-machine)
*   [Options](#options)
*   [Entities Provided](#entities-provided)
*   [Media Browser Support](#media-browser-support)
*   [Casting Clips To Media Devices](#casting-clips-to-media-devices)
*   [Camera API](#camera-api)
*   [Notification API](#notification-api)
*   [RTSP stream](#rtsp-stream)
*   [Multiple Instance Support](#multiple-instance-support)
    *   [Requirements for Multiple Instances](#requirements-for-multiple-instances)
*   [FAQ](#faq)

--- END OF FILE: integrations-integrations-api.md ---
--- START OF FILE: integrations-integrations-api.md ---

Source: https://docs.frigate.video/integrations/integrations/api

# Page Not Found

We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

--- END OF FILE: integrations-mqtt.md ---
--- START OF FILE: integrations-mqtt.md ---

Source: https://docs.frigate.video/integrations/mqtt

On this page

These are the MQTT messages generated by Frigate. The default topic\_prefix is `frigate`, but can be changed in the config file.

## General Frigate Topics[​](#general-frigate-topics "Direct link to General Frigate Topics")

### `frigate/available`[​](#frigateavailable "Direct link to frigateavailable")

Designed to be used as an availability topic with Home Assistant. Possible message are: "online": published when Frigate is running (on startup) "offline": published after Frigate has stopped

### `frigate/restart`[​](#frigaterestart "Direct link to frigaterestart")

Causes Frigate to exit. Docker should be configured to automatically restart the container on exit.

### `frigate/events`[​](#frigateevents "Direct link to frigateevents")

Message published for each changed tracked object. The first message is published when the tracked object is no longer marked as a false\_positive. When Frigate finds a better snapshot of the tracked object or when a zone change occurs, it will publish a message with the same id. When the tracked object ends, a final message is published with `end_time` set.

```
{  "type": "update", // new, update, end  "before": {    "id": "1607123955.475377-mxklsc",    "camera": "front_door",    "frame_time": 1607123961.837752,    "snapshot": {      "frame_time": 1607123965.975463,      "box": [415, 489, 528, 700],      "area": 12728,      "region": [260, 446, 660, 846],      "score": 0.77546,      "attributes": []    },    "label": "person",    "sub_label": null,    "top_score": 0.958984375,    "false_positive": false,    "start_time": 1607123955.475377,    "end_time": null,    "score": 0.7890625,    "box": [424, 500, 536, 712],    "area": 23744,    "ratio": 2.113207,    "region": [264, 450, 667, 853],    "current_zones": ["driveway"],    "entered_zones": ["yard", "driveway"],    "thumbnail": null,    "has_snapshot": false,    "has_clip": false,    "active": true, // convenience attribute, this is strictly opposite of "stationary"    "stationary": false, // whether or not the object is considered stationary    "motionless_count": 0, // number of frames the object has been motionless    "position_changes": 2, // number of times the object has moved from a stationary position    "attributes": {      "face": 0.64    }, // attributes with top score that have been identified on the object at any point    "current_attributes": [], // detailed data about the current attributes in this frame    "current_estimated_speed": 0.71, // current estimated speed (mph or kph) for objects moving through zones with speed estimation enabled    "average_estimated_speed": 14.3, // average estimated speed (mph or kph) for objects moving through zones with speed estimation enabled    "velocity_angle": 180, // direction of travel relative to the frame for objects moving through zones with speed estimation enabled    "recognized_license_plate": "ABC12345", // a recognized license plate for car objects    "recognized_license_plate_score": 0.933451  },  "after": {    "id": "1607123955.475377-mxklsc",    "camera": "front_door",    "frame_time": 1607123962.082975,    "snapshot": {      "frame_time": 1607123965.975463,      "box": [415, 489, 528, 700],      "area": 12728,      "region": [260, 446, 660, 846],      "score": 0.77546,      "attributes": []    },    "label": "person",    "sub_label": ["John Smith", 0.79],    "top_score": 0.958984375,    "false_positive": false,    "start_time": 1607123955.475377,    "end_time": null,    "score": 0.87890625,    "box": [432, 496, 544, 854],    "area": 40096,    "ratio": 1.251397,    "region": [218, 440, 693, 915],    "current_zones": ["yard", "driveway"],    "entered_zones": ["yard", "driveway"],    "thumbnail": null,    "has_snapshot": false,    "has_clip": false,    "active": true, // convenience attribute, this is strictly opposite of "stationary"    "stationary": false, // whether or not the object is considered stationary    "motionless_count": 0, // number of frames the object has been motionless    "position_changes": 2, // number of times the object has changed position    "attributes": {      "face": 0.86    }, // attributes with top score that have been identified on the object at any point    "current_attributes": [      // detailed data about the current attributes in this frame      {        "label": "face",        "box": [442, 506, 534, 524],        "score": 0.86      }    ],    "current_estimated_speed": 0.77, // current estimated speed (mph or kph) for objects moving through zones with speed estimation enabled    "average_estimated_speed": 14.31, // average estimated speed (mph or kph) for objects moving through zones with speed estimation enabled    "velocity_angle": 180, // direction of travel relative to the frame for objects moving through zones with speed estimation enabled    "recognized_license_plate": "ABC12345", // a recognized license plate for car objects    "recognized_license_plate_score": 0.933451  }}
```

### `frigate/tracked_object_update`[​](#frigatetracked_object_update "Direct link to frigatetracked_object_update")

Message published for updates to tracked object metadata, for example:

#### Generative AI Description Update[​](#generative-ai-description-update "Direct link to Generative AI Description Update")

```
{  "type": "description",  "id": "1607123955.475377-mxklsc",  "description": "The car is a red sedan moving away from the camera."}
```

#### Face Recognition Update[​](#face-recognition-update "Direct link to Face Recognition Update")

```
{  "type": "face",  "id": "1607123955.475377-mxklsc",  "name": "John",  "score": 0.95,  "camera": "front_door_cam",  "timestamp": 1607123958.748393}
```

#### License Plate Recognition Update[​](#license-plate-recognition-update "Direct link to License Plate Recognition Update")

```
{  "type": "lpr",  "id": "1607123955.475377-mxklsc",  "name": "John's Car",  "plate": "123ABC",  "score": 0.95,  "camera": "driveway_cam",  "timestamp": 1607123958.748393}
```

### `frigate/reviews`[​](#frigatereviews "Direct link to frigatereviews")

Message published for each changed review item. The first message is published when the `detection` or `alert` is initiated.

An `update` with the same ID will be published when:

*   The severity changes from `detection` to `alert`
*   Additional objects are detected
*   An object is recognized via face, lpr, etc.

When the review activity has ended a final `end` message is published.

```
{  "type": "update", // new, update, end  "before": {    "id": "1718987129.308396-fqk5ka", // review_id    "camera": "front_cam",    "start_time": 1718987129.308396,    "end_time": null,    "severity": "detection",    "thumb_path": "/media/frigate/clips/review/thumb-front_cam-1718987129.308396-fqk5ka.webp",    "data": {      "detections": [        // list of event IDs        "1718987128.947436-g92ztx",        "1718987148.879516-d7oq7r",        "1718987126.934663-q5ywpt"      ],      "objects": ["person", "car"],      "sub_labels": [],      "zones": [],      "audio": []    }  },  "after": {    "id": "1718987129.308396-fqk5ka",    "camera": "front_cam",    "start_time": 1718987129.308396,    "end_time": null,    "severity": "alert",    "thumb_path": "/media/frigate/clips/review/thumb-front_cam-1718987129.308396-fqk5ka.webp",    "data": {      "detections": [        "1718987128.947436-g92ztx",        "1718987148.879516-d7oq7r",        "1718987126.934663-q5ywpt"      ],      "objects": ["person", "car"],      "sub_labels": ["Bob"],      "zones": ["front_yard"],      "audio": []    }  }}
```

### `frigate/stats`[​](#frigatestats "Direct link to frigatestats")

Same data available at `/api/stats` published at a configurable interval.

### `frigate/camera_activity`[​](#frigatecamera_activity "Direct link to frigatecamera_activity")

Returns data about each camera, its current features, and if it is detecting motion, objects, etc. Can be triggered by publising to `frigate/onConnect`

### `frigate/notifications/set`[​](#frigatenotificationsset "Direct link to frigatenotificationsset")

Topic to turn notifications on and off. Expected values are `ON` and `OFF`.

### `frigate/notifications/state`[​](#frigatenotificationsstate "Direct link to frigatenotificationsstate")

Topic with current state of notifications. Published values are `ON` and `OFF`.

## Frigate Camera Topics[​](#frigate-camera-topics "Direct link to Frigate Camera Topics")

### `frigate/<camera_name>/<object_name>`[​](#frigatecamera_nameobject_name "Direct link to frigatecamera_nameobject_name")

Publishes the count of objects for the camera for use as a sensor in Home Assistant. `all` can be used as the object\_name for the count of all objects for the camera.

### `frigate/<camera_name>/<object_name>/active`[​](#frigatecamera_nameobject_nameactive "Direct link to frigatecamera_nameobject_nameactive")

Publishes the count of active objects for the camera for use as a sensor in Home Assistant. `all` can be used as the object\_name for the count of all active objects for the camera.

### `frigate/<zone_name>/<object_name>`[​](#frigatezone_nameobject_name "Direct link to frigatezone_nameobject_name")

Publishes the count of objects for the zone for use as a sensor in Home Assistant. `all` can be used as the object\_name for the count of all objects for the zone.

### `frigate/<zone_name>/<object_name>/active`[​](#frigatezone_nameobject_nameactive "Direct link to frigatezone_nameobject_nameactive")

Publishes the count of active objects for the zone for use as a sensor in Home Assistant. `all` can be used as the object\_name for the count of all objects for the zone.

### `frigate/<camera_name>/<object_name>/snapshot`[​](#frigatecamera_nameobject_namesnapshot "Direct link to frigatecamera_nameobject_namesnapshot")

Publishes a jpeg encoded frame of the detected object type. When the object is no longer detected, the highest confidence image is published or the original image is published again.

The height and crop of snapshots can be configured in the config.

### `frigate/<camera_name>/audio/<audio_type>`[​](#frigatecamera_nameaudioaudio_type "Direct link to frigatecamera_nameaudioaudio_type")

Publishes "ON" when a type of audio is detected and "OFF" when it is not for the camera for use as a sensor in Home Assistant.

### `frigate/<camera_name>/audio/dBFS`[​](#frigatecamera_nameaudiodbfs "Direct link to frigatecamera_nameaudiodbfs")

Publishes the dBFS value for audio detected on this camera.

**NOTE:** Requires audio detection to be enabled

### `frigate/<camera_name>/audio/rms`[​](#frigatecamera_nameaudiorms "Direct link to frigatecamera_nameaudiorms")

Publishes the rms value for audio detected on this camera.

**NOTE:** Requires audio detection to be enabled

### `frigate/<camera_name>/enabled/set`[​](#frigatecamera_nameenabledset "Direct link to frigatecamera_nameenabledset")

Topic to turn Frigate's processing of a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/enabled/state`[​](#frigatecamera_nameenabledstate "Direct link to frigatecamera_nameenabledstate")

Topic with current state of processing for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/detect/set`[​](#frigatecamera_namedetectset "Direct link to frigatecamera_namedetectset")

Topic to turn object detection for a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/detect/state`[​](#frigatecamera_namedetectstate "Direct link to frigatecamera_namedetectstate")

Topic with current state of object detection for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/audio/set`[​](#frigatecamera_nameaudioset "Direct link to frigatecamera_nameaudioset")

Topic to turn audio detection for a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/audio/state`[​](#frigatecamera_nameaudiostate "Direct link to frigatecamera_nameaudiostate")

Topic with current state of audio detection for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/recordings/set`[​](#frigatecamera_namerecordingsset "Direct link to frigatecamera_namerecordingsset")

Topic to turn recordings for a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/recordings/state`[​](#frigatecamera_namerecordingsstate "Direct link to frigatecamera_namerecordingsstate")

Topic with current state of recordings for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/snapshots/set`[​](#frigatecamera_namesnapshotsset "Direct link to frigatecamera_namesnapshotsset")

Topic to turn snapshots for a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/snapshots/state`[​](#frigatecamera_namesnapshotsstate "Direct link to frigatecamera_namesnapshotsstate")

Topic with current state of snapshots for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/motion/set`[​](#frigatecamera_namemotionset "Direct link to frigatecamera_namemotionset")

Topic to turn motion detection for a camera on and off. Expected values are `ON` and `OFF`. NOTE: Turning off motion detection will fail if detection is not disabled.

### `frigate/<camera_name>/motion`[​](#frigatecamera_namemotion "Direct link to frigatecamera_namemotion")

Whether camera\_name is currently detecting motion. Expected values are `ON` and `OFF`. NOTE: After motion is initially detected, `ON` will be set until no motion has been detected for `mqtt_off_delay` seconds (30 by default).

### `frigate/<camera_name>/motion/state`[​](#frigatecamera_namemotionstate "Direct link to frigatecamera_namemotionstate")

Topic with current state of motion detection for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/improve_contrast/set`[​](#frigatecamera_nameimprove_contrastset "Direct link to frigatecamera_nameimprove_contrastset")

Topic to turn improve\_contrast for a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/improve_contrast/state`[​](#frigatecamera_nameimprove_contraststate "Direct link to frigatecamera_nameimprove_contraststate")

Topic with current state of improve\_contrast for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/motion_threshold/set`[​](#frigatecamera_namemotion_thresholdset "Direct link to frigatecamera_namemotion_thresholdset")

Topic to adjust motion threshold for a camera. Expected value is an integer.

### `frigate/<camera_name>/motion_threshold/state`[​](#frigatecamera_namemotion_thresholdstate "Direct link to frigatecamera_namemotion_thresholdstate")

Topic with current motion threshold for a camera. Published value is an integer.

### `frigate/<camera_name>/motion_contour_area/set`[​](#frigatecamera_namemotion_contour_areaset "Direct link to frigatecamera_namemotion_contour_areaset")

Topic to adjust motion contour area for a camera. Expected value is an integer.

### `frigate/<camera_name>/motion_contour_area/state`[​](#frigatecamera_namemotion_contour_areastate "Direct link to frigatecamera_namemotion_contour_areastate")

Topic with current motion contour area for a camera. Published value is an integer.

### `frigate/<camera_name>/review_status`[​](#frigatecamera_namereview_status "Direct link to frigatecamera_namereview_status")

Topic with current activity status of the camera. Possible values are `NONE`, `DETECTION`, or `ALERT`.

### `frigate/<camera_name>/ptz`[​](#frigatecamera_nameptz "Direct link to frigatecamera_nameptz")

Topic to send PTZ commands to camera.

Command

Description

`preset_<preset_name>`

send command to move to preset with name `<preset_name>`

`MOVE_<dir>`

send command to continuously move in `<dir>`, possible values are \[UP, DOWN, LEFT, RIGHT\]

`ZOOM_<dir>`

send command to continuously zoom `<dir>`, possible values are \[IN, OUT\]

`STOP`

send command to stop moving

### `frigate/<camera_name>/ptz_autotracker/set`[​](#frigatecamera_nameptz_autotrackerset "Direct link to frigatecamera_nameptz_autotrackerset")

Topic to turn the PTZ autotracker for a camera on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/ptz_autotracker/state`[​](#frigatecamera_nameptz_autotrackerstate "Direct link to frigatecamera_nameptz_autotrackerstate")

Topic with current state of the PTZ autotracker for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/ptz_autotracker/active`[​](#frigatecamera_nameptz_autotrackeractive "Direct link to frigatecamera_nameptz_autotrackeractive")

Topic to determine if PTZ autotracker is actively tracking an object. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/review_alerts/set`[​](#frigatecamera_namereview_alertsset "Direct link to frigatecamera_namereview_alertsset")

Topic to turn review alerts for a camera on or off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/review_alerts/state`[​](#frigatecamera_namereview_alertsstate "Direct link to frigatecamera_namereview_alertsstate")

Topic with current state of review alerts for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/review_detections/set`[​](#frigatecamera_namereview_detectionsset "Direct link to frigatecamera_namereview_detectionsset")

Topic to turn review detections for a camera on or off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/review_detections/state`[​](#frigatecamera_namereview_detectionsstate "Direct link to frigatecamera_namereview_detectionsstate")

Topic with current state of review detections for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/birdseye/set`[​](#frigatecamera_namebirdseyeset "Direct link to frigatecamera_namebirdseyeset")

Topic to turn Birdseye for a camera on and off. Expected values are `ON` and `OFF`. Birdseye mode must be enabled in the configuration.

### `frigate/<camera_name>/birdseye/state`[​](#frigatecamera_namebirdseyestate "Direct link to frigatecamera_namebirdseyestate")

Topic with current state of Birdseye for a camera. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/birdseye_mode/set`[​](#frigatecamera_namebirdseye_modeset "Direct link to frigatecamera_namebirdseye_modeset")

Topic to set Birdseye mode for a camera. Birdseye offers different modes to customize under which circumstances the camera is shown.

_Note: Changing the value from `CONTINUOUS` -> `MOTION | OBJECTS` will take up to 30 seconds for the camera to be removed from the view._

Command

Description

`CONTINUOUS`

Always included

`MOTION`

Show when detected motion within the last 30 seconds are included

`OBJECTS`

Shown if an active object tracked within the last 30 seconds

### `frigate/<camera_name>/birdseye_mode/state`[​](#frigatecamera_namebirdseye_modestate "Direct link to frigatecamera_namebirdseye_modestate")

Topic with current state of the Birdseye mode for a camera. Published values are `CONTINUOUS`, `MOTION`, `OBJECTS`.

### `frigate/<camera_name>/notifications/set`[​](#frigatecamera_namenotificationsset "Direct link to frigatecamera_namenotificationsset")

Topic to turn notifications on and off. Expected values are `ON` and `OFF`.

### `frigate/<camera_name>/notifications/state`[​](#frigatecamera_namenotificationsstate "Direct link to frigatecamera_namenotificationsstate")

Topic with current state of notifications. Published values are `ON` and `OFF`.

### `frigate/<camera_name>/notifications/suspend`[​](#frigatecamera_namenotificationssuspend "Direct link to frigatecamera_namenotificationssuspend")

Topic to suspend notifications for a certain number of minutes. Expected value is an integer.

### `frigate/<camera_name>/notifications/suspended`[​](#frigatecamera_namenotificationssuspended "Direct link to frigatecamera_namenotificationssuspended")

Topic with timestamp that notifications are suspended until. Published value is a UNIX timestamp, or 0 if notifications are not suspended.

*   [General Frigate Topics](#general-frigate-topics)
    *   [`frigate/available`](#frigateavailable)
    *   [`frigate/restart`](#frigaterestart)
    *   [`frigate/events`](#frigateevents)
    *   [`frigate/tracked_object_update`](#frigatetracked_object_update)
    *   [`frigate/reviews`](#frigatereviews)
    *   [`frigate/stats`](#frigatestats)
    *   [`frigate/camera_activity`](#frigatecamera_activity)
    *   [`frigate/notifications/set`](#frigatenotificationsset)
    *   [`frigate/notifications/state`](#frigatenotificationsstate)
*   [Frigate Camera Topics](#frigate-camera-topics)
    *   [`frigate/<camera_name>/<object_name>`](#frigatecamera_nameobject_name)
    *   [`frigate/<camera_name>/<object_name>/active`](#frigatecamera_nameobject_nameactive)
    *   [`frigate/<zone_name>/<object_name>`](#frigatezone_nameobject_name)
    *   [`frigate/<zone_name>/<object_name>/active`](#frigatezone_nameobject_nameactive)
    *   [`frigate/<camera_name>/<object_name>/snapshot`](#frigatecamera_nameobject_namesnapshot)
    *   [`frigate/<camera_name>/audio/<audio_type>`](#frigatecamera_nameaudioaudio_type)
    *   [`frigate/<camera_name>/audio/dBFS`](#frigatecamera_nameaudiodbfs)
    *   [`frigate/<camera_name>/audio/rms`](#frigatecamera_nameaudiorms)
    *   [`frigate/<camera_name>/enabled/set`](#frigatecamera_nameenabledset)
    *   [`frigate/<camera_name>/enabled/state`](#frigatecamera_nameenabledstate)
    *   [`frigate/<camera_name>/detect/set`](#frigatecamera_namedetectset)
    *   [`frigate/<camera_name>/detect/state`](#frigatecamera_namedetectstate)
    *   [`frigate/<camera_name>/audio/set`](#frigatecamera_nameaudioset)
    *   [`frigate/<camera_name>/audio/state`](#frigatecamera_nameaudiostate)
    *   [`frigate/<camera_name>/recordings/set`](#frigatecamera_namerecordingsset)
    *   [`frigate/<camera_name>/recordings/state`](#frigatecamera_namerecordingsstate)
    *   [`frigate/<camera_name>/snapshots/set`](#frigatecamera_namesnapshotsset)
    *   [`frigate/<camera_name>/snapshots/state`](#frigatecamera_namesnapshotsstate)
    *   [`frigate/<camera_name>/motion/set`](#frigatecamera_namemotionset)
    *   [`frigate/<camera_name>/motion`](#frigatecamera_namemotion)
    *   [`frigate/<camera_name>/motion/state`](#frigatecamera_namemotionstate)
    *   [`frigate/<camera_name>/improve_contrast/set`](#frigatecamera_nameimprove_contrastset)
    *   [`frigate/<camera_name>/improve_contrast/state`](#frigatecamera_nameimprove_contraststate)
    *   [`frigate/<camera_name>/motion_threshold/set`](#frigatecamera_namemotion_thresholdset)
    *   [`frigate/<camera_name>/motion_threshold/state`](#frigatecamera_namemotion_thresholdstate)
    *   [`frigate/<camera_name>/motion_contour_area/set`](#frigatecamera_namemotion_contour_areaset)
    *   [`frigate/<camera_name>/motion_contour_area/state`](#frigatecamera_namemotion_contour_areastate)
    *   [`frigate/<camera_name>/review_status`](#frigatecamera_namereview_status)
    *   [`frigate/<camera_name>/ptz`](#frigatecamera_nameptz)
    *   [`frigate/<camera_name>/ptz_autotracker/set`](#frigatecamera_nameptz_autotrackerset)
    *   [`frigate/<camera_name>/ptz_autotracker/state`](#frigatecamera_nameptz_autotrackerstate)
    *   [`frigate/<camera_name>/ptz_autotracker/active`](#frigatecamera_nameptz_autotrackeractive)
    *   [`frigate/<camera_name>/review_alerts/set`](#frigatecamera_namereview_alertsset)
    *   [`frigate/<camera_name>/review_alerts/state`](#frigatecamera_namereview_alertsstate)
    *   [`frigate/<camera_name>/review_detections/set`](#frigatecamera_namereview_detectionsset)
    *   [`frigate/<camera_name>/review_detections/state`](#frigatecamera_namereview_detectionsstate)
    *   [`frigate/<camera_name>/birdseye/set`](#frigatecamera_namebirdseyeset)
    *   [`frigate/<camera_name>/birdseye/state`](#frigatecamera_namebirdseyestate)
    *   [`frigate/<camera_name>/birdseye_mode/set`](#frigatecamera_namebirdseye_modeset)
    *   [`frigate/<camera_name>/birdseye_mode/state`](#frigatecamera_namebirdseye_modestate)
    *   [`frigate/<camera_name>/notifications/set`](#frigatecamera_namenotificationsset)
    *   [`frigate/<camera_name>/notifications/state`](#frigatecamera_namenotificationsstate)
    *   [`frigate/<camera_name>/notifications/suspend`](#frigatecamera_namenotificationssuspend)
    *   [`frigate/<camera_name>/notifications/suspended`](#frigatecamera_namenotificationssuspended)

--- END OF FILE: integrations-plus.md ---
--- START OF FILE: integrations-plus.md ---

Source: https://docs.frigate.video/integrations/plus

On this page

For more information about how to use Frigate+ to improve your model, see the [Frigate+ docs](/plus/).

## Setup[​](#setup "Direct link to Setup")

### Create an account[​](#create-an-account "Direct link to Create an account")

Free accounts can be created at [https://plus.frigate.video](https://plus.frigate.video).

### Generate an API key[​](#generate-an-api-key "Direct link to Generate an API key")

Once logged in, you can generate an API key for Frigate in Settings.

![API key](/assets/images/plus-api-key-min-a57e4abcc26b8a9f44769b987a2da10c.png)

### Set your API key[​](#set-your-api-key "Direct link to Set your API key")

In Frigate, you can use an environment variable or a docker secret named `PLUS_API_KEY` to enable the `Frigate+` buttons on the Explore page. Home Assistant Addon users can set it under Settings > Add-ons > Frigate > Configuration > Options (be sure to toggle the "Show unused optional configuration options" switch).

warning

You cannot use the `environment_vars` section of your Frigate configuration file to set this environment variable. It must be defined as an environment variable in the docker config or Home Assistant Add-on config.

## Submit examples[​](#submit-examples "Direct link to Submit examples")

Once your API key is configured, you can submit examples directly from the Explore page in Frigate. From the More Filters menu, select "Has a Snapshot - Yes" and "Submitted to Frigate+ - No", and press Apply at the bottom of the pane. Then, click on a thumbnail and select the Snapshot tab.

You can use your keyboard's left and right arrow keys to quickly navigate between the tracked object snapshots.

note

Snapshots must be enabled to be able to submit examples to Frigate+

![Submit To Plus](/assets/images/submit-to-plus-7e2a527ba014588e80d6900fd3a5f7bc.jpg)

### Annotate and verify[​](#annotate-and-verify "Direct link to Annotate and verify")

You can view all of your submitted images at [https://plus.frigate.video](https://plus.frigate.video). Annotations can be added by clicking an image. For more detailed information about labeling, see the documentation on [annotating](/plus/annotating).

![Annotate](/assets/images/annotate-ffa3592f245d44b107fc166595e0e434.png)

## Use Models[​](#use-models "Direct link to Use Models")

Once you have [requested your first model](/plus/first_model) and gotten your own model ID, it can be used with a special model path. No other information needs to be configured for Frigate+ models because it fetches the remaining config from Frigate+ automatically.

You can either choose the new model from the Frigate+ pane in the Settings page of the Frigate UI, or manually set the model at the root level in your config:

```
model:  path: plus://<your_model_id>
```

note

Model IDs are not secret values and can be shared freely. Access to your model is protected by your API key.

Models are downloaded into the `/config/model_cache` folder and only downloaded if needed.

If needed, you can override the labelmap for Frigate+ models. This is not recommended as renaming labels will break the Submit to Frigate+ feature if the labels are not available in Frigate+.

```
model:  path: plus://<your_model_id>  labelmap:    3: animal    4: animal    5: animal
```

*   [Setup](#setup)
    *   [Create an account](#create-an-account)
    *   [Generate an API key](#generate-an-api-key)
    *   [Set your API key](#set-your-api-key)
*   [Submit examples](#submit-examples)
    *   [Annotate and verify](#annotate-and-verify)
*   [Use Models](#use-models)

--- END OF FILE: integrations-third_party_extensions.md ---
--- START OF FILE: integrations-third_party_extensions.md ---

Source: https://docs.frigate.video/integrations/third_party_extensions

On this page

Being open source, others have the possibility to modify and extend the rich functionality Frigate already offers. This page is meant to be an overview over additions one can make to the home NVR setup. The list is not exhaustive and can be extended via PR to the Frigate docs. Most of these services are designed to interface with Frigate's unauthenticated api over port 5000.

warning

This page does not recommend or rate the presented projects. Please use your own knowledge to assess and vet them before you install anything on your system.

## [Advanced Camera Card (formerly known as Frigate Card](https://card.camera/#/README)[​](#advanced-camera-card-formerly-known-as-frigate-card "Direct link to advanced-camera-card-formerly-known-as-frigate-card")

The [Advanced Camera Card](https://card.camera/#/README) is a Home Assistant dashboard card with deep Frigate integration.

## [Double Take](https://github.com/skrashevich/double-take)[​](#double-take "Direct link to double-take")

[Double Take](https://github.com/skrashevich/double-take) provides an unified UI and API for processing and training images for facial recognition. It supports automatically setting the sub labels in Frigate for person objects that are detected and recognized. This is a fork (with fixed errors and new features) of [original Double Take](https://github.com/jakowenko/double-take) project which, unfortunately, isn't being maintained by author.

## [Frigate Notify](https://github.com/0x2142/frigate-notify)[​](#frigate-notify "Direct link to frigate-notify")

[Frigate Notify](https://github.com/0x2142/frigate-notify) is a simple app designed to send notifications from Frigate to your favorite platforms. Intended to be used with standalone Frigate installations - Home Assistant not required, MQTT is optional but recommended.

## [Frigate Snap-Sync](https://github.com/thequantumphysicist/frigate-snap-sync/)[​](#frigate-snap-sync "Direct link to frigate-snap-sync")

[Frigate Snap-Sync](https://github.com/thequantumphysicist/frigate-snap-sync/) is a program that works in tandem with Frigate. It responds to Frigate when a snapshot or a review is made (and more can be added), and uploads them to one or more remote server(s) of your choice.

## [Frigate telegram](https://github.com/OldTyT/frigate-telegram)[​](#frigate-telegram "Direct link to frigate-telegram")

[Frigate telegram](https://github.com/OldTyT/frigate-telegram) makes it possible to send events from Frigate to Telegram. Events are sent as a message with a text description, video, and thumbnail.

## [Periscope](https://github.com/maksz42/periscope)[​](#periscope "Direct link to periscope")

[Periscope](https://github.com/maksz42/periscope) is a lightweight Android app that turns old devices into live viewers for Frigate. It works on Android 2.2 and above, including Android TV. It supports authentication and HTTPS.

*   [Advanced Camera Card (formerly known as Frigate Card](#advanced-camera-card-formerly-known-as-frigate-card)
*   [Double Take](#double-take)
*   [Frigate Notify](#frigate-notify)
*   [Frigate Snap-Sync](#frigate-snap-sync)
*   [Frigate telegram](#frigate-telegram)
*   [Periscope](#periscope)

--- END OF FILE: plus-.md ---
--- START OF FILE: plus-.md ---

Source: https://docs.frigate.video/plus/

On this page

[Frigate+](https://frigate.video/plus) offers models trained on images submitted by Frigate+ users from their security cameras and is specifically designed for the way Frigate NVR analyzes video footage. These models offer higher accuracy with less resources. The images you upload are used to fine tune a base model trained from images uploaded by all Frigate+ users. This fine tuning process results in a model that is optimized for accuracy in your specific conditions.

With a subscription, 12 model trainings to fine tune your model per year are included. In addition, you will have access to any base models published while your subscription is active. If you cancel your subscription, you will retain access to any trained and base models in your account. An active subscription is required to submit model requests or purchase additional trainings. New base models are published quarterly with target dates of January 15th, April 15th, July 15th, and October 15th.

Information on how to integrate Frigate+ with Frigate can be found in the [integration docs](/integrations/plus).

## Available model types[​](#available-model-types "Direct link to Available model types")

There are three model types offered in Frigate+, `mobiledet`, `yolonas`, and `yolov9`. All of these models are object detection models and are trained to detect the same set of labels [listed below](#available-label-types).

Not all model types are supported by all detectors, so it's important to choose a model type to match your detector as shown in the table under [supported detector types](#supported-detector-types). You can test model types for compatibility and speed on your hardware by using the base models.

Model Type

Description

`mobiledet`

Based on the same architecture as the default model included with Frigate. Runs on Google Coral devices and CPUs.

`yolonas`

A newer architecture that offers slightly higher accuracy and improved detection of small objects. Runs on Intel, NVidia GPUs, and AMD GPUs.

`yolov9`

A leading SOTA (state of the art) object detection model with similar performance to yolonas, but on a wider range of hardware options. Runs on Intel, NVidia GPUs, AMD GPUs, Hailo, MemryX\*, Apple Silicon\*, and Rockchip NPUs.

_\* Support coming in 0.17_

### YOLOv9 Details[​](#yolov9-details "Direct link to YOLOv9 Details")

YOLOv9 models are available in `s` and `t` sizes. When requesting a `yolov9` model, you will be prompted to choose a size. If you are unsure what size to choose, you should perform some tests with the base models to find the performance level that suits you. The `s` size is most similar to the current `yolonas` models in terms of inference times and accuracy, and a good place to start is the `320x320` resolution model for `yolov9s`.

info

When switching to YOLOv9, you may need to adjust your thresholds for some objects.

#### Hailo Support[​](#hailo-support "Direct link to Hailo Support")

If you have a Hailo device, you will need to specify the hardware you have when submitting a model request because they are not cross compatible. Please test using the available base models before submitting your model request.

#### Rockchip (RKNN) Support[​](#rockchip-rknn-support "Direct link to Rockchip (RKNN) Support")

For 0.16, YOLOv9 onnx models will need to be manually converted. First, you will need to configure Frigate to use the model id for your YOLOv9 onnx model so it downloads the model to your `model_cache` directory. From there, you can follow the [documentation](/configuration/object_detectors#converting-your-own-onnx-model-to-rknn-format) to convert it. Automatic conversion is coming in 0.17.

## Supported detector types[​](#supported-detector-types "Direct link to Supported detector types")

Currently, Frigate+ models support CPU (`cpu`), Google Coral (`edgetpu`), OpenVino (`openvino`), ONNX (`onnx`), Hailo (`hailo8l`), and Rockchip\* (`rknn`) detectors.

Hardware

Recommended Detector Type

Recommended Model Type

[CPU](/configuration/object_detectors#cpu-detector-not-recommended)

`cpu`

`mobiledet`

[Coral (all form factors)](/configuration/object_detectors#edge-tpu-detector)

`edgetpu`

`mobiledet`

[Intel](/configuration/object_detectors#openvino-detector)

`openvino`

`yolov9`

[NVidia GPU](/configuration/object_detectors#onnx)

`onnx`

`yolov9`

[AMD ROCm GPU](/configuration/object_detectors#amdrocm-gpu-detector)

`onnx`

`yolov9`

[Hailo8/Hailo8L/Hailo8R](/configuration/object_detectors#hailo-8)

`hailo8l`

`yolov9`

[Rockchip NPU](/configuration/object_detectors#rockchip-platform)\*

`rknn`

`yolov9`

_\* Requires manual conversion in 0.16. Automatic conversion coming in 0.17._

## Improving your model[​](#improving-your-model "Direct link to Improving your model")

Some users may find that Frigate+ models result in more false positives initially, but by submitting true and false positives, the model will improve. With all the new images now being submitted by subscribers, future base models will improve as more and more examples are incorporated. Note that only images with at least one verified label will be used when training your model. Submitting an image from Frigate as a true or false positive will not verify the image. You still must verify the image in Frigate+ in order for it to be used in training.

*   **Submit both true positives and false positives**. This will help the model differentiate between what is and isn't correct. You should aim for a target of 80% true positive submissions and 20% false positives across all of your images. If you are experiencing false positives in a specific area, submitting true positives for any object type near that area in similar lighting conditions will help teach the model what that area looks like when no objects are present.
*   **Lower your thresholds a little in order to generate more false/true positives near the threshold value**. For example, if you have some false positives that are scoring at 68% and some true positives scoring at 72%, you can try lowering your threshold to 65% and submitting both true and false positives within that range. This will help the model learn and widen the gap between true and false positive scores.
*   **Submit diverse images**. For the best results, you should provide at least 100 verified images per camera. Keep in mind that varying conditions should be included. You will want images from cloudy days, sunny days, dawn, dusk, and night. As circumstances change, you may need to submit new examples to address new types of false positives. For example, the change from summer days to snowy winter days or other changes such as a new grill or patio furniture may require additional examples and training.

## Available label types[​](#available-label-types "Direct link to Available label types")

Frigate+ models support a more relevant set of objects for security cameras. The labels for annotation in Frigate+ are configurable by editing the camera in the Cameras section of Frigate+. Currently, the following objects are supported:

*   **People**: `person`, `face`
*   **Vehicles**: `car`, `motorcycle`, `bicycle`, `boat`, `school_bus`, `license_plate`
*   **Delivery Logos**: `amazon`, `usps`, `ups`, `fedex`, `dhl`, `an_post`, `purolator`, `postnl`, `nzpost`, `postnord`, `gls`, `dpd`, `canada_post`, `royal_mail`
*   **Animals**: `dog`, `cat`, `deer`, `horse`, `bird`, `raccoon`, `fox`, `bear`, `cow`, `squirrel`, `goat`, `rabbit`, `skunk`, `kangaroo`
*   **Other**: `package`, `waste_bin`, `bbq_grill`, `robot_lawnmower`, `umbrella`

Other object types available in the default Frigate model are not available. Additional object types will be added in future releases.

### Candidate labels[​](#candidate-labels "Direct link to Candidate labels")

Candidate labels are also available for annotation. These labels don't have enough data to be included in the model yet, but using them will help add support sooner. You can enable these labels by editing the camera settings.

Where possible, these labels are mapped to existing labels during training. For example, any `baby` labels are mapped to `person` until support for new labels is added.

The candidate labels are: `baby`, `bpost`, `badger`, `possum`, `rodent`, `chicken`, `groundhog`, `boar`, `hedgehog`, `tractor`, `golf cart`, `garbage truck`, `bus`, `sports ball`

Candidate labels are not available for automatic suggestions.

### Label attributes[​](#label-attributes "Direct link to Label attributes")

Frigate has special handling for some labels when using Frigate+ models. `face`, `license_plate`, and delivery logos such as `amazon`, `ups`, and `fedex` are considered attribute labels which are not tracked like regular objects and do not generate review items directly. In addition, the `threshold` filter will have no effect on these labels. You should adjust the `min_score` and other filter values as needed.

In order to have Frigate start using these attribute labels, you will need to add them to the list of objects to track:

```
objects:  track:    - person    - face    - license_plate    - dog    - cat    - car    - amazon    - fedex    - ups    - package
```

When using Frigate+ models, Frigate will choose the snapshot of a person object that has the largest visible face. For cars, the snapshot with the largest visible license plate will be selected. This aids in secondary processing such as facial and license plate recognition for person and car objects.

![Face Attribute](/assets/images/attribute-example-face-bb4c144f9027abc0572237a2d04a2943.jpg)

Delivery logos such as `amazon`, `ups`, and `fedex` labels are used to automatically assign a sub label to car objects.

![Fedex Attribute](/assets/images/attribute-example-fedex-2611458c9a8a703362d7ea79d4701f3b.jpg)

*   [Available model types](#available-model-types)
    *   [YOLOv9 Details](#yolov9-details)
*   [Supported detector types](#supported-detector-types)
*   [Improving your model](#improving-your-model)
*   [Available label types](#available-label-types)
    *   [Candidate labels](#candidate-labels)
    *   [Label attributes](#label-attributes)

--- END OF FILE: plus-annotating.md ---
--- START OF FILE: plus-annotating.md ---

Source: https://docs.frigate.video/plus/annotating

On this page

For the best results, follow these guidelines. You may also want to review the documentation on [improving your model](/plus/#improving-your-model).

**Label every object in the image**: It is important that you label all objects in each image before verifying. If you don't label a car for example, the model will be taught that part of the image is _not_ a car and it will start to get confused. You can exclude labels that you don't want detected on any of your cameras.

**Make tight bounding boxes**: Tighter bounding boxes improve the recognition and ensure that accurate bounding boxes are predicted at runtime.

**Label the full object even when occluded**: If you have a person standing behind a car, label the full person even though a portion of their body may be hidden behind the car. This helps predict accurate bounding boxes and improves zone accuracy and filters at runtime. If an object is partly out of frame, label it only when a person would reasonably be able to recognize the object from the visible parts.

**Label objects hard to identify as difficult**: When objects are truly difficult to make out, such as a car barely visible through a bush, or a dog that is hard to distinguish from the background at night, flag it as 'difficult'. This is not used in the model training as of now, but will in the future.

**Delivery logos such as `amazon`, `ups`, and `fedex` should label the logo**: For a Fedex truck, label the truck as a `car` and make a different bounding box just for the Fedex logo. If there are multiple logos, label each of them.

![Fedex Logo](/assets/images/fedex-logo-56c82545df6a5078ee84903ac5604b44.jpg)

## AI suggested labels[​](#ai-suggested-labels "Direct link to AI suggested labels")

If you have an active Frigate+ subscription, new uploads will be scanned for the objects configured for you camera and you will see suggested labels as light blue boxes when annotating in Frigate+. These suggestions are processed via a queue and typically complete within a minute after uploading, but processing times can be longer.

![Suggestions](/assets/images/suggestions-f902cd4a2a485079f50fdbd838be99b0.webp)

Suggestions are converted to labels when saving, so you should remove any errant suggestions. There is already some logic designed to avoid duplicate labels, but you may still occasionally see some duplicate suggestions. You should keep the most accurate bounding box and delete any duplicates so that you have just one label per object remaining.

## False positive labels[​](#false-positive-labels "Direct link to False positive labels")

False positives will be shown with a red box and the label will have a strike through. These can't be adjusted, but they can be deleted if you accidentally submit a true positive as a false positive from Frigate. ![false positive](/assets/images/false-positive-2c083609b62e7427d29725339c5f93be.jpg)

Misidentified objects should have a correct label added. For example, if a person was mistakenly detected as a cat, you should submit it as a false positive in Frigate and add a label for the person. The boxes will overlap.

![add image](/assets/images/false-positive-overlap-573e5df01badbe7934bc49c3476727b2.jpg)

## Shortcuts for a faster workflow[​](#shortcuts-for-a-faster-workflow "Direct link to Shortcuts for a faster workflow")

Shortcut Key

Description

`?`

Show all keyboard shortcuts

`w`

Add box

`d`

Toggle difficult

`s`

Switch to the next label

`Shift + s`

Switch to the previous label

`tab`

Select next largest box

`del`

Delete current box

`esc`

Deselect/Cancel

`← ↑ → ↓`

Move box

`Shift + ← ↑ → ↓`

Resize box

`scrollwheel`

Zoom in/out

`f`

Hide/show all but current box

`spacebar`

Verify and save

*   [AI suggested labels](#ai-suggested-labels)
*   [False positive labels](#false-positive-labels)
*   [Shortcuts for a faster workflow](#shortcuts-for-a-faster-workflow)

--- END OF FILE: plus-faq.md ---
--- START OF FILE: plus-faq.md ---

Source: https://docs.frigate.video/plus/faq

On this page

### Are my models trained just on my image uploads? How are they built?[​](#are-my-models-trained-just-on-my-image-uploads-how-are-they-built "Direct link to Are my models trained just on my image uploads? How are they built?")

Frigate+ models are built by fine tuning a base model with the images you have annotated and verified. The base model is trained from scratch from a sampling of images across all Frigate+ user submissions and takes weeks of expensive GPU resources to train. If the models were built using your image uploads alone, you would need to provide tens of thousands of examples and it would take more than a week (and considerable cost) to train. Diversity helps the model generalize.

### Are my video feeds sent to the cloud for analysis when using Frigate+ models?[​](#are-my-video-feeds-sent-to-the-cloud-for-analysis-when-using-frigate-models "Direct link to Are my video feeds sent to the cloud for analysis when using Frigate+ models?")

No. Frigate+ models are a drop in replacement for the default model. All processing is performed locally as always. The only images sent to Frigate+ are the ones you specifically submit via the `Send to Frigate+` button or upload directly.

### Can I label anything I want and train the model to recognize something custom for me?[​](#can-i-label-anything-i-want-and-train-the-model-to-recognize-something-custom-for-me "Direct link to Can I label anything I want and train the model to recognize something custom for me?")

Not currently. At the moment, the set of labels will be consistent for all users. The focus will be on expanding that set of labels before working on completely custom user labels.

### Can Frigate+ models be used offline?[​](#can-frigate-models-be-used-offline "Direct link to Can Frigate+ models be used offline?")

Yes. Models and metadata are stored in the `model_cache` directory within the config folder. Frigate will only attempt to download a model if it does not exist in the cache. This means you can backup the directory and/or use it completely offline.

### Can I keep using my Frigate+ models even if I do not renew my subscription?[​](#can-i-keep-using-my-frigate-models-even-if-i-do-not-renew-my-subscription "Direct link to Can I keep using my Frigate+ models even if I do not renew my subscription?")

Yes. Subscriptions to Frigate+ provide access to the infrastructure used to train the models. Models trained with your subscription are yours to keep and use forever. However, do note that the terms and conditions prohibit you from sharing, reselling, or creating derivative products from the models.

### Why can't I submit images to Frigate+?[​](#why-cant-i-submit-images-to-frigate "Direct link to Why can't I submit images to Frigate+?")

If you've configured your API key and the Frigate+ Settings page in the UI shows that the key is active, you need to ensure that you've enabled both snapshots and `clean_copy` snapshots for the cameras you'd like to submit images for. Note that `clean_copy` is enabled by default when snapshots are enabled.

```
snapshots:  enabled: true  clean_copy: true
```

*   [Are my models trained just on my image uploads? How are they built?](#are-my-models-trained-just-on-my-image-uploads-how-are-they-built)
*   [Are my video feeds sent to the cloud for analysis when using Frigate+ models?](#are-my-video-feeds-sent-to-the-cloud-for-analysis-when-using-frigate-models)
*   [Can I label anything I want and train the model to recognize something custom for me?](#can-i-label-anything-i-want-and-train-the-model-to-recognize-something-custom-for-me)
*   [Can Frigate+ models be used offline?](#can-frigate-models-be-used-offline)
*   [Can I keep using my Frigate+ models even if I do not renew my subscription?](#can-i-keep-using-my-frigate-models-even-if-i-do-not-renew-my-subscription)
*   [Why can't I submit images to Frigate+?](#why-cant-i-submit-images-to-frigate)

--- END OF FILE: plus-first_model.md ---
--- START OF FILE: plus-first_model.md ---

Source: https://docs.frigate.video/plus/first_model

On this page

## Step 1: Upload and annotate your images[​](#step-1-upload-and-annotate-your-images "Direct link to Step 1: Upload and annotate your images")

Before requesting your first model, you will need to upload and verify at least 10 images to Frigate+. The more images you upload, annotate, and verify the better your results will be. Most users start to see very good results once they have at least 100 verified images per camera. Keep in mind that varying conditions should be included. You will want images from cloudy days, sunny days, dawn, dusk, and night. Refer to the [integration docs](/integrations/plus#generate-an-api-key) for instructions on how to easily submit images to Frigate+ directly from Frigate.

It is recommended to submit **both** true positives and false positives. This will help the model differentiate between what is and isn't correct. You should aim for a target of 80% true positive submissions and 20% false positives across all of your images. If you are experiencing false positives in a specific area, submitting true positives for any object type near that area in similar lighting conditions will help teach the model what that area looks like when no objects are present.

For more detailed recommendations, you can refer to the docs on [annotating](/plus/annotating).

## Step 2: Submit a model request[​](#step-2-submit-a-model-request "Direct link to Step 2: Submit a model request")

Once you have an initial set of verified images, you can request a model on the Models page. For guidance on choosing a model type, refer to [this part of the documentation](/plus/#available-model-types). If you are unsure which type to request, you can test the base model for each version from the "Base Models" tab. Each model request requires 1 of the 12 trainings that you receive with your annual subscription. This model will support all [label types available](/plus/#available-label-types) even if you do not submit any examples for those labels. Model creation can take up to 36 hours. ![Plus Models Page](/assets/images/plus-models-20419d57ab4903159eb2a61761de67cc.jpg)

## Step 3: Set your model id in the config[​](#step-3-set-your-model-id-in-the-config "Direct link to Step 3: Set your model id in the config")

You will receive an email notification when your Frigate+ model is ready. ![Model Ready Email](/assets/images/model-ready-email-c480c98c9963c692d87ae7e73ff07ecd.jpg)

Models available in Frigate+ can be used with a special model path. No other information needs to be configured because it fetches the remaining config from Frigate+ automatically.

```
model:  path: plus://<your_model_id>
```

note

Model IDs are not secret values and can be shared freely. Access to your model is protected by your API key.

tip

When setting the plus model id, all other fields should be removed as these are configured automatically with the Frigate+ model config

## Step 4: Adjust your object filters for higher scores[​](#step-4-adjust-your-object-filters-for-higher-scores "Direct link to Step 4: Adjust your object filters for higher scores")

Frigate+ models generally have much higher scores than the default model provided in Frigate. You will likely need to increase your `threshold` and `min_score` values. Here is an example of how these values can be refined, but you should expect these to evolve as your model improves. For more information about how `threshold` and `min_score` are related, see the docs on [object filters](/configuration/object_filters#object-scores).

```
objects:  filters:    dog:      min_score: .7      threshold: .9    cat:      min_score: .65      threshold: .8    face:      min_score: .7    package:      min_score: .65      threshold: .9    license_plate:      min_score: .6    amazon:      min_score: .75    ups:      min_score: .75    fedex:      min_score: .75    person:      min_score: .65      threshold: .85    car:      min_score: .65      threshold: .85
```

*   [Step 1: Upload and annotate your images](#step-1-upload-and-annotate-your-images)
*   [Step 2: Submit a model request](#step-2-submit-a-model-request)
*   [Step 3: Set your model id in the config](#step-3-set-your-model-id-in-the-config)
*   [Step 4: Adjust your object filters for higher scores](#step-4-adjust-your-object-filters-for-higher-scores)

--- END OF FILE: troubleshooting-edgetpu.md ---
--- START OF FILE: troubleshooting-edgetpu.md ---

Source: https://docs.frigate.video/troubleshooting/edgetpu

On this page

## USB Coral Not Detected[​](#usb-coral-not-detected "Direct link to USB Coral Not Detected")

There are many possible causes for a USB coral not being detected and some are OS specific. It is important to understand how the USB coral works:

1.  When the device is first plugged in and has not initialized it will appear as `1a6e:089a Global Unichip Corp.` when running `lsusb` or checking the hardware page in HA OS.
2.  Once initialized, the device will appear as `18d1:9302 Google Inc.` when running `lsusb` or checking the hardware page in HA OS.

tip

Using `lsusb` or checking the hardware page in HA OS will show as `1a6e:089a Global Unichip Corp.` until Frigate runs an inferance using the coral. So don't worry about the identification until after Frigate has attempted to detect the coral.

If the coral does not initialize then Frigate can not interface with it. Some common reasons for the USB based Coral not initializing are:

### Not Enough Power[​](#not-enough-power "Direct link to Not Enough Power")

The USB coral can draw up to 900mA and this can be too much for some on-device USB ports, especially for small board computers like the RPi. If the coral is not initializing then some recommended steps are:

1.  Try a different port, some ports are capable of providing more power than others.
2.  Make sure the port is USB3, this is important for power and to ensure the coral runs at max speed.
3.  Try a different cable, some users have found the included cable to not work well.
4.  Use an externally powered USB hub.

### Incorrect Device Access[​](#incorrect-device-access "Direct link to Incorrect Device Access")

The USB coral has different IDs when it is uninitialized and initialized.

*   When running Frigate in a VM, Proxmox lxc, etc. you must ensure both device IDs are mapped.
*   When running through the Home Assistant OS you may need to run the Full Access variant of the Frigate Add-on with the _Protection mode_ switch disabled so that the coral can be accessed.

### Synology 716+II running DSM 7.2.1-69057 Update 5[​](#synology-716ii-running-dsm-721-69057-update-5 "Direct link to Synology 716+II running DSM 7.2.1-69057 Update 5")

Some users have reported that this older device runs an older kernel causing issues with the coral not being detected. The following steps allowed it to be detected correctly:

1.  Plug in the coral TPU in any of the USB ports on the NAS
2.  Open the control panel - info screen. The coral TPU would be shown as a generic device.
3.  Start the docker container with Coral TPU enabled in the config
4.  The TPU would be detected but a few moments later it would disconnect.
5.  While leaving the TPU device plugged in, restart the NAS using the reboot command in the UI. Do NOT unplug the NAS/power it off etc.
6.  Open the control panel - info scree. The coral TPU will now be recognised as a USB Device - google inc
7.  Start the frigate container. Everything should work now!

### QNAP NAS[​](#qnap-nas "Direct link to QNAP NAS")

QNAP NAS devices, such as the TS-253A, may use connected Coral TPU devices if [QuMagie](https://www.qnap.com/en/software/qumagie) is installed along with its QNAP AI Core extension. If any of the features—`facial recognition`, `object recognition`, or `similar photo recognition`—are enabled, Container Station applications such as `Frigate` or `CodeProject.AI Server` will be unable to initialize the TPU device in use. To allow the Coral TPU device to be discovered, the you must either:

1.  [Disable the AI recognition features in QuMagie](https://docs.qnap.com/application/qumagie/2.x/en-us/configuring-qnap-ai-core-settings-FB13CE03.html),
2.  Remove the QNAP AI Core extension or
3.  Manually start the QNAP AI Core extension after Frigate has fully started (not recommended).

It is also recommended to restart the NAS once the changes have been made.

## USB Coral Detection Appears to be Stuck[​](#usb-coral-detection-appears-to-be-stuck "Direct link to USB Coral Detection Appears to be Stuck")

The USB Coral can become stuck and need to be restarted, this can happen for a number of reasons depending on hardware and software setup. Some common reasons are:

1.  Some users have found the cable included with the coral to cause this problem and that switching to a different cable fixed it entirely.
2.  Running Frigate in a VM may cause communication with the device to be lost and need to be reset.

## PCIe Coral Not Detected[​](#pcie-coral-not-detected "Direct link to PCIe Coral Not Detected")

The most common reason for the PCIe Coral not being detected is that the driver has not been installed. This process varies based on what OS and kernel that is being run.

*   In most cases [https://github.com/jnicolson/gasket-builder](https://github.com/jnicolson/gasket-builder) can be used to build and install the latest version of the driver.

## Attempting to load TPU as pci & Fatal Python error: Illegal instruction[​](#attempting-to-load-tpu-as-pci--fatal-python-error-illegal-instruction "Direct link to Attempting to load TPU as pci & Fatal Python error: Illegal instruction")

This is an issue due to outdated gasket driver when being used with new linux kernels. Installing an updated driver from [https://github.com/jnicolson/gasket-builder](https://github.com/jnicolson/gasket-builder) has been reported to fix the issue.

### Not detected on Raspberry Pi5[​](#not-detected-on-raspberry-pi5 "Direct link to Not detected on Raspberry Pi5")

A kernel update to the RPi5 means an upate to config.txt is required, see [the raspberry pi forum for more info](https://forums.raspberrypi.com/viewtopic.php?t=363682&sid=cb59b026a412f0dc041595951273a9ca&start=25)

Specifically, add the following to config.txt

```
dtoverlay=pciex1-compat-pi5,no-mipdtoverlay=pcie-32bit-dma-pi5
```

## Only One PCIe Coral Is Detected With Coral Dual EdgeTPU[​](#only-one-pcie-coral-is-detected-with-coral-dual-edgetpu "Direct link to Only One PCIe Coral Is Detected With Coral Dual EdgeTPU")

Coral Dual EdgeTPU is one card with two identical TPU cores. Each core has it's own PCIe interface and motherboard needs to have two PCIe busses on the m.2 slot to make them both work.

E-key slot implemented to full m.2 electromechanical specification has two PCIe busses. Most motherboard manufacturers implement only one PCIe bus in m.2 E-key connector (this is why only one TPU is working). Some SBCs can have only USB bus on m.2 connector, ie none of TPUs will work.

In this case it is recommended to use a Dual EdgeTPU Adapter [like the one from MagicBlueSmoke](https://github.com/magic-blue-smoke/Dual-Edge-TPU-Adapter)

*   [USB Coral Not Detected](#usb-coral-not-detected)
    *   [Not Enough Power](#not-enough-power)
    *   [Incorrect Device Access](#incorrect-device-access)
    *   [Synology 716+II running DSM 7.2.1-69057 Update 5](#synology-716ii-running-dsm-721-69057-update-5)
    *   [QNAP NAS](#qnap-nas)
*   [USB Coral Detection Appears to be Stuck](#usb-coral-detection-appears-to-be-stuck)
*   [PCIe Coral Not Detected](#pcie-coral-not-detected)
*   [Attempting to load TPU as pci & Fatal Python error: Illegal instruction](#attempting-to-load-tpu-as-pci--fatal-python-error-illegal-instruction)
    *   [Not detected on Raspberry Pi5](#not-detected-on-raspberry-pi5)
*   [Only One PCIe Coral Is Detected With Coral Dual EdgeTPU](#only-one-pcie-coral-is-detected-with-coral-dual-edgetpu)

--- END OF FILE: troubleshooting-faqs.md ---
--- START OF FILE: troubleshooting-faqs.md ---

Source: https://docs.frigate.video/troubleshooting/faqs

On this page

### Fatal Python error: Bus error[​](#fatal-python-error-bus-error "Direct link to Fatal Python error: Bus error")

This error message is due to a shm-size that is too small. Try updating your shm-size according to [this guide](/frigate/installation#calculating-required-shm-size).

### How can I get sound or audio in my recordings?[​](#audio-in-recordings "Direct link to How can I get sound or audio in my recordings?")

By default, Frigate removes audio from recordings to reduce the likelihood of failing for invalid data. If you would like to include audio, you need to set a [FFmpeg preset](/configuration/ffmpeg_presets) that supports audio:

```
ffmpeg:  output_args:    record: preset-record-generic-audio-aac
```

### How can I get sound in live view?[​](#how-can-i-get-sound-in-live-view "Direct link to How can I get sound in live view?")

Audio is only supported for live view when go2rtc is configured, see [the live docs](/configuration/live) for more information.

### I can't view recordings in the Web UI.[​](#i-cant-view-recordings-in-the-web-ui "Direct link to I can't view recordings in the Web UI.")

Ensure your cameras send h264 encoded video, or [transcode them](/configuration/restream).

You can open `chrome://media-internals/` in another tab and then try to playback, the media internals page will give information about why playback is failing.

### What do I do if my cameras sub stream is not good enough?[​](#what-do-i-do-if-my-cameras-sub-stream-is-not-good-enough "Direct link to What do I do if my cameras sub stream is not good enough?")

Frigate generally [recommends cameras with configurable sub streams](/frigate/hardware). However, if your camera does not have a sub stream that a suitable resolution, the main stream can be resized.

To do this efficiently the following setup is required:

1.  A GPU or iGPU must be available to do the scaling.
2.  [ffmpeg presets for hwaccel](/configuration/hardware_acceleration_video) must be used
3.  Set the desired detection resolution for `detect -> width` and `detect -> height`.

When this is done correctly, the GPU will do the decoding and scaling which will result in a small increase in CPU usage but with better results.

### My mjpeg stream or snapshots look green and crazy[​](#my-mjpeg-stream-or-snapshots-look-green-and-crazy "Direct link to My mjpeg stream or snapshots look green and crazy")

This almost always means that the width/height defined for your camera are not correct. Double check the resolution with VLC or another player. Also make sure you don't have the width and height values backwards.

![mismatched-resolution](/assets/images/mismatched-resolution-min-2bdbb17637210fbeddaa8766a29d7d1a.jpg)

### "\[mov,mp4,m4a,3gp,3g2,mj2 @ 0x5639eeb6e140\] moov atom not found"[​](#movmp4m4a3gp3g2mj2--0x5639eeb6e140-moov-atom-not-found "Direct link to \"[mov,mp4,m4a,3gp,3g2,mj2 @ 0x5639eeb6e140] moov atom not found\"")

These messages in the logs are expected in certain situations. Frigate checks the integrity of the recordings before storing. Occasionally these cached files will be invalid and cleaned up automatically.

### "On connect called"[​](#on-connect-called "Direct link to \"On connect called\"")

If you see repeated "On connect called" messages in your logs, check for another instance of Frigate. This happens when multiple Frigate containers are trying to connect to MQTT with the same `client_id`.

### Error: Database Is Locked[​](#error-database-is-locked "Direct link to Error: Database Is Locked")

SQLite does not work well on a network share, if the `/media` folder is mapped to a network share then [this guide](/configuration/advanced#database) should be used to move the database to a location on the internal drive.

### Unable to publish to MQTT: client is not connected[​](#unable-to-publish-to-mqtt-client-is-not-connected "Direct link to Unable to publish to MQTT: client is not connected")

If MQTT isn't working in docker try using the IP of the device hosting the MQTT server instead of `localhost`, `127.0.0.1`, or `mosquitto.ix-mosquitto.svc.cluster.local`.

This is because Frigate does not run in host mode so localhost points to the Frigate container and not the host device's network.

### How do I know if my camera is offline[​](#how-do-i-know-if-my-camera-is-offline "Direct link to How do I know if my camera is offline")

A camera being offline can be detected via MQTT or /api/stats, the camera\_fps for any offline camera will be 0.

Also, Home Assistant will mark any offline camera as being unavailable when the camera is offline.

### How can I view the Frigate log files without using the Web UI?[​](#how-can-i-view-the-frigate-log-files-without-using-the-web-ui "Direct link to How can I view the Frigate log files without using the Web UI?")

Frigate manages logs internally as well as outputs directly to Docker via standard output. To view these logs using the CLI, follow these steps:

*   Open a terminal or command prompt on the host running your Frigate container.
*   Type the following command and press Enter:
    
    ```
    docker logs -f frigate
    ```
    
    This command tells Docker to show you the logs from the Frigate container. Note: If you've given your Frigate container a different name, replace "frigate" in the command with your container's actual name. The "-f" option means the logs will continue to update in real-time as new entries are added. To stop viewing the logs, press `Ctrl+C`. If you'd like to learn more about using Docker logs, including additional options and features, you can explore Docker's [official documentation](https://docs.docker.com/engine/reference/commandline/logs/).

Alternatively, when you create the Frigate Docker container, you can bind a directory on the host to the mountpoint `/dev/shm/logs` to not only be able to persist the logs to disk, but also to be able to query them directly from the host using your favorite log parsing/query utility.

```
docker run -d \  --name frigate \  --restart=unless-stopped \  --mount type=tmpfs,target=/tmp/cache,tmpfs-size=1000000000 \  --device /dev/bus/usb:/dev/bus/usb \  --device /dev/dri/renderD128 \  --shm-size=64m \  -v /path/to/your/storage:/media/frigate \  -v /path/to/your/config:/config \  -v /etc/localtime:/etc/localtime:ro \  -v /path/to/local/log/dir:/dev/shm/logs \  -e FRIGATE_RTSP_PASSWORD='password' \  -p 5000:5000 \  -p 8554:8554 \  -p 8555:8555/tcp \  -p 8555:8555/udp \  ghcr.io/blakeblackshear/frigate:stable
```

### My RTSP stream works fine in VLC, but it does not work when I put the same URL in my Frigate config. Is this a bug?[​](#my-rtsp-stream-works-fine-in-vlc-but-it-does-not-work-when-i-put-the-same-url-in-my-frigate-config-is-this-a-bug "Direct link to My RTSP stream works fine in VLC, but it does not work when I put the same URL in my Frigate config. Is this a bug?")

No. Frigate uses the TCP protocol to connect to your camera's RTSP URL. VLC automatically switches between UDP and TCP depending on network conditions and stream availability. So a stream that works in VLC but not in Frigate is likely due to VLC selecting UDP as the transfer protocol.

TCP ensures that all data packets arrive in the correct order. This is crucial for video recording, decoding, and stream processing, which is why Frigate enforces a TCP connection. UDP is faster but less reliable, as it does not guarantee packet delivery or order, and VLC does not have the same requirements as Frigate.

You can still configure Frigate to use UDP by using ffmpeg input args or the preset `preset-rtsp-udp`. See the [ffmpeg presets](/configuration/ffmpeg_presets) documentation.

*   [Fatal Python error: Bus error](#fatal-python-error-bus-error)
*   [How can I get sound or audio in my recordings?](#audio-in-recordings)
*   [How can I get sound in live view?](#how-can-i-get-sound-in-live-view)
*   [I can't view recordings in the Web UI.](#i-cant-view-recordings-in-the-web-ui)
*   [What do I do if my cameras sub stream is not good enough?](#what-do-i-do-if-my-cameras-sub-stream-is-not-good-enough)
*   [My mjpeg stream or snapshots look green and crazy](#my-mjpeg-stream-or-snapshots-look-green-and-crazy)
*   ["\[mov,mp4,m4a,3gp,3g2,mj2 @ 0x5639eeb6e140\] moov atom not found"](#movmp4m4a3gp3g2mj2--0x5639eeb6e140-moov-atom-not-found)
*   ["On connect called"](#on-connect-called)
*   [Error: Database Is Locked](#error-database-is-locked)
*   [Unable to publish to MQTT: client is not connected](#unable-to-publish-to-mqtt-client-is-not-connected)
*   [How do I know if my camera is offline](#how-do-i-know-if-my-camera-is-offline)
*   [How can I view the Frigate log files without using the Web UI?](#how-can-i-view-the-frigate-log-files-without-using-the-web-ui)
*   [My RTSP stream works fine in VLC, but it does not work when I put the same URL in my Frigate config. Is this a bug?](#my-rtsp-stream-works-fine-in-vlc-but-it-does-not-work-when-i-put-the-same-url-in-my-frigate-config-is-this-a-bug)

--- END OF FILE: troubleshooting-gpu.md ---
--- START OF FILE: troubleshooting-gpu.md ---

Source: https://docs.frigate.video/troubleshooting/gpu

On this page

## OpenVINO[​](#openvino "Direct link to OpenVINO")

### Can't get OPTIMIZATION\_CAPABILITIES property as no supported devices found.[​](#cant-get-optimization_capabilities-property-as-no-supported-devices-found "Direct link to Can't get OPTIMIZATION_CAPABILITIES property as no supported devices found.")

Some users have reported issues using some Intel iGPUs with OpenVINO, where the GPU would not be detected. This error can be caused by various problems, so it is important to ensure the configuration is setup correctly. Some solutions users have noted:

*   In some cases users have noted that an HDMI dummy plug was necessary to be plugged into the motherboard's HDMI port.
*   When mixing an Intel iGPU with Nvidia GPU, the devices can be mixed up between `/dev/dri/renderD128` and `/dev/dri/renderD129` so it is important to confirm the correct device, or map the entire `/dev/dri` directory into the Frigate container.

*   [OpenVINO](#openvino)
    *   [Can't get OPTIMIZATION\_CAPABILITIES property as no supported devices found.](#cant-get-optimization_capabilities-property-as-no-supported-devices-found)

--- END OF FILE: troubleshooting-recordings.md ---
--- START OF FILE: troubleshooting-recordings.md ---

Source: https://docs.frigate.video/troubleshooting/recordings

On this page

## I have Frigate configured for motion recording only, but it still seems to be recording even with no motion. Why?[​](#i-have-frigate-configured-for-motion-recording-only-but-it-still-seems-to-be-recording-even-with-no-motion-why "Direct link to I have Frigate configured for motion recording only, but it still seems to be recording even with no motion. Why?")

You'll want to:

*   Make sure your camera's timestamp is masked out with a motion mask. Even if there is no motion occurring in your scene, your motion settings may be sensitive enough to count your timestamp as motion.
*   If you have audio detection enabled, keep in mind that audio that is heard above `min_volume` is considered motion.
*   [Tune your motion detection settings](/configuration/motion_detection) either by editing your config file or by using the UI's Motion Tuner.

## I see the message: WARNING : Unable to keep up with recording segments in cache for camera. Keeping the 5 most recent segments out of 6 and discarding the rest...[​](#i-see-the-message-warning--unable-to-keep-up-with-recording-segments-in-cache-for-camera-keeping-the-5-most-recent-segments-out-of-6-and-discarding-the-rest "Direct link to I see the message: WARNING : Unable to keep up with recording segments in cache for camera. Keeping the 5 most recent segments out of 6 and discarding the rest...")

This error can be caused by a number of different issues. The first step in troubleshooting is to enable debug logging for recording. This will enable logging showing how long it takes for recordings to be moved from RAM cache to the disk.

```
logger:  logs:    frigate.record.maintainer: debug
```

This will include logs like:

```
DEBUG   : Copied /media/frigate/recordings/{segment_path} in 0.2 seconds.
```

It is important to let this run until the errors begin to happen, to confirm that there is not a slow down in the disk at the time of the error.

#### Copy Times > 1 second[​](#copy-times--1-second "Direct link to Copy Times > 1 second")

If the storage is too slow to keep up with the recordings then the maintainer will fall behind and purge the oldest recordings to ensure the cache does not fill up causing a crash. In this case it is important to diagnose why the copy times are slow.

##### Check RAM, swap, cache utilization, and disk utilization[​](#check-ram-swap-cache-utilization-and-disk-utilization "Direct link to Check RAM, swap, cache utilization, and disk utilization")

If CPU, RAM, disk throughput, or bus I/O is insufficient, nothing inside frigate will help. It is important to review each aspect of available system resources.

On linux, some helpful tools/commands in diagnosing would be:

*   docker stats
*   htop
*   iotop -o
*   iostat -sxy --human 1 1
*   vmstat 1

On modern linux kernels, the system will utilize some swap if enabled. Setting vm.swappiness=1 no longer means that the kernel will only swap in order to avoid OOM. To prevent any swapping inside a container, set allocations memory and memory+swap to be the same and disable swapping by setting the following docker/podman run parameters:

**Docker Compose example**

```
services:  frigate:    ...    mem_swappiness: 0    memswap_limit: <MAXSWAP>    deploy:      resources:        limits:          memory: <MAXRAM>
```

**Run command example**

```
--memory=<MAXRAM> --memory-swap=<MAXSWAP> --memory-swappiness=0
```

NOTE: These are hard-limits for the container, be sure there is enough headroom above what is shown by `docker stats` for your container. It will immediately halt if it hits `<MAXRAM>`. In general, running all cache and tmp filespace in RAM is preferable to disk I/O where possible.

##### Check Storage Type[​](#check-storage-type "Direct link to Check Storage Type")

Mounting a network share is a popular option for storing Recordings, but this can lead to reduced copy times and cause problems. Some users have found that using `NFS` instead of `SMB` considerably decreased the copy times and fixed the issue. It is also important to ensure that the network connection between the device running Frigate and the network share is stable and fast.

##### Check mount options[​](#check-mount-options "Direct link to Check mount options")

Some users found that mounting a drive via `fstab` with the `sync` option caused dramatically reduce performance and led to this issue. Using `async` instead greatly reduced copy times.

#### Copy Times < 1 second[​](#copy-times--1-second-1 "Direct link to Copy Times < 1 second")

If the storage is working quickly then this error may be caused by CPU load on the machine being too high for Frigate to have the resources to keep up. Try temporarily shutting down other services to see if the issue improves.

*   [I have Frigate configured for motion recording only, but it still seems to be recording even with no motion. Why?](#i-have-frigate-configured-for-motion-recording-only-but-it-still-seems-to-be-recording-even-with-no-motion-why)
*   [I see the message: WARNING : Unable to keep up with recording segments in cache for camera. Keeping the 5 most recent segments out of 6 and discarding the rest...](#i-see-the-message-warning--unable-to-keep-up-with-recording-segments-in-cache-for-camera-keeping-the-5-most-recent-segments-out-of-6-and-discarding-the-rest)