$ ->

	_this = this

	# если у пользователя сохранены cookies,
	# сразу делаем запрос для его авторизации
	if $.cookie('user_login') and $.cookie('user_hash')
		$(_this).snUsersAjax 'signin', 
			login: 		$.cookie 'user_login' 
			hash: 		$.cookie 'user_hash' 	
		, (res) ->
			if res.signin?
				# вызов функции, которая запишет данные в переменные
				$(_this).snUsers 'afterSignin', res
				if res.signin
					# при успехе, меняем кнопку вход на кнопку выход
					$('.signin-exit-link').parent('li').show()
					$('.signin-enter-link').parent('li').hide()


	$this =
		# триггер на субмит формы авторизации
		signinFormSubmit: (options = {}) ->

			_this = this
			
			$('#signin-form').on 'submit', (e) ->
				e.preventDefault()
				# скрываем все сообщения
				$('.signin-alert').hide()

				# берем данные из инпутов и оправляем эти данные на сервер
				$(_this).snUsersAjax 'signin', 
					login: 			$('#signin-login').val()
					password: 		$('#signin-password').val()
				, (res) ->
					if res.signin?
						# при положительном ответе, 
						# записываем эти данные в переменные
						# путем вызова нужной функции
						$(_this).snUsers 'afterSignin', res
						if res.signin
							# при успешной авторизации
							# скрываем форму авторизации
							$('#signin-form').hide()
							# меняем кнопку вход на кнопку выход
							$('.signin-exit-link').parent('li').show()
							$('.signin-enter-link').parent('li').hide()
							# показываем сообщение об успешной авторизации 
							$('.signin-alert-success').show()
							# через 500мс скрываем диалоговое окно с авторизацией
							setTimeout () ->
								$('#modal-signin').modal('hide')
							, 500

						else
							# если авторизация прошла неуспешно
							# показываем сообщение с ошибкой 
							$('.signin-alert-error').show()
							# стираем данные в поле пароль
							$('#signin-password').val('')

			# при нажатии на кнопку вход
			$('.signin-enter-link').on 'click', (e) ->
				e.preventDefault()
				# очищаем форму авторизации от данных
				$('#signin-login').val('')
				$('#signin-password').val('')
				# скрываем все алерты
				$('.signin-alert').hide()


			# при нажатии на кнопку выход
			$('.signin-exit-link').on 'click', (e) ->
				e.preventDefault()
				# меняем кнопку выход на кнопку вход
				$('.signin-exit-link').parent('li').hide()
				$('.signin-enter-link').parent('li').show()
				# делаем форму авторизации видимой
				# но ее диалоговое окно будет скрыто
				$('#signin-form').show()
				# скрываем алерты
				$('.signin-alert').hide()
				# очищаем поле пароль
				$('#signin-password').val('')
				# вызываем функцию которая очистит переменные
				$(_this).snUsers 'exit'


	# инициализация 
	$.fn.snUsersTriggers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


