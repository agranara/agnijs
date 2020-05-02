import React, { useState } from 'react';
import { FiCheck, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import { BaseAlert } from './components/BaseAlert';

const variantIcon = {
  primary: FiCheck,
  info: FiInfo,
  success: FiCheck,
  warning: FiAlertCircle,
  danger: FiX
};

const Alert = ({
  afterOpen,
  afterClose,
  animate,
  closeable,
  description,
  descriptionProps,
  exit,
  icon,
  iconProps,
  iconSize = '1.5rem',
  initial,
  isOpen: isOpenProp = true,
  title,
  titleProps,
  variant = 'info',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(() => isOpenProp);
  const UsedIcon = icon || variantIcon[variant];

  const handleClick = () => {
    setIsOpen(oldClose => !oldClose);
  };

  const handleAnimationEnd = prop => {
    if (prop && prop.newHeight > 0) {
      if (afterOpen) {
        afterOpen(isOpen);
      }
    } else if (prop && prop.newHeight < 1) {
      if (afterClose) {
        afterClose(isOpen);
      }
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <BaseAlert
          animate={animate}
          closeable={closeable}
          description={description}
          descriptionProps={descriptionProps}
          exit={exit}
          icon={<UsedIcon />}
          iconProps={iconProps}
          iconSize={iconSize}
          initial={initial}
          onClose={handleClick}
          onAnimationComplete={handleAnimationEnd}
          title={title}
          titleProps={titleProps}
          variant={variant}
          withPresence
          {...rest}
        />
      )}
    </AnimatePresence>
  );
};

Alert.displayName = 'Alert';

export { Alert };
