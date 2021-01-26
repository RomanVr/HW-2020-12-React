import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const APP_DIR = path.resolve(__dirname, "src");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: ["index.ts"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "out"),
  },
  resolve: {
    modules: [APP_DIR, "node_modules"],
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
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./public/assets/favicon.svg",
    }),
  ],
};
