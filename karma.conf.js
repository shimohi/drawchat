// Karma configuration
// Generated on Sun Jan 10 2016 02:58:26 GMT+0900 (JST)

//var property = require('./gulpconfig.json');

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [
			'mocha',
			// 'browserify',
			'sinon'
		],

		// list of files / patterns to load in the browser
		files: [
			'node_modules/pepjs/dist/pep.js',
			'node_modules/gulp-handlebars/node_modules/handlebars/dist/handlebars.runtime.js',
			'build-output/test/js/loligo-templates.js',
			'build-output/test/js/loligo-internal.js',
			'node_modules/jquery/dist/jquery.js',
			'node_modules/crypto-js/crypto-js.js',
			'node_modules/jquery/dist/jquery.js',
			'node_modules/zip-js/WebContent/zip.js',
			'node_modules/zip-js/WebContent/zip-fs.js',
			'node_modules/underscore/underscore.js',
			'build-output/test/ts/test/fixtures/**/*.html',
			'build-output/test/ts/test/**/*.ts',
			{
				pattern: 'build-output/test/maps/**/*.map',
				included: false
			},
			{
				pattern: 'build-output/test/ts/internal/**/*.ts',
				included: false
			},
			// 'build-output/test/maps/**/*.map',
			// 'build-output/test/ts/internal/**/*.ts'
		],

		// list of files to exclude
		exclude: [
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			// 'build-output/test/ts/dts/**/*.ts': ['typescript'],
			// 'build-output/test/ts/internal/**/*.ts': ['typescript'],
			'build-output/test/js/loligo-internal.js':['coverage'],
//			'build-output/test/ts/internal/**/*.ts': ['coverage'],
			'build-output/test/ts/test/**/*.ts': ['browserify','coverage'],
			'build-output/test/ts/test/fixtures/**/*.html': ['html2js']
		},

		// typescriptPreprocessor: {
		// 	options: {
		// 		sourceMap: true, // (optional) Generates corresponding .map file.
		// 		target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
		// 		module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
		// 		noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
		// 		noResolve: true, // (optional) Skip resolution and preprocessing.
		// 		removeComments: true, // (optional) Do not emit comments to output.
		// 		concatenateOutput: true // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
		// 	},
		// 	// extra typing definitions to pass to the compiler (globs allowed)
		// 	typings: [
		// 		'build-output/test/ts/dts/tsd.d.ts'
		// 	]
		// 	// transforming the filenames
		// 	// transformPath: function(path) {
		// 	// 	return path.replace(/\.ts$/, '.js');
		// 	// }
		// },

		// browserify: {
		// 	debug: true,
		// 	plugin: [ 'tsify' ],
		// 	transform: ['espowerify'],
		// 	extensions: ['.ts', '.js']
		// },

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [
			'PhantomJS',
			//'Firefox',
			// 'Chrome'
		],

		reporters: [
			'coverage',
			// 'jenkins',
			'progress'
		],

		coverageReporter: {
			dir: 'coverage/',
			reporters: [
				{
					type: 'html'
				},
				{
					type: 'cobertura',
					file: 'clover.xml'
				}
			]
		},

		// jenkinsReporter: {
		// 	outputFile: 'test-results.xml',
		// 	suite: 'loligo',                 // this will be mapped to the package
		// 	classnameSuffix: 'browser-test'
		// },

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
};
