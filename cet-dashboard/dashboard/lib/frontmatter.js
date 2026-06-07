import fs from 'node:fs';

function parseScalar(value) {
  const raw = String(value).trim();
  if (raw === 'null') return null;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  return raw.replace(/^['"]|['"]$/g, '');
}

function splitTopLevel(text) {
  const items = [];
  let current = '';
  let depth = 0;
  for (const ch of text) {
    if (ch === '[' || ch === '{') depth += 1;
    if (ch === ']' || ch === '}') depth -= 1;
    if (ch === ',' && depth === 0) {
      items.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) items.push(current.trim());
  return items;
}

function parseInlineMap(raw) {
  const inner = raw.trim().replace(/^\{|\}$/g, '');
  const out = {};
  for (const item of splitTopLevel(inner)) {
    const idx = item.indexOf(':');
    if (idx === -1) continue;
    out[item.slice(0, idx).trim()] = parseValue(item.slice(idx + 1).trim());
  }
  return out;
}

function parseValue(raw) {
  const text = String(raw).trim();
  if (text.startsWith('{') && text.endsWith('}')) return parseInlineMap(text);
  if (text.startsWith('[') && text.endsWith(']')) {
    const inner = text.slice(1, -1).trim();
    return inner ? splitTopLevel(inner).map(parseValue) : [];
  }
  return parseScalar(text);
}

function parseBlock(lines, start, indent) {
  const out = {};
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    const currentIndent = line.match(/^ */)[0].length;
    if (currentIndent < indent) break;
    if (currentIndent > indent) { i += 1; continue; }
    const trimmed = line.trim();
    const keyMatch = trimmed.match(/^([^:]+):(.*)$/);
    if (!keyMatch) { i += 1; continue; }
    const key = keyMatch[1].trim();
    const rest = keyMatch[2].trim();
    if (rest) {
      out[key] = parseValue(rest);
      i += 1;
      continue;
    }
    const next = lines[i + 1] || '';
    if (next.trim().startsWith('- ')) {
      const arr = [];
      i += 1;
      while (i < lines.length && lines[i].match(/^ */)[0].length >= indent + 2 && lines[i].trim().startsWith('- ')) {
        arr.push(parseValue(lines[i].trim().slice(2)));
        i += 1;
      }
      out[key] = arr;
    } else {
      const nested = parseBlock(lines, i + 1, indent + 2);
      out[key] = nested.value;
      i = nested.index;
    }
  }
  return { value: out, index: i };
}

export function parseYaml(text) {
  const lines = String(text).split(/\r?\n/);
  const first = lines.find((line) => line.trim());
  if (first?.match(/^ *- /)) {
    return lines
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => parseValue(line.trim().slice(2)));
  }
  return parseBlock(lines, 0, 0).value;
}

export function parseFrontmatter(raw) {
  const match = String(raw).match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  return match ? parseYaml(match[1]) : {};
}

export function readFrontmatter(file) {
  return parseFrontmatter(fs.readFileSync(file, 'utf8'));
}

export function dumpYaml(value, indent = 0) {
  if (Array.isArray(value)) {
    return value.map((item) => `${' '.repeat(indent)}- ${formatYamlValue(item, indent + 2)}`).join('\n');
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).map(([key, val]) => {
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        return `${' '.repeat(indent)}${key}:\n${dumpYaml(val, indent + 2)}`;
      }
      return `${' '.repeat(indent)}${key}: ${formatYamlValue(val, indent + 2)}`;
    }).join('\n');
  }
  return formatYamlValue(value, indent);
}

function formatYamlValue(value, indent) {
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item !== 'object')) return `[${value.join(', ')}]`;
    return `\n${dumpYaml(value, indent)}`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.entries(value).map(([k, v]) => `${k}: ${formatYamlValue(v, indent)}`).join(', ')}}`;
  }
  return String(value);
}
