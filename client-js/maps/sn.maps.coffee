$ ->

	$this =
		init: (options = {}) ->

			_this = $(this)

			# ждем когда загрузятся яндекс.карты
			ymaps.ready () ->

				# создаем объект с картой
				map = new ymaps.Map 'map',					
					center: [56.840001, 53.239778]				# по центру - ижевск					
					zoom: 12									# начальное приближение
					behaviors: ['default', 'scrollZoom']		# возможность зуммировать мышью

				map.options.set 'scrollZoomSpeed', 4 			# скорость зума

				# стандартные инструменты на карте
				map.controls.add 'zoomControl'					# шкала зума
				map.controls.add 'typeSelector'					# переключение на спутник / гибрид
				map.controls.add 'mapTools'						# стандартные инструменты

				# берем с сервера точки и выводим их
				$(_this).snMapsAjax 'getPoints', (points) ->

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
									balloonContentHeader: "<div class=\"balloonContentHeader\" data-id=\"#{point.D$UUID}\">#{point.SVID}</div>"
									# содержимое балуна
									balloonContentBody: "<div class=\"balloonContentBody\" data-id=\"#{point.D$UUID}\"></div>"
									# записываем uuid
									uuid: point.D$UUID.toString()
								)
								(
									# ширина балуна
									balloonMinWidth: 350
									# высота балуна
									balloonMinHeight: 200
									# иконка метки
									preset: if point.VID_ID is '0' then 'twirl#workshopIcon' else 'twirl#turnRightIcon'
								)

							placemarks[i].events.add 'balloonopen', (e) ->

								placemark = e.get('target')
								uuid = placemark.properties.get('uuid').toString()

								$(_this).snMapsAjax 'getBalloonContent', uuid, (balloon, signin) ->

									if signin
										placemark.options.set 'balloonMinWidth', 500
										placemark.properties.set 'balloonContentBody',
											$(_this).snMapsBalloon('getBalloonContentEditor', balloon)
										# placemark.properties.set 'balloonContentFooter',
										# 	$(_this).snMapsBalloon('getBalloonFooterEditor')

									else
										placemark.properties.set 'balloonContentBody',
											$(_this).snMapsBalloon('getBalloonContent', balloon)






						# console.warn 'point', point.POINT if console?
						# console.warn 'xy', coordinates if console?
						# console.warn 'vid_id', point.VID_ID if console?
						# console.warn 'svid', point.SVID if console?

					# console.warn 'placemarks', placemarks if console?

					# заполняем кластер метками
					clusterer.add placemarks

					# настройки кластера
					clusterer.options.set
						gridSize: 100			# Размер ячейки кластера в пикселях. 
						maxZoom: 16				# Максимальный коэффициент масштабирования карты, на котором происходит кластеризация объектов.
						minClusterSize: 2 		# Минимальное количество объектов, образующих кластер.
					
					# добавляем кластер на карту
					map.geoObjects.add(clusterer)





	$.fn.snMaps = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments


