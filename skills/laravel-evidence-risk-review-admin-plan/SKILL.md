---
name: laravel-evidence-risk-review-admin-plan
description: Continue or resume the padosoft/laravel-evidence-risk-review-admin package implementation. Use when working in this repo, when context was compacted or lost, or when enforcing branch, PR, testing, frontend, Laravel package, standalone-agnostic, and release rules.
---

# Laravel Evidence Risk Review Admin Plan

This is the full repo-local skill. Keep the Claude/Copilot summary at `.claude/skills/laravel-evidence-risk-review-admin-plan/SKILL.md` in sync when changing process rules.

## Start Here

Read these files before editing application code:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/IMPLEMENTATION_PLAN.md`
4. `docs/RULES.md`
5. `docs/PROGRESS.md`
6. `docs/LESSON.md`

The canonical full specification is saved at:

```text
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md
```

The design handoff is saved at:

```text
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\README.md
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\project\index.html
```

If those files are unavailable, continue from `docs/IMPLEMENTATION_PLAN.md` and the latest `docs/PROGRESS.md` entry.

## Procedure

1. Run `git status --short --branch` before changing files.
2. Re-read `docs/LESSON.md` and pass relevant contents to any background worker.
3. Work only on the current macro/subtask branch.
4. Define objective, implementation details, and guardrails for the slice.
5. Preserve standalone-agnostic boundaries.
6. Add or update tests with the change.
7. Run relevant local gates.
8. While the temporary review override is active, skip per-task Copilot/Codex review and record that deep review is deferred to the final roadmap pass.
9. Update `docs/PROGRESS.md`.
10. Update `docs/LESSON.md` when learning something durable.
11. If remote PR/CI steps cannot run, record the blocker and next action.

CI note: before W7, the remote CI gate means no required checks are failing or pending. W7 introduces GitHub Actions; after that, every PR must wait for configured CI to pass.

Release/CI lessons:

- Verify npm lock files with `npx -p npm@10 npm ci` because GitHub uses Node 22/npm 10.
- Keep Composer `audit.block-insecure=false` scoped to CI legacy Laravel compatibility cells only.
- Commit built release assets under `public/vendor/evidence-risk-review-admin` for v1.0.0.
- If local Playwright hangs three times, record the exemption and require online Playwright CI before merge.

## Guardrails

- No AskMyDocs references or dependencies.
- No core business logic in this admin package.
- Core package remains a suggested HTTP provider unless the plan changes.
- Middleware never resolves empty.
- SPA states are explicit, testable, and accessible.
- UI tasks require Vitest and Playwright.
- Keep `phpunit.xml`, Vitest, and Playwright configs aligned with new tests.

## Review Fallback

Per current override, do not run per-W AI reviews. For the final deep pass, prefer Copilot. If Copilot is blocked by quota, budget, access, or prolonged non-response, trigger ChatGPT Codex Connector with:

```powershell
gh pr comment <PR> --body '@codex review'
```

Verify `chatgpt-codex-connector[bot]` responds on the current commit before treating the fallback gate as complete.
