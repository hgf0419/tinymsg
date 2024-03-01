; (function (global) {

    "use strict";

    // utils
    function extend(o, n) {
        for (var key in n) {
            o[key] = n[key];
        }
        return o;
    };

    function importCss(css) {
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

    // insert styles
    var styles = [
        '.tinymsg {box-sizing: border-box;padding: 10px;min-height: 41px;min-width: 300px;border-radius: 4px;border: 1px solid transparent;position: fixed;left: 50%;top: 20px;transform: translateX(-50%);transition: top .5s;overflow: hidden;}',
        '.tinymsg--base {color: #31708f;background-color: #d9edf7;border-color: #bce8f1;}',
        '.tinymsg--success {color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;}',
        '.tinymsg--warning {color: #8a6d3b;background-color: #fcf8e3;border-color: #faebcc;}',
        '.tinymsg--danger {color: #a94442;background-color: #f2dede;border-color: #ebccd1;}',
        '.tinymsg--close{padding-right: 28px;}',
        '.tinymsg_content {font-size: 14px;}',
        '.tinymsg_close {font-size: 20px;font-weight: 600;cursor: pointer;position: absolute;right: 10px;top: 5px;}',
    ];
    importCss(styles.join(''));

    var increment = 1;
    var zIndex = 1001;
    var instances = [];
    
    var Tinymsg = function (options = '') {
        // support string
        if (typeof options === 'string') {
            options = {
                content: options,
            };
        }
        // default
        var defaults = {
            id: 'msg_' + increment++,// element id
            type: 'base',
            offset: 20,
            duration: 3,
            showClose:false,
        };
        this.options = extend(defaults, options);
        this.init();
    };

    // init
    Tinymsg.prototype.init = function () {
        var options = this.options;

        var el = document.createElement("div");
        el.id = options.id;
        addClass(el, 'tinymsg');
        el.innerHTML = '<div class="tinymsg_content">' + options.content + '<div/>';

        if (options.type) {
            addClass(el, 'tinymsg--' + options.type);
        }

        // duration
        var _duration=options.duration>0?options.duration:0;

        var _showClose=options.showClose||_duration==0;
        if (_showClose) {
            addClass(el, 'tinymsg--close');
            el.innerHTML += '<span class="tinymsg_close">×</span>';
        }
        if (options.custClass) {
            addClass(el, options.custClass);
        }

        var verticalOffset = options.offset;
        var len = instances.length;

        // last
        var last = instances[len - 1];
        if (last) {
            var last_dom = last.el;
            verticalOffset = parseInt(last_dom.style.top, 10) + last_dom.offsetHeight + 16;
        }

        el.style.top = verticalOffset + 'px';
        el.style.zIndex = zIndex++;
        instances.push({ id: options.id, el: el });
        document.body.appendChild(el);// insert

        var that = this;

        // autoClose
        if (_duration>0) {
            setTimeout(function () {
                that.close();
            }, _duration * 1000)
        }

        // showClose
        if (_showClose) {
            document.getElementById(options.id).lastElementChild.onclick = function () {
                that.close();
            };
        }
    };

    // close
    Tinymsg.prototype.close = function () {
        var id = this.options.id;

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
        if (el) {
            document.body.removeChild(el);
        }

        if (len <= 1 || index === -1 || index == len - 1) return;

        // correct top
        for (var i = index; i < len - 1; i++) {
            var dom = instances[i].el;
            dom.style.top =
                parseInt(dom.style.top, 10) - removedHeight - 16 + 'px';
        }

    }

    if (typeof module !== 'undefined' && module.exports) module.exports = Tinymsg;
    if (typeof define === 'function') define(function () { return Tinymsg; });
    global.Tinymsg = Tinymsg;

})(this);