/**
 * Created by jin on 16/3/4.
 */

const path = require('path');
const gulp = require('gulp');
const scp = require('gulp-scp2');
const webpackStream = require('webpack-stream');
const productConfig = require('./product-webpack');
const watch = require('gulp-watch');
const deployPath = '/home/hbc/data-graph/';
const host = '172.16.7.30';
const username = 'hbc';
const password = 'kD*0dfu^%Ldf&h';

/*上线用*/
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const rev = require('gulp-rev');
// const revreplace = require('gulp-rev-replace');
// const clean = require('gulp-clean');
// const runSequence = require('run-sequence');
// const RevAll = require('gulp-rev-all');

gulp.task('streamDev', function () {
    return gulp.src(['js/app/**', 'js/components/**', 'js/page/**', 'css/*.sass'])
        .pipe(webpackStream(productConfig))
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'static',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('htmlDev', function () {
    return gulp.src(['templates/*'])
        .pipe(watch(['templates/*']))
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'template',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('libDev', function() {
    return gulp.src(['js/lib/echarts.min.js', 'js/lib/socket.io.js'])
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'static',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        })
});

gulp.task('dev', ['htmlDev', 'streamDev', 'libDev']);