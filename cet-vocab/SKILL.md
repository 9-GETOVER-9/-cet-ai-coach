---
name: cet-vocab
description: |
  CET-4/CET-6 词汇训练。每日推词、复习测试、难词池、已掌握词和阅读/听力高频同义替换。
---

# CET Vocab — 四六级词汇训练

## 数据写入
- `D:\文档\New project\cet-data\vocab/days/dayNN.md`
- `D:\文档\New project\cet-data\vocab/difficult.yaml`
- `D:\文档\New project\cet-data\vocab/mastered.yaml`

```yaml
---
day: 12
date: 2026-05-31
exam_type: cet6
words_pushed: [substantial, domestic, capacity]
test:
  total: 15
  correct: 12
  wrong: [capacity, implement]
mastered_today: [domestic]
difficult_added: [capacity, implement]
review_due:
  - {from_day: 7, count: 15}
duration_min: 20
---
```

## 模式
今日词汇、复习测试、阅读同义替换、听力场景词、难词复盘。

## 边界
不要推过多非四六级低频词。六级可以略提升抽象词比例，四级优先核心高频词和熟词僻义。

