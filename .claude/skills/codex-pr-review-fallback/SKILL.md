---
name: codex-pr-review-fallback
description: Use ChatGPT Codex Connector as the automatic PR review fallback when GitHub Copilot Code Review is blocked by quota, budget, access, or prolonged non-response.
---

# Codex PR Review Fallback

GitHub Copilot Code Review remains the primary remote AI review source.

Switch to ChatGPT Codex Connector automatically only when Copilot is blocked by quota, budget, access, or prolonged non-response after request and verification attempts.

Trigger:

```powershell
gh pr comment <PR> --body '@codex review'
```

Verify:

```powershell
gh pr view <PR> --json headRefOid,reviews,comments,statusCheckRollup
gh api repos/padosoft/laravel-evidence-risk-review-admin/pulls/<PR>/reviews
gh api repos/padosoft/laravel-evidence-risk-review-admin/issues/<PR>/comments
gh api repos/padosoft/laravel-evidence-risk-review-admin/pulls/<PR>/comments
```

Codex has responded when `chatgpt-codex-connector[bot]` appears as a review/comment/reaction. Prefer a review whose `Reviewed commit:` marker matches the current head commit prefix.

Fix actionable findings, rerun local gates, push, and comment `@codex review` again until clear.
