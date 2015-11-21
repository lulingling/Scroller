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
                left: leftRatio < 0 ? (1 - wRatio) / 2 * 100 + '%' : leftRatio*100+"%"
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
                    1.0455, 0.2875, 0.220951, -1,
                    3.14474, 0.3734375, 0.42077, -1,
                    4.12903, 1, 0.485915, -1,
                    10.5, 0.7875, 0.65757, -1,
                    1.85, 0.0578125, 0.9412, -1
                ]
            },
            {
                index: 1,
                location: [
                    6.51316, 0.7734375, 0.266725, -1,
                    2.661417, 0.528125, 0.366197, 0,
                    0.55526, 0.321875, 0.510563, 0.546875,
                    0,0,0,0,
                    //0.56962,0.2109375,0.471831,-0.075,//left为负值
                    0.625616,0.1984375,0.5017606,0.3578125,
                    0.8448276,0.30625,0.46831,0.09375,
                    0,0,0,0,
                    //0.549107,0.1921875,0.55986,-0.059375,//left为负值
                    0.54911,0.1921875,0.56074,0.2015625

                ]
            },
            {
                index: 2,
                location: []
            },
            {
                index: 3,
                location: [
                    6.98684,0.8296875,0.26408,-1,
                    0.59864,0.1375,0.393486,0.384735,
                    1.39,0.2171875,0.5044014,0,
                    1.41176,0.3,0.368838,0.146875,
                    1.3902424,0.178125,0.367958,0.6046875,
                    1.34127,0.528125,0.4832746,0.4734375,
                    0.55443,0.3421875,0.632923,0.1359375
                ]
            },
            {
                index: 4,
                location: [
                    1.014308, 0.996875, 0.161972, -1,
                    0.72405, 0.446875, 0.27641, -1,
                    4.14516, 0.4015625, 0.8169, -1
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
            $("li:nth-child(" + (currentIndex + 1) + ")").addClass("dot-current").siblings().removeClass("dot-current");
        };


        container.on('swipeup', pageUp);
        container.on('swipedown', pageDown);
    };

    $(document).ready(onReady);
}(this));