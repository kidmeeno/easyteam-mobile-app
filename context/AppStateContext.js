import React, { createContext, useContext, useReducer } from 'react';

// Create a Context
const AppStateContext = createContext();

// Reducer function to handle state updates
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token:'',
  employees:[]
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to access state and dispatch
export const useAppState = () => useContext(AppStateContext);
