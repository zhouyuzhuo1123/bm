define(["jquery"], function ($) {
    var tip = function (message,settings) {
        if (!(this instanceof tip)) {
            return new tip(message,settings);
        }
        this.settings = $.extend({
            message: message,
            width:'200px',
            bgcolor:'#F3B669',
            wrapSelector: "body",
            timeout: 1200,
            auto: true
        }, settings);
        this.message=message;
        this._init();
        this._bindEvent();
    };
    tip.prototype = {
        _init: function () {
            var $wrap = $(this.settings.wrapSelector);
            this.$tip = $("<div class='site-tip'></div>");
            this.$tip.text(this.message);
            this.$tip.css({"position":"fixed",'width':this.settings.width,'background':this.settings.bgcolor});
            if (this.settings.auto) {
                this.show();
                this.hide();
            }
            $wrap.append(this.$tip);
        },
        _bindEvent: function () {
            var _this = this;
            this.$tip.on("click", function () {
                _this.$tip.remove();
            });
        },
        show: function () {
            this.$tip.css({
                "left": (($(window).width()-this.$tip.outerWidth()-40) / 2),
                "top": ($(window).height() / 3)
            });
            this.$tip.show();
        },
        hide: function () {
            var _this = this;
            setTimeout(function () {
                _this.$tip.remove();
            }, this.settings.timeout);
        }
    };
    return tip;
});