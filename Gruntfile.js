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
      js: 'dist/EventEmitter.js'
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
      src: {
        options: {
          // stripBanners: true
          banner: 'app.service("EventEmitter", [\n' +
          'function() {\n\n',
          footer: '\n\n}' +
          '\n]);'
        },
        src: (function() {
          var cwd = config.src.dir;

          return files.src.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist.js
      }
    },


    /** uglify (javascript minification) config */
    uglify: {
      src: {
        options: {},
        files: [
          {
            src: config.dist.js,
            dest: (function() {
              var split = config.dist.js.split('.');
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