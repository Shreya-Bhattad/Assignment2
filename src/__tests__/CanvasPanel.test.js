import React from 'react';
import { render } from '@testing-library/react';
import CanvasPanel from '../components/CanvasPanel';
import { AuraProvider } from '../modules/auraContext';

describe('CanvasPanel', () => {
  it('renders without crashing', () => {
    render(
      <AuraProvider>
        <CanvasPanel />
      </AuraProvider>
    );
  });
});
