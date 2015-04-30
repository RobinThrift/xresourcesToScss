var gulp   = require('gulp'),
    config = {
        paths: {
            dest: './dist',
            scripts: ['src/*.js', 'src/**/*.js'],
            tests: ['test/*.spec.js', 'test/**/*.spec.js', 'test/plugins/**/*.spec.js']
        }
    };


var args  = require('yargs')(process.argv)
                .string('only')
                .default('only', undefined)
                .argv;


gulp.task('scripts:lint', function() {
    var jshint = require('gulp-jshint');

    return gulp.src(config.paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts:transpile', function() {
    var babel = require('gulp-babel');

    return gulp.src(config.paths.scripts, {base: './src'})
        .pipe(babel())
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(gulp.dest(config.paths.dest));
});

gulp.task('scripts:all', ['scripts:lint', 'scripts:transpile']);

gulp.task('tests:unit', ['scripts:transpile'], function() {
    var mocha = require('gulp-mocha');
    return gulp.src(config.paths.tests)
        .pipe(mocha({
            ui: 'tdd',
            reporter: 'spec',
            grep: args.only
        }));
});

gulp.task('tests:watch', ['scripts:all'], function() {
    gulp.watch(config.paths.tests, ['tests:unit']);
    gulp.watch(config.paths.scripts, ['tests:unit']);
});


gulp.task('watch', function() {
    gulp.watch(config.paths.scripts, ['scripts:all']);
});

