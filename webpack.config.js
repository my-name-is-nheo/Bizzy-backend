var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");
module.exports = {
  entry: `${SRC_DIR}/Footer.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        // include: SRC_DIR,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react"],
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  //,{   exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ejs$/]}
};
