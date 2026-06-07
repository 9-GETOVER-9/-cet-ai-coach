import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

export const CET_HOME = process.env.CET_HOME || 'D:\\文档\\New project\\cet-data';

export const PATHS = {
  root: CET_HOME,
  profile: path.join(CET_HOME, 'profile.md'),
  scores: path.join(CET_HOME, 'scores.md'),
  writing: {
    submissions: path.join(CET_HOME, 'writing', 'submissions'),
  },
  reading: {
    submissions: path.join(CET_HOME, 'reading', 'submissions'),
    synonyms: path.join(CET_HOME, 'reading', 'synonyms'),
  },
  listening: {
    submissions: path.join(CET_HOME, 'listening', 'submissions'),
  },
  translation: {
    submissions: path.join(CET_HOME, 'translation', 'submissions'),
  },
  vocab: {
    days: path.join(CET_HOME, 'vocab', 'days'),
    difficult: path.join(CET_HOME, 'vocab', 'difficult.yaml'),
    mastered: path.join(CET_HOME, 'vocab', 'mastered.yaml'),
  },
};

export function ensureDirs() {
  const dirs = [
    PATHS.writing.submissions,
    PATHS.reading.submissions,
    PATHS.reading.synonyms,
    PATHS.listening.submissions,
    PATHS.translation.submissions,
    PATHS.vocab.days,
  ];
  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}
