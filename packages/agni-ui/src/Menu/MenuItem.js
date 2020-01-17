import React from 'react';
import { MenuOption } from './MenuOption';
import { useMenuContext } from './MenuContext';

export const MenuItem = ({ children, onClick, ...restProps }) => {
  const { close } = useMenuContext();

  const handleClick = ev => {
    if (onClick) onClick(ev);
    close();
  };

  return (
    <MenuOption onClick={handleClick} {...restProps}>
      {children}
    </MenuOption>
  );
};
