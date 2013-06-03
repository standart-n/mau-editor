$ ->

	$this =
		init: (options = {}) ->

			$(this).snUsersTriggers 'signinFormSubmit'

		afterSignin: (res = {}) ->
			if res.signin
				if res.signin.id? and res.signin.login? and res.signin.hash?
					window.user = 
						id: 		res.signin.id
						login: 		res.signin.login
						hash: 		res.signin.hash
					$.cookie 'user_id', 	res.signin.id, 		expires: 365
					$.cookie 'user_login', 	res.signin.login, 	expires: 365
					$.cookie 'user_hash', 	res.signin.hash,  	expires: 365


		exit: () ->
			window.user = {} if window.user?
			$.removeCookie 'user_id'
			$.removeCookie 'user_login'
			$.removeCookie 'user_hash'
			


	$.fn.snUsers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments


