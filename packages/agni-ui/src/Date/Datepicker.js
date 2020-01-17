import React, { forwardRef } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { InputText, InputGroup, InputInside } from '../Input';
import { Button } from '../Button';
import { useDatePicker } from './useDatePicker';
import { DatepickerContext } from './DatepickerContext';
import { Picker } from './components/Picker';
import { PickerHeader } from './components/PickerHeader';
import { PickerFooter } from './components/PickerFooter';
import { mergeRefs } from '../utils';

export const Datepicker = forwardRef(
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
      closeOnSelect
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

    return (
      <DatepickerContext.Provider value={{ ...ctx }}>
        <React.Fragment>
          <InputGroup>
            <InputText
              ref={mergeRefs(ref, ctx.ref)}
              id={id}
              name={name}
              placeholder={placeholder}
              onFocus={ctx.open}
              onClick={ctx.open}
              {...ctx.input}
              isReadOnly
              _readOnly={{
                bg: 'transparent',
                userSelect: 'all',
                boxShadow: `0 0 0 1px primary.500`
              }}
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
          <Dropdown>
            <PickerHeader />
            <Picker />
            <PickerFooter />
          </Dropdown>
        </React.Fragment>
      </DatepickerContext.Provider>
    );
  }
);
