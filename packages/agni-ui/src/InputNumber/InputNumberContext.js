import { createContext, useContext } from 'react';

const InputNumberContext = createContext({});

const useInputNumberContext = () => useContext(InputNumberContext);

export { InputNumberContext, useInputNumberContext };
export default InputNumberContext;
