import { createContext, useContext } from 'react';

const SelectContext = createContext({});
const useSelectContext = () => useContext(SelectContext);

export { SelectContext, useSelectContext };
