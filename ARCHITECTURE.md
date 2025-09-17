# ARCHITECTURE.md

## Architectural Pattern

Aura uses a modular, component-based architecture with React. The application is structured around a three-panel layout (Palette, Canvas, Properties), each implemented as a distinct React component. State management is centralized using React Context and custom hooks, ensuring predictable data flow and easy state sharing between components.

### Why This Pattern?

- **Component-based**: React's component model allows for clear separation of concerns and reusability.
- **Centralized state**: Using React Context and hooks enables efficient state sharing and updates, especially for drag-and-drop and property editing.
- **Scalability**: Modular design makes it easy to add new components or features in the future.

## Component & Communication Diagram

```
+-------------------+      +-------------------+      +-------------------+
|   PalettePanel    |<---->|   CanvasPanel     |<---->| PropertiesPanel   |
+-------------------+      +-------------------+      +-------------------+
         |                        |                        |
         |                        |                        |
         +------------------------+------------------------+
                                 |
                         [App / Context]
                                 |
                         +-------------------+
                         |   PreviewPanel    |
                         +-------------------+
                                 |
                         +-------------------+
                         | RenderComponent   |
                         +-------------------+
```

- **PalettePanel**: Sends selected component type to CanvasPanel.
- **CanvasPanel**: Manages placement, selection, and movement of components. Notifies PropertiesPanel of selection changes.
- **PropertiesPanel**: Edits properties of selected component, updates CanvasPanel in real time.
- **PreviewPanel**: Generates and displays a live HTML preview of the current canvas state. Allows users to copy generated HTML.
- **RenderComponent**: Renders individual components (Text, TextArea, Image, Button) based on their type and properties. Used by both CanvasPanel and PreviewPanel.
- **App/Context**: Central state and event management, provides context to all panels.

## Technology Justification

- **React**: Chosen for its robust component model, large ecosystem, and suitability for building interactive UIs.
- **No drag-and-drop libraries**: Per requirements, custom drag-and-drop logic is implemented using native browser events for full control and compliance.
- **LocalStorage**: Used for persistence, as external APIs or databases are out of scope.
- **No CSS frameworks**: Custom CSS for full control over layout and appearance.

## State Management Strategy

- **Centralized State**: All component data, selection, and properties are managed in a single context provider. This ensures that updates are instantly reflected across panels and simplifies undo/redo logic.
- **Undo/Redo**: State changes (add, move, edit, delete) are tracked in a history stack. Undo/redo operations simply revert or reapply previous states, ensuring reliability and user control.

## Component Structure

- **PalettePanel**: Renders available components, handles drag initiation.
- **CanvasPanel**: Handles drop, selection, movement, and rendering of components.
- **PropertiesPanel**: Displays and edits properties for the selected component.
- **PreviewPanel**: Shows a live HTML preview and copy-to-clipboard functionality.
- **RenderComponent**: Responsible for rendering each component type visually.
- **App**: Orchestrates layout and provides context/state.
- **auraContext.js**: Implements the React Context, reducer, and state management (including undo/redo logic and history stack).

## Undo/Redo Approach

- **History Stack**: Every state-changing action pushes a snapshot to a history array.
- **Undo**: Pops the last state and reverts to the previous.
- **Redo**: Reapplies a reverted state if available.
- **Justification**: This approach is simple, reliable, and works well with React's immutable state updates.

---

---

**Note:**

- All state management (including undo/redo) is implemented in `auraContext.js` using a reducer and context provider.
- The PreviewPanel and RenderComponent are new additions for live preview and modular rendering.
- The `/utils` folder is currently empty and reserved for future utility functions.
- There is a `Requirements.md` file in `/src` for requirements documentation.

Update this document as the architecture evolves.
