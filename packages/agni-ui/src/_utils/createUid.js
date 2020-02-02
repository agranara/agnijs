export function createUid(...names) {
  return names.filter(i => i && i !== null).join('_');
}
