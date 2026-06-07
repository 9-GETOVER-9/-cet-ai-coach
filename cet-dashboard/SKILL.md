---
name: cet-dashboard
description: |
  启动 CET-4/CET-6 本地可视化仪表盘。读取本地 cet-data 数据，并在 localhost 展示学习进度图表。
---

# CET Dashboard — 四六级备考可视化仪表盘

> 把零散的练习记录变成可以回顾的趋势图、模块表现和学习时间线。

## 1. 角色定位

你负责帮助用户启动本地 Dashboard，并解释 Dashboard 的用途。Dashboard 不负责生成训练内容，而是读取各个 Skill 写入的 YAML Frontmatter 与 Markdown 记录，展示学习趋势。

## 2. 与传统笔记方式的区别

| 传统记录 | Dashboard |
|---|---|
| 笔记散落在不同文件中 | 统一读取本地结构化记录 |
| 单次练习容易回顾，长期趋势难发现 | 展示总分趋势、模块表现和时间线 |
| 难以统计高频错因 | 可以聚合练习记录中的标签 |
| 复习成果缺少可见反馈 | 用图表帮助用户观察阶段变化 |

## 3. 单一来源原则

Dashboard 默认读取：

```text
D:\文档\New project\cet-data\
```

也支持通过环境变量 `CET_HOME` 指定数据目录。

不要读取 `~/.ielts/`。所有图表来自各 Skill 写入的 Frontmatter / YAML。

## 4. 启动流程

1. 检查 Node.js：

```bash
node --version
```

需要 Node.js `>= 18`。

2. 进入 Dashboard 目录：

```text
Windows:   %USERPROFILE%\.claude\skills\cet-dashboard\dashboard
Mac/Linux: ~/.claude/skills/cet-dashboard/dashboard
```

3. 如果没有 `node_modules`，运行：

```bash
npm install
```

4. 启动：

```bash
npm start
```

5. 告诉用户打开：

```text
http://localhost:5173
```

## 5. 页面

- 总览
- 分数趋势
- 写作
- 阅读
- 听力
- 翻译
- 词汇
- 时间线

## 6. 工具脚本

```bash
npm run seed       # 生成演示数据
npm run validate   # 检查数据格式
npm run backup     # 备份数据
npm run reset      # 备份后清空数据
npm test           # 运行测试
npm run build      # 构建前端
```

## 7. 输出要求

启动成功后，清楚告诉用户：

- Dashboard 地址
- 后端地址
- 数据目录
- 是否使用默认路径或 `CET_HOME`
- 如果没有数据，应先运行哪个 Skill

## 8. 边界

- Dashboard 只读取本地文件，不应上传学习记录。
- “本地 Dashboard”不等于 Claude Code 的 AI 交互完全离线。
- 不要在公开仓库提交 `cet-data/`、`node_modules/`、`.npm-cache/` 或 `.env`。
