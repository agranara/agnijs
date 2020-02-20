/**
 * Portal Component
 *
 * The following code is a derivative of the amazing work done by the Material UI team.
 * Original source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Portal/Portal.js
 */

import { cloneElement, useState, forwardRef, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { useForkedRef } from '../_hooks/useForkedRef';
import { useEnhancedEffect } from '../_hooks/useEnhancedEffect';
import { setRef } from '../_refs/setRef';
import { getContainer } from '../_utils/getContainer';

const Portal = forwardRef(({ children, container, isDisabled = false, onRendered }, ref) => {
  const [mountNode, setMountNode] = useState(null);
  const handleRef = useForkedRef(children.ref, ref);

  useEnhancedEffect(() => {
    if (!isDisabled) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, isDisabled]);

  useEnhancedEffect(() => {
    if (mountNode && !isDisabled) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, isDisabled]);

  useEnhancedEffect(() => {
    if (onRendered && (mountNode || isDisabled)) {
      onRendered();
    }
  }, [onRendered, mountNode, isDisabled]);

  if (isDisabled) {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ref: handleRef
      });
    }

    return children;
  }

  return mountNode ? createPortal(children, mountNode) : mountNode;
});

Portal.displayName = 'Portal';

export { Portal };
