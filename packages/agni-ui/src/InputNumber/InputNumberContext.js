import { createContext, useContext } from 'react';

export const InputNumberContext = createContext({});

export const useInputNumberContext = () => {
  return useContext(InputNumberContext);
};
