import React, { useState, useRef } from 'react';
import { MenuContext } from './MenuContext';
import { Box } from '../Box';
import { useDropdown } from '../hooks';

export const Menu = ({ children, isFixed }) => {
  const toggleRef = useRef();
  const menuRef = useRef();
  const [isActive, setIsActive] = useState();

  const { Dropdown, open, close, isOpen, toggle } = useDropdown({ ref: toggleRef, isFixed });

  return (
    <MenuContext.Provider
      value={{
        isActive,
        ref: toggleRef,
        menuRef,
        setIsActive,
        open,
        close,
        Dropdown,
        isOpen,
        toggle
      }}
    >
      <Box className="menu" ref={menuRef}>
        {children}
      </Box>
    </MenuContext.Provider>
  );
};
