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
    })

    page.init(config);

    container.on('swipeup', page.pageUp);
    container.on('swipedown', page.pageDown);
}

$(document).ready(init);