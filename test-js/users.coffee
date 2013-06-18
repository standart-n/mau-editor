
Browser = require 'zombie'
assert = require 'assert'


browser = new Browser
	debug: off
	silent: on
	loadCSS: on


describe 'загрузка страницы:', () ->

	it 'ответ от browser.visit()', (visit) ->

		browser.visit 'http://izhmfc.ru/_editor/', () ->	

			# browser.wait 1000, () ->

			visit()

			describe 'проверяем начальное положение пользователя', () ->

			# если пользователь изначально не авторизован
			if !browser.window.user.login? or !browser.window.user.id?


				#console.log '!!!', browser.evaluate("$('.signin-exit-link').parent('li').is(':visible')")
				#console.log '!!!', browser.evaluate("$(#modal-signin).html()")
				# console.log '!!!', browser.evaluate("$('#map').css('background')")
				#console.log '!!!', browser.evaluate "$('#map').hasClass('map-main')"

				describe 'если пользователь не авторизован', () ->

					it 'кнопка вход должна быть активна', () ->
						assert.notEqual 'none', browser.evaluate("$('.signin-enter-link').parent('li').css('display')"), 'кнопка Вход активна'
						# assert.equal 'none', browser.evaluate("$('.signin-exit-link').parent('li').css('display')"), 'кнопка Выход скрыта'
						# assert.equal 'none', 'off', 'кнопка Выход скрыта'



			#describe 'Проверяем авторизован ли пользователь:', () ->
				
				it 'проверяем window.user', () ->

					# done()

	






		# 		# done browser.seccess
		# 		
		# 		# assert.ok browser.success


	# browser.visit 'http://izhmfc.ru/_editor/', () ->
	# 		browser.evaluate "$('#map').hasClass('map-main')"
	# .then () ->
	# console.log 'go!'
	# console.log browser.html("#main")
	# console.log 
	# assert.ok 

	# .fail () ->
	# 	console.log "Oops", error

		# assert.ok browser.query("#brains")
		# browser
		# 	.clickLink '.sign-exit-link', (e,browser,status) ->
		# 		console.log 'go!'




