require('dotenv').config();

const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const awsLambda = require('node-aws-lambda');

gulp.task('clean', function(cb) {
    return del(['dist/**/*', '!dist/.gitkeep', 'deploy/**/*', '!deploy/.gitkeep'], cb);
});

gulp.task('js', function() {
    return gulp.src(['index.js', '.env'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('node-mods', function() {
    return gulp.src('./package.json')
        .pipe(gulp.dest('dist/'))
        .pipe(install({production: true}));
});

gulp.task('zip', function() {
    return gulp.src([
        'dist/**/*',
        'dist/.env',
        '!dist/package.json',
        '!dist/package-lock.json',
        '!dist/.gitkeep'
    ])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./deploy/'));
});

gulp.task('upload', function(callback) {
    awsLambda.deploy('./deploy/dist.zip', require("./lambda-config.js"), callback);
});

gulp.task('deploy', function(callback) {
    return runSequence(
        ['clean'],
        ['js', 'node-mods'],
        ['zip'],
        ['upload'],
        callback
    );
});