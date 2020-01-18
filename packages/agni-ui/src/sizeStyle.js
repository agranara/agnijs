import defaultTheme from './theme';

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

const sizeStyle = (size = 'sm', sizes = defaultTheme.sizes) => {
  const conf = sizeConfig[size];
  return `
    height: ${sizes[conf.height]};
    min-width: ${sizes[conf.minWidth]};
    font-size: ${sizes[conf.fontSize]};
    padding-left: ${sizes[conf.px]};
    padding-right: ${sizes[conf.px]};
  `;
};

export { sizeConfig, sizeStyle };
export default sizeStyle;
