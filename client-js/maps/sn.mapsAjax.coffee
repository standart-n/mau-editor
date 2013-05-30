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
						id: 			if window.user?.id? then window.user.id else ""
						login: 			if window.user?.login? then window.user.login else ""
						hash: 			if window.user?.hash? then window.user.hash else ""
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.content? and s.signin?
							callback(s.content, s.signin) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


		# делаем запрос к серверу, чтобы создать новую метку
		addNewMark: (coordinates, vid_id, callback) ->

			if coordinates? and vid_id? and window.user?.id? and window.user?.login? and window.user?.hash?
				$.ajax
					url: 'index.php'
					type: 'GET'
					data:						
						action: 		'addNewMark'
						lat: 			coordinates[0]
						lon: 			coordinates[1]
						userid: 		window.user.id
						login: 			window.user.login
						hash: 			window.user.hash
						vid: 			vid_id
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.res?
							callback(s.res) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


	$.fn.snMapsAjax = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


