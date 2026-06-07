# CET 四六级 AI 教练 V1

> 把“刷题—对答案—忘记错因”升级为“诊断—训练—复盘—追踪”的本地化备考闭环。

**CET 四六级 AI 教练**是一套面向 CET-4 / CET-6 的 Claude Code Skills 工具集。它不是单纯的题库，也不是只给答案的聊天机器人：每个 Skill 都承担一个明确的教练角色，会帮助你拆解问题、记录错因、安排下一步训练，并将学习结果保存为本地 YAML + Markdown 文件。配套 Dashboard 可以读取这些记录，展示分数趋势、模块表现和学习时间线。

> 当前版本：`V1.0.0`  
> 推荐环境：Windows 10 / 11  
> 项目状态：早期可用版本，持续完善中

---

## 为什么做这个项目

传统四六级复习很容易陷入三个问题：练习数量不断增加，但不知道真正的短板；做完错题只记住答案，没有形成可复用的错因标签；写作和翻译缺少及时反馈，难以判断进步幅度。

这个项目希望把备考从“凭感觉刷题”变成“有记录、有反馈、有下一步动作”的训练过程。

### 传统复习与 AI 教练的区别

| 传统复习方式 | CET AI 教练方式 |
|---|---|
| 做完试卷后只核对答案 | 记录正确率、分项表现、错因标签和耗时 |
| 写作和翻译依赖自己估计 | 提供结构化批改、问题定位和升级版本 |
| 听力错题常常只知道“没听懂” | 区分干扰项、同义替换、数字时间、定位失败等错因 |
| 阅读复盘容易停留在单题答案 | 沉淀同义替换、定位词和题型策略 |
| 词汇复习容易无计划堆数量 | 建立每日推词、复习测试、难词池和已掌握词记录 |
| 备考计划靠主观感觉调整 | 根据目标分、剩余时间和本地记录推荐下一步任务 |
| 历史练习分散在笔记和文件夹 | Dashboard 统一展示趋势与时间线 |

### 核心收益

- **更容易发现真正短板**：不只看总分，而是看题型、错因和训练历史。
- **更容易形成复习闭环**：每次训练都留下可读记录，下一次可以继续追踪。
- **更适合碎片化学习**：可以按模块调用，不必每次都做整套试卷。
- **更尊重个人数据**：练习档案保存在本地目录，可查看、备份和删除。
- **更适合持续迭代**：Skills、数据规范和 Dashboard 相互分离，方便扩展。

---

## 学习闭环

```text
首次诊断
   ↓
选择最需要提升的模块
   ↓
完成一次针对性训练
   ↓
保存结构化记录与错因
   ↓
Dashboard 查看趋势
   ↓
根据结果安排下一次训练
```

这套流程的目标不是替代真题，而是让真题练习产生更多可复用的信息。

---

## Skill 模块

| 模块 | 命令 | 主要作用 | 适合什么时候使用 |
|---|---|---|---|
| 总入口 | `/cet` | 首次摸底、读取学习进度、路由到对应模块 | 不确定下一步做什么时 |
| 成绩诊断 | `/cet-diagnose` | 根据目标分、当前水平和考试日期生成计划 | 备考开始、模考后、复习方向不清时 |
| 写作教练 | `/cet-writing` | 审题、批改、分项估分、范文升级 | 想提高作文质量或积累表达时 |
| 听力教练 | `/cet-listening` | 错因聚类、精听任务、信号词复盘 | 做完听力后不知道错在哪里时 |
| 阅读教练 | `/cet-reading` | 题型分析、定位词、同义替换、限时策略 | 阅读正确率不稳定或速度慢时 |
| 翻译教练 | `/cet-translation` | 汉译英批改、中式英语纠正、主题表达积累 | 想积累高频主题表达时 |
| 词汇训练 | `/cet-vocab` | 每日推词、间隔复习、难词池 | 想建立长期词汇复习节奏时 |
| 本地仪表盘 | `/cet-dashboard` | 展示分数趋势、模块表现和时间线 | 想查看阶段性进步时 |

更详细的 Skill 使用指南见 [`docs/SKILLS-GUIDE.zh-CN.md`](./docs/SKILLS-GUIDE.zh-CN.md)。

---

## 快速开始

### 1. 准备环境

请先安装：

- Claude Code
- Node.js `>= 18`
- npm

### 2. 安装 Skills

Windows 用户双击：

```text
install.bat
```

Mac / Linux 用户运行：

```bash
bash install.sh
```

安装脚本会将 Skills 复制到：

```text
~/.claude/skills/
```

Windows 中通常对应：

```text
%USERPROFILE%\.claude\skills\
```

### 3. 启动 Dashboard

Windows PowerShell：

```powershell
cd "$env:USERPROFILE\.claude\skills\cet-dashboard\dashboard"
npm install
npm start
```

启动后在浏览器打开：

```text
http://localhost:5173
```

### 4. 开始训练

在 Claude Code 中输入：

```text
/cet
```

首次使用时，系统会询问考试类型、目标分数、考试日期和当前水平，然后推荐下一步训练任务。

---

## 本地数据与隐私

练习记录会保存为本地纯文本文件。Dashboard 读取这些文件后生成图表。

当前 V1 默认数据目录为：

```text
D:\文档\New project\cet-data\
```

Dashboard 也支持通过环境变量 `CET_HOME` 指定其他目录。例如：

```powershell
$env:CET_HOME = "$env:USERPROFILE\.cet"
npm start
```

完整数据规范见 [`SCHEMA.md`](./SCHEMA.md)。

### 需要注意

“本地数据”是指练习档案和 Dashboard 数据保存在本机。Claude Code 本身是否连接外部服务、如何处理对话数据，取决于 Claude Code 的产品设置和服务条款。因此，本项目不应被描述为完全离线 AI。

请勿将个人学习数据目录提交到公开仓库。根目录 `.gitignore` 已默认排除：

```text
cet-data/
node_modules/
dist/
.npm-cache/
.env
*.log
```

---

## Dashboard 页面

Dashboard 当前提供：

- 总览
- 分数趋势
- 写作
- 阅读
- 听力
- 翻译
- 词汇
- 时间线

常用命令：

```bash
npm start          # 启动前端和后端
npm test           # 运行测试
npm run build      # 构建前端
npm run seed       # 生成演示数据
npm run validate   # 检查数据格式
npm run backup     # 备份学习数据
npm run reset      # 备份后清空学习数据
```

---

## 项目结构

```text
cet-ai-coach/
├─ cet/                      # 总入口 Skill
├─ cet-diagnose/             # 成绩诊断 Skill
├─ cet-writing/              # 写作 Skill
├─ cet-listening/            # 听力 Skill
├─ cet-reading/              # 阅读 Skill
├─ cet-translation/          # 翻译 Skill
├─ cet-vocab/                # 词汇 Skill
├─ cet-dashboard/            # Dashboard Skill 与 Web 应用
│  └─ dashboard/
├─ docs/                     # 使用指南与项目介绍
├─ install.bat               # Windows 安装脚本
├─ install.sh                # Mac / Linux 安装脚本
├─ QUICKSTART.zh-CN.md       # 中文快速入门
├─ SCHEMA.md                 # 本地数据规范
└─ README.md                 # 项目说明
```

---

## 已知限制

- V1 的多个 Skill 仍使用 Windows 默认数据路径，跨平台配置尚未完全统一。
- Dashboard 首次使用前需要执行 `npm install`。
- AI 估分仅用于备考参考和趋势追踪，不能替代官方成绩。
- 项目处于早期版本，建议先备份个人学习数据后再升级。

---

## 文档

- [Skill 详细指南](./docs/SKILLS-GUIDE.zh-CN.md)
- [使用 GitHub Desktop 更新文档](./docs/GITHUB-DESKTOP-UPDATE.zh-CN.md)
- [5 分钟安装指南](./QUICKSTART.zh-CN.md)
- [数据规范](./SCHEMA.md)

---

## 路线图

- 统一配置 `CET_HOME`，减少硬编码路径
- 完善 Mac / Linux 支持
- 增加 Dashboard 截图和示例数据
- 增加更多自动化测试
- 补充贡献指南与版本更新日志

---

## 免责声明

本项目不是全国大学英语四、六级考试官方工具，也不隶属于任何考试机构。所有 AI 生成内容和估分结果仅供学习与备考参考。

## License

本项目采用 MIT License，详见 [`LICENSE`](./LICENSE)。
