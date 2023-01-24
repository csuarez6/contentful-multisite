const path = require('path');

module.exports = {
  stories: [
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)'
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
    'storybook-addon-mock',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  webpackFinal: (config) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      // '@': [path.resolve(__dirname, '../')],
      '@/components': [path.resolve(__dirname, '../src/components')],
      '@/lib': [path.resolve(__dirname, '../src/lib')],
      '@/styles': [path.resolve(__dirname, '../styles')],
      '@/pages': [path.resolve(__dirname, '../pages')],
      '@/constants': [path.resolve(__dirname, '../src/constants')],
      "@/utils": [path.resolve(__dirname, '../src/utils')],
      "@/context": [path.resolve(__dirname, '../src/context')],
      "@/hooks": [path.resolve(__dirname, '../src/hooks')]
    };

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    config.resolve.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ];

    return config;
  }
};
