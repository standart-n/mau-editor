###
Набор полезных функций
###

$ ->

	$this =
		datepicker: () ->
			$('#dp1').datepicker()
			$('#dp2').datepicker()
			$('#dp3').datepicker()


		date: () ->
			now = new Date()
			year = now.getFullYear().toString()
			if now.getMonth() + 1 < 10 	then month = '0' + (now.getMonth() + 1).toString() 	else month = (now.getMonth() + 1).toString()
			if now.getDate() < 10 		then day = '0' + now.getDate().toString() 			else day = now.getDate().toString()
			"#{day}.#{month}.#{year}"

		data: () ->
			agent: 			$('#agent').val()
			info: 			$('#info').val()
			date1: 			$('#date1').val()
			date2: 			$('#date2').val()
			date3: 			$('#date3').val()
			lat:			$this.lat()
			lon:			$this.lon()
			vid:			if $('.vid_0').hasClass('active') then 0 else 1

		coordinates: () ->
			[ 
				$this.lat() 
				$this.lon()
			]

		lat: () ->
			parseFloat($('#lat').val().toString().replace(",","."))

		lon: () ->
			parseFloat($('#lon').val().toString().replace(",","."))

		preset: (point) ->
			if point?.VID_ID?
				if point.VID_ID is '0' then 'twirl#workshopIcon' else 'twirl#turnRightIcon'
			else
				if $('.vid_0').hasClass('active') then 'twirl#workshopIcon' else 'twirl#turnRightIcon'

		draggable: (point) ->
			if point?
				if point.USER_ID?.toString() is window.user?.id?.toString() then on else false

		street: (ymaps, coordinates) ->
			if ymaps? and coordinates?
				coder = ymaps.geocode coordinates,
					json: on
					kind: 'house'
					results: 1
				coder.then (res) ->
					# console.log res if console?
					if res?.GeoObjectCollection?.featureMember[0]?
						obj = res.GeoObjectCollection.featureMember[0]
						if obj?.GeoObject?.name? 
							street = obj.GeoObject.name
					if res?.GeoObjectCollection?.metaDataProperty?.GeocoderResponseMetaData?.request?
						pos = res.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request.toString().split(',')
					if pos? and street?
						$(this).snMapsAjax 'editStreet', street, pos

		size: (placemark, s) ->
			if placemark? and s?
				size = s.toString().split('x')
				if size[0]? and size[1]?
					placemark.options.set 'balloonMinWidth', parseInt(size[0])
					placemark.options.set 'balloonMinHeight', parseInt(size[1])

		header: (res = {}, type) ->
			if type?
				switch type
					when "create"
						new EJS(url: 'view/balloonHeaderCreate.html', ext: '.html', type: '[', cache: off).render(res)
					when "editor"
						new EJS(url: 'view/balloonHeaderEditor.html', ext: '.html', type: '[', cache: off).render(res)
			else
				new EJS(url: 'view/balloonHeader.html', ext: '.html', type: '[', cache: off).render(res)


		body: (res = {}, type) ->
			if type?
				switch type
					when "create"
						new EJS(url: 'view/balloonContentCreate.html', ext: '.html', type: '[', cache: off).render(res)
					when "editor"
						new EJS(url: 'view/balloonContentEditor.html', ext: '.html', type: '[', cache: off).render(res)
			else
				new EJS(url: 'view/balloonContent.html', ext: '.html', type: '[', cache: off).render(res)

		typeahead: (res) ->
			if res.agents?
				$('#agent').typeahead
					# в качестве источника указываем данные которые пришли от сервера
					source: res.agents

					
				



	# инициализация
	$.fn.snMapsFn = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1

