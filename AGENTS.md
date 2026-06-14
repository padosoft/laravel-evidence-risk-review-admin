# Laravel Evidence Risk Review Admin Agent Guide

This repository is the standalone Laravel admin package:

```text
padosoft/laravel-evidence-risk-review-admin
```

Canonical implementation spec:

```text
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md
```

Design handoff:

```text
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\README.md
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\project\index.html
```

If those files are unavailable, continue from `docs/IMPLEMENTATION_PLAN.md` and the latest `docs/PROGRESS.md` entry.

If context is missing, read these files first:

- `docs/IMPLEMENTATION_PLAN.md`
- `docs/RULES.md`
- `docs/PROGRESS.md`
- `docs/LESSON.md`
- `skills/laravel-evidence-risk-review-admin-plan/SKILL.md`
- `.claude/skills/copilot-pr-review-loop/SKILL.md`
- `.claude/skills/codex-pr-review-fallback/SKILL.md`
- `.github/copilot-instructions.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `CLAUDE.md`

## Operating Rules

- Treat the provided HTML/CSS/JS prototype as the accepted design source. Recreate it in production React/Vite code; do not ship the prototype runtime as-is.
- Temporary review strategy override: do not launch local Copilot, GitHub Copilot, or Codex reviews for every W/subtask. Keep local gates, PRs, merges, and CI checks. Run one deep AI review over the full roadmap diff before final hardening/release. Fix valid review feedback already received, but do not request another per-W pass.
- Treat this as a reusable Laravel package, not an AskMyDocs feature branch.
- The package must stay 100% standalone-agnostic: no dependency, namespace, schema, or symbol leak from AskMyDocs or sibling products.
- Target PHP `^8.3`, Laravel `^11|^12|^13`; local validation should include Herd PHP 8.5 when available. CI matrix must cover PHP 8.3, 8.4, and 8.5 with compatible Laravel/Testbench cells.
- `padosoft/laravel-evidence-risk-review` is on Packagist, but this admin package consumes its HTTP API and supports external/remote core installs, so keep it as `suggest`, not a hard `require`, unless the spec changes.
- Do not reimplement core risk, evidence, profile, tier, LLM, or review-log business logic in this package.
- Middleware must never resolve to an empty array; default to `web,auth`, and fall back to `web` if env parsing yields empty.
- All SPA async regions need stable `data-testid`, `data-state`, and `aria-busy` conventions.
- UI/UX tasks require Vitest and Playwright interaction scenarios.
- Update `docs/PROGRESS.md` after meaningful work.
- Update `docs/LESSON.md` when discovering setup facts, API decisions, review feedback, or test workarounds that would save the next session time.
- Ensure `phpunit.xml`, Vitest, and Playwright configs include every test family introduced by the work.
- If Composer appears stuck, retry with `--no-interaction --no-ansi`. If even `composer --version` times out, record the blocker separately from code validation and retry on the next subtask.
- After W7 introduces CI, remote CI is mandatory for every PR and must pass before merge.

## Branch And PR Loop

Bootstrap is the only direct `task/* -> main` exception. After bootstrap, use a macro branch for each macro task. For each coherent subtask, create a subtask branch and PR it into the current macro branch. When the macro is complete, open the macro PR into `main`.

Planned macro branches:

- `macro/w1-package-skeleton`
- `macro/w2-spa-foundation`
- `macro/w3-read-screens`
- `macro/w4-write-settings`
- `macro/w5-playwright-e2e`
- `macro/w6-host-boot-integration`
- `macro/w7-dx-docs-ci`
- `macro/w8-hardening-release`

For every subtask:

1. Define the objective, implementation details, and guardrails before editing.
2. Implement the smallest coherent slice.
3. Add or update focused PHPUnit tests. Add Vitest and Playwright when UI/UX or browser behavior exists.
4. Run all relevant local gates.
5. While the temporary review strategy override is active, skip per-task local and PR AI review and record that the deep review is deferred to the final roadmap pass.
6. Push and open a PR into the macro branch, or into `main` only for the bootstrap exception.
7. Fix failing checks, update `docs/LESSON.md` when something useful is learned, push, and repeat until green.
8. Merge when local gates are green and remote CI has no failing or pending required checks. After W7, configured CI checks must pass.

Do not fake unavailable remote steps. If GitHub/CI access is blocked, record the exact blocker and next required action in `docs/PROGRESS.md`.

## GitHub Copilot Code Review

Per current project override, do not request per-W/per-subtask Copilot reviews. Keep these commands for the final deep review or if the override is explicitly removed.

Prefer requesting Copilot at PR creation time:

```powershell
gh pr create --base <base-branch> --head <head-branch> --title "<title>" --body-file <body-file> --reviewer '@copilot'
```

For an existing PR, first try:

```powershell
gh pr edit <PR> --add-reviewer '@copilot'
```

Quote `@copilot` in PowerShell. If that fails or no-ops after verification, try:

```powershell
gh pr edit <PR> --add-reviewer copilot-pull-request-reviewer
```

Always verify that review really started:

```powershell
gh api repos/padosoft/laravel-evidence-risk-review-admin/pulls/<PR>/requested_reviewers
gh pr view <PR> --json reviewRequests,reviews,comments,reviewDecision,statusCheckRollup
```

Copilot has started only if Copilot appears as pending reviewer, review, or comment. Command success alone is not enough.

## Codex Connector Fallback

Copilot is the first remote AI review source. If the final deep Copilot review is blocked by quota, budget, access, or prolonged non-response after documented request and verification attempts, switch automatically to ChatGPT Codex Connector:

```powershell
gh pr comment <PR> --body '@codex review'
```

Verify `chatgpt-codex-connector[bot]` appears in PR reviews/comments/reactions. Prefer a Codex review whose `Reviewed commit:` matches the current `headRefOid` prefix.

## Current Priority

Finish Bootstrap on `task/bootstrap-agent-rules`, merge it to `main`, then start `macro/w1-package-skeleton`.
