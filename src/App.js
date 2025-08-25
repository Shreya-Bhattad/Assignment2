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

function App() {
  return (
    <AuraProvider>
      <Toolbar />
      <div className="aura-layout">
        <div className="panel palette"><PalettePanel /></div>
        <div className="panel canvas"><CanvasPanel /></div>
        <div className="panel properties"><PropertiesPanel /></div>
      </div>
      <PreviewPanel />
    </AuraProvider>
  );
}

export default App;
