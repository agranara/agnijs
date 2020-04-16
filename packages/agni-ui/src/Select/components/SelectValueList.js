import React, { memo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getKeyedOption } from '../util';
import { get } from '../../_utils/get';
import { PseudoBox } from '../../PseudoBox';
import { useSelectMetaContext } from '../SelectMetaContext';
import { useSelectContext } from '../SelectContext';
import { SelectValueItem } from './SelectValueItem';

const SelectValueList = memo(({ children }) => {
  const { keyedOptions, valueKey, labelKey, uid } = useSelectMetaContext();
  const { value } = useSelectContext();

  const getStringValue = useCallback(
    val => {
      return get(keyedOptions, `${getKeyedOption(val)}.${valueKey}`, '');
    },
    [keyedOptions, valueKey]
  );

  const getStringLabel = useCallback(
    val => {
      return get(keyedOptions, `${getKeyedOption(val)}.${labelKey}`, '');
    },
    [keyedOptions, labelKey]
  );

  return (
    <PseudoBox as="ul" listStyleType="none" className="select__value-list" maxW="100%">
      {Array.isArray(value) ? (
        <AnimatePresence>
          {value.map(val => (
            <SelectValueItem key={`${uid}-val-${getStringValue(val)}`} value={val} hasExit>
              {getStringLabel(val)}
            </SelectValueItem>
          ))}
        </AnimatePresence>
      ) : typeof value !== 'undefined' && value !== null ? (
        <SelectValueItem key={`${uid}-val-${getStringValue(value)}`} value={value}>
          {getStringLabel(value)}
        </SelectValueItem>
      ) : null}
      {children}
    </PseudoBox>
  );
});

SelectValueList.displayName = 'SelectValueList';

export { SelectValueList };
