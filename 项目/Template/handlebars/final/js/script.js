(function ($) {
    var GETCLASSES="http://imoocnote.calfnote.com/inter/getClasses.php";

    $.ajaxSetup({
        error:function () {
            alert('调用接口失败');
            return false;
        }
    });

    //获取数据 jQuery.getJSON( url [, data ] [, success ] )从服务器下载数据相当于ajax的GET方法获取数据
    $.getJSON(GETCLASSES,{curPage:1},function (data) {
        console.log(data);
        //获取模板
        var t=$("#class-template").html();
        //编译模板
        var f=Handlebars.compile(t);
        //注入数据
        var h=f(data.data);
        $("#classes").html(h);
    });
    
    Handlebars.registerHelper("equal",function (v1,v2,options) {
        if(v1==v2){
            return options.fn(this);
        }
        else {
            return options.inverse(this);
        }
    });
    
    Handlebars.registerHelper("long",function (v,options) {
        if(v.indexOf('小时')!=-1){
            //indexof() 返回某个指定的字符串值在字符串中首次出现的位置
            return options.fn(this);
        }
        else {
            return options.inverse(this)
        //  options.inverse用来处理block中的else语句
        }
    })
})(jQuery)