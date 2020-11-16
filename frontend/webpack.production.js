const Common = require("./webpack.config")
const { merge } = require("webpack-merge");

module.exports = merge(Common, {
  mode: "production",
  output: {
    filename: "main-[contentHash].js",
  },
  module: {
    rules: [
        {
          enforce: 'pre',
          test: /\.(js|css)$/,
          loader: "remove-comments-loader",
          exclude: /(node_modules)/
        }
    ]
}
})