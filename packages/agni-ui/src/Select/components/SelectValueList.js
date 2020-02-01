import React from 'react';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';
import { SelectValueItem } from './SelectValueItem';

const SelectValueList = ({ children }) => {
  const { keyedOptions, valueKey, labelKey, value, uid, inputSize } = useSelectContext();

  return (
    <PseudoBox as="ul" listStyleType="none" className="select__value-list" maxW="100%">
      {Array.isArray(value) ? (
        value.map(val => (
          <SelectValueItem
            key={`${uid}-val-${keyedOptions[val][valueKey].toString()}`}
            inputSize={inputSize}
          >
            {val[labelKey]}
          </SelectValueItem>
        ))
      ) : value ? (
        <SelectValueItem
          key={`${uid}-val-${keyedOptions[value][valueKey].toString()}`}
          inputSize={inputSize}
        >
          {keyedOptions[value][labelKey]}
        </SelectValueItem>
      ) : null}
      {children}
    </PseudoBox>
  );
};

SelectValueList.displayName = 'SelectValueList';

export { SelectValueList };
