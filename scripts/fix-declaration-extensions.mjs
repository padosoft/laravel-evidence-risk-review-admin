import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

async function declarationFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return declarationFiles(path);
      }

      return entry.isFile() && entry.name.endsWith('.d.ts') ? [path] : [];
    }),
  );

  return files.flat();
}

function withJsExtension(specifier) {
  if (!specifier.startsWith('.') || extname(specifier) !== '') {
    return specifier;
  }

  return `${specifier}.js`;
}

for (const file of await declarationFiles('dist')) {
  const source = await readFile(file, 'utf8');
  const updated = source.replace(
    /\b(from\s+['"])(\.[^'"]+)(['"])/g,
    (_, prefix, specifier, suffix) => `${prefix}${withJsExtension(specifier)}${suffix}`,
  ).replace(
    /\b(import\(['"])(\.[^'"]+)(['"]\))/g,
    (_, prefix, specifier, suffix) => `${prefix}${withJsExtension(specifier)}${suffix}`,
  );

  if (updated !== source) {
    await writeFile(file, updated);
  }
}
