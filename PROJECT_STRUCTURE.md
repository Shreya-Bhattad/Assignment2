# PROJECT_STRUCTURE.md

This document explains the structure of the Aura No-Code Visual Editor project and the purpose of each folder and key module.

## Root Structure

- `/src` — Main source code for the application
- `/public` — Static assets (index.html, images, etc.)
- `/node_modules` — Installed dependencies (auto-generated)
- `/package.json` — Project metadata and dependencies
- `/README.md` — Project overview and instructions

## Key Folders & Modules

### `/src`

- `/components` — Reusable React components (Palette, Canvas, Properties Panel, etc.)
- `/modules` — Core logic modules (drag-and-drop, localStorage, etc.)
- `/styles` — CSS or styling files for the application
- `/utils` — Utility/helper functions
- `/App.js` — Main application entry point
- `/index.js` — React DOM rendering and app bootstrap

### `/public`

- `index.html` — Main HTML file loaded by the browser
- Other static assets (images, icons, etc.)

## Example Structure

```
Aura/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PalettePanel.js
│   │   ├── CanvasPanel.js
│   │   ├── PropertiesPanel.js
│   ├── modules/
│   │   ├── dragDrop.js
│   │   ├── localStorage.js
│   ├── styles/
│   │   └── main.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Purpose of Key Modules

- **PalettePanel.js**: Displays available components for drag-and-drop.
- **CanvasPanel.js**: Main area for placing and arranging components.
- **PropertiesPanel.js**: Shows and edits properties of selected components.
- **dragDrop.js**: Handles custom drag-and-drop logic using native browser events.
- **localStorage.js**: Manages saving and loading workspace data.
- **main.css**: Application-wide styles.
- **helpers.js**: Utility functions used across modules.
- **App.js**: Main React component orchestrating the layout.
- **index.js**: Entry point for React DOM rendering.

---

Update this document as the project evolves.
