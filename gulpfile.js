var gulp = require('gulp');

//コンフィグファイル読み込み
var config = require('./gulpconfig.json');
config.buildOutDirName = 'build-output';
config.buildOut = './' + config.buildOutDirName;
config.distOutDirName = 'dist';
config.dist = './' + config.distOutDirName;
config.node_modules = './node_modules';
config.current = __dirname;

//gulp系のプラグインを一括読み込み
var $ = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

//gulp系以外は個別読み込み
$.process = require('process');
$.fs = require('fs');
$.gulp = gulp;
$.del = require('del');
$.hbs = require('handlebars');
$.browserify = require('browserify');
$.karma = require('karma');
$.tsify = require('tsify');
$.vinylSourceStream = require('vinyl-source-stream');
$.rimraf = require('rimraf');
$.runSequence = require('run-sequence');

$.minimist = require("minimist");
$.merge = require('event-stream').merge;


//	グローバルオブジェクトに設定
global.prop={
	$: $,
	config: config
};

//	個別タスクのロード
var tasksDir = './gulp-tasks';
var files = $.fs.readdirSync(tasksDir);
files.forEach(function(file){
	if(!file.endsWith('.js')){
		return;
	}
	require(tasksDir + '/' + file);
});
