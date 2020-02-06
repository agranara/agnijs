import React from 'react';
import { Box } from '../Box';

const AvatarBadge = props => {
  const borderColor = 'white';

  return (
    <Box
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transform="translate(25%, 25%)"
      bottom="0"
      right="0"
      border="0.2em solid"
      borderColor={borderColor}
      rounded="full"
      {...props}
    />
  );
};

AvatarBadge.displayName = 'AvatarBadge';

export { AvatarBadge };
