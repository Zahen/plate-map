const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-clean-css');
const minifyHTML = require('gulp-htmlmin');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();
const connect = require('gulp-connect');
const mergeStream = require('merge-stream');

const path = {
    source: {
        app: {
            css: ['src/css/*.css'],
            js: ['src/js/*.js'],
            html: 'src/index.html'
        },
        dependencies: {
            css: [
                'node_modules/bootstrap/dist/css/bootstrap.css',
                'node_modules/select2/select2.css'
            ],
            js: [
                'node_modules/jquery/dist/jquery.js',
                'node_modules/jquery-ui-dist/jquery-ui.js',
                'node_modules/bootstrap/dist/js/bootstrap.js',
                'node_modules/select2/select2.js',
                'node_modules/fabric/dist/fabric.js',
                'node_modules/clipboard/dist/clipboard.js'
            ],
            img: [
                'node_modules/select2/*.png',
                'node_modules/select2/*.gif'
            ]
        },
    },
    destination: {
        prod: {
            css: 'dist/prod/css',
            js: 'dist/prod/js',
            root: 'dist/prod'
        },
        dev: {
            css: 'dist/dev/css',
            js: 'dist/dev/js',
            root: 'dist/dev'
        },
        pack: {
            css: 'dist/package/css',
            js: 'dist/package/js'
        }
    }
};

let config = {
    source: {
        css: '',
        js: '',
        img: '',
        html: ''
    },
    destination: {
        css: '',
        js: '',
        root: ''
    }
};

gulp.task('config:prod', () => {
    config.source.css = path.source.dependencies.css.concat(path.source.app.css);
    config.source.js = path.source.dependencies.js.concat(path.source.app.js);
    config.source.img = path.source.dependencies.img;
    config.source.html = path.source.app.html;
    config.destination.css = path.destination.prod.css;
    config.destination.js = path.destination.prod.js;
    config.destination.root = path.destination.prod.root;
});

gulp.task('config:dev', () => {
    config.source.css = path.source.dependencies.css.concat(path.source.app.css);
    config.source.js = path.source.dependencies.js.concat(path.source.app.js);
    config.source.img = path.source.dependencies.img;
    config.source.html = path.source.app.html;
    config.destination.css = path.destination.dev.css;
    config.destination.js = path.destination.dev.js;
    config.destination.root = path.destination.dev.root;
});

gulp.task('config:pack', () => {
    config.source.css = path.source.app.css;
    config.source.js = path.source.app.js;
    config.destination.css = path.destination.pack.css;
    config.destination.js = path.destination.pack.js;
});

function concat_minify_css(source, destination) {
    return gulp.src(source)
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(destination));
}

function concat_uglify_js(source, destination) {
    return gulp.src(source)
        .pipe(concat('main.js'))
        .pipe(uglifyJS())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(destination));
}

gulp.task('clean', () => {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('css', () => {
    return concat_minify_css(config.source.css, config.destination.css);
});

gulp.task('js', () => {
    return concat_uglify_js(config.source.js, config.destination.js);
});

gulp.task('copy_src', () => {
    const css = gulp.src(config.source.css)
        .pipe(gulp.dest(config.destination.css));
    const js = gulp.src(config.source.js)
        .pipe(gulp.dest(config.destination.js));
    return mergeStream(css, js);
});

// Copy images of Select2 (v3.5.1) dependency to 'dist/prod/css'
gulp.task('copy_img', () => {
    return gulp.src(config.source.img)
        .pipe(gulp.dest(config.destination.css));
});

// Inject sources to index.html and minify it
gulp.task('inject', () => {
    return gulp.src(config.source.html)
        .pipe(inject(gulp.src([`${config.destination.css}/*.css`, `${config.destination.js}/*.js`], {read: false}),
            {
                ignorePath: config.destination.root,
                addRootSlash: false
            }))
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(config.destination.root));
});

// Serve application in development mode
gulp.task('server.dev', () => {
    browserSync.init({server: 'dist/dev', proxy: 'localhost:9999'});
    gulp.watch([path.source.app.css, path.source.app.css], ['build.dev'])
        .on('change', browserSync.reload);
});

// Serve application in production mode
gulp.task('server.prod', () => {
    connect.server({
        name: 'App [PRODUCTION MODE]',
        root: 'dist/prod'
    });
});

gulp.task('build.package', () => runSequence('clean', 'config:pack', 'css', 'js'));

gulp.task('build.dev', () => runSequence('clean', 'config:dev', 'copy_src', 'copy_img', 'inject'));

gulp.task('serve.dev', () => runSequence('clean', 'config:dev', 'copy_src', 'copy_img', 'inject', 'server.dev'));

gulp.task('build.prod', () => runSequence('clean', 'config:prod', 'css', 'js', 'copy_img', 'inject'));

gulp.task('serve.prod', () => runSequence('clean', 'config:prod', 'css', 'js', 'copy_img', 'inject', 'server.prod'));

gulp.task('default', ['serve.prod']);