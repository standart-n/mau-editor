$ ->

	$this =

		init: (ymaps, point) ->

			_this = this

			placemark = new ymaps.Placemark $this.coordinates(point), $this.properties(point), $this.options(point)

			placemark.events.add 'balloonopen', (e) ->

				placemark = e.get('target')
				uuid = placemark.properties.get('uuid').toString()

				$(_this).snMapsAjax 'getBalloonContent', uuid, (balloon, signin) ->

					if signin
						placemark.options.set 'balloonMinWidth', 500
						placemark.properties.set 'balloonContentBody',
							$(_this).snMapsBalloon('getBalloonContentEditor', balloon)
						$('#dp1').datepicker()

					else
						placemark.properties.set 'balloonContentBody',
							new EJS(url: 'view/balloonContent.html', ext: '.html').render(balloon)
							#$(_this).snMapsBalloon('getBalloonContent', balloon)

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





	$.fn.snMapsPlacemark = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

