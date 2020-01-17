import React, { createContext, useContext, Fragment } from 'react';

export const MenuContext = createContext({
  isActive: false,
  setIsActive: () => {},
  open: () => {},
  close: () => {},
  toggle: () => {},
  Dropdown: ({ children }) => <Fragment>{children}</Fragment>,
  isOpen: false
});

export const useMenuContext = () => useContext(MenuContext);
