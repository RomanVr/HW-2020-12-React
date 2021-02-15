import { join } from "path";
import HTML_WEBPACK_PLUGIN from "html-webpack-plugin";

export const mode = "development";
export const devtool = "source-map";
export const entry = "./src/index.tsx";
export const output = {
  filename: "main.js",
  path: join(__dirname, "out"),
};
export const resolve = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
};
export const devServer = {
  contentBase: join(__dirname, "out"),
  compress: true,
  port: 8080,
};
export const module = {
  rules: [
    {
      test: /\.(js|ts)x?$/,
      loader: require.resolve("babel-loader"),
      exclude: /node_modules/,
    },
  ],
};
export const plugins = [
  new HTML_WEBPACK_PLUGIN({
    template: "./public/index.html",
    favicon: "./public/assets/favicon.jpg",
  }),
];
