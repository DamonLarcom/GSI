const Common = require("./webpack.config");
const { merge } = require("webpack-merge");

// const url = new URL(process.env.FRONTEND_URL);
module.exports = merge(Common, {
    mode: "development",
    output: {
        filename: "main.js",
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
    }
})