import { createContext, useContext } from 'react';

const DGMetaContext = createContext({});
const useDGMetaContext = () => useContext(DGMetaContext);

export { DGMetaContext, useDGMetaContext };
