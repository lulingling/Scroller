/**
 *初始化窗口的高和宽，在 pc 上，宽大于高时，使用默认的 320/480 比率
 */
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
if (windowWidth > windowHeight) {
    windowWidth = windowHeight * 320 / 480;
}

/**
 * 主配置:
 * user 版和 doctor 版分别配置
 */
module.exports = {
    'width': windowWidth,
    'height': windowHeight,
    'user': {
        pages: [
            {
                images: [
                    28.75, 22.09, -100,
                    37.34, 42.07, -100,
                    100.00, 48.59, -100,
                    78.75, 65.75, -100
                ]
            },
            {
                images: []
            },
            {
                images: []
            },
            {
                images: []
            },
            {
                images: []
            }
        ]
    },
    'doctor': {
        pages: [
            {
                images: []
            },
            {
                images: []
            },
            {
                images: []
            },
            {
                images: []
            },
            {
                images: []
            }
        ]
    }
}