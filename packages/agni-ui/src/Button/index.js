import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { Spinner } from '../Spinner';
import { PseudoBox } from '../PseudoBox';
import useButtonStyle from './styles';

const Button = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isActive,
      isFullWidth,
      children,
      as: Comp = 'button',
      variantColor = 'gray',
      iconLeft,
      iconRight,
      variant = 'solid',
      loadingText,
      iconSpacing = 2,
      type = 'button',
      size = 'md',
      ...rest
    },
    ref
  ) => {
    const buttonStyleProps = useButtonStyle({
      color: variantColor,
      variant,
      size
    });
    const _isDisabled = isDisabled || isLoading;

    const insertedProps = {
      ...buttonStyleProps,
      ...rest,
      type: Comp === 'button' ? type : undefined
    };

    return (
      <PseudoBox
        disabled={_isDisabled}
        aria-disabled={_isDisabled}
        ref={ref}
        as={Comp}
        type={type}
        borderRadius="md"
        fontWeight="semibold"
        width={isFullWidth ? 'full' : undefined}
        data-active={isActive ? 'true' : undefined}
        className="button"
        {...insertedProps}
      >
        {iconLeft && !isLoading && (
          <Box className="button__icon-left" mr={iconSpacing} d="inline-flex">
            {iconLeft}
          </Box>
        )}
        {isLoading && (
          <Spinner
            position={loadingText ? 'relative' : 'absolute'}
            mr={loadingText ? iconSpacing : 0}
            color="currentColor"
            size={size}
          />
        )}
        {isLoading ? (
          loadingText || (
            <Box as="span" className="button__content" opacity="0">
              {children}
            </Box>
          )
        ) : (
          <Box as="span" className="button__content" lineHeight="none" alignSelf="center">
            {children}
          </Box>
        )}
        {iconRight && !isLoading && (
          <Box className="button__icon-right" ml={iconSpacing} d="inline-flex">
            {iconRight}
          </Box>
        )}
      </PseudoBox>
    );
  }
);

Button.displayName = 'Button';

export { Button };
