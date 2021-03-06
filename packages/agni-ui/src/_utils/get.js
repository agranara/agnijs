const get = (source, property, defaultValue) => {
  const properties = typeof property === 'string' ? property.split('.') : [...property];

  let result = source; // eslint-disable-line init-declarations
  while (properties.length) {
    const current = properties.shift();
    if (result && typeof result === 'object' && current in result) {
      result = result[current];
    } else {
      return defaultValue;
    }
  }
  return result;
};

export { get };
