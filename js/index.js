/**
 * Created by liuyifeng on 15/11/15.
 */

(function (context) {

    var document = context.document,
        WIDTH = context.innerWidth,
        HEIGHT = context.innerHeight;

    var currentIndex = 0;
    var ANIM_DURATION = 500;

    var initPage = function (config) {
        var self = $('#page-' + config.index);

        self.config = config || {};
        self.css({
            'background-color': config['background-color'] || '',
            'display': config['index'] == currentIndex ? 'block' : 'none',
            'position': 'absolute',
            'top': HEIGHT * config.index,
            'left': 0
        });

        return self;
    }

    var onReady = function () {
        var container = $("#container");
        var pageLengh = $('.page').length;

        container.css({
            width: WIDTH,
            height: HEIGHT,
            position: 'relative'
        });

        initPage({
            'background-color': 'red',
            'index': 0
        });

        initPage({
            'background-color': 'blue',
            'index': 1
        });

        initPage({
            'background-color': 'green',
            'index': 2
        });

        window.pageUp = function () {
            if (currentIndex >= pageLengh - 1) {
                return;
            }

            var currentPage = $('#page-' + currentIndex);
            var nextPage = $('#page-' + (currentIndex + 1));

            currentPage.animate(
                {
                    opacity: 0
                },
                {
                    duration: ANIM_DURATION,
                    done: function () {
                        currentPage.css({
                            display: 'none'
                        });
                    }
                });

            nextPage.css({
                'z-index': 999,
                top: HEIGHT,
                opacity: 1,
                display: "block"
            });
            nextPage.animate(
                {
                    top: 0
                },

                {
                    duration: ANIM_DURATION,
                    start: function () {
                        //nextPage.css({
                        //    'z-index': 999,
                        //    top: HEIGHT,
                        //    opacity: 1,
                        //    display: "block"
                        //});
                    }
                });

            currentIndex++;
        }

        window.pageDown = function () {
            if (currentIndex <= 0) {
                return;
            }

            var currentPage = $('#page-' + currentIndex);
            var prevPage = $('#page-' + (currentIndex - 1));

            currentPage.animate(
                {
                    opacity: 0
                },
                {
                    duration: ANIM_DURATION,
                    done: function () {
                        currentPage.css({
                            display: 'none'
                        });
                    }
                });

            prevPage.css({
                'z-index': 999,
                top: -HEIGHT,
                opacity: 1,
                display: "block"
            });
            prevPage.animate(
                {
                    top: 0
                },
                {
                    duration: ANIM_DURATION,
                    start: function () {
                        //prevPage.css({
                        //    'z-index': 999,
                        //    top: -HEIGHT,
                        //    opacity: 1,
                        //    display: "block"
                        //});
                    }
                });

            currentIndex--;
        }

        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);
    };

    $(document).ready(onReady);
}(this))