import React, { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import { avatarSizes } from '../Avatar/styles';
import { useUiTheme } from '../UiProvider';

const MoreAvatarLabel = ({ size, label, ...props }) => {
  const borderColor = '#fff';
  const bg = 'gray.200';

  const theme = useUiTheme();
  const sizeKey = avatarSizes[size];
  const _size = theme.sizes[sizeKey];
  const fontSize = `calc(${_size} / 2.75)`;

  return (
    <Box
      className="avatar__more"
      d="flex"
      bg={bg}
      color="inherit"
      rounded="full"
      alignItems="center"
      justifyContent="center"
      border="2px"
      borderColor={borderColor}
      size={avatarSizes[size]}
      fontSize={fontSize}
      {...props}
    >
      {label}
    </Box>
  );
};

const AvatarGroup = ({ size, children, borderColor, max, spacing = -3, ...rest }) => {
  let count = Children.count(children);

  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return;

    if (max && index > max) {
      return null;
    }

    if (max == null || (max && index < max)) {
      let isFirstAvatar = index === 0;
      return cloneElement(child, {
        ml: isFirstAvatar ? 0 : spacing,
        size,
        borderColor: borderColor || child.props.borderColor,
        showBorder: true,
        zIndex: count - index
      });
    }

    if (max && index === max) {
      return <MoreAvatarLabel size={size} ml={spacing} label={`+${count - max}`} />;
    }
  });

  return (
    <Box className="avatar__group" d="flex" alignItems="center" {...rest}>
      {clones}
    </Box>
  );
};

AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
