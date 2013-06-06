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

				clusterer = new ymaps.Clusterer()				# создаем кластеризатор
				placemarks = []									# массив меток


				# событие при клике на карту для создания новой метки
				map.events.add 'click', (event) ->


					###
					map.geoObjects.each (clusterer) ->
						# console.log clusterer.options.get('uuid') if console?
						clusterer.each (obj) ->
							console.log obj.options.get('hasBalloon') if console?
							#console.log obj.properties.get('uuid') if console?
					###

					# если балун не открыт
					if !map.balloon.isOpen()

						$(_this).snMapsAjax 'getAgents', (res) ->

							# берем дату, чтобы подставить ее в datepicker, который будет 
							# незаполнен значением
							now = new Date()
							year = now.getFullYear().toString()
							if now.getMonth() + 1 < 10 	then month = '0' + (now.getMonth() + 1).toString() 	else month = (now.getMonth() + 1).toString()
							if now.getDate() < 10 		then day = '0' + now.getDate().toString() 			else day = now.getDate().toString()
							res.date = "#{day}.#{month}.#{year}"

							# вычисляем координаты клика
							res.coordinates = event.get 'coordPosition'

							# рендерим нужный шаблон и загружаем его в балун
							map.balloon.open res.coordinates,
								contentHeader: new EJS(url: 'view/balloonHeaderCreate.html', ext: '.html', type: '[', cache: off).render(res)
								contentBody: new EJS(url: 'view/balloonContentCreate.html', ext: '.html', type: '[', cache: off).render(res)

							# активируем инпуты с выбором даты через календарь
							$('#dp1').datepicker()
							$('#dp2').datepicker()
							$('#dp3').datepicker()

							# активируем typeahead при заполнении поля исполнитель
							if res.agents?
								$('#agent').typeahead
									# в качестве источника указываем данные которые пришли от сервера
									source: res.agents

							$('.mark-create-link').on 'click', (e) ->
								e.preventDefault()
								coordinates = [
									parseFloat($('#lat').val().toString().replace(",","."))
									parseFloat($('#lon').val().toString().replace(",","."))
								]
								# отправляем все данные на сервер
								$(_this).snMapsAjax 'createMark',
									agent: 			$('#agent').val()
									info: 			$('#info').val()
									date1: 			$('#date1').val()
									date2: 			$('#date2').val()
									date3: 			$('#date3').val()
									lat:			coordinates[0]
									lon:			coordinates[1]
									vid:			if $('.vid_0').hasClass('active') then 0 else 1
								, (res) ->
									# если пришел положительный ответ
									if res
										# создаем метку
										placemark = $(_this).snMapsPlacemark ymaps, res
										# добавляем ее на карту
										map.geoObjects.add(placemark)
									else 
										alert 'К сожалению, не удалось создать метку'

							$('.balloon-close').on 'click', (e) ->
								e.preventDefault()
								map.balloon.close()


					else
						map.balloon.close()



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

					###
					# заполняем кластеризатор метками
					clusterer.add placemarks

					# настройки кластеризатора
					clusterer.options.set
						uuid: 'fff'
						gridSize: 100			# Размер ячейки кластера в пикселях. 
						maxZoom: 16				# Максимальный коэффициент масштабирования карты, на котором происходит кластеризация объектов.
						minClusterSize: 2 		# Минимальное количество объектов, образующих кластер.
					
					# добавляем кластеризатор на карту
					map.geoObjects.add(clusterer)
					###




	# инициализация
	$.fn.snMaps = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments



