const { browsers } = require('./target');

module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      loose: true,
      useBuiltIns: 'usage',
      targets: {
        browsers
      }
    }]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  env: {
    production: {
      plugins: [
        ['transform-react-remove-prop-types', { removeImport: true }]
      ]
    }
  }
};
