var Browser, assert, browser;

Browser = require('zombie');

assert = require('assert');

browser = new Browser({
  debug: false,
  silent: true,
  loadCSS: true
});

describe('загрузка страницы:', function() {
  return it('ответ от browser.visit()', function(visit) {
    return browser.visit('http://izhmfc.ru/_editor/', function() {
      visit();
      describe('проверяем начальное положение пользователя', function() {});
      if ((browser.window.user.login == null) || (browser.window.user.id == null)) {
        describe('если пользователь не авторизован', function() {
          return it('кнопка вход должна быть активна', function() {
            return assert.notEqual('none', browser.evaluate("$('.signin-enter-link').parent('li').css('display')"), 'кнопка Вход активна');
          });
        });
        return it('проверяем window.user', function() {});
      }
    });
  });
});
