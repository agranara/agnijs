/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { forwardRef, useRef, useState, useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { PseudoBox } from '../../PseudoBox';
import { Positioner } from '../../Positioner';
import { useMenuContext } from '../MenuContext';
import { useUiTheme } from '../../UiProvider';
import { useDebounceCallback } from '../../_hooks/useDebounceCallback';
import { VisuallyHidden } from '../../VisuallyHidden';

const BaseMenuItem = forwardRef(
  (
    {
      as: Comp = 'div',
      children,
      isHeader,
      isDivider,
      onMouseEnter,
      onMouseLeave,
      hasIconLeft,
      hasIconRight,
      className,
      css: cssProp,
      ...prop
    },
    forwardedRef
  ) => {
    const theme = useUiTheme();

    if (isDivider) {
      return (
        <PseudoBox borderBottomWidth="1px" my={2} height="1px" w="full">
          &nbsp;
          <VisuallyHidden>Divider</VisuallyHidden>
        </PseudoBox>
      );
    }

    return (
      <Comp
        role="menuitem"
        className={cn(['menu__item', className])}
        {...prop}
        ref={forwardedRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        css={css([
          {
            display: 'flex',
            position: 'relative',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            paddingLeft: hasIconLeft ? 28 : 12,
            paddingRight: 28,
            userSelect: 'none',
            minWidth: '9rem',
            transition: 'all 0.2s',
            color: isHeader ? theme.colors.gray[500] : theme.colors.black,
            fontSize: isHeader ? '80%' : undefined,
            fontWeight: isHeader ? theme.fontWeights.semibold : undefined
          },
          !isHeader && {
            '&:hover, &:active,&.active': {
              backgroundColor: theme.colors.primary[500],
              color: 'white'
            }
          },
          cssProp
        ])}
      >
        {children}
      </Comp>
    );
  }
);

BaseMenuItem.displayName = 'BaseMenuItem';

///////////////////////////////////////////////////////////

const BaseMenuItemLabel = forwardRef(
  ({ as: Comp = 'span', iconLeft, iconRight, children }, forwardedRef) => {
    return (
      <PseudoBox ref={forwardedRef} as={Comp} d="flex" alignItems="center" w="full" lineHeight="1">
        {iconLeft && <PseudoBox fontSize="1rem">{iconLeft}</PseudoBox>}
        {children && (
          <PseudoBox flex="1" pl={iconLeft ? 2 : 0} py={2}>
            {children}
          </PseudoBox>
        )}
        {iconRight && (
          <PseudoBox pos="absolute" right="4px" fontSize="1rem">
            {iconRight}
          </PseudoBox>
        )}
      </PseudoBox>
    );
  }
);

BaseMenuItemLabel.displayName = 'BaseMenuItemLabel';

///////////////////////////////////////////////////////////

const SubMenu = ({
  as: Comp,
  uid,
  children,
  label,
  iconLeft,
  iconRight,
  className,
  cssProp,
  ...prop
}) => {
  const { setRefs } = useMenuContext();
  const triggerRef = useRef(null);
  const innerRef = useRef(null);

  const [isHover, setHover] = useState(false);
  const [debounceHover, cancelDebounce] = useDebounceCallback({
    callback: isCurrentHover => {
      setHover(isCurrentHover);

      unregisterRef();
    },
    delay: 50
  });

  const registerRef = useCallback(() => {
    if (innerRef.current) {
      setRefs(oldRefs => [...oldRefs, innerRef]);
    }
  }, [setRefs]);

  const unregisterRef = useCallback(() => {
    if (innerRef.current) {
      setRefs(oldRefs => oldRefs.filter(ref => ref.current !== innerRef.current));
    }
  }, [setRefs]);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
    cancelDebounce();
  }, [cancelDebounce]);

  const handleMouseLeave = useCallback(() => {
    debounceHover(false);
  }, [debounceHover]);

  const handleAnimationComplete = useCallback(() => {
    registerRef();
  }, [registerRef]);

  return (
    <BaseMenuItem
      as={Comp}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      hasIconRight
      aria-haspopup="true"
      aria-expanded={isHover}
      className={cn(['menu__item__multi', isHover && 'active', className])}
      css={cssProp}
      {...prop}
    >
      <BaseMenuItemLabel iconLeft={iconLeft} iconRight={iconRight || <FiChevronRight />}>
        {label}
      </BaseMenuItemLabel>
      <Positioner
        isOpen={isHover}
        triggerRef={triggerRef}
        innerRef={innerRef}
        placement="right-start"
        role="menu"
        aria-label={label}
        tabIndex={-1}
        zIndex="dropdown"
        _focus={{ outline: 0 }}
        onAnimationComplete={handleAnimationComplete}
      >
        {children}
      </Positioner>
    </BaseMenuItem>
  );
};

SubMenu.displayName = 'SubMenu';

///////////////////////////////////////////////////////////

const MenuItemSingle = ({
  as: Comp = 'div',
  children,
  iconLeft,
  iconRight,
  isDivider,
  isHeader,
  css: cssProp,
  onClick,
  ...prop
}) => {
  const { handleIsOpen } = useMenuContext();

  const handleClick = useCallback(
    ev => {
      handleIsOpen(false);
      if (onClick) onClick(ev);
    },
    [handleIsOpen, onClick]
  );

  return (
    <BaseMenuItem
      as={Comp}
      isDivider={isDivider}
      isHeader={isHeader}
      onClick={handleClick}
      css={cssProp}
      {...prop}
    >
      <BaseMenuItemLabel
        iconLeft={iconLeft}
        iconRight={iconRight}
        isDivider={isDivider}
        isHeader={isHeader}
      >
        {children}
      </BaseMenuItemLabel>
    </BaseMenuItem>
  );
};

MenuItemSingle.displayName = 'MenuItemSingle';

///////////////////////////////////////////////////////////

const MenuItem = ({
  as: Comp,
  children,
  label,
  iconLeft,
  iconRight,
  isDivider,
  isHeader,
  css: cssProp,
  ...prop
}) => {
  if (children) {
    return (
      <SubMenu as={Comp} label={label} iconLeft={iconRight} css={cssProp} {...prop}>
        {children}
      </SubMenu>
    );
  }

  return (
    <MenuItemSingle
      as={Comp}
      iconLeft={iconLeft}
      iconRight={iconRight}
      isDivider={isDivider}
      isHeader={isHeader}
      css={cssProp}
      {...prop}
    >
      {label}
    </MenuItemSingle>
  );
};

MenuItem.displayName = 'MenuItem';

export { MenuItem };
