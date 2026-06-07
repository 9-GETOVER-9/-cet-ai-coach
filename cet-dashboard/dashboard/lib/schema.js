function issue(path, message) {
  return { path, message };
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function validateExamType(value, path, issues, optional = false) {
  if (value == null && optional) return;
  if (value !== 'cet4' && value !== 'cet6') issues.push(issue(path, 'Expected cet4 or cet6'));
}

function requireString(obj, key, issues) {
  if (typeof obj[key] !== 'string') issues.push(issue(key, 'Expected string'));
}

function requireNumber(obj, key, issues) {
  if (!isNumber(obj[key])) issues.push(issue(key, 'Expected number'));
}

function validateArray(value, path, issues) {
  if (!Array.isArray(value)) issues.push(issue(path, 'Expected array'));
}

export const profileSchema = {
  parse(data, issues) {
    validateExamType(data.exam_type, 'exam_type', issues);
    requireNumber(data, 'goal_score', issues);
    if (!isObject(data.current)) issues.push(issue('current', 'Expected object'));
  },
};

export const scoresSchema = {
  parse(data, issues) {
    validateArray(data.records, 'records', issues);
  },
};

export const writingSubmissionSchema = {
  parse(data, issues) {
    requireString(data, 'date', issues);
    validateExamType(data.exam_type, 'exam_type', issues);
    requireString(data, 'topic', issues);
    if (!isObject(data.score)) issues.push(issue('score', 'Expected object'));
    else requireNumber(data.score, 'estimated', issues);
  },
};

export const readingSubmissionSchema = {
  parse(data, issues) {
    requireString(data, 'date', issues);
    validateExamType(data.exam_type, 'exam_type', issues);
    requireString(data, 'source', issues);
    requireNumber(data, 'total', issues);
    requireNumber(data, 'correct', issues);
    requireNumber(data, 'accuracy', issues);
  },
};

export const listeningSubmissionSchema = {
  parse(data, issues) {
    requireString(data, 'date', issues);
    validateExamType(data.exam_type, 'exam_type', issues);
    requireString(data, 'source', issues);
    requireNumber(data, 'total', issues);
    requireNumber(data, 'correct', issues);
  },
};

export const translationSubmissionSchema = {
  parse(data, issues) {
    requireString(data, 'date', issues);
    validateExamType(data.exam_type, 'exam_type', issues);
    requireString(data, 'topic', issues);
    if (!isObject(data.score)) issues.push(issue('score', 'Expected object'));
    else requireNumber(data.score, 'estimated', issues);
  },
};

export const vocabDaySchema = {
  parse(data, issues) {
    requireNumber(data, 'day', issues);
    requireString(data, 'date', issues);
    if (data.exam_type != null) validateExamType(data.exam_type, 'exam_type', issues);
    if (data.words_pushed != null && !Array.isArray(data.words_pushed)) issues.push(issue('words_pushed', 'Expected array'));
  },
};

export function safeParse(schema, data, file) {
  const issues = [];
  if (!isObject(data)) issues.push(issue('', 'Expected object'));
  else schema.parse(data, issues);

  if (!issues.length) return { ok: true, data };
  return { ok: false, file, issues };
}
