import { useUiTheme } from '../UiProvider';

const grayGhostStyle = {
  color: 'inherit',
  _hover: {
    bg: 'gray.100'
  },
  _active: {
    bg: 'gray.200'
  }
};

const ghostVariantProps = ({ color }) => {
  let result;
  if (color === 'gray') {
    result = grayGhostStyle;
  } else {
    result = {
      color: `${color}.500`,
      bg: 'transparent',
      _hover: {
        bg: `${color}.50`
      },
      _active: {
        bg: `${color}.500`,
        color: 'white'
      }
    };
  }

  return result;
};

////////////////////////////////////////////////////////////

const outlineVariantProps = props => {
  const { color } = props;
  const borderColor = 'gray.200';

  return {
    border: '1px',
    borderColor: color === 'gray' ? borderColor : 'current',
    ...ghostVariantProps(props)
  };
};

////////////////////////////////////////////////////////////

const graySolidStyle = {
  bg: 'gray.100',
  _hover: {
    bg: 'gray.200'
  },
  _active: {
    bg: 'gray.300'
  }
};

const solidVariantProps = ({ color }) => {
  let style = {
    bg: `${color}.500`,
    color: 'white',
    _hover: {
      bg: `${color}.600`
    },
    _active: {
      bg: `${color}.700`
    }
  };

  if (color === 'gray') {
    style = graySolidStyle;
  }

  return style;
};

////////////////////////////////////////////////////////////

const linkVariantProps = ({ color }) => {
  const _color = `${color}.500`;
  const _activeColor = `${color}.700`;
  return {
    p: 0,
    height: 'auto',
    lineHeight: 'normal',
    color: _color,
    _hover: {
      textDecoration: 'underline'
    },
    _active: {
      color: _activeColor
    }
  };
};

////////////////////////////////////////////////////////////

const disabledProps = {
  _disabled: {
    opacity: '40%',
    cursor: 'not-allowed',
    boxShadow: 'none'
  }
};

////////////////////////////////////////////////////////////

export const sizes = {
  lg: {
    height: 11,
    minWidth: 11,
    fontSize: 'lg',
    px: 5
  },
  md: {
    height: 8,
    minWidth: 8,
    fontSize: 'md',
    px: 4
  },
  sm: {
    height: 7,
    minWidth: 7,
    fontSize: 'sm',
    lineHeight: 'sm',
    px: 3
  },
  xs: {
    height: 5,
    minWidth: 5,
    fontSize: 'xs',
    px: 2
  }
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const focusProps = {
  _focus: {
    boxShadow: 'outline'
  }
};

////////////////////////////////////////////////////////////

const unstyledStyle = {
  userSelect: 'inherit',
  bg: 'unset',
  border: 0,
  color: 'inherit',
  display: 'inline-flex',
  font: 'inherit',
  lineHeight: 'inherit',
  m: 0,
  p: 0,
  textAlign: 'inherit'
};

////////////////////////////////////////////////////////////

const variantProps = props => {
  switch (props.variant) {
    case 'solid':
      return solidVariantProps(props);
    case 'ghost':
      return ghostVariantProps(props);
    case 'link':
      return linkVariantProps(props);
    case 'outline':
      return outlineVariantProps(props);
    case 'unstyled':
      return unstyledStyle;
    default:
      return {};
  }
};

////////////////////////////////////////////////////////////

const baseProps = {
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 250ms',
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  lineHeight: '1',
  outline: 'none'
};

////////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const theme = useUiTheme();

  const _props = { ...props, theme };
  return {
    ...baseProps,
    ...sizeProps(_props),
    ...(_props.variant !== 'unstyled' && focusProps),
    ...disabledProps,
    ...variantProps(_props)
  };
};

export default useButtonStyle;
