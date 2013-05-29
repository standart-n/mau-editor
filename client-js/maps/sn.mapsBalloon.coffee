$ ->

	# интерфейс для AJAX-запросов
	$this =

		# делаем запрос к серверу, чтобы взять содержимое балуна

		getBalloonContent: (point) ->

			"""
				<p>
					<table class="table">
						<tr>
							<td>Исполнитель:</td>
							<td class="text-error">#{point.SAGENT}</td>
						</tr>
						<tr>
							<td>Дата начала:</td>
							<td class="text-error">#{point.PERIOD_BEG}</td>
						</tr>
						<tr>
							<td>План. дата закр.:</td>
							<td class="text-error">#{point.PLAN_PERIOD_END}</td>
						</tr>
					</table>
				</p>
			"""


		getBalloonContentEditor: (point) ->

			"""
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">Исполнитель:</label>
					<label class="controls">
						<select>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</label>
				</div>
				<div class="control-group">
					<label class="control-label">Дата начала:</label>
					<label class="controls">
						<input type="text" placeholder="Введите текст" value="#{point.PERIOD_BEG}">
					</label>
				</div>
				<div class="control-group">
					<label class="control-label">План дата закр.:</label>
					<label class="controls">
						<input type="text" placeholder="Введите текст" value="#{point.PLAN_PERIOD_END}">
					</label>
				</div>
				<div class="control-group">
					<label class="control-label">Комментарий:</label>
					<label class="controls">
						<textarea rows="3"></textarea>
					</label>
				</div>
			</form>
			<div class="pull-left">
				<a class="btn btn-danger" href="#">Удалить</a>
			</div>
			<div class="pull-right">
				<a class="btn btn-primary" href="#">Сохранить</a>
				<a class="btn" href="#">Отмена</a>
			</div>
			"""


	$.fn.snMapsBalloon = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


