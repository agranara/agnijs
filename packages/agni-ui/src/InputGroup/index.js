import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { Box } from '../Box';
import { useUiTheme } from '../UiProvider/hooks/useUiTheme';
import { inputSizes } from '../inputSizes';
import { InputInside } from '../InputInside';
import { InputText } from '../InputText';

const InputGroup = forwardRef(({ children, size = 'md', ...restProps }, ref) => {
  const { sizes } = useUiTheme();

  const height = inputSizes[size] && inputSizes[size]['height'];
  const paddingSize = sizes[height];

  let paddingLeft = null;
  let paddingRight = null;

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.type === InputInside && child.props.placement === 'left') {
        paddingLeft = paddingSize;
      }
      if (child.type === InputInside && child.props.placement === 'right') {
        paddingRight = paddingSize;
      }
    }
  });

  return (
    <Box
      ref={ref}
      d="flex"
      pos="relative"
      alignItems="center"
      className="input-group"
      {...restProps}
    >
      {Children.map(children, child => {
        if (!isValidElement(child)) return;

        if (child.type === InputText) {
          const inputProps = {
            size,
            pl: child.props.pl || paddingLeft,
            pr: child.props.pr || paddingRight
          };
          return cloneElement(child, inputProps);
        }

        if (child.type === InputInside) {
          return cloneElement(child, { size: child.props.size || size });
        }

        return child;
      })}
    </Box>
  );
});

InputGroup.displayName = 'InputGroup';

export { InputGroup };
