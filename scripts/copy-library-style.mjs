import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const target = join(root, 'dist', 'style.css');
const manifest = JSON.parse(
  readFileSync(join(root, 'public', 'vendor', 'evidence-risk-review-admin', '.vite', 'manifest.json'), 'utf8'),
);
const [cssFile] = manifest['resources/js/main.tsx']?.css ?? [];

if (!cssFile) {
  throw new Error('Unable to find the processed admin CSS in the Vite manifest.');
}

mkdirSync(dirname(target), { recursive: true });
copyFileSync(join(root, 'public', 'vendor', 'evidence-risk-review-admin', cssFile), target);
