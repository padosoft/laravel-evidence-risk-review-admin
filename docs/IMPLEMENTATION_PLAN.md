# Implementation Plan

## Package

- Composer: `padosoft/laravel-evidence-risk-review-admin`
- Namespace: `Padosoft\EvidenceRiskReviewAdmin`
- License: Apache-2.0
- PHP: `^8.3`
- Laravel: `^11.0|^12.0|^13.0`
- Core relationship: consumes the core package HTTP API. Keep `padosoft/laravel-evidence-risk-review` as `suggest`, not `require`, to preserve Laravel 11/12/13 compatibility and external API deployments.

## Source Material

- Canonical spec: `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md`
- Design handoff README: `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\README.md`
- Prototype entry: `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\project\index.html`
- Prototype imports read: `icons.jsx`, `data.jsx`, `ui.jsx`, `shell.jsx`, `pages-dashboard.jsx`, `pages-reviews.jsx`, `pages-try.jsx`, `pages-registry.jsx`, `app.jsx`, and `styles.css`.

If the external files are unavailable, use this plan plus `docs/PROGRESS.md` and `docs/LESSON.md`.

## Product Scope

This package is the React SPA web admin panel for the core Evidence Risk Review package. It:

- mounts a Blade shell under a configurable Laravel route prefix;
- injects runtime config for the SPA;
- renders dashboard, review log, review detail, try-it, profiles, taxonomy, and settings screens;
- calls the core HTTP API only;
- exports an embedded React app for host SPA cross-mounting without duplicate chrome.

It does not implement risk review business logic, auth, RBAC, profile mutation, or the core HTTP API.

## Runtime Config

```php
return [
    'mount_prefix' => env('EVR_ADMIN_PREFIX', 'admin/evidence-risk-review'),
    'middleware' => (function (): array {
        $r = array_values(array_filter(array_map('trim', explode(',', (string) env('EVR_ADMIN_MIDDLEWARE', 'web,auth'))), fn (string $n) => $n !== ''));
        return $r !== [] ? $r : ['web'];
    })(),
    'api_base' => env('EVR_ADMIN_API_BASE', '/evidence-risk-review/api'),
    'theme_default' => env('EVR_ADMIN_THEME', 'dark'),
    'asset_path' => env('EVR_ADMIN_ASSET_PATH', 'vendor/evidence-risk-review-admin'),
];
```

## Core API Consumed

- `POST /reviews`
- `GET /reviews/{reviewId}`
- `GET /reviews`
- `GET /profiles`
- `GET /profiles/{key}`
- `GET /taxonomy`
- `GET /openapi.yaml`

The SPA must handle missing/unwired core routes as a visible unavailable/error state.

## Branch Plan

Bootstrap is the only direct `task/* -> main` exception. W1+ follows subtask PR into macro branch, then macro PR into `main`.

| Milestone | Branch | Scope | Exit Gate |
|---|---|---|---|
| Bootstrap | `task/bootstrap-agent-rules` | Durable AGENTS/CLAUDE/RULES/LESSON/PROGRESS/PLAN/skills before code. | `git diff --check`, docs updated, PR to `main`. |
| W1 Package Skeleton | `macro/w1-package-skeleton` | Composer, service provider, config, routes, PanelController, Blade shell, PHPUnit architecture/config/mount tests. | Composer/Pint/PHPStan/PHPUnit green. |
| W2 SPA Foundation | `macro/w2-spa-foundation` | Vite, Tailwind, shadcn-style primitives, React app export, API client/errors/types/endpoints, TanStack Query hooks, Vitest setup. | `npm run build`, `npm run test`, PHP gates green. |
| W3 Read Screens | `macro/w3-read-screens` | Dashboard, Review Log, Review Detail, Profiles, Taxonomy with loading/empty/error/ready states. | Per-screen Vitest green, build green. |
| W4 Write Screen And Settings | `macro/w4-write-settings` | Try-it form, validation surfacing, dry-run behavior, 503 banner, settings theme/config/probe. | Vitest failure-path tests green, build green. |
| W5 Playwright E2E | `macro/w5-playwright-e2e` | Production bundle server, Playwright specs for nav, dashboard, reviews, try-it, profiles/taxonomy, failure injection. | `npm run test:e2e` green. |
| W6 Host-Boot Integration | `macro/w6-host-boot-integration` | Testbench host with core + admin, submit -> log flow, core API enabled/disabled states. | Integration suite green. |
| W7 DX Docs CI | `macro/w7-dx-docs-ci` | WOW README, `.env.example`, governance docs, CI matrix, screenshots referenced. | Local gates + GitHub Actions matrix green. |
| W8 Hardening Release | `macro/w8-hardening-release` | Edge cases, bundle committed/built for release, final deep AI review, final docs/rules refresh, tag/release. | All gates green, final AI review clear, `v1.0.0` release. |

## Subtask Exit Gate

Each subtask must include:

- objective;
- implementation details;
- test guardrails;
- local gates run or explicit blocker;
- `docs/PROGRESS.md` update;
- `docs/LESSON.md` update when durable knowledge is learned.

While the temporary review strategy override is active, per-W local and PR AI review are skipped and deferred to the final deep pass.

## Design Implementation Notes

The prototype has:

- dark/light theme seeded on `<html data-theme>`, persisted with `evr-theme`;
- route state for dashboard, reviews, review-detail, try, profiles, profile-detail, taxonomy, settings;
- sidebar/topbar/command palette shell;
- deterministic demo data for prototype only;
- shared primitives for verdict, cost, assertiveness, tier badges, buttons, fields, cards, callouts, tabs, skeletons, gauges, and risk meters.

Production implementation must replace prototype demo evaluation with real API calls and test fixtures.
