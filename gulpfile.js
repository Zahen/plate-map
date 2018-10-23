var gulp   = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minify = require('gulp-clean-css');

var path = {
    'source': {
        'css' : 'app/assets/stylesheets/plate-map/*.css',
        'js'  : 'app/assets/javascripts/plate-map/*.js'
    },
    'destination': {
        'css' : 'dist/css',
        'js'  : 'dist/js'
    }
};

// Minify CSS file
gulp.task('css', function () {
    return gulp.src(path.source.css)
        .pipe(rename('plate-map.css'))
        .pipe(gulp.dest(path.destination.css))
        .pipe(rename('plate-map.min.css'))
        .pipe(minify())
        .pipe(gulp.dest(path.destination.css));
});

// Uglify and Minify JS files
gulp.task('js', function () {
    return gulp.src(path.source.js)
        .pipe(concat('plate-map.js'))
        .pipe(gulp.dest(path.destination.js))
        .pipe(rename('plate-map.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.destination.js));
});

// Default Task -> Run gulp in workspace to execute all tasks
gulp.task('default', ['css', 'js']);