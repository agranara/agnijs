import { createContext, useContext } from 'react';

const MenuContext = createContext({});
const useMenuContext = () => useContext(MenuContext);

export { useMenuContext, MenuContext };
