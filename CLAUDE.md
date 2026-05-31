# Claude Instructions

This file contains instructions for Claude to follow when working on this project.

## Deployment

To redeploy the application, use the  script from :



## Instructions

- **Update Documentation**: Every time we add, remove, or update API endpoints or features, update  with detailed usage instructions.
- **Bruno Configuration**: Bruno configuration must be kept in sync with actual API endpoints. When updating, removing, or adding something to functions, changes must be reflected in Bruno config files immediately.
- **Test Preservation**: When code is not being updated, added, or removed, no content should change in tests. This is a strict shield against LLM mistakes; do not modify existing tests unless the feature they test is explicitly being changed.
- **Structured Logging**:  must always accept an object as the first parameter to facilitate log ingestion by Loki. Avoid passing simple strings; instead, wrap context and messages in an object (e.g., ).

## Vibe Coding & TDD Workflow

We follow "Vibe Coding" principles where the AI acts as an Orchestrator and TDD is the safety net.

### The Workflow
1. **Define Intent (The Blueprint)**
   - Define the interface or requirement first. Do not jump to code.
   - Example: "Define a TypeScript interface for a service that handles..."

2. **Generate Tests First (The Contract)**
   - Write or update a complete test suite defining the expected behavior.
   - Do NOT implement the service yet (or if backfilling, verify behavior).
   - The test suite is the "Contract" that defines success.

3. **The Red-to-Green "Vibe"**
   - Run the tests. Failures reveal the gap.
   - Implement the service/controller to make these specific tests pass.
   - Do not write bloat; only fulfill the contract.

4. **Shadow Technical Debt Prevention**
   - Always check for existing tests before searching for files.
   - Never skip tests for speed.
