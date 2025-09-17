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
    // Create a transparent drag image to prevent ghost text
    const img = document.createElement('img');
    img.src =
      'data:image/svg+xml;base64,' +
      btoa('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>');
    img.style.position = 'absolute';
    img.style.left = '-1000px';
    document.body.appendChild(img);
    e.dataTransfer.setDragImage(img, 0, 0);
    setTimeout(() => document.body.removeChild(img), 0);
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
