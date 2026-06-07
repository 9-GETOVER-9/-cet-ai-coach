# 四六级 AI 教练 V1

> 一套装在你自己电脑上的 CET-4/CET-6 备考工具：AI 教练 + 本地数据仪表板。所有数据只在你电脑里，没有云端，没有账号。

## 它能做什么
- 写作：审题、批改、估分、升级范文。
- 听力：分析短篇新闻、长对话、篇章/讲座错题，生成精听任务。
- 阅读：分析选词填空、长篇匹配、仔细阅读，积累同义替换。
- 翻译：批改汉译英，提取主题表达。
- 词汇：每日推词、复习测试、难词池、已掌握词。
- 诊断：根据 CET-4/CET-6 当前分数、目标分、考试日期生成计划。
- 仪表盘：本地浏览器查看总分趋势、分项表现、错因和学习热力图。

## 三个目录
```text
本安装包/                              装机和更新用
~/.claude/skills/cet*/                 Claude Code 读取 skill 的地方
D:\文档\New project\cet-data\                                你的四六级学习数据
```

## 安装
Windows 双击 `install.bat`。Mac/Linux 运行：

```bash
bash install.sh
```

首次启动 dashboard：

```powershell
cd "$env:USERPROFILE\.claude\skills\cet-dashboard\dashboard"
npm install
npm start
```

## 常用命令
| 想做什么 | 命令 |
|---|---|
| 总入口 | `/cet` |
| 诊断和计划 | `/cet-diagnose` |
| 写作批改 | `/cet-writing` |
| 听力分析 | `/cet-listening` |
| 阅读分析 | `/cet-reading` |
| 翻译批改 | `/cet-translation` |
| 词汇训练 | `/cet-vocab` |
| 打开仪表盘 | `/cet-dashboard` |

所有练习记录写入 `D:\文档\New project\cet-data\`。程序和数据分离，升级 skill 不会删除你的学习数据。

