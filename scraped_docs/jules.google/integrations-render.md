Source: https://jules.google/docs/integrations/render

# Render Integration

Turn deployment failures into instant fixes. By connecting Jules to Render, you empower it to watch your builds, analyze errors, and push fixes before you even switch context.

## Prerequisites

[Section titled “Prerequisites”](#prerequisites)

Before generating your API key, ensure your Render and GitHub environments are ready:

1.  **Enable Pull Request Previews:** Go to your Render dashboard and [enable Pull Request Previews](https://render.com/docs/service-previews?utm_source=jules#pull-request-previews-git-backed).
2.  **Verify GitHub Permissions:** Check your [GitHub Installations](https://github.com/settings/installations).
    *   Locate **Google Labs Jules**.
    *   If you see a **Review Request** link next to it, click it to accept the updated permissions.
    *   If there is no link, your permissions are already up to date.

## Setup

[Section titled “Setup”](#setup)

1.  **Provision a Key** Navigate to the [Render Dashboard](https://dashboard.render.com?utm_source=jules). Click the **Help menu** (top-right) and select **Coding Agents** to open the provisioning screen.
    
    _Alternatively, visit [dashboard.render.com/jules](https://dashboard.render.com/jules?utm_source=jules) directly._
    
2.  **Create the Key** Click **Create API key**. Copy the key displayed.
    
    This key is shown only once. If you lose it, you will need to provision a new one.
    
3.  **Connect to Jules** In Jules, go to [Settings > Integrations](https://jules.google.com/settings/integrations). Paste the key into the Render field and submit.
    

## Automated Fixes

[Section titled “Automated Fixes”](#automated-fixes)

Once connected, Jules automatically monitors the Pull Requests **it creates** for build failures.

1.  **Jules creates a PR:** When you accept a plan, Jules opens a Pull Request with the changes.
2.  **Detection:** If the Render build for that PR fails, Jules automatically analyzes the logs.
3.  **Resolution:** Jules writes a fix and pushes a new commit to the same branch.
4.  **Merge:** You review the fix just like any other change and merge when ready.

Jules currently only monitors and fixes build failures on Pull Requests created by Jules. It does not automatically debug failures on PRs created by you or other team members.