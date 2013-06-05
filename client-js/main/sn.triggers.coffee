###
Триггеры в приложении
###

$ ->

	$this =
		init: (options = {}) ->




	$.fn.snTriggers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1
		else 
			$this.init.apply @, arguments

