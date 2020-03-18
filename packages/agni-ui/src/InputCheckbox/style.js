const baseProps = {
  userSelect: 'none',
  border: '2px',
  borderRadius: '3px',
  borderColor: 'inherit',
  transition: 'background-color 120ms, box-shadow 250ms'
};

const interactionProps = ({ color }) => {
  const _color = 500;
  return {
    color: 'white',
    _checked: {
      bg: `${color}.${_color}`,
      borderColor: `${color}.${_color}`,
      color: undefined
    },
    _checkedAndDisabled: {
      borderColor: 'gray.200',
      bg: 'gray.200',
      color: 'gray.500'
    },
    _disabled: {
      bg: 'gray.100',
      borderColor: 'gray.100'
    },
    _focus: {
      boxShadow: 'outline'
    },
    _invalid: {
      borderColor: 'red.500'
    }
  };
};

const useCheckboxStyle = props => {
  const sizes = {
    lg: 5,
    md: 4,
    sm: props.type === 'checkbox' ? 3 : 'auto'
  };

  return {
    ...baseProps,
    ...interactionProps(props),
    size: sizes[props.size]
  };
};

export default useCheckboxStyle;
