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

    function createMsg(options){
        var ele = document.createElement("div");        
        ele.id = options.id;
        addClass(ele, 'tinymsg');
        ele.innerHTML = '<div class="tinymsg_content">'+options.content+'<div/>';
        if(options.bgColor){
            ele.style.background=options.bgColor;
        }

        var last;
        if(msgs.length){
            last=msgs[msgs.length-1];
        }
        var top=last?last.style.top:20;
        console.log(top);

        //ele.style.top=top;
        msgs.push(ele);
        return ele;
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
    var msgs=[];

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
            id: 'msg_' + count,//id唯一
            duration: 3,
        };
        this.options = Object.assign({}, defaults, options);//合并参数
        this.init(); //初始化
    };

    // init
    MyPlugin.prototype.init = function () {
        var options = this.options;
        console.log('[init]：' + options.id);

        var ele=createMsg(options);
       
        document.body.appendChild(ele);//插入元素


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
        var ele = document.getElementById(id);
        document.body.removeChild(ele);//删除元素
    }

    if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin;
    if (typeof define === 'function') define(function () { return MyPlugin; });
    global.MyPlugin = MyPlugin;

})(this);