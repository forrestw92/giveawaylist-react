module.exports = {
  plugins: [
    require("postcss-easy-import")({ prefix: "_" }), // keep this first
    require("postcss-cssnext")({
      features: {
        autoprefixer: true,
        customProperties: {
          variables: {
            colorPrimary: "#51a9f2"
          }
        }
      }
    })
  ]
};
