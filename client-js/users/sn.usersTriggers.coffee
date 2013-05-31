$ ->

	$this =
		signinFormSubmit: (options = {}) ->

			_this = this

			$('#signin-form').on 'submit', (e) ->
				e.preventDefault()
				$('.signin-alert').hide()

				$(_this).snUsersAjax 'signin', (res) ->
					if res.signin?						
						$(_this).snUsers 'afterSignin', res
						if res.signin
							$('#signin-form').hide()
							$('.signin-exit-link').parent('li').show()
							$('.signin-enter-link').parent('li').hide()
							$('.signin-alert-success').show()
							setTimeout () ->
								$('#modal-signin').modal('hide')
							, 500

						else
							$('.signin-alert-error').show()
							$('#signin-password').val('')

			$('.signin-enter-link').on 'click', (e) ->
				e.preventDefault()
				$('#signin-login').val('')
				$('#signin-password').val('')
				$('.signin-alert').hide()


			$('.signin-exit-link').on 'click', (e) ->
				e.preventDefault()
				$('.signin-exit-link').parent('li').hide()
				$('.signin-enter-link').parent('li').show()
				$('#signin-form').show()
				$('.signin-alert').hide()
				$('#signin-password').val('')

				$(_this).snUsers 'exit'




				


	$.fn.snUsersTriggers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


