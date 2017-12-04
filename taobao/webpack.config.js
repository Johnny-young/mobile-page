const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devtool: "eval-source-map",
	entry: "./src/js/main.js",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist/js/")
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env"]
						}
					}
				],
				exclude: [/node_modules/,/vendor/]
			}
		]
	},
	plugins: [
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),*/
		/*new htmlWebpackPlugin({
			template: "./dist/index.html"
		}),*/
	]
};