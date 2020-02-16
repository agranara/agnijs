const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow ? () => performance.now() : () => Date.now();

export function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(callback, delay) {
  const start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  const timeoutID = {
    id: requestAnimationFrame(tick)
  };

  return timeoutID;
}

export function getArrayDepth(array, key = 'children') {
  return Array.isArray(array)
    ? 1 + Math.max(...array.map(item => getArrayDepth(item[key], key)))
    : 0;
}

export function getFlatColumns(source, key = 'children', parent = null) {
  let result = [];
  for (let j = 0; j < source.length; j++) {
    const col = source[j];
    if (col.children) {
      const resultChildrens = getFlatColumns(col[key], key, j);
      result = [...result, ...resultChildrens];
    } else {
      result.push({
        ...col,
        _parent: parent
      });
    }
  }
  return result;
}

export function getLastFreezeIndex(source, startResult = 0, previousFreeze = false) {
  let result = startResult;

  for (let i = 0; i < source.length; i++) {
    const col = source[i];
    if (col.freezeLeft || previousFreeze) {
      result = startResult + i;

      if (col.children) {
        result = getLastFreezeIndex(col.children, i, true);
      }
    }
  }

  return result;
}
