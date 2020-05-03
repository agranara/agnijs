import { createContext, useContext } from 'react';

const DGColumnContext = createContext({});
const useDGColumnContext = () => useContext(DGColumnContext);

export { DGColumnContext, useDGColumnContext };
