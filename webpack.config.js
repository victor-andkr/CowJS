const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: false,
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
          parse: false,
          output: false,
          format: {
            beautify: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        type: "json",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  devtool: "source-map",
};
