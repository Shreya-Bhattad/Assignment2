import React from 'react';
import { useAura } from '../modules/auraContext';

const components = [
  { type: 'Text', label: 'Text' },
  { type: 'TextArea', label: 'Text Area' },
  { type: 'Image', label: 'Image' },
  { type: 'Button', label: 'Button' },
];

function PalettePanel() {
  const { dispatch } = useAura();

  function handleDragStart(e, type) {
    e.dataTransfer.setData('componentType', type);
  }

  return (
    <div className="palette-panel">
      <h3>Components</h3>
      <ul>
        {components.map((comp) => (
          <li
            key={comp.type}
            draggable
            onDragStart={(e) => handleDragStart(e, comp.type)}
          >
            {comp.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PalettePanel;
