# 四六级 AI 教练 · 5 分钟安装指南

这是一套本地 CET-4/CET-6 备考工具。AI 帮你批改写作、分析听力阅读错题、训练翻译和词汇；dashboard 在浏览器里显示进度图表。

## 第 1 步：安装 skill
Windows：双击 `install.bat`。

Mac/Linux：
```bash
bash install.sh
```

## 第 2 步：启动 dashboard
```powershell
cd "$env:USERPROFILE\.claude\skills\cet-dashboard\dashboard"
npm install
npm start
```

## 第 3 步：开始使用
在 Claude Code 里输入 `/cet`。

常用命令：`/cet-diagnose`、`/cet-writing`、`/cet-listening`、`/cet-reading`、`/cet-translation`、`/cet-vocab`、`/cet-dashboard`。
