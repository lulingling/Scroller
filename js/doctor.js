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
        var logoCount = self.config[CONFIG_LOCATION].length / 4, i, logo;
        var rawRatio, wRatio, topRatio, leftRatio;
        for (i = 0; i < logoCount; i++) {
            logo = $(pageId + '-logo' + i);

            rawRatio = self.config[CONFIG_LOCATION][4 * i]; // 图片 w/h
            wRatio = self.config[CONFIG_LOCATION][4 * i + 1]; // 图片 w/W
            topRatio = self.config[CONFIG_LOCATION][4 * i + 2]; // 图片 top/H
            leftRatio = self.config[CONFIG_LOCATION][4 * i + 3];
            logo.css({
                width: wRatio * 100 + '%',
                height: WIDTH / HEIGHT * wRatio / rawRatio * 100 + '%',
                top: topRatio * 100 + '%',
                left: leftRatio < -100 ? (1 - wRatio) / 2 * 100 + '%' : leftRatio * 100 + "%"
            });
        }

        return self;
    }

    var onReady = function () {
        var container = $("#container");
        var pageLength = $('.page').length;

        container.css({
            width: WIDTH,
            height: HEIGHT
        });

        var configs = [
            {
                index: 0,
                location: [
                    1.0455, 0.2875, 0.220951, -999,
                    3.14474, 0.3734375, 0.42077, -999,
                    4.12903, 1, 0.485915, -999,
                    10.5, 0.7875, 0.65757, -999,
                    1.85, 0.0578125, 0.9412, -999
                ]
            },
            {
                index: 1,
                location: [
                    6.51316, 0.7734375, 0.266725, -999,
                    2.661417, 0.528125, 0.366197, 0,
                    0.55526, 0.321875, 0.510563, 0.546875,
                    0.56962, 0.2109375, 0.471831, -0.075,//left为负值
                    0.625616, 0.1984375, 0.5017606, 0.3578125,
                    0.8448276, 0.30625, 0.46831, 0.09375,
                    0.549107, 0.1921875, 0.55986, -0.059375,//left为负值
                    0.54911, 0.1921875, 0.56074, 0.2015625,
                    2.649351,0.31875,0.397007,-999,
                    1.85, 0.0578125, 0.9412, -999

                ]
            },
            {
                index: 2,
                location: [
                    5.710526,0.68125,0.264965,-999,
                    0.873563,0.2375,0.368838,0.1296875,
                    0.7574257,0.2390625,0.387324,-999,
                    0.794444,0.2234375,0.40581,0.603125,
                    0.563981,0.1859375,0.471831,0.0953125,
                    0.509709,0.1640625,0.475352,0.753125,
                    0.638298,0.375,0.458627,-999,
                    1.85, 0.0578125, 0.9412, -999

                ]
            },
            {
                index: 3,
                location: [
                    6.98684, 0.8296875, 0.2649648, -999,
                    1.39, 0.2171875, 0.5070423, 0,
                    1.411765, 0.3, 0.368838, 0.14375,
                    1.390244, 0.178125, 0.368838, 0.60625,
                    0.598639, 0.1375, 0.394366, 0.3828125,
                    1.338384, 0.4140625, 0.4850352, 0.4734375,
                    0.55685,0.2984375,0.6047535,0.1390625,//Top:(720-33)/1136
                    //0.55685,0.2984375,0.6100352,0.1390625,//Top:(720-27)/1136
                    1.85, 0.0578125, 0.9412, -999

                ]
            },
            {
                index: 4,
                location: [
                    1.014308, 0.996875, 0.16197183, -999,
                    0.7240506, 0.446875, 0.27640845, -999,
                    4.16129, 0.403125, 0.9169014, -999
                ]
            }
        ];

        for (var i = 0; i < configs.length; ++i) {
            initPage(configs[i]);
        }

        $('#page-' + currentIndex).addClass('current');

        window.pageUp = function () {
            if (currentIndex >= pageLength - 1 || isAnimating) {
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
        };

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
        };


        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);
    };

    $(document).ready(onReady);
}(this));