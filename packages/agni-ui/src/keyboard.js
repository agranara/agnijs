/**
 * Check keyboard key
 *
 * based on https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
export const isKeyboardKey = (eventKey, name) => {
  if (name === 'ArrowUp') {
    return eventKey === 'ArrowUp' || eventKey === 'Up'; // IE /Edge;
  }
  if (name === 'ArrowDown') {
    return eventKey === 'ArrowDown' || eventKey === 'Down';
  }
  if (name === 'ArrowLeft') {
    return eventKey === 'ArrowLeft' || eventKey === 'Left';
  }
  if (name === 'ArrowRight') {
    return eventKey === 'ArrowRight' || eventKey === 'Right';
  }
  if (name === 'Enter') {
    return eventKey === 'Enter';
  }
  if (name === 'Escape') {
    return eventKey === 'Escape' || eventKey === 'Esc'; // IE/Edge;
  }
  if (name === 'Backspace') {
    return eventKey === 'Backspace';
  }

  return eventKey === name;
};
