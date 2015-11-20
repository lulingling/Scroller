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
                location: [1.0865, 0.3531, 0.1708, 10.372, 0.73, 0.4560, 1.85, 0.0578125, 0.9412]
            },
            {
                index: 1,
                location: [2.8095, 0.8297, 0.0456, 5.36, 0.6281, 0.2403, 1.85, 0.0578125, 0.9412]
            },
            {
                index: 2,
                location: [7.6522, 0.825, 0.1127, 5.3467, 0.6265625, 0.2438, 1.85, 0.0578125, 0.9412]
            },
            {
                index: 3,
                location: [8.6087, 0.61875, 0.0920, 6.9327, 0.80156, 0.2349, 1.85, 0.0578125, 0.9412]
            },
            {
                index: 4,
                location: [4.7297, 0.546875, 0.7465]
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
            currentPage.bind(ANIMATION_END_EVENT, function () {
                currentPage.removeClass('current pt-page-scaleOutUp');
                currentPage.unbind(ANIMATION_END_EVENT);
            });

            nextPage.addClass('current pt-page-moveInDown top');
            nextPage.bind(ANIMATION_END_EVENT, function () {
                nextPage.removeClass('pt-page-moveInDown');
                nextPage.unbind(ANIMATION_END_EVENT);
                isAnimating = false;
            });

            currentIndex++;

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
            currentPage.bind(ANIMATION_END_EVENT, function () {
                currentPage.removeClass('current pt-page-scaleOutUp');
                currentPage.unbind(ANIMATION_END_EVENT);
            });

            prevPage.addClass('current pt-page-moveInUp top');
            prevPage.bind(ANIMATION_END_EVENT, function () {
                prevPage.removeClass('pt-page-moveInUp');
                prevPage.unbind(ANIMATION_END_EVENT);
                isAnimating = false;
            });


            currentIndex--;
        }

        //$("li:nth-child(currentIndex)").addClass("dot_current").siblings().removeClass("dot_current");

        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);
    };

    $(document).ready(onReady);
}(this))