
'use strict'

module.exports = (grunt) ->

	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')

		jade:
			index:
				options: 
					pretty: on
				src: './jade/index.jade'
				dest: './index.html'
			
			view:
				options:
					pretty: on
				files: 
					'./view/balloonContent.html': 			'./jade/view/balloonContent.jade'
					'./view/balloonContentCreate.html': 	'./jade/view/balloonContentCreate.jade'
					'./view/balloonContentEditor.html': 	'./jade/view/balloonContentEditor.jade'
					'./view/balloonHeader.html': 			'./jade/view/balloonHeader.jade'
					'./view/balloonHeaderCreate.html': 		'./jade/view/balloonHeaderCreate.jade'
					'./view/balloonHeaderEditor.html': 		'./jade/view/balloonHeaderEditor.jade'


		recess:
			css:
				options:
					compile: on
				files:
					'style/style.css': './less/bootstrap.less'
			min:
				options:
					compress: on
				files:
					'style/style.min.css': './less/bootstrap.less'

		coffee:
			sn:
				src: ['client-js/main/*', 'client-js/users/*', 'client-js/maps/*', 'client-js/widgets/*']
				dest: 'script/sn.js'

		concat:
			bootstrap:
				src: 'bootstrap-js/*.js'
				dest: 'script/bootstrap.js'			


		uglify:
			sn:
				options:
					report: 'min'
				files: 
					'script/sn.min.js': '<%= coffee.sn.dest %>'

			bootstrap:
				files: 
					'script/bootstrap.min.js': '<%= concat.bootstrap.dest %>'



	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.loadNpmTasks 'grunt-recess'	
	
	grunt.registerTask 'default', ['recess', 'coffee:sn', 'uglify:sn', 'jade']
	grunt.registerTask 'bootstrap', ['concat:bootstrap', 'uglify:bootstrap']
	grunt.registerTask 'css', ['recess:sn']
	
