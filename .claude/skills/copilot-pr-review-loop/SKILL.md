---
name: copilot-pr-review-loop
description: Run the GitHub Copilot Code Review and CI loop when the final deep review is required or when the temporary per-W review override is removed.
---

# Copilot PR Review Loop

## Current Override

Per-W and per-subtask Copilot/Codex reviews are disabled for this roadmap. Use this skill for the final deep review or if the user explicitly removes the override.

## Open PR

Prefer:

```powershell
gh pr create --base <base-branch> --head <head-branch> --title "<title>" --body-file <body-file> --reviewer '@copilot'
```

For an existing PR:

```powershell
gh pr edit <PR> --add-reviewer '@copilot'
```

If that fails or no-ops after verification:

```powershell
gh pr edit <PR> --add-reviewer copilot-pull-request-reviewer
```

## Verify Copilot Started

```powershell
gh api repos/padosoft/laravel-evidence-risk-review-admin/pulls/<PR>/requested_reviewers
gh pr view <PR> --json reviewRequests,reviews,comments,reviewDecision,statusCheckRollup
```

Copilot started only when Copilot is visible in requested reviewers, review requests, reviews, or comments. Command success alone is not enough.

## Read Feedback

```powershell
gh pr view <PR> --json state,reviewDecision,mergeStateStatus,statusCheckRollup,reviews,comments,reviewRequests,headRefOid
gh api repos/padosoft/laravel-evidence-risk-review-admin/pulls/<PR>/reviews
gh api repos/padosoft/laravel-evidence-risk-review-admin/issues/<PR>/comments
gh api repos/padosoft/laravel-evidence-risk-review-admin/pulls/<PR>/comments
```

Fix actionable findings, rerun local gates, push, and re-request until clear.
