const TerserPlugin = require("terser-webpack-plugin"); // comes bundled with Webpack 4

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })],
  },
};
