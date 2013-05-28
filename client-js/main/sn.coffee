
###
Старт приложения
----------------
###

$ ->
	$this =
		init: (options = {}) ->

			$(this).sn 'setup', options
			$(this).sn 'start'



		# начальное состояние объекта sn

		setup: (options = {}) ->

			window.sn = {}

			sn =
				levels:{} # состояние последнего перехода
				users:{} # состояние пользователя
				content:{}
				conf: {}
				result:{} # результат последнего ajax запроса
				theme:{} # тема оформления
				settings:{} # доп. настройки

			$.extend true, sn, options
			$(this).data 'sn', sn

			sn


		# запуск приложения

		start: (options = {}) ->

			# загрузка конфигов

			console.log 'configuration...' if console?
			$(this).snConf()

			# отображение начальной страницы по событию #autoload

			console.log 'autoload...' if console?
			$(this).snEvents '#autoload'




	# инициализация 

	$.fn.sn = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

