/** --------------------------------------------------------
* Require 
* ------------------------------------------------------ */

var gulp = require('gulp');
var gutil = require('gulp-util');
var wiredep = require('wiredep').stream;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Paths
var paths = {
};

/** --------------------------------------------------------
* Tasks
* ------------------------------------------------------ */

/** 
* Bower 
*/
gulp.task('bower', function () {
  gulp.src('./index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./dest'));
});

/** 
* Webpack
*/
gulp.task('webpack', function() {
	// Run webpack
	webpack({
		// Configuration
	}, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			// Output options
		}));
		callback();
	})
});

/** 
* Webpack
*/
gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        // configuration
    });
    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // callback();
    });
});

/** 
* Init 
*/
gulp.task('init', function() {
});

// Default
gulp.task('default', ['init']);