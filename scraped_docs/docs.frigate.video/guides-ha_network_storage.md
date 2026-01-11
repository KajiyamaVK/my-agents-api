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