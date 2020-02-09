import React, { forwardRef, useRef, useState, useCallback } from 'react';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { MenuContext } from '../MenuContext';
import { useTogglePositioner } from '../../Positioner';
import { useAutoId } from '../../_hooks/useAutoId';

const Menu = forwardRef(({ as: Comp = 'div', children, isActive }, forwardedRef) => {
  const uid = useAutoId();
  const menuUid = `menu-${uid}`;
  const triggerUid = `menutrigger-${uid}`;

  const menuRef = useRef(null);
  const forkedRef = useForkedRef(menuRef, forwardedRef);

  const triggerRef = useRef(null);
  const innerRef = useRef(null);

  const [refs, setRefs] = useState(() => {
    return [innerRef, triggerRef];
  });

  const getIsOutside = useCallback(
    target => {
      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        if (ref && ref.current && ref.current.contains(target)) return;
      }

      return true;
    },
    [refs]
  );

  const [isOpen, handleIsOpen] = useTogglePositioner({
    refs: [innerRef, triggerRef],
    getIsOutside
  });

  const handleClickTrigger = useCallback(() => {
    handleIsOpen(!isOpen);
  }, [handleIsOpen, isOpen]);

  const menuContainer = () => menuRef.current;

  return (
    <MenuContext.Provider
      value={{
        handleIsOpen,
        isOpen,
        handleClickTrigger,
        innerRef,
        triggerRef,
        menuUid,
        triggerUid,
        setRefs,
        menuContainer,
        isActive
      }}
    >
      <Comp ref={forkedRef} className="menu">
        {children}
      </Comp>
    </MenuContext.Provider>
  );
});

Menu.displayName = 'Menu';

export { Menu };
