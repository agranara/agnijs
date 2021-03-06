import { get } from 'styled-system';

export const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transition: 'all 0.2s',
  outline: 'none'
};

export const readOnlyStyle = {
  _readOnly: {
    bg: 'transparent',
    boxShadow: 'none',
    userSelect: 'all'
  },
  _readOnlyFocus: {
    borderColor: 'inherit'
  }
};

export const unstyledStyle = {
  bg: 'transparent',
  px: undefined,
  height: undefined
};

export const boxedStyle = ({ theme, focusBorderColor, errorBorderColor }) => {
  const bg = 'white';
  const borderColor = 'inherit';
  const hoverColor = 'gray.300';

  /**
   * styled-system's get takes 3 args
   * - object or array to read from
   * - key to get
   * - fallback value
   */
  const _focusBorderColor = get(
    theme.colors,
    focusBorderColor,
    focusBorderColor // If color doesn't exist in theme, use it's raw value
  );
  const _errorBorderColor = get(theme.colors, errorBorderColor, errorBorderColor);

  return {
    ...readOnlyStyle,
    borderWidth: '1px',
    borderColor,
    bg,
    boxShadow: 'none',
    _hover: {
      borderColor: hoverColor
    },
    _disabled: {
      opacity: '0.4',
      bg: 'gray.200',
      borderColor,
      cursor: 'not-allowed'
    },
    _focus: {
      borderColor: _focusBorderColor,
      boxShadow: `0 0 0 1px ${_focusBorderColor}`
    },
    _invalid: {
      borderColor: _errorBorderColor,
      boxShadow: `0 0 0 1px ${_errorBorderColor}`
    }
  };
};
