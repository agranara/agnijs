import { useState, useLayoutEffect, useEffect } from 'react';

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
  /*
   * If this instance isn't part of the initial render, we don't have to do the
   * double render/patch-up dance. We can just generate the ID and return it.
   */
  const initialId = fallback || (serverHandoffComplete ? increaseId() : null);

  const [id, setId] = useState(initialId);

  useLayoutEffect(() => {
    if (id === null) {
      /*
       * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
       * rendering flicker, though it'll make the first render slower (unlikely
       * to matter, but you're welcome to measure your app and let us know if
       * it's a problem).
       */
      setId(increaseId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};
