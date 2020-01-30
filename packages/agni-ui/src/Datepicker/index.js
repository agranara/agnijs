import React, { forwardRef } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { InputText } from '../InputText';
import { InputGroup } from '../InputGroup';
import { InputInside } from '../InputInside';
import { Button } from '../Button';
import { useForkedRef } from '../utils';
import { useDatePicker } from './useDatePicker';
import { DatepickerContext } from './DatepickerContext';
import { PickerHeader, PickerBody, PickerFooter } from './components';

const Datepicker = forwardRef(
  (
    {
      id,
      name,
      placeholder,
      onChange,
      value,
      valueFormat,
      locale,
      isReadOnly,
      isDisabled,
      initialOpenPicker,
      visualFormat,
      closeOnClear,
      closeOnSelect,
      ...rest
    },
    ref
  ) => {
    const { Dropdown, ...ctx } = useDatePicker({
      value,
      valueFormat,
      onChange,
      isReadOnly,
      isDisabled,
      closeOnClear,
      closeOnSelect,
      locale,
      initialOpenPicker,
      visualFormat
    });

    const forkedRef = useForkedRef(ref, ctx.ref);

    return (
      <DatepickerContext.Provider value={{ ...ctx }}>
        <React.Fragment>
          <InputGroup className="datepicker">
            <InputText
              ref={forkedRef}
              id={id}
              name={name}
              className="datepicker--text"
              placeholder={placeholder}
              onFocus={ctx.open}
              onClick={ctx.open}
              {...ctx.input}
              isReadOnly
              _readOnly={{
                bg: 'transparent',
                userSelect: 'none',
                boxShadow: `0 0 0 1px primary.500`
              }}
              {...rest}
            />
            <InputInside placement="right">
              {ctx.value ? (
                <Button size="xs" variantColor="danger" p={1} onClick={ctx.handleClear}>
                  <FiX />
                </Button>
              ) : (
                <FiCalendar />
              )}
            </InputInside>
          </InputGroup>
          <Dropdown p={2}>
            <PickerHeader />
            <PickerBody />
            <PickerFooter />
          </Dropdown>
        </React.Fragment>
      </DatepickerContext.Provider>
    );
  }
);

Datepicker.displayName = 'Datepicker';

export { Datepicker };
