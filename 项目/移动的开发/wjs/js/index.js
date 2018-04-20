$(function () {
   /*动态响应式轮播图*/
   banner();
    initTabs();
    /*初始化工具提示*/
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});

/*动态响应式轮播图*/
function banner() {

    /*
    * 申明全局变量 接受数据 缓存在内存当中
    * */

    var myData;
    /*1.获取后台的轮播图 图片数据 (ajax)*/
    var getData=function (callback) {
        if(myData){
            callback&&callback(myData);
            return false;
        }

        $.ajax(
            {
                /*
               * 1.获取后台的轮播图 图片数据 (ajax)
               * 2.需要判断当前的屏幕是移动端和非移动端 (屏幕的宽度 768px以下都是移动端)
               * 3.把后台数据渲染成对应的html字符串 (字符串拼接&模板引擎)
               * 4.把渲染完成的html填充在对应的盒子里面 也就是完成了页面的渲染 (渲染到页面)
               * 5.在屏幕尺寸改变的时候需要重新渲染页面 (监听页面尺寸的改变 resize)
               * */
                type:"GET",
                url:'js/index.json',
                type:'get',
                dataType:'json',
                success:function (data) {
                    console.log(data);

                    /*
                    * 当我们已经请求成功后 把数据缓存在内存当中
                    * 当下次调用这个方法的时候 去判断内存当中有没有这个数据
                    * 如果有记录 再做请求
                    * */

                    myData=data;
                    callback&&callback(myData);
                }
            }
        );
    }

    /*渲染的方法*/
    /*
    * 2.需要判断当前的屏幕是移动端和非移动端(屏幕的宽度768px以下都是移动端)
    * 3.把后台数据渲染成对应的html字符串(字符串拼接&模板引擎artTemplate native-Template)
    * 4.把渲染完成的html填充在对应的盒子里面 也就是完成了页面渲染(渲染到页面当中.html())
    * */

    var renderHtml= function () {
        /*获取到数据*/
        getData(function (data) {
            /*请求结束 获取数据 完成 之后去干这些事情*/
            /*当前屏幕的宽度*/
            var width=$(window).width();
            /*是否移动端*/
            var isMobile=false;
            if(width<568){
                isMobile=true;
                /*当前的屏幕为移动端*/
            }
            /*准备需要解析的数据
            * 我们需要两个模板
            * 点的模板对象*/
            var tempaltePoint=_.template($('#template_point').html());
            /*图片模板对象*/
            var templateImage=_.template($('#template_item').html());
            /*渲染成html字符串 再解析成html*/
            /*传入数据 根据模板解析 返回html字符*/
            /*{model:data} 传入的数据 名字叫model 数据是data*/
            var pointHtml=tempaltePoint({model:data});
            var imageData={
                list:data,/*图片数据*/
                isMobile:isMobile/*是不是移动端*/
            };
            var imageHtml=templateImage({model:imageData});
            /*渲染页面*/
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        });
    }

    /*5.在屏幕尺寸改变的时候需要重新渲染页面(监听页面尺寸的改变 resize)*/
    $(window).on('resize',function () {
        /*重新渲染*/
        /*
        * 每一次改变的时候都会重启请求数据 非常不合理
        *
        * */
        renderHtml();
    }).trigger('resize');/*trigger('resize');即时执行这个事件 触发这个事件*/

    /*6.再移动端需要 通过手势来控制图片的轮播 左 next 右的 prev 滑动*/
    /*使用jquery完成手势*/
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;

    $('.wjs_banner').on('touchstart',function (e) {
        /*怎么获取到第一触摸点*/
        /*jquery e 返回的 originalEvent(对原生的e对象进行兼容性包装) 就是原生JS当中的touchEvent*/
        /*console.log(e);
        console.log(e.originalEvent);*/
        startX=e.originalEvent.touches[0].clientX;
    });

    $('.wjs_banner').on('touchmove',function (e) {
        moveX=e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;
    });

    $('.wjs_banner').on('touchend',function (e) {
        if(Math.abs(distanceX)>50&&isMove ) {
            if(distanceX<0){
                /*向左滑动 下一张*/
                $('.carousel').carousel('next');/*bootstrap*/
            }
            else {
                /*向右滑动 上一张*/
                $('.carousel').carousel('prev');/*bootstrap*/
            }
        }

        /*参数重置*/
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
    });
}

/*初始化tab*/
function initTabs() {
    /*设置父容器的宽度 等于所有的子容器的宽度的和*/
    var ul=$('.wjs_product .nav-tabs');
    var lis=ul.find('li');
    var width=0;
    $.each(lis,function (index,element) {
        // console.log('index:'+index+",element:"+element);
        console.log($(element).width());
        /*通过width 只获取到 内容的宽度
        * innerwidth() 内容+内边距
        * outerwidth() 内容+内边距+外边距
        * outerwidth(true) 内容+内边距+边框+外边框*/
        width +=$(element).innerWidth();
    })
    /*一个盒子到底是会不会随着window的缩放而改变？
    （1）.当盒子的大小与子元素的宽度和等于的时候就不会
    （2）.当盒子的大小比子元素的宽度要小的时候，就会*/
    ul.width(width);

    /*实现移动端的滑动*/
    itcast.iScroll({
        swipeDom:$('.wjs_product_tabsParent').get(0),
        swipeType:'x',
        swipeDistance:50
    });
}

