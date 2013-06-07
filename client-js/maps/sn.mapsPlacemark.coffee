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
			# триггер на начало перетаскивания
			placemark = $this.onDragStart(placemark)
			# триггер на конец перетаскивания
			placemark = $this.onDragEnd(placemark)

			# возвращаем этот объект
			placemark



		coordinates: (point) ->

			# парсинг координат из текстовых данных
			if point?.POINT?
				point.POINT.toString().replace(/[\s\[\]]/g,'').split(',')



		properties: (point) ->

			# заголовок подсказки на метке
			# hintContent: if point.STREET? and point.STREET then "#{point.STREET}" else "до <b>#{point.PLAN_PERIOD_END.toString()}</b>"
			hintContent: if point.STREET? and point.STREET then "#{point.STREET}" else null
			# заголовок балуна
			#  balloonContentHeader: "<div>#{point.SVID}</div>"
			balloonContentHeader: "<div></div>"
			# содержимое балуна
			balloonContentBody: "<div></div>"
			# записываем uuid
			uuid: point.D$UUID.toString()

		options: (point) ->

			# иконка метки
			preset: $(this).snMapsFn('preset', point)
			# если пользователь авторизован и данная метка создана им самим
			# то делаем возможность перетаскивать эту метку
			draggable: $(this).snMapsFn('draggable', point)

		onBalloonOpen: (placemark) ->

			_this = this
			# добавляем триггер на открытие балуна
			placemark.events.add 'balloonopen', (event) ->
				
				placemark = event.get('target')
				balloon = event.get('balloon')
				map = placemark.getMap()
				uuid = placemark.properties.get('uuid').toString()

				# ajax запрос, который вернет нам данные для отображения их внутри балуна
				$(_this).snMapsAjax 'getBalloonContent', uuid, (res) ->

					
					# если пользователь авторизован и данная метка создана им самим
					if res.signin and window.user?.id?.toString() is res.content?.USER_ID?.toString()
						# берем координаты метки чтобы потом заполнить ими поля широта и долгота
						res.coordinates = $this.coordinates res.content
						# увеличиваем размер балуна, чтобы туда все поместилось
						$(_this).snMapsFn 'size', placemark, '500x400'

						# берем дату, чтобы подставить ее в datepicker, который будет 
						# незаполнен значением
						res.date = $(_this).snMapsFn 'date'

						# рендерим нужный шаблон и загружаем его в балун
						placemark.properties.set 'balloonContentHeader', $(_this).snMapsFn('header', res, 'editor')
						placemark.properties.set 'balloonContentBody', $(_this).snMapsFn('body', res, 'editor')

						# активируем инпуты с выбором даты через календарь
						$(_this).snMapsFn 'datepicker'

						# активируем typeahead при заполнении поля исполнитель
						$(_this).snMapsFn 'typeahead', res

						# вешаем триггер на кнопку удаления метки
						$(_this).snMapsTriggers 'delete', event

						# триггер на сохранение данных внутри метки
						$(_this).snMapsTriggers 'save', event

						# триггер на закрытие балуна
						# все ссылки у которых есть класс .ballon-close 
						# закрывают балун
						$(_this).snMapsTriggers 'close', event

					else

						#размеры балуна
						$(_this).snMapsFn 'size', placemark, '350x200'
						
						# если пользователь не авторизован или эта метка не его
						# то рендерим обычный шаблон с информацией и показываем внутри балуна
						placemark.properties.set 'balloonContentHeader', $(_this).snMapsFn('header', res)
						placemark.properties.set 'balloonContentBody', $(_this).snMapsFn('body', res)

			# возвращаем объект с меткой
			placemark


		# триггер на начало перетаскивания
		onDragStart: (placemark) ->

			_this = this

			placemark.events.add 'dragstart', (e) ->

				# берем текущие координаты и записываем их в параметры объекта
				placemark = e.get 'target'
				coordinates = placemark.geometry.getCoordinates()
				placemark.properties.set 'lastCoordinates', coordinates

			placemark


		# триггер на окончание перетаскивания
		onDragEnd: (placemark) ->

			_this = this

			placemark.events.add 'dragend', (e) ->

				placemark = e.get 'target'

				# вызываем модальное окно
				$('#modal-dragmark').modal()
				# убираем с кнопок предыдущие триггеры
				$('.dragmark-drag-link').off 'click'
				# ставим новый триггер с новыми координатами
				$('.dragmark-drag-link').on 'click', (e) ->

					e.preventDefault()
					# если пользователь ответил положительно
					if $(this).data('answer') is 'yes'

						uuid = placemark.properties.get('uuid').toString()
						# берем новые координаты и отправляем их на сервер				
						coordinates = placemark.geometry.getCoordinates()

						#отправляем новые координаты на сервер
						$(_this).snMapsAjax 'dragMark', uuid, coordinates

						# т.к. поменялись координаты, то сменился и адрес - делаем геокодирование
						$(_this).snMapsFn 'street', ymaps, coordinates

					else

						lastCoordinates = placemark.properties.get('lastCoordinates')
						placemark.geometry.setCoordinates lastCoordinates

			placemark


	# инициализация
	$.fn.snMapsPlacemark = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

