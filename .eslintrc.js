module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  globals: {
    __DEV__: 'readonly'
  },
  rules: {
    'no-unused-vars': [
      1,
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^(event|_)$'
      }
    ],
    'jsx-a11y/no-static-element-interactions': [
      1,
      {
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp']
      }
    ],
    'import/first': 0,
    'import/no-unresolved': 2,
    'import/no-duplicates': 2,
    'import/order': 2
  }
};
