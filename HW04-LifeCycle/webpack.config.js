const path = require("path");
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "out"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "out"),
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTML_WEBPACK_PLUGIN({
      template: "./public/index.html",
      favicon: "./public/assets/favicon.jpg",
    }),
  ],
};
