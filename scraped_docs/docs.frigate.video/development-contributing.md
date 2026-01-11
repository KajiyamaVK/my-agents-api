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