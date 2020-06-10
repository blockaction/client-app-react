const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    'HACK: Removing `minimize` option from `css-loader` entries in Webpack config'
  );
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = withCSS(
  withSass({
    sassLoaderOptions: {},
    webpack(config, options) {
      config.resolve.modules.push(path.resolve('./'));
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      });
      HACK_removeMinimizeOptionFromCssLoaders(config);
      return config;
    },
  })
);