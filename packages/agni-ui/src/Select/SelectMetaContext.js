import { createContext, useContext } from 'react';

const SelectMetaContext = createContext({});
const useSelectMetaContext = () => useContext(SelectMetaContext);

export { SelectMetaContext, useSelectMetaContext };
