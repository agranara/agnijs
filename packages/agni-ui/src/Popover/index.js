/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useRef, Fragment, Children, cloneElement } from 'react';

import { Positioner, useTogglePositioner } from '../Positioner';
import { PseudoBox } from '../PseudoBox';
import { useDebounceCallback } from '../_hooks/useDebounceCallback';
import { useUiTheme } from '../UiProvider/hooks/useUiTheme';

const Popover = ({ children, content, title, placement = 'bottom', isTooltip, ...restProps }) => {
  const theme = useUiTheme();
  const triggerRef = useRef(null);
  const innerRef = useRef(null);

  const [isOpen, handleIsOpen] = useTogglePositioner({
    refs: [triggerRef, innerRef],
    initialOpen: false
  });

  const [debounceHover, cancelDebounce] = useDebounceCallback({
    callback: newOpen => {
      handleIsOpen(newOpen);
    },
    delay: 50
  });

  const handleClick = () => {
    if (!isTooltip) {
      handleIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (isTooltip) {
      cancelDebounce();
      handleIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isTooltip) {
      debounceHover(false);
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
          className="content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title && (
            <PseudoBox
              className="popover__content__title"
              py={1}
              px={4}
              borderBottomWidth={1}
              fontWeight="medium"
            >
              {title}
            </PseudoBox>
          )}
          <PseudoBox className="popover__content__inner" py={2} px={4}>
            {content}
          </PseudoBox>
        </PseudoBox>
      </Positioner>
    </Fragment>
  );
};

Popover.displayName = 'Popover';

export { Popover };
