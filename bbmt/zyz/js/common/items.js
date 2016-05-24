
// function items(data){
//     if(data.return_code>0){
//         if(data.return_code>0){
//             $("body").css("background-color","#eee");   
//             $(".d_container2").css("background-color","#eee");  
//             $(".d_container2").append('<div class="d_kong" style="color:fff"><p style="font-size:25px;margin-bottom:15px">sorry!</p><p style="font-size:15px"></p></div>');
//             $(".d_container2 p:last-of-type").html(data.return_msg);
//             new srcrchFun();        
//         }
//         if(data.return_code==100){
//             location.href="../../";
//         }else{
//         }
//     }else{
//          new GoodList(data.data);
//          new srcrchFun();
//     }
// };
// $(function(){
//     var _href=location.href;
//     var param=_href.substr(_href.indexOf('?'));
//     var oHead = document.getElementsByTagName('HEAD').item(0); 
//     var oScript= document.createElement("script"); 
//     oScript.type = "text/javascript"; 
//     oScript.src=siteConfig.item_list+param+'&callback=items&t='+new Date().getTime(); 
//     oHead.appendChild(oScript); 
// });

require(['jquery','tip','render','libs/template','lazyload','base/siteConfigUrl'],function($,tip ,render,template,lazyload){
var tpl=[
    '{{each item_list as data i}}',
        '<div class="show-item">',
                '<a href="item.html?item_id={{data.item_id}}">',
                    '<div class="img"><img data-original="{{data.pic_url}}@!pic_200_200" src="../../img/grey.jpg" alt=""/></div>',
                    // '<div class="img"><img src="{{data.pic_url}}@!pic_200_200" alt=""/></div>',
                    '<p class="title">{{data.title}}</p>',
                    '<p class="price">&yen{{data.price}}<span>&yen{{data.market_price}}</span></p>',
                '</a>',
        '</div>',
    '{{/each}}'
    ].join('');
var GoodList=function(){
        var param=location.href.substr(location.href.indexOf('?'));
        this.url=siteConfig.item_list+param+'&t='+new Date().getTime();
        this.height=$(window).height();
        this.renderTpl();
        this.event();
    };
    GoodList.prototype.renderTpl=function(){
        render('.d_container2',tpl,this.url)
    };
    GoodList.prototype.event=function(){     
        var _this=this;
        var _href=location.href;
        var param=_href.substr(_href.indexOf('?'));
        var lv=getMore();
        var loading = true;
        $(document).scroll(function(){
            var lastHeight=$(document).height()-_this.height-20;
            var _height=$(this).scrollTop();
            if(_height>100){
                $('#moverTop').fadeIn(300);
            }else{
                $('#moverTop').fadeOut(300);
            }
            if(_height>lastHeight){
                if(!loading) return;
                lv();
                loading = false;
            }
        });
        $('#moverTop').on('click',function(){
            $('body').animate({scrollTop:0}, 200);
        });
        function getMore(){
            var page=1;
            return function(){
                            // page++;
                            // $.ajax({
                            // 'url':_this.url+"?page="+page,
                            // type:'get',
                            // success:function(data){
                            //         var render = template.compile(tpl);
                            //         var html = render(data.data);
                            //         $('.d_container2').append(html);
                            //         loading=true;
                            //         $('.weui-infinite-scroll').hide();
                            //         _this.lazyload();
                            //     }
                            // })
                            page++;
                            $('.preloader').show();
                            render('.d_container2',tpl,_this.url+"?page="+page,function(data){
                                if(data.total_count_num>page){ 
                                    loading=true;
                                }
                                $('.preloader').hide();
                            })
                        }
                 };
    };
    GoodList.prototype.ArrayOwn=function(val){
        for(var i=0;i<this.cookie.length;i++){
            if(this.cookie[i]==val){
                return false;
            }
        }
        return true;
    };
  
    var srcrchFun=function(){
        this.cookie=window.localStorage.search==undefined?new Array():window.localStorage.search.split(",");
        this.search();
        this.event();
    }
    srcrchFun.prototype.search=function(){
        var str='';
        for(var i=0;i<this.cookie.length;i++){
            if(i<10){
                str+='<a href=\"?keyword='+this.cookie[i]+'">'+this.cookie[i]+'</a>';
            }
        }
        $('.his_tpl .tip').html(str);
    };
    srcrchFun.prototype.event=function(){
        var _this=this;
        $('#search-box').on('click',function(){
            $('.his_tpl').show();
            $('#search_form input').focus();
        })
        $('.search-cancel-btn').on('click',function(){
            $('.his_tpl').hide();
        })
        $('#search_form').on('submit',function(){
                 var _val=$(this).find('input').val();
                 if(_this.ArrayOwn(_val) && $.trim(_val)!=''){
                    _this.cookie.unshift(_val);
                    window.localStorage.search=_this.cookie;
                 }
        });
        $('.clear-btn').on('click',function(){
            window.localStorage.clear();
            $('.his_tpl .tip').html('');
            location.reload();
        })
    };
    srcrchFun.prototype.ArrayOwn=function(val){
        if(this.cookie.length>10){
            this.cookie.pop();
        }
        for(var i=0;i<this.cookie.length;i++){
            if(this.cookie[i]==val){
                return false;
            }
        }
        return true;
    };
    new srcrchFun();
    new GoodList();

});


