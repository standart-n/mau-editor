###
Работа с пользователями
###

$ ->

	$this =
		init: (options = {}) ->

			# триггер на субмит формы авторизации
			$(this).snUsersTriggers 'signinFormSubmit'

		# обработка ответа от сервера после авторизации
		afterSignin: (res = {}) ->
			# если авторизация прошла положительно
			if res.signin
				# если есть id, login и hash пароля пользователя
				if res.signin.id? and res.signin.login? and res.signin.hash?
					# записыываем эти данные в глобальные переменные
					window.user = 
						id: 		res.signin.id
						login: 		res.signin.login
						hash: 		res.signin.hash
					# сохраняем в cookies
					$.cookie 'user_id', 	res.signin.id, 		expires: 365
					$.cookie 'user_login', 	res.signin.login, 	expires: 365
					$.cookie 'user_hash', 	res.signin.hash,  	expires: 365

		# нажатии пользователя на кнопку выход
		exit: () ->
			# стираем глобальные переменные
			window.user = {} if window.user?
			# очищаем cookies
			$.removeCookie 'user_id'
			$.removeCookie 'user_login'
			$.removeCookie 'user_hash'
			

	# инициализация
	$.fn.snUsers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments


