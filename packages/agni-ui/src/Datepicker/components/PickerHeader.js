import React, { useCallback, memo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDebounceCallback } from '../../_hooks/useDebounceCallback';
import { PseudoBox } from '../../PseudoBox';
import { InputText } from '../../InputText';
import { useDatepickerContext } from '../DatepickerContext';
import { months, years } from '../constants';

const PickerHeaderButton = ({ className, children, onClick, title }) => {
  return (
    <PseudoBox
      as="button"
      className={className}
      d="inline-flex"
      type="button"
      px={0}
      py={0}
      w="28px"
      h="28px"
      fontSize="16px"
      fontWeight="bold"
      lineHeight="1"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      outline="none"
      rounded="md"
      onClick={onClick}
      title={title}
      _hover={{
        bg: 'gray.200'
      }}
      _focus={{
        bg: 'gray.300'
      }}
    >
      {children}
    </PseudoBox>
  );
};

PickerHeaderButton.displayName = 'PickerHeaderButton';

/////////////////////////////////////////////////////////////

const PickerHeaderSelect = ({ children, className, onChange, value }) => {
  return (
    <InputText as="select" size="sm" className={className} value={value} onChange={onChange}>
      {children}
    </InputText>
  );
};

PickerHeaderSelect.displayName = 'PickerHeaderSelect';

/////////////////////////////////////////////////////////////

const unitMaps = {
  date: {
    unit: 'month',
    multiplier: 1
  },
  year: {
    unit: 'year',
    multiplier: 10
  },
  month: {
    unit: 'year',
    multiplier: 1
  },
  week: {
    unit: 'month',
    multiplier: 1
  }
};

const PickerHeader = memo(() => {
  const { focusValue, setFocusValue, ref, mode } = useDatepickerContext();

  const focusInput = useCallback(() => {
    if (ref) {
      ref.current.focus();
    }
  }, [ref]);

  const [debounceFocus] = useDebounceCallback({
    callback: focusInput,
    delay: 50
  });

  const handleChangeSelect = useCallback(
    (ev, focusDate) => {
      ev.persist();

      setFocusValue(oldFocus => oldFocus.set(focusDate, parseInt(ev.target.value, 10)));
      debounceFocus();
    },
    [debounceFocus, setFocusValue]
  );

  const handleRange = useCallback(
    (ev, num) => {
      ev.persist();

      const { unit, multiplier } = unitMaps[mode];

      if (num > 0) {
        setFocusValue(oldFocus => oldFocus.add(num * multiplier, unit));
      } else if (num < 0) {
        setFocusValue(oldFocus => oldFocus.subtract(Math.abs(num) * multiplier, unit));
      }
      focusInput();
    },
    [focusInput, setFocusValue, mode]
  );

  const selectMonths = (
    <PickerHeaderSelect
      className="datepicker__header-month"
      value={focusValue.get('month')}
      onChange={ev => handleChangeSelect(ev, 'month')}
    >
      {months.map(({ label, value }) => (
        <option key={`cal-m-${value}`} value={value}>
          {label}
        </option>
      ))}
    </PickerHeaderSelect>
  );

  const selectYears = (
    <PickerHeaderSelect
      className="datepicker__header-year"
      value={focusValue.get('year')}
      onChange={ev => handleChangeSelect(ev, 'year')}
    >
      {years.map(year => (
        <option key={`cal-y-${year}`} value={year}>
          {year}
        </option>
      ))}
    </PickerHeaderSelect>
  );

  return (
    <PseudoBox
      className="datepicker__header"
      d="flex"
      alignItems="center"
      pt={1}
      pb={2}
      px={2}
      borderBottomWidth="1px"
      // borderColor="gray.300"
    >
      <PickerHeaderButton
        className="datepicker__header-prev"
        onClick={ev => handleRange(ev, -1)}
        title="Click to see previous month"
      >
        <FiChevronLeft />
      </PickerHeaderButton>
      <PseudoBox
        d="flex"
        flexDir="row"
        flexWrap="wrap"
        flexGrow={1}
        flexShrink={1}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        {(mode === 'date' || mode === 'week') && (
          <React.Fragment>
            <PseudoBox px="1px">{selectMonths}</PseudoBox>
            <PseudoBox px="1px">{selectYears}</PseudoBox>
          </React.Fragment>
        )}
        {mode === 'month' && <PseudoBox px="1px">{selectYears}</PseudoBox>}
        {mode === 'year' && (
          <React.Fragment>
            {focusValue.get('year') - (focusValue.get('year') % 10)}
            {' - '}
            {focusValue.get('year') - (focusValue.get('year') % 10) + 9}
          </React.Fragment>
        )}
      </PseudoBox>
      <PickerHeaderButton
        className="datepicker__header-next"
        onClick={ev => handleRange(ev, 1)}
        title="Click to see next month"
      >
        <FiChevronRight />
      </PickerHeaderButton>
    </PseudoBox>
  );
});

PickerHeader.displayName = 'PickerHeader';

export { PickerHeader, PickerHeaderButton };
