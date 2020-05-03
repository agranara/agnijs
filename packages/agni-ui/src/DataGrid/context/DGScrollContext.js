import { createContext, useContext } from 'react';

const DGScrollContext = createContext({});
const useDGScrollContext = () => useContext(DGScrollContext);

export { DGScrollContext, useDGScrollContext };
