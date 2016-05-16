var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [

	//TypeScript
	{
		entry: './src/ts/entry.ts',
		output: {
			filename: './artifact/app.js'
		},
		resolve: {
			// Add `.ts` and `.tsx` as a resolvable extension.
			extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
		},
		devtool: 'source-map',
		module: {
			loaders: [
				// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
				{
					test: /\.tsx?$/,
					loader: 'ts-loader'
				}
			]
		}
	},
	//SASS
	{
		entry: './src/scss/loader.js',
		output: {
			filename: './artifact/app.css'
		},
		devtool: 'source-map',
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('./artifact/app.css')
		]
	},
	//HTMLファイル
	{
		output: {
			path: 'artifact',
			filename: 'index.html'
		},
		module: {
			loaders: [
				{
					test: /\.hbs$/, loader: "handlebars"
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/hbs/entry.hbs',
				cacheBreak: new Date().getTime()
			})
		]
	}
];
