const path = require('path');
module.exports = {
  stories: ['../src/stories/**/*.stories.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
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
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components/*": path.resolve(
        __dirname,
        "../src/components/*",
      ),
      "@components": path.resolve(
        __dirname,
        "../src/components",
      ),
      "@page/*": path.resolve(
        __dirname,
        "../src/page/*",
      ),
      "@page": path.resolve(
        __dirname,
        "../src/page",
      ),
      "@public/*": path.resolve(
        __dirname,
        "../public/*",
      ),
      "@public": path.resolve(
        __dirname,
        "../public",
      ),
      "@styles/*": path.resolve(__dirname, "../src/styles/*"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@components/icons/*": path.resolve(__dirname, "../src/components/icons/*"),
      "@components/icons": path.resolve(__dirname, "../src/components/icons"),
      "@services/*": path.resolve(__dirname, "../src/services/*"),
      "@services": path.resolve(__dirname, "../src/services"),
      "@recoil/*": path.resolve(__dirname, "../src/recoil/*"),
      "@recoil": path.resolve(__dirname, "../src/recoil"),
      "@library/icons": path.resolve(__dirname, "../src/library/icons"),


    }
    config.resolve.extensions.push(".ts", ".tsx")
    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    config.resolve.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ];

    return config;
  },


};
