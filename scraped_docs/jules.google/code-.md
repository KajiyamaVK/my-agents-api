Source: https://jules.google/docs/code/

# Reviewing code changes

Once you approve a plan, Jules begins working inside a virtual machine. As it completes steps, you’ll see an activity log with Jules’ thoughts and code updates. This page walks you through what to look for and how to respond.

## Activity feed

[Section titled “Activity feed”](#activity-feed)

As Jules works, you’ll see a real-time **activity feed** that logs:

*   Each step it completes
*   Descriptions of what it did
*   Any outputs or errors encountered
*   Requests for additional information or feedback

This feed gives you insight into Jules’ decision-making and progress.

## Code diffs

[Section titled “Code diffs”](#code-diffs)

When Jules changes code, you’ll see a **mini diff** directly in the feed. For a more complete view:

*   On the right pane, you can view a full screen expanded **diff editor** to see all changes across files
*   The **diff editor** only shows files where it modified or added code.
*   Expand the diff editor to full screen, or drag the left sidebar of the diff editor to slide it to your preferred width

You can download and copy code that Jules has written from the download and copy icons located in the top right of the diff editor panel. When you copy code, only the updated code will save to your clip board (not the full diff).

This is your central hub for understanding the scope of the changes Jules made to your repo.

![Screenshot of feedback view](/docs/_astro/feedback.8l67aYbh_Z1gWb9f.webp)

## Interactive feedback

[Section titled “Interactive feedback”](#interactive-feedback)

You can interact with Jules in real-time through the chat box:

*   Ask it to revise logic or naming
*   Request additional tests or cleanup
*   Give corrections like “return an empty string instead of None”

## Task summary

[Section titled “Task summary”](#task-summary)

When the task completes, Jules provides a final summary which includes:

*   ✅ **Files changed**
*   ⏱ **Total runtime**
*   ➕ **Lines of code added/changed**
*   🌿 **Branch name** and **commit message**

![Screenshot of summary](/docs/_astro/done.TcJfaelI_22FvfH.webp)

## Pushing to GitHub

[Section titled “Pushing to GitHub”](#pushing-to-github)

Click **Publish branch** or **Publish PR** to push Jules’ changes to GitHub:

*   Jules will appear as a commit author on the branch, if you manually create a PR from the branch, you will be the PR author
*   When publishing a PR, Jules will appear as the creator of the PR

Once a branch is published, you can continue editing the branch, review it as a GitHub PR, or delete it.

Once a PR is created, you can send it for review, or merge the PR into your codebase.