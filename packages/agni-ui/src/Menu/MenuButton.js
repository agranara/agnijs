import React from 'react';
import { Button } from '../Button';
import { useMenuContext } from './MenuContext';

const MenuButton = ({ as: Comp = Button, children, onClick, variant = 'ghost', ...restProps }) => {
  const { ref, isOpen, toggle } = useMenuContext();

  const handleClick = () => {
    toggle();
  };

  return (
    <Comp ref={ref} isActive={isOpen} variant={variant} onClick={handleClick} {...restProps}>
      {children}
    </Comp>
  );
};

export { MenuButton };
export default MenuButton;
