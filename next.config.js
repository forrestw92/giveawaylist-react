const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

module.exports = withOffline(
  withCSS({
    cssModules: true,
    plugins: [require("autoprefixer")({})],
    webpack(config) {
      return config;
    }
  })
);
