import React, { useRef, useState } from 'react';
import { useAura } from '../modules/auraContext';
import { RenderComponent } from './RenderComponent';

function CanvasPanel() {
  const { state, dispatch } = useAura();
  const canvasRef = useRef(null);
  const [draggedId, setDraggedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Refs to always have latest values in event listeners
  const draggedIdRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

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
    // Only respond to left mouse button
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    console.log('[DRAG] MouseDown on component', { compId: comp.id, mouse: { x: e.clientX, y: e.clientY }, compPos: { x: comp.x, y: comp.y } });
    setDraggedId(comp.id);
    setOffset({
      x: e.clientX - comp.x - canvasRef.current.getBoundingClientRect().left,
      y: e.clientY - comp.y - canvasRef.current.getBoundingClientRect().top,
    });
    // Update refs immediately for event listeners
    draggedIdRef.current = comp.id;
    offsetRef.current = {
      x: e.clientX - comp.x - canvasRef.current.getBoundingClientRect().left,
      y: e.clientY - comp.y - canvasRef.current.getBoundingClientRect().top,
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    console.log('[DRAG] Registered mousemove and mouseup listeners on window');
  }

  function handleMouseMove(e) {
    const currentDraggedId = draggedIdRef.current;
    const currentOffset = offsetRef.current;
    console.log('[DRAG] MouseMove event', e);
    console.log('draggedId (ref)', currentDraggedId);
    if (currentDraggedId == null) return;
    // Only respond to left mouse button (in case of multi-button mouse)
    if (e.buttons !== undefined && (e.buttons & 1) === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - currentOffset.x;
    const y = e.clientY - rect.top - currentOffset.y;
    console.log('[DRAG] MouseMove', { draggedId: currentDraggedId, mouse: { x: e.clientX, y: e.clientY }, canvas: { left: rect.left, top: rect.top }, offset: currentOffset, newPos: { x, y } });
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: currentDraggedId,
        updates: { x, y },
      },
    });
  }

  function handleMouseUp(e) {
    console.log('[DRAG] MouseUp', { draggedId });
    setDraggedId(null);
    draggedIdRef.current = null;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    console.log('[DRAG] Removed mousemove and mouseup listeners from window');
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
            background: '#fff',
            userSelect: 'none',
            cursor: 'move',
          }}
          onClick={() => dispatch({ type: 'SELECT_COMPONENT', payload: comp.id })}
          onMouseDown={(e) => {
            console.log('[DRAG] onMouseDown event', e);
            handleMouseDown(e, comp);
          }}
        >
          <RenderComponent comp={comp} />
        </div>
      ))}
    </div>
  );
}

export default CanvasPanel;
