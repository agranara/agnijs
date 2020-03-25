/**
 * Thanks to 'material-ui'
 *
 * Original Source:  https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Modal/TrapFocus.js
 */

import React, { useRef, useCallback, useMemo, useEffect, Fragment, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import { useForkedRef } from '../_hooks/useForkedRef';
import { ownerDocument } from '../_utils/ownerDocument';

const FocusTrap = ({
  children,
  isOpen,
  isEnabled,
  isAutoFocus = true,
  isEnforceFocus = true,
  isRestoreFocus = true,
  getDocument
}) => {
  const ignoreNextEnforceFocus = useRef();
  const sentinelStart = useRef(null);
  const sentinelEnd = useRef(null);
  const nodeToRestore = useRef();

  const rootRef = useRef(null);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = useCallback(instance => {
    // #StrictMode ready
    // eslint-disable-next-line react/no-find-dom-node
    rootRef.current = findDOMNode(instance);
  }, []);
  const handleRef = useForkedRef(children.ref, handleOwnRef);

  // ⚠️ You may rely on React.useMemo as a performance optimization, not as a semantic guarantee.
  // https://reactjs.org/docs/hooks-reference.html#usememo
  useMemo(() => {
    if (!isOpen || typeof window === 'undefined') {
      return;
    }

    nodeToRestore.current = getDocument().activeElement;
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    // We might render an empty child.
    if (isAutoFocus && rootRef.current && !rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        rootRef.current.setAttribute('tabIndex', -1);
      }

      rootRef.current.focus();
    }

    const contain = () => {
      if (!isEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (rootRef.current && !rootRef.current.contains(doc.activeElement)) {
        rootRef.current.focus();
      }
    };

    const loopFocus = event => {
      // 9 = Tab
      if (!isEnforceFocus || !isEnabled() || event.keyCode !== 9) {
        return;
      }

      // Make sure the next tab starts from the right place.
      if (doc.activeElement === rootRef.current) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          sentinelEnd.current.focus();
        } else {
          sentinelStart.current.focus();
        }
      }
    };

    doc.addEventListener('focus', contain, true);
    doc.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      contain();
    }, 50);

    return () => {
      clearInterval(interval);

      doc.removeEventListener('focus', contain, true);
      doc.removeEventListener('keydown', loopFocus, true);

      // restoreLastFocus()
      if (isRestoreFocus) {
        // In IE 11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE 11 have a focus method.
        // Once IE 11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          nodeToRestore.current.focus();
        }

        nodeToRestore.current = null;
      }
    };
  }, [isAutoFocus, isEnabled, isEnforceFocus, isOpen, isRestoreFocus]);

  return (
    <Fragment>
      <div tabIndex={0} ref={sentinelStart} data-test="sentinelStart" />
      {cloneElement(children, { ref: handleRef })}
      <div tabIndex={0} ref={sentinelEnd} data-test="sentinelEnd" />
    </Fragment>
  );
};

FocusTrap.displayName = 'FocusTrap';

export { FocusTrap };
