import { auraReducer } from '../modules/auraContext';

describe('auraReducer', () => {
  it('adds a component', () => {
    const state = { components: [], selectedId: null, history: [], future: [] };
    const action = { type: 'ADD_COMPONENT', payload: { id: '1', type: 'Text', x: 0, y: 0, properties: {} } };
    const newState = auraReducer(state, action);
    expect(newState.components.length).toBe(1);
    expect(newState.components[0].id).toBe('1');
  });
});
