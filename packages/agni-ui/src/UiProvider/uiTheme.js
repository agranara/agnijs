import { theme as defaultTheme } from '../theme';

class UiTheme {
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

const uiTheme = new UiTheme();

export { uiTheme };
