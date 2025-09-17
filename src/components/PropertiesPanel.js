import React from 'react';
import { useAura } from '../modules/auraContext';


function validateProperties(type, properties) {
  const errors = {};
  if (type === 'Text' || type === 'TextArea') {
    if (properties.fontSize && (isNaN(properties.fontSize) || properties.fontSize < 8 || properties.fontSize > 100)) {
      errors.fontSize = 'Font size must be between 8 and 100.';
    }
  }
  if (type === 'Image') {
    if (properties.imageUrl && !/^https?:\/\//.test(properties.imageUrl)) {
      errors.imageUrl = 'Image URL must start with http:// or https://';
    }
    if (properties.height && (isNaN(properties.height) || properties.height < 10 || properties.height > 1000)) {
      errors.height = 'Height must be between 10 and 1000.';
    }
    if (properties.width && (isNaN(properties.width) || properties.width < 10 || properties.width > 1000)) {
      errors.width = 'Width must be between 10 and 1000.';
    }
  }
  if (type === 'Button') {
    if (properties.fontSize && (isNaN(properties.fontSize) || properties.fontSize < 8 || properties.fontSize > 100)) {
      errors.fontSize = 'Font size must be between 8 and 100.';
    }
    if (properties.url && properties.url.length > 0 && !/^https?:\/\//.test(properties.url)) {
      errors.url = 'URL must start with http:// or https://';
    }
  }
  return errors;
}

function PropertiesPanel() {
  const { state, dispatch } = useAura();
  const selected = state.components.find(c => c.id === state.selectedId);

  if (!selected) {
    return <div className="properties-panel"><h3>Properties</h3><div>Select a component</div></div>;
  }

  const errors = validateProperties(selected.type, selected.properties);

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

  let fields = null;
  switch (selected.type) {
    case 'Text':
      fields = (
        <>
          <label>Text: <input name="text" value={selected.properties.text || ''} onChange={handleChange} /></label><br />
          <label>Font Size: <input name="fontSize" type="number" value={selected.properties.fontSize || 16} onChange={handleChange} /></label>
          {errors.fontSize && <span style={{color:'red'}}>{errors.fontSize}</span>}<br />
          <label>Font Weight: <select name="fontWeight" value={selected.properties.fontWeight || '400'} onChange={handleChange}><option value="400">Normal</option><option value="700">Bold</option></select></label><br />
          <label>Color: <input name="color" type="color" value={selected.properties.color || '#222'} onChange={handleChange} /></label>
        </>
      );
      break;
    case 'TextArea':
      fields = (
        <>
          <label>Text: <input name="text" value={selected.properties.text || ''} onChange={handleChange} /></label><br />
          <label>Font Size: <input name="fontSize" type="number" value={selected.properties.fontSize || 16} onChange={handleChange} /></label>
          {errors.fontSize && <span style={{color:'red'}}>{errors.fontSize}</span>}<br />
          <label>Color: <input name="color" type="color" value={selected.properties.color || '#222'} onChange={handleChange} /></label><br />
          <label>Text Align: <select name="textAlign" value={selected.properties.textAlign || 'left'} onChange={handleChange}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
        </>
      );
      break;
    case 'Image':
      fields = (
        <>
          <label>Image URL: <input name="imageUrl" value={selected.properties.imageUrl || ''} onChange={handleChange} /></label>
          {errors.imageUrl && <span style={{color:'red'}}>{errors.imageUrl}</span>}<br />
          <label>Alt Text: <input name="altText" value={selected.properties.altText || ''} onChange={handleChange} /></label><br />
          <label>Object Fit: <select name="objectFit" value={selected.properties.objectFit || 'cover'} onChange={handleChange}><option value="cover">Cover</option><option value="contain">Contain</option><option value="fill">Fill</option></select></label><br />
          <label>Border Radius: <input name="borderRadius" type="number" value={selected.properties.borderRadius || 0} onChange={handleChange} /></label><br />
          <label>Height: <input name="height" type="number" value={selected.properties.height || 100} onChange={handleChange} /></label>
          {errors.height && <span style={{color:'red'}}>{errors.height}</span>}<br />
          <label>Width: <input name="width" type="number" value={selected.properties.width || 100} onChange={handleChange} /></label>
          {errors.width && <span style={{color:'red'}}>{errors.width}</span>}<br />
        </>
      );
      break;
    case 'Button':
      fields = (
        <>
          <label>URL: <input name="url" value={selected.properties.url || ''} onChange={handleChange} /></label>
          {errors.url && <span style={{color:'red'}}>{errors.url}</span>}<br />
          <label>Button Text: <input name="buttonText" value={selected.properties.buttonText || ''} onChange={handleChange} /></label><br />
          <label>Font Size: <input name="fontSize" type="number" value={selected.properties.fontSize || 16} onChange={handleChange} /></label>
          {errors.fontSize && <span style={{color:'red'}}>{errors.fontSize}</span>}<br />
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
      {Object.keys(errors).length > 0 && (
        <div style={{color:'red',marginTop:8}}>
          Please fix the above errors before saving or exporting.
        </div>
      )}
    </div>
  );
}

export default PropertiesPanel;
