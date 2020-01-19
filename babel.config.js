const { BABEL_ENV } = process.env;
const isBuilding = BABEL_ENV !== undefined && BABEL_ENV !== 'cjs';

const presets = [
  [
    '@babel/preset-env',
    {
      loose: true,
      modules: isBuilding ? false : 'commonjs'
    }
  ],
  '@babel/preset-react'
];

const plugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-runtime',
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap'
    }
  ]
];

module.exports = {
  presets,
  plugins
};
