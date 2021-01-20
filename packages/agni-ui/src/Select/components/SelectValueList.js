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
      const keyVal = getKeyedOption(val);
      if (val.includes('.') && keyedOptions && keyedOptions[keyVal]) {
        return get(keyedOptions[keyVal], valueKey, '');
      }
      return get(keyedOptions, `${getKeyedOption(val)}.${valueKey}`, '');
    },
    [keyedOptions, valueKey]
  );

  const getStringLabel = useCallback(
    val => {
      const keyVal = getKeyedOption(val);
      if (val.includes('.') && keyedOptions && keyedOptions[keyVal]) {
        return get(keyedOptions[keyVal], labelKey, '');
      }
      return get(keyedOptions, `${keyVal}.${labelKey}`, '');
    },
    [keyedOptions, labelKey]
  );

  return (
    <PseudoBox as="ul" listStyleType="none" className="select__value-list" maxW="100%">
      {Array.isArray(value) ? (
        <React.Fragment>
          <AnimatePresence>
            {value.slice(0, 5).map(val => (
              <SelectValueItem key={`${uid}-val-${getStringValue(val)}`} value={val} hasExit>
                {getStringLabel(val)}
              </SelectValueItem>
            ))}
          </AnimatePresence>
          {value.length > 5 && (
            <SelectValueItem hideClear>{value.length - 5} More ...</SelectValueItem>
          )}
        </React.Fragment>
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
