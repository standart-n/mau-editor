$ ->

	# интерфейс для AJAX-запросов
	$this =

		# делаем запрос к серверу для авторизации
		signin: (callback) ->

			$.ajax 
				url: 'index.php'
				type: 'GET'
				data:
					action: 'signin'
					login: $('#signin-login').val()
					password: $('#signin-password').val()
				dataType: 'json'
				success: (s) ->
					#console.info s if console?
					if s?
						callback(s) if callback?
				
				error: (XMLHttpRequest, textStatus, error) ->
					console.log XMLHttpRequest, textStatus, error if console?




	$.fn.snUsersAjax = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


