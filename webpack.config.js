var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname);
var OUTPUT = path.resolve(__dirname) + "/public";

var config = {
  entry: DEV + "/frontend.js",
  output: {
    path: OUTPUT,
    filename: "scripts.min.js"
  },
  module: {
    loaders: [{
        include: DEV,
        loader: "babel-loader",
    }]
  }
};

module.exports = config;
