import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { BaseAlert, alertInitial, alertAnimate, alertExit } from '../../Alert/components/BaseAlert';
import { Spinner } from '../../Spinner';

const variantIconType = {
  primary: FiCheckCircle,
  info: FiInfo,
  success: FiCheckCircle,
  warning: FiAlertCircle,
  danger: FiX,
  loading: Spinner
};

const Toast = memo(
  ({
    id,
    title,
    titleProps,
    description,
    descriptionProps,
    icon,
    iconProps,
    variant,
    duration,
    unregisterToast,
    onClick,
    onClose,
    closeable,
    placement,
    children
  }) => {
    const [paused, setPaused] = useState(false);

    const timeoutRef = useRef(null);

    const handleClose = useCallback(() => {
      unregisterToast(id, placement);

      if (onClose) onClose();
    }, [id, onClose, placement, unregisterToast]);

    useEffect(() => {
      if (duration > 0 && !paused) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, duration * 1000);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused]);

    useEffect(() => {
      return () => {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleMouseEnter = useCallback(() => {
      setPaused(true);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    }, []);

    const handleMouseLeave = useCallback(() => {
      setPaused(false);
    }, []);

    const isTop = placement.includes('top');

    const clickProps = {
      tabIndex: 0,
      onClick,
      onKeyPress: ev => {
        if (ev.keyCode === 13) {
          onClick(ev);
        }
      }
    };

    let usedIcon = null;
    if (icon) {
      usedIcon = icon;
    } else if (variantIconType[variant]) {
      const VariantIcon = variantIconType[variant];
      if (variant === 'loading') {
        usedIcon = <VariantIcon size="md" />;
      } else {
        usedIcon = <VariantIcon />;
      }
    }

    const themeVariant = variant === 'loading' ? 'primary' : variant;

    return (
      <BaseAlert
        withPresence
        positionTransition
        title={title}
        titleProps={titleProps}
        description={description}
        descriptionProps={descriptionProps}
        icon={usedIcon}
        iconProps={iconProps}
        closeable={closeable}
        onClose={handleClose}
        initial={isTop ? { ...alertInitial, y: -50 } : alertInitial}
        animate={alertAnimate}
        exit={alertExit}
        my={1}
        variant={themeVariant}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(onClick ? clickProps : {})}
      >
        {children}
      </BaseAlert>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };
