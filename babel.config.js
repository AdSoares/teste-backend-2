module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true } ],
    [
      'module-resolver',
      {
        alias: {
          '@domain': './src/domain',
          '@application': './src/application',
          '@infra': './src/infra',
          '@config': './src/config',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
  ],
};
