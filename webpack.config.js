const path = require("path");
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "out"),
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.worker\.(ts|js)$/,
        use: { loader: "worker-loader" },
      },
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "out"),
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HTML_WEBPACK_PLUGIN({
      template: "./public/index.html",
      favicon: "./public/assets/favicon.jpg",
    }),
  ],
};
