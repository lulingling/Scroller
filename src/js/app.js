var $ = require('jquery');
var gesture = require('./gesture');
var config = require('./config');
var page = require('./page');

var init = function () {
    var container = $("#container");
    container.css({
        width: config.width,
        height: config.height
    });

    // 禁止所有图片的拖拽
    $('img').on('dragstart', function () {
        return false;
    });

    page.init(config);

    // vertical center the slide progress
    var sliderProgress = $("#slide-progress");
    sliderProgress.css({
        'margin-top': -1 * sliderProgress.height() / 2
    });

    container.on('swipeup', page.pageUp);
    container.on('swipedown', page.pageDown);
}

$(document).ready(init);