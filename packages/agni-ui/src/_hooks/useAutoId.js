import { useState, useEffect } from 'react';
import { useEnhancedEffect } from './useEnhancedEffect';

let serverHandoffComplete = false;
let autoIdCounter = 0;
// eslint-disable-next-line no-plusplus
const increaseId = () => ++autoIdCounter;

/**
 * Hooks for generating autoId
 *
 * For full explanation head to `reach-ui/auto-id` repository
 * Original source: https://github.com/reach/reach-ui/blob/master/packages/auto-id/src/index.ts
 */
export const useAutoId = fallback => {
  const initialId = fallback || (serverHandoffComplete ? increaseId() : null);

  const [id, setId] = useState(initialId);

  useEnhancedEffect(() => {
    if (id === null) {
      setId(increaseId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};
