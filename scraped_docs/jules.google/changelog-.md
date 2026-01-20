Source: https://jules.google/docs/changelog/

# Changelog

![suggested](/docs/_astro/suggested.CKs87OFo_Z3hhig.webp)

Jules can now work proactively in the background to improve your code. With Suggested Tasks, Jules scans your repository for potential improvements and presents them on your repo page.

To get started, enable the proactive suggestions toggle on the repo page.

*   **Tackle the #TODOs**: In this initial release, Jules focuses on identifying `#TODO` comments in your code. It reads the context, formulates a plan, and presents it for your approval—turning idle comments into active solutions. More use cases coming soon.
    
*   **Continuous Improvement**: Once enabled, Jules continuously monitors your codebase. You don’t have to ask; just check your dashboard for new suggestions and approve the ones you want.
    

This experimental feature is available today for Google AI Pro and Ultra subscribers on up to five repositories.

Read more at: [Suggested Tasks](https://jules.google/docs/suggested-tasks/).

![scheduled](/docs/_astro/scheduled.AQyQ1slh_1DtfJI.webp)

You can now set recurring tasks for Jules. Whether it’s a weekly dependency check, a nightly lint fix, or a monthly cleanup, just define it once and Jules will handle the rest on your schedule.

To get started, navigate to the **Scheduled** tab on your repo page to configure your first task.

*   **Set it and forget it**: Define your maintenance chores once. Jules will wake up, perform the task, and open a PR without you needing to lift a finger.
    
*   **Never miss a beat**: No more manual prompts for the stuff that needs to happen every week. Ensure consistent code quality and dependency hygiene by automating your routine work.
    

This feature is available today for all Jules users.

Read more at: [Scheduled Tasks](https://jules.google/docs/scheduled-tasks/).

![Render](/docs/_astro/changelog-render.D9zwsE_A_Z20xMym.webp)

We’ve integrated with Render to handle the last mile of shipping code. Jules can now detect failed builds, analyze the logs, and push fixes to its PRs before you even know your build failed.

To enable this, go to your Render Dashboard, open the Help menu (top-right), and click Coding Agents to provision your API Key. Paste this key into Settings > Integrations in Jules.

1.  **Instant Recovery:** No more context switching to dig through console logs. Jules detects the failure immediately and identifies the root cause.
2.  **Proactive Fixes:** Instead of just alerting you to an error, Jules writes the code to fix it. Review the solution as a standard commit on your PR, merge it, and get back to green.

This integration is available now. Check out the [docs](/integrations) for the full setup guide, including enabling PR previews.

**Note:** For now, Jules only fixes PRs it has created.

![Repoless](/docs/_astro/repoless.DOwVSlX1_DurJe.webp)

You can now start a Jules task immediately without selecting a repository. We’ve removed the speed bump between your idea and your code, allowing you to capture that spark of inspiration without the overhead.

To trigger this, simply click the “X” next to the selected repo to start a fresh, repoless session.

*   **Skip the Detour**: Previously, starting a fresh journey meant hopping over to GitHub to create an empty repo first. Now, you can bypass that context switch entirely and keep your momentum.
    
*   **Instant Ideation**: Whether you are prototyping a new feature or writing a quick script, you can dive straight into the logic. Just describe what you want, and Jules gets to work.
    

This update is available now for all users starting a new task.

![Gemini 3](/docs/_astro/gemini3.D-MJdx3W_ZmxvfP.webp)

Gemini 3 Pro is now available in Jules. This is the newest generation of the Gemini family, bringing clearer reasoning, stronger instruction following, and a meaningful lift in day-to-day reliability.

*   **Coherent Planning**: Multi-step tasks hold together more naturally. The agent requires less management during transitions, meaning your work moves forward with fewer detours.
    
*   **Visual Verification**: Leveraging the improved multimodal capabilities of Gemini 3 Pro, Jules renders and verifies web app outcomes with significantly higher precision.
    
*   **Agentic Memories**: The new model utilizes context more effectively, helping Jules adapt to your coding preferences and project nuances more reliably over time.
    

Gemini 3 Pro is rolling out now to Google AI Ultra users and will be available to Pro users in the coming days.

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

![API](/docs/_astro/api.BIk2dddI_4ERpt.webp)

You can now programmatically access Jules’s capabilities to automate your work and build powerful integrations. The Jules API is designed to help you seamlessly integrate Jules into your existing development workflows, unlocking new ways to automate and enhance the entire software development lifecycle.

**With the API, you can:**

*   Create custom integrations with tools like Slack for “ChatOps” workflows, allowing you to assign tasks directly from your chat client.
*   Automate bug fixing and feature implementation by connecting Jules to your project management tools like Linear or Jira.
*   Integrate Jules directly into your CI/CD pipelines in services like GitHub Actions.

Here’s a quick example of how to create a new task (a “Session”) using a cURL command:

```
curl 'https://jules.googleapis.com/v1alpha/sessions' \    -X POST \    -H "Content-Type: application/json" \    -H 'X-Goog-Api-Key: YOUR_API_KEY' \    -d '{      "prompt": "Create a boba app!",      "sourceContext": {        "source": "sources/github/bobalover/boba",        "githubRepoContext": {          "startingBranch": "main"        }      },      "title": "Boba App"    }'
```

For more examples see the [API documentation](https://developers.google.com/jules/api).

![Jules Tools](/docs/_astro/julestools.5p-1nZtH_Z2224ry.webp)

We’re launching Jules Tools, a new command-line interface designed to give you direct control over your AI coding agent, making it scriptable, customizable, and easy to integrate into your existing workflows.

**Key Features:**

*   **Direct Control:** Create tasks (jules remote new), list active sessions (jules remote list), and monitor Jules without leaving your command line.
*   **Apply Patches Locally:** Instantly pull work-in-progress code from an active Jules session and apply it to your local machine. This lets you test changes immediately, without waiting for a commit to GitHub.
*   **Scriptable & Composable:** Integrate Jules into your automations by piping in output from other tools like gh, jq, or cat.
*   **Interactive Dashboard:** For a more guided experience, launch the built-in terminal user interface (TUI) to create and manage tasks step-by-step.

**How to Install:**

Install globally via npm: `npm install -g @google/jules`

Or run directly without a permanent installation: `npx @google/jules`

**Starter Commands to Try:**

See all available commands: `jules help`

List all repos connected to Jules: `jules remote list --repo`

Create a new task in a specific repo: `jules remote new --repo torvalds/linux --session "write unit tests"`

  

If you run into any issues, please share your experience with us via in-app feedback or on our [Discord channel](https://discord.com/channels/1172568727942860810/1374062797519847505).

![Environment Variables](/docs/_astro/envar.Dhbt8Wwu_eCuVm.webp)

You can now provide Jules with environment variables at the repository level. This enables Jules to access the project-specific configurations it needs to complete tasks, like running builds, executing tests, or interacting with different services.

**How It Works**:

*   **Add Variables in Repo Settings:** Navigate to your repository’s settings page to add your environment variables. They will be associated directly with your project.
*   **Enable for a Task:** When you start a new task with Jules, you’ll have the option to make these environment variables available to it.
*   **Task-Long Access:** Once enabled for a specific task, Jules will have access to the variables for the entire duration of that task. Please note that this setting cannot be changed after the task has begun.

We’re excited to see how this unlocks new and more complex workflows for you and your team! Let us know if you have any feedback.

![Memory](/docs/_astro/memory.C9CEa_2-_2m2Klf.webp)

**Jules Memory for Repositories:** We’re excited to introduce a new Memory feature! Jules now has the ability to learn from your interactions.

*   **How it works:** During a task, Jules will save your preferences, nudges, and corrections.
*   **The benefit:** The next time you run the same or a similar task in that specific repository, Jules will reference its memory to better anticipate your needs and follow your established patterns, leading to more accurate results with less guidance.
*   **Settings:** You can toggle memory on or off for the repo in the repo settings page under “Knowledge”

![File Selector](/docs/_astro/fileselector.7WfNoQbn_2m4uUx.webp)

You can now tell Jules exactly which files to work with for any given task. Use the new file selector to easily and precisely reference specific files.

This removes ambiguity and gives you more granular control over Jules’s actions, helping to tighten the context for your task.

![Jules responding to a PR comment](/docs/_astro/changelog-pr-comments.Cfoy5hKj_Z1h2RAm.webp)

Jules is now able to read and respond to your comments on pull requests!

When you start a review, Jules will add a 👀 emoji to each comment to let you know it’s been read. Based on your feedback, Jules will then push a commit with the requested changes.

For more control, you can switch to **Reactive Mode** in your [global Jules UI settings](https://jules.google.com/settings). In this mode, Jules will only act on comments where you specifically mention `@Jules`.

![image upload](/docs/_astro/changelog-019.C2qW8uJn_Z3euJL.webp)

Ahoy, mateys! To celebrate International Talk Like a Pirate Day, we’ve given Jules a temporary map to the treasure.

*   Jules Speaks Pirate: You’ll find your AI agent’s responses are a bit more… swashbuckling… for today only.
    
*   Same Great Logic: Fear not! Beneath the eyepatch and Jolly Roger, it’s the same powerful coding engine ready to help you plunder that backlog and send bugs to Davy Jones’ locker.
    

![image upload](/docs/_astro/image-upload.CXDvQ88D_Z1J34qe.webp)

You can now upload images when creating a task in Jules. Use this to show frontend bugs, design inspiration, UI mocks, or any visual context you want Jules to consider while generating code.

For now:

*   Only JPEG and PNG formats are supported.
*   You can uplaod as many images as you want, as long as the total size is under 5MB.
*   Image upload is only supported at task creation (we’re working on enabling it for follow-up prompts soon).

Note: If your task involves using assets (e.g. logos) directly in code, those must still be committed to your GitHub repo.

[Read more](https://jules.google/docs/running-tasks/) about Jules image support.

![Stacked Diff](/docs/_astro/changelog-017-fade.BsxUDclU_Z1eGKg5.webp)

To improve the code review experience, we’ve introduced a new stacked layout for the diff viewer. This change displays diffs for multiple files vertically on a single screen. The stacked view makes it easier to see related changes across your codebase at a glance, providing better context and speeding up your review process.

Changes:

*   The diff viewer now stacks file changes vertically by default
*   You can also toggle back to the previous tabbed diff viewer

![Improved Critic](/docs/_astro/changelog-016.DcExNlSl_ZDHzjl.webp)

We’ve shipped significant improvements to the Jules critic agent, making its feedback more insightful and reliable. To increase transparency and give you more insight into its evaluation process, you can now see the critic’s real-time analysis as it works.

Changes:

*   The critic’s thought process is now visible in the UI, showing its step-by-step evaluation of the code in real-time.
*   The critic’s now incorporates more contextual information when making decisions, leading to more accurate and relevant feedback on potential bugs and logic flaws.

![Sample Prompts](/docs/_astro/changelog-015.CXL47v6I_ZPLQu4.webp)

To help new users get started with Jules, we’ve added sample prompts to the home page. These static prompts provide examples of how to use Jules and can be added to the text box with a single click.

Changes:

*   Sample prompts are now displayed on the home page for all users.
*   Clicking on a sample prompt will add the text of the prompt to the input box.

![Images in diff viewer](/docs/_astro/imagesdiffviewer.CfwMUfrJ_ZOic9c.webp)

Jules now intelligently renders images within the diff viewer, providing an immediate visual context for your modifications.

This means:

*   Instant Visual Feedback: When Jules generates images (like charts, diagrams, or web UI screenshots), you’ll see the actual image in the diff, not just its code representation.
*   Streamlined Workflow: No need to switch between tools or download files to see the results. Jules keeps everything in one place.

Try it out! Ask Jules to render an output, like a graph based on data, and commit it to your repository. You’ll be able to see the generated image seamlessly within your diff viewer.

![Export](/docs/_astro/exportatanytime.CJ8dxdjQ_ZPOQjW.webp)

You’re now in full control of when your code gets to GitHub. No need to wait for a task to finish or ask Jules to do it for you. At any point during a task, just click the GitHub icon in the top right to publish the current work-in-progress as a new branch or open a pull request. This gives you more flexibility and control to review, test, or take over whenever you’re ready.

We heard your feedback about running into disk space limits on larger projects. To address this, we’ve significantly increased the available disk space in the Jules VM to 20GB. This provides more room for large dependencies, build artifacts, and complex repositories, reducing disk-related failures so Jules can tackle bigger tasks. Happy Julesing!

![Post Beta](/docs/_astro/websearch.DYAsPzEM_ZwyNyo.webp)

Jules can now proactively search the web for relevant content, documentation, or code snippets to help complete your tasks. This means Jules can get the information it needs, resulting in more accurate and successful task completion.

In Summary:

*   Jules can find the latest documentation for dependencies/libraries you’re using
*   Jules can proactively find examples or code snippets that can help inform its implementation

**Note**: web search works best when working on technical documentation. Queries like: “What is the latest news today?” are not supported.

![Post Beta](/docs/_astro/interactiveplan.BQJ_-8Fr_2dCy3W.webp)

Meet Interactive Plan. Instead of jumping straight to the solution, Jules will now read your codebase, ask clarifying questions, and work with you to refine the plan. This collaborative approach gives you more control and ensures you’re on the same page, leading to higher-quality code and a more reliable solution.

In summary:

*   Trigger the interactive plan from the dropdown when you start a task
*   Jules will start a brainstorm with you and ask clarifying questions

![Critic Agent](/docs/_astro/critic.M-N27lZA_ZXQtTP.webp)

Great developers don’t just write code, they question it. And now, so does Jules. We’ve built the Jules critic agent to ensure that every line of code isn’t just functional, but robust, secure, and efficient. It acts as an internal peer reviewer, challenging every proposed change to elevate the quality of the final output.

Some high level notes:

*   **Critic-augmented generation:** The Jules critic is integrated directly into the generation process. Every proposed change undergoes adversarial review before completion.
    
*   **Improved code quality:** The critic flags subtle bugs, missed edge cases, and inefficient code. Jules then uses this feedback to improve the patch in real-time.
    
*   **A new kind of review:** The critic is not just another linter or test. It understands the intent and context behind code, similar to a human peer reviewer.
    
*   **Built on research:** This feature draws on research into multi-step, tool interactive critiquing and actor-critic reinforcement learning, where an “actor” generates and a “critic” evaluates.
    

![Post Beta](/docs/_astro/computeruse.DsMoFBka_Z1cKxdK.webp)

Next time you are working on a front end project with Jules, ask it to verify its work and it’ll render the website and send you back a screenshot!

*   Ask Jules to complete a web development task and to verify the front end
*   Jules will send you a screenshot of the front end along with any code changes
*   The default Jules base image now includes Playwright for front end testing
*   Users can also add images in the form of public URLs for Jules to use as input

![Post Beta](/docs/_astro/post-beta.CHZ_x9Mj_Wiixs.webp)

Today we are thrilled to announce that Jules is no longer in beta! Since launch just two months ago, Jules has passed over 140k public commits. Thank you to our amazing beta users for all your support and feedback.

In addition, we’re launching our pricing plans to unlock higher task limits, along with a bunch of quality improvements in the Jules app and agent. Here are the details:

*   Get higher task limits through the Google AI Pro and Ultra plans. More details at [Limits and Plans](./../usage-limits).
*   Jules now uses the power of Gemini 2.5 thinking when creating its plan, resulting in higher quality plans and more complete tasks
*   Numerous bug fixes so Jules gets stuck less, and is better at following your instructions in agents.md

![Env Snapshot](/docs/_astro/envsnapshot.Da7EUEdt_e5gX8.webp)

Jules now creates a snapshot of your environment when you add environment setup scripts. For complicated environment, users should see faster and more consistent task execution.

In summary:

*   Jules will now snapshot your environment when you provide an environment setup script
*   Snapshots are loaded automatically next time you run a task
*   This provides for faster task startups, especially for complex environments
*   You can find environment configuration by clicking the “codebase” in the left hand panel, or by clicking the “configure environment” button in the task pane.

![Open a PR](/docs/_astro/openapr.B4vE52yX_1KUfVl.webp)

Closing the loop from task to merge 🤝

Jules can now open a pull request directly from the UI. After a task completes, just use the new dropdown next to the ‘Publish Branch’ button to open a PR. Jules will request to merge the newly published branch into main, streamlining your entire workflow. Less context switching, faster merging.

![Bun](/docs/_astro/jules_3bun.CJ2DViw__ZNLTEL.webp)

Jules now supports [Bun](https://bun.sh/). You can run tasks using Bun out of the box, no extra setup required. This expands compatibility for projects that use Bun instead of Node.

[Read more](https://jules.google.com/docs/environment/) about the jules base image and what tooling works with Jules.

![Task controls](/docs/_astro/polish-tasks-changelog.Bzf_pBWz_Z1mwEs.webp)

*   Pause, resume, and delete tasks—without losing your sense of place. Available from sidebar and repo view. You can even quickly copy task urls!
*   Non-urgent task icons are now more recessive
*   Certain hover states—which did not look good—have been toned back.
*   System messages have more consistent padding and borders

[Learn more about running a task.](https://jules.google.com/docs/running-tasks/)

![Assign to Jules](/docs/_astro/assign-to-jules.DFMcEzUY_lXKPx.webp)

Add the label ‘jules’ to any GitHub issue to start a task in Jules. That’s it—label on, task live.

How to summon Jules:

*   Open a GitHub issue.
*   Click the gear next to “Labels”.
*   Add the label ‘jules.’

Make sure the Jules GitHub App has access to your repo. After that, Jules takes it from there. [Read more about running tasks in Jules](https://jules.google/docs/running-tasks/)!

![Jules environment updates](/docs/_astro/agents-md-support.COimRein_13z6cT.webp)

We’ve shipped a big upgrade to the Jules agent under the hood.

What’s new:

*   **Smarter context.** Jules reads from AGENTS.md if it’s in your repo.
*   **Improved performance.** Tasks now complete faster—no numbers to share just yet, but you’ll feel it.
*   **Significantly reduced punting.** We tightened the loop to keep Jules moving forward.
*   **More reliable setup.** If you’ve added an environment setup script, Jules now runs it consistently.
*   **Better test habits.** Jules is more likely to write and run tests on its own.

Check out the [Getting Started](https://jules.google/docs/) guide to learn more about AGENTS.md support.

![Jules environment updates](/docs/_astro/changelog-env-update.C-4Kcp7e_Z1a9xXQ.webp)

We’ve overhauled the Jules development environment to move beyond the default Ubuntu 24.04 LTS packages. This includes:

*   Explicitly installing newer versions of key toolchains like Rust, Node, and Python, addressing long-standing version issues.
*   Adding finer-grained control over installation steps via custom scripts instead of relying solely on apt.
*   Introducing support for multiple runtimes, improved isolation, and version pinning to reduce drift and better match developer expectations.

These changes unblock several issues developers encountered with outdated dependencies and improve alignment with modern project requirements.

[Read about the Jules environment setup to learn more about what’s pre-installed.](https://jules.google/docs/environment/)

![Jules code view](/docs/_astro/jules-copy-paste-download.Bh0k6Pa9_ZL8pAP.webp)

**Performance upgrades:** Enjoy a smoother, faster Jules experience with recent under-the-hood improvements.

**Quickly copy and download code:** New copy and download buttons are now available in the code view pane, making it easier to grab your code directly from Jules.

**Stay focused with task modals:** Initiate multiple tasks seamlessly through a new modal option, allowing you to keep your context and workflow intact. [Learn more](https://jules.google/docs/tasks-repos/) about kicking off tasks.

**Adjustable code panel:** Customize your workspace by adjusting the width of the code panel to your preferred viewing experience.

[Check out the docs](https://jules.google/docs/code/) to learn more about how to download code that Jules writes.

This week, our focus has been on improving reliability, fixing our GitHub integration, and scaling capacity.

**Here’s what’s we shipped:**

*   Updated our limits to 60 tasks per day, 5 concurrent.
*   We substantially improved the reliability of the GitHub sync. Export to GitHub should also be fixed on previously created tasks.
*   We’ve decreased the number of failure cases by 2/3

Learn more [about usage limits.](./../usage-limits)

We’ve been heads down improving stability and fixing bugs—big and small—to make Jules faster, smoother, and more reliable for you.

**Here’s what’s fixed:**

*   Upgraded our queuing system and added more compute to reduce wait times during peak usage
*   Publish Branch button is now part of the summary UI in the activity feed so it’s easier to find
*   Bug vixes for task status and mobile

[Learn more](https://jules.google.com/docs/code/#pushing-to-github) about how to publish a branch on GitHub.

![Jules dashboard](/docs/_astro/jules-changelog-og-image.CksfgUSk_1wDNHc.webp)

Today, we’re launching [**Jules,**](https://jules.google.com) a new AI coding agent.

Jules helps you move faster by working autonomously on tasks in your GitHub repo. It can fix bugs, update dependencies, migrate code, and add new features.

Once you give Jules a task, it spins up a fresh dev environment in a VM, installs dependencies, writes tests, makes the changes, runs the tests, and opens a pull request. Jules shows its work as it makes progress, so you never have to guess what code it’s writing, or what it’s thinking.

**What Jules can do today**

*   Fix bugs with test verified patches
*   Handle version bumps and dependency upgrades
*   Perform scoped code transformations
*   Migrate code across languages or frameworks
*   Ship isolated, scoped, features
*   Open PRs with runnable code and test results

[Get started with the Jules documentation](/), and visit [jules.google.com](https://jules.google.com) to run your first Jules task.