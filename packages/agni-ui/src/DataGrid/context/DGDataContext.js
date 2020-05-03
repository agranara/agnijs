import { createContext, useContext } from 'react';

const DGDataContext = createContext({});
const useDGDataContext = () => useContext(DGDataContext);

export { DGDataContext, useDGDataContext };
