/** @jsx jsx */
import { jsx } from '@emotion/core';
import cn from 'classnames';
import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  cloneElement,
  isValidElement,
  Children,
  useEffect
} from 'react';
import { Box } from '../Box';
import { ControlBox } from '../ControlBox';
import { VisuallyHidden } from '../VisuallyHidden';
import { useAutoId } from '../_hooks/useAutoId';
import useCheckboxStyle from './styles';

const InputRadio = forwardRef(
  (
    {
      id,
      name,
      value,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      variantColor = 'primary',
      defaultIsChecked,
      isChecked,
      isFullWidth,
      size = 'md',
      isDisabled,
      isInvalid,
      onChange,
      onBlur,
      onFocus,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const styleProps = useCheckboxStyle({
      color: variantColor,
      size,
      type: 'radio'
    });

    return (
      <Box
        className={cn(['input-radio', className])}
        as="label"
        display="inline-flex"
        verticalAlign="top"
        htmlFor={id}
        alignItems="center"
        width={isFullWidth ? 'full' : undefined}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="radio"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
          ref={ref}
          name={name}
          value={value}
          aria-invalid={isInvalid}
          defaultChecked={defaultIsChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
        />
        <ControlBox className="input-radio__box" {...styleProps} type="radio" rounded="full">
          <Box
            className="input-radio__check"
            bg="currentColor"
            as="span"
            rounded="full"
            size="50%"
          />
        </ControlBox>
        {children && (
          <Box
            className="input-radio__label"
            ml={2}
            fontSize={size}
            userSelect="none"
            opacity={isDisabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Box>
    );
  }
);

InputRadio.displayName = 'InputRadio';

///////////////////////////////////////////////////////////////

const InputRadioGroup = forwardRef(
  (
    {
      onChange,
      name,
      variantColor,
      size,
      defaultValue,
      isInline,
      value: valueProp,
      spacing = 2,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const { current: isControlled } = useRef(typeof onChange === 'function');
    const [value, setValue] = useState(defaultValue || null);
    const _value = isControlled ? valueProp : value;
    const rootRef = useRef();

    const _onChange = event => {
      if (!isControlled) {
        setValue(event.target.value);
      }

      if (onChange) {
        onChange(event, event.target.value);
      }
    };

    // If no name is passed, we'll generate a random, unique name
    const _name = useAutoId(name);

    // Calling focus() on the radiogroup should focus
    // on the selected option or first enabled option
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          let input = rootRef.current.querySelector('input:not(:disabled):checked');

          if (!input) {
            input = rootRef.current.querySelector('input:not(:disabled)');
          }

          if (input) {
            input.focus();
          }
        }
      }),
      []
    );

    const validChildren = Children.toArray(children).filter(child => isValidElement(child));

    const clones = Children.map(children, (child, index) => {
      if (!isValidElement(child)) return;

      const isLastRadio = validChildren.length === index + 1;
      const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

      return (
        <Box
          className="input-radio-group__wrapper"
          display={isInline ? 'inline-block' : 'block'}
          {...(!isLastRadio && spacingProps)}
        >
          {cloneElement(child, {
            size: child.props.size || size,
            variantColor: child.props.variantColor || variantColor,
            name: _name,
            onChange: _onChange,
            isChecked: child.props.value === _value
          })}
        </Box>
      );
    });

    return (
      <Box
        ref={rootRef}
        role="radiogroup"
        className={cn(['input-radio-group', className])}
        {...rest}
      >
        {clones}
      </Box>
    );
  }
);

InputRadioGroup.displayName = 'InputRadioGroup';

export { InputRadio, InputRadioGroup };
