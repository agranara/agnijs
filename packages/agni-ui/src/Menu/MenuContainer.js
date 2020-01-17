import React from 'react';
import { useMenuContext } from './MenuContext';

export const MenuContainer = ({ children }) => {
  const { Dropdown } = useMenuContext();

  return (
    <Dropdown px={0} py={1}>
      {children}
    </Dropdown>
  );
};
