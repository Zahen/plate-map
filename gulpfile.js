const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const minify = require('gulp-clean-css');

const path = {
    source: {
        css: 'app/assets/stylesheets/plate-map/*.css',
        js: 'app/assets/javascripts/plate-map/*.js'
    },
    destination: {
        css: 'dist/css',
        js: 'dist/js'
    }
};

const pathDependencies = {
    source: {
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/select2/dist/css/select2.css'
        ],
        js: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery-ui-dist/jquery-ui.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/select2/dist/js/select2.full.js',
            'node_modules/fabric/dist/fabric.js',
            'node_modules/clipboard/dist/clipboard.js'
        ]
    }
};

gulp.task('css', () => {
    gulp.src(path.source.css)
        .pipe(rename('plate-map.css'))
        .pipe(gulp.dest(path.destination.css))
        .pipe(rename('plate-map.min.css'))
        .pipe(minify())
        .pipe(gulp.dest(path.destination.css));

    gulp.src(pathDependencies.source.css)
        .pipe(gulp.dest(path.destination.css))
        .pipe(minify())
        .pipe(rename(path => path.basename += '.min'))
        .pipe(gulp.dest(path.destination.css));
});

gulp.task('js', () => {
    gulp.src(path.source.js)
        .pipe(concat('plate-map.js'))
        .pipe(gulp.dest(path.destination.js))
        .pipe(rename('plate-map.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.destination.js));

    gulp.src(pathDependencies.source.js)
        .pipe(gulp.dest(path.destination.js))
        .pipe(uglify())
        .pipe(rename(path => path.basename += '.min'))
        .pipe(gulp.dest(path.destination.js));
});

// Default Task -> Run 'gulp' in workspace to execute all tasks *
gulp.task('default', ['css', 'js']);

// Uncomment the following instructions to watch changes in your files and compile them automatically
// Don't forget to comment the previous instruction *
// gulp.task('watch', () => {
//     gulp.watch(path.source.css, ['css']);
//     gulp.watch(path.source.js, ['js']);
// });
// gulp.task('default', ['watch']);