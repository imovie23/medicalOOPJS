const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	devtool: 'inline-cheap-module-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 8080,
		hot: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							// if hmr does not work, this is a forceful method.
							reloadAll: true,
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							// if hmr does not work, this is a forceful method.
							reloadAll: true,
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: "./assets/img"
						}
					},
				]
			}
		]
	}
})