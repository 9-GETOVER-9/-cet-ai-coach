import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const src = path.join(root, 'src');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

const sourceFiles = walk(src).filter((file) => /\.(js|jsx)$/.test(file));
const missingImports = [];

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    const base = path.resolve(path.dirname(file), specifier);
    const candidates = [
      base,
      `${base}.js`,
      `${base}.jsx`,
      path.join(base, 'index.js'),
      path.join(base, 'index.jsx'),
    ];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      missingImports.push(`${path.relative(root, file)} -> ${specifier}`);
    }
  }
}

assert.deepEqual(missingImports, []);

const app = fs.readFileSync(path.join(src, 'App.jsx'), 'utf8');
assert.match(app, /Translation/);
assert.match(app, /path="\/translation"/);
assert.doesNotMatch(app, /Speaking|speaking/);

const server = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
for (const endpoint of [
  '/api/snapshot',
  '/api/scores',
  '/api/writing',
  '/api/reading',
  '/api/synonyms',
  '/api/listening',
  '/api/translation',
  '/api/vocab',
  '/api/timeline',
]) {
  assert.ok(server.includes(endpoint), `missing ${endpoint}`);
}

const paths = fs.readFileSync(path.join(root, 'lib', 'paths.js'), 'utf8');
assert.match(paths, /CET_HOME/);
assert.match(paths, /New project\\\\cet-data/);
assert.match(paths, /translation/);

console.log('static check ok');
