import React from 'react';
import { render, screen } from '@testing-library/react';
import { RenderComponent } from '../components/RenderComponent';

describe('RenderComponent', () => {
  it('renders Text component', () => {
    render(<RenderComponent comp={{ type: 'Text', properties: { text: 'Hello' } }} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  it('renders TextArea component', () => {
    render(<RenderComponent comp={{ type: 'TextArea', properties: { text: 'Area' } }} />);
    expect(screen.getByDisplayValue('Area')).toBeInTheDocument();
  });
});
