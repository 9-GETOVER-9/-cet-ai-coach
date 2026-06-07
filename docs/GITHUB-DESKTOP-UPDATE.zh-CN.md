# 使用 GitHub Desktop 更新项目文档

> 适用于已经成功上传仓库，之后想替换 README、Skill 文档或其他文件的情况。

## 最重要的一句话

不要把文件拖进 GitHub Desktop 窗口。GitHub Desktop 不是文件上传框。

正确方式是：

```text
将新文件复制到本地仓库文件夹
→ GitHub Desktop 自动识别变化
→ Commit to main
→ Push origin
```

---

## 1. 找到本地仓库文件夹

打开 GitHub Desktop，确认左上角 `Current repository` 是你的项目，例如：

```text
cet-ai-coach
```

然后点击顶部菜单：

```text
Repository
→ Show in Explorer
```

Windows 文件资源管理器会打开真正的本地仓库根目录。

正确的根目录中应该能直接看到：

```text
README.md
SCHEMA.md
cet/
cet-writing/
cet-dashboard/
```

如果你打开后只看到另一个 `cet-ai-coach` 文件夹，说明你还在外层目录，需要继续进入内层仓库文件夹。

---

## 2. 覆盖文档文件

将文档更新包解压后，把更新包中的内容复制到本地仓库根目录。

Windows 提示是否替换文件时，选择：

```text
替换目标中的文件
```

本次文档更新通常会修改或新增：

```text
README.md
LICENSE
docs/SKILLS-GUIDE.zh-CN.md
docs/GITHUB-DESKTOP-UPDATE.zh-CN.md
cet/SKILL.md
cet-diagnose/SKILL.md
cet-writing/SKILL.md
cet-listening/SKILL.md
cet-reading/SKILL.md
cet-translation/SKILL.md
cet-vocab/SKILL.md
cet-dashboard/SKILL.md
```

不要把整个更新包文件夹再套一层复制进去。正确结构是：

```text
cet-ai-coach/
├─ README.md
├─ LICENSE
├─ cet/
├─ cet-writing/
└─ docs/
```

错误结构是：

```text
cet-ai-coach/
└─ cet-ai-coach-docs-upgrade/
   ├─ README.md
   ├─ cet/
   └─ docs/
```

---

## 3. 在 GitHub Desktop 中检查变化

回到 GitHub Desktop，左侧 `Changes` 页面会自动出现文件列表。

常见标记：

```text
绿色加号     新增文件
黄色圆点     修改文件
红色减号     删除文件
```

点击每一个文件，可以在右侧查看修改前后的差异。

本次更新前，请特别确认没有意外加入：

```text
node_modules/
.npm-cache/
dist/
cet-data/
.env
```

如果出现这些文件，不要提交。先检查是否复制错了目录。

---

## 4. 提交更新

在左下角 `Summary` 填写：

```text
docs: expand skill documentation
```

`Description` 可以填写：

```text
Add detailed Skill guides, traditional-vs-AI comparison, benefits, local data notes and GitHub Desktop update instructions.
```

点击：

```text
Commit to main
```

这一步只会保存到你电脑上的本地 Git 仓库。

---

## 5. 推送到 GitHub 网站

提交完成后，点击顶部：

```text
Push origin
```

等待同步完成后，点击：

```text
Repository
→ View on GitHub
```

在浏览器打开仓库首页，确认 README 已更新。

---

## 6. 如果顶部显示 Fetch origin 或 Pull origin

如果你曾经在 GitHub 网页端修改过文件，或者其他人也在编辑仓库，建议先点击：

```text
Fetch origin
```

如果随后出现：

```text
Pull origin
```

先点击它，将网页端的新修改同步到本地，再复制文档文件并提交。

---

## 7. 如果 GitHub Desktop 没有显示变化

依次检查：

1. 左上角 `Current repository` 是否选中了正确仓库。
2. 新文件是否复制到了真正的仓库根目录。
3. 是否意外复制到外层文件夹。
4. 文件是否真的发生变化。
5. 是否将更新包整个文件夹套在仓库中。

最可靠的方法仍然是：

```text
Repository
→ Show in Explorer
```

然后直接在打开的目录中覆盖文件。
