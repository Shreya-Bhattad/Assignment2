import React from 'react';

export function RenderComponent({ comp }) {
  switch (comp.type) {
    case 'Text':
      return (
        <span style={{
          fontSize: comp.properties.fontSize || 16,
          fontWeight: comp.properties.fontWeight || '400',
          color: comp.properties.color || '#222',
        }}>
          {comp.properties.text || ''}
        </span>
      );
    case 'TextArea':
      return (
        <textarea
          style={{
            fontSize: comp.properties.fontSize || 16,
            color: comp.properties.color || '#222',
            textAlign: comp.properties.textAlign || 'left',
            resize: 'none',
          }}
          value={comp.properties.text || ''}
          readOnly
        />
      );
    case 'Image':
      return (
        <img
          src={comp.properties.imageUrl || 'https://via.placeholder.com/100'}
          alt={comp.properties.altText || ''}
          style={{
            objectFit: comp.properties.objectFit || 'cover',
            borderRadius: comp.properties.borderRadius || 0,
            height: comp.properties.height || 100,
            width: comp.properties.width || 100,
          }}
        />
      );
    case 'Button':
      return (
        <a
          href={comp.properties.url || '#'}
          style={{
            display: 'inline-block',
            fontSize: comp.properties.fontSize || 16,
            padding: comp.properties.padding || 8,
            background: comp.properties.backgroundColor || '#007bff',
            color: comp.properties.textColor || '#fff',
            borderRadius: comp.properties.borderRadius || 4,
            textDecoration: 'none',
          }}
        >
          {comp.properties.buttonText || ''}
        </a>
      );
    default:
      return null;
  }
}
