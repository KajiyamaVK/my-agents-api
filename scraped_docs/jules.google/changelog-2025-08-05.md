Source: https://jules.google/docs/changelog/2025-08-05

# Environment snapshots for faster tasks

August 5, 2025

![Env Snapshot](/docs/_astro/envsnapshot.Da7EUEdt_e5gX8.webp)

Jules now creates a snapshot of your environment when you add environment setup scripts. For complicated environment, users should see faster and more consistent task execution.

In summary:

*   Jules will now snapshot your environment when you provide an environment setup script
*   Snapshots are loaded automatically next time you run a task
*   This provides for faster task startups, especially for complex environments
*   You can find environment configuration by clicking the “codebase” in the left hand panel, or by clicking the “configure environment” button in the task pane.