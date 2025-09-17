# Aura No-Code Visual Editor

AI-Native Engineering: Second Assignment - Frontend

## Overview

Aura is a no-code visual editor built with React, allowing users to design simple UI layouts by dragging, dropping, and configuring components on a canvas. The app demonstrates custom drag-and-drop logic, centralized state management, and live HTML preview generation—all without external drag-and-drop libraries or CSS frameworks.

## Features

- Drag and drop UI components (Text, TextArea, Image, Button) onto a canvas
- Select and edit properties of each component
- Undo/redo actions with history stack
- Save/load workspace to browser localStorage
- Live HTML preview and copy-to-clipboard

## Project Structure

See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for a detailed breakdown.

Key folders:

- `/src/components` — React UI panels and renderers
- `/src/modules` — State management and persistence logic
- `/src/styles` — CSS
- `/public` — Static assets

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app locally:**
   ```sh
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

## Technologies Used

- React 18
- Custom React Context + Reducer for state management
- Native browser drag-and-drop events
- LocalStorage for persistence
- Plain CSS (no frameworks)

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

MIT License (add details as needed)
