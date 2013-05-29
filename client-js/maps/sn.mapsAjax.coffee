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
						action: 'getBalloonContent'
						uuid: uuid
						login: if window.user?.login? then window.user.login else ""
						hash: if window.user?.hash? then window.user.hash else ""
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.content? and s.signin?
							callback(s.content, s.signin) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


	$.fn.snMapsAjax = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


