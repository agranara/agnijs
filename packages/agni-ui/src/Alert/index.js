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
  variant = 'info',
  title,
  description,
  icon,
  closeable,
  isOpen: isOpenProp = true,
  afterOpen,
  afterClose,
  iconSize = '1.5rem'
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
          title={title}
          description={description}
          icon={<UsedIcon />}
          withPresence
          closeable={closeable}
          onClose={handleClick}
          onAnimationComplete={handleAnimationEnd}
          variant={variant}
          iconSize={iconSize}
        />
      )}
    </AnimatePresence>
  );
};

Alert.displayName = 'Alert';

export { Alert };
