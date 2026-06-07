import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const tempHome = mkdtempSync(path.join(tmpdir(), 'cet-smoke-'));
process.env.CET_HOME = tempHome;

const paths = await import('../lib/paths.js');
const scanner = await import('../lib/scanner.js');

assert.equal(paths.CET_HOME, tempHome);
assert.ok(paths.PATHS.translation.submissions.endsWith(path.join('.cet', 'translation', 'submissions')) || paths.PATHS.translation.submissions.includes('translation'));

paths.ensureDirs();

function writeFm(file, yamlText) {
  writeFileSync(file, `---\n${yamlText.trim()}\n---\n\nbody\n`, 'utf8');
}

writeFm(paths.PATHS.profile, `
exam_type: cet6
goal_score: 550
exam_date: '2026-06-13'
current: {listening: 150, reading: 170, writing: 70, translation: 65, total: 455}
`);

writeFm(paths.PATHS.scores, `
records:
  - {date: '2026-05-31', exam_type: cet6, type: mock, listening: 150, reading: 170, writing_translation: 135, writing: 70, translation: 65, total: 455, source: smoke}
`);

mkdirSync(paths.PATHS.translation.submissions, { recursive: true });
writeFm(path.join(paths.PATHS.translation.submissions, '20260531_traditional_culture.md'), `
date: '2026-05-31'
exam_type: cet6
topic: traditional_culture
score: {accuracy: 28, expression: 22, coherence: 10, mechanics: 8, estimated: 68}
errors:
  - {type: expression, tag: chinglish, count: 2}
key_phrases:
  - {zh: 传统文化, en: traditional culture}
`);

const snapshot = scanner.loadSnapshot();
assert.equal(snapshot.profile.exam_type, 'cet6');
assert.equal(snapshot.scores.records[0].total, 455);
assert.equal(snapshot.translation.count, 1);
assert.equal(snapshot.translation.key_phrases[0].en, 'traditional culture');
assert.deepEqual(snapshot.issues, []);
