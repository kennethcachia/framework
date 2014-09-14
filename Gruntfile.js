module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: [
          'lib/**/*.js',
          'src/**/*.js'
        ],
        tasks: ['jshint']
      }
    },

    jshint: {
      files: [
        'lib/**/*.js',
        'src/**/*.js',
        '!lib/third-party/*.js'
      ],
      options: {
        jshintrc: true
      }
    },

    jsdoc : {
      lib : {
        src: ['lib/**/*.js'], 
        options: {
          destination: 'doc'
        }
      },
      app : {
        src: ['src/**/*.js'], 
        options: {
          destination: 'doc_app'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['watch']);

};