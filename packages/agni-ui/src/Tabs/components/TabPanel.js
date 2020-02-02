import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useTabContext } from '../TabContext';
import { createUid } from '../../_utils/createUid';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { PseudoBox } from '../../PseudoBox';

const TabPanel = forwardRef(({ children, index, ...rest }, forwardedRef) => {
  const { uid, activeIndex, selectedPanelRef } = useTabContext();
  const [mounted, setMounted] = useState(false);

  const isSelected = index === activeIndex;

  // No need to unmount after tab change
  useEffect(() => {
    if (isSelected) {
      setMounted(true);
    }
  }, [isSelected]);

  const panelId = createUid(uid, 'panel', index);
  const buttonId = createUid(uid, 'tab', index);

  const ref = useRef(null);
  const forkedRef = useForkedRef(ref, forwardedRef, isSelected ? selectedPanelRef : null);

  return (
    <PseudoBox
      {...rest}
      hidden={!isSelected}
      ref={forkedRef}
      className="tabs__panel"
      role="tabpanel"
      aria-labelledby={buttonId}
      id={panelId}
      tabIndex={-1}
      outline="none"
    >
      {mounted && children}
    </PseudoBox>
  );
});

TabPanel.displayName = 'TabPanel';

export { TabPanel };
