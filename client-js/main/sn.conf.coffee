
###
Загрузка настроек
-----------------
###

$ ->
	$this =


		# автозагрузка
		
		init: (options = {}) ->
			#$(this).snConf 'settings'


		# загрузка главного конфига, 
		# в нем хранится информация о том какой регион и какую тему оформления нужно загрузить

		# другие настройки

		settings: ->

			sn = $(this).data 'sn'
			console.log 'conf: ' + 'settings.json' if console?

			$.ajax
				url: 'conf/settings.json'
				async: off
				dataType: 'json'
				success: (s) ->
					if s?
						$.extend sn.settings, s
						sn.settings.enable = on
						sn.conf.settings = on
					
					$(this).data 'sn', sn

	# инициализация

	$.fn.snConf = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

