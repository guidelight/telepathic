// Includes
var gulp = require('gulp'),
    karma = require('gulp-karma'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    extreplace = require('gulp-ext-replace'),
    stripDebug = require('gulp-strip-debug');

// Path definitions
var paths = {
    js: ['src/telepathic.js'],
    distlist: [
        'src/module.prefix.js',
        'src/telepathic.js',
        'src/module.suffix.js'
    ],
    output: [
        './telepathic.js',
        './telepathic.min.js'
    ]
};

gulp.task('test', function() {
    // note: need to use a dummy file here so it picks up the karma.conf.js file array
    return gulp.src('./foo.js')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('build', function () {
    return gulp.src(paths.distlist)
        .pipe(concat('./telepathic.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(extreplace('.min.js'))
        .pipe(gulp.dest('./'));
});


gulp.task('default', ['build', 'test']);
