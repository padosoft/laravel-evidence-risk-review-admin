# Lessons

## 2026-06-15

- The repository started as a clean admin stub on `main` with `LICENSE`, a placeholder `README.md`, and untracked `resources/screenshots/*` assets already present. Keep those screenshot assets; they are likely intended for the final README.
- The canonical admin spec is stored outside the repo at `%USERPROFILE%\Downloads\laravel-evidence-risk-review-admin-template\padosoft-laravel-evidence-risk-review-admin-SPEC-PLAN.md`; keep `docs/IMPLEMENTATION_PLAN.md` current so future sessions are not blocked by missing chat context.
- The design handoff requires reading `project/index.html` and every imported prototype file. The prototype is accepted design input, not production code to ship unchanged.
- The core package `padosoft/laravel-evidence-risk-review` is already registered on Packagist. The admin still keeps it as `suggest` instead of `require` because it consumes the core HTTP API and must support Laravel 11/12/13, while the core package may have a narrower Laravel constraint.
- Process from the core package carries forward: durable `AGENTS.md`, `CLAUDE.md`, `docs/RULES.md`, `docs/PROGRESS.md`, `docs/LESSON.md`, repo-local skill, Claude skills, branch/PR gates, and final release checklist.
- Review strategy carries forward from the end of the core roadmap: do not launch per-W AI reviews; run one deep Copilot/Codex review at the end while keeping local tests and CI strict.
- Copilot PR review engagement must be verified through requested reviewers, review requests, reviews, or comments; command success alone is not enough. If Copilot is blocked at final deep review, trigger Codex Connector with `@codex review`.
- During this session `apply_patch` initially targeted the previous core repo because the session cwd still pointed there. Use absolute paths for admin package patches in this conversation unless the tool cwd is confirmed.
- W1 keeps the Blade shell usable before SPA assets exist: missing Vite manifest should render `evr-admin-assets-missing` instead of throwing.
- On this workstation, `composer validate --strict` can hang during publish/network checks for this new package. `composer validate --strict --no-check-publish` passed once, and `composer update --no-progress --prefer-dist --no-interaction --no-ansi` completed, so record later validate timeouts separately from code/test failures and retry on the next subtask.
- Testbench HTTP tests need a stable `app.key`; set it in the base `tests/TestCase.php` rather than weakening route tests.
- Vite 8 with TypeScript needs `moduleResolution: "Bundler"` and `defineConfig` from `vitest/config` when `vite.config.ts` contains a `test` block.
- Node 25 emits `--localstorage-file` warnings under Vitest/jsdom on this workstation. The tests still pass; avoid assuming `window.localStorage.clear` exists in setup hooks.
- `npm audit` initially flagged Vite/esbuild dev vulnerabilities; upgrading to Vite `^8.0.16` cleared the audit without changing runtime dependencies.
- Once SPA source exists, the standalone architecture test must include `resources/js`; otherwise host-specific leakage could enter through frontend code while PHP tests stay green.
- W3 screen tests should assert `data-state` transitions and stable `evr-*` testids rather than CSS classes, matching the future Playwright selector strategy.
- For W4 mutation tests, use a real MSW `POST /reviews` failure and click the submit button; this keeps the R16 failure path honest instead of asserting an injected error state.
- Settings tests need a deterministic localStorage polyfill because Node 25's built-in localStorage warning does not guarantee a browser-compatible API in Vitest workers.
