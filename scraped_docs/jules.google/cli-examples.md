Source: https://jules.google/docs/cli/examples

# Practical Examples & Scripting

Jules Tools is designed to be scriptable and can be composed with other command-line tools.

Below are some examples of Jules Tools in action:

**1\. Create sessions from a TODO.md file:**

Assign each line item from a local TODO.md file as a new session in the current repository.

```
cat TODO.md | while IFS= read -r line; do  jules remote new --repo . --session "$line"done
```

**2\. Create a session from a GitHub Issue:**

Pipe the title of the first GitHub issue assigned to you directly into a new Jules session. (Requires the gh and jq CLIs).

```
gh issue list --assignee @me --limit 1 --json title \  | jq -r '.[0].title' \  | jules remote new --repo .
```

**3\. Use Gemini to analyze and assign the hardest issue to Jules:** Use the Gemini CLI to analyze your assigned GitHub issues, identify the most tedious one, and pipe its title to Jules.

```
gemini -p "find the most tedious issue, print it verbatim\n$(gh issue list --assignee @me)" \  | jules remote new --repo .
```