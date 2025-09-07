import React, { useRef, useState } from 'react';
import { useAura } from '../modules/auraContext';
import { RenderComponent } from './RenderComponent';

function CanvasPanel() {
  const { state, dispatch } = useAura();
  const canvasRef = useRef(null);
  const [draggedId, setDraggedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent duplicate drop events
    const type = e.dataTransfer.getData('componentType');
    if (!type) return;
    // Get mouse position relative to canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log('Drop event fired:', { type, x, y });
    const id = Date.now();
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
  }

  function handleDragOver(e) {
    e.preventDefault();
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

  React.useEffect(() => {
    console.log('CanvasPanel components:', state.components);
  }, [state.components]);
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
