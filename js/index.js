/**
 * Created by liuyifeng on 15/11/15.
 */

(function (context) {

    var document = context.document,
        WIDTH = context.innerWidth,
        HEIGHT = context.innerHeight,

        ANIMATION_END_EVENT = "oanimationend animationend webkitAnimationEnd";

    var currentIndex = 0;
    var initPage = function (config) {
        var self = $('#page-' + config.index);

        self.config = config || {};
        return self;
    }

    var onReady = function () {
        var container = $("#container");
        var pageLengh = $('.page').length;

        container.css({
            width: WIDTH,
            height: HEIGHT
        });

        for (var i = 0; i < 3; ++i) {
            initPage({
                'index': i
            });
        }

        $('#page-' + currentIndex).addClass('current');

        window.pageUp = function () {
            if (currentIndex >= pageLengh - 1) {
                return;
            }

            var currentPage = $('#page-' + currentIndex);
            var nextPage = $('#page-' + (currentIndex + 1));

            currentPage.addClass('pt-page-scaleOutUp');
            currentPage.bind(ANIMATION_END_EVENT, function () {
                currentPage.removeClass('current pt-page-scaleOutUp');
                currentPage.unbind(ANIMATION_END_EVENT);
            });

            nextPage.addClass('current pt-page-moveInDown');
            nextPage.bind(ANIMATION_END_EVENT, function () {
                nextPage.removeClass('pt-page-moveInDown');
                nextPage.unbind(ANIMATION_END_EVENT);
            });

            currentIndex++;
        }

        window.pageDown = function () {
            if (currentIndex <= 0) {
                return;
            }

            var currentPage = $('#page-' + currentIndex);
            var prevPage = $('#page-' + (currentIndex - 1));

            currentPage.addClass('pt-page-scaleOutUp');
            currentPage.bind(ANIMATION_END_EVENT, function () {
                currentPage.removeClass('current pt-page-scaleOutUp');
                currentPage.unbind(ANIMATION_END_EVENT);
            });

            prevPage.addClass('current pt-page-moveInUp');
            prevPage.bind(ANIMATION_END_EVENT, function () {
                prevPage.removeClass('pt-page-moveInUp');
                prevPage.unbind(ANIMATION_END_EVENT);
            });


            currentIndex--;
        }

        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);
    };

    $(document).ready(onReady);
}(this))