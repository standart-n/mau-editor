$ ->

	$this =

		init: (ymaps, point) ->

			_this = this

			placemark = new ymaps.Placemark $this.coordinates(point), $this.properties(point), $this.options(point)

			placemark = $this.onBalloonOpen(placemark)

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
			balloonContentHeader: "<div class=\"balloonContentHeader\" data-id=\"#{point.D$UUID}\">#{point.SVID}</div>"
			# содержимое балуна
			balloonContentBody: "<div class=\"balloonContentBody\" data-id=\"#{point.D$UUID}\"></div>"
			# записываем uuid
			uuid: point.D$UUID.toString()

		options: (point) ->

			# ширина балуна
			balloonMinWidth: 350
			# высота балуна
			balloonMinHeight: 200
			# иконка метки
			preset: if point.VID_ID is '0' then 'twirl#workshopIcon' else 'twirl#turnRightIcon'

		onBalloonOpen: (placemark) ->

			_this = this

			placemark.events.add 'balloonopen', (e) ->

				placemark = e.get('target')
				balloon = e.get('balloon')
				map = placemark.getMap()
				uuid = placemark.properties.get('uuid').toString()

				$(_this).snMapsAjax 'getBalloonContent', uuid, (res) ->

					if res.signin and window.user?.id?.toString() is res.content?.USER_ID?.toString()
						placemark.options.set 'balloonMinWidth', 500
						placemark.options.set 'balloonMinHeight', 300
						placemark.properties.set 'balloonContentBody',
							new EJS(url: 'view/balloonContentEditor.html', ext: '.html', type: '[', cache: off).render(res)
						$('#dp1').datepicker()
						$('#dp2').datepicker()

						$('.mark-delete-link').on 'click', (e) ->
							e.preventDefault()
							$(_this).snMapsAjax 'removeMark', uuid, (response) ->
								if response
									map.geoObjects.remove(placemark)
								else
									alert 'К сожалению, не удалось удалить метку'
							# map.destroy()

						$('.mark-save-link').on 'click', (e) ->
							e.preventDefault()
							# alert $('#agent').val()
							# alert $('#date1').val()
							$(_this).snMapsAjax 'saveMark', uuid, 
								agent: 			$('#agent').val()
								info: 			$('#info').val()
								date1: 			$('#date1').val()
								date2: 			$('#date2').val() 
							, (response) ->
								if !response
									alert 'К сожалению, не удалось сохранить метку'


						$('.balloon-close').on 'click', (e) ->
							e.preventDefault()
							balloon.close()
							#placemark.

					else
						placemark.properties.set 'balloonContentBody',
							new EJS(url: 'view/balloonContent.html', ext: '.html', type: '[', cache: off).render(res)

			placemark




	$.fn.snMapsPlacemark = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

