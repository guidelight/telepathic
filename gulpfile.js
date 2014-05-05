// Includes
var gulp = require('gulp'),
    karma = require('gulp-karma'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

// Path definitions
var paths = {
    js: ['src/telepathic.js'],
    distlist: [
        'module.prefix.js',
        'src/telepathic.js',
        'module.suffix.js'
    ]
};


gulp.task('concat', function() {
  return gulp.src(paths.distlist)
    .pipe(concat('telepathic.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('uglify', function() {
  return gulp.src('dist/telepathic.js')
    .pipe(uglify())
    .pipe(rename("telepathic.min.js"))
    .pipe(gulp.dest('./dist/'))
});


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
    return gulp.src(paths.js)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});

gulp.task('build', ['test', 'concat', 'uglify']);