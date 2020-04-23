import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { PseudoBox } from '../../PseudoBox';
import { TabPanel } from './TabPanel';

const TabPanels = forwardRef(({ children, ...rest }, forwardedRef) => {
  return (
    <PseudoBox {...rest} ref={forwardedRef} className="tabs__panels">
      {Children.map(children, (child, childIndex) => {
        if (!isValidElement(child)) return null;

        if (child.type === TabPanel) {
          return cloneElement(child, { index: childIndex });
        }

        return child;
      })}
    </PseudoBox>
  );
});

TabPanels.displayName = 'TabPanels';

export { TabPanels };
