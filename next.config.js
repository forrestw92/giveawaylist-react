const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withOffline = require("next-offline");

module.exports = withOffline({
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /amazon/,
        handler: "networkOnly"
      },
      {
        urlPattern: /api/,
        handler: "networkOnly"
      },
      {
        urlPattern: /.svg/,
        handler: "cacheFirst"
      }
    ]
  },
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: "scoped"
          }
        }
      ]
    });
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
});
