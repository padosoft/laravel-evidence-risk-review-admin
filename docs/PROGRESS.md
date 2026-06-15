# Progress

## 2026-06-15

- Received the package implementation request for `padosoft/laravel-evidence-risk-review-admin`.
- User confirmed the previous core package is already registered on Packagist.
- Confirmed current admin repo is on `main` tracking `origin/main` and initially contains `.git`, `LICENSE`, a placeholder `README.md`, and untracked `resources/screenshots/*`.
- Read the admin spec from `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md`.
- Read the design handoff README and prototype imports from `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\project\`.
- Read the completed core package process docs and imported the durable branch/test/review/lesson process.
- Created and switched to bootstrap branch `task/bootstrap-agent-rules`.
- Bootstrap objective: create durable agent/rule/skill/plan docs before application code, adapted to the admin package and the final-deep-review strategy.

## Bootstrap And W1

- Bootstrap PR #1 was merged to `main`.
- Started W1 Package Skeleton on `macro/w1-package-skeleton` and subtask branch `task/w1-package-skeleton`.
- W1 objective: Composer/Testbench skeleton, service provider, package config, catch-all web route, PanelController, Blade shell with missing-assets fallback, and PHPUnit architecture/config/mount guardrails.
- W1 guardrails: `composer validate --strict --no-interaction --no-ansi`, dependency install, `vendor/bin/pint --test`, `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`, and `vendor/bin/phpunit`. No SPA source exists yet, so Vitest/Playwright are not applicable until W2/W5.
- Implemented W1 skeleton: `composer.json`, service provider, config, route catch-all, PanelController, Blade panel shell, PHPUnit/PHPStan/Pint config, and tests for config defaults, panel mount/deep links, middleware application, and standalone architecture.
- Composer status: `composer update --no-progress --prefer-dist --no-interaction --no-ansi` completed and installed dependencies. `composer validate --strict --no-check-publish --no-interaction --no-ansi` completed once with `composer.json is valid`; later repeated validate attempts intermittently timed out even from `%TEMP%`, so treat the full publish/network validation as a local Composer/Packagist blocker to retry on the next pass.
- W1 local gates passed:
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 269 assertions`)
- Subtask PR #2 was merged into `macro/w1-package-skeleton`.
- W1 macro local gates passed after subtask merge:
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 269 assertions`)
- Subtask PR #4 was merged into `macro/w2-spa-foundation`.
- W2 macro local gates passed after subtask merge:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`4 files, 11 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 269 assertions`)
  - `git diff --check origin/main...HEAD`
  - `git diff --check origin/main...HEAD`
- W1 macro PR #3 was merged into `main`.

## W2 SPA Foundation

- Started W2 SPA Foundation on `macro/w2-spa-foundation` and subtask branch `task/w2-spa-foundation`.
- W2 objective: Vite/React/TypeScript foundation, Tailwind pipeline, standalone/embedded React app export, runtime config helpers, API client/errors/types/endpoints, TanStack Query hooks, MSW/Vitest setup, and data-layer tests.
- Implemented W2 foundation files under `resources/js`, `resources/css`, `tests/js`, and frontend config files.
- `npm install` initially reported Vite/esbuild dev advisories; upgrading to Vite `^8.0.16` cleared `npm audit`.
- W2 local gates passed:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`4 files, 11 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 169 assertions`)

## Open Items

- W2 macro PR #5 was merged into `main`.
- Started W3 Read Screens on `macro/w3-read-screens` and subtask branch `task/w3-read-screens`.
- W3 objective: implement dashboard, review log, review detail, profiles list/detail, and taxonomy read-only screens using the W2 data layer and the supplied admin template direction.
- Implemented W3 shell, navigation, badge/state components, read-screen routes, responsive admin CSS, and per-screen Vitest coverage for ready/empty/error/notfound/filter states.
- W3 local gates passed:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`8 files, 20 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 359 assertions`)
  - `git diff --check`
- Subtask PR #6 was merged into `macro/w3-read-screens`.
- W3 macro local gates passed after subtask merge:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`8 files, 20 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 359 assertions`)
  - `git diff --check origin/main...HEAD`

## Open Items

- W3 macro PR #7 was merged into `main`.
- Started W4 Write Screen And Settings on `macro/w4-write-settings` and subtask branch `task/w4-write-settings`.
- W4 objective: implement Try submit form, validation error surfacing, dry-run behavior, LLM unavailable banner, Settings theme toggle, runtime config display, and connection probe.
- Implemented W4 `TryPage` and `SettingsPage`, replaced deferred routes, added form CSS, and added Vitest coverage for submit failure/success/dry-run/503 plus settings theme/probe success/error.
- W4 local gates passed:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 379 assertions`)
  - `git diff --check`
- Subtask PR #8 was merged into `macro/w4-write-settings`.
- W4 macro local gates passed after subtask merge:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 379 assertions`)
  - `git diff --check origin/main...HEAD`

## Open Items

- W4 macro PR #9 was merged into `main`.
- Started W5 Playwright E2E on `macro/w5-playwright-e2e` and subtask branch `task/w5-playwright-e2e`.
- W5 objective: add production-bundle Playwright E2E with external-core-only `page.route` mocks for smoke, dashboard success/failure, review filters/detail, try submit, and profiles/taxonomy.
- Implemented `scripts/serve-e2e.mjs`, `playwright.config.ts`, E2E fixtures, and six Chromium scenarios.
- First Playwright run timed out because tests used `/` while standalone BrowserRouter has basename `/admin/evidence-risk-review`; fixed tests to visit the real mount prefix and killed the stale server on port 4173.
- W5 local gates passed:
  - `npm run test:e2e` (`6 passed`)
  - `npm run typecheck`
  - `npm run test` (`10 files, 27 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 379 assertions`)
  - `git diff --check`
- Subtask PR #10 was merged into `macro/w5-playwright-e2e`.
- W5 macro local gates passed after subtask merge:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `npm audit`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`6 tests, 379 assertions`)
  - `git diff --check origin/main...HEAD`
  - `npm run test:e2e` (`6 passed`)

## Open Items

- W5 macro PR #11 was merged into `main`.
- Started W6 Host-Boot Integration on `macro/w6-host-boot-integration` and subtask branch `task/w6-host-boot-integration`.
- W6 objective: add a Testbench host-boot integration gate proving the admin shell and a core-compatible HTTP API can run in the same host without a hard core PHP dependency.
- Implemented `tests/Integration/HostBootIntegrationTest.php` and added the `Integration` PHPUnit suite. The test mounts fake core-compatible HTTP routes for taxonomy/review log/submit, verifies admin shell config injection, verifies POST review then list review, and verifies the admin shell still renders when `api_base` points to an unavailable core API.
- W6 local gates passed:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`8 tests, 392 assertions`)
  - `git diff --check`
- Subtask PR #12 was merged into `macro/w6-host-boot-integration`.
- W6 macro local gates passed after subtask merge:
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`8 tests, 392 assertions`)
  - `git diff --check origin/main...HEAD`

## Open Items

- W6 macro PR #13 was merged into `main`.
- Started W7 DX Docs CI on `macro/w7-dx-docs-ci` and subtask branch `task/w7-dx-docs-ci`.
- W7 objective: produce README, env/governance docs, CODEOWNERS, GitHub Actions CI matrix, and commit provided screenshots.
- Implemented README with screenshots, quick start, configuration, API contract, testing, security and AI agent pack sections.
- Added `.env.example`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `.github/CODEOWNERS`, and `.github/workflows/ci.yml`.
- W7 local gates passed:
  - `npx --yes yaml-lint .github/workflows/ci.yml`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `npm audit`
  - `npm run test:e2e` (`6 passed`)
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`8 tests, 392 assertions`)
  - `git diff --check`
- Opened W7 subtask PR #14 from `task/w7-dx-docs-ci` into `macro/w7-dx-docs-ci`.
- Initial PR #14 CI exposed workflow issues:
  - Frontend and Playwright failed at `npm ci` because the lock file was not synchronized for Node 22/npm 10 optional dependencies.
  - Laravel 11 PHP matrix cells failed because Composer 2.10 blocked insecure legacy `laravel/framework` transitive versions during compatibility resolution.
- Applied W7 CI fix:
  - Regenerated `package-lock.json` with `npx -p npm@10 npm install --package-lock-only --ignore-scripts`.
  - Added a CI-only `composer config audit.block-insecure false` step for legacy framework cells.
  - Split the CI pinning commands so `orchestra/testbench` stays in `require-dev`.
- W7 CI-fix local gates passed:
  - `npx -p npm@10 npm ci`
  - `npx --yes yaml-lint .github/workflows/ci.yml`
  - `composer validate --strict --no-check-publish --no-interaction --no-ansi`
  - `npm audit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test` (`10 files, 27 tests`)
  - `vendor/bin/phpunit` (`8 tests, 392 assertions`)
- W7 CI-fix Playwright local status: `npm run test:e2e` timed out three times on this workstation and left a Node server on port 4173; stale processes were killed and the approved local exemption is applied. Online Playwright CI remains mandatory before merge.
- PR #14 CI passed online across PHP 8.3/8.4/8.5 matrix cells, Frontend, and Playwright; subtask PR #14 was merged into `macro/w7-dx-docs-ci`.
- W7 macro gate status after subtask merge:
  - Online CI from PR #14 passed and covered the W7 workflow.
  - Local post-fix gates passed for npm 10 lock, YAML, composer validate, audit, typecheck, build, Vitest, and PHPUnit.
  - Local Playwright remains exempt after three timeouts; online Playwright passed on PR #14.

## Open Items

- W7 macro PR #15 passed mandatory CI and was merged into `main`.
- Started W8 Hardening Release on `macro/w8-hardening-release` and subtask branch `task/w8-hardening-release`.
- W8 objective: final hardening, commit built release assets, refresh durable rules/skills from lessons, run final deep AI review, merge through CI, tag `v1.0.0`, and publish GitHub Release.
- Implemented W8 hardening:
  - Normalized runtime `api_base`, `mount_prefix`, `asset_path`, and `theme_default` in PHP and TypeScript.
  - Added PHPUnit/Vitest coverage for whitespace-wrapped runtime config and invalid theme fallback.
  - Fixed Codex P2 feedback by preserving root `EVR_ADMIN_PREFIX=/` as runtime `mount_prefix: ''` and adding root-mount PHPUnit/Vitest coverage.
  - Changed release packaging so `public/vendor/evidence-risk-review-admin` is no longer ignored.
  - Built the release bundle under `public/vendor/evidence-risk-review-admin`.
  - Fixed Codex P1 feedback by adding a real embedded package export with library build output under `dist/`.
  - Updated `CHANGELOG.md` for `1.0.0 - 2026-06-15`.
  - Refreshed `AGENTS.md`, `CLAUDE.md`, `docs/RULES.md`, and repo/Claude skills with W7/W8 CI/release lessons.
- W8 local gates passed so far:
  - `npx -p npm@10 npm ci`
  - `vendor/bin/pint --test`
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/phpunit` (`10 tests, 412 assertions`)
  - `npm audit`
  - `npm run typecheck`
  - `npm run test` (`10 files, 29 tests`)
  - `npm run build`
  - `git diff --check`
- W8 local blockers:
  - `composer validate --strict --no-check-publish --no-interaction --no-ansi` timed out three times on this workstation; applying the known local Composer timeout exemption and requiring CI Composer validate before merge.
  - `npm run test:e2e` still timed out locally after the Playwright script simplification; no port 4173 listener remained. Online Playwright CI remains mandatory before merge.
- Final local Copilot deep review attempt was blocked by plan usage limit: `additional_spend_limit_reached`. Per fallback rules, switch to ChatGPT Codex Connector on the W8 PR and verify it responds on the current commit.
- Codex Connector reviewed commit `b0288e06ec` and reported two actionable findings:
  - P1: README advertised embedded imports but the release only shipped an auto-mount bundle.
  - P2: root `EVR_ADMIN_PREFIX=/` was normalized back to the default admin prefix in runtime config.
- Fixed Codex findings by adding `resources/js/index.ts`, `vite.lib.config.ts`, `tsconfig.lib.json`, package `exports`, `dist/` build output, embedded README style import, root mount preservation, and PHP/Vitest root-mount coverage.
- Codex Connector reviewed commit `bc59913eb0` and reported three additional NPM export blockers:
  - Missing `package.json` `version`.
  - Library build did not externalize `react/jsx-runtime` / `react/jsx-dev-runtime`.
  - Generated `dist/index.d.ts` imported a non-existent `../css/panel.css` path.
- Fixed the second Codex pass by adding package version `1.0.0`, externalizing JSX runtime modules, removing the side-effect CSS import from the library entry, copying `resources/css/panel.css` to `dist/style.css`, and verifying `npm pack --dry-run --json`.
- Codex Connector reviewed commit `39bd6f7dc6` and reported:
  - A stale/incorrect package version warning; `package.json` already contains `version: 1.0.0` and `npm pack --dry-run --json` passes.
  - P1: embedded config did not reach API calls because hooks used a module-level singleton endpoints client.
  - P1: `dist/style.css` copied raw source CSS instead of processed Vite/PostCSS output.
- Fixed the third Codex pass by adding an `ApiEndpointsProvider` context wired from resolved runtime config, adding Vitest coverage that embedded `config.api_base` reaches `/custom/api/reviews`, and copying library CSS from the Vite manifest output.
- W8 post-Codex local gates passed:
  - `npm run build`
  - `npm pack --dry-run --json`
  - `npm run typecheck`
  - `npm run test` (`10 files, 30 tests`)
  - `vendor/bin/phpunit` (`10 tests, 412 assertions`)
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/pint --test`
- Codex Connector reviewed commit `9971ba5` and reported one remaining embedded-config gap: `SettingsPage` connection probe still called the module-level default taxonomy endpoint.
- Fixed the fourth Codex pass by exporting the configured endpoint context accessor, routing `SettingsPage` probe through it, and adding a Vitest case that renders `SettingsPage` with `ApiEndpointsProvider` and verifies `/custom/api/taxonomy`.
- Codex Connector review on commit `e04dab3` also reported a valid embedded-package blocker: React and ReactDOM were externalized by the library build but still published as regular dependencies. Two other comments in that pass were stale/incorrect because `package.json` already had `version: 1.0.0` and embedded API config was already context-wired.
- Fixed the React peer blocker by moving `react` and `react-dom` to `peerDependencies` while keeping them in `devDependencies` for local build/test, then regenerated `package-lock.json` with npm 10.
- Codex Connector review on commit `0ce3bab` reported one valid npm release blocker: scoped packages need explicit public publish access. Other inline comments in that pass were stale repeats of already-fixed `version`, embedded API context, and React peer dependency findings.
- Fixed the scoped npm blocker by adding `publishConfig.access: public` and regenerating `package-lock.json` with npm 10.
- Codex Connector review on commit `209f926` reported one valid ESM type blocker: emitted `.d.ts` files used extensionless relative imports, which fail for NodeNext consumers. Earlier inline comments in that pass were stale repeats of already-fixed npm/package export findings.
- Fixed the ESM declaration blocker by adding `scripts/fix-declaration-extensions.mjs`, running it in `npm run build` after declaration emit, and regenerating `dist/*.d.ts` with `.js` relative specifiers.
- Verified a temporary external consumer using `tsc --module NodeNext --moduleResolution NodeNext` can import the packed package types.
- W8 post-fourth-Codex local gates passed:
  - `npx -p npm@10 npm ci`
  - `npm run typecheck`
  - `npm run test` (`10 files, 31 tests`)
  - `npm run build`
  - `npm pack --dry-run --json`
  - `npm publish --dry-run` (confirmed `public access` dry-run; login warning is expected without publishing)
  - temporary packed-package NodeNext consumer typecheck
  - `npm audit`
  - `composer validate --strict --no-check-publish --no-interaction --no-ansi`
  - `vendor/bin/phpunit` (`10 tests, 412 assertions`)
  - `vendor/bin/phpstan analyse --memory-limit=512M --no-progress`
  - `vendor/bin/pint --test`
  - `git diff --check`

## Open Items

- Commit and push React peer dependency fix, rerun CI and final Codex review on the new commit, then merge, tag `v1.0.0`, and publish GitHub Release.
