# Project Rules

## Source Of Truth

- Canonical spec: `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md`. If unavailable, continue from `docs/IMPLEMENTATION_PLAN.md` and the latest `docs/PROGRESS.md` entry.
- Design handoff: `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\README.md` and `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\project\index.html`. If unavailable, continue from the design notes embedded in `docs/IMPLEMENTATION_PLAN.md`.
- Durable local plan: `docs/IMPLEMENTATION_PLAN.md`.
- Agent instructions: `AGENTS.md`, `CLAUDE.md`, `skills/laravel-evidence-risk-review-admin-plan/SKILL.md`, `.claude/skills/copilot-pr-review-loop/SKILL.md`, `.claude/skills/codex-pr-review-fallback/SKILL.md`, `.github/copilot-instructions.md`, and `.github/PULL_REQUEST_TEMPLATE.md`.
- Lessons learned: `docs/LESSON.md`.
- Current work state: `docs/PROGRESS.md`.

## Implementation Defaults

- Package name: `padosoft/laravel-evidence-risk-review-admin`.
- Namespace: `Padosoft\EvidenceRiskReviewAdmin`.
- License: Apache-2.0, matching the repository `LICENSE` file.
- PHP: `^8.3`; validate locally with Herd PHP 8.5 where possible.
- Laravel: `^11.0|^12.0|^13.0`.
- Testbench for Laravel package feature tests.
- React + TypeScript + Vite + TanStack Query + shadcn-style primitives for the SPA.
- Source lives under `resources/js`; built assets publish under `public/vendor/evidence-risk-review-admin`.
- No hard dependency on AskMyDocs, host auth packages, or the core PHP package.
- `padosoft/laravel-evidence-risk-review` is a suggested package because this admin consumes the core HTTP API and can point at an external core API base.

## Architecture Rules

- The package owns only the admin shell, frontend bundle, API client, and UI state.
- It must not reimplement risk scoring, evidence tiering, profile policies, LLM behavior, or review-log persistence.
- The Laravel route is a catch-all Blade shell under configurable prefix and host middleware.
- Middleware parsing must never return `[]`; empty env falls back to `['web']`.
- Runtime config shape must include `api_base`, `mount_prefix`, `theme_default`, and `asset_path`.
- Standalone mode mounts through Blade. Embedded mode exports a React component without duplicate chrome.
- API failures must be visible in the DOM, not swallowed.
- Dashboard aggregates only returned data and labels the scope honestly.
- Profiles and taxonomy are read-only in v1.0.

## Standalone-Agnostic Guardrails

Architecture tests must reject these needles in package source, config, routes, SPA source, tests, and Composer dependency keys:

- `AskMyDocs`
- `lopadova/askmydocs`
- `padosoft/askmydocs`
- `KnowledgeDocument`
- `KbSearchService`
- `knowledge_documents`
- `knowledge_chunks`
- `kb_nodes`
- `kb_edges`
- `kb_canonical_audit`

If another host-specific term is introduced during work, add it to this list and to the architecture test.

## UI Rules

- Use the supplied prototype as accepted design source.
- Every route root uses `data-state="idle|loading|ready|error|empty"` and `aria-busy` for async states.
- Every actionable control has a stable `data-testid` using the `evr-*` convention.
- Icon-only buttons need accessible names.
- Forms require real labels and field-level validation errors.
- Playwright waits on `data-state` or accessible UI, never arbitrary timeouts.
- Do not add marketing pages; the first screen is the actual admin dashboard.
- Do not use business-logic mock calculations in production except fixture/test/demo data explicitly scoped to tests.

## Testing Rules

Every completed task must define guardrails and run the relevant subset:

```text
composer validate --strict --no-interaction --no-ansi
vendor/bin/pint --test
vendor/bin/phpstan analyse --memory-limit=512M --no-progress
vendor/bin/phpunit
npm run build
npm run test
npm run test:e2e
```

- Pure backend/package tasks require PHPUnit at minimum and architecture tests when dependencies or namespace boundaries are touched.
- UI/UX tasks require Vitest/Vite and Playwright scenarios for every meaningful interaction.
- When adding a new test family, add it to the correct config; do not accept a green run that skipped the new directory.
- GitHub Actions workflow changes require local YAML sanity check such as `npx --yes yaml-lint .github/workflows/ci.yml`.
- If a tool is unavailable, record the exact blocker in `docs/PROGRESS.md`.

## Review Rules

- Temporary override: skip per-W/per-subtask local Copilot, GitHub Copilot, and Codex review loops. Keep local gates, PRs, merges, and CI checks. Run one deep AI review over the completed roadmap before final hardening/release.
- If the override is removed, local Copilot review must be report-only: use stdin without `--autopilot`, do not use `--yolo`, and explicitly instruct it not to edit files, run shell commands, stage, or commit.
- Copilot remains the first remote AI review source for the final deep pass.
- If Copilot is blocked by quota, budget, access, or prolonged non-response, switch to ChatGPT Codex Connector with `@codex review` and verify `chatgpt-codex-connector[bot]` responded on the current commit.

## Documentation Rules

- Update `docs/PROGRESS.md` after meaningful implementation, verification, PR, merge, or blocker events.
- Update `docs/LESSON.md` after non-obvious setup facts, review feedback, or durable design decisions.
- Keep dated entries in `YYYY-MM-DD` format.
- Final README must be community-grade: badges, optional screenshots, TOC, innovation summary, relationship to core, quick start, architecture, configuration, testing, security, contributing, changelog, and license.

## Release Rules

- Tag milestone releases as `v0.x.0` after macro gates when useful.
- Tag final package as `v1.0.0`.
- Publish a GitHub Release after final validation.
- Packagist readiness happens only after v1.0.0 is feature-complete, documented, and built.
