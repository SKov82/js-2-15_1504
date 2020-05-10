//import ... from - ES6
let HtmlWebpackPlugin = require('html-webpack-plugin'); //ES5
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            }
        ]
    }
}// ES5

//export default //ES6
