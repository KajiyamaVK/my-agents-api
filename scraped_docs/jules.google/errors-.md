Source: https://jules.google/docs/errors/

# Errors and failures

Even though Jules automates many parts of the development process, things can go wrong such as environment misconfigurations to task failures. This page covers how Jules reports errors, what it does automatically, and how you can debug issues.

## How errors are reported

[Section titled “How errors are reported”](#how-errors-are-reported)

Jules surfaces errors in two key places:

*   The **activity feed**, where the step failed is logged
*   A **notification badge** (red dot) in the UI

These errors can show up whether the task has failed completely or simply requires your intervention.

## Automatic retry behavior

[Section titled “Automatic retry behavior”](#automatic-retry-behavior)

Jules will attempt to retry failed steps automatically when possible. For example:

*   Network hiccups
*   Transient install errors
*   Slow dependency resolutions

After multiple retries, if the problem persists, the task will be marked as **failed**.

## Common causes of failure

[Section titled “Common causes of failure”](#common-causes-of-failure)

The most frequent issues are:

*   Incomplete or missing **environment setup scripts**
*   Prompts that are too vague or overly broad
*   Repos with unusual or nonstandard build systems
*   Long-running processes (like `npm run dev`) included in setup

## Debugging environment setup

[Section titled “Debugging environment setup”](#debugging-environment-setup)

You can retry a task by:

*   Clicking **rerun** from the task summary view
*   Modifying your setup script or prompt before restarting the task

Make sure to address any specific feedback from the failure logs.