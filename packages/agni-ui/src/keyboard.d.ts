type KeyboardNameType =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Escape'
  | 'Backspace'
  | 'Space'
  | 'Delete';

export function isKeyboardKey(event: Event, name: KeyboardNameType & string): boolean;
