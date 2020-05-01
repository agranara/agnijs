/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRef, Fragment, Children, cloneElement, useEffect } from 'react';
import cn from 'classnames';

import { Positioner, useTogglePositioner } from '../Positioner';
import { PseudoBox } from '../PseudoBox';
import { useDebounceCallback } from '../_hooks/useDebounceCallback';
import { useUiTheme } from '../UiProvider/hooks/useUiTheme';

const Popover = ({
  children,
  className,
  containerProps,
  content,
  contentProps,
  title,
  titleProps,
  placement = 'bottom',
  delayOpen = 300,
  delayClose = 50,
  isTooltip,
  ...restProps
}) => {
  const theme = useUiTheme();
  const triggerRef = useRef(null);
  const innerRef = useRef(null);

  const [isOpen, handleIsOpen] = useTogglePositioner({
    refs: [triggerRef, innerRef],
    initialOpen: false
  });

  const [debounceOpen, cancelDebounceOpen] = useDebounceCallback({
    callback: () => {
      handleIsOpen(true);
    },
    delay: delayOpen
  });
  const [debounceClose, cancelDebounceClose] = useDebounceCallback({
    callback: () => {
      handleIsOpen(false);
    },
    delay: delayClose
  });

  useEffect(() => {
    return () => {
      cancelDebounceClose();
      cancelDebounceOpen();
    };
  }, [cancelDebounceClose, cancelDebounceOpen]);

  const handleClick = () => {
    if (!isTooltip) {
      handleIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (isTooltip) {
      cancelDebounceOpen();
      cancelDebounceClose();
      debounceOpen();
    }
  };

  const handleMouseLeave = () => {
    if (isTooltip) {
      cancelDebounceClose();
      cancelDebounceOpen();
      debounceClose();
    }
  };

  const referenceProps = {
    ref: triggerRef,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };

  let clone;
  if (typeof children === 'string') {
    clone = (
      <PseudoBox as="span" tabIndex={0} {...referenceProps}>
        {children}
      </PseudoBox>
    );
  } else {
    clone = cloneElement(Children.only(children), referenceProps);
  }

  const tooltipProps = {
    bg: 'gray.700',
    color: 'whiteAlpha.900',
    borderColor: 'gray.700',
    arrowBackground: theme.colors.gray['700']
  };

  return (
    <Fragment>
      {clone}
      <Positioner
        isOpen={isOpen}
        triggerRef={triggerRef}
        innerRef={innerRef}
        placement={placement}
        tabIndex={-1}
        _focus={{ outline: 0 }}
        hasArrow
        py={0}
        {...(isTooltip && tooltipProps)}
        {...restProps}
      >
        <PseudoBox
          className={cn('popover__content', className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...containerProps}
        >
          {title && (
            <PseudoBox
              className="popover__content__title"
              py={1}
              px={4}
              borderBottomWidth={1}
              fontWeight="medium"
              {...titleProps}
            >
              {title}
            </PseudoBox>
          )}
          <PseudoBox className="popover__content__inner" py={2} px={4} {...contentProps}>
            {content}
          </PseudoBox>
        </PseudoBox>
      </Positioner>
    </Fragment>
  );
};

Popover.displayName = 'Popover';

export { Popover };
