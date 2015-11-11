var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var folders = require('gulp-folders');
var concat = require('gulp-concat');


gulp.task('default',function(){
	console.log('default');
})