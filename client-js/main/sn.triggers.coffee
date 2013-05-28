$ ->

	$this =
		init: (options = {}) ->


		spoiler: () ->

			console.log 'trigger: ' + 'spoiler' if console?


			$(this).find('.spoiler-caption').on 'click', (e) ->

				e.preventDefault()

				if $(this).hasClass('spoiler-open')
					$(this)
						.removeClass('spoiler-open')
						.addClass('spoiler-close')
				else
					$(this)
						.removeClass('spoiler-close')
						.addClass('spoiler-open')

				$(this).parent('.spoiler').children('.spoiler-body').each () ->
					if $(this).hasClass('spoiler-open')
						$(this)
							.removeClass('spoiler-open')
							.addClass('spoiler-close')
							.hide()
					else
						$(this)
							.removeClass('spoiler-close')
							.addClass('spoiler-open')
							.show()


	$.fn.snTriggers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

