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

    var increment = 1;
    var zIndex = 1001;
    var instances = [];

    // class
    var MyPlugin = function (options) {
        // 支持传入字符串
        if (typeof options === 'string') {
            options = {
                content: options,
            };
        }
        //默认参数
        var defaults = {
            id: 'msg_' + increment++,//id唯一
            type:'base',
            duration: 5,
        };
        this.options = Object.assign({}, defaults, options);//合并参数
        this.init();
    };

    // init
    MyPlugin.prototype.init = function () {
        var options = this.options;
        console.log('[init]：' + options.id);

        var el = document.createElement("div");
        el.id = options.id;
        addClass(el, 'tinymsg');
        el.innerHTML = '<div class="tinymsg_content">' + options.content + '<div/>';
        if(options.type){
            addClass(el,'tinymsg--'+options.type);
        }
        if (options.bgColor) {
            ele.style.background = options.bgColor;
        }

        var verticalOffset = options.offset || 20;

        var len = instances.length;

        // 上一个
        var last = instances[len - 1];
        if (last) {
            var last_dom = last.el;
            verticalOffset = parseInt(last_dom.style.top,10) + last_dom.offsetHeight + 16;
        }

        el.style.top = verticalOffset + 'px';
        el.style.zIndex = zIndex++;
        instances.push({ id: options.id, el: el });
        document.body.appendChild(el);//插入元素

        // duration
        if (options.duration) {
            var that = this;
            setTimeout(function () {
                that.close();
            }, options.duration * 1000)
        }
    };

    // close
    MyPlugin.prototype.close = function () {

        var id = this.options.id;
        console.log('[close]：' + id);

        var len = instances.length;
        var index = -1;
        var removedHeight;
        for (var i = 0; i < len; i++) {
            var ins = instances[i];
            if (ins && ins.id == id) {
                index = i;
                removedHeight = ins.el.offsetHeight;
                instances.splice(i, 1);
                break;
            }
        }
        var el = document.getElementById(id);
        document.body.removeChild(el);//删除元素
        if (len <= 1 || index === -1 || index == len - 1) return;

        // 下一个自动顶上被删除的位置
        for (var i = index; i < len - 1; i++) {
            var dom = instances[i].el;
            dom.style.top =
                parseInt(dom.style.top, 10) - removedHeight - 16 + 'px';
        }

        
    }

    if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin;
    if (typeof define === 'function') define(function () { return MyPlugin; });
    global.MyPlugin = MyPlugin;

})(this);