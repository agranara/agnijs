/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { get } from 'styled-system';
import cn from 'classnames';
import defaultTheme from '../theme';
import { VisuallyHidden } from '../VisuallyHidden';
import { sizeConfig } from '../sizeStyle';
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

const spinnerSize = (size = 'md', sizes = defaultTheme.sizes) => {
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
      css={css([spinner, { color: get(theme.colors, variantColor) }, spinnerSize(size)])}
      className={cn(['spinner', className])}
      role="status"
      {...restProps}
      style={style}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
    </Box>
  );
};

export { Spinner };
export default Spinner;
