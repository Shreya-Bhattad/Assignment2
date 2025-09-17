import React from 'react';
import { render } from '@testing-library/react';
import PreviewPanel from '../components/PreviewPanel';
import { AuraProvider } from '../modules/auraContext';

describe('PreviewPanel', () => {
  it('renders without crashing', () => {
    render(
      <AuraProvider>
        <PreviewPanel />
      </AuraProvider>
    );
  });
});
