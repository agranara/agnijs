/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import cn from 'classnames';
import { useUiTheme } from '../../UiProvider';

const InputDropable = ({
  children,
  getRootProps,
  getInputProps,
  height,
  isInteractive,
  isDragged,
  isFocused,
  ...restProps
}) => {
  const theme = useUiTheme();

  return (
    <div
      role="presentation"
      {...getRootProps()}
      className={cn([
        'input-upload__droppable',
        (isDragged || isFocused) && 'input-upload__droppable--focused'
      ])}
      css={css({
        transition: '0.2s all',
        position: 'relative',
        height,
        borderWidth: 1,
        borderRadius: theme.radii.md,
        cursor: isInteractive ? 'pointer' : 'not-allowed',
        outline: 'none',
        boxShadow: 'none',
        '&.input-upload__droppable--focused': {
          borderColor: theme.colors.primary[500],
          boxShadow: `0 0 0 1px ${theme.colors.primary[500]}`,
          color: theme.colors.primary[500]
        },
        '&:hover': {
          borderColor: theme.colors.gray[300]
        }
      })}
    >
      <input
        css={{
          display: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          appearance: 'none',
          visibility: 'hidden'
        }}
        {...restProps}
        {...getInputProps()}
        className="input-upload__file"
      />
      {children}
    </div>
  );
};

InputDropable.displayName = 'InputDropable';

export { InputDropable };
