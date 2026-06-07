import express from 'express';
import cors from 'cors';
import {
  loadSnapshot,
  loadProfile,
  loadScores,
  loadWriting,
  loadReading,
  loadListening,
  loadTranslation,
  loadVocab,
  loadSynonyms,
  loadTimeline,
} from './lib/scanner.js';
import { ensureDirs, CET_HOME } from './lib/paths.js';

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || '127.0.0.1';
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
ensureDirs();

function safeJson(loader) {
  return (_req, res) => {
    try {
      res.json(loader());
    } catch (e) {
      console.error(`[server] ${loader.name} failed:`, e);
      res.status(500).json({ error: e.message, hint: '查看终端日志，或运行 npm run validate 检查 D:\文档\New project\cet-data\ 数据文件。' });
    }
  };
}

app.get('/api/health', (_req, res) => res.json({ ok: true, cet_home: CET_HOME }));
app.get('/api/snapshot', safeJson(loadSnapshot));
app.get('/api/profile', safeJson(loadProfile));
app.get('/api/scores', safeJson(loadScores));
app.get('/api/writing', safeJson(loadWriting));
app.get('/api/reading', safeJson(loadReading));
app.get('/api/listening', safeJson(loadListening));
app.get('/api/translation', safeJson(loadTranslation));
app.get('/api/vocab', safeJson(loadVocab));
app.get('/api/synonyms', safeJson(loadSynonyms));
app.get('/api/timeline', safeJson(loadTimeline));

app.listen(PORT, HOST, () => {
  console.log(`[server] listening on http://${HOST}:${PORT}`);
  console.log(`[server] data dir: ${CET_HOME}`);
});

