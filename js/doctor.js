

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

        // compute logo's location:logoCountÍ¼Æ¬µÄ¸öÊý£¬logoÍ¼Æ¬µÄID
        var logoCount = self.config[CONFIG_LOCATION].length / 3, i, logo;
        var rawRatio, wRatio, topRatio;
        for (i = 0; i < logoCount; i++) {
            logo = $(pageId + '-logo' + i);

            rawRatio = self.config[CONFIG_LOCATION][3 * i]; // Í¼Æ¬ w/h
            wRatio = self.config[CONFIG_LOCATION][3 * i + 1]; // Í¼Æ¬ w/W
            topRatio = self.config[CONFIG_LOCATION][3 * i + 2]; // Í¼Æ¬ top/H
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

        var configs = [
            {
                index: 0,
                location: [1.0455,0.2875,0.220951,3.14474,0.3734375,0.42077,4.12903,1,0.485915,10.5,0.7875,0.65757,1.85,0.0578125,0.9412]
            },
            {
                index: 1,
                location: []
            },
            {
                index: 2,
                location: []
            },
            {
                index: 3,
                location: []
            },
            {
                index: 4,
                location: [1.014308,0.996875,0.161972,0.72405,0.446875,0.27641,4.14516,0.4015625,0.8169]
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

        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);
    };

    $(document).ready(onReady);
}(this))