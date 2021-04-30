const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/Index.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].bundle.js',
		publicPath: '/',
		clean: true
	},
	devtool: 'inline-source-map',
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	devServer: {
		port: 1234,
		watchContentBase: true,
		contentBase: path.join(__dirname, 'public'),
		open: false,
		historyApiFallback: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			filename: 'index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
};
