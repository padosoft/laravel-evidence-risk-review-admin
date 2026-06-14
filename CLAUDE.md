# Claude Context

This file mirrors durable rules for Claude Code and other Claude-compatible agents.

## Start Here

1. Read `AGENTS.md`.
2. Read `docs/IMPLEMENTATION_PLAN.md`.
3. Read `docs/RULES.md`.
4. Read `docs/PROGRESS.md`.
5. Read `docs/LESSON.md`.
6. Read `.claude/skills/copilot-pr-review-loop/SKILL.md`.
7. Read `.claude/skills/codex-pr-review-fallback/SKILL.md`.
8. Read the canonical spec and template handoff under `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\` when deeper implementation detail is needed. If unavailable, continue from `docs/IMPLEMENTATION_PLAN.md` and the latest `docs/PROGRESS.md` entry.

## Non-Negotiables

- Temporary review strategy override: do not launch local Copilot, GitHub Copilot, or Codex reviews for each W/subtask. Run local gates and PR/CI flow, then perform one deep AI review before final hardening/release.
- This package is standalone. Do not import or reference AskMyDocs, `KnowledgeDocument`, `KbSearchService`, AskMyDocs tables, or sibling package symbols.
- PHP `^8.3`, Laravel `^11|^12|^13`, CI across PHP 8.3/8.4/8.5, local Herd PHP 8.5 preferred when available.
- The core package is consumed through HTTP only. Keep `padosoft/laravel-evidence-risk-review` in `suggest` unless the plan changes.
- Do not duplicate the core review engine, tier resolver, profiles, LLM boundary, or review-log logic.
- Every completed task needs precise tests. UI/UX tasks also need Playwright interaction scenarios.
- Keep `docs/PROGRESS.md` and `docs/LESSON.md` current.
- Follow the branch/PR/CI loop in `AGENTS.md`.
- Preserve the supplied admin prototype's information architecture, screen set, copy intent, density, and interactions.

## Review Checklist

- PHPUnit tests cover Laravel package behavior.
- Vitest covers React/API/hooks/components once the SPA exists.
- Playwright covers every meaningful UI interaction once UI exists.
- Pint and PHPStan stay clean once configured.
- Middleware never resolves empty.
- Runtime config injected into Blade is JSON-safe and stable.
- The Blade shell handles missing built assets with a useful non-crashing message.
- No AskMyDocs or host-specific leaks in `src/`, `config/`, `routes/`, `resources/js`, tests, or Composer dependencies.
- Before W7, the remote CI gate means no required checks are failing or pending. W7 introduces GitHub Actions; after that, every PR must wait for configured CI to pass.
