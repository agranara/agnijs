import React, { forwardRef, useRef, useState } from 'react';
import cn from 'classnames';
import { PseudoBox } from '../../PseudoBox';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { useAutoId } from '../../_hooks/useAutoId';
import { TabContext } from '../TabContext';

const Tabs = forwardRef(
  (
    {
      className,
      activeIndex: activeIndexProp = null,
      onTabChange,
      orientation,
      variant,
      closeable,
      onTabClose,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const ref = useRef(null);
    const forkedRef = useForkedRef(ref, forwardedRef);
    const isControlled = useRef(activeIndexProp !== null);
    const uid = useAutoId();
    const userInteractedRef = useRef(false);
    const selectedPanelRef = useRef(null);

    const [activeIndexState, setActiveIndex] = useState(() => {
      return activeIndexProp !== null ? activeIndexProp : 0;
    });

    const context = {
      uid,
      isControlled: isControlled.current,
      onFocusTab: () => {
        if (selectedPanelRef.current) {
          selectedPanelRef.current.focus();
        }
      },
      onSelectTab: index => {
        userInteractedRef.current = true;
        if (onTabChange) onTabChange(index);
        if (!isControlled.current) {
          setActiveIndex(index);
        }
      },
      userInteractedRef,
      selectedPanelRef,
      orientation,
      variant,
      closeable,
      onTabClose,
      activeIndex: isControlled.current ? activeIndexProp : activeIndexState
    };

    return (
      <TabContext.Provider value={context}>
        <PseudoBox {...rest} ref={forkedRef} className={cn(['tabs', className])} id={uid}>
          {children}
        </PseudoBox>
      </TabContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export { Tabs };
