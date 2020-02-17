import { createContext, useContext } from 'react';

const DGSortContext = createContext({});
const useDGSortContext = () => useContext(DGSortContext);

export { DGSortContext, useDGSortContext };
