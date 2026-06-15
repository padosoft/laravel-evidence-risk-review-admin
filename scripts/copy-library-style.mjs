import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const target = join(root, 'dist', 'style.css');

mkdirSync(dirname(target), { recursive: true });
copyFileSync(join(root, 'resources', 'css', 'panel.css'), target);
