---
name: laravel-evidence-risk-review-admin-plan
description: Resume or enforce the padosoft/laravel-evidence-risk-review-admin implementation plan.
---

# Laravel Evidence Risk Review Admin Plan

This is the Claude-compatible summary. The full repo-local skill lives at `skills/laravel-evidence-risk-review-admin-plan/SKILL.md`; keep both in sync.

Read first:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/IMPLEMENTATION_PLAN.md`
4. `docs/RULES.md`
5. `docs/PROGRESS.md`
6. `docs/LESSON.md`

Canonical spec:

```text
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md
```

Design handoff:

```text
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\README.md
%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\project\index.html
```

If unavailable, continue from `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md`.

Non-negotiables:

- Standalone Laravel admin package, no AskMyDocs coupling.
- Core package consumed through HTTP only; do not reimplement review logic.
- PHP `^8.3`, Laravel `^11|^12|^13`.
- Middleware never empty.
- UI tasks need Vitest and Playwright.
- Per-W AI reviews are temporarily disabled; run one deep AI review before final release.
