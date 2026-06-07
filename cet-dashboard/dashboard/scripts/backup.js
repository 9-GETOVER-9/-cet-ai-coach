#!/usr/bin/env node
import fs from 'node:fs';
import { CET_HOME } from '../lib/paths.js';

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const dst = `${CET_HOME}.bak.${stamp}`;

if (!fs.existsSync(CET_HOME)) {
  console.log('[backup] no D:\文档\New project\cet-data yet');
  process.exit(0);
}

fs.cpSync(CET_HOME, dst, { recursive: true });
console.log(`[backup] ${CET_HOME} -> ${dst}`);

