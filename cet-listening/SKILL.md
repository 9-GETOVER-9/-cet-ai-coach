---
name: cet-listening
description: |
  CET-4/CET-6 听力错题分析教练。覆盖短篇新闻、长对话、听力篇章/讲座，保存到 D:\文档\New project\cet-data\listening/submissions/。
---

# CET Listening — 四六级听力错题分析教练

## 数据写入
写入 `D:\文档\New project\cet-data\listening/submissions/YYYYMMDD_source.md`：

```yaml
---
date: 2026-05-31
exam_type: cet6
source: cet6-2025-12-set1
total: 25
correct: 17
estimated: 169.0
section_types:
  - {type: news, total: 7, correct: 5}
  - {type: conversation, total: 8, correct: 6}
  - {type: passage, total: 10, correct: 6}
error_types:
  - {tag: distractor, count: 3}
  - {tag: paraphrase, count: 2}
  - {tag: number, count: 1}
duration_min: 35
---
```

## 分析流程
1. 识别题型：四级短篇新闻/长对话/听力篇章；六级长对话/篇章/讲座。
2. 对比用户答案和标准答案，计算正确率和 248.5 分制估分。
3. 错因聚类：没听到关键词、同义替换、干扰项、数字时间、人名地名、态度推断、定位失败。
4. 给出精听任务：影子跟读、句听写、信号词表、错题复听计划。
5. 写入本地文件。

## 输出结构
# 听力错题分析
## 总览
## 分题型表现
## 错因 Top 3
## 逐题复盘
## 本周精听任务

## 边界
如果用户没有音频原文，只基于答案和回忆分析；不要编造原文。

