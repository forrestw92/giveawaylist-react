const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  cssModules: true,
  plugins: [require("autoprefixer")({})]
});
