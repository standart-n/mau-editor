###
Работа с картой
###

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

				placemarks = []									# массив меток


				# событие при клике на карту для создания новой метки
				map.events.add 'click', (event) ->

					# если пользователь авторизован
					if window.user?.id? and window.user?.login? and window.user?.hash?

						# если балун не открыт
						if !map.balloon.isOpen()

							# запрос на получение списка исполнителей для typeahead
							$(_this).snMapsAjax 'getAgents', (res) ->

								# берем дату, чтобы подставить ее в datepicker, который будет 
								# незаполнен значением
								res.date = $(_this).snMapsFn 'date'

								# вычисляем координаты клика
								res.coordinates = event.get 'coordPosition'

								# рендерим нужный шаблон и загружаем его в балун
								# при этом открываем сам балун
								map.balloon.open res.coordinates,
									contentHeader: $(_this).snMapsFn 'header', res, 'create'
									contentBody: $(_this).snMapsFn 'body', res, 'create'

								# активируем инпуты с выбором даты через календарь
								$(_this).snMapsFn 'datepicker'

								# активируем typeahead при заполнении поля исполнитель
								$(_this).snMapsFn 'typeahead', res

								# триггер на кнопку "создать метку"
								$(_this).snMapsTriggers 'create', event

								# триггер на закрытие балуна
								$(_this).snMapsTriggers 'close', map.balloon

						else
							map.balloon.close()



				# берем с сервера точки и выводим их
				$(_this).snMapsAjax 'getPoints', (points) ->

					# цикл по всем точкам
					for i, point of points 

						# если заполнены координаты
						if point.POINT?	

							# геокодирование улицы, на которой расположена метка
							if !point.STREET? or !point.STREET
								$(_this).snMapsFn 'street', $(_this).snMapsPlacemark('coordinates',point)

														
							# создаем метку
							placemarks[i] = $(_this).snMapsPlacemark ymaps, point

							# добавляем объекты на карты в обход кластеризатора
							# чтобы была возможность очень просто удалить любую метку
							map.geoObjects.add(placemarks[i])



	# инициализация
	$.fn.snMaps = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments



