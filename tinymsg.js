; (function (global) {

    "use strict";

    // utils
    function addCss(css) {

        var s = document.createElement('style');
        document.head.insertBefore(s, document.head.firstChild)
        // the world
        if (!s.styleSheet) return s.appendChild(document.createTextNode(css))
        // IE
        s.styleSheet.cssText = css

    };

    function addClass(el, cls) {
        if (el.classList) el.classList.add(cls)
        else el.className += ' ' + cls
    };


    // styles
    //var css = '.tinymsg{width:200px;height:40px;position:absolute;z-index:9999;top:100px;background:#f90;}';

    //addCss(css);

    // count
    var count = 0;

    // class
    var MyPlugin = function (options) {
        // 支持传入字符串
        if (typeof options === 'string') {
            options = {
                content: options
            };
        }
        count++;
        //默认参数
        var defaults = {
            id: 'msg' + count,//id唯一
            duration: 3,
        };
        this.options = Object.assign({}, defaults, options);//合并参数
        this.init(); //初始化
    };

    MyPlugin.prototype.init = function () {
        var options = this.options;
        console.log('[init]：' + options.id);
        var ele = document.createElement("div"); //创建元素          
        ele.id = options.id;
        addClass(ele, 'tinymsg');
        ele.innerHTML = options.content;
        document.body.appendChild(ele);//插入元素


        // 
        if (options.duration) {
            var that = this;
            setTimeout(function () {
                that.close();
            }, options.duration * 1000)
        }
    };

    //初始化
    MyPlugin.prototype.close = function () {

        var id = this.options.id;
        console.log('[close]：' + id);
        var ele = document.getElementById(id);
        document.body.removeChild(ele);//删除元素
    }

    if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin;
    if (typeof define === 'function') define(function () { return MyPlugin; });
    global.MyPlugin = MyPlugin;

})(this);