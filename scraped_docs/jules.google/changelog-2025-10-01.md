Source: https://jules.google/docs/changelog/2025-10-01

# Use Environment Variables In Jules

October 1, 2025

![Environment Variables](/docs/_astro/envar.Dhbt8Wwu_eCuVm.webp)

You can now provide Jules with environment variables at the repository level. This enables Jules to access the project-specific configurations it needs to complete tasks, like running builds, executing tests, or interacting with different services.

**How It Works**:

*   **Add Variables in Repo Settings:** Navigate to your repository’s settings page to add your environment variables. They will be associated directly with your project.
*   **Enable for a Task:** When you start a new task with Jules, you’ll have the option to make these environment variables available to it.
*   **Task-Long Access:** Once enabled for a specific task, Jules will have access to the variables for the entire duration of that task. Please note that this setting cannot be changed after the task has begun.

We’re excited to see how this unlocks new and more complex workflows for you and your team! Let us know if you have any feedback.