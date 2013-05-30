$ ->

	$this =
		#


				


	$.fn.snMapsTriggers = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


