// Includes
var gulp = require('gulp'),
    karma = require('gulp-karma'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    stripDebug = require('gulp-strip-debug'),
    complexity = require('gulp-complexity'),
    connect = require('gulp-connect');

// Path definitions
var paths = {
    js: ['src/telepathic.js'],
    distlist: [
        'module.prefix.js',
        'src/telepathic.js',
        'module.suffix.js'
    ]
};



gulp.task('concat', function () {
    return gulp.src(paths.distlist)
        .pipe(concat('telepathic.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('uglify', function () {
    return gulp.src('./telepathic.js')
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(rename("telepathic.min.js"))
        .pipe(gulp.dest('./'))
});

gulp.task('complexity', function (){
    return gulp.src(paths.js)
        .pipe(complexity());
});

gulp.task('copy', function (){
    return gulp.src('./telepathic.js')
        .pipe(gulp.dest('./app/'));
});

// Task to create a web server and serve the app during development
gulp.task('serve', function () {
    connect.server({
        root: ['./app'],
        port: 8077,
        livereload: false
    })
});


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

gulp.task('default', function() {
    return gulp.src(paths.js)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});

gulp.task('build', ['concat', 'uglify', 'copy']);
