const gulp = require('gulp')
	,uglify = require('gulp-uglify-es').default
	,debug = require('gulp-debug')
	,rename = require('gulp-rename')
	,helpDoc = require('gulp-help-doc')
;


/**
 * Make minified plugin version (see "dist" folder)
 * @task {build}
 */
gulp.task('build', function() {
	gulp.src(['src/jq-dot.js'])
		.pipe(debug({title: 'minification'}))
		.pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', ['help']);

/**
 * Show this help
 * @task {help}
 */
gulp.task('help', function () {
	return helpDoc(gulp, {
		lineWidth: 120,
		keysColumnWidth: 20,
		logger: console
	})
});
