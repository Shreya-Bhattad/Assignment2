import React from 'react';
import { render } from '@testing-library/react';
import PropertiesPanel from '../components/PropertiesPanel';
import { AuraProvider } from '../modules/auraContext';

describe('PropertiesPanel', () => {
  it('renders without crashing', () => {
    render(
      <AuraProvider>
        <PropertiesPanel />
      </AuraProvider>
    );
  });
});
