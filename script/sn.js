/*
Старт приложения
----------------
*/


(function() {
  $(function() {
    var $this;
    if (window.console == null) {
      window.console = {
        info: function() {},
        log: function() {},
        error: function() {},
        warn: function() {}
      };
    }
    moment.lang('ru');
    $this = {
      init: function(options) {
        if (options == null) {
          options = {};
        }
        $(this).sn('setup', options);
        $(this).sn('cookies');
        return $(this).sn('start');
      },
      setup: function(options) {
        var sn;
        if (options == null) {
          options = {};
        }
        window.sn = {};
        sn = {
          levels: {},
          users: {},
          content: {},
          conf: {},
          result: {},
          theme: {},
          settings: {}
        };
        $.extend(true, sn, options);
        $(this).data('sn', sn);
        return sn;
      },
      cookies: function() {
        if (window.user == null) {
          window.user = {};
        }
        if ($.cookie('user_id')) {
          window.user.id = $.cookie('user_id');
        }
        if ($.cookie('user_login')) {
          window.user.login = $.cookie('user_login');
        }
        if ($.cookie('user_hash')) {
          return window.user.hash = $.cookie('user_hash');
        }
      },
      start: function(options) {
        if (options == null) {
          options = {};
        }
        if (typeof console !== "undefined" && console !== null) {
          console.log('configuration...');
        }
        $(this).snConf();
        if (typeof console !== "undefined" && console !== null) {
          console.log('autoload...');
        }
        return $(this).snEvents('#autoload/two/three:anchor');
      }
    };
    return $.fn.sn = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

/*
Загрузка настроек
-----------------
*/


(function() {
  $(function() {
    var $this;
    $this = {
      init: function(options) {
        if (options == null) {
          options = {};
        }
      },
      settings: function() {
        var sn;
        sn = $(this).data('sn');
        if (typeof console !== "undefined" && console !== null) {
          console.log('conf: ' + 'settings.json');
        }
        return $.ajax({
          url: 'conf/settings.json',
          async: false,
          dataType: 'json',
          success: function(s) {
            if (s != null) {
              $.extend(sn.settings, s);
              sn.settings.enable = true;
              sn.conf.settings = true;
            }
            return $(this).data('sn', sn);
          }
        });
      }
    };
    return $.fn.snConf = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

/*
Роутинг приложения
*/


(function() {
  $(function() {
    var $this;
    $this = {
      init: function(options) {
        var def, href, levels;
        if (options == null) {
          options = {};
        }
        def = {
          href: '#autoload'
        };
        if (typeof options !== 'object') {
          href = options;
        } else {
          $.extend(true, def, options);
          href = def.href;
        }
        if (href !== '#' && href.match(/#[a-zA-Z0-9\_\-]+/)) {
          levels = href.match(/[a-zA-Z0-9\_\-]+/g);
          if (typeof console !== "undefined" && console !== null) {
            console.info('url: ' + href);
          }
          if (typeof console !== "undefined" && console !== null) {
            console.info('levels: ', levels);
          }
          if ((levels[0] != null) && levels[0] !== 'spoiler') {
            switch (levels[0]) {
              case 'autoload':
                $(this).snUsers();
                $(this).snMaps();
                break;
              default:
                if ((levels[1] != null) && (levels[2] != null)) {
                  window.sn.part = levels[0];
                }
            }
            return $(this).click(levels);
          }
        }
      }
    };
    return $.fn.snEvents = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

/*
Триггеры в приложении
*/


(function() {
  $(function() {
    var $this;
    $this = {
      init: function(options) {
        if (options == null) {
          options = {};
        }
      }
    };
    return $.fn.snTriggers = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

/*
Работа с пользователями
*/


(function() {
  $(function() {
    var $this;
    $this = {
      init: function(options) {
        if (options == null) {
          options = {};
        }
        return $(this).snUsersTriggers('signinFormSubmit');
      },
      afterSignin: function(res) {
        if (res == null) {
          res = {};
        }
        if (res.signin) {
          if ((res.signin.id != null) && (res.signin.login != null) && (res.signin.hash != null)) {
            window.user = {
              id: res.signin.id,
              login: res.signin.login,
              hash: res.signin.hash
            };
            $.cookie('user_id', res.signin.id, {
              expires: 365
            });
            $.cookie('user_login', res.signin.login, {
              expires: 365
            });
            return $.cookie('user_hash', res.signin.hash, {
              expires: 365
            });
          }
        }
      },
      exit: function() {
        if (window.user != null) {
          window.user = {};
        }
        $.removeCookie('user_id');
        $.removeCookie('user_login');
        return $.removeCookie('user_hash');
      }
    };
    return $.fn.snUsers = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

(function() {
  $(function() {
    var $this;
    $this = {
      signin: function(data, callback) {
        return $.ajax({
          url: 'index.php',
          type: 'GET',
          data: {
            action: 'signin',
            login: data.login != null ? data.login : '',
            password: data.password != null ? data.password : '',
            hash: data.hash != null ? data.hash : ''
          },
          dataType: 'json',
          success: function(s) {
            if (s != null) {
              if (callback != null) {
                return callback(s);
              }
            }
          },
          error: function(XMLHttpRequest, textStatus, error) {
            if (typeof console !== "undefined" && console !== null) {
              return console.log(XMLHttpRequest, textStatus, error);
            }
          }
        });
      }
    };
    return $.fn.snUsersAjax = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    };
  });

}).call(this);

(function() {
  $(function() {
    var $this, _this;
    _this = this;
    if ($.cookie('user_login') && $.cookie('user_hash')) {
      $(_this).snUsersAjax('signin', {
        login: $.cookie('user_login'),
        hash: $.cookie('user_hash')
      }, function(res) {
        if (res.signin != null) {
          $(_this).snUsers('afterSignin', res);
          if (res.signin) {
            $('.signin-exit-link').parent('li').show();
            return $('.signin-enter-link').parent('li').hide();
          }
        }
      });
    }
    $this = {
      signinFormSubmit: function(options) {
        if (options == null) {
          options = {};
        }
        _this = this;
        $('#signin-form').on('submit', function(e) {
          e.preventDefault();
          $('.signin-alert').hide();
          return $(_this).snUsersAjax('signin', {
            login: $('#signin-login').val(),
            password: $('#signin-password').val()
          }, function(res) {
            if (res.signin != null) {
              $(_this).snUsers('afterSignin', res);
              if (res.signin) {
                $('#signin-form').hide();
                $('.signin-exit-link').parent('li').show();
                $('.signin-enter-link').parent('li').hide();
                $('.signin-alert-success').show();
                return setTimeout(function() {
                  return $('#modal-signin').modal('hide');
                }, 500);
              } else {
                $('.signin-alert-error').show();
                return $('#signin-password').val('');
              }
            }
          });
        });
        $('.signin-enter-link').on('click', function(e) {
          e.preventDefault();
          $('#signin-login').val('');
          $('#signin-password').val('');
          return $('.signin-alert').hide();
        });
        return $('.signin-exit-link').on('click', function(e) {
          e.preventDefault();
          $('.signin-exit-link').parent('li').hide();
          $('.signin-enter-link').parent('li').show();
          $('#signin-form').show();
          $('.signin-alert').hide();
          $('#signin-password').val('');
          return $(_this).snUsers('exit');
        });
      }
    };
    return $.fn.snUsersTriggers = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    };
  });

}).call(this);

/*
Работа с картой
*/


(function() {
  $(function() {
    var $this;
    $this = {
      init: function(options) {
        var _this;
        if (options == null) {
          options = {};
        }
        _this = this;
        return ymaps.ready(function() {
          var map, placemarks, uuid;
          map = new ymaps.Map('map', {
            center: [56.840001, 53.239778],
            zoom: 12,
            behaviors: ['default', 'scrollZoom']
          });
          map.options.set('scrollZoomSpeed', 4);
          map.controls.add('zoomControl');
          map.controls.add('typeSelector');
          map.controls.add('mapTools');
          placemarks = [];
          map.events.add('click', function(event) {
            var _ref, _ref1, _ref2;
            if ((((_ref = window.user) != null ? _ref.id : void 0) != null) && (((_ref1 = window.user) != null ? _ref1.login : void 0) != null) && (((_ref2 = window.user) != null ? _ref2.hash : void 0) != null)) {
              if (!map.balloon.isOpen()) {
                return $(_this).snMapsAjax('getAgents', function(res) {
                  res.date = $(_this).snMapsFn('date');
                  res.coordinates = event.get('coordPosition');
                  map.balloon.open(res.coordinates, {
                    contentHeader: $(_this).snMapsFn('header', res, 'create'),
                    contentBody: $(_this).snMapsFn('body', res, 'create')
                  });
                  $(_this).snMapsFn('datepicker');
                  $(_this).snMapsFn('typeahead', res);
                  $(_this).snMapsTriggers('create', event);
                  return $(_this).snMapsTriggers('close', map.balloon);
                });
              } else {
                return map.balloon.close();
              }
            }
          });
          uuid = location.href.match(/[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}/i) || [];
          return $(_this).snMapsAjax('getPoints', function(points) {
            var i, point, _results;
            _results = [];
            for (i in points) {
              point = points[i];
              if (point.POINT != null) {
                if ((point.STREET == null) || !point.STREET) {
                  $(_this).snMapsFn('street', $(_this).snMapsPlacemark('coordinates', point));
                }
                placemarks[i] = $(_this).snMapsPlacemark(ymaps, point);
                map.geoObjects.add(placemarks[i]);
                if (uuid[0] != null) {
                  if (point.D$UUID === uuid[0]) {
                    _results.push(map.geoObjects.each(function(mark) {
                      if (mark.properties.get('uuid') === uuid[0]) {
                        return mark.balloon.open(map.getCenter());
                      }
                    }));
                  } else {
                    _results.push(void 0);
                  }
                } else {
                  _results.push(void 0);
                }
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          });
        });
      }
    };
    return $.fn.snMaps = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

(function() {
  $(function() {
    var $this;
    $this = {
      getPoints: function(callback) {
        return $.ajax({
          url: 'index.php',
          type: 'GET',
          data: {
            action: 'getPoints'
          },
          dataType: 'json',
          success: function(s) {
            if (s.points != null) {
              if (callback != null) {
                return callback(s.points);
              }
            }
          },
          error: function(XMLHttpRequest, textStatus, error) {
            if (typeof console !== "undefined" && console !== null) {
              return console.log(XMLHttpRequest, textStatus, error);
            }
          }
        });
      },
      getBalloonContent: function(uuid, callback) {
        var _ref, _ref1, _ref2;
        if (uuid != null) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'getBalloonContent',
              uuid: uuid,
              userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
              login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
              hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
            },
            dataType: 'json',
            success: function(s) {
              if ((s.content != null) && (s.signin != null)) {
                if (callback != null) {
                  return callback(s);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      },
      addNewMark: function(coordinates, vid_id, callback) {
        var _ref, _ref1, _ref2;
        if ((coordinates != null) && (vid_id != null)) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'addNewMark',
              lat: coordinates[0],
              lon: coordinates[1],
              vid: vid_id,
              userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
              login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
              hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
            },
            dataType: 'json',
            success: function(s) {
              if (s.res != null) {
                if (callback != null) {
                  return callback(s.res);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      },
      removeMark: function(uuid, callback) {
        var _ref, _ref1, _ref2;
        if (uuid != null) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'removeMark',
              uuid: uuid,
              userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
              login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
              hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
            },
            dataType: 'json',
            success: function(s) {
              if (s.res != null) {
                if (callback != null) {
                  return callback(s.res);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      },
      saveMark: function(uuid, values, callback) {
        var _ref, _ref1, _ref2;
        if ((uuid != null) && (values != null)) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'saveMark',
              uuid: uuid,
              agent: values.agent,
              info: values.info,
              date1: values.date1,
              date2: values.date2,
              date3: values.date3,
              lat: values.lat,
              lon: values.lon,
              vid: values.vid,
              userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
              login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
              hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
            },
            dataType: 'json',
            success: function(s) {
              if (s.res != null) {
                if (callback != null) {
                  return callback(s.res);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      },
      dragMark: function(uuid, coordinates, callback) {
        var _ref, _ref1, _ref2;
        if ((uuid != null) && (coordinates != null)) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'dragMark',
              uuid: uuid,
              lat: coordinates[0],
              lon: coordinates[1],
              userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
              login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
              hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
            },
            dataType: 'json',
            success: function(s) {
              if (s.res != null) {
                if (callback != null) {
                  return callback(s.res);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      },
      createMark: function(values, callback) {
        var _ref, _ref1, _ref2;
        if (values != null) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'createMark',
              agent: values.agent,
              info: values.info,
              date1: values.date1,
              date2: values.date2,
              date3: values.date3,
              lat: values.lat,
              lon: values.lon,
              vid: values.vid,
              userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
              login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
              hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
            },
            dataType: 'json',
            success: function(s) {
              if (s.res != null) {
                if (callback != null) {
                  return callback(s.res);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      },
      getAgents: function(callback) {
        var _ref, _ref1, _ref2;
        return $.ajax({
          url: 'index.php',
          type: 'GET',
          data: {
            action: 'getAgents',
            userid: ((_ref = window.user) != null ? _ref.id : void 0) != null ? window.user.id : '',
            login: ((_ref1 = window.user) != null ? _ref1.login : void 0) != null ? window.user.login : '',
            hash: ((_ref2 = window.user) != null ? _ref2.hash : void 0) != null ? window.user.hash : ''
          },
          dataType: 'json',
          success: function(s) {
            if (s.agents != null) {
              if (callback != null) {
                return callback(s);
              }
            }
          },
          error: function(XMLHttpRequest, textStatus, error) {
            if (typeof console !== "undefined" && console !== null) {
              return console.log(XMLHttpRequest, textStatus, error);
            }
          }
        });
      },
      editStreet: function(street, coordinates, callback) {
        if ((street != null) && (coordinates != null)) {
          return $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {
              action: 'editStreet',
              street: street,
              lat: coordinates[0],
              lon: coordinates[1]
            },
            dataType: 'json',
            success: function(s) {
              if (typeof console !== "undefined" && console !== null) {
                console.info(s);
              }
              if (s.res != null) {
                if (callback != null) {
                  return callback(s.res);
                }
              }
            },
            error: function(XMLHttpRequest, textStatus, error) {
              if (typeof console !== "undefined" && console !== null) {
                return console.log(XMLHttpRequest, textStatus, error);
              }
            }
          });
        }
      }
    };
    return $.fn.snMapsAjax = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    };
  });

}).call(this);

/*
Набор полезных функций
*/


(function() {
  $(function() {
    var $this;
    $this = {
      datepicker: function() {
        $('#dp1').datepicker();
        $('#dp2').datepicker();
        return $('#dp3').datepicker();
      },
      date: function() {
        return moment().format('DD.MM.YYYY');
      },
      data: function() {
        return {
          agent: $('#agent').val(),
          info: $('#info').val(),
          date1: $('#date1').val(),
          date2: $('#date2').val(),
          date3: $('#date3').val(),
          lat: $this.lat(),
          lon: $this.lon(),
          vid: $('.vid_0').hasClass('active') ? 0 : 1
        };
      },
      coordinates: function() {
        return [$this.lat(), $this.lon()];
      },
      lat: function() {
        return parseFloat($('#lat').val().toString().replace(",", "."));
      },
      lon: function() {
        return parseFloat($('#lon').val().toString().replace(",", "."));
      },
      checkPlanPeriod: function(point) {
        var dayInSec, nowDateInSec, pointDateInSec;
        if (point == null) {
          point = {};
        }
        if (point.PLAN_PERIOD_END == null) {
          point.PLAN_PERIOD_END = $('#date2').val();
        }
        if ((point.PLAN_PERIOD_END != null) && point.PLAN_PERIOD_END.match('[0-9]{2}.[0-9]{2}.[0-9]{4}')) {
          dayInSec = 24 * 60 * 60;
          pointDateInSec = moment(point.PLAN_PERIOD_END.toString(), 'DD.MM.YYYY').unix();
          nowDateInSec = moment().unix();
          console.log(nowDateInSec, pointDateInSec, dayInSec, nowDateInSec - pointDateInSec);
          if ((nowDateInSec - pointDateInSec) < dayInSec) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      preset: function(point) {
        var vid;
        if (point == null) {
          point = {};
        }
        vid = 0;
        if (point.VID_ID != null) {
          vid = point.VID_ID === '0' ? 0 : 1;
        } else {
          vid = $('.vid_0').hasClass('active') ? 0 : 1;
        }
        if (vid === 0) {
          if ($this.checkPlanPeriod(point)) {
            return 'twirl#workshopIcon';
          } else {
            return 'twirl#redDotIcon';
          }
        } else {
          if ($this.checkPlanPeriod(point)) {
            return 'twirl#turnRightIcon';
          } else {
            return 'twirl#redDotIcon';
          }
        }
      },
      draggable: function(point) {
        var _ref, _ref1, _ref2;
        if (point != null) {
          if (((_ref = point.USER_ID) != null ? _ref.toString() : void 0) === ((_ref1 = window.user) != null ? (_ref2 = _ref1.id) != null ? _ref2.toString() : void 0 : void 0)) {
            return true;
          } else {
            return false;
          }
        }
      },
      street: function(coordinates) {
        var coder;
        if ((typeof ymaps !== "undefined" && ymaps !== null) && (coordinates != null)) {
          coder = ymaps.geocode(coordinates, {
            json: true,
            kind: 'house',
            results: 1
          });
          return coder.then(function(res) {
            var obj, pos, street, _ref, _ref1, _ref2, _ref3, _ref4;
            if ((res != null ? (_ref = res.GeoObjectCollection) != null ? _ref.featureMember[0] : void 0 : void 0) != null) {
              obj = res.GeoObjectCollection.featureMember[0];
              if ((obj != null ? (_ref1 = obj.GeoObject) != null ? _ref1.name : void 0 : void 0) != null) {
                street = obj.GeoObject.name;
              }
            }
            if ((res != null ? (_ref2 = res.GeoObjectCollection) != null ? (_ref3 = _ref2.metaDataProperty) != null ? (_ref4 = _ref3.GeocoderResponseMetaData) != null ? _ref4.request : void 0 : void 0 : void 0 : void 0) != null) {
              pos = res.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request.toString().split(',');
            }
            if ((pos != null) && (street != null)) {
              return $(this).snMapsAjax('editStreet', street, pos);
            }
          });
        }
      },
      size: function(placemark, s) {
        var size;
        if ((placemark != null) && (s != null)) {
          size = s.toString().split('x');
          if ((size[0] != null) && (size[1] != null)) {
            placemark.options.set('balloonMinWidth', parseInt(size[0]));
            return placemark.options.set('balloonMinHeight', parseInt(size[1]));
          }
        }
      },
      header: function(res, type) {
        if (res == null) {
          res = {};
        }
        if (type != null) {
          switch (type) {
            case "create":
              return new EJS({
                url: 'view/balloonHeaderCreate.html',
                ext: '.html',
                type: '[',
                cache: false
              }).render(res);
            case "editor":
              return new EJS({
                url: 'view/balloonHeaderEditor.html',
                ext: '.html',
                type: '[',
                cache: false
              }).render(res);
          }
        } else {
          return new EJS({
            url: 'view/balloonHeader.html',
            ext: '.html',
            type: '[',
            cache: false
          }).render(res);
        }
      },
      body: function(res, type) {
        if (res == null) {
          res = {};
        }
        if (type != null) {
          switch (type) {
            case "create":
              return new EJS({
                url: 'view/balloonContentCreate.html',
                ext: '.html',
                type: '[',
                cache: false
              }).render(res);
            case "editor":
              return new EJS({
                url: 'view/balloonContentEditor.html',
                ext: '.html',
                type: '[',
                cache: false
              }).render(res);
          }
        } else {
          return new EJS({
            url: 'view/balloonContent.html',
            ext: '.html',
            type: '[',
            cache: false
          }).render(res);
        }
      },
      typeahead: function(res) {
        if (res.agents != null) {
          return $('#agent').typeahead({
            source: res.agents
          });
        }
      }
    };
    return $.fn.snMapsFn = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    };
  });

}).call(this);

/*
Скрипт который создает и возвращает метку
*/


(function() {
  $(function() {
    var $this;
    $this = {
      init: function(ymaps, point) {
        var placemark, _this;
        _this = this;
        placemark = new ymaps.Placemark($this.coordinates(point), $this.properties(point), $this.options(point));
        placemark = $this.onBalloonOpen(placemark);
        placemark = $this.onDragStart(placemark);
        placemark = $this.onDragEnd(placemark);
        return placemark;
      },
      coordinates: function(point) {
        if ((point != null ? point.POINT : void 0) != null) {
          return point.POINT.toString().replace(/[\s\[\]]/g, '').split(',');
        }
      },
      properties: function(point) {
        return {
          hintContent: (point.STREET != null) && point.STREET ? "" + point.STREET : null,
          balloonContentHeader: "<div></div>",
          balloonContentBody: "<div></div>",
          uuid: point.D$UUID.toString()
        };
      },
      options: function(point) {
        return {
          preset: $(this).snMapsFn('preset', point),
          draggable: $(this).snMapsFn('draggable', point)
        };
      },
      onBalloonOpen: function(placemark) {
        var _this;
        _this = this;
        placemark.events.add('balloonopen', function(event) {
          var balloon, map, uuid;
          placemark = event.get('target');
          balloon = event.get('balloon');
          map = placemark.getMap();
          uuid = placemark.properties.get('uuid').toString();
          return $(_this).snMapsAjax('getBalloonContent', uuid, function(res) {
            var _ref, _ref1, _ref2, _ref3;
            if (res.signin && ((_ref = window.user) != null ? (_ref1 = _ref.id) != null ? _ref1.toString() : void 0 : void 0) === ((_ref2 = res.content) != null ? (_ref3 = _ref2.USER_ID) != null ? _ref3.toString() : void 0 : void 0)) {
              res.coordinates = $this.coordinates(res.content);
              $(_this).snMapsFn('size', placemark, '500x400');
              res.date = $(_this).snMapsFn('date');
              placemark.properties.set('balloonContentHeader', $(_this).snMapsFn('header', res, 'editor'));
              placemark.properties.set('balloonContentBody', $(_this).snMapsFn('body', res, 'editor'));
              $(_this).snMapsFn('datepicker');
              $(_this).snMapsFn('typeahead', res);
              $(_this).snMapsTriggers('delete', event);
              $(_this).snMapsTriggers('save', event);
              return $(_this).snMapsTriggers('close', balloon);
            } else {
              $(_this).snMapsFn('size', placemark, '350x200');
              placemark.properties.set('balloonContentHeader', $(_this).snMapsFn('header', res));
              return placemark.properties.set('balloonContentBody', $(_this).snMapsFn('body', res));
            }
          });
        });
        return placemark;
      },
      onDragStart: function(placemark) {
        var _this;
        _this = this;
        placemark.events.add('dragstart', function(e) {
          var coordinates;
          placemark = e.get('target');
          coordinates = placemark.geometry.getCoordinates();
          return placemark.properties.set('lastCoordinates', coordinates);
        });
        return placemark;
      },
      onDragEnd: function(placemark) {
        var _this;
        _this = this;
        placemark.events.add('dragend', function(e) {
          placemark = e.get('target');
          $('#modal-dragmark').modal();
          $('.dragmark-drag-link').off('click');
          return $('.dragmark-drag-link').on('click', function(e) {
            var coordinates, lastCoordinates, uuid;
            e.preventDefault();
            if ($(this).data('answer') === 'yes') {
              uuid = placemark.properties.get('uuid').toString();
              coordinates = placemark.geometry.getCoordinates();
              $(_this).snMapsAjax('dragMark', uuid, coordinates);
              return $(_this).snMapsFn('street', coordinates);
            } else {
              lastCoordinates = placemark.properties.get('lastCoordinates');
              return placemark.geometry.setCoordinates(lastCoordinates);
            }
          });
        });
        return placemark;
      }
    };
    return $.fn.snMapsPlacemark = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        return $this.init.apply(this, arguments);
      }
    };
  });

}).call(this);

(function() {
  $(function() {
    var $this;
    $this = {
      save: function(event) {
        var map, placemark, uuid, _this;
        _this = this;
        placemark = event.get('target');
        map = placemark.getMap();
        uuid = placemark.properties.get('uuid').toString();
        if ((placemark != null) && (uuid != null)) {
          return $('.mark-save-link').on('click', function(e) {
            e.preventDefault();
            placemark.geometry.setCoordinates($(_this).snMapsFn('coordinates'));
            $(_this).snMapsFn('street', $(this).snMapsFn('coordinates'));
            placemark.options.set('preset', $(_this).snMapsFn('preset'));
            return $(_this).snMapsAjax('saveMark', uuid, $(_this).snMapsFn('data'), function(res) {
              if (!res) {
                return alert('К сожалению, не удалось сохранить метку');
              }
            });
          });
        }
      },
      "delete": function(event) {
        var map, placemark, uuid, _this;
        _this = this;
        placemark = event.get('target');
        map = placemark.getMap();
        uuid = placemark.properties.get('uuid').toString();
        if ((map != null) && (placemark != null) && (uuid != null)) {
          return $('.mark-delete-link').on('click', function(e) {
            e.preventDefault();
            $('#modal-deletemark').modal();
            $('.deletemark-delete-link').off('click');
            return $('.deletemark-delete-link').on('click', function(e) {
              e.preventDefault();
              if ($(this).data('answer') === 'yes') {
                return $(_this).snMapsAjax('removeMark', uuid, function(res) {
                  if (res) {
                    return map.geoObjects.remove(placemark);
                  } else {
                    return alert('К сожалению, не удалось удалить метку');
                  }
                });
              }
            });
          });
        }
      },
      create: function(event) {
        var map, _this;
        _this = this;
        map = event.get('target');
        if ((typeof ymaps !== "undefined" && ymaps !== null) && (map != null)) {
          return $('.mark-create-link').on('click', function(e) {
            e.preventDefault();
            return $(_this).snMapsAjax('createMark', $(_this).snMapsFn('data'), function(res) {
              var placemark;
              if (res) {
                placemark = $(_this).snMapsPlacemark(ymaps, res);
                return map.geoObjects.add(placemark);
              } else {
                return alert('К сожалению, не удалось создать метку');
              }
            });
          });
        }
      },
      close: function(balloon) {
        if (balloon != null) {
          return $('.balloon-close').on('click', function(e) {
            e.preventDefault();
            return balloon.close();
          });
        }
      }
    };
    return $.fn.snMapsTriggers = function(sn) {
      if (sn == null) {
        sn = {};
      }
      if ($this[sn]) {
        return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    };
  });

}).call(this);
