#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { PATHS, ensureDirs, CET_HOME } from '../lib/paths.js';
import { dumpYaml } from '../lib/frontmatter.js';

ensureDirs();

function date(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function ymd(d) {
  return d.replace(/-/g, '');
}

function writeFm(file, fm, body = '') {
  fs.writeFileSync(file, `---\n${dumpYaml(fm)}\n---\n\n${body}`, 'utf8');
}

function writeYaml(file, data) {
  fs.writeFileSync(file, dumpYaml(data), 'utf8');
}

writeFm(PATHS.profile, {
  exam_type: 'cet6',
  goal_score: 550,
  exam_date: date(45),
  created_at: date(-20),
  current: { listening: 150, reading: 170, writing: 70, translation: 65, total: 455 },
  weekly_hours: 10,
  focus: ['listening', 'translation'],
}, '# CET profile');

writeFm(PATHS.scores, {
  records: [
    { date: date(-21), exam_type: 'cet6', type: 'mock', listening: 135, reading: 160, writing_translation: 128, writing: 66, translation: 62, total: 423, source: 'demo-1' },
    { date: date(-14), exam_type: 'cet6', type: 'mock', listening: 148, reading: 168, writing_translation: 134, writing: 68, translation: 66, total: 450, source: 'demo-2' },
    { date: date(-7), exam_type: 'cet6', type: 'mock', listening: 158, reading: 176, writing_translation: 142, writing: 72, translation: 70, total: 476, source: 'demo-3' },
  ],
}, '# score history');

for (let i = 0; i < 4; i++) {
  const d = date(-18 + i * 5);
  writeFm(path.join(PATHS.writing.submissions, `${ymd(d)}_online_learning.md`), {
    date: d,
    exam_type: 'cet6',
    topic: 'online_learning',
    score: { content: 20 + i, organization: 18 + i, language: 19 + i, mechanics: 8, estimated: 65 + i * 3 },
    errors: [{ type: 'language', tag: 'collocation', count: 3 - i }],
    duration_min: 30,
    word_count: 160 + i * 5,
  }, '# writing demo');
}

for (let i = 0; i < 4; i++) {
  const d = date(-17 + i * 4);
  writeFm(path.join(PATHS.reading.submissions, `${ymd(d)}_reading_set${i + 1}.md`), {
    date: d,
    exam_type: 'cet6',
    source: `reading-set-${i + 1}`,
    total: 30,
    correct: 20 + i,
    accuracy: +((20 + i) / 30).toFixed(2),
    estimated: 165 + i * 6,
    question_types: [
      { type: 'banked_cloze', total: 10, correct: 6 + (i % 2) },
      { type: 'matching', total: 10, correct: 7 + (i % 3) },
      { type: 'careful_reading', total: 10, correct: 7 + (i % 3) },
    ],
    errors: [{ tag: 'word_form', question: 3, type: 'banked_cloze' }],
    synonyms_added: 4,
    duration_min: 40,
  }, '# reading demo');
}

writeYaml(path.join(PATHS.reading.synonyms, `${ymd(date(-1))}_demo.yaml`), [
  { original: 'important', paraphrase: 'significant', source: 'demo', context: 'research' },
]);

for (let i = 0; i < 4; i++) {
  const d = date(-16 + i * 4);
  writeFm(path.join(PATHS.listening.submissions, `${ymd(d)}_listening_set${i + 1}.md`), {
    date: d,
    exam_type: 'cet6',
    source: `listening-set-${i + 1}`,
    total: 25,
    correct: 15 + i,
    estimated: 150 + i * 7,
    section_types: [
      { type: 'conversation', total: 8, correct: 5 + (i % 3) },
      { type: 'passage', total: 10, correct: 6 + (i % 3) },
      { type: 'lecture', total: 7, correct: 4 + (i % 2) },
    ],
    error_types: [{ tag: 'distractor', count: 3 }, { tag: 'paraphrase', count: 2 }],
    duration_min: 35,
  }, '# listening demo');
}

for (let i = 0; i < 3; i++) {
  const d = date(-12 + i * 5);
  writeFm(path.join(PATHS.translation.submissions, `${ymd(d)}_traditional_culture.md`), {
    date: d,
    exam_type: 'cet6',
    topic: 'traditional_culture',
    score: { accuracy: 26 + i, expression: 22 + i, coherence: 10, mechanics: 8, estimated: 66 + i * 3 },
    errors: [{ type: 'expression', tag: 'chinglish', count: 3 - i }],
    key_phrases: [{ zh: '传统文化', en: 'traditional culture' }],
    duration_min: 25,
    word_count: 140,
  }, '# translation demo');
}

const difficult = [];
const mastered = [];
for (let day = 1; day <= 10; day++) {
  const words = ['substantial', 'domestic', 'capacity', 'implement', 'significant'].map((w) => `${w}${day}`);
  writeFm(path.join(PATHS.vocab.days, `day${String(day).padStart(2, '0')}.md`), {
    day,
    date: date(-10 + day),
    exam_type: 'cet6',
    words_pushed: words,
    test: { total: 5, correct: 3 + (day % 3), wrong: [words[0]] },
    mastered_today: [words[1]],
    difficult_added: [words[0]],
    review_due: [],
    duration_min: 20,
  }, '# vocab demo');
  difficult.push({ word: words[0], added_day: day, review_count: 1, last_correct: false, last_review: date(-10 + day) });
  mastered.push({ word: words[1], mastered_day: day, mastered_at: date(-10 + day), source: `day${day}` });
}

writeYaml(PATHS.vocab.difficult, difficult);
writeYaml(PATHS.vocab.mastered, mastered);

console.log(`[seed] CET demo data written to ${CET_HOME}`);
