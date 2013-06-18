
module 'Чтение и запись cookies'

test 'чтение и запись простых значений', () ->

	$.removeCookie 'test'
	$.cookie 'test', 'go', expires: 7
	strictEqual $.cookie('test'), 'go', 'запись простого значения'

	$.removeCookie 'test'
	strictEqual $.cookie('test'), null, 'удаление простого значения'


