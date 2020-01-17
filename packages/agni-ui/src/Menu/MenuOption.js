/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { get } from 'styled-system';
import { sizes } from '../Button/styles';
import { useUiTheme } from '../UiProvider';

const useMenuItemCss = ({ variantColor, size, isDisabled }) => {
  const { sizes: themeSizes, fontSizes, colors } = useUiTheme();

  const activeColor = get(colors, `${variantColor}.500`);
  const hoverColor = get(colors, `${variantColor}.50`);

  const baseCss = css`
    display: flex;
    appearance: none;
    align-items: center;
    justify-content: flex-start;
    transition: all 250ms;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    line-height: 1;
    outline: none;
    text-align: left;

    color: ${activeColor};
    background-color: transparent;

    &:hover {
      background-color: ${hoverColor};
    }

    &:active,
    &.active {
      background-color: ${activeColor};
      color: white;
    }
  `;

  const { height, fontSize, px } = sizes[size];

  const sizeCss = css`
    height: ${themeSizes[height]};
    min-width: 9rem;
    font-size: ${fontSizes[fontSize]};
    padding-left: ${themeSizes[px]};
    padding-right: ${themeSizes[px]};
  `;

  const disabledCss = css`
    opacity: 40%;
    cursor: not-allowed;
    box-shadow: none;
  `;

  return css([baseCss, sizeCss, isDisabled && disabledCss]);
};

export const MenuOption = ({
  as: Comp = 'button',
  children,
  size = 'md',
  isDisabled = false,
  variantColor = 'primary',
  ...restProps
}) => {
  const baseCss = useMenuItemCss({ isDisabled, size, variantColor });

  const additionalProps = {};
  if (Comp === 'button') {
    additionalProps.type = restProps.type || 'button';
  }

  return (
    <Comp {...restProps} {...additionalProps} css={baseCss}>
      {children}
    </Comp>
  );
};
