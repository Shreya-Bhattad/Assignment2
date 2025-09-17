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
          return comp.properties.text
            ? `<textarea style="font-size:${comp.properties.fontSize||16}px;color:${comp.properties.color||'#222'};text-align:${comp.properties.textAlign||'left'};position:absolute;left:${comp.x}px;top:${comp.y}px;resize:none;">${comp.properties.text}</textarea>`
            : '';
        case 'Image':
          // Only render if imageUrl is set
          return comp.properties.imageUrl
            ? `<img src="${comp.properties.imageUrl}" alt="${comp.properties.altText||'Image'}" style="object-fit:${comp.properties.objectFit||'cover'};border-radius:${comp.properties.borderRadius||0}px;height:${comp.properties.height||100}px;width:${comp.properties.width||100}px;position:absolute;left:${comp.x}px;top:${comp.y}px;" />`
            : '';
        case 'Button':
          // Only render if buttonText is set
          return comp.properties.buttonText
            ? `<a href="${comp.properties.url||'#'}" style="display:inline-block;font-size:${comp.properties.fontSize||16}px;padding:${comp.properties.padding||8}px;background:${comp.properties.backgroundColor||'#007bff'};color:${comp.properties.textColor||'#fff'};border-radius:${comp.properties.borderRadius||4}px;text-decoration:none;position:absolute;left:${comp.x}px;top:${comp.y}px;">${comp.properties.buttonText}</a>`
            : '';
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
    <div className="preview-panel" style={{ padding: '16px', borderTop: '2px solid #007bff', background: '#eaf4ff', marginTop: 16, position: 'relative' }}>
      <h3 style={{marginTop:0}}>Preview (Live HTML Output)</h3>
      <button onClick={handleCopy}>Copy HTML</button>
      {copied && <span style={{ marginLeft: 8, color: 'green' }}>Copied!</span>}
      <div style={{ marginTop: 12, background: '#fff', padding: 12, border: '2px dashed #007bff', borderRadius: 4, minHeight: 100, maxHeight: 320, overflow: 'auto', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 8,
          right: 12,
          color: '#007bff',
          fontSize: 12,
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 2
        }}>
          [Preview Only]
        </div>
        <div style={{position: 'relative', zIndex: 1}} dangerouslySetInnerHTML={{ __html: generateHTML() }} />
      </div>
    </div>
  );
}

export default PreviewPanel;
