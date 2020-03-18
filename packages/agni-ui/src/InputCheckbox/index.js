import React, { forwardRef, useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { FiCheck, FiMinus } from 'react-icons/fi';
import { useForkedRef, useAutoId } from '../_hooks';
import { Box } from '../Box';
import { ControlBox } from '../ControlBox';
import { VisuallyHidden } from '../VisuallyHidden';
import useCheckboxStyle from './style';

const InputCheckbox = forwardRef(
  (
    {
      id,
      name,
      value,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      variantColor = 'primary',
      defaultIsChecked,
      size = 'md',
      isChecked,
      isFullWidth,
      isDisabled,
      isInvalid,
      isIndeterminate,
      onChange,
      onBlur,
      onFocus,
      children,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const styleProps = useCheckboxStyle({
      color: variantColor,
      size,
      type: 'checkbox'
    });

    const ref = useRef(null);
    const forkedRef = useForkedRef(ref, forwardedRef);

    useEffect(() => {
      if (ref.current !== null) {
        ref.current.indeterminate = Boolean(isIndeterminate);
      }
    }, [isIndeterminate, ref]);

    return (
      <Box
        as="label"
        className={cn(['input-checkbox', className])}
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
          type="checkbox"
          id={id}
          ref={forkedRef}
          name={name}
          value={value}
          defaultChecked={defaultIsChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={isInvalid}
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
        />
        <ControlBox className="input-checkbox__box" {...styleProps} type="checkbox">
          {isIndeterminate ? <FiMinus /> : <FiCheck />}
        </ControlBox>
        {children && (
          <Box
            className="input-checkbox__label"
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

InputCheckbox.displayName = 'InputCheckbox';

/////////////////////////////////////////////

const InputCheckboxGroup = ({
  onChange,
  name,
  variantColor = 'primary',
  size = 'md',
  defaultValue,
  isInline,
  value: valueProp,
  spacing = 2,
  children,
  className,
  ...rest
}) => {
  const [values, setValues] = useState(defaultValue || []);

  // If no name is passed, we'll generate a random, unique name
  const _name = useAutoId(name);

  const { current: isControlled } = useRef(valueProp != null);
  const _values = isControlled ? valueProp : values;

  const _onChange = event => {
    const { checked, value } = event.target;
    let newValues;
    if (checked) {
      newValues = [..._values, value];
    } else {
      newValues = _values.filter(val => val !== value);
    }

    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };

  const validChildren = React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  );

  const clones = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return;

    const isLastCheckbox = validChildren.length === index + 1;
    const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

    return (
      <Box
        className="input-checkbox-group__wrapper"
        display={isInline ? 'inline-block' : 'block'}
        {...(!isLastCheckbox && spacingProps)}
      >
        {React.cloneElement(child, {
          size: child.props.size || size,
          variantColor: child.props.variantColor || variantColor,
          name: `${_name}[${index}]`,
          onChange: _onChange,
          isChecked: _values.includes(child.props.value)
        })}
      </Box>
    );
  });

  return (
    <Box role="group" className={cn(['input-checkbox-group', className])} {...rest}>
      {clones}
    </Box>
  );
};

InputCheckboxGroup.displayName = 'InputCheckboxGroup';

export { InputCheckbox, InputCheckboxGroup };
