import React from 'react';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { useDatepickerContext } from '../DatepickerContext';

const PickerFooter = () => {
  const { onChange, parser } = useDatepickerContext();
  return (
    <Box className="datepicker__footer" px={1}>
      <Button isFullWidth size="sm" onClick={() => onChange(parser())}>
        Today
      </Button>
    </Box>
  );
};

PickerFooter.displayName = 'PickerFooter';

export { PickerFooter };
