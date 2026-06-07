---
name: cet-dashboard
description: |
  启动 CET-4/CET-6 本地可视化仪表盘。读取 D:\文档\New project\cet-data\ 数据并在 localhost 展示进度图表。
---

# CET Dashboard — 四六级备考可视化仪表板

## 单一来源原则
Dashboard 只读取 `D:\文档\New project\cet-data\`，不读取 `~/.ielts/`。所有图表来自各 skill 写入的 frontmatter/yaml。

## 启动流程
1. 检查 Node.js：`node --version`，需要 18+。
2. 进入 dashboard 目录：
   - Windows: `%USERPROFILE%\.claude\skills\cet-dashboard\dashboard`
   - Mac/Linux: `~/.claude/skills/cet-dashboard/dashboard`
3. 如无 `node_modules`，运行 `npm install`。
4. 运行 `npm start`。
5. 告诉用户打开 `http://localhost:5173`。

## 页面
总览、分数趋势、写作、阅读、听力、翻译、词汇、时间线。

## 工具脚本
`npm run seed` 生成演示数据，`npm run validate` 检查数据格式，`npm run backup` 备份数据，`npm run reset` 备份后清空。

