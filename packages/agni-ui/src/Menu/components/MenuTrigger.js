/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { PseudoBox } from '../../PseudoBox';
import { useMenuContext } from '../MenuContext';

const MenuTrigger = ({
  as: Comp = 'button',
  css: cssProp,
  showCaret = true,
  children,
  ...prop
}) => {
  const {
    isOpen,
    handleClickTrigger,
    menuUid,
    triggerRef,
    triggerUid,
    isActive
  } = useMenuContext();

  const ref = useRef();
  const forkedRef = useForkedRef(ref, triggerRef);

  return (
    <PseudoBox
      as={Comp}
      type={Comp === 'button' && !prop.type ? 'button' : prop.type}
      ref={forkedRef}
      className={cn(['menu__trigger', isActive && 'active'])}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={menuUid}
      role="button"
      id={triggerUid}
      onClick={handleClickTrigger}
      css={css([
        {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          paddingRight: showCaret ? 28 : 12,
          paddingLeft: 8,
          paddingTop: 4,
          paddingBottom: 4,
          outline: 'none',
          userSelect: 'none',
          transition: 'all 0.2s'
        },
        cssProp
      ])}
      _hover={{
        color: 'primary.500'
      }}
      _active={{
        color: 'primary.500'
      }}
      _expanded={{
        color: 'primary.500'
      }}
      {...prop}
    >
      {children}
      {showCaret && (
        <PseudoBox
          pos="absolute"
          right="8px"
          top="50%"
          pt={1}
          transform="translateY(-50%)"
          fontSize="1rem"
          lineHeight="1"
        >
          <FiChevronDown
            css={css({
              transition: 'all 0.2s'
            })}
            transform={isOpen ? 'scale(-1)' : 'scale(1)'}
          />
        </PseudoBox>
      )}
    </PseudoBox>
  );
};

MenuTrigger.displayName = 'MenuTrigger';

export { MenuTrigger };
