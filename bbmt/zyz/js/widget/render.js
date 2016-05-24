define(["jquery","lazyload","base/ajax","tip","lazy",'libs/template'], function ($,lazyload,ajax ,tip,lazy,template) {
	var Render=function(selector,tpl,url,fuc){
		this.selector=selector;
		this.tpl=tpl;
		this.fuc=fuc;
 		if (!(this instanceof Render)) {
            return new Render(selector,tpl,url,fuc);
        }
        if(selector){
        	this.init(selector,tpl,url,fuc);
        }
        
	}
	Render.prototype.init=function(selector,tpl,url,fuc){
		var _this=this;
        ajax({type:'get',url:url,success:_this.loadData});
	};
	Render.prototype.loadData=function(data){
	    if(data.return_code>0){
	        if(data.return_code==0){
	            $("body").css("background-color","#eee");   
	            $("body").css("background-color","#eee");  
	            $("body").append('<div class="d_kong" style="color:fff"><p style="font-size:25px;margin-bottom:15px">sorry!</p><p style="font-size:15px"></p></div>');
	            $("body p:last-of-type").html(data.return_msg);
	            return false;       
	        }
	        if(data.return_code==100){
	            location.href="../../";
	        }
	    }else{
	    	Render.prototype.renderData.call(Render,data.data,tpl,selector,fuc);
	    }
	};
	Render.prototype.renderData=function(data,tpl,selector,fuc){
		var render = template.compile(tpl);
		var html = render(data);
		$(selector).append(html);
		new lazy();
        fuc && fuc(data);
	};
	Render.prototype.render=function(data,tpl,selector){
		var render = template.compile(tpl);
		var html = render(data);
		$(selector).html(html);
	};
	return Render;
});