import fs from 'node:fs';
import path from 'node:path';
import { PATHS, exists } from './paths.js';
import { parseFrontmatter, parseYaml } from './frontmatter.js';
import {
  profileSchema,
  scoresSchema,
  writingSubmissionSchema,
  readingSubmissionSchema,
  listeningSubmissionSchema,
  translationSubmissionSchema,
  vocabDaySchema,
  safeParse,
} from './schema.js';

const issues = [];

function pushIssue(file, error) {
  issues.push({ file: path.relative(PATHS.root, file), error });
}

export function clearIssues() {
  issues.length = 0;
}

export function getIssues() {
  return [...issues];
}

function readFm(file) {
  if (!exists(file)) return null;
  try {
    return parseFrontmatter(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    pushIssue(file, `parse error: ${e.message}`);
    return null;
  }
}

function readYaml(file) {
  if (!exists(file)) return null;
  try {
    return parseYaml(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    pushIssue(file, `yaml parse error: ${e.message}`);
    return null;
  }
}

function listFiles(dir, ext) {
  if (!exists(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(ext)).map((f) => path.join(dir, f)).sort();
}

function validate(schema, data, file) {
  const r = safeParse(schema, data, file);
  if (!r.ok) {
    pushIssue(file, r.issues.map((i) => `${i.path}: ${i.message}`).join('; '));
    return null;
  }
  return r.data;
}

function aggregateErrors(items, field = 'errors') {
  const agg = {};
  for (const item of items) {
    for (const e of item[field] || []) {
      const key = e.type ? `${e.type}:${e.tag}` : e.tag;
      agg[key] = (agg[key] || 0) + (e.count || 1);
    }
  }
  return Object.entries(agg).map(([key, count]) => {
    const parts = key.split(':');
    return parts.length === 2 ? { type: parts[0], tag: parts[1], count } : { tag: key, count };
  }).sort((a, b) => b.count - a.count).slice(0, 20);
}

function typeDistribution(submissions, key) {
  const agg = {};
  for (const s of submissions) {
    for (const t of s[key] || []) {
      if (!agg[t.type]) agg[t.type] = { total: 0, correct: 0 };
      agg[t.type].total += t.total;
      agg[t.type].correct += t.correct;
    }
  }
  return Object.entries(agg).map(([type, v]) => ({
    type,
    total: v.total,
    correct: v.correct,
    accuracy: v.total ? +(v.correct / v.total).toFixed(3) : 0,
  })).sort((a, b) => b.total - a.total);
}

export function loadProfile() {
  const fm = readFm(PATHS.profile);
  return fm ? validate(profileSchema, fm, PATHS.profile) : null;
}

export function loadScores() {
  const fm = readFm(PATHS.scores);
  const r = fm ? validate(scoresSchema, fm, PATHS.scores) : null;
  return r || { records: [] };
}

export function loadWriting() {
  const submissions = listFiles(PATHS.writing.submissions, '.md').map((f) => {
    const fm = readFm(f);
    const v = fm && validate(writingSubmissionSchema, fm, f);
    return v && { ...v, file: path.basename(f) };
  }).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
  return { submissions, top_errors: aggregateErrors(submissions), count: submissions.length };
}

export function loadReading() {
  const submissions = listFiles(PATHS.reading.submissions, '.md').map((f) => {
    const fm = readFm(f);
    const v = fm && validate(readingSubmissionSchema, fm, f);
    return v && { ...v, file: path.basename(f) };
  }).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
  return {
    submissions,
    question_type_distribution: typeDistribution(submissions, 'question_types'),
    top_errors: aggregateErrors(submissions),
    count: submissions.length,
  };
}

export function loadSynonyms() {
  const items = [];
  for (const f of listFiles(PATHS.reading.synonyms, '.yaml')) {
    const data = readYaml(f);
    if (Array.isArray(data)) {
      for (const item of data) {
        if (item?.original && item?.paraphrase) {
          items.push({
            original: item.original,
            paraphrase: item.paraphrase,
            source: item.source || path.basename(f, '.yaml'),
            context: item.context || null,
          });
        }
      }
    }
  }
  return { items, count: items.length };
}

export function loadListening() {
  const submissions = listFiles(PATHS.listening.submissions, '.md').map((f) => {
    const fm = readFm(f);
    const v = fm && validate(listeningSubmissionSchema, fm, f);
    return v && { ...v, file: path.basename(f) };
  }).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
  return {
    submissions,
    type_distribution: typeDistribution(submissions, 'section_types'),
    top_errors: aggregateErrors(submissions, 'error_types'),
    count: submissions.length,
  };
}

export function loadTranslation() {
  const submissions = listFiles(PATHS.translation.submissions, '.md').map((f) => {
    const fm = readFm(f);
    const v = fm && validate(translationSubmissionSchema, fm, f);
    return v && { ...v, file: path.basename(f) };
  }).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
  const keyPhrases = submissions.flatMap((s) => (s.key_phrases || []).map((p) => ({
    ...p,
    topic: s.topic,
    date: s.date,
  })));
  return { submissions, key_phrases: keyPhrases, top_errors: aggregateErrors(submissions), count: submissions.length };
}

export function loadVocab() {
  const days = listFiles(PATHS.vocab.days, '.md').map((f) => {
    const fm = readFm(f);
    const v = fm && validate(vocabDaySchema, fm, f);
    return v && { ...v, file: path.basename(f) };
  }).filter(Boolean).sort((a, b) => a.day - b.day);

  const difficult = readYaml(PATHS.vocab.difficult);
  const mastered = readYaml(PATHS.vocab.mastered);
  const recent = days.filter((d) => d.test).slice(-7);
  const recentAvg = recent.length
    ? +(recent.reduce((s, d) => s + d.test.correct / d.test.total, 0) / recent.length).toFixed(3)
    : null;

  return {
    days,
    difficult: Array.isArray(difficult) ? difficult : [],
    mastered: Array.isArray(mastered) ? mastered : [],
    summary: {
      current_day: days.at(-1)?.day || 0,
      total_pushed: days.reduce((s, d) => s + (d.words_pushed?.length || 0), 0),
      total_mastered: Array.isArray(mastered) ? mastered.length : 0,
      total_difficult: Array.isArray(difficult) ? difficult.length : 0,
      recent_test_accuracy: recentAvg,
    },
  };
}

export function loadTimeline() {
  const events = [];
  for (const s of loadWriting().submissions) events.push({ date: s.date, type: 'writing', label: s.topic, score: s.score.estimated });
  for (const s of loadReading().submissions) events.push({ date: s.date, type: 'reading', label: s.source, score: s.estimated || null, accuracy: s.accuracy });
  for (const s of loadListening().submissions) events.push({ date: s.date, type: 'listening', label: s.source, score: s.estimated || null });
  for (const s of loadTranslation().submissions) events.push({ date: s.date, type: 'translation', label: s.topic, score: s.score.estimated });
  for (const d of loadVocab().days) {
    events.push({
      date: d.date,
      type: 'vocab',
      label: `Day ${d.day} (${d.words_pushed?.length || 0} words)`,
      score: d.test ? +(d.test.correct / d.test.total).toFixed(2) : null,
    });
  }
  events.sort((a, b) => a.date.localeCompare(b.date));
  const heatmap = {};
  for (const e of events) heatmap[e.date] = (heatmap[e.date] || 0) + 1;
  return { events, heatmap };
}

export function loadSnapshot() {
  clearIssues();
  return {
    profile: loadProfile(),
    scores: loadScores(),
    writing: loadWriting(),
    reading: loadReading(),
    listening: loadListening(),
    translation: loadTranslation(),
    vocab: loadVocab(),
    synonyms: loadSynonyms(),
    timeline: loadTimeline(),
    issues: getIssues(),
    generated_at: new Date().toISOString(),
  };
}
