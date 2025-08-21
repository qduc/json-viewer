# 🧩 JSON Formatter & Explorer

A fast, developer-friendly **single-page React app** for working with JSON.  
Validate, beautify, minify, escape/unescape, and explore JSON with a collapsible tree view and powerful filtering.  

Built with **React + TypeScript + Vite**, designed for speed (handles multi-MB JSON), and optimized for everyday developer workflows.

---

## ✨ Features

- **Validation**
  - Real-time linting with line/column error messages
  - Highlights errors directly in the editor

- **Formatting**
  - Beautify (configurable indentation)
  - Minify (compact output)
  - Escape → turn text into a JSON string literal
  - Unescape → parse JSON string literals back into raw text

- **Tree Explorer**
  - Collapse/expand nodes
  - Expand all / collapse all
  - Expand by depth level
  - Copy key, value, or JSONPath
  - Breadcrumb navigation

- **Filter & Search**
  - Find by key or value
  - Regex support
  - Highlights matches and preserves parent context
  - Navigate matches with keyboard

- **Developer Experience**
  - Monaco/CodeMirror editor with syntax highlighting
  - Resizable split panes
  - Light/dark themes (system preference aware)
  - Large file support via Web Workers
  - Copy to clipboard & download as `.json` or `.txt`
  - Local storage persistence

---

## 🚀 Demo

👉 [Live Demo](#) *(coming soon)*  

![screenshot editor](docs/screenshot-editor.png)  
![screenshot tree](docs/screenshot-tree.png)  

---

## ⌨️ Keyboard Shortcuts

| Action           | Shortcut             |
|------------------|----------------------|
| Validate JSON    | `Ctrl/Cmd + Enter`  |
| Beautify         | `Ctrl/Cmd + Shift + B` |
| Minify           | `Ctrl/Cmd + Shift + M` |
| Expand All       | `Ctrl/Cmd + Shift + K` |
| Collapse All     | `Ctrl/Cmd + K` |
| Focus Filter     | `Ctrl/Cmd + F` |
| Clear Filter     | `Esc` |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js ≥ 18
- pnpm / yarn / npm (choose one)

### Install
```bash
git clone https://github.com/your-username/json-formatter.git
cd json-formatter
pnpm install
````

### Run in Dev Mode

```bash
pnpm dev
```

App will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
pnpm preview
```

### Run Tests

```bash
pnpm test
```

---

## 📂 Project Structure

```
src/
 ├── components/   # UI components (Editor, TreeView, Toolbar, etc.)
 ├── utils/        # JSON helpers (validate, beautify, escape/unescape, filter)
 ├── workers/      # Web Worker code for parsing/formatting
 ├── hooks/        # Custom React hooks
 └── App.tsx       # Main entry point
```

---

## 🔍 Examples

### Input

```json
{"a":1,"b":[1,2,{"c":"x\\ny"}],"d":{"e":true,"f":null}}
```

### Beautified Output

```json
{
  "a": 1,
  "b": [
    1,
    2,
    {
      "c": "x\n y"
    }
  ],
  "d": {
    "e": true,
    "f": null
  }
}
```

### Escaped Output

```json
"{\"a\":1,\"b\":[1,2,{\"c\":\"x\\ny\"}],\"d\":{\"e\":true,\"f\":null}}"
```

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repo
* Create a feature branch: `git checkout -b feature/awesome-feature`
* Commit changes: `git commit -m "feat: add awesome feature"`
* Push and open a Pull Request

Please run tests before submitting PRs.

---

## 📌 Roadmap

* [ ] JSON Schema validation
* [ ] JSON diff/compare mode
* [ ] CSV/TSV to JSON converter
* [ ] Import JSON from URL
* [ ] Deploy demo to GitHub Pages/Netlify

---

## 📄 License

MIT License © 2025 qduc
