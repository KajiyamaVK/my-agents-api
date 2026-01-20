Source: https://jules.google/docs/changelog/2025-11-10

# New Jules Tools CLI Updates: Side-by-Side Diffs, Repo Inference, and More

November 10, 2025

![Jules Tools](/docs/_astro/julestools2.DXhpIjxz_Z29bzv9.webp)

We’ve been busy shipping a bunch of new updates to the Jules Tools CLI to make your experience smoother and more powerful. Here’s a rundown of what’s new:

#### Parallel Task Execution

[Section titled “Parallel Task Execution”](#parallel-task-execution)

You can now start multiple parallel tasks for the same prompt using the `--parallel` flag with `jules remote new`. This is useful for getting multiple suggestions from Jules at once (max of 5).

*   **Added**: `--parallel` flag to `remote new` command.

#### v0.1.40 - WSL/Arch Linux Credential Fixes

[Section titled “v0.1.40 - WSL/Arch Linux Credential Fixes”](#v0140---wslarch-linux-credential-fixes)

We’ve refactored how we handle authentication to resolve credential issues for users on WSL and Arch Linux. This means broader platform support and no more login issues.

#### v0.1.39 - OAuth2 Error Handling Improvements

[Section titled “v0.1.39 - OAuth2 Error Handling Improvements”](#v0139---oauth2-error-handling-improvements)

We’ve enhanced our OAuth2 flow to be more resilient with better error recovery, making the authentication process more reliable.

#### v0.1.38 - Repository Inference Feature

[Section titled “v0.1.38 - Repository Inference Feature”](#v0138---repository-inference-feature)

To shorten CLI commands and reduce configuration, we’ve added repository inference. Now, Jules can automatically detect the repository from your current directory, so you don’t have to specify it manually.

#### v0.1.37 - PNPM Installation Fixes

[Section titled “v0.1.37 - PNPM Installation Fixes”](#v0137---pnpm-installation-fixes)

We’ve added better support for the PNPM package manager, ensuring full compatibility for a wider range of JavaScript projects.

#### v0.1.36 - Side-by-Side Diff Viewer + Bug Fixes

[Section titled “v0.1.36 - Side-by-Side Diff Viewer + Bug Fixes”](#v0136---side-by-side-diff-viewer--bug-fixes)

Reviewing code is now faster and more readable with the new side-by-side diff viewer in the TUI. We’ve also added comprehensive test coverage and fixed bugs related to auto-approval and timeout validation.