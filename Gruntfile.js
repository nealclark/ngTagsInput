module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        files: {
            js: 'src/<%= pkg.name %>.js',
            css: 'src/<%= pkg.name %>.css',
            spec: 'test/<%= pkg.name %>.spec.js'
        },
        jshint: {
            files: ['Gruntfile.js', '<%= files.js %>', '<%= files.spec %>'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                noempty: true,
                noarg: true,
                quotmark: 'single',
                undef: true,
                eqnull: true,
                globals: {
                    angular: true,
                    module: true,
                    inject: true,
                    jQuery: true,
                    beforeEach: true,
                    describe: true,
                    it: true,
                    expect: true,
                    spyOn: true
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        clean: {
            build: ['build/'],
            tmp: ['tmp/']
        },
        ngmin: {
            directives: {
                files: {
                    'tmp/<%= pkg.name %>.js.tmp': ['<%= files.js %>']
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'tmp/<%= pkg.name %>.min.js': ['tmp/<%= pkg.name %>.js.tmp']
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'tmp/<%= pkg.name %>.min.css': ['<%= files.css %>']
                }
            }
        },
        compress: {
            options: {
                mode: 'zip'
            },
            minified: {
                options: {
                    archive: 'build/<%= pkg.name %>.min.zip'
                },
                files : [
                    { expand: true, src : ['**/*.js', '**/*.css'], cwd : 'tmp/' }
                ]
            },
            unminified: {
                options: {
                    archive: 'build/<%= pkg.name %>.zip'
                },
                files : [
                    { expand: true, src : ['**/*.js', '**/*.css'], cwd : 'src/' }
                ]
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['test']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['jshint', 'karma']);
    grunt.registerTask('default', ['jshint', 'karma', 'clean', 'ngmin', 'uglify', 'cssmin', 'compress', 'clean:tmp']);
};