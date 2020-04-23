/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAutoId, useForkedRef } from '../../_hooks';
import { Popup } from '../../Popup';
import { useUiTheme } from '../../UiProvider';
import { drawerStyle, drawerAnimationVariant } from '../style';
import { DrawerContext } from '../DrawerContext';

const Drawer = forwardRef(
  (
    {
      className,
      children,
      isOpen,
      isBackdropHidden,
      onClose,
      onBackdropClick,
      onEscapeKeyDown,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      closeOnOutsideClick = true,
      size = 'xs',
      maxSizePixel,
      onAnimationStart,
      onAnimationComplete,
      placement = 'right',
      ...rest
    },
    forwardedRef
  ) => {
    const uid = useAutoId();
    const theme = useUiTheme();

    const ref = useRef(null);
    const forkedRef = useForkedRef(ref, forwardedRef);

    const mouseDownTarget = useRef();

    // eslint-disable-next-line consistent-return
    useEffect(() => {
      const handleMouseDown = event => {
        mouseDownTarget.current = event.target;
      };

      const handleClick = event => {
        // Make sure the event starts and ends on the same DOM element.
        if (event.target !== mouseDownTarget.current) {
          return;
        }

        if (ref.current && !ref.current.contains(event.target)) {
          mouseDownTarget.current = null;

          if (onBackdropClick) {
            onBackdropClick(event);
          }

          if (closeOnBackdropClick && onClose) {
            onClose(event, 'backdropClick');
          }
        }
      };

      const addListener = () => {
        document.addEventListener('mousedown', handleMouseDown, false);
        document.addEventListener('click', handleClick, false);
      };

      const removeListener = () => {
        document.removeEventListener('mousedown', handleMouseDown, false);
        document.removeEventListener('click', handleClick, false);
      };

      if (isBackdropHidden && closeOnOutsideClick) {
        if (isOpen) {
          addListener();
        } else {
          removeListener();
        }

        return () => {
          removeListener();
        };
      }
    }, [
      closeOnBackdropClick,
      closeOnOutsideClick,
      isBackdropHidden,
      isOpen,
      onBackdropClick,
      onClose
    ]);

    const titleId = `${uid}_label`;
    const descriptionId = `${uid}_desc`;

    return (
      <DrawerContext.Provider value={{ onClose, titleId, descriptionId }}>
        <Popup
          ref={forkedRef}
          isOpen={isOpen}
          className={className}
          isBackdropHidden={isBackdropHidden}
          isScrollLockDisabled={isBackdropHidden}
          closeOnEscape={closeOnEscape}
          closeOnBackdropClick={closeOnBackdropClick}
          onClose={onClose}
          onEscapeKeyDown={onEscapeKeyDown}
          onAnimationComplete={onAnimationComplete}
          {...drawerStyle(placement, maxSizePixel || theme.sizes[size])}
          {...rest}
        >
          <motion.div
            key={uid}
            className="drawer"
            variants={drawerAnimationVariant}
            custom={placement}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initial="hide"
            animate="show"
            exit="hide"
            transition={{ duration: 0.2, ease: 'linear' }}
            css={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: theme.shadows.lg,
              outline: '0'
            }}
            onAnimationStart={onAnimationStart}
          >
            {children}
          </motion.div>
        </Popup>
      </DrawerContext.Provider>
    );
  }
);

Drawer.displayName = 'Drawer';

export { Drawer };
