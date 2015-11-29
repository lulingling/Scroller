var $ = require('jquery');
var util = require('./util');

var pageCount = 0;
var currentIndex = 0;
var isAnimating = false;
var ANIMATION_END_EVENT = "oanimationend animationend webkitAnimationEnd";

function init(config) {
    var mainConfig = config[util.getPageType()];
    if (mainConfig) {
        pageCount = mainConfig.pages.length;

        var i, pageId, page, pageConfig;
        for (i = 0; i < pageCount; ++i) {
            pageConfig = mainConfig.pages[i];
            pageId = '#page-' + i;
            page = $(pageId);
            page.css({
                width: config.width,
                height: config.height
            });

            var imageCount = pageConfig.images.length / 3, j, image;
            var wRatio, topRatio, leftRatio;
            for (j = 0; j < imageCount; ++j) {
                wRatio = pageConfig.images[3 * j + 0];
                topRatio = pageConfig.images[3 * j + 1];
                leftRatio = pageConfig.images[3 * j + 2];

                image = $(pageId + '-logo' + j);
                image.css({
                    width: wRatio + "%",
                    top: topRatio + "%",
                    left: (leftRatio <= -100 ? (100 - wRatio) / 2 : leftRatio) + "%"
                });
            }
        }
    }

    $('#page-' + currentIndex).addClass('current');
}

function pageUp() {
    if (currentIndex >= pageCount - 1 || isAnimating) {
        return;
    }

    var currentPage = $('#page-' + currentIndex);
    var nextPage = $('#page-' + (currentIndex + 1));

    currentPage.addClass('page-scale-out');
    currentPage.removeClass('top');

    nextPage.addClass('current page-move-in-down top');
    nextPage.bind(ANIMATION_END_EVENT, function () {
        currentPage.removeClass('current page-scale-out');
        nextPage.removeClass('page-move-in-down');
        nextPage.unbind(ANIMATION_END_EVENT);

        isAnimating = false;
    });

    isAnimating = true;
    currentIndex++;
    $("li:nth-child(" + (currentIndex + 1) + ")").addClass("dot-current").siblings().removeClass("dot-current");
};

function pageDown() {
    if (currentIndex <= 0 || isAnimating) {
        return;
    }

    var currentPage = $('#page-' + currentIndex);
    var prevPage = $('#page-' + (currentIndex - 1));

    currentPage.addClass('page-scale-out');
    currentPage.removeClass('top');

    prevPage.addClass('current page-move-in-up top');
    prevPage.bind(ANIMATION_END_EVENT, function () {
        currentPage.removeClass('current page-scale-out');
        prevPage.removeClass('page-move-in-up');
        prevPage.unbind(ANIMATION_END_EVENT);

        isAnimating = false;
    });

    isAnimating = true;
    currentIndex--;
    $("li:nth-child(" + (currentIndex + 1) + ")").addClass("dot-current").siblings().removeClass("dot-current");
};

module.exports = {
    init: init,
    pageUp: pageUp,
    pageDown: pageDown
}