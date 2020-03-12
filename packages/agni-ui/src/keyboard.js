/**
 * Check keyboard key
 *
 * based on https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
export function isKeyboardKey(event, name) {
  if (!event.key) return;

  if (name === 'ArrowUp') {
    return event.key === 'ArrowUp' || event.key === 'Up'; // IE /Edge;
  }
  if (name === 'ArrowDown') {
    return event.key === 'ArrowDown' || event.key === 'Down';
  }
  if (name === 'ArrowLeft') {
    return event.key === 'ArrowLeft' || event.key === 'Left';
  }
  if (name === 'ArrowRight') {
    return event.key === 'ArrowRight' || event.key === 'Right';
  }
  if (name === 'Enter') {
    return event.key === 'Enter';
  }
  if (name === 'Escape') {
    return event.key === 'Escape' || event.key === 'Esc'; // IE/Edge;
  }
  if (name === 'Backspace') {
    return event.key === 'Backspace';
  }
  if (name === 'Space') {
    return event.key === 'Spacebar' || event.key === ' ';
  }

  return event.key === name;
}
