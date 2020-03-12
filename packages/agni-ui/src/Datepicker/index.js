import React, { forwardRef } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { Positioner } from '../Positioner';
import { InputText } from '../InputText';
import { InputGroup } from '../InputGroup';
import { InputInside } from '../InputInside';
import { Button } from '../Button';
import { useForkedRef } from '../_hooks/useForkedRef';
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
    const ctx = useDatePicker({
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
              className="datepicker__input-text"
              placeholder={placeholder}
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
          <Positioner
            isOpen={ctx.isOpen}
            triggerRef={ctx.ref}
            innerRef={ctx.dropdownRef}
            placement="bottom-start"
            p={1}
            textAlign="center"
          >
            <PickerHeader />
            <PickerBody />
            <PickerFooter />
          </Positioner>
        </React.Fragment>
      </DatepickerContext.Provider>
    );
  }
);

Datepicker.displayName = 'Datepicker';

export { Datepicker };
