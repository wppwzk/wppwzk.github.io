# My Technical Blog

这是一个基于 **Astro** 和 **Tailwind CSS** 构建的个人技术博客。

## 特性

- ⚡ **极速性能**: 基于 Astro 静态生成。
- 🎨 **现代设计**: 使用 Tailwind CSS，支持深色/浅色模式。
- 📱 **响应式**: 完美适配移动端和桌面端。
- 🔍 **全文搜索**: 内置 Fuse.js 客户端搜索。
- 🏷️ **标签系统**: 按标签组织文章。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

启动本地开发服务器：

```bash
npm run dev
```

打开浏览器访问 `http://localhost:4321`。

### 3. 构建发布

构建生产环境版本：

```bash
npm run build
```

生成的文件将位于 `dist/` 目录。

## 如何写文章

在 `src/content/blog/` 目录下创建一个新的 `.md` 文件。

文件头 (Frontmatter) 格式如下：

```markdown
---
title: "文章标题"
description: "文章简短描述"
pubDate: "2024-01-11"
heroImage: "/blog-placeholder-1.jpg" # 可选
tags: ["标签1", "标签2"]
category: "分类" # 可选
---

这里写正文内容...
```

## 部署到 GitHub Pages

在 `astro.config.mjs` 中修改 `site` 和 `base` 配置以匹配你的 GitHub 仓库。

然后可以使用 GitHub Actions 自动部署。
