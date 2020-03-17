import { theme as defaultTheme } from '../theme';

class ToastTheme {
  constructor() {
    this.theme = defaultTheme;
  }

  setTheme(newTheme) {
    this.theme = newTheme;
  }

  getTheme() {
    return this.theme;
  }
}

const toastTheme = new ToastTheme();

export { toastTheme };
