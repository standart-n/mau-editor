$ ->

	$this =
		init: (options = {}) ->

			$(this).snUsersTriggers 'signinFormSubmit'

		afterSignin: (res = {}) ->
			if res.signin
				if res.signin.login? and res.signin.hash?
					window.user = 
						login: res.signin.login
						hash: res.signin.hash

		exit: () ->
			window.user = {} if window.user?
			


	$.fn.snUsers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments


