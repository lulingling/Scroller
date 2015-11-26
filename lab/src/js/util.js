module.exports = {
    /**
     * 判断是否支持 touch 事件
     * @returns {boolean|*}
     */
    isSupportTouch: function () {
        return 'ontouchstart' in window || navigator.msMaxTouchPoints;
    },

    /**
     * 获取当前页面的类型，'doctor' 或 'user'
     */
    getPageType: function () {
        var splits = window.location.href.split('/');

        return splits[splits.length - 1].replace('.html', '');
    }
}