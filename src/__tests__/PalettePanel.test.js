import React from 'react';
import { render, screen } from '@testing-library/react';
import PalettePanel from '../components/PalettePanel';
import { AuraProvider } from '../modules/auraContext';

describe('PalettePanel', () => {
  it('renders available components', () => {
    render(
      <AuraProvider>
        <PalettePanel />
      </AuraProvider>
    );
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Text Area')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
