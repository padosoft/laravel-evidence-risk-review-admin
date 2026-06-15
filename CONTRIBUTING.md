# Contributing

1. Open focused changes against a task branch.
2. Keep this package standalone: no host-app symbols or AskMyDocs coupling.
3. Run relevant gates before PR:

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse --memory-limit=512M --no-progress
vendor/bin/phpunit
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

UI changes need Vitest and Playwright coverage for the affected interactions.
