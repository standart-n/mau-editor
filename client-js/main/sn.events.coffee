
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
			
			if href isnt '#' and href.match(/#([a-zA-Z0-9\_\-]+)/)

				# парсинг адресной строки
				
				levels =
					one: href.match /#([a-zA-Z0-9\_\-]+)/, '$2'
					two: href.match /#[a-zA-Z0-9\_\-]+\/([a-zA-Z0-9\_\-]+)/, '$3'
					three: href.match /#[a-zA-Z0-9\_\-]+\/[a-zA-Z0-9\_\-]+\/([a-zA-Z0-9\_\-]+)/, '$4'
					anchor: href.match /\:([a-zA-Z0-9\_\-]+)/



				# выводим в логи

				console.info 'url: ' + href if console?
				console.info 'levels: ', levels if console?

				# роутинг

				if levels.one? and levels.one[1] isnt 'spoiler'
					switch levels.one[1]

						# при начальной загрузке приложения

						when 'autoload'

							$(this).snMaps()


						
						else
							
							# в других случаях

							if levels.two? and levels.three?


								
								# если нужно загрузить простую текстовую страницу

								window.sn.part = levels.one[1]
					
					$(this).click(levels) # событие click для запуска модулей

		

	# инициализация

	$.fn.snEvents = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments
			