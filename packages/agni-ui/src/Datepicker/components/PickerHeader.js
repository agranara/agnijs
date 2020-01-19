import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../../Button';
import Box from '../../Box';
import { useDatepickerContext } from '../DatepickerContext';
import { months, years } from '../constants';

const PickerHeaderButton = ({ children, onClick, title }) => {
  return (
    <Button
      size="sm"
      variant="link"
      p={0}
      w="28px"
      h="28px"
      fontWeight="bold"
      variantColor="primary"
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );
};

PickerHeaderButton.displayName = 'PickerHeaderButton';

/////////////////////////////////////////////////////////////

const PickerHeader = () => {
  const { focusValue, setFocusValue } = useDatepickerContext();

  const handleChange = (ev, focusDate) => {
    ev.persist();
    setFocusValue(oldFocus => oldFocus.set(focusDate, ev.target.value));
  };

  const selectMonths = (
    <Box
      as="select"
      flex={1}
      value={focusValue.get('month')}
      onChange={ev => handleChange(ev, 'month')}
    >
      {months.map(({ label, value }) => (
        <option key={`cal-m-${value}`} value={value}>
          {label}
        </option>
      ))}
    </Box>
  );

  const selectYears = (
    <Box as="select" value={focusValue.get('year')} onChange={ev => handleChange(ev, 'year')}>
      {years.map(year => (
        <option key={`cal-y-${year}`} value={year}>
          {year}
        </option>
      ))}
    </Box>
  );

  return (
    <Box d="flex" alignItems="center" mt={0} mb={1}>
      <PickerHeaderButton
        onClick={() => setFocusValue(oldFocus => oldFocus.subtract(1, 'month'))}
        title="Click to see previous month"
      >
        <FiChevronLeft />
      </PickerHeaderButton>
      <Box flex={1} textAlign="center" px={1}>
        <Box d="flex" alignItems="center" flexWrap="nowrap">
          {selectMonths}
          {selectYears}
        </Box>
      </Box>
      <PickerHeaderButton
        onClick={() => setFocusValue(oldFocus => oldFocus.add(1, 'month'))}
        title="Click to see next month"
      >
        <FiChevronRight />
      </PickerHeaderButton>
    </Box>
  );
};

PickerHeader.displayName = 'PickerHeader';

export { PickerHeader, PickerHeaderButton };
