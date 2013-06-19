
module 'Работа с пользователем'

test 'Начальное положение', () ->

	# если пользователь уже был авторизован
	if $.cookie('user_login')? and $.cookie('user_hash')?

		strictEqual 	$('.signin-enter-link').parent('li').css('display'), 	'none', 'кнопка Вход скрыта'
		notEqual 		$('.signin-exit-link').parent('li').css('display'), 	'none', 'кнопка Выход активна'

		deepEqual window.user, 
			id: 		$.cookie('user_id')
			login: 		$.cookie('user_login')
			hash: 		$.cookie('user_hash')
		, 'при успешной авторизации cookies должны записаться в window.user'

		# нажимаем на кнопку выход
		$('.signin-exit-link').trigger 'click'

		strictEqual $.cookie('user_id'), 		null, 'cookie(user_id) сброшен'
		strictEqual $.cookie('user_login'), 	null, 'cookie(user_login) сброшен'
		strictEqual $.cookie('user_hash'), 		null, 'cookie(user_hash) сброшен'
		
		deepEqual window.user, {}, 'проверяем выход'

		notEqual 		$('.signin-enter-link').parent('li').css('display'), 	'none', 'после выхода кнопка Вход активна'
		strictEqual 	$('.signin-exit-link').parent('li').css('display'), 	'none', 'после выхода кнопка Выход скрыта'

	# если пользователь изначально не авторизован (cookies отсутствуют)
	else 

		notEqual 		$('.signin-enter-link').parent('li').css('display'), 	'none', 'кнопка Вход активна'
		strictEqual 	$('.signin-exit-link').parent('li').css('display'), 	'none', 'кнопка Выход скрыта'

		deepEqual window.user, {}, 'если cookies отсутствуют, то window.user должен быть пустым'


test 'Открываем форму с авторизацией', () ->

	strictEqual $('#modal-signin').css('display'), 'none', 'изначально окно c авторизацией закрыто'

	# нажимаем на кнопку вход
	$('.signin-enter-link').trigger 'click'

	notEqual $('#modal-signin').css('display'), 'none', 'при нажатии на Войти открывается модальное окно'

	equal $('#signin-login').val(), 		'', 'поле Логин изначально пустое'
	equal $('#signin-password').val(), 		'', 'поле Пароль изначально пустое'

	equal $('.signin-alert-success').css('display'), 	'none', 'сообщение об успехе изначально скрыто'
	equal $('.signin-alert-error').css('display'), 		'none', 'сообщение об ошибке изначально скрыто'


asyncTest 'Проверка неверной авторизации', 9, () ->

	# вводим заведомо неправильные значения логина и пароля
	$('#signin-login').val 		'user'
	$('#signin-password').val 	'password'

	# субмитим форму
	$('#signin-form').trigger 'submit'

	# ждем немного пока эти данные проверятся на сервере
	setTimeout () ->
		notEqual 	$('.signin-alert-error').css('display'), 		'none', 'сообщение об ошибке должно стать видимым'
		equal 		$('.signin-alert-success').css('display'), 		'none', 'сообщение об успехе остается скрытым'
		deepEqual window.user, {}, 'в window.user не должно ничего записаться'

		# закрываем форму
		$('div.modal-header button.close').trigger 'click'

		equal $('#modal-signin').css('display'), 'none', 'форма авторизации закрылась'

		# нажимаем на кнопку вход
		$('.signin-enter-link').trigger 'click'

		notEqual $('#modal-signin').css('display'), 'none', 'форма авторизации снова открылась'

		equal $('#signin-login').val(), 		'', 'поле Логин пустое'
		equal $('#signin-password').val(), 		'', 'поле Пароль пустое'

		equal $('.signin-alert-success').css('display'), 	'none', 'сообщение об успехе скрыто'
		equal $('.signin-alert-error').css('display'), 		'none', 'сообщение об ошибке скрыто'

		start()
	, 500


asyncTest 'Проверка авторизации c пустым паролем', 3, () ->

	# вводим заведомо неправильные значения логина и пароля
	$('#signin-login').val 		'user1'
	$('#signin-password').val 	''

	# субмитим форму
	$('#signin-form').trigger 'submit'

	# ждем немного пока эти данные проверятся на сервере
	setTimeout () ->
		notEqual 	$('.signin-alert-error').css('display'), 		'none', 'сообщение об ошибке должно стать видимым'
		equal 		$('.signin-alert-success').css('display'), 		'none', 'сообщение об успехе остается скрытым'
		deepEqual window.user, {}, 'в window.user не должно ничего записаться'

		start()
	, 500


asyncTest 'Проверка правильной авторизации', 6, () ->

	# expect 4

	# берем тестовые данные для авторизации из конфига
	$.ajax
		url: 'user.json'
		async: off
		dataType: 'json'
		success: (s) ->
			if s?
				# вводим эти данные
				$('#signin-login').val 		s.login
				$('#signin-password').val 	s.password

				# субмитим форму
				$('#signin-form').trigger 'submit'

				setTimeout () ->
					equal 		$('.signin-alert-error').css('display'), 		'none', 'сообщение об ошибке должно скрыться'
					notEqual 	$('.signin-alert-success').css('display'), 		'none', 'сообщение об успехе должно стать видимым'

					equal $('#modal-signin').css('display'), 'none', 'окно с авторизацией скроется'
					
					ok window.user.login and window.user.hash and window.user.id, 'в window.user запишется id, hash и id пользователя'

					strictEqual 	$('.signin-enter-link').parent('li').css('display'), 	'none', 'кнопка Вход скрыта'
					notEqual 		$('.signin-exit-link').parent('li').css('display'), 	'none', 'кнопка Выход активна'

					start()
				, 1000



# asyncTest 'Клик мышью по карте', 1, () ->

# 	setTimeout () ->
# 		e = $.Event 'click'
# 		e.pageX = 400
# 		e.pageY = 400

# 		$('#map').trigger e

# 		ok $('#agent').length, 'открылся балун'
# 		start()
		
# 	, 1000



