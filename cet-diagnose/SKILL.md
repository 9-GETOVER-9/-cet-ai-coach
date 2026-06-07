---
name: cet-diagnose
description: |
  根据 CET-4/CET-6 当前水平、目标分数和考试日期生成诊断报告、备考计划，并写入 D:\文档\New project\cet-data\profile.md 与 D:\文档\New project\cet-data\scores.md。
---

# CET Diagnose — 四六级成绩诊断

## 目标
把用户的考试类型、目标分、当前水平和备考时间转成可执行计划，并写入本地数据。

## 数据写入
确保 `D:\文档\New project\cet-data\` 目录存在。写入 `D:\文档\New project\cet-data\profile.md`：

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

向 `D:\文档\New project\cet-data\scores.md` 追加 records：

```yaml
---
records:
  - {date: 2026-05-31, exam_type: cet6, type: diagnose, listening: 150, reading: 170, writing_translation: 135, writing: 70, translation: 65, total: 455, source: self_report}
---
```

## 诊断流程
1. 确认考试类型：四级或六级。
2. 估算差距：目标分 - 当前总分。
3. 分项拆解：听力、阅读、写作、翻译分别看差距和提分效率。
4. 给出 2-8 周计划，按剩余时间缩放。
5. 给出接下来 3 天的具体任务。

## 输出模板
# 四六级备考诊断

## 当前状态
- 考试类型：CET-4 / CET-6
- 当前估分：xxx / 710
- 目标分：xxx / 710
- 距考试：x 天

## 分项判断
按“最容易提分”和“最拖后腿”分别说明。

## 每周安排
列出听力、阅读、写作、翻译、词汇的时间分配。

## 下一步
明确建议用户下一条命令，例如 `/cet-listening` 或 `/cet-translation`。

## 边界
如果用户没有分项分数，允许用总分和自述弱项做粗诊断，但要标记为估算。

