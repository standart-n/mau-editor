$ ->

	# интерфейс для AJAX-запросов
	$this =

		# делаем запрос к серверу, чтобы взять содержимое балуна
		getBalloonContent: (point) ->

			"""
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">Исполнитель:</label>
					<label class="control-label">#{point.SAGENT}</label>
				</div>
				<div class="control-group">
					<label class="control-label">Дата начала:</label>
					<label class="control-label">#{point.PERIOD_BEG}</label>
				</div>
				<div class="control-group">
					<label class="control-label">План дата закр.:</label>
					<label class="control-label">#{point.PLAN_PERIOD_END}</label>
				</div>
			</form>
			"""


	$.fn.snMapsBalloon = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


