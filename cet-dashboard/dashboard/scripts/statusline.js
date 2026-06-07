#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { parseFrontmatter } from '../lib/frontmatter.js';

const CET_HOME = process.env.CET_HOME || path.join(os.homedir(), '.cet');

function parseFm(file) {
  if (!fs.existsSync(file)) return null;
  return parseFrontmatter(fs.readFileSync(file, 'utf8'));
}

if (!fs.existsSync(CET_HOME)) process.exit(0);

const profile = parseFm(path.join(CET_HOME, 'profile.md'));
if (!profile) {
  process.stdout.write('CET · setup needed (/cet-diagnose)');
  process.exit(0);
}

const scores = parseFm(path.join(CET_HOME, 'scores.md'));
const last = scores?.records?.at(-1);
const days = profile.exam_date ? Math.ceil((new Date(profile.exam_date) - new Date()) / 86400000) : null;
const current = last || profile.current || {};

const parts = ['CET', String(profile.exam_type || '').toUpperCase()];
if (days != null) parts.push(`${days}d -> ${profile.goal_score}`);
if (current.total != null) parts.push(`Total:${current.total}`);
if (current.listening != null) parts.push(`L:${current.listening}`);
if (current.reading != null) parts.push(`R:${current.reading}`);
if (current.writing_translation != null) parts.push(`WT:${current.writing_translation}`);

process.stdout.write(parts.filter(Boolean).join(' · '));
