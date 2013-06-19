module('Чтение и запись cookies');

test('чтение и запись простых значений', function() {
  $.removeCookie('test');
  $.cookie('test', 'go', {
    expires: 7
  });
  strictEqual($.cookie('test'), 'go', 'запись простого значения');
  $.removeCookie('test');
  return strictEqual($.cookie('test'), null, 'удаление простого значения');
});

module('Работа с пользователем');

test('Начальное положение', function() {
  if (($.cookie('user_login') != null) && ($.cookie('user_hash') != null)) {
    strictEqual($('.signin-enter-link').parent('li').css('display'), 'none', 'кнопка Вход скрыта');
    notEqual($('.signin-exit-link').parent('li').css('display'), 'none', 'кнопка Выход активна');
    deepEqual(window.user, {
      id: $.cookie('user_id'),
      login: $.cookie('user_login'),
      hash: $.cookie('user_hash')
    }, 'при успешной авторизации cookies должны записаться в window.user');
    $('.signin-exit-link').trigger('click');
    strictEqual($.cookie('user_id'), null, 'cookie(user_id) сброшен');
    strictEqual($.cookie('user_login'), null, 'cookie(user_login) сброшен');
    strictEqual($.cookie('user_hash'), null, 'cookie(user_hash) сброшен');
    deepEqual(window.user, {}, 'проверяем выход');
    notEqual($('.signin-enter-link').parent('li').css('display'), 'none', 'после выхода кнопка Вход активна');
    return strictEqual($('.signin-exit-link').parent('li').css('display'), 'none', 'после выхода кнопка Выход скрыта');
  } else {
    notEqual($('.signin-enter-link').parent('li').css('display'), 'none', 'кнопка Вход активна');
    strictEqual($('.signin-exit-link').parent('li').css('display'), 'none', 'кнопка Выход скрыта');
    return deepEqual(window.user, {}, 'если cookies отсутствуют, то window.user должен быть пустым');
  }
});

test('Открываем форму с авторизацией', function() {
  strictEqual($('#modal-signin').css('display'), 'none', 'изначально окно c авторизацией закрыто');
  $('.signin-enter-link').trigger('click');
  notEqual($('#modal-signin').css('display'), 'none', 'при нажатии на Войти открывается модальное окно');
  equal($('#signin-login').val(), '', 'поле Логин изначально пустое');
  equal($('#signin-password').val(), '', 'поле Пароль изначально пустое');
  equal($('.signin-alert-success').css('display'), 'none', 'сообщение об успехе изначально скрыто');
  return equal($('.signin-alert-error').css('display'), 'none', 'сообщение об ошибке изначально скрыто');
});

asyncTest('Проверка неверной авторизации', 9, function() {
  $('#signin-login').val('user');
  $('#signin-password').val('password');
  $('#signin-form').trigger('submit');
  return setTimeout(function() {
    notEqual($('.signin-alert-error').css('display'), 'none', 'сообщение об ошибке должно стать видимым');
    equal($('.signin-alert-success').css('display'), 'none', 'сообщение об успехе остается скрытым');
    deepEqual(window.user, {}, 'в window.user не должно ничего записаться');
    $('div.modal-header button.close').trigger('click');
    equal($('#modal-signin').css('display'), 'none', 'форма авторизации закрылась');
    $('.signin-enter-link').trigger('click');
    notEqual($('#modal-signin').css('display'), 'none', 'форма авторизации снова открылась');
    equal($('#signin-login').val(), '', 'поле Логин пустое');
    equal($('#signin-password').val(), '', 'поле Пароль пустое');
    equal($('.signin-alert-success').css('display'), 'none', 'сообщение об успехе скрыто');
    equal($('.signin-alert-error').css('display'), 'none', 'сообщение об ошибке скрыто');
    return start();
  }, 500);
});

asyncTest('Проверка авторизации c пустым паролем', 3, function() {
  $('#signin-login').val('user1');
  $('#signin-password').val('');
  $('#signin-form').trigger('submit');
  return setTimeout(function() {
    notEqual($('.signin-alert-error').css('display'), 'none', 'сообщение об ошибке должно стать видимым');
    equal($('.signin-alert-success').css('display'), 'none', 'сообщение об успехе остается скрытым');
    deepEqual(window.user, {}, 'в window.user не должно ничего записаться');
    return start();
  }, 500);
});

asyncTest('Проверка правильной авторизации', 6, function() {
  return $.ajax({
    url: 'user.json',
    async: false,
    dataType: 'json',
    success: function(s) {
      if (s != null) {
        $('#signin-login').val(s.login);
        $('#signin-password').val(s.password);
        $('#signin-form').trigger('submit');
        return setTimeout(function() {
          equal($('.signin-alert-error').css('display'), 'none', 'сообщение об ошибке должно скрыться');
          notEqual($('.signin-alert-success').css('display'), 'none', 'сообщение об успехе должно стать видимым');
          equal($('#modal-signin').css('display'), 'none', 'окно с авторизацией скроется');
          ok(window.user.login && window.user.hash && window.user.id, 'в window.user запишется id, hash и id пользователя');
          strictEqual($('.signin-enter-link').parent('li').css('display'), 'none', 'кнопка Вход скрыта');
          notEqual($('.signin-exit-link').parent('li').css('display'), 'none', 'кнопка Выход активна');
          return start();
        }, 1000);
      }
    }
  });
});
