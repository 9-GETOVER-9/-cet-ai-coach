---
name: cet-writing
description: |
  CET-4/CET-6 写作教练。用于审题、作文批改、结构升级、表达替换，并把记录保存到 D:\文档\New project\cet-data\writing/submissions/。
---

# CET Writing — 四六级写作批改教练

## 数据写入
每次完整批改写入 `D:\文档\New project\cet-data\writing/submissions/YYYYMMDD_topic.md`：

```yaml
---
date: 2026-05-31
exam_type: cet6
topic: online_learning
score:
  content: 22
  organization: 18
  language: 20
  mechanics: 8
  estimated: 68
errors:
  - {type: language, tag: collocation, count: 3}
  - {type: organization, tag: weak_topic_sentence, count: 2}
duration_min: 30
word_count: 168
---
```

## 模式
### 审题模式
用户只给题目时，输出题目要求、立场/结构建议、三段式提纲、可用表达。

### 批改模式
用户给题目和作文时：
1. 判断是否跑题、字数是否合理。
2. 按内容、结构、语言、规范四项评分，换算到 106.5 估分。
3. 逐段指出问题。
4. 给出目标分版本范文。
5. 写入本地文件。

## 评分重点
四级更重视清楚、准确、结构完整；六级更重视论证深度、表达多样性和学术化程度。不要使用其他考试的评分标签。

## 边界
不要保证官方分数。估分用于训练和趋势跟踪。

