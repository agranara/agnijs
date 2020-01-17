import { get } from '../theme/color-utils';

const baseProps = {
  userSelect: 'none',
  border: '2px',
  rounded: 'md',
  borderColor: 'inherit',
  transition: 'background-color 120ms, box-shadow 250ms'
};

const interactionProps = ({ color }) => {
  const _color = 500;
  return {
    color: 'white',
    _checked: {
      bg: get(color, _color),
      borderColor: get(color, _color),
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
    sm: props.type === 'radio' ? 3 : 'auto'
  };

  return {
    ...baseProps,
    ...(props.size && { rounded: 'sm' }),
    ...interactionProps(props),
    size: sizes[props.size]
  };
};

export default useCheckboxStyle;
