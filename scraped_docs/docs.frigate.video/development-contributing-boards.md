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