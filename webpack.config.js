const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // index.js is our Entry file
    entry: "./src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    mode: "development",
    devServer: {
        port: 3000,
        open: true,
        compress: true,
    },
    module: {
        rules: [
            {
                // babel loader
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            "@babel/plugin-transform-arrow-functions",
                            "@babel/plugin-proposal-class-properties",
                        ],
                    },
                },
            },
            {
                // css loader
                test: /\.scss$/,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                // html loader
                test: /\.html$/,
                use: "html-loader",
            },
        ],
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new htmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
