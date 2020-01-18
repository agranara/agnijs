import React, { createContext, useContext, Fragment } from 'react';

const MenuContext = createContext({
  isActive: false,
  setIsActive: () => {},
  open: () => {},
  close: () => {},
  toggle: () => {},
  Dropdown: ({ children }) => <Fragment>{children}</Fragment>,
  isOpen: false
});

const useMenuContext = () => useContext(MenuContext);

export { MenuContext, useMenuContext };
export default MenuContext;
