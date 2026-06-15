# Laravel Evidence Risk Review Admin

[![Latest Version on Packagist](https://img.shields.io/packagist/v/padosoft/laravel-evidence-risk-review-admin.svg)](https://packagist.org/packages/padosoft/laravel-evidence-risk-review-admin)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777bb4.svg?logo=php&logoColor=white)](https://www.php.net/)
[![Laravel](https://img.shields.io/badge/Laravel-11%20%7C%2012%20%7C%2013-ff2d20.svg?logo=laravel&logoColor=white)](https://laravel.com/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?logo=react&logoColor=white)](https://react.dev/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

> The operator window for [`padosoft/laravel-evidence-risk-review`](https://github.com/padosoft/laravel-evidence-risk-review): browse review logs, inspect findings, submit trial artifacts, and verify evidence-tier and profile configuration — a polished React admin panel that drops into any Laravel app.

![Dashboard dark](resources/screenshots/laravel-evidence-risk-review-admin-Dashboard-dark.png)

## Table Of Contents

- [Why It Exists](#why-it-exists)
- [The Value It Adds](#the-value-it-adds)
- [Features](#features)
- [When The AI Steps In](#when-the-ai-steps-in)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Routes And Assets](#routes-and-assets)
- [Core API Contract](#core-api-contract)
- [Embedded Mount](#embedded-mount)
- [Testing](#testing)
- [AI Agent Pack](#ai-agent-pack)
- [Part Of The Padosoft AI Suite](#part-of-the-padosoft-ai-suite)
- [Security](#security)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Why It Exists

The core package, `padosoft/laravel-evidence-risk-review`, performs evidence-boundary labeling and risk-sweep review of AI-generated content. It is fast, deterministic, and headless — it speaks PHP, Artisan, HTTP, and MCP, but it has no face.

This package **is that face**. It is the human-facing admin panel over the core's HTTP API, and it deliberately does **not** duplicate any core business logic: every review, profile, taxonomy entry, and finding is read live from the configured API base.

```
Laravel host
  ├─ padosoft/laravel-evidence-risk-review        # core engine — HTTP API
  └─ padosoft/laravel-evidence-risk-review-admin  # this React admin panel (HTTP only)
```

When a teammate asks *"why did this answer get flagged?"*, *"which sources counted as strong evidence?"*, or *"is the medical profile configured the way we think?"* — this is where you point them. No SSH, no `tinker`, no log grepping.

## The Value It Adds

You *could* hit the core API with `curl` and read raw JSON. This package exists because operators, reviewers, and compliance folks should not have to.

- **See the review, not the JSON.** Findings, evidence tiers, claim assertiveness, source breakdown, and budget are laid out as a readable case file — the exact thing you would otherwise reconstruct by hand from an API payload.
- **Reproduce a verdict in one click.** The built-in try-it form posts to `POST /reviews` so anyone can paste a claim, pick a profile, and watch the engine decide — no Postman, no PHP shell.
- **Trust the config you ship.** Domain profiles and the evidence-tier taxonomy are rendered read-only, straight from the engine, so "what the docs say" and "what production runs" can never silently drift.
- **Zero business logic to keep in sync.** The panel is a pure consumer of the core HTTP contract. Upgrade the engine and the panel reflects it — there is no second copy of the rules to maintain or get wrong.
- **Drops in, stays out of the way.** One catch-all route, prebuilt Vite assets, your own auth middleware. It is not an auth provider and it owns no data.
- **Honest when the engine is down.** If the core API is unreachable, every screen renders an explicit unavailable/error state instead of a blank page — verified by Playwright against the real production bundle.
- **Embeddable.** Ships an ES module entry so a host SPA can cross-mount the panel inside its own navigation chrome, exactly like the other Padosoft admin SPAs.

## Features

- ✅ **Dashboard** — at-a-glance view of recent review activity and verdict distribution.
- ✅ **Review log browser** — paginated, filterable by profile, verdict, and tenant.
- ✅ **Review detail** — full findings list with evidence tiers, claim assertiveness, source breakdown, and budget/cost for that review.
- ✅ **Try-it form** — submit an artifact to `POST /reviews` and inspect the live result without leaving the panel.
- ✅ **Domain profiles** — read-only view of every built-in profile (`default`, `engineering`, `medical`, `legal`, `finance`) and the rules each one enforces.
- ✅ **Evidence-tier taxonomy** — the full source-strength ladder, rendered straight from the engine.
- ✅ **Settings** — resolved runtime config, light/dark theme toggle, and a live connection probe to the core API.
- ✅ **Light & dark themes** — first-class, with a server-default and a per-user toggle.
- ✅ **Embedded mode** — mount the SPA inside a host application's own chrome via an exported React component.
- ✅ **Production-bundle E2E** — Playwright drives the real built assets; only the external core HTTP API is mocked.

## When The AI Steps In

This panel never calls a model itself — it is a UI. The intelligence lives in the core engine, and the core is **AI-optional by design**: most reviews resolve on pure deterministic PHP, and an LLM pass runs *only* when the host explicitly enables it and binds a reviewer contract.

Where this admin earns its keep is in making that boundary **visible**:

```text
Core engine decides:                          This panel shows you:
1. Label sources into evidence tiers  ──────▶  the tier ladder + per-source tier
2. Deterministic risk sweep           ──────▶  every finding, the rule that fired
3. LLM pass? (only if host enabled it) ─────▶  whether AI ran, and the budget it used
4. Merged findings + verdict          ──────▶  the readable case file
```

So when someone asks *"did a model decide this, or was it just the rules?"* — the review detail screen answers it. Deterministic findings and any optional LLM-assisted findings are surfaced side by side, with the cost attached. The panel is the audit trail for the engine's "cheap-first, AI-only-when-asked" philosophy.

> The LLM reviewer, its vendor, and its budget are all configured in the **core** package. See [`padosoft/laravel-evidence-risk-review` → *When The AI Steps In*](https://github.com/padosoft/laravel-evidence-risk-review#when-the-ai-steps-in).

## Screenshots

| | |
|---|---|
| **Dashboard (light)** | **Review log** |
| ![Dashboard light](resources/screenshots/laravel-evidence-risk-review-admin-Dashboard.png) | ![Review log](resources/screenshots/laravel-evidence-risk-review-admin-review-log.png) |
| **Review detail — findings, tiers, budget** | **Submit for review (try-it)** |
| ![Review details](resources/screenshots/laravel-evidence-risk-review-admin-review-log-details.png) | ![Submit for review](resources/screenshots/laravel-evidence-risk-review-admin-review-submit-for-review.png) |
| **Domain profiles** | **Profile detail** |
| ![Profiles](resources/screenshots/laravel-evidence-risk-review-admin-domain-profiles.png) | ![Profile detail](resources/screenshots/laravel-evidence-risk-review-admin-domain-profiles-detail.png) |
| **Evidence-tier taxonomy** | **Settings + connection probe** |
| ![Evidence tiers](resources/screenshots/laravel-evidence-risk-review-admin-evidence-tiers.png) | ![Settings](resources/screenshots/laravel-evidence-risk-review-admin-settings.png) |

## Quick Start

> New to the package? Follow these four steps top to bottom — they assume nothing.

**1. Install the core engine and this panel.** The panel talks to the core over HTTP, so the core comes first.

```bash
composer require padosoft/laravel-evidence-risk-review
composer require padosoft/laravel-evidence-risk-review-admin
```

**2. Publish the config and the prebuilt assets.**

```bash
php artisan vendor:publish --tag=evidence-risk-review-admin-config
php artisan vendor:publish --tag=evidence-risk-review-admin-assets
```

**3. Point the panel at your auth middleware and the core API base.** Add these to your host app's `.env`:

```dotenv
# Where the panel mounts (you visit this URL)
EVR_ADMIN_PREFIX=admin/evidence-risk-review
# Your host's auth — the panel is NOT an auth provider, protect it yourself
EVR_ADMIN_MIDDLEWARE=web,auth
# Where the core engine's HTTP API lives
EVR_ADMIN_API_BASE=/evidence-risk-review/api
# Default theme: dark | light
EVR_ADMIN_THEME=dark
```

**4. Log in to your app and open the panel:**

```text
https://your-app.test/admin/evidence-risk-review
```

That is it. If the core API is reachable you will land on the dashboard; if it is not, every screen tells you so explicitly instead of breaking.

> **Heads up:** the core HTTP API is **default-OFF**. If the panel reports the API as unreachable, enable the HTTP surface in the core package first — see its README.

## Configuration

```php
return [
    'mount_prefix' => env('EVR_ADMIN_PREFIX', 'admin/evidence-risk-review'),
    'middleware' => ['web', 'auth'],
    'api_base' => env('EVR_ADMIN_API_BASE', '/evidence-risk-review/api'),
    'theme_default' => env('EVR_ADMIN_THEME', 'dark'),
    'asset_path' => env('EVR_ADMIN_ASSET_PATH', 'vendor/evidence-risk-review-admin'),
];
```

`middleware` never resolves empty. If `EVR_ADMIN_MIDDLEWARE` is blank, the package falls back to `web`.

## Routes And Assets

The Laravel side exposes one catch-all shell route under `mount_prefix`. React owns client-side routing after the Blade shell loads.

Assets are built with Vite into:

```text
public/vendor/evidence-risk-review-admin
```

Build locally:

```bash
npm ci
npm run build
```

## Core API Contract

The SPA consumes:

- `GET /reviews`
- `GET /reviews/{reviewId}`
- `POST /reviews`
- `GET /profiles`
- `GET /profiles/{key}`
- `GET /taxonomy`
- `GET /openapi.yaml`

If the core API is unavailable, screens render explicit error/unavailable states.

## Embedded Mount

The bundle exports:

```tsx
import { EvidenceRiskReviewAdminApp } from '@padosoft/laravel-evidence-risk-review-admin';
import '@padosoft/laravel-evidence-risk-review-admin/style.css';

<EvidenceRiskReviewAdminApp
  embedded
  config={{ api_base: '/evidence-risk-review/api', mount_prefix: 'admin/evidence-risk-review' }}
/>
```

Use embedded mode when a host SPA provides its own navigation chrome. The package ships an ES module entry at `dist/index.js` plus `dist/index.d.ts` and `dist/style.css` for this flow.

## Testing

```bash
composer validate --strict --no-check-publish --no-interaction --no-ansi
vendor/bin/pint --test
vendor/bin/phpstan analyse --memory-limit=512M --no-progress
vendor/bin/phpunit

npm ci
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

Playwright runs the real production bundle. `page.route` is used only for the external core HTTP API.

## AI Agent Pack

This repository ships durable agent context:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/RULES.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/LESSON.md`
- `docs/PROGRESS.md`
- `.claude/skills/*`

These files document branch flow, gates, final deep review policy, and package guardrails.

## Part Of The Padosoft AI Suite

This panel is one of the **Padosoft AI sister packages** — a family of standalone, host-agnostic Laravel building blocks for shipping trustworthy AI features. Each is independent and `composer require`-able on a bare Laravel app, but they compose cleanly:

| Package | What it does |
| --- | --- |
| **[padosoft/laravel-evidence-risk-review](https://github.com/padosoft/laravel-evidence-risk-review)** | 🧠 The core engine this panel drives — evidence-tier labeling and risk-sweep review over PHP, Artisan, HTTP, and MCP. |
| [padosoft/laravel-ai-regolo](https://github.com/padosoft/laravel-ai-regolo) | EU-based Regolo.ai provider adapter for `laravel/ai` (chat, streaming, embeddings, reranking). |
| [padosoft/laravel-pii-redactor](https://github.com/padosoft/laravel-pii-redactor) (+ `-admin`) | EU-grade, field-level PII detection and masking inside the app boundary. |
| [padosoft/laravel-flow](https://github.com/padosoft/laravel-flow) (+ `-admin`) | Saga engine with approval gates, webhook outbox, and replay lineage for AI workflows. |
| [padosoft/eval-harness](https://github.com/padosoft/eval-harness) (+ `-ui`) | Golden datasets, RAG metrics, cohorts, adversarial testing, and LLM-as-judge regression gates. |
| [padosoft/askmydocs-mcp-pack](https://github.com/padosoft/askmydocs-mcp-pack) (+ `-admin`) | Framework-agnostic MCP plumbing for Laravel — contracts, transports, tool-calling orchestration, and audit. |

Together these packages power **[lopadova/askmydocs](https://github.com/lopadova/askmydocs)**, Padosoft's enterprise RAG platform — which integrates this evidence-tier and risk-review engine to surface low-confidence claims directly inside its RAG answers, and cross-mounts companion admin SPAs exactly like this one. If you want the full governed RAG stack rather than a single building block, start there.

## Security

This package is not an auth provider. Production hosts must protect `EVR_ADMIN_PREFIX` with authenticated middleware.

Report vulnerabilities through the process in [SECURITY.md](SECURITY.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
