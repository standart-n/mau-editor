$ ->

	$this =

		# триггер внутри балуна на кнопку сохранить
		save: (event) ->

			_this = this
			placemark = event.get('target')
			map = placemark.getMap()
			uuid = placemark.properties.get('uuid').toString()

			if placemark? and uuid?

				# триггер на сохранение данных внутри метки
				$('.mark-save-link').on 'click', (e) ->
					e.preventDefault()
					# т.к. внутри полей широта и долгота данные могли измениться
					# то берем их оттуда и устанавливаем для метки эти координаты
					placemark.geometry.setCoordinates $(_this).snMapsFn('coordinates')

					# т.к. поменялись координаты, то сменился и адрес - делаем геокодирование
					$(_this).snMapsFn 'street', $(this).snMapsFn('coordinates')


					# возможно сменился тип объекта и нужно будет сменить иконку
					placemark.options.set 'preset', $(_this).snMapsFn('preset')

					# отправляем все данные на сервер
					$(_this).snMapsAjax 'saveMark', uuid, $(_this).snMapsFn('data'), (res) ->
						if !res
							alert 'К сожалению, не удалось сохранить метку'

		
		# триггер на кнопку удалить внутри балуна
		delete: (event) ->

			_this = this
			placemark = event.get('target')
			map = placemark.getMap()
			uuid = placemark.properties.get('uuid').toString()

			if map? and placemark? and uuid?

				# вешаем триггер на кнопку удаления метки
				$('.mark-delete-link').on 'click', (e) ->

					e.preventDefault()
					# вызываем модальное окно
					$('#modal-deletemark').modal()
					# убираем с кнопок предыдущие триггеры
					$('.deletemark-delete-link').off 'click'
					# ставим новый триггер с новыми координатами
					$('.deletemark-delete-link').on 'click', (e) ->

						e.preventDefault()
						# если пользователь ответил положительно
						if $(this).data('answer') is 'yes'

							# делаем запрос к серверу на удаление
							$(_this).snMapsAjax 'removeMark', uuid, (res) ->
								if res
									# при успехе удаляем метку с карты
									map.geoObjects.remove(placemark)
								else
									alert 'К сожалению, не удалось удалить метку'


		# триггер внутри балуна на кнопку Создать
		create: (event) ->

			_this = this
			map = event.get('target')

			if ymaps? and map?

				$('.mark-create-link').on 'click', (e) ->
					e.preventDefault()
					# отправляем все данные на сервер
					$(_this).snMapsAjax 'createMark', $(_this).snMapsFn('data'), (res) ->
						# если пришел положительный ответ
						if res
							# создаем метку
							placemark = $(_this).snMapsPlacemark ymaps, res
							# добавляем ее на карту
							map.geoObjects.add(placemark)
						else 
							alert 'К сожалению, не удалось создать метку'

	
		# триггер внутри балуна на кнопки которые его закрывают
		close: (balloon) ->

			if balloon?
				$('.balloon-close').on 'click', (e) ->
					e.preventDefault()
					balloon.close()


				


	$.fn.snMapsTriggers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


