import React from 'react';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { useDatepickerContext } from '../DatepickerContext';

export const PickerFooter = () => {
  const { onChange, parser } = useDatepickerContext();
  return (
    <Box>
      <Button
        mt={2}
        isFullWidth
        variant="ghost"
        variantColor="primary"
        onClick={() => onChange(parser())}
      >
        Today
      </Button>
    </Box>
  );
};
