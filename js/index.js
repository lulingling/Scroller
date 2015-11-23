(function (context) {

    var document = context.document,
        WIDTH = context.innerWidth,
        HEIGHT = context.innerHeight,

        ANIMATION_END_EVENT = "oanimationend animationend webkitAnimationEnd";

    var CONFIG_INDEX = 'index',
        CONFIG_LOCATION = 'location';

    var currentIndex = 0,
        isAnimating = false;

    var initPage = function (config) {
        var pageId = '#page-' + config[CONFIG_INDEX];
        var self = $(pageId);

        self.config = config || {};

        // compute logo's location:logoCount图片的个数，logo图片的ID
        var logoCount = self.config[CONFIG_LOCATION].length / 3, i, logo;
        var rawRatio, wRatio, topRatio;
        for (i = 0; i < logoCount; i++) {
            logo = $(pageId + '-logo' + i);

            rawRatio = self.config[CONFIG_LOCATION][3 * i]; // 图片 w/h
            wRatio = self.config[CONFIG_LOCATION][3 * i + 1]; // 图片 w/W
            topRatio = self.config[CONFIG_LOCATION][3 * i + 2]; // 图片 top/H
            logo.css({
                width: wRatio * 100 + '%',
                height: WIDTH / HEIGHT * wRatio / rawRatio * 100 + '%',
                top: topRatio * 100 + '%',
                left: (1 - wRatio) / 2 * 100 + '%'
            });
        }

        return self;
    }

    var onReady = function () {
        var container = $("#container");
        var pageLengh = $('.page').length;

        container.css({
            width: WIDTH,
            height: HEIGHT
        });

        //location每三个数字为一个logo的rawRatio , w
        var configs = [
            {
                index: 0,
                location: [
                    1.0865, 0.3531, 0.1708,
                    10.372, 0.73, 0.4560,
                    1.85, 0.0578125, 0.9412
                ]
            },
            {
                index: 1,
                location: [
                    2.8095, 0.8297, 0.0456,
                    5.36, 0.6281, 0.2403,
                    1.85, 0.0578125, 0.9412
                ]
            },
            {
                index: 2,
                location: [
                    7.6522, 0.825, 0.1127,
                    5.3467, 0.6265625, 0.2438,
                    1.85, 0.0578125, 0.9412
                ]
            },
            {
                index: 3,
                location: [
                    8.6087, 0.61875, 0.0920,
                    6.9327, 0.80156, 0.2349,
                    1.85, 0.0578125, 0.9412
                ]
            },
            {
                index: 4,
                location: [
                    4.7297, 0.546875, 0.7465
                ]
            }
        ];

        for (var i = 0; i < configs.length; ++i) {
            initPage(configs[i]);
        }

        $('#page-' + currentIndex).addClass('current');

        window.pageUp = function () {
            if (currentIndex >= pageLengh - 1 || isAnimating) {
                return;
            }

            var currentPage = $('#page-' + currentIndex);
            var nextPage = $('#page-' + (currentIndex + 1));

            isAnimating = true;
            currentPage.addClass('pt-page-scaleOutUp');
            currentPage.removeClass('top');

            nextPage.addClass('current pt-page-moveInDown top');
            nextPage.bind(ANIMATION_END_EVENT, function () {
                nextPage.removeClass('pt-page-moveInDown');
                nextPage.unbind(ANIMATION_END_EVENT);

                currentPage.removeClass('current pt-page-scaleOutUp');
                currentPage.unbind(ANIMATION_END_EVENT);

                isAnimating = false;
            });

            currentIndex++;

            $("li:nth-child(" + (currentIndex + 1) + ")").addClass("dot-current").siblings().removeClass("dot-current");

        }

        window.pageDown = function () {
            if (currentIndex <= 0 || isAnimating) {
                return;
            }

            var currentPage = $('#page-' + currentIndex);
            var prevPage = $('#page-' + (currentIndex - 1));

            isAnimating = true;
            currentPage.addClass('pt-page-scaleOutUp');
            currentPage.removeClass('top');

            prevPage.addClass('current pt-page-moveInUp top');
            prevPage.bind(ANIMATION_END_EVENT, function () {
                prevPage.removeClass('pt-page-moveInUp');
                prevPage.unbind(ANIMATION_END_EVENT);

                currentPage.removeClass('current pt-page-scaleOutUp');
                currentPage.unbind(ANIMATION_END_EVENT);

                isAnimating = false;
            });

            currentIndex--;

            $("li:nth-child(" + (currentIndex + 1) + ")").addClass("dot-current").siblings().removeClass("dot-current");
        }


        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);

        //
        //var event_tracker = {
        //    pressed: false,
        //    stamps: [0, 0, 0],        // [start, last, now]
        //    position: [0, 0, 0]      // [startY, lastY, currentY]
        //};
        //
        //var debug_console = $('#debug_console');
        //
        //var event_log = function (event) {
        //    var data = event.originalEvent.touches ?
        //        event.originalEvent.touches[0] :
        //        event;
        //
        //    switch (event.type) {
        //        case "mousedown":
        //        case "touchstart":
        //            event_tracker.pressed = true;
        //            event_tracker.position[0] = data.pageY;
        //            event_tracker.stamps[0] = data.timeStamp;
        //            break;
        //        case "mousemove":
        //        case "touchmove":
        //            break;
        //        case "mouseup":
        //        case "touchend":
        //            event_tracker.pressed = false;
        //            break;
        //    }
        //
        //    if (data) {
        //        event_tracker.position[1] = event_tracker.position[2];
        //        event_tracker.position[2] = data.pageY;
        //        event_tracker.stamps[1] = event_tracker.stamps[2];
        //        event_tracker.stamps[2] = data.timeStamp;
        //    }
        //
        //    debug_console.text(event_tracker.position[0] + ", " + event_tracker.position[1] + ", " + event_tracker.position[2]);
        //};
        //
        //var events_handle = {
        //    on_down: function (event) {
        //        event_log(event);
        //    },
        //
        //    on_move: function (event) {
        //        if (!event_tracker.pressed) {
        //            return;
        //        }
        //
        //        event_log(event);
        //        event.preventDefault();
        //    },
        //
        //    on_up: function (event) {
        //        if (!event_tracker.pressed) {
        //            return;
        //        }
        //
        //        event_log(event);
        //
        //        var dY = event_tracker.position[2] - event_tracker.position[0];
        //        if (dY > 100) {
        //            pageDown();
        //        }
        //
        //        if (dY < -100) {
        //            pageUp();
        //        }
        //    }
        //
        //};
        //
        //container.bind("mousedown", events_handle.on_down);
        //container.bind("mousemove", events_handle.on_move);
        //container.bind("mouseup", events_handle.on_up);
        //
        //container.bind("touchstart", events_handle.on_down);
        //container.bind("touchmove", events_handle.on_move);
        //container.bind("touchend", events_handle.on_up);
    };

    $(document).ready(onReady);
}(this))