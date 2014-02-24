'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['public', '.tmp']
                }]
            }
        },
        copy: {
            bower: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        'css/**/*',
                        'index.html',
                        '**/*.html'
                    ],
                    dest: 'public'
                }]
            }
        },
        useminPrepare: {
            html: 'public/index.html',
            options: {
                dest: 'public'
            }
        },
        usemin: {
            html: 'public/index.html'
        },
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    src: 'public/*.html'
                }]
            }
        },
        concat: {
            dev: {
                options: {
                    dest: 'public'
                }
            }
        },
        uglify: {

            options: {
                mangle: false,
                compress: false,
                beautify: true,
                preserveComments: true
            }

        }
    });

    grunt.registerTask('default', [
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'htmlmin',
        'usemin'
    ]);
};