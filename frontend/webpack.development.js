const Common = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(Common, {
  mode: "development",
  output: {
    filename: "main.js",
  }
})