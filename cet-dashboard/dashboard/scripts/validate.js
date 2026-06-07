#!/usr/bin/env node
import { loadSnapshot } from '../lib/scanner.js';
import { CET_HOME } from '../lib/paths.js';

const snap = loadSnapshot();
console.log(`[validate] target: ${CET_HOME}`);

if (!snap.issues.length) {
  console.log('[validate] OK');
  process.exit(0);
}

for (const issue of snap.issues) {
  console.log(`- ${issue.file}: ${issue.error}`);
}
process.exit(1);
