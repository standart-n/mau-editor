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
					dataType: 'json'
					success: (s) ->
						# console.info s if console?
						if s.content?
							callback(s.content) if callback?
	
					error: (XMLHttpRequest, textStatus, error) ->
						console.log XMLHttpRequest, textStatus, error if console?


	$.fn.snMapsAjax = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


