import { useUiTheme } from '../UiProvider';
import { isDarkColor } from '../theme/color-utils';

// Found this on StackOverflow :)
function string2Hex(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = '#';
  for (let j = 0; j < 3; j++) {
    let value = (hash >> (j * 8)) & 255;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export const avatarSizes = {
  '2xs': 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 'full'
};

const useAvatarStyle = ({ size, name, showBorder, borderColor }) => {
  const { colors } = useUiTheme();

  const bg = name ? string2Hex(name) : colors.gray[400];
  const color = name ? (isDarkColor(bg) ? '#fff' : 'gray.800') : '#fff';
  const _borderColor = '#fff';

  const baseProps = {
    display: 'inline-flex',
    rounded: 'full',
    alignItems: 'center',
    flexShrink: '0',
    justifyContent: 'center',
    position: 'relative'
  };

  return {
    ...baseProps,
    size: avatarSizes[size],
    bg,
    color,
    ...(showBorder && {
      border: '2px',
      borderColor: borderColor || _borderColor
    })
  };
};

export default useAvatarStyle;
