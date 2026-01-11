---
title: "深入理解 React Server Components"
description: "React Server Components (RSC) 是 React 生态系统的一次重大变革。本文将带你了解它的工作原理。"
pubDate: "2024-01-10"
heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
tags: ["React", "Frontend", "Technical"]
category: "Tech"
---

React Server Components 允许我们在服务器上渲染组件，直接访问数据库和文件系统，从而减少发送到客户端的 JavaScript 代码量。

## 什么是 RSC？

传统上，React 组件在客户端渲染（CSR）或服务端渲染（SSR）后在客户端水合（Hydration）。RSC 引入了一种新的组件类型，它**只在服务器上运行**，永远不会被打包发送到客户端。

### 优势

1. **零 Bundle Size**：依赖包（如 `date-fns` 或 `lodash`）只在服务端运行，不会增加客户端包体积。
2. **直接后端访问**：可以直接连接 DB。

```tsx
// Server Component
import db from './db';

async function Note({ id }) {
  const note = await db.notes.get(id);
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
    </div>
  );
}
```

## 结论

RSC 是前端开发的未来趋势之一，值得深入研究。
