module.exports = function gruntFile(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    shell: {
      options: {
        stderr: false
      },
      clear: {
        command: 'clear && mkdir -p demo_dist && cp index.html demo_dist/index.html'
      },
      reactify: {
        command: 'browserify -d -e demo_src/demo.jsx -t [ babelify --stage 0 ] -o demo_dist/demo.js'
      },
      less: {
        command: 'lessc demo_src/demo.less --autoprefix > demo_dist/demo.css'
      }
    },
    watch: {
      styles: {
        options: {
          livereload: true
        },
        files: ['demo_src/*.less', 'src/*.less'],
        tasks: ['shell:less']
      },
      html: {
        options: {
          livereload: true
        },
        files: ['index.html']
      },
      scripts: {
        options: {
          livereload: true
        },
        files: ['demo_src/*.jsx', 'src/*.jsx'],
        tasks: ['shell:reactify']
      }
    }
  });

  grunt.registerTask('build', ['shell:clear', 'shell:reactify', 'shell:less']);
  grunt.registerTask('default', ['build', 'watch']);
};

