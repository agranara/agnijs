/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { useUiTheme } from '../UiProvider';

const pathTriangle = keyframes`
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
`;

const dotTriangle = keyframes`
  33% {
    transform: translate(0, 0);
  }
  66% {
    transform: translate(10px, -18px);
  }
  100% {
    transform: translate(-10px, -18px);
  }
`;

const pathRect = keyframes`
  25% {
    stroke-dashoffset: 64;
  }
  50% {
    stroke-dashoffset: 128;
  }
  75% {
    stroke-dashoffset: 192;
  }
  100% {
    stroke-dashoffset: 256;
  }
`;

const dotRect = keyframes`
  25% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(18px, -18px);
  }
  75% {
    transform: translate(0, -36px);
  }
  100% {
    transform: translate(-18px, -18px);
  }
`;

const pathCircle = keyframes`
  25% {
    stroke-dashoffset: 125;
  }
  50% {
    stroke-dashoffset: 175;
  }
  75% {
    stroke-dashoffset: 225;
  }
  100% {
    stroke-dashoffset: 275;
  }
`;

const useLoaderCss = () => {
  const theme = useUiTheme();

  const path = theme.colors.gray[600];
  const dot = theme.colors.teal[500];
  const duration = '3s';

  return css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    z-index: 1200;

    & .loader {
      width: 44px;
      height: 44px;
      position: relative;
      display: inline-block;
      margin: 0 16px;
    }
    & .loader:before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: absolute;
      display: block;
      background: ${dot};
      top: 37px;
      left: 19px;
      transform: translate(-18px, -18px);
      animation: ${dotRect} ${duration} cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    & .loader svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    & .loader svg rect,
    & .loader svg polygon,
    & .loader svg circle {
      fill: none;
      stroke: ${path};
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    & .loader svg polygon {
      stroke-dasharray: 145 76 145 76;
      stroke-dashoffset: 0;
      animation: ${pathTriangle} ${duration} cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    & .loader svg rect {
      stroke-dasharray: 192 64 192 64;
      stroke-dashoffset: 0;
      animation: ${pathRect} 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    & .loader svg circle {
      stroke-dasharray: 150 50 150 50;
      stroke-dashoffset: 75;
      animation: ${pathCircle} ${duration} cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    & .loader.triangle {
      width: 48px;
    }
    & .loader.triangle:before {
      left: 21px;
      transform: translate(-10px, -18px);
      animation: ${dotTriangle} ${duration} cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  `;
};

const LoadingPage = () => {
  const loaderCss = useLoaderCss();

  return (
    <div className="loader-container" css={loaderCss}>
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32" />
        </svg>
      </div>

      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72" />
        </svg>
      </div>

      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64" />
        </svg>
      </div>
    </div>
  );
};

export { LoadingPage };
