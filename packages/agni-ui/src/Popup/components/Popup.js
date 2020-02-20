/**
 * Thanks to 'material-ui' team
 *
 * Original Source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Modal/Modal.js
 */

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { forwardRef, useRef, useCallback, useEffect, cloneElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '../../Portal';
import { useForkedRef } from '../../_hooks/useForkedRef';
import { useEventCallback } from '../../_hooks/useEventCallback';
import { ownerDocument } from '../../_utils/ownerDocument';
import { getContainer } from '../../_utils/getContainer';
import { FocusTrap } from '../../FocusTrap';
import { PseudoBox } from '../../PseudoBox';
import { ariaHidden, PopupManager } from './PopupManager';

const defaultManager = new PopupManager();

const Popup = forwardRef(
  (
    {
      isOpen,
      className,
      children,
      container,
      onClose,
      onRendered,
      onBackdropClick,
      onEscapeKeyDown,
      manager = defaultManager,
      usePortal = true,
      isAutoFocus = true,
      isEnforceFocus = true,
      isRestoreFocus = true,
      isScrollLockDisabled = false,
      isBackdropHidden = false,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      ...rest
    },
    forwardedRef
  ) => {
    const popup = useRef({});
    const mountNodeRef = useRef(null);
    const popupRef = useRef();
    const ref = useForkedRef(forwardedRef, popupRef);

    const getDocument = () => ownerDocument(mountNodeRef.current);
    const getPopup = () => {
      popup.current.popupRef = popupRef.current;
      popup.current.mountNode = mountNodeRef.current;
      return popup.current;
    };

    const handleMounted = () => {
      manager.mount(getPopup(), { isScrollLockDisabled });

      // Fix a bug on Chrome where the scroll isn't initially 0.
      popupRef.current.scrollTop = 0;
    };

    const handleOpen = useEventCallback(() => {
      const resolvedContainer = getContainer(container) || getDocument().body;

      manager.add(getPopup(), resolvedContainer);

      // The element was already mounted.
      if (popupRef.current) {
        handleMounted();
      }
    });

    const isTopPopup = useCallback(() => manager.isTopPopup(getPopup()), [manager]);

    const handlePortalRef = useEventCallback(node => {
      mountNodeRef.current = node;

      if (!node) {
        return;
      }

      if (onRendered) {
        onRendered();
      }

      if (isOpen && isTopPopup()) {
        handleMounted();
      } else {
        ariaHidden(popupRef.current, true);
      }
    });

    const handleClose = useCallback(() => {
      manager.remove(getPopup());
    }, [manager]);

    useEffect(() => {
      return () => {
        handleClose();
      };
    }, [handleClose]);

    useEffect(() => {
      if (isOpen) {
        handleOpen();
      } else {
        handleClose();
      }
    }, [handleClose, handleOpen, isOpen]);

    const handleBackdropClick = event => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (onBackdropClick) {
        onBackdropClick(event);
      }

      if (closeOnBackdropClick && onClose) {
        onClose(event, 'backdropClick');
      }
    };

    const handleKeyDown = event => {
      // The handler doesn't take event.defaultPrevented into account:
      //
      // event.preventDefault() is meant to stop default behaviours like
      // clicking a checkbox to check it, hitting a button to submit a form,
      // and hitting left arrow to move the cursor in a text input etc.
      // Only special HTML elements have these default behaviors.
      if (event.key !== 'Escape' || !isTopPopup()) {
        return;
      }

      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onEscapeKeyDown) {
        onEscapeKeyDown(event);
      }

      if (closeOnEscape && onClose) {
        onClose(event, 'escapeKeyDown');
      }
    };
    const childProps = {};
    if (children.props.tabIndex === undefined) {
      childProps.tabIndex = children.props.tabIndex || '-1';
    }

    return (
      <Portal ref={handlePortalRef} isDisabled={!usePortal} container={container}>
        <AnimatePresence>
          {isOpen && (
            <PseudoBox
              ref={ref}
              className={cn(['popup', className])}
              role="presentation"
              onKeyDown={handleKeyDown}
              pos="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex="overlay"
              {...rest}
            >
              {!isBackdropHidden && (
                <motion.div
                  className="popup__backdrop"
                  aria-hidden
                  onClick={handleBackdropClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  css={css({
                    backgroundColor: 'black',
                    zIndex: '-1',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    WebkitTapHighlightColor: 'transparent'
                  })}
                />
              )}
              <FocusTrap
                isOpen={isOpen}
                isAutoFocus={isAutoFocus}
                isEnforceFocus={isEnforceFocus}
                isRestoreFocus={isRestoreFocus}
                isEnabled={isTopPopup}
                getDocument={getDocument}
              >
                {cloneElement(children, childProps)}
              </FocusTrap>
            </PseudoBox>
          )}
        </AnimatePresence>
      </Portal>
    );
  }
);

Popup.displayName = 'Popup';

export { Popup };
