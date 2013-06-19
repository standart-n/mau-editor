$ ->

	# интерфейс для AJAX-запросов
	$this =

		# делаем запрос к серверу за точками
		getPoints: (callback) ->

			$.ajax 
				url: 'index.php'
				type: 'GET'
				data:
					action: 'getPoints'
				dataType: 'json'
				success: (s) ->
					# console.info s if console?
					if s.points?
						callback(s.points) if callback?
				
				error: (XMLHttpRequest, textStatus, error) ->
					console.log XMLHttpRequest, textStatus, error if console?


		# делаем запрос к серверу, чтобы взять содержимое балуна
		getBalloonContent: (uuid, callback) ->

			if uuid?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:						
						action: 		'getBalloonContent'
						uuid: 			uuid
						userid: 		if window.user?.id? 	then window.user.id 	else ''
						login: 			if window.user?.login? 	then window.user.login 	else ''
						hash: 			if window.user?.hash? 	then window.user.hash 	else ''
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.content? and s.signin?
							callback(s) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


		# делаем запрос к серверу, чтобы создать новую метку
		addNewMark: (coordinates, vid_id, callback) ->

			if coordinates? and vid_id?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:						
						action: 		'addNewMark'
						lat: 			coordinates[0]
						lon: 			coordinates[1]
						vid: 			vid_id
						userid: 		if window.user?.id? 	then window.user.id 	else ''
						login: 			if window.user?.login? 	then window.user.login 	else ''
						hash: 			if window.user?.hash? 	then window.user.hash 	else ''
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


		# запрос на удаление метки
		removeMark: (uuid, callback) ->

			if uuid?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:						
						action: 		'removeMark'
						uuid: 			uuid
						userid: 		if window.user?.id? 	then window.user.id 	else ''
						login: 			if window.user?.login? 	then window.user.login 	else ''
						hash: 			if window.user?.hash? 	then window.user.hash 	else ''
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


		# запрос на сохранение метки
		saveMark: (uuid, values, callback) ->

			if uuid? and values?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:						
						action: 		'saveMark'
						uuid: 			uuid
						agent:			values.agent
						info:			values.info
						date1:			values.date1
						date2:			values.date2
						date3:			values.date3
						lat:			values.lat
						lon:			values.lon
						vid:			values.vid
						userid: 		if window.user?.id? 	then window.user.id 	else ''
						login: 			if window.user?.login? 	then window.user.login 	else ''
						hash: 			if window.user?.hash? 	then window.user.hash 	else ''
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?

		# отправляем на сервер новые координаты метки после перетаскивания
		dragMark: (uuid, coordinates, callback) ->

			if uuid? and coordinates?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:
						action: 		'dragMark'
						uuid:			uuid
						lat: 			coordinates[0]
						lon: 			coordinates[1]
						userid: 		if window.user?.id? 	then window.user.id 	else ''
						login: 			if window.user?.login? 	then window.user.login 	else ''
						hash: 			if window.user?.hash? 	then window.user.hash 	else ''
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?

		# запрос на создание метки сразу с данными
		createMark: (values, callback) ->

			if values?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:						
						action: 		'createMark'
						agent:			values.agent
						info:			values.info
						date1:			values.date1
						date2:			values.date2
						date3:			values.date3
						lat:			values.lat
						lon:			values.lon
						vid:			values.vid
						userid: 		if window.user?.id? 	then window.user.id 	else ''
						login: 			if window.user?.login? 	then window.user.login 	else ''
						hash: 			if window.user?.hash? 	then window.user.hash 	else ''
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?

		# запрос на получение списка исполнителей для typeahead
		getAgents: (callback) ->

			$.ajax
				url: 'index.php'
				type: 'GET'
				data:						
					action: 		'getAgents'
					userid: 		if window.user?.id? 	then window.user.id 	else ''
					login: 			if window.user?.login? 	then window.user.login 	else ''
					hash: 			if window.user?.hash? 	then window.user.hash 	else ''
				dataType: 'json'
				success: (s) ->
					# console.info s if console?
					if s.agents?
						callback(s) if callback?

				error: (XMLHttpRequest, textStatus, error) ->
					console.log XMLHttpRequest, textStatus, error if console?


		# геокодирование улицы, на которой находилась данная метка
		editStreet: (street, coordinates, callback) ->

			if street? and coordinates?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:
						action: 		'editStreet'
						street:			street
						lat: 			coordinates[0]
						lon: 			coordinates[1]
					dataType: 'json'
					success: (s) ->
						console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


	# инициализация
	$.fn.snMapsAjax = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


