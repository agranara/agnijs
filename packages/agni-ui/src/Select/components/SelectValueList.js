import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { PseudoBox } from '../../PseudoBox';
import { useSelectContext } from '../SelectContext';
import { SelectValueItem } from './SelectValueItem';

const SelectValueList = ({ children }) => {
  const { keyedOptions, valueKey, labelKey, value, uid } = useSelectContext();

  return (
    <PseudoBox as="ul" listStyleType="none" className="select__value-list" maxW="100%">
      {Array.isArray(value) ? (
        <AnimatePresence>
          {value.map(val => (
            <SelectValueItem
              key={`${uid}-val-${keyedOptions[val][valueKey].toString()}`}
              value={val}
              hasExit
            >
              {keyedOptions[val][labelKey]}
            </SelectValueItem>
          ))}
        </AnimatePresence>
      ) : value ? (
        <SelectValueItem
          key={`${uid}-val-${keyedOptions[value][valueKey].toString()}`}
          value={value}
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
