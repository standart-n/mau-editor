###
Скрипт который создает и возвращает метку
###

$ ->

	$this =

		init: (ymaps, point) ->

			_this = this

			# создаем объект с необходимой географией и настройкой
			placemark = new ymaps.Placemark $this.coordinates(point), $this.properties(point), $this.options(point)

			# триггер на открытие балуна
			placemark = $this.onBalloonOpen(placemark)
			# триггер на конец перетаскивания
			placemark = $this.onDragEnd(placemark)

			# возвращаем этот объект
			placemark



		coordinates: (point) ->

			# парсинг координат из текстовых данных
			coords = point.POINT.toString().replace(/[\s\[\]]/g,'')
			coordinates = [								
				coords.replace(/^(.*)\,(.*)$/, '$1') # ширина
				coords.replace(/^(.*)\,(.*)$/, '$2') # долгота
			]


		properties: (point) ->

			# заголовок подсказки на метке
			hintContent: if point.PLAN_PERIOD_END? then "до <b>#{point.PLAN_PERIOD_END.toString()}</b>"
			# заголовок балуна
			balloonContentHeader: "<div>#{point.SVID}</div>"
			# содержимое балуна
			balloonContentBody: ""
			# записываем uuid
			uuid: point.D$UUID.toString()

		options: (point) ->

			# ширина балуна
			balloonMinWidth: 350
			# высота балуна
			balloonMinHeight: 200
			# иконка метки
			preset: if point.VID_ID is '0' then 'twirl#workshopIcon' else 'twirl#turnRightIcon'
			# если пользователь авторизован и данная метка создана им самим
			# то делаем возможность перетаскивать эту метку
			draggable: if point.USER_ID?.toString() is window.user?.id?.toString() then on else false

		onBalloonOpen: (placemark) ->

			_this = this
			# добавляем триггер на открытие балуна
			placemark.events.add 'balloonopen', (e) ->
				
				placemark = e.get('target')
				balloon = e.get('balloon')
				map = placemark.getMap()
				uuid = placemark.properties.get('uuid').toString()

				# ajax запрос, который вернет нам данные для отображения их внутри балуна
				$(_this).snMapsAjax 'getBalloonContent', uuid, (res) ->

					
					# если пользователь авторизован и данная метка создана им самим
					if res.signin and window.user?.id?.toString() is res.content?.USER_ID?.toString()
						# берем координаты метки чтобы потом заполнить ими поля широта и долгота
						res.coordinates = $this.coordinates res.content
						# увеличиваем размер балуна, чтобы туда все поместилось
						placemark.options.set 'balloonMinWidth', 500
						placemark.options.set 'balloonMinHeight', 400
						# рендерим нужный шаблон и загружаем его в балун
						placemark.properties.set 'balloonContentBody',
							new EJS(url: 'view/balloonContentEditor.html', ext: '.html', type: '[', cache: on).render(res)
						# активируем инпуты с выбором даты через календарь
						$('#dp1').datepicker()
						$('#dp2').datepicker()
						$('#dp3').datepicker()
						# активируем typeahead при заполнении поля исполнитель
						if res.agents?
							$('#agent').typeahead
								# в качестве источника указываем данные которые пришли от сервера
								source: res.agents

						# вешаем триггер на кнопку удаления метки
						$('.mark-delete-link').on 'click', (e) ->
							e.preventDefault()
							# делаем запрос к серверу на удаление
							$(_this).snMapsAjax 'removeMark', uuid, (response) ->
								if response
									# при успехе удаляем метку с карты
									map.geoObjects.remove(placemark)
								else
									alert 'К сожалению, не удалось удалить метку'
							# map.destroy()

						# триггер на сохранение данных внутри метки
						$('.mark-save-link').on 'click', (e) ->							
							e.preventDefault()
							# т.к. внутри полей широта и долгота данные могли измениться
							# то берем их оттуда и устанавливаем для метки эти координаты
							coordinates = [
								$('#lat').val()
								$('#lon').val()
							]
							placemark.geometry.setCoordinates coordinates
							# отправляем все данные на сервер
							$(_this).snMapsAjax 'saveMark', uuid, 
								agent: 			$('#agent').val()
								info: 			$('#info').val()
								date1: 			$('#date1').val()
								date2: 			$('#date2').val() 
								lat:			$('#lat').val()
								lon:			$('#lon').val()
							, (response) ->
								if !response
									alert 'К сожалению, не удалось сохранить метку'

						# триггер на закрытие балуна
						# все ссылки у которых есть класс .ballon-close 
						# закрывают балун
						$('.balloon-close').on 'click', (e) ->
							e.preventDefault()
							balloon.close()
							#placemark.

					else
						# если пользователь не авторизован или эта метка не его
						# то рендерим обычный шаблон с информацией и показываем внутри балуна
						placemark.properties.set 'balloonContentBody',
							new EJS(url: 'view/balloonContent.html', ext: '.html', type: '[', cache: on).render(res)

			# возвращаем объект с меткой
			placemark


		# триггер на окончание перетаскивания
		onDragEnd: (placemark) ->

			_this = this

			placemark.events.add 'dragend', (e) ->

				# берем новые координаты и отправляем их на сервер				
				placemark = e.get 'target'
				coordinates = placemark.geometry.getCoordinates()
				console.info coordinates if coordinates?
				uuid = placemark.properties.get('uuid').toString()
				$(_this).snMapsAjax 'dragMark', uuid, coordinates

			placemark


	# инициализация
	$.fn.snMapsPlacemark = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

