#!/usr/bin/env node
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CET_HOME, ensureDirs } from '../lib/paths.js';

const rl = readline.createInterface({ input, output });
const ans = await rl.question('This will backup and clear D:\文档\New project\cet-data. Type RESET to continue: ');
rl.close();

if (ans !== 'RESET') process.exit(1);

if (fs.existsSync(CET_HOME)) {
  const dst = `${CET_HOME}.bak.${new Date().toISOString().replace(/[:.]/g, '-')}`;
  fs.cpSync(CET_HOME, dst, { recursive: true });
  fs.rmSync(CET_HOME, { recursive: true, force: true });
  console.log(`[reset] backup -> ${dst}`);
}

ensureDirs();
console.log('[reset] D:\文档\New project\cet-data cleared');

