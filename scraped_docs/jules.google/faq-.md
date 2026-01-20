Source: https://jules.google/docs/faq/

# FAQ

## What is Jules?

[Section titled “What is Jules?”](#what-is-jules)

Jules is a software coding agent that helps you fix bugs, add documentation, update your app, and implement new features. It integrates with GitHub and works autonomously — meaning you can submit a task, go do something else, and return when it’s done. Jules is currently in Public Beta.

## Is Jules available without cost?

[Section titled “Is Jules available without cost?”](#is-jules-available-without-cost)

Jules has multiple plans to fit your development needs, including a plan available to all users without cost. See the [Limits and Plans](./../usage-limits) section for more details.

## How does Jules work under the hood?

[Section titled “How does Jules work under the hood?”](#how-does-jules-work-under-the-hood)

Each task runs in a fresh virtual machine where Jules clones your repo, installs dependencies, and makes changes based on your prompt. You can provide setup scripts to ensure your project builds and tests correctly.

## How does Jules run code, and what should I know about security?

[Section titled “How does Jules run code, and what should I know about security?”](#how-does-jules-run-code-and-what-should-i-know-about-security)

When you run code in Jules, it’s executed in a secure, cloud-based virtual machine (VM) with internet access. While this gives you powerful tools to test, build, and debug in context, it’s important to treat the environment with the same security precautions you would for any public or shared compute surface. If you’re not sure whether something is safe to run, we recommend reviewing it carefully (including non-code components). Jules is a large language model based system which operates on both the code and non-code files in a repository.

**You are responsible for the code you run.** That means:

*   **Don’t commit secrets** (like API keys, tokens, or credentials) to your repo, especially if you’re pulling code into Jules from a Git provider.
*   **Avoid known security vulnerabilities** in your dependencies or scripts. Consider following [GitHub’s Quickstart](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository) for securing your repository if you’re using GitHub.
*   **Be cautious with third-party packages or shell commands** that could compromise your system, your data, or others.

## Can Jules run long-lived commands like `npm run dev`?

[Section titled “Can Jules run long-lived commands like npm run dev?”](#can-jules-run-long-lived-commands-like-npm-run-dev)

No. Long-running processes like dev servers or watch scripts aren’t currently supported in setup scripts. Use discrete install/test commands instead.

## What languages does Jules support?

[Section titled “What languages does Jules support?”](#what-languages-does-jules-support)

Jules is language agnostic but works best with projects that use:

*   JavaScript/TypeScript
*   Python
*   Go
*   Java
*   Rust

Support depends on what’s installed on the VM and the clarity of your environment setup script.

## Can I leave Jules while its working?

[Section titled “Can I leave Jules while its working?”](#can-i-leave-jules-while-its-working)

Yes! Jules is designed to be autonomous. You can leave the app after submitting a task. Make sure to [enable notifications](../#enabling-notifications) so you’ll be alerted when a plan is ready or a task completes.

## How do I provide feedback or report a bug?

[Section titled “How do I provide feedback or report a bug?”](#how-do-i-provide-feedback-or-report-a-bug)

Click the **[feedback](../feedback)** button in the bottom left of the Jules UI. No account or tracking system required — feedback goes straight to the team.

## What happens if a task fails?

[Section titled “What happens if a task fails?”](#what-happens-if-a-task-fails)

Jules will retry automatically. If it continues to fail, it will mark the task as failed and notify you. Common causes include broken setup scripts or vague prompts.

You can revise and rerun the task once you’ve addressed the issue.

## How many tasks can I run?

[Section titled “How many tasks can I run?”](#how-many-tasks-can-i-run)

Limits are listed [here](./../usage-limits).

## Can I change which repos Jules has access to?

[Section titled “Can I change which repos Jules has access to?”](#can-i-change-which-repos-jules-has-access-to)

Yes. Go to your GitHub settings:

1.  Click your profile —> **settings**
2.  Select **applications** in the sidebar
3.  Find **Google Labs Jules** and click **configure**
4.  Adjust repository access

Then refresh Jules and your new repos will appear. [Learn more about managing tasks and repositories](./../tasks-repos).

## Does Jules train on private repos?

[Section titled “Does Jules train on private repos?”](#does-jules-train-on-private-repos)

No. Jules does **not** train on private repository content. Privacy is a core principle for Jules, and we do not use your private repositories to train models. [Learn more](https://jules.google.com/legal) about how your data is used to improve Jules.