// Includes
var gulp = require('gulp'),
    karma = require('gulp-karma');

// Path definitions
var paths = {
    js: ['./telepathic.js']
};

gulp.task('test', function() {
  return gulp.src(paths.js)
    .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
    }))
    .on('error', function(err) {
        throw err;
    });
});

gulp.task('default', function() {
    gulp.src(paths.js)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});