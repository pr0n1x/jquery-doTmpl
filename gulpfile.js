var gulp = require('gulp')
	,minify = require('gulp-minify')
	,helpDoc = require('gulp-help-doc')
;


/**
 * Make minified plugin version (see "dist" folder)
 * @task {build}
 */
gulp.task('build', function() {
	gulp.src(['src/jq-dot.js'])
		.pipe(gulp.dest('dist/'))
		.pipe(minify({ext: {source: '.js', min: '.min.js'}}))
		.pipe(gulp.dest('dist/'))
	;
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