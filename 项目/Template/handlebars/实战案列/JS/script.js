//闭包，相当于C#的命名空间
(function ($) {

    $.ajaxSetup({
        error:function () {
            alert('调用接口失败');
            return false;
        }
    })

    function renderTemplate(templateSelector,data,htmlSelector) {
        var  t=$(templateSelector).html();
        var  fn=Handlebars.compile(t);
        var  h=fn(data);
        $(htmlSelector).html(h);
    }
    //url
    var GETCLASSES="http://imoocnote.calfnote.com/inter/getClasses.php";
    var GETCLASSCHAPTER="http://imoocnote.calfnote.com/inter/getClassChapter.php";
    var GETCLASSNOTE="http://imoocnote.calfnote.com/inter/getClassNote.php"

    function refreshClasses(curPage) {
        $.getJSON(GETCLASSES,{curPage:curPage},function (data) {
            renderTemplate("#class-template",data.data,"#classes");
            renderTemplate("#page-template",formatPag(data),"#pag");

            // $("li.clickable").on("click",function () {
            //     $this=$(this);//封装当前li
            //     console.log($this.data('id'));
            //     refreshClasses($this.data("id"));
            // })
        });
    }

    $(".overlap").on("click",function () {
        Show(false);
    })

    //JQ分页委托事件

    function bindPageEvent() {
        $("#pag").on('click','li.clickable',function () {
            $this=$(this);
            console.log($this.data('id'));
            refreshClasses($this.data('id'));
        });
    }

    bindPageEvent();


    //笔记按钮委托
    function bindClassEvent() {

        $("#classes").on('click','li',function () {
            $this=$(this);
            var cid=$this.data('id');
        //     //课程大纲
        //     $.getJSON(GETCLASSCHAPTER,{cid:cid},function (data) {
        //         console.log(data);
        //         renderTemplate("#chapter-templater",data,"#chapterdiv")
        //         Show(true);
        //     });
        //
        // //    课程笔记
        //     $.getJSON(GETCLASSNOTE,{cid:cid},function (data) {
        //         console.log(data);
        //         renderTemplate("#note-templater",data,"#notediv");
        //     });

            //延迟对象
            $.when($.getJSON(GETCLASSCHAPTER,{cid:cid}),$.getJSON(GETCLASSNOTE,{cid:cid})).done(
                function (cData,nData) {
                    console.log(cData);
                    console.log(nData);
                    renderTemplate("#chapter-templater",cData[0],"#chapterdiv");
                    renderTemplate("#note-templater",nData[0],"#notediv");
                    Show(true);
                }
            )


        });
    }

    bindClassEvent();

    //课程页 Jquery-ajax
    $.getJSON(GETCLASSES,{curPage:1},function (data) {
        console.log(data);

        renderTemplate("#class-template",data.data,"#classes");
        renderTemplate("#page-template",formatPag(data),"#pag");

        $("li.clickable").on("click",function () {
            $this=$(this);//封装当前li
             console.log($this.data('id'));
             refreshClasses($this.data("id"));
        })
    });


    //笔记本
    function Show(show) {
        if(show){
            $(".overlap").css("display","block");
            $(".notedetail").css("display","block")
        }
        else {
            $(".overlap").css("display","none");
            $(".notedetail").css("display","none");
        }
    }

    function formatPag(pagData) {
        var arr=[];
        var total=parseInt(pagData.totalCount);
        var cur=parseInt(pagData.curPage);
    //    处理到首页的逻辑
        var toLeft={};
        toLeft.index=1;
        toLeft.text='&laquo;';
        if(cur!=1){
            toLeft.clickable=true;
        }
        arr.push(toLeft);
    //    处理到上一页的逻辑
        var pre={};
        pre.index=cur-1;
        pre.text='&lsaquo;';
        if(cur!=1){
            pre.clickable=true;
        }
        arr.push(pre);
        //处理到cur页前的逻辑
        if(cur<=5){
            for(var i=1;i<cur;i++){
                var pag={};
                pag.text=i;
                pag.index=i;
                pag.clickable=true;
                arr.push(pag);
            }
        }
        else {
            //如果cur>5,那么cur前的页要显示...
            var pag={};
            pag.text=1;
            pag.index=1;
            pag.clickable=true;
            arr.push(pag);
            var pag={};
            pag.text='...';
            arr.push(pag);
            for(var i=cur-2;i<cur;i++){
                var pag={};
                pag.text=i;
                pag.index=i;
                pag.clickable=true;
                arr.push(pag);
            }

        }
    //    处理到cur页的逻辑
        var pag={};
        pag.text=cur;
        pag.index=cur;
        pag.cur=true;
        arr.push(pag);
    //处理到cur页后的逻辑
        if(cur>=total-4){
            for(var i=cur+1;i<=total;i++){
                var pag={};
                pag.text=i;
                pag.index=i;
                pag.clickable=true;
                arr.push(pag);
            }
        }
        else {
        //    如果cur<total-4,那么cur后的页要显示...
            for(var i=cur+1;i<=cur+2;i++){
                var pag={};
                pag.text=i;
                pag.index=i;
                pag.clickable=true;
                arr.push(pag);
            }
            var pag={};
            pag.text='...';
            arr.push(pag);
            var pag={};
            pag.text=total;
            pag.index=total;
            pag.clickable=true;
            arr.push(pag);
        }
    //    处理到下一页的逻辑
        var next={};
        next.index=cur+1;
        next.text='&rsaquo;';
        if(cur!=total){
            next.clickable=true;
        }
        arr.push(next);
    //    处理到尾页的逻辑
        var toRight={};
        toRight.index=total;
        toRight.text='&raquo;';
        if(cur!=total){
            toRight.clickable=true;
        }
        arr.push(toRight);
        console.log(arr);
        return arr;
    }

    //   equal helper
    Handlebars.registerHelper("equal",function (arg1,arg2,options) {
        if (arg1==arg2){
            return options.fn(this);
        }
        else {
            return  options.inverse(this);
        }
    });
    
//    long helper
    Handlebars.registerHelper("long",function (arg1,options) {
        var str=arg1.indexOf("小时");

        if (str!=-1){
            return options.fn(this);
        }
        else {
            return options.inverse(this);
        }
    })

//    addone helper
    Handlebars.registerHelper("addone",function (index) {
        return index+1;
    })

//    formatDate
    Handlebars.registerHelper("formatDate",function (value) {
        if(!value){
            return "";
        }
        var d=new Date(value);
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        var date=d.getDate();
        var hour=d.getHours();
        var minute=d.getMinutes();
        var  second=d.getSeconds();
        var str=year+"-"+month+"-"+date+"-"+hour+":"+minute+":"+second;

        return str
    })

})(jQuery)
