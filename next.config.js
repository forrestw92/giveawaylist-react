const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

module.exports = withOffline(
  withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]"
    },
    plugins: [require("autoprefixer")({})],
    workboxOpts: {
      runtimeCaching: [
        {
          urlPattern: /amazon/,
          handler: "networkOnly"
        },
        {
          urlPattern: /.svg/,
          handler: "cacheFirst"
        }
      ]
    },
    webpack(config) {
      return config;
    }
  })
);
