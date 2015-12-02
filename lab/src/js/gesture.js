var $ = require('jquery');
var util = require('./util');

var touchStartEvent = util.isSupportTouch() ? "touchstart" : "mousedown";
var touchStopEvent = util.isSupportTouch() ? "touchend" : "mouseup";
var touchMoveEvent = util.isSupportTouch() ? "touchmove" : "mousemove";

$.event.special.swipeupdown = {
    setup: function () {
        var $this = $(this);
        $this.bind(touchStartEvent, function (event) {
            var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
            var start = {
                coords: [data.pageX, data.pageY],
                origin: $(event.target)
            };
            var stop;

            var moveHandler = function (event) {
                if (!start) {
                    return;
                }

                var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;

                stop = {
                    coords: [data.pageX, data.pageY]
                };

                event.preventDefault();
            };

            $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, function (event) {
                $this.unbind(touchMoveEvent, moveHandler);
                if (start && stop) {
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 30) {
                        start.origin.trigger("swipeupdown").trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                    }
                }

                start = stop = undefined;
            });
        });
    }
};

$.each({swipedown: "swipeupdown", swipeup: "swipeupdown"},
    function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });