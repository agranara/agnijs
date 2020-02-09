import React, { useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDatepickerContext } from '../DatepickerContext';
import { months, years } from '../constants';
import { PseudoBox } from '../../PseudoBox';
import { useDebounceCallback } from '../../_hooks/useDebounceCallback';

const PickerHeaderButton = ({ className, children, onClick, title }) => {
  return (
    <PseudoBox
      as="button"
      className={className}
      d="inline-flex"
      type="button"
      px={0}
      py={0}
      w="30px"
      h="30px"
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
    <PseudoBox
      as="select"
      w="full"
      height="30px"
      fontSize="md"
      lineHeight="1"
      verticalAlign="middle"
      className={className}
      value={value}
      onChange={onChange}
    >
      {children}
    </PseudoBox>
  );
};

PickerHeaderSelect.displayName = 'PickerHeaderSelect';

/////////////////////////////////////////////////////////////

const PickerHeader = () => {
  const { focusValue, setFocusValue, ref } = useDatepickerContext();

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

  const handleMonth = useCallback(
    (ev, num) => {
      ev.persist();

      if (num > 0) {
        setFocusValue(oldFocus => oldFocus.add(num, 'month'));
      } else if (num < 0) {
        setFocusValue(oldFocus => oldFocus.subtract(Math.abs(num), 'month'));
      }
      focusInput();
    },
    [focusInput, setFocusValue]
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
      pb={1}
      borderBottom="1px"
      borderColor="gray.300"
    >
      <PickerHeaderButton
        className="datepicker__header-prev"
        onClick={ev => handleMonth(ev, -1)}
        title="Click to see previous month"
      >
        <FiChevronLeft />
      </PickerHeaderButton>
      <PseudoBox px={1}>{selectMonths}</PseudoBox>
      <PseudoBox px={1}>{selectYears}</PseudoBox>
      <PickerHeaderButton
        className="datepicker__header-next"
        onClick={ev => handleMonth(ev, 1)}
        title="Click to see next month"
      >
        <FiChevronRight />
      </PickerHeaderButton>
    </PseudoBox>
  );
};

PickerHeader.displayName = 'PickerHeader';

export { PickerHeader, PickerHeaderButton };
