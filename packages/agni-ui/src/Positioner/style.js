import { css } from '@emotion/core';

const getPopperArrowStyle = ({
  arrowSize = '6px',
  arrowShadowColor = 'rgba(0, 0, 0, 0.1)',
  arrowBackground = 'white',
  hasArrow = true
}) => {
  const popoverMargin = hasArrow ? `calc(${arrowSize} / 2)` : null;
  const arrowPos = `calc(${arrowSize} / 2 * -1)`;

  return css`
    [data-popper-arrow] {
      width: ${arrowSize};
      height: ${arrowSize};
      position: absolute;
      z-index: -1;
      &::before {
        content: '';
        transform: rotate(45deg);
        width: ${arrowSize};
        height: ${arrowSize};
        position: absolute;
        background-color: ${arrowBackground};
        z-index: -1;
        top: 0;
        left: 0;
      }
    }
    &[data-popper-placement^='top'] {
      margin-bottom: ${popoverMargin};
      transform-origin: bottom center;
    }
    &[data-popper-placement^='top'] [data-popper-arrow] {
      bottom: ${arrowPos};
      &::before {
        box-shadow: 2px 2px 2px 0 ${arrowShadowColor};
      }
    }
    &[data-popper-placement^='bottom'] {
      margin-top: ${popoverMargin};
      transform-origin: top center;
    }
    &[data-popper-placement^='bottom'] [data-popper-arrow] {
      top: ${arrowPos};
      &::before {
        box-shadow: -1px -1px 1px 0 ${arrowShadowColor};
      }
    }
    &[data-popper-placement^='right'] {
      margin-left: ${popoverMargin};
      transform-origin: left center;
    }
    &[data-popper-placement^='right'] [data-popper-arrow] {
      left: ${arrowPos};
      &::before {
        box-shadow: -1px 1px 1px 0 ${arrowShadowColor};
      }
    }
    &[data-popper-placement^='left'] {
      margin-right: ${popoverMargin};
      transform-origin: right center;
    }
    &[data-popper-placement^='left'] [data-popper-arrow] {
      right: ${arrowPos};
      &::before {
        box-shadow: 1px -1px 1px 0 ${arrowShadowColor};
      }
    }
  `;
};

export default getPopperArrowStyle;
