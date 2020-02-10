import React, { useRef, useEffect } from 'react';
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

const Toast = ({
  id,
  title,
  description,
  icon,
  variant,
  duration,
  unregisterToast,
  onClick,
  onClose,
  closeable,
  placement,
  children
}) => {
  const timeoutRef = useRef();

  useEffect(() => {
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, duration * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    unregisterToast(id, placement);

    if (onClose) onClose();
  };

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

  const VariantIcon = variantIconType[variant];

  const usedIcon = icon ? (
    icon
  ) : VariantIcon ? (
    variant === 'loading' ? (
      <VariantIcon size="md" />
    ) : (
      <VariantIcon />
    )
  ) : (
    undefined
  );

  const themeVariant = variant === 'loading' ? 'primary' : variant;

  return (
    <BaseAlert
      withPresence
      positionTransition
      title={title}
      description={description}
      icon={usedIcon}
      closeable={closeable}
      onClose={handleClose}
      initial={isTop ? { ...alertInitial, y: -50 } : alertInitial}
      animate={alertAnimate}
      exit={alertExit}
      my={1}
      variant={themeVariant}
      children={children}
      {...(onClick ? clickProps : {})}
    />
  );
};

Toast.displayName = 'Toast';

export { Toast };
