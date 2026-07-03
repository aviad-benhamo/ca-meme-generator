# AGENTS.md

This file defines how AI coding agents should work in this repository.

This repository follows the GitHub Repository Standard (GRS). Use the GRS as the source of truth for repository structure, documentation standards, labels, releases, security expectations, audit workflow, and repository health review.

## Communication Rules

- Chat and discussion with Aviad should be in Hebrew.
- Code, file names, commit messages, technical prompts, test names, documentation, GitHub issues, and technical artifacts should be in English.

## GRS Compliance

- Follow the GitHub Repository Standard (GRS) for repository-level conventions.
- Source of truth: `aviad-benhamo/github-repository-standard`.
- Main standard file: `GRS.md`.
- Standard labels: `tools/labels/labels-grs.json`.
- Repository-specific labels: `tools/labels/repos/*.labels.json`.
- Do not duplicate or reinvent GRS rules inside this repository unless a documented exception is required.
- Keep documentation, labels, release flow, repository metadata, and AI workflow aligned with GRS.
- If GRS and repository-specific notes conflict, stop and ask for clarification unless the exception is explicitly documented.

## GitHub Workflow

- For GitHub issues, comments, pull requests, labels, and repository metadata, use the connected GitHub connector/plugin first.
- Prefer `mcp__codex_apps__github` as the default path. Do not infer that a resource is missing from `Not Found` errors returned by other GitHub MCP tools, and read back important issue comments after writing them when practical.
- Do not use public GitHub web browsing to access private repository issues or metadata.
- Do not repeatedly try public web access when the connector is available.
- Do not treat public GitHub browsing failures as evidence that a repository, issue, or PR is missing.
- Use `gh` CLI only when explicitly requested by the user or when running approved local tooling such as GRS label synchronization scripts.
- Read the relevant GitHub issue before starting issue work.
- Keep work scoped to the issue or task.
- Add a final implementation summary comment to the relevant GitHub issue when the task is complete.
- Do not close issues unless explicitly instructed.
- Creating or updating GitHub issues/comments is allowed when requested or required by the issue workflow.
- Pushing branches, opening PRs, or triggering remote CI should not happen unless explicitly requested.

## Branch and Commit Rules

- Do not push directly to `main`.
- The local `main` branch on this machine is the default source of truth for creating issue branches.
- When starting issue work, create the dedicated issue branch from the current local `main`.
- Do not automatically base issue branches on `origin/main`, GitHub `main`, or a freshly fetched upstream state.
- If local `main` and remote `main` appear to diverge, stop and report the situation before choosing a base.
- Do not run `git pull`, `git reset`, `git rebase`, or other synchronization commands that may change local `main` unless explicitly instructed.
- Work on a dedicated branch for each issue or task.
- Prefer concise English commit messages.
- Prefer Conventional Commits where appropriate.

## Local-First Commit Policy

- Default workflow is local-first.
- Do not create commits unless explicitly instructed by the user.
- Do not push branches to GitHub unless explicitly instructed by the user.
- After completing changes, leave the working tree ready for user review.
- Provide a clear summary of changed files, validation performed, and recommended next steps.
- The user normally reviews changes locally, creates the commit, merges into local `main`, and pushes to GitHub when ready.
- PR-based workflow is allowed only when explicitly requested.

## Scope Control

- Keep changes narrowly scoped.
- Do not perform unrelated cleanup.
- Do not introduce broad refactors unless explicitly requested.
- Do not silently change public behavior.
- If a larger problem is discovered, document it or propose a separate issue.

## Documentation Rules

- Documentation must be English-only.
- Documentation should be professional, concise, self-contained, and GRS-compliant.
- Do not include private notes, chat history, secrets, credentials, or local machine paths.
- Keep repository documentation usable without relying on previous conversations.

## Changelog and Release Rules
### Work Unit Philosophy

- The GitHub Issue is the primary unit of work.
- Commits are implementation details and should not determine changelog entries or release timing.
- Releases represent completed milestones composed of one or more GitHub Issues.
- Update `CHANGELOG.md` based on meaningful completed work, not on commit count or elapsed time.

### Changelog
- Treat `CHANGELOG.md` as the human-readable release history for the repository.
- For every user-facing change, bug fix, feature, documentation baseline update, repository-standard update, release-preparation task, or meaningful maintenance change, check whether `CHANGELOG.md` must be updated.
- Add pending changes under the top-level `[Unreleased]` section.
- Keep `[Unreleased]` as the staging area for the next release.
- Do not move entries from `[Unreleased]` into a numbered version section unless explicitly instructed as part of release preparation.
- During release preparation, recommend the next version number using Semantic Versioning:
  - PATCH (`x.y.z -> x.y.z+1`) for bug fixes, small documentation corrections, and maintenance-only changes.
  - MINOR (`x.y.z -> x.(y+1).0`) for new features, meaningful documentation baselines, repository-standard milestones, or non-breaking behavior changes.
  - MAJOR (`x.y.z -> (x+1).0.0`) only for stable projects with breaking changes or a deliberate `1.0.0` stability decision.
  - Use `0.x.x` versions for early public releases that are not yet declared stable.
- Do not create Git tags, GitHub Releases, or publish a repository unless explicitly instructed by Aviad.
- Every GitHub Release must have a Git tag in the format `vMAJOR.MINOR.PATCH`.
- Release notes should be based on the relevant numbered section in `CHANGELOG.md`.
- After a release is published, leave a new empty `[Unreleased]` section for future changes.

## Label Workflow

- GitHub labels must follow GRS.
- Standard labels come from the GRS baseline.
- Repository-specific `Area:*` labels should come from the repo-specific labels file when available.
- Do not invent new label groups without updating GRS or documenting an exception.

## Security Rules

- Never introduce secrets, credentials, tokens, certificates, or private keys.
- Never commit `.env` files.
- Do not bypass authentication, authorization, validation, or security checks.
- Treat security-sensitive changes as dedicated issue work.
- Review AI-generated security changes carefully before merge.

## Validation Rules

- Inspect relevant local files before changing them.
- Run relevant verification commands after changes.
- If tests or checks are unavailable, state that clearly and provide manual validation steps.
- Do not claim validation was performed unless it actually was.

## AI Behavior Rules

- Prefer consistency over cleverness.
- Follow the existing architecture, naming, and style.
- Ask or document assumptions when requirements are ambiguous.
- Avoid speculative changes.
- Summarize meaningful tradeoffs when proposing plans.
- Keep implementation summaries factual and reviewable.

## Repository-Specific Notes

Customize this section for the repository.

Recommended fields:

- Project name:
- Repository type/state:
- Main architecture docs:
- Main commands:
- Test strategy:
- Build or release process:
- Deployment notes:
- Project-specific restrictions:
