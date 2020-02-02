import { createContext, useContext } from 'react';

const TabContext = createContext({});
const useTabContext = () => useContext(TabContext);

export { TabContext, useTabContext };
