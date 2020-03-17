import React, { useEffect } from 'react';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { theme as defaultTheme } from '../../theme';
import { toastTheme } from '../../Toast/toastTheme';

const preflightCss = css`
  /* normalize */
  html {
    line-height: 1.15;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
    text-rendering: optimizelegibility;
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
    color: inherit;
    text-decoration: inherit;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  /* Preflight tailwind */
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }
  button {
    background: transparent;
    padding: 0;
  }
  fieldset {
    margin: 0;
    padding: 0;
  }
  ol,
  ul {
    margin: 0;
    padding: 0;
  }
  hr {
    border-top-width: 1px;
  }
  img {
    border-style: solid;
  }
  textarea {
    resize: vertical;
  }
  button,
  [role='button'] {
    cursor: pointer;
  }
  button::-moz-focus-inner {
    border: 0 !important;
  }
  table {
    border-collapse: collapse;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* font-size: inherit; */
    font-weight: inherit;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
  }
  img,
  video {
    max-width: 100%;
    height: auto;
  }
`;

const providerCss = (theme = defaultTheme) => {
  const color = theme.colors.gray[800];
  const borderColor = theme.colors.gray[200];
  const placeholderColor = theme.colors.gray[500];

  return css`
    html {
      line-height: 1.5;
      color: ${color};
      font-family: ${theme.fonts.body};
    }

    *,
    *::before,
    *::after {
      border-width: 0;
      border-style: solid;
      border-color: ${borderColor};
    }

    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
      color: ${placeholderColor};
    }
    input::-ms-input-placeholder,
    textarea::-ms-input-placeholder {
      color: ${placeholderColor};
    }
    input::placeholder,
    textarea::placeholder {
      color: ${placeholderColor};
    }

    #root {
      height: 100%;
      width: 100%;
    }

    body {
      font-size: ${theme.fontSizes.md};
    }

    pre,
    code,
    kbd,
    samp {
      font-family: ${theme.fonts.mono};
    }
  `;
};

const UiProvider = ({ theme = defaultTheme, children }) => {
  useEffect(() => {
    toastTheme.setTheme(theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Global
          styles={css([
            // twPreflightCss(theme),
            preflightCss,
            providerCss(theme)
          ])}
        />
        {children}
      </React.Fragment>
    </ThemeProvider>
  );
};

UiProvider.displayName = 'UiProvider';

export { UiProvider };
