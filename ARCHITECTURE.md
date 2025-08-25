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
```

- **PalettePanel**: Sends selected component type to CanvasPanel.
- **CanvasPanel**: Manages placement, selection, and movement of components. Notifies PropertiesPanel of selection changes.
- **PropertiesPanel**: Edits properties of selected component, updates CanvasPanel in real time.
- **App/Context**: Central state and event management.

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
- **App**: Orchestrates layout and provides context/state.

## Undo/Redo Approach

- **History Stack**: Every state-changing action pushes a snapshot to a history array.
- **Undo**: Pops the last state and reverts to the previous.
- **Redo**: Reapplies a reverted state if available.
- **Justification**: This approach is simple, reliable, and works well with React's immutable state updates.

---

Update this document as the architecture evolves.
