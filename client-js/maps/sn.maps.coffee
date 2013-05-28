$ ->

	$this =
		init: (options = {}) ->
			_this = this
			console.log 'maps' if console?
			$(this).on 'click', (levels) ->
				# if levels.one[1] is 'autoload'
				# 	$(_this).snMaps 'autoload'
					# switch levels.two
					# 	when 'signin'
					# 		$(_this).snSignin()
					# 	when 'help'
					# 		$(_this).snSignin 'help'

		loadMap: () ->

			# ждем когда загрузятся яндекс.карты
			ymaps.ready () ->

				# создаем объект с картой
				map = new ymaps.Map 'map',					
					center: [56.840001, 53.239778]				# по центру - ижевск					
					zoom: 12									# начальное приближение
					behaviors: ['default', 'scrollZoom']		# возможность зуммировать мышью

				map.options.set 'scrollZoomSpeed', 1 			# скорость зума

				# стандартные инструменты на карте
				map.controls.add 'zoomControl'
				map.controls.add 'typeSelector'
				map.controls.add 'mapTools'

				# берем с сервера точки и выводим их
				$this.getPoints (points) ->

					clusterer = new ymaps.Clusterer()			# создаем кластер
					placemarks = []								# массив меток

					# цикл по всем точкам
					for i, point of points 

						# если заполнены координаты
						if point.POINT?  
	
							# парсинг координат из текстовых данных
							coords = point.POINT.toString().replace(/[\s\[\]]/g,'')
							coordinates = [								
								coords.replace(/^(.*)\,(.*)$/, '$1') # ширина								
								coords.replace(/^(.*)\,(.*)$/, '$2') # долгота
							]
														
							# создаем метку
							placemarks[i] = new ymaps.Placemark coordinates,
								(
									# заголовок подсказки на метке
									hintContent: if point.PLAN_PERIOD_END? then "до <b>#{point.PLAN_PERIOD_END.toString()}</b>"
									# заголовок балуна
									balloonContentHeader: 'Перекоп'
									# содержимое балуна
									balloonContentBody: "<div id=\"#{point.D$UUID}\"></div>"
								)
								(
									# ширина балуна
									balloonMinWidth:760
									# высота балуна
									balloonMinHeight:320
									# иконка метки
									preset: if point.VID_ID is '0' then 'twirl#workshopIcon' else 'twirl#turnRightIcon'
								)


						#console.warn 'point', point.POINT if console?
						#console.warn 'xy', coordinates if console?
						console.warn 'vid_id', point.VID_ID if console?

					console.warn 'placemarks', placemarks if console?

					# заполняем кластер метками
					clusterer.add placemarks

					# настройки кластера
					clusterer.options.set
						gridSize: 100
						maxZoom: 16
						minClusterSize: 2
					
					# добавляем кластер на карту
					map.geoObjects.add(clusterer)



		# делаем запрос к серверу за точками
		getPoints: (callback) ->

			$.ajax 
				url: 'index.php'
				type:'GET'
				data:
					action: 'getPoints'
				dataType: 'json'
				success: (s) ->
					console.info s if console?
					if s.points?
						callback(s.points) if callback?

				
				error: (XMLHttpRequest, textStatus, error) ->
					console.log XMLHttpRequest, textStatus, error if console?


	$.fn.snMaps = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

	$('#sn').snMaps()

