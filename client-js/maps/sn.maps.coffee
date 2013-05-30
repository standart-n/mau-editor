$ ->

	$this =
		init: (options = {}) ->

			_this = this

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

				clusterer = new ymaps.Clusterer()			# создаем кластеризатор
				placemarks = []								# массив меток

				map.events.add 'click', (e) ->
					coordinates = e.get 'coordPosition'
					# m = e.get('target')
					# mark = new ymaps.Placemark coordinates,
					# 	(
					# 		# заголовок подсказки на метке
					# 		hintContent: "1321"
					# 		# заголовок балуна
					# 		balloonContentHeader: "2131"
					# 		# содержимое балуна
					# 		balloonContentBody: "1312"
					# 	)
					# 	(
					# 		# ширина балуна
					# 		balloonMinWidth: 350
					# 		# высота балуна
					# 		balloonMinHeight: 200
					# 	)

					# m.geoObjects.add(mark)	

					$('#modal-newmark').modal
						keyboard: on
						backdrop: off

				# берем с сервера точки и выводим их
				$(_this).snMapsAjax 'getPoints', (points) ->

					# цикл по всем точкам
					for i, point of points 

						# если заполнены координаты
						if point.POINT?	
														
							# создаем метку
							placemarks[i] = $(_this).snMapsPlacemark ymaps, point

					# заполняем кластеризатор метками
					clusterer.add placemarks

					# настройки кластеризатора
					clusterer.options.set
						gridSize: 100			# Размер ячейки кластера в пикселях. 
						maxZoom: 16				# Максимальный коэффициент масштабирования карты, на котором происходит кластеризация объектов.
						minClusterSize: 2 		# Минимальное количество объектов, образующих кластер.
					
					# добавляем кластеризатор на карту
					map.geoObjects.add(clusterer)





	$.fn.snMaps = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments


