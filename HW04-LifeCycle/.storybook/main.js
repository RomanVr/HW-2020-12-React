const WEBPACK = require('webpack');
const CUSTOM = require('../webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
  ],

  webpackFinal: (config) => {
    config.plugins.push(new WEBPACK.HotModuleReplacementPlugin());

    config.module.rules.push({
      test: /\.stories\.tsx$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' },
        },
      ],
      enforce: 'pre',
    });

    return {
      ...config,
      resolve: {
        extensions: CUSTOM.resolve.extensions
      },
      module: {
        ...config.module,
        rules: [...config.module.rules, ...CUSTOM.module.rules],
      },
    };
  },
};
