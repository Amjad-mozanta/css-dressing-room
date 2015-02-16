
// Inspired by http://anthonydel.com/my-personal-gruntfile-for-front-end-experiments/

module.exports = function(grunt) {

	grunt.initConfig({

		// running `grunt less` will compile once
		less: {
			development: {
				options: {
					paths: ['./css'],
					yuicompress: false
				},
				files: {
					'./css/style.css': './css/style.less',
					'./css/markdown.css': './css/markdown.less'
				}
			}
		},

		// configure autoprefixing for compiled output css
		autoprefixer: {
			build: {
				src: ['./css/style.css', './css/markdown.css'],
			}
		},

		jade: {
			compile: {
				options: {
					data: {
						pretty: true,
						debug: true,
						// apiBaseUrl: 'http://estimator.topmost.se:8084'
						apiBaseUrl: 'http://localhost:3000'
					}
				},
				files: [
					{
						expand: true,     // Enable dynamic expansion.
						cwd: './',      // Src matches are relative to this path.
						src: ['*.jade'], // Actual pattern(s) to match.
						dest: './',   // Destination path prefix.
						ext: '.html'   // Dest filepaths will have this extension.
					},
				]
			}
		},

		// running `grunt watch` will watch for changes
		watch: {

			stylesless: {
				options: { livereload: true },
				files: ['./css/*.less', './css/*.css'],
				tasks: ['less:development', 'autoprefixer']
			},

			jade: {
				options: { livereload: true },
				files: ['*.jade'],
				tasks: ['jade']
			}
		},
		
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
