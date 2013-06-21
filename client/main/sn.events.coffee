
###
Роутинг приложения
###

$ ->

	$this =
		init: (options = {}) ->
			def =
				href:'#autoload'

			# извлекаем путь, по которому был переход

			if typeof options isnt 'object'
				href = options
			else				
				$.extend true, def, options
				href = def.href
			
			if href isnt '#' and href.match(/#[a-zA-Z0-9\_\-]+/)

				# парсинг адресной строки
				
				levels = href.match /[a-zA-Z0-9\_\-]+/g

				# выводим в логи

				console.info 'url: ' + href if console?
				console.info 'levels: ', levels if console?

				# роутинг

				if levels[0]? and levels[0] isnt 'spoiler'
					switch levels[0]

						# при начальной загрузке приложения
						when 'autoload'
							
							$(this).snUsers()		# работа с пользователями
							$(this).snMaps()		# работа карты
			
						else
							
							# в других случаях
							if levels[1]? and levels[2]?


								
								# если нужно загрузить простую текстовую страницу
								window.sn.part = levels[0]
					
					$(this).click(levels) # событие click для запуска модулей

		

	# инициализация

	$.fn.snEvents = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments
			