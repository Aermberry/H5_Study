/*优先加载文档*/
window.onload=function(){
    search();
    banner();
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

    function setTransform(){
        imageBox.style.transform="translateX("+(-width*index)+"px)";
        imageBox.style.webkitTransform="translateX("+(-width*index)+"px)";
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

    /*第五步*/
    /*触屏滑动效果*/
    /*获取初始的触摸位置*/
    var touchstartx=0;
    /*获取滑动后的坐标*/
    var touchendx=0;
    /*滑动的距离*/
    var distance=0;
    /*是否移动*/
    var ismove=false;
    /*如果距离大于width的1/3就自动滑动到下一张*/
    /*如果距离小于width的1/3就自动滑动到吸附回来*/

    /*获取触摸的起始坐标*/
    imageBox.addEventListener('touchstart',function (e) {
        console.log(e);
        /*清除定时器*/
        clearInterval(timer);
        touchstartx=e.targetTouches[0].clientX;
    })

    /*获取活动后的坐标*/
    imageBox.addEventListener('touchmove',function(e){

        ismove=true;

        touchendx=e.targetTouches[0].clientX;
        // console.log(touchendx);

        /*滑动距离*/
        distance=touchendx-touchstartx;
        // console.log(distance);
        /*去除动画过度*/
        removetransition();
        /*移动距离distance*/
  /*在滑动的时候不断的给图片盒子做定位 来达到滑动的效果
  * 定位的位置 当前的图片的定位 加上 移动的距离
  * 清除过度*/
  /*世界坐标 实际情况是在存在坐标体系，在空间中的一切物件都要以世界坐标位中心点进行移动*/
        this.style.transform="translateX("+(-width*index+distance)+"px)";
/*为什么要考虑-width*index
* transform以父级元素的左上角为参考坐标原点，-width*index定位清楚了每张图片的坐标位置
* 为什么带负号，因为图片的自动轮播方向是自右向左的，首张显示出来的是index为1的图片,transform的自身原点默认在图形的左上角*/
    })

    imageBox.addEventListener('touchend',function(e){
        // console.log(e)
        if(Math.abs(distance)>width/3&&ismove){
          /*怎么判断是上一张，还是下一张
          * 通过distanceX的值来判断*/
            if(distance>0){
                index--
            }
            else{
                index++
            }

            addtransition();
            setTransform(-index*width);
        }
        else{

            /*否则动画定位回去,就是吸附回去*/
            addtransition();
            setTransform(-index*width);
        }

        // 重置参数  防止第二次的时候影响计算
        touchstartx=0;
        touchendx=0;
        distance=0;
        ismove=0;

        /*加上定时器*/
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            /*让图片动画的滚动 translax transition 实现动画
            * 给imageBox加上过度
            * * */
            addtransition();
            /*给imageBox设置当前的位置*/
            setTransform();

        },3000);
    });
}