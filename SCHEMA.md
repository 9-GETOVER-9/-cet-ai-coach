# CET V1 数据规范（SCHEMA）

> 所有 CET skill 写入 `D:\文档\New project\cet-data\` 时必须遵守本规范。Dashboard 启动时按本规范扫描并聚合。

## 目录结构
```text
D:\文档\New project\cet-data\
├─ profile.md
├─ scores.md
├─ writing/submissions/YYYYMMDD_topic.md
├─ reading/submissions/YYYYMMDD_source.md
├─ reading/synonyms/YYYYMMDD_source.yaml
├─ listening/submissions/YYYYMMDD_source.md
├─ translation/submissions/YYYYMMDD_topic.md
└─ vocab/
   ├─ days/dayNN.md
   ├─ difficult.yaml
   └─ mastered.yaml
```

## profile.md
```yaml
---
exam_type: cet6
goal_score: 550
exam_date: 2026-06-13
created_at: 2026-05-31
current: {listening: 150, reading: 170, writing: 70, translation: 65, total: 455}
weekly_hours: 10
focus: [listening, translation]
---
```

## scores.md
```yaml
---
records:
  - {date: 2026-05-31, exam_type: cet6, type: mock, listening: 160, reading: 175, writing_translation: 140, writing: 72, translation: 68, total: 475, source: cet6-2025-12-set1}
---
```

`type`: `mock | real | partial | diagnose`。

## writing/submissions/YYYYMMDD_topic.md
```yaml
---
date: 2026-05-31
exam_type: cet6
topic: online_learning
score: {content: 22, organization: 18, language: 20, mechanics: 8, estimated: 68}
errors:
  - {type: language, tag: collocation, count: 3}
duration_min: 30
word_count: 168
---
```

## reading/submissions/YYYYMMDD_source.md
```yaml
---
date: 2026-05-31
exam_type: cet6
source: cet6-2025-12-reading-set1
total: 30
correct: 22
accuracy: 0.73
estimated: 181.0
question_types:
  - {type: banked_cloze, total: 10, correct: 6}
  - {type: matching, total: 10, correct: 8}
  - {type: careful_reading, total: 10, correct: 8}
errors:
  - {tag: word_form, question: 3, type: banked_cloze}
synonyms_added: 10
duration_min: 40
---
```

## listening/submissions/YYYYMMDD_source.md
```yaml
---
date: 2026-05-31
exam_type: cet6
source: cet6-2025-12-set1
total: 25
correct: 17
estimated: 169.0
section_types:
  - {type: conversation, total: 8, correct: 6}
  - {type: passage, total: 10, correct: 6}
  - {type: lecture, total: 7, correct: 5}
error_types:
  - {tag: distractor, count: 3}
duration_min: 35
---
```

## translation/submissions/YYYYMMDD_topic.md
```yaml
---
date: 2026-05-31
exam_type: cet6
topic: traditional_culture
score: {accuracy: 28, expression: 22, coherence: 10, mechanics: 8, estimated: 68}
errors:
  - {type: expression, tag: chinglish, count: 3}
key_phrases:
  - {zh: 传统文化, en: traditional culture}
duration_min: 25
word_count: 145
---
```

## vocab/days/dayNN.md
```yaml
---
day: 12
date: 2026-05-31
exam_type: cet6
words_pushed: [substantial, domestic, capacity]
test: {total: 15, correct: 12, wrong: [capacity]}
mastered_today: [domestic]
difficult_added: [capacity]
review_due:
  - {from_day: 7, count: 15}
duration_min: 20
---
```

