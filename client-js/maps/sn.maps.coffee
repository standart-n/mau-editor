$ ->

	$this =
		init: (options = {}) ->

			_this = this

			#триггеры на добавление нового перекопа или объезда
			#$(this).snMapsTriggers '	addNewMark'

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

				# событие при клике на карту для создания новой метки
				map.events.add 'click', (event) ->

					# проверяем есть ли данные об авторизации пользователя
					if window.user?.id? and window.user?.login? and window.user?.hash?
					
						# вычисляем координаты клика
						coordinates = event.get 'coordPosition'
						# берем объект с картой
						map = event.get('target')

						# m.geoObjects.add(mark)	

						# вызываем модальное окно с предложением создать новую метку
						$('#modal-newmark').modal()
						# убираем с кнопок предыдущие триггеры
						$('.newmark-add-link').off 'click'
						# ставим новый триггер с новыми координатами
						$('.newmark-add-link').on 'click', (e) ->
							e.preventDefault()

							# делаем запрос к базе с целью создания метки
							$(_this).snMapsAjax 'addNewMark', coordinates, $(this).data('vid'), (res) ->
								# если пришел положительный ответ
								if res
									console.info 'add', res if console?
									# создаем метку
									placemark = $(_this).snMapsPlacemark ymaps, res
									# добавляем ее на карту
									map.geoObjects.add(placemark)
								else
									alert 'К сожалению, не удалось добавить метку на карту'


				# берем с сервера точки и выводим их
				$(_this).snMapsAjax 'getPoints', (points) ->

					# цикл по всем точкам
					for i, point of points 

						# если заполнены координаты
						if point.POINT?	
														
							# создаем метку
							placemarks[i] = $(_this).snMapsPlacemark ymaps, point

							# добавляем объекты на карты в обход кластеризатора
							# чтобы была возможность очень просто удалить любую метку
							map.geoObjects.add(placemarks[i])


					# заполняем кластеризатор метками
					#clusterer.add placemarks

					# настройки кластеризатора
					clusterer.options.set
						gridSize: 100			# Размер ячейки кластера в пикселях. 
						maxZoom: 16				# Максимальный коэффициент масштабирования карты, на котором происходит кластеризация объектов.
						minClusterSize: 2 		# Минимальное количество объектов, образующих кластер.
					
					# добавляем кластеризатор на карту
					#map.geoObjects.add(clusterer)





	$.fn.snMaps = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments


