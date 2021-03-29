const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    mode:"development",
    devtool:"inline-source-map",
    entry:"./example/index.ts",
    output: {
        filename:"dist/bundle.js",
        path:path.join(__dirname),
    },
    module: {
        rules: [
            {
                test:/\.ts?$/,
                exclude:/node_modules/,
                use:"ts-loader"
            }
        ]
    },
    resolve:{
        extensions:[".tsx",".ts",".js"],
        alias:{
            "@":path.resolve(__dirname,"src")
        }
    },
    devServer: {
        open:true,
        contentBase:"./dist/",
        port:8001,
        disableHostCheck:true,
        hot:true
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:"example/index.html",
            filename:"dist/index.html",
            injext:"body"
        })
    ]
}