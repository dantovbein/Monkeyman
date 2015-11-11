var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var folders = require('gulp-folders');
var concat = require('gulp-concat');

/*
gulp.task('unify-core',function(){
	return browserify('./src/package-core.js')
	.bundle()
	.pipe(source('monkeyman.js'))
	.pipe(gulp.dest('./build/'))
})
*/

gulp.task('unify-core', function() {
  return gulp.src('./src/core/*.js')
    .pipe(concat('monkeyman.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('uglify-core',['unify-core'],function(){
    return gulp.src('./build/monkeyman.js')
    	.pipe(uglify())
    	.pipe(rename(function(path){
    		path.basename += '.min'
    	}))
        .pipe(gulp.dest('./build/'))
});

gulp.task('compile-core',['unify-core','uglify-core']);



gulp.task('unify-ui',function(){
	return browserify('./src/package-ui.js')
	.bundle()
	.pipe(source('monkeyman-ui.js'))
	.pipe(gulp.dest('./build/'))
})

gulp.task('uglify-ui',['unify-ui'],function(){
    return gulp.src('./build/monkeyman-ui.js')
    	.pipe(uglify())
    	.pipe(rename(function(path){
    		path.basename += '.min'
    	}))
        .pipe(gulp.dest('./build/'))
});

gulp.task('compile-ui',['unify-ui','uglify-ui']);

gulp.task('compile-all',['compile-core','compile-ui']);


