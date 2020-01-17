const styleProps = ({ size }) => ({
  borderLeft: '1px',
  _first: {
    roundedTopRight: size === 'sm' ? 1 : 3
  },
  _last: {
    roundedBottomRight: size === 'sm' ? 1 : 3,
    mt: '-1px',
    borderTopWidth: 1
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed'
  },
  borderColor: 'inherit',
  _active: {
    bg: 'gray.200'
  }
});

export default styleProps;
