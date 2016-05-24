define(["jquery","lazyload"], function ($,lazyload) {
	var Lazy=function(){
        this.init();
	}
	Lazy.prototype.init=function(){
		$("img").lazyload({
            effect : "fadeIn"
        });
	};
	return Lazy;
});