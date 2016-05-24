require.config({
    baseUrl: "../../js",
    paths: {
        jquery: "libs/jquery",
        ajax:"widget/ajax",
		tip:'widget/tip',
        render:'widget/render',
        lazy:'widget/lazy',
        lazyload:'libs/jquery.lazyload'
        // loading: "widget/loading",
        // panel: "widget/panel",
        // confirm: "widget/confirm",
        // validator: "widget/validator",
    },
    shim: {
        lazyload:["jquery"],
        template:{
　　　　　　　　exports: 'template'
　　　　}
        
    }
});