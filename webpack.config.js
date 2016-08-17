var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
	{
		context: __dirname,
		entry: './src/ts/entry.tsx',
		output: {
			filename: './artifact/app.js'
		},
		resolve: {
			extensions: ['', '.scss', '.css', '.js', '.json'],
			modulesDirectories: [
				'node_modules',
				path.resolve(__dirname, './node_modules')
			]
		},
		devtool: 'source-map',
		module: {
			loaders: [
				{
					test: /\.ts(x?)$/,
					loader: 'babel-loader?presets[]=es2015,presets[]=stage-3,presets[]=react!ts-loader',
					exclude: /(node_modules)/
				},{
					test: /(\.scss|\.css)$/,
					loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
				}
			],
			preLoaders: [
				{
					test: /\.js$/,
					loader: "source-map-loader"
				}
			]
		},
		postcss: [autoprefixer],
		sassLoader: {
			data: '@import "theme/_config.scss";',
			includePaths: [path.resolve(__dirname, './src/scss')]
		},
		plugins: [
			new ExtractTextPlugin('./artifact/app.css', { allChunks: true }),
			// new webpack.HotModuleReplacementPlugin(),
			// new webpack.NoErrorsPlugin(),
			// new webpack.DefinePlugin({
			// 	'process.env.NODE_ENV': JSON.stringify('development')
			// })
		]
		// ,
		// externals: {
		// 	"react": "React",
		// 	"react-dom": "ReactDOM"
		// }
	},
	//SASS
	// {
	// 	entry: './src/scss/loader.js',
	// 	output: {
	// 		filename: './artifact/app.css'
	// 	},
	// 	devtool: 'source-map',
	// 	module: {
	// 		loaders: [
	// 			{
	// 				test: /\.css$/,
	// 				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
	// 			},
	// 			{
	// 				test: /\.scss$/,
	// 				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
	// 			}
	// 		]
	// 	},
	// 	plugins: [
	// 		new ExtractTextPlugin('./artifact/app.css')
	// 	]
	// },
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
