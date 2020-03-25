import { createContext, useContext } from 'react';

const DrawerContext = createContext({});
const useDrawerContext = () => useContext(DrawerContext);

export { DrawerContext, useDrawerContext };
