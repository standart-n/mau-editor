$ ->

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
						<div id="dp1" class="input-append date" data-date="#{point.PERIOD_BEG}" data-date-format="dd.mm.yyyy">
							<input id="date1" class="input-small" size="16" type="text" value="#{point.PERIOD_BEG}">
							<span class="add-on"><i class="icon-th"></i></span>
						</div>
					</label>
				</div>
				<div class="control-group">
					<label class="control-label">План дата закр.:</label>
					<label class="controls">
						<div id="dp1" class="input-append date" data-date="#{point.PLAN_PERIOD_END}" data-date-format="dd.mm.yyyy">
							<input id="date1" class="input-small" size="16" type="text" value="#{point.PLAN_PERIOD_END}">
							<span class="add-on"><i class="icon-th"></i></span>
						</div>
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

				#<input type="text" placeholder="Введите текст" value="">


	$.fn.snMapsBalloon = (sn = {}) ->
		if $this[sn]
			$this[sn].apply @, Array.prototype.slice.call arguments, 1


