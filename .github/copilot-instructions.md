# Copilot Instructions

This repository is `padosoft/laravel-evidence-risk-review-admin`, a standalone Laravel package that ships a React/Vite admin panel for the core `padosoft/laravel-evidence-risk-review` HTTP API.

Review priorities:

- No AskMyDocs or host-specific coupling.
- No reimplementation of core risk/evidence/profile/LLM/review-log business logic.
- Laravel package conventions for service provider, config, routes, views, publish tags, and Testbench tests.
- Middleware must never resolve empty.
- React UI must expose stable `evr-*` testids, `data-state`, accessible labels, and visible error states.
- UI work needs Vitest and Playwright guardrails.
- Core package should remain a suggested HTTP provider unless the roadmap explicitly changes.
