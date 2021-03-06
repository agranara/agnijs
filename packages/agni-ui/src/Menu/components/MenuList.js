import React from 'react';
import { Positioner } from '../../Positioner';
import { useMenuContext } from '../MenuContext';

const MenuList = ({ as: Comp = 'div', children, ...rest }) => {
  const { triggerRef, innerRef, menuUid, triggerUid, isOpen } = useMenuContext();

  return (
    <Positioner
      as={Comp}
      isOpen={isOpen}
      triggerRef={triggerRef}
      innerRef={innerRef}
      placement="bottom-start"
      role="menu"
      id={menuUid}
      aria-labelledby={triggerUid}
      tabIndex={-1}
      zIndex="dropdown"
      _focus={{ outline: 0 }}
      {...rest}
    >
      {children}
    </Positioner>
  );
};

MenuList.displayName = 'MenuList';

export { MenuList };
