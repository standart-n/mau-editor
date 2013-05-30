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
              $(this).snMaps();
              $(this).snUsers();
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

$(function() {
  var $this;

  $this = {
    init: function(options) {
      if (options == null) {
        options = {};
      }
    },
    spoiler: function() {
      if (typeof console !== "undefined" && console !== null) {
        console.log('trigger: ' + 'spoiler');
      }
      return $(this).find('.spoiler-caption').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('spoiler-open')) {
          $(this).removeClass('spoiler-open').addClass('spoiler-close');
        } else {
          $(this).removeClass('spoiler-close').addClass('spoiler-open');
        }
        return $(this).parent('.spoiler').children('.spoiler-body').each(function() {
          if ($(this).hasClass('spoiler-open')) {
            return $(this).removeClass('spoiler-open').addClass('spoiler-close').hide();
          } else {
            return $(this).removeClass('spoiler-close').addClass('spoiler-open').show();
          }
        });
      });
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
        map.events.add('click', function(e) {
          var coordinates;

          coordinates = e.get('coordPosition');
          return $('#modal-newmark').modal({
            keyboard: true,
            backdrop: false
          });
        });
        return $(_this).snMapsAjax('getPoints', function(points) {
          var i, point;

          for (i in points) {
            point = points[i];
            if (point.POINT != null) {
              placemarks[i] = $(_this).snMapsPlacemark(ymaps, point);
            }
          }
          clusterer.add(placemarks);
          clusterer.options.set({
            gridSize: 100,
            maxZoom: 16,
            minClusterSize: 2
          });
          return map.geoObjects.add(clusterer);
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
      var _ref, _ref1;

      if (uuid != null) {
        return $.ajax({
          url: 'index.php',
          type: 'GET',
          data: {
            action: 'getBalloonContent',
            uuid: uuid,
            login: ((_ref = window.user) != null ? _ref.login : void 0) != null ? window.user.login : "",
            hash: ((_ref1 = window.user) != null ? _ref1.hash : void 0) != null ? window.user.hash : ""
          },
          dataType: 'json',
          success: function(s) {
            if ((s.content != null) && (s.signin != null)) {
              if (callback != null) {
                return callback(s.content, s.signin);
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

$(function() {
  var $this;

  $this = {
    getBalloonContent: function(point) {
      return "<p>\n	<table class=\"table\">\n		<tr>\n			<td>Исполнитель:</td>\n			<td class=\"text-error\">" + point.SAGENT + "</td>\n		</tr>\n		<tr>\n			<td>Дата начала:</td>\n			<td class=\"text-error\">" + point.PERIOD_BEG + "</td>\n		</tr>\n		<tr>\n			<td>План. дата закр.:</td>\n			<td class=\"text-error\">" + point.PLAN_PERIOD_END + "</td>\n		</tr>\n	</table>\n</p>";
    },
    getBalloonContentEditor: function(point) {
      return "<form class=\"form-horizontal\">\n	<div class=\"control-group\">\n		<label class=\"control-label\">Исполнитель:</label>\n		<label class=\"controls\">\n			<select>\n				<option>1</option>\n				<option>2</option>\n				<option>3</option>\n				<option>4</option>\n				<option>5</option>\n			</select>\n		</label>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\">Дата начала:</label>\n		<label class=\"controls\">\n			<div id=\"dp1\" class=\"input-append date\" data-date=\"" + point.PERIOD_BEG + "\" data-date-format=\"dd.mm.yyyy\">\n				<input id=\"date1\" class=\"input-small\" size=\"16\" type=\"text\" value=\"" + point.PERIOD_BEG + "\">\n				<span class=\"add-on\"><i class=\"icon-th\"></i></span>\n			</div>\n		</label>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\">План дата закр.:</label>\n		<label class=\"controls\">\n			<div id=\"dp1\" class=\"input-append date\" data-date=\"" + point.PLAN_PERIOD_END + "\" data-date-format=\"dd.mm.yyyy\">\n				<input id=\"date1\" class=\"input-small\" size=\"16\" type=\"text\" value=\"" + point.PLAN_PERIOD_END + "\">\n				<span class=\"add-on\"><i class=\"icon-th\"></i></span>\n			</div>\n		</label>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\">Комментарий:</label>\n		<label class=\"controls\">\n			<textarea rows=\"3\"></textarea>\n		</label>\n	</div>\n</form>\n<div class=\"pull-left\">\n	<a class=\"btn btn-danger\" href=\"#\">Удалить</a>\n</div>\n<div class=\"pull-right\">\n	<a class=\"btn btn-primary\" href=\"#\">Сохранить</a>\n	<a class=\"btn\" href=\"#\">Отмена</a>\n</div>";
    }
  };
  return $.fn.snMapsBalloon = function(sn) {
    if (sn == null) {
      sn = {};
    }
    if ($this[sn]) {
      return $this[sn].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };
});

$(function() {
  var $this;

  $this = {
    init: function(ymaps, point) {
      var placemark, _this;

      _this = this;
      placemark = new ymaps.Placemark($this.coordinates(point), $this.properties(point), $this.options(point));
      placemark.events.add('balloonopen', function(e) {
        var uuid;

        placemark = e.get('target');
        uuid = placemark.properties.get('uuid').toString();
        return $(_this).snMapsAjax('getBalloonContent', uuid, function(balloon, signin) {
          if (signin) {
            placemark.options.set('balloonMinWidth', 500);
            placemark.properties.set('balloonContentBody', $(_this).snMapsBalloon('getBalloonContentEditor', balloon));
            return $('#dp1').datepicker();
          } else {
            return placemark.properties.set('balloonContentBody', new EJS({
              url: 'view/balloonContent.html',
              ext: '.html'
            }).render(balloon));
          }
        });
      });
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
        balloonContentHeader: "<div class=\"balloonContentHeader\" data-id=\"" + point.D$UUID + "\">" + point.SVID + "</div>",
        balloonContentBody: "<div class=\"balloonContentBody\" data-id=\"" + point.D$UUID + "\"></div>",
        uuid: point.D$UUID.toString()
      };
    },
    options: function(point) {
      return {
        balloonMinWidth: 350,
        balloonMinHeight: 200,
        preset: point.VID_ID === '0' ? 'twirl#workshopIcon' : 'twirl#turnRightIcon'
      };
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
        if ((res.signin.login != null) && (res.signin.hash != null)) {
          return window.user = {
            login: res.signin.login,
            hash: res.signin.hash
          };
        }
      }
    },
    exit: function() {
      if (window.user != null) {
        return window.user = {};
      }
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
    signin: function(callback) {
      return $.ajax({
        url: 'index.php',
        type: 'GET',
        data: {
          action: 'signin',
          login: $('#signin-login').val(),
          password: $('#signin-password').val()
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
  var $this;

  $this = {
    signinFormSubmit: function(options) {
      var _this;

      if (options == null) {
        options = {};
      }
      _this = this;
      $('#signin-form').on('submit', function(e) {
        e.preventDefault();
        $('.signin-alert').hide();
        return $(_this).snUsersAjax('signin', function(res) {
          if (res.signin != null) {
            $(_this).snUsers('afterSignin', res);
            if (res.signin) {
              $('#signin-form').hide();
              $('.signin-exit-link').parent('li').show();
              $('.signin-enter-link').parent('li').hide();
              return $('.signin-alert-success').show();
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
