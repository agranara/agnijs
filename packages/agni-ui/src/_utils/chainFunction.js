/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * Original source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/createChainedFunction.js
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function chainFunction(...fns) {
  return fns.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {}
  );
}

export { chainFunction };
