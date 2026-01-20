Source: https://jules.google/docs/changelog/2025-10-03

# Introducing the Jules API

October 3, 2025

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