export function getKeyedOption(val) {
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }

  if (typeof val === 'number') {
    return val.toString();
  }

  if (typeof val === 'boolean') {
    return val ? 'true' : 'false';
  }
  return val;
}
