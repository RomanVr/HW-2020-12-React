import path from "path";

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/bin/executeRPN.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "out"),
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
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
};
