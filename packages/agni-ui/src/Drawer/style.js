const drawerAnimationVariant = {
  hide: placement => {
    switch (placement) {
      case 'top':
        return { y: '-100%' };
      case 'bottom':
        return { y: '100%' };
      case 'right':
        return { x: '100%' };
      case 'left':
        return { x: '-100%' };
      default:
        return {};
    }
  },
  show: placement => {
    switch (placement) {
      case 'top':
      case 'bottom':
        return { y: 0 };
      case 'right':
      case 'left':
        return { x: 0 };
      default:
        return {};
    }
  }
};

const drawerStyle = (placement, size) => {
  switch (placement) {
    case 'bottom':
      return {
        top: 'unset',
        left: 0,
        right: 'unset',
        bottom: 0,
        width: '100%',
        height: size
      };
    case 'top':
      return {
        top: 0,
        left: 0,
        right: 'unset',
        bottom: 'unset',
        width: '100%',
        height: size
      };
    case 'right':
      return {
        top: 0,
        left: 'unset',
        right: 0,
        bottom: 'unset',
        width: size,
        height: '100%'
      };
    case 'left':
      return {
        top: 0,
        left: 0,
        right: 'unset',
        bottom: 'unset',
        width: size,
        height: '100%'
      };
    default:
      return {
        top: 0,
        left: 0,
        right: 'unset',
        bottom: 'unset',
        width: size,
        height: '100%'
      };
  }
};
export { drawerStyle, drawerAnimationVariant };
