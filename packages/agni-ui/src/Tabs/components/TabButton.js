import React, { forwardRef, useRef, useEffect } from 'react';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { useTabContext } from '../TabContext';
import { createUid } from '../../_utils/createUid';
import { PseudoBox } from '../../PseudoBox';

const TabButton = forwardRef(({ index, disabled, children }, forwardedRef) => {
  const ref = useRef();
  const forkedRef = useForkedRef(ref, forwardedRef);
  const mounted = useRef(false);
  const { uid, activeIndex, userInteractedRef, onSelectTab } = useTabContext();

  const isSelected = activeIndex === index;

  const panelId = createUid(uid, 'panel', index);
  const buttonId = createUid(uid, 'tab', index);

  useEffect(() => {
    if (mounted.current) {
      if (isSelected && ref.current && userInteractedRef.current) {
        userInteractedRef.current = false;
        ref.current.focus();
      }
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  const handleClick = () => {
    onSelectTab(index);
  };

  return (
    <PseudoBox
      ref={forkedRef}
      as="button"
      d="inline-flex"
      className="tabs__button"
      role="tab"
      aria-controls={panelId}
      aria-disabled={disabled}
      aria-selected={isSelected}
      data-active={isSelected ? 'true' : undefined}
      disabled={disabled}
      id={buttonId}
      onClick={handleClick}
      tabIndex={isSelected ? 0 : -1}
      transition="all 0.2s"
      px={2}
      py={1}
      mx="2px"
      borderBottomWidth="3px"
      borderBottomColor="transparent"
      outline="none"
      whiteSpace="nowrap"
      _hover={{
        color: 'primary.400',
        borderBottomColor: 'primary.400'
      }}
      _focus={{
        color: 'primary.500',
        borderBottomColor: 'primary.500'
      }}
      _active={{
        color: 'primary.500',
        borderBottomColor: 'primary.500'
      }}
    >
      {children}
    </PseudoBox>
  );
});

TabButton.displayName = 'TabButton';

export { TabButton };
