const Common = require("./webpack.config");
const { merge } = require("webpack-merge");

const url = new URL(process.env.FRONTEND_URL);
console.log(url);
module.exports = merge(Common, {
  mode: "development",
  output: {
    filename: "main.js",
  },
  devServer: {
      port: url.port | 8080
  }
})