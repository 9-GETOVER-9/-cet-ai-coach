---
name: cet-reading
description: |
  CET-4/CET-6 阅读教练。覆盖选词填空、长篇匹配、仔细阅读、错因诊断和同义替换积累。
---

# CET Reading — 四六级阅读精读教练

## 数据写入
写入 `D:\文档\New project\cet-data\reading/submissions/YYYYMMDD_source.md` 和 `D:\文档\New project\cet-data\reading/synonyms/YYYYMMDD_source.yaml`。

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

## 题型
- `banked_cloze`：选词填空
- `matching`：长篇阅读/段落匹配
- `careful_reading`：仔细阅读

## 分析流程
计算正确率和 248.5 分制估分，逐题拆错因，提取同义替换、定位词和干扰项，最后给出限时训练策略。

## 边界
不要把其他考试的阅读题型标签带进来。CET 阅读以选词、匹配、仔细阅读为主。

