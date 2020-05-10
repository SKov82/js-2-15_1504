let HtmlWebpackPlugin = require('html-webpack-plugin');
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
	        	test: /\.jpg$/i,
	        	loader: 'file-loader',
	        	options: {
	        		name: 'assets/img',
	        	},
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
	},
	devServer: {
		open: true,
		hot: true,
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: { '^/api': '' },
				secure: false,
				changeOrigin: true
			}
		}
	}
};
