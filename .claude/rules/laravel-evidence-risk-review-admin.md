# Laravel Evidence Risk Review Admin Rules

- Read `AGENTS.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/RULES.md`, `docs/PROGRESS.md`, and `docs/LESSON.md` before code changes.
- Preserve standalone-agnostic boundaries; no AskMyDocs or `kb_*` dependencies.
- Do not reimplement core package business logic. This package consumes the core HTTP API.
- Keep middleware never empty.
- Use the supplied prototype as accepted design source.
- UI changes need Vitest and Playwright coverage.
- Per-W AI reviews are disabled for this roadmap; run one final deep Copilot/Codex review before release.
