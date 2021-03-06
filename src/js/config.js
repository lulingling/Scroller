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
                    20.63, 17.95, -100,
                    73.00, 45.60, -100
                ]
            },
            {
                images: [
                    82.97, 4.56, -100,
                    62.81, 24.03, -100
                ]
            },
            {
                images: [
                    82.50, 11.27, -100,
                    62.65, 24.38, -100
                ]
            },
            {
                images: [
                    61.88, 9.20, -100,
                    80.16, 23.49, -100
                ]
            },
            {
                images: [
                    54.69, 91.69, -100
                ]
            }
        ]
    },
    'doctor': {
        pages: [
            {
                images: [
                    21.25, 22.01, -100,
                    44.84, 39.17, -100,
                    100, 48.59, -100,
                    78.75, 65.76, -100
                ]
            },
            {
                images: [
                    77.34, 26.67, -100,
                    52.81, 36.61, 0,
                    32.18, 51.06, 54.69,
                    21.09, 47.18, -7.50,
                    19.84, 50.18, 35.78,
                    30.63, 46.83, 9.38,
                    19.22, 55.99, -5.94,
                    19.22, 56.07, 20.16,
                    31.88, 39.70, -100
                ]
            },
            {
                images: [
                    68.13, 26.50, -100,
                    23.75, 36.89, 12.97,
                    23.91, 38.73, -100,
                    22.34, 40.58, 60.31,
                    18.59, 47.18, 9.53,
                    16.41, 47.54, 75.31,
                    37.50, 45.86, -100
                ]
            },
            {
                images: [
                    82.97, 26.50, -100,
                    21.72, 50.70, 0,
                    30.00, 36.88, 14.38,
                    17.81, 36.88, 60.63,
                    13.75, 39.43, 38.28,
                    41.41, 48.50, 47.34,
                    29.84, 60.47, 13.91
                ]
            },
            {
                images: [
                    99.69, 16.20, -100,
                    44.69, 27.64, -100,
                    40.31, 91.69, -100
                ]
            }
        ]
    }
}