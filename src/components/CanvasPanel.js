import React, { useRef, useState } from 'react';
import { useAura } from '../modules/auraContext';
import { RenderComponent } from './RenderComponent';

function CanvasPanel() {
  const { state, dispatch } = useAura();
  const canvasRef = useRef(null);
  const [draggedId, setDraggedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function generateUniqueId() {
    // Use crypto.randomUUID if available, else fallback to Date.now + Math.random
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    // Only handle drops with our custom type and ignore all others
    const type = e.dataTransfer.getData('componentType');
    if (!type) return;
    // Get mouse position relative to canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = generateUniqueId();
    console.log('[DROP] Adding component:', { id, type, x, y });
    dispatch({
      type: 'ADD_COMPONENT',
      payload: {
        id,
        type,
        x,
        y,
        properties: {},
      },
    });
    // Explicitly clear dataTransfer
    e.dataTransfer.clearData();
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleMouseDown(e, comp) {
    setDraggedId(comp.id);
    setOffset({
      x: e.clientX - comp.x - canvasRef.current.getBoundingClientRect().left,
      y: e.clientY - comp.y - canvasRef.current.getBoundingClientRect().top,
    });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e) {
    if (draggedId == null) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: draggedId,
        updates: { x, y },
      },
    });
  }

  function handleMouseUp() {
    setDraggedId(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  return (
    <div
      className="canvas-panel"
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ position: 'relative', minHeight: '400px' }}
    >
      <h3>Canvas</h3>
      {state.components.map((comp) => (
        <div
          key={comp.id}
          data-id={comp.id}
          style={{
            position: 'absolute',
            left: comp.x,
            top: comp.y,
            border: state.selectedId === comp.id ? '2px solid #007bff' : '1px solid #ccc',
            padding: 4,
            cursor: 'move',
            background: '#fff',
            userSelect: 'none',
          }}
          onClick={() => dispatch({ type: 'SELECT_COMPONENT', payload: comp.id })}
          onMouseDown={(e) => handleMouseDown(e, comp)}
        >
          <RenderComponent comp={comp} />
        </div>
      ))}
    </div>
  );
}

export default CanvasPanel;
