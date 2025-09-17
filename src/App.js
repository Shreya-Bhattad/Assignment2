import React from 'react';
import PalettePanel from './components/PalettePanel';
import CanvasPanel from './components/CanvasPanel';
import PropertiesPanel from './components/PropertiesPanel';
import PreviewPanel from './components/PreviewPanel';
import './styles/main.css';
import { AuraProvider, useAura } from './modules/auraContext';
import { saveWorkspace, loadWorkspace } from './modules/localStorage';

function Toolbar() {
  const { state, dispatch } = useAura();

  function handleSave() {
    saveWorkspace(state.components);
    alert('Workspace saved!');
  }

  function handleLoad() {
    const loaded = loadWorkspace();
    dispatch({ type: 'LOAD_WORKSPACE', payload: loaded });
  }

  function handleUndo() {
    dispatch({ type: 'UNDO' });
  }

  function handleRedo() {
    dispatch({ type: 'REDO' });
  }

  return (
    <div style={{ padding: '8px', borderBottom: '1px solid #ddd', background: '#f7f7fa' }}>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  );
}


import { useEffect } from 'react';

function App() {
  // Prevent browser default drag-and-drop everywhere except our canvas
  useEffect(() => {
    function preventDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
    return () => {
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  // Only render PreviewPanel below the main layout, never inside the canvas
  return (
    <AuraProvider>
      <Toolbar />
      <div className="aura-layout">
        <div className="panel palette"><PalettePanel /></div>
        <div className="panel canvas"><CanvasPanel /></div>
        <div className="panel properties"><PropertiesPanel /></div>
      </div>
      {/* PreviewPanel is visually and structurally separated from the canvas */}
      <PreviewPanel />
    </AuraProvider>
  );
}

export default App;
