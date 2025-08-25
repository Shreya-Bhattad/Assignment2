import React from 'react';
import { useAura } from '../modules/auraContext';

function PropertiesPanel() {
  const { state, dispatch } = useAura();
  const selected = state.components.find(c => c.id === state.selectedId);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: selected.id,
        updates: { properties: { ...selected.properties, [name]: value } },
      },
    });
  }

  if (!selected) {
    return <div className="properties-panel"><h3>Properties</h3><div>Select a component</div></div>;
  }

  let fields = null;
  switch (selected.type) {
    case 'Text':
      fields = (
        <>
          <label>Text: <input name="text" value={selected.properties.text || ''} onChange={handleChange} /></label><br />
          <label>Font Size: <input name="fontSize" type="number" value={selected.properties.fontSize || 16} onChange={handleChange} /></label><br />
          <label>Font Weight: <select name="fontWeight" value={selected.properties.fontWeight || '400'} onChange={handleChange}><option value="400">Normal</option><option value="700">Bold</option></select></label><br />
          <label>Color: <input name="color" type="color" value={selected.properties.color || '#222'} onChange={handleChange} /></label>
        </>
      );
      break;
    case 'TextArea':
      fields = (
        <>
          <label>Text: <input name="text" value={selected.properties.text || ''} onChange={handleChange} /></label><br />
          <label>Font Size: <input name="fontSize" type="number" value={selected.properties.fontSize || 16} onChange={handleChange} /></label><br />
          <label>Color: <input name="color" type="color" value={selected.properties.color || '#222'} onChange={handleChange} /></label><br />
          <label>Text Align: <select name="textAlign" value={selected.properties.textAlign || 'left'} onChange={handleChange}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
        </>
      );
      break;
    case 'Image':
      fields = (
        <>
          <label>Image URL: <input name="imageUrl" value={selected.properties.imageUrl || ''} onChange={handleChange} /></label><br />
          <label>Alt Text: <input name="altText" value={selected.properties.altText || ''} onChange={handleChange} /></label><br />
          <label>Object Fit: <select name="objectFit" value={selected.properties.objectFit || 'cover'} onChange={handleChange}><option value="cover">Cover</option><option value="contain">Contain</option><option value="fill">Fill</option></select></label><br />
          <label>Border Radius: <input name="borderRadius" type="number" value={selected.properties.borderRadius || 0} onChange={handleChange} /></label><br />
          <label>Height: <input name="height" type="number" value={selected.properties.height || 100} onChange={handleChange} /></label><br />
          <label>Width: <input name="width" type="number" value={selected.properties.width || 100} onChange={handleChange} /></label>
        </>
      );
      break;
    case 'Button':
      fields = (
        <>
          <label>URL: <input name="url" value={selected.properties.url || ''} onChange={handleChange} /></label><br />
          <label>Button Text: <input name="buttonText" value={selected.properties.buttonText || ''} onChange={handleChange} /></label><br />
          <label>Font Size: <input name="fontSize" type="number" value={selected.properties.fontSize || 16} onChange={handleChange} /></label><br />
          <label>Padding: <input name="padding" type="number" value={selected.properties.padding || 8} onChange={handleChange} /></label><br />
          <label>Background Color: <input name="backgroundColor" type="color" value={selected.properties.backgroundColor || '#007bff'} onChange={handleChange} /></label><br />
          <label>Text Color: <input name="textColor" type="color" value={selected.properties.textColor || '#fff'} onChange={handleChange} /></label><br />
          <label>Border Radius: <input name="borderRadius" type="number" value={selected.properties.borderRadius || 4} onChange={handleChange} /></label>
        </>
      );
      break;
    default:
      fields = null;
  }

  return (
    <div className="properties-panel">
      <h3>Properties</h3>
      {fields}
    </div>
  );
}

export default PropertiesPanel;
