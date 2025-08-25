import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  components: [], // { id, type, x, y, properties }
  selectedId: null,
  history: [],
  future: [],
};

function auraReducer(state, action) {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
        history: [...state.history, state],
        future: [],
      };
    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedId: action.payload,
      };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map(comp =>
          comp.id === action.payload.id ? { ...comp, ...action.payload.updates } : comp
        ),
        history: [...state.history, state],
        future: [],
      };
    case 'UNDO':
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        ...prev,
        history: state.history.slice(0, -1),
        future: [state, ...state.future],
      };
    case 'REDO':
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...next,
        history: [...state.history, state],
        future: state.future.slice(1),
      };
    case 'LOAD_WORKSPACE':
      return {
        ...state,
        components: action.payload,
        selectedId: null,
        history: [...state.history, state],
        future: [],
      };
    default:
      return state;
  }
}

const AuraContext = createContext();

export function AuraProvider({ children }) {
  const [state, dispatch] = useReducer(auraReducer, initialState);
  return (
    <AuraContext.Provider value={{ state, dispatch }}>
      {children}
    </AuraContext.Provider>
  );
}

export function useAura() {
  return useContext(AuraContext);
}
