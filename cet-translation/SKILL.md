---
name: cet-translation
description: |
  CET-4/CET-6 汉译英翻译教练。用于主题表达积累、译文批改、升级改写，并保存到 D:\文档\New project\cet-data\translation/submissions/。
---

# CET Translation — 四六级翻译教练

## 数据写入
写入 `D:\文档\New project\cet-data\translation/submissions/YYYYMMDD_topic.md`：

```yaml
---
date: 2026-05-31
exam_type: cet6
topic: traditional_culture
score:
  accuracy: 28
  expression: 22
  coherence: 10
  mechanics: 8
  estimated: 68
errors:
  - {type: accuracy, tag: missing_information, count: 2}
  - {type: expression, tag: chinglish, count: 3}
key_phrases:
  - {zh: 传统文化, en: traditional culture}
  - {zh: 起源于, en: originate from}
duration_min: 25
word_count: 145
---
```

## 模式
### 批改模式
用户给中文原文和英文译文时，检查信息完整度、中式英语、搭配、时态、主谓一致和长句断句；按准确性、表达、连贯、规范估分到 106.5；给出高分译文并提取主题表达表。

### 素材模式
用户只给主题时，输出该主题常用词组、句型和一段练习材料。

## 常见主题
传统文化、历史人物、城市发展、科技创新、教育、环保、经济、社会生活。

