/**
 * configuration for grunt tasks
 * @module Gruntfile
 */

module.exports = function(grunt) {
  /** load tasks */
  require('load-grunt-tasks')(grunt);

  /** config for build paths */
  var config = {
    dist: {
      dir: 'dist/',
      EventEmitter: 'dist/EventEmitter.js',
      ngEventEmitter: 'dist/ngEventEmitter.js'
    },
    src: {
      dir: 'src/'
    },
    tmp: {
      dir: 'tmp/'
    }
  };

  /** paths to files */
  var files = {

    /** src files */
    src: [
      'EventEmitter.js'
    ]
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  /** config for grunt tasks */
  var taskConfig = {
    concat: {
      EventEmitter: {
        options: {
          // stripBanners: true
          banner: 'angular.module("EventEmitter", [])\n' +
          '.service("EventEmitter", [\n' +
          'function() {\n\n',
          footer: '\n\n' +
          'return EventEmitter;\n\n}' +
          '\n]);'
        },
        src: (function() {
          var cwd = config.src.dir;

          return files.src.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist.EventEmitter
      },

      ngEventEmitter: {
        options: {
          // stripBanners: true
          separator: '\n\n',
          footer: '\n\n' +
          'angular.module("ngEventEmitter", [\n' +
          '"EventEmitter"\n' +
          ']);'
        },
        src: (function() {
          return [
            config.dist.EventEmitter
          ];
        })(),
        dest: config.dist.ngEventEmitter
      }
    },


    /** uglify (javascript minification) config */
    uglify: {
      EventEmitter: {
        options: {},
        files: [
          {
            src: config.dist.EventEmitter,
            dest: (function() {
              var split = config.dist.EventEmitter.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      },

      ngEventEmitter: {
        options: {},
        files: [
          {
            src: config.dist.ngEventEmitter,
            dest: (function() {
              var split = config.dist.ngEventEmitter.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      }
    }
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  // register default & custom tasks

  grunt.initConfig(taskConfig);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);

};