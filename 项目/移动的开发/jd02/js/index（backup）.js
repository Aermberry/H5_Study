/*优先加载文档*/
window.onload=function(){
    search();
    banner();
    clock();
}


/*搜索框效果*/

/*分析问题*/
/* 搜索框随着滑动（动作），搜索框的背景色由透明变为不透明（结果）
* 滑动到一定距离（动作），背景色不再变化（结果）
* 因素：滑动的距离*/

function search(){

    /*获取搜索框的dom的元素*/
    var searchbox=document.querySelector('.jd_header_box');
    // console.log(searchbox);
    var banner=document.querySelector('.jd_banner');
    // console.log(banner);

    /*banner栏的高度*/
    var height=banner.offsetHeight;
    // console.log(height);

    /*声明透明度变量*/
    var opacity=0;

    /*滑动监听*/
    window.onscroll=function(){

        /*滚动超出页面的距离*/
        var topheight=document.body.scrollTop||document.documentElement.scrollTop;

        if(topheight>height){
            opacity=0.86;
        }
        else{
            opacity=0.86*(topheight/height);
        }

        searchbox.style.cssText='background-color:rgba(201,21,35,'+opacity+');';
    }

}

/*轮播图效果*/
/*分析：
* 1.自动轮播播放
* 2.点随着轮播图的播放而动
* 3.用手滑动轮播图
*  3.1 滑动不超过1/3时自动吸附回去
*  3.2 滑动超过1/3时，轮播到下一张*/

function banner(){
/*第一步获取dom*/
    /*获取banner的dom*/
    var banner=document.querySelector('.jd_banner');
    // console.log(banner);

    /*banner的宽度*/
    var width=banner.offsetWidth;
    // console.log(width);

    /*imagBox*/
    var imageBox=document.querySelector('.jd_banner ul:first-child')
    // console.log(imageBox);

    /*点盒子*/
    var pointBox=document.querySelector('.jd_banner ul:last-child');

    /*点集合*/
    var points=pointBox.querySelectorAll('li');
    // console.log(points);

    /*第二步自动轮播*/

    var  index=1;
    /*定时器*/
    /*添加过度动画效果
    * 再移动*/
    var timer=setInterval(function(){
        index++
        /*向左移动 ”-“*/
        /*imageBox.style.transition="all .2s";
        imageBox.style.webkitTransition="all .2s";*/
        addtransition();

        /*需要添加单位px*/
        /*imageBox.style.transform= "translateX("+(-width*index)+"px)";
        imageBox.style.webkitTransform="translateX("+(-index*width)+"px);"*/
        setTransform();

    },3000);

    /*第三步无缝滚动
    * 每次滚动后检查一下index为多少
    * index为0---》 index8
    * index为9---》 index1
    *
    * 去除过渡动画效果
    * 添加即时定位
    * */

    /*imageBox.addEventListener('transitionEnd',function(){
        if(index>=9){
            index=1
        }
        else if(index<=0){
            index=8
        }

        imageBox.style.transition="none";
        imageBox.style.transform="translateX("+(-width*index)+"px)";
    })

    imageBox.addEventListener('webkitTransitionEnd',function(){
        if(index>=9){
            index=1
        }
        else if(index<=0){
            index=8
        }

        imageBox.style.webkitTransition="none";
        imageBox.style.webkitTransform="translateX("+(-width*index)+"px)";
    })*/

    itcast.transitionEnd(imageBox,function(){
        // console.log("index");
        if(index>=9){
            index=1
        }
        else if(index<=0){
            index=8
        }
        removetransition();
        setTransform();

        point();
    });

    /*公用方法封装*/

    /*添加过渡动画效果*/
    function addtransition(){
        imageBox.style.transition="all .2s";
        imageBox.style.webkitTransition="all .2s";
    }

    /*去除过度动画效果*/
    function removetransition(){
        imageBox.style.transition="none";
        imageBox.style.webkitTransition="none";
    }

    function setTransform(x){

        var x=arguments[0]||0;
        console.log(x);
        imageBox.style.transform="translateX("+(-width*index+x)+"px)";
        imageBox.style.webkitTransform="translateX("+(-width*index+x)+"px)";
    }

    /*第四步*/
    /*点跟随图片的切换而切换*/
    var point=function () {
        for(var i=0;i<points.length;i++){
            /*清除样式*/
            // console.log(i)
            points[i].className='';
        }

        points[index-1].className='now';
    }

    /*第五步触屏滑动*/
    /*分析：
    * 1.触屏时，自动轮播停止
    * 2.滑动的距离大于图片宽度的1/3，就切换到下一张图片
    * 3.滑动的距离少于图片的宽度1/3，就停留在原来的图片
    * 4.当手离开屏幕时，轮播重新启动*/

    /*起始触屏点*/
    var touchStart_x=0;
    /*手滑动经过的最后触屏落点*/
    var touchEnd_x=0;
    /*滑动的距离*/
    var touch_Distance=0;
    /*检测是否滑动了*/
    var touch_Ismove=false;

    /*监听初始触碰点(一个手指就是一个碰触点)位置*/
    imageBox.addEventListener('touchstart',function(e){
        /*取消定时器*/
        clearInterval(timer);
        /*触屏的落点*/
        touchStart_x=e.targetTouches[0].clientX;
    })

    /*监听滑动的位置信息*/
    imageBox.addEventListener('touchmove',function(e){
        /*启动碰撞*/
        touch_Ismove=true;
        /*滑动的落点*/
        touchEnd_x=e.targetTouches[0].clientX;

        /*滑动距离*/
        touch_Distance=touchEnd_x-touchStart_x;

        /*去除过度动画效果*/
        removetransition();
        /*设置移动距离*/
        setTransform(touch_Distance);
    });

    imageBox.addEventListener('touchend',function(e){
        /*手离开触摸屏后，判断时上一张还是下一张
 根据touch_Distance的方向判断*/

        if(Math.abs(touch_Distance)>width/3&&touch_Ismove) {

            if (touch_Distance < 0) {
                index++;
            }
            else {
                index--;
            }
            addtransition();
            setTransform();
        }
        else{
            /*添加过度动画*/
            addtransition();
            /*定位图片位置*/
            setTransform();
        }

        /*初始化参数*/
        /*起始触屏点*/
        touchStart_x=0;
        /*手滑动经过的最后触屏落点*/
        touchEnd_x=0;
        /*滑动的距离*/
        touch_Distance=0;
        /*检测是否滑动了*/
        touch_Ismove=false;

        /*重启定时器*/
        clearInterval(timer);

        timer=setInterval(function(){
            index++
            /*向左移动 ”-“*/
            /*imageBox.style.transition="all .2s";
            imageBox.style.webkitTransition="all .2s";*/
            addtransition();

            /*需要添加单位px*/
            /*imageBox.style.transform= "translateX("+(-width*index)+"px)";
            imageBox.style.webkitTransform="translateX("+(-index*width)+"px);"*/
            setTransform();
        },3000);
    })
}

/*倒计时*/

function clock(){
    /*
      1.设定倒计时时间
    * 2.将时间统一为秒数
    * 3.将秒数分别求取时分秒
    * 4.通过取余来单独分离数字
    * 5.赋值到块元素上
    * */

    var time=timer(5);
    /*设置定时器*/
    var setTimer=setInterval(function(){
        /*倒计时*/
        /*每次减1秒*/

        time--;

        if(time<0){
            clearInterval(setTimer);
            return false;
        }

        /*分区小时块*/

        /*获取小时数*/
        var h=Math.floor(time/3600);

        /*获取分钟数*/
        var m=Math.floor(time%3600/60);

        /*获取秒数*/
        var s=Math.floor(time%60)


        /*获取dom对象*/
       var span_time=document.querySelector('.sk_time');
        // console.log(spans);
        var spans=span_time.querySelectorAll("span");
        // console.log(spans)

        /*小时*/
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;

    },1000)

    /*转化秒数*/
    function timer(h){

        return h*60*60;
    }


}