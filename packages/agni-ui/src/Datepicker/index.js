import React, { forwardRef } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { Positioner } from '../Positioner';
import { InputText } from '../InputText';
import { InputGroup } from '../InputGroup';
import { InputInside } from '../InputInside';
import { Button } from '../Button';
import { PseudoBox } from '../PseudoBox';
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
      locale = 'id',
      isReadOnly,
      isDisabled,
      isClearable = true,
      initialOpenPicker = false,
      size,

      visualFormat,
      closeOnClear = false,
      closeOnSelect = true,
      mode = 'date',
      customParser,
      dateRender,
      disabledDates,
      highlightedDates,
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
      visualFormat,
      mode,
      customParser
    });

    const forkedRef = useForkedRef(ref, ctx.ref);

    return (
      <DatepickerContext.Provider value={{ ...ctx, dateRender, disabledDates, highlightedDates }}>
        <React.Fragment>
          <InputGroup className="datepicker" size={size}>
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
                <React.Fragment>
                  {isClearable && (
                    <Button size="xs" variantColor="danger" p={1} onClick={ctx.handleClear}>
                      <FiX />
                    </Button>
                  )}
                </React.Fragment>
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
          >
            <PseudoBox w="full" textAlign="center" minW="200px">
              <PickerHeader />
              <PickerBody />
              <PickerFooter />
            </PseudoBox>
          </Positioner>
        </React.Fragment>
      </DatepickerContext.Provider>
    );
  }
);

Datepicker.displayName = 'Datepicker';

export { Datepicker };
