/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { get } from 'styled-system';
import cn from 'classnames';
import { VisuallyHidden } from '../VisuallyHidden';
import { Box } from '../Box';
import { useUiTheme } from '../UiProvider';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinner = css`
  display: inline-block;
  vertical-align: text-bottom;
  border: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 0.5s linear infinite;
  border-bottom-color: transparent;
  border-left-color: transparent;
`;

const sizeConfig = {
  lg: {
    height: 12,
    minWidth: 12,
    fontSize: 6,
    px: 6
  },
  md: {
    height: 10,
    minWidth: 10,
    fontSize: 4,
    px: 4
  },
  sm: {
    height: 8,
    minWidth: 8,
    fontSize: 3,
    px: 3
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: 2,
    px: 2
  }
};

const spinnerSize = (size = 'md', sizes) => {
  const conf = sizeConfig[size];

  return `
    height: ${sizes[conf.px]};
    min-width: ${sizes[conf.px]};
  `;
};

const Spinner = ({
  label = 'Loading...',
  variantColor = 'current',
  className,
  size = 'sm',
  style,
  children,
  ...restProps
}) => {
  const theme = useUiTheme();

  return (
    <Box
      css={css([
        spinner,
        { color: get(theme.colors, variantColor) },
        spinnerSize(size, theme.sizes)
      ])}
      className={cn(['spinner', className])}
      role="status"
      {...restProps}
      style={style}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
    </Box>
  );
};

Spinner.displayName = 'Spinner';

export { Spinner };
