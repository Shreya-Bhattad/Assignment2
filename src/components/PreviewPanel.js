import React, { useState } from 'react';
import { useAura } from '../modules/auraContext';
import { RenderComponent } from './RenderComponent';


function PreviewPanel() {
  const { state } = useAura();
  const [copied, setCopied] = useState(false);

  function generateHTML() {
    return state.components.map(comp => {
      switch (comp.type) {
        case 'Text':
          return comp.properties.text
            ? `<span style="font-size:${comp.properties.fontSize||16}px;font-weight:${comp.properties.fontWeight||'400'};color:${comp.properties.color||'#222'};position:absolute;left:${comp.x}px;top:${comp.y}px;">${comp.properties.text}</span>`
            : '';
        case 'TextArea':
          return `<textarea style="font-size:${comp.properties.fontSize||16}px;color:${comp.properties.color||'#222'};text-align:${comp.properties.textAlign||'left'};position:absolute;left:${comp.x}px;top:${comp.y}px;resize:none;">${comp.properties.text||''}</textarea>`;
        case 'Image':
          return `<img src="${comp.properties.imageUrl||'https://via.placeholder.com/100'}" alt="${comp.properties.altText||'Image'}" style="object-fit:${comp.properties.objectFit||'cover'};border-radius:${comp.properties.borderRadius||0}px;height:${comp.properties.height||100}px;width:${comp.properties.width||100}px;position:absolute;left:${comp.x}px;top:${comp.y}px;" />`;
        case 'Button':
          return `<a href="${comp.properties.url||'#'}" style="display:inline-block;font-size:${comp.properties.fontSize||16}px;padding:${comp.properties.padding||8}px;background:${comp.properties.backgroundColor||'#007bff'};color:${comp.properties.textColor||'#fff'};border-radius:${comp.properties.borderRadius||4}px;text-decoration:none;position:absolute;left:${comp.x}px;top:${comp.y}px;">${comp.properties.buttonText||'Button'}</a>`;
        default:
          return '';
      }
    }).join('');
  }

  function handleCopy() {
    navigator.clipboard.writeText(generateHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="preview-panel" style={{ padding: '8px', borderTop: '1px solid #ddd', background: '#f7f7fa' }}>
      <button onClick={handleCopy}>Copy HTML</button>
      {copied && <span style={{ marginLeft: 8, color: 'green' }}>Copied!</span>}
      <div style={{ marginTop: 8, background: '#fff', padding: 8, border: '1px solid #eee', maxHeight: 200, overflow: 'auto' }}>
        <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
      </div>
    </div>
  );
}

export default PreviewPanel;
