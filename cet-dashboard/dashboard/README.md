# CET Dashboard（本地仪表盘）

读取 `D:\文档\New project\cet-data\` 中的四六级备考数据，并在本地浏览器展示。

## 快速启动
```bash
npm install
npm start
```

前端默认 `http://localhost:5173`，后端默认 `http://127.0.0.1:4000`。

## 常用命令
- `npm run seed`：写入演示数据到 `D:\文档\New project\cet-data\`
- `npm run validate`：检查数据格式
- `npm run backup`：备份数据
- `npm run reset`：备份后清空数据

## 数据流
`/cet-*` skills 写入 `D:\文档\New project\cet-data\`，Express 后端扫描 frontmatter/yaml，React 前端展示趋势和统计。

