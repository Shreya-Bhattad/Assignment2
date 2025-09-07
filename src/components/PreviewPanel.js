import React from 'react';
import { useAura } from '../modules/auraContext';

function PreviewPanel() {
  const { state } = useAura();

  function generateHTML() {
    return state.components.map(comp => {
      switch (comp.type) {
        case 'Text':
          return `<span style="font-size:${comp.properties.fontSize||16}px;font-weight:${comp.properties.fontWeight||'400'};color:${comp.properties.color||'#222'};">${comp.properties.text||'Text'}</span>`;
        case 'TextArea':
          return `<textarea style="font-size:${comp.properties.fontSize||16}px;color:${comp.properties.color||'#222'};text-align:${comp.properties.textAlign||'left'};resize:none;">${comp.properties.text||''}</textarea>`;
        case 'Image':
          return `<img src="${comp.properties.imageUrl||'https://via.placeholder.com/100'}" alt="${comp.properties.altText||'Image'}" style="object-fit:${comp.properties.objectFit||'cover'};border-radius:${comp.properties.borderRadius||0}px;height:${comp.properties.height||100}px;width:${comp.properties.width||100}px;" />`;
        case 'Button':
          return `<a href="${comp.properties.url||'#'}" style="display:inline-block;font-size:${comp.properties.fontSize||16}px;padding:${comp.properties.padding||8}px;background:${comp.properties.backgroundColor||'#007bff'};color:${comp.properties.textColor||'#fff'};border-radius:${comp.properties.borderRadius||4}px;text-decoration:none;">${comp.properties.buttonText||'Button'}</a>`;
        default:
          return '';
      }
    }).join('');
  }

  return (
    <div className="preview-panel-fixed">
      <h3>Preview</h3>
      <div className="preview-content" dangerouslySetInnerHTML={{ __html: generateHTML() }} />
    </div>
  );
}

export default PreviewPanel;
