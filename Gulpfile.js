var gulp = require('gulp');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});

var scripts = [
	'node_modules/babel/browser-polyfill.js',
	'lib/lodash.js',
	'js/**/*.js'];


gulp.task('karma', function() {
	return gulp.src(scripts)
		.pipe($gulp.using())
		.pipe($gulp.karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}))
		.on('error', function(err) {
			// Make sure failed tests cause gulp to exit non-zero
			throw err;
		});
});
