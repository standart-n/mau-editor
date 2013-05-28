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
      _this = $(this);
      return ymaps.ready(function() {
        var map;

        map = new ymaps.Map('map', {
          center: [56.840001, 53.239778],
          zoom: 12,
          behaviors: ['default', 'scrollZoom']
        });
        map.options.set('scrollZoomSpeed', 1);
        map.controls.add('zoomControl');
        map.controls.add('typeSelector');
        map.controls.add('mapTools');
        return $(_this).snMapsAjax('getPoints', function(points) {
          var clusterer, coordinates, coords, i, placemarks, point;

          clusterer = new ymaps.Clusterer();
          placemarks = [];
          for (i in points) {
            point = points[i];
            if (point.POINT != null) {
              coords = point.POINT.toString().replace(/[\s\[\]]/g, '');
              coordinates = [coords.replace(/^(.*)\,(.*)$/, '$1'), coords.replace(/^(.*)\,(.*)$/, '$2')];
              placemarks[i] = new ymaps.Placemark(coordinates, {
                hintContent: point.PLAN_PERIOD_END != null ? "до <b>" + (point.PLAN_PERIOD_END.toString()) + "</b>" : void 0,
                balloonContentHeader: "<div class=\"balloonContentHeader\" data-id=\"" + point.D$UUID + "\">" + point.SVID + "</div>",
                balloonContentBody: "<div class=\"balloonContentBody\" data-id=\"" + point.D$UUID + "\"></div>",
                uuid: point.D$UUID.toString()
              }, {
                balloonMinWidth: 350,
                balloonMinHeight: 250,
                preset: point.VID_ID === '0' ? 'twirl#workshopIcon' : 'twirl#turnRightIcon'
              });
              placemarks[i].events.add('balloonopen', function(e) {
                var placemark, uuid;

                placemark = e.get('target');
                uuid = placemark.properties.get('uuid').toString();
                return $(_this).snMapsAjax('getBalloonContent', uuid, function(balloon) {
                  return $('.balloonContentBody').each(function() {
                    if (uuid === balloon.D$UUID.toString()) {
                      return $(this).html($(_this).snMapsBalloon('getBalloonContent', balloon));
                    }
                  });
                });
              });
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
      if (uuid != null) {
        return $.ajax({
          url: 'index.php',
          type: 'GET',
          data: {
            action: 'getBalloonContent',
            uuid: uuid
          },
          dataType: 'json',
          success: function(s) {
            if (s.content != null) {
              if (callback != null) {
                return callback(s.content);
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
      return "<form class=\"form-horizontal\">\n	<div class=\"control-group\">\n		<label class=\"control-label\">Исполнитель:</label>\n		<label class=\"control-label\">" + point.SAGENT + "</label>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\">Дата начала:</label>\n		<label class=\"control-label\">" + point.PERIOD_BEG + "</label>\n	</div>\n	<div class=\"control-group\">\n		<label class=\"control-label\">План дата закр.:</label>\n		<label class=\"control-label\">" + point.PLAN_PERIOD_END + "</label>\n	</div>\n</form>";
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
