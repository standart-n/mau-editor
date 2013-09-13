
###
Старт приложения
----------------
###

$ ->

	if !window.console?
		window.console = 
			info: () ->
			log: () ->
			error: () ->
			warn: () ->


	moment.lang('ru')


	$this =
		init: (options = {}) ->

			$(this).sn 'setup', options
			$(this).sn 'cookies'
			$(this).sn 'start'



		# начальное состояние объекта sn
		setup: (options = {}) ->

			window.sn = {}

			sn =
				levels:{} 			# состояние последнего перехода
				users:{} 			# состояние пользователя
				content:{}
				conf: {}
				result:{} 			# результат последнего ajax запроса
				theme:{} 			# тема оформления
				settings:{} 		# доп. настройки

			$.extend true, sn, options
			$(this).data 'sn', sn

			sn


		# запись данных из cookies
		cookies: () ->

			window.user = {} if !window.user?

			window.user.id = 		$.cookie 'user_id' 			if $.cookie 'user_id' 
			window.user.login = 	$.cookie 'user_login' 		if $.cookie 'user_login'
			window.user.hash = 		$.cookie 'user_hash' 		if $.cookie 'user_hash' 



		# запуск приложения
		start: (options = {}) ->

			# загрузка конфигов
			console.log 'configuration...' if console?
			$(this).snConf()

			# отображение начальной страницы по событию #autoload
			console.log 'autoload...' if console?
			$(this).snEvents '#autoload/two/three:anchor'




	# инициализация 

	$.fn.sn = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

