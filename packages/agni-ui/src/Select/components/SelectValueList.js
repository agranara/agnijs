import React, { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PseudoBox } from '../../PseudoBox';
import { getKeyedOption } from '../util';
import { useSelectMetaContext } from '../SelectMetaContext';
import { useSelectContext } from '../SelectContext';
import { SelectValueItem } from './SelectValueItem';

const SelectValueList = memo(({ children }) => {
  const { keyedOptions, valueKey, labelKey, uid } = useSelectMetaContext();
  const { value } = useSelectContext();

  return (
    <PseudoBox as="ul" listStyleType="none" className="select__value-list" maxW="100%">
      {Array.isArray(value) ? (
        <AnimatePresence>
          {value.map(val => (
            <SelectValueItem
              key={`${uid}-val-${keyedOptions[getKeyedOption(val)][valueKey].toString()}`}
              value={val}
              hasExit
            >
              {keyedOptions[getKeyedOption(val)][labelKey]}
            </SelectValueItem>
          ))}
        </AnimatePresence>
      ) : typeof value !== 'undefined' ? (
        <SelectValueItem
          key={`${uid}-val-${keyedOptions[getKeyedOption(value)][valueKey].toString()}`}
          value={value}
        >
          {keyedOptions[getKeyedOption(value)][labelKey]}
        </SelectValueItem>
      ) : null}
      {children}
    </PseudoBox>
  );
});

SelectValueList.displayName = 'SelectValueList';

export { SelectValueList };
