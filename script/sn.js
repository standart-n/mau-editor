// Generated by CoffeeScript 1.6.2
/*
Старт приложения
----------------
*/
$(function() {
  var $this;

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
      return $(this).snEvents('#autoload');
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

/*
Загрузка настроек
-----------------
*/


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

/*
Роутинг приложения
*/


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
      if (href !== '#' && href.match(/#([a-zA-Z0-9\_\-]+)/)) {
        levels = {
          one: href.match(/#([a-zA-Z0-9\_\-]+)/, '$2'),
          two: href.match(/#[a-zA-Z0-9\_\-]+\/([a-zA-Z0-9\_\-]+)/, '$3'),
          three: href.match(/#[a-zA-Z0-9\_\-]+\/[a-zA-Z0-9\_\-]+\/([a-zA-Z0-9\_\-]+)/, '$4'),
          anchor: href.match(/\:([a-zA-Z0-9\_\-]+)/)
        };
        if (typeof console !== "undefined" && console !== null) {
          console.info('url: ' + href);
        }
        if (typeof console !== "undefined" && console !== null) {
          console.info('levels: ', levels);
        }
        if ((levels.one != null) && levels.one[1] !== 'spoiler') {
          switch (levels.one[1]) {
            case 'autoload':
              $(this).snUsers();
              $(this).snMaps();
              break;
            default:
              if ((levels.two != null) && (levels.three != null)) {
                window.sn.part = levels.one[1];
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

/*
Триггеры в приложении
*/


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

/*
Работа с картой
*/


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
        var clusterer, map, placemarks;

        map = new ymaps.Map('map', {
          center: [56.840001, 53.239778],
          zoom: 12,
          behaviors: ['default', 'scrollZoom']
        });
        map.options.set('scrollZoomSpeed', 4);
        map.controls.add('zoomControl');
        map.controls.add('typeSelector');
        map.controls.add('mapTools');
        clusterer = new ymaps.Clusterer();
        placemarks = [];
        map.events.add('click', function(event) {
          var coordinates, _ref, _ref1, _ref2;

          if ((((_ref = window.user) != null ? _ref.id : void 0) != null) && (((_ref1 = window.user) != null ? _ref1.login : void 0) != null) && (((_ref2 = window.user) != null ? _ref2.hash : void 0) != null)) {
            coordinates = event.get('coordPosition');
            map = event.get('target');
            $('#modal-newmark').modal();
            $('.newmark-add-link').off('click');
            return $('.newmark-add-link').on('click', function(e) {
              e.preventDefault();
              return $(_this).snMapsAjax('addNewMark', coordinates, $(this).data('vid'), function(res) {
                var placemark;

                if (res) {
                  if (typeof console !== "undefined" && console !== null) {
                    console.info('add', res);
                  }
                  placemark = $(_this).snMapsPlacemark(ymaps, res);
                  return map.geoObjects.add(placemark);
                } else {
                  return alert('К сожалению, не удалось добавить метку на карту');
                }
              });
            });
          }
        });
        return $(_this).snMapsAjax('getPoints', function(points) {
          var i, point;

          for (i in points) {
            point = points[i];
            if (point.POINT != null) {
              placemarks[i] = $(_this).snMapsPlacemark(ymaps, point);
              map.geoObjects.add(placemarks[i]);
            }
          }
          return clusterer.options.set({
            gridSize: 100,
            maxZoom: 16,
            minClusterSize: 2
          });
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
            if (typeof console !== "undefined" && console !== null) {
              console.info(s);
            }
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

/*
Скрипт который создает и возвращает метку
*/


$(function() {
  var $this;

  $this = {
    init: function(ymaps, point) {
      var placemark, _this;

      _this = this;
      placemark = new ymaps.Placemark($this.coordinates(point), $this.properties(point), $this.options(point));
      placemark = $this.onBalloonOpen(placemark);
      placemark = $this.onDragEnd(placemark);
      return placemark;
    },
    coordinates: function(point) {
      var coordinates, coords;

      coords = point.POINT.toString().replace(/[\s\[\]]/g, '');
      return coordinates = [coords.replace(/^(.*)\,(.*)$/, '$1'), coords.replace(/^(.*)\,(.*)$/, '$2')];
    },
    properties: function(point) {
      return {
        hintContent: point.PLAN_PERIOD_END != null ? "до <b>" + (point.PLAN_PERIOD_END.toString()) + "</b>" : void 0,
        balloonContentHeader: "<div>" + point.SVID + "</div>",
        balloonContentBody: "",
        uuid: point.D$UUID.toString()
      };
    },
    options: function(point) {
      var _ref, _ref1, _ref2;

      return {
        balloonMinWidth: 350,
        balloonMinHeight: 200,
        preset: point.VID_ID === '0' ? 'twirl#workshopIcon' : 'twirl#turnRightIcon',
        draggable: ((_ref = point.USER_ID) != null ? _ref.toString() : void 0) === ((_ref1 = window.user) != null ? (_ref2 = _ref1.id) != null ? _ref2.toString() : void 0 : void 0) ? true : false
      };
    },
    onBalloonOpen: function(placemark) {
      var _this;

      _this = this;
      placemark.events.add('balloonopen', function(e) {
        var balloon, map, uuid;

        placemark = e.get('target');
        balloon = e.get('balloon');
        map = placemark.getMap();
        uuid = placemark.properties.get('uuid').toString();
        return $(_this).snMapsAjax('getBalloonContent', uuid, function(res) {
          var _ref, _ref1, _ref2, _ref3;

          if (res.signin && ((_ref = window.user) != null ? (_ref1 = _ref.id) != null ? _ref1.toString() : void 0 : void 0) === ((_ref2 = res.content) != null ? (_ref3 = _ref2.USER_ID) != null ? _ref3.toString() : void 0 : void 0)) {
            res.coordinates = $this.coordinates(res.content);
            placemark.options.set('balloonMinWidth', 500);
            placemark.options.set('balloonMinHeight', 400);
            placemark.properties.set('balloonContentBody', new EJS({
              url: 'view/balloonContentEditor.html',
              ext: '.html',
              type: '[',
              cache: true
            }).render(res));
            $('#dp1').datepicker();
            $('#dp2').datepicker();
            $('#dp3').datepicker();
            if (res.agents != null) {
              $('#agent').typeahead({
                source: res.agents
              });
            }
            $('.mark-delete-link').on('click', function(e) {
              e.preventDefault();
              return $(_this).snMapsAjax('removeMark', uuid, function(response) {
                if (response) {
                  return map.geoObjects.remove(placemark);
                } else {
                  return alert('К сожалению, не удалось удалить метку');
                }
              });
            });
            $('.mark-save-link').on('click', function(e) {
              var coordinates;

              e.preventDefault();
              coordinates = [$('#lat').val(), $('#lon').val()];
              placemark.geometry.setCoordinates(coordinates);
              return $(_this).snMapsAjax('saveMark', uuid, {
                agent: $('#agent').val(),
                info: $('#info').val(),
                date1: $('#date1').val(),
                date2: $('#date2').val(),
                date3: $('#date3').val(),
                lat: $('#lat').val(),
                lon: $('#lon').val()
              }, function(response) {
                if (!response) {
                  return alert('К сожалению, не удалось сохранить метку');
                }
              });
            });
            return $('.balloon-close').on('click', function(e) {
              e.preventDefault();
              return balloon.close();
            });
          } else {
            return placemark.properties.set('balloonContentBody', new EJS({
              url: 'view/balloonContent.html',
              ext: '.html',
              type: '[',
              cache: true
            }).render(res));
          }
        });
      });
      return placemark;
    },
    onDragEnd: function(placemark) {
      var _this;

      _this = this;
      placemark.events.add('dragend', function(e) {
        var coordinates, uuid;

        placemark = e.get('target');
        coordinates = placemark.geometry.getCoordinates();
        if (coordinates != null) {
          console.info(coordinates);
        }
        uuid = placemark.properties.get('uuid').toString();
        return $(_this).snMapsAjax('dragMark', uuid, coordinates);
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

$(function() {
  var $this;

  return $this = $.fn.snMapsTriggers = function(sn) {
    if (sn == null) {
      sn = {};
    }
    if ($this[sn]) {
      return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };
});

/*
Работа с пользователями
*/


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
