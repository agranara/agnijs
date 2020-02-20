/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAutoId } from '../../_hooks/useAutoId';
import { Popup } from '../../Popup';
import { PseudoBox } from '../../PseudoBox';
import { useUiTheme } from '../../UiProvider';
import { ModalContext } from '../ModalContext';

const Modal = forwardRef(
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
      size = 'md',
      ...rest
    },
    forwardedRef
  ) => {
    const uid = useAutoId();
    const theme = useUiTheme();

    const mouseDownTarget = useRef();

    const handleMouseDown = event => {
      mouseDownTarget.current = event.target;
    };

    const handleBackdropClick = event => {
      // Ignore the events not coming from the "backdrop"
      // We don't want to close the dialog when clicking the dialog content.
      if (event.target !== event.currentTarget) {
        return;
      }

      // Make sure the event starts and ends on the same DOM element.
      if (event.target !== mouseDownTarget.current) {
        return;
      }

      mouseDownTarget.current = null;

      if (onBackdropClick) {
        onBackdropClick(event);
      }

      if (closeOnBackdropClick && onClose) {
        onClose(event, 'backdropClick');
      }
    };

    const titleId = `${uid}_label`;
    const descriptionId = `${uid}_desc`;

    return (
      <ModalContext.Provider value={{ uid, titleId, descriptionId, onClose }}>
        <Popup
          ref={forwardedRef}
          isOpen={isOpen}
          className={className}
          isBackdropHidden={isBackdropHidden}
          closeOnEscape={closeOnEscape}
          onClose={onClose}
          onEscapeKeyDown={onEscapeKeyDown}
          {...rest}
        >
          <PseudoBox
            className="modal"
            h="full"
            d="flex"
            outline="0"
            justifyContent="center"
            alignItems="center"
            onMouseDown={handleMouseDown}
            onClick={handleBackdropClick}
          >
            <motion.div
              key={uid}
              id={`${uid}-modal`}
              className="modal__dialog"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              initial={{ opacity: 0.4, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              css={css({
                margin: 32,
                position: 'relative',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100% - 64px)',
                backgroundColor: 'white',
                width: '100%',
                maxWidth: theme.sizes[size],
                borderRadius: theme.radii.md,
                boxShadow: theme.shadows.lg
              })}
            >
              {children}
            </motion.div>
          </PseudoBox>
        </Popup>
      </ModalContext.Provider>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
