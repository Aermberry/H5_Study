
/*页面加载*/
window.onload=function () {

    search();
    banner();

}


function search() {

    /*SEARCH框效果*/

    /*
    * 1.在滚动屏幕的时候或者说滑动屏幕的时候 （触发动作）   背景颜色需要变换（结果）
    * 2.在滚动或滑动到一定的程度的时候 （触发动作）    颜色不发生变化（结果）
    * 颜色变换的程度 和 一定距离不变化 都是和滚动的距离有关系*/

//获取searchbox

    var   searchBox=document.querySelector('.jd_header_box');
// console.log(searchBox);
// alert(searchBox);

//导航栏到页面顶端的距离
    var banner=document.querySelector('.jd_banner');

    var height=banner.offsetHeight;
// console.log(height);


    window.onscroll=function () {

        //滚动的高度
        var scrolltop=document.body.scrollTop||document.documentElement.scrollTop;

        var opacity=0;

        console.log(scrolltop);

        if(scrolltop>height){
            opacity=0.85;
        }
        else {
            opacity=0.85*(scrolltop/height);
        }

        //    设置搜索盒子的透明度
        // searchBox.style.background="rgba(201,21,35,"+opacity+")";
        searchBox.style.cssText="background-color:rgba(201,21,35,"+opacity+")";
    }
}

/*轮播图*/
function banner() {
    /*1 自动播放
* 2.点随着图片的播放而播放对应的图片
* 3.图片盒子可以滑动
*   3.1 当滑动的距离不超过一定的距离的时候 吸附回去
*   3.2当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左/右一定的距离 就是1/3的图片的宽度
* */


    /*第一步
    * 需要操作的demo
    * 轮播图大盒子*/
    var banner=document.querySelector('.jd_banner')
    // alert(banner);

    /*图片盒子的宽度*/
    var width=banner.offsetWidth;
// alert(width);

    /*图片盒子*/
    var imageBox=document.querySelector('.jd_banner ul:first-child');
// console.log(pic);

    /*点盒子*/
    var pointBox=document.querySelector('.jd_banner ul:last-child');
// console.log(pointBox);

    /*点集合*/
    var points=pointBox.querySelectorAll('li');
// console.log(points);

    /*公用方法*/
    /*添加过度*/
    var addTransition=function () {
        imageBox.style.webkitTransform="all .2s";/*兼容*/
        imageBox.style.Transform="all .2s";
    }

    /*删除过度*/
    var removeTransition=function () {
        imageBox.style.webkitTransform="none";
        imageBox.style.Transform="none";
    }
    /*设置定位*/
    var setTranslateX=function (x) {
        imageBox.style.webkitTransform="translateX("+x+"px)";
        imageBox.style.transform="translateX("+x+"px)";
    }
    /*第二步*/
    /*1.自动的轮播
    * 当前的默认索引*/

    var index=1;
    /*核心定时器*/
    var timer=setInterval(function () {
        index++;
        /*让图片动画的滚动 translateX transition 来实现动画*/
        /*给imageBox加上过度*/
        addTransition();
        /*给imageBox设置当前的位置*/
        setTranslateX(-index*width);
        console.log(index);

    },3000)



    /*第三步
    * 无缝的滚动和滑动
    *
    * 动画结束 过度结束 判断当前是 第几张
    * 如果索引是9 需要瞬间定位到 第一张图片
    * 如果所以是0  需要瞬间定位到 第八张图片*/

/*
    /!*每一次过度结束都会触发这个 过度结束时间*!/
    imageBox.addEventListener('webkitTransitionEnd',function () {
        // console.log('transitionEnd');
        if(index>=9){
            index=1;
        }
        else if(index<=0){
            index=8;
        }
        /!*瞬间定位，过度是什么 就是两个关键帧之间的内容动画渐变的过程，若果没有，那么就是直接由一个动作跳到下一个动作，没有衔接的过程*!/
        /!*去除过度*!/
        removeTransition()
        /!*做定位*!/
        addTransition(-index*width);
    });
    imageBox.addEventListener('transitionEnd',function () {

        // console.log('transitionEnd');
        if(index>=9){
            index=1;
        }
        else if(index<=0){
            index=8;
        }
        removeTransition();
        addTransition(-index*width);
    })*/

    itcast.transitionEnd(imageBox,function () {
        console.log('fz');
        if(index>=9){
            index=1;
            /*瞬间定位，过度是什么 就是两个关键帧之间的内容动画渐变的过程，若果没有，那么就是直接由一个动作跳到下一个动作，没有衔接的过程*/
            /*去除过度*/
            removeTransition();
            /*做定位*/
            setTranslateX(-index*width);
        }
        else if(index<=0){
            index=8;
            /*瞬间定位，过度是什么 就是两个关键帧之间的内容动画渐变的过程，若果没有，那么就是直接由一个动作跳到下一个动作，没有衔接的过程*/
            /*去除过度*/
            removeTransition();
            /*做定位*/
            setTranslateX(-index*width);
        }
        setPoint();
    });


    /*第四步*/
    /*点随着图片轮播做改变，对应上当前的图片的位置*/

    var setPoint=function (i) {
        /*去除当前样式*/
        for(var i=0; i<points.length;i++){
            points[i].className="";
        }
    /*当前的索引值：0-9*/
    /*又需要判断index是0 9的时候*/
    /*但是 我怕们设置点的时候 我们是在动画结束的时候设置
    * 我们的index已经重置过了
    * 没有必要 被重置过的index 1-8*/
    points[index-1].className="now";
    }

    /*第五步
    * 3.图片盒子能滑动
    * 开始的x坐标*/
    var startx=0;
    /*移动的时候的x的坐标*/
    var movex=0;
    /*移动的距离*/
    var distanceX=0;
    /*判断是否滑动过*/
    var isMove=false;
    /*绑定事件*/
    imageBox.addEventListener('touchstart',function (e) {
        /*清除定时器*/
        clearInterval(timer);
        startx=e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function (e) {
        isMove=true;
        movex=e.touches[0].clientX;
        distanceX=movex-startx;
        console.log(distanceX);
        /*在滑动的时候不断的给图片盒子做定位  来达到滑动的效果
        * 定位的位置 当前的图片的定位 加上 移动的距离
        * 清除过度*/
        removeTransition();
        /*设置当前的定位*/
        setTranslateX(-index*width+distanceX);
    });

    /*在谷歌的模拟器会出现 一个问题就是 touchend的时候可能会掉失事件*/
    window.addEventListener('touchend',function (ev) {
        /*第六步*/
        /*
        * 4当滑动的时候不超过一定的距离的时候 吸附回去
        * 5.当滑动的距离超过了一定的距离的时候 图片做相应的滚动 左或右*/

        if(Math.abs(distanceX)>(width/3)&&isMove){
            /*怎么判断上一张还是下一张
            * 是通过distanceX的值来判断*/
            if(distanceX>0){
                index--;
            }
            else {
                index++;
            }
            /*动画的定位回去 当前的index*/
            addTransition();
            setTranslateX(-index*width);
        }
        else{
            /*动画的定位回去 其实就是吸附回去*/
            addTransition();
            setTranslateX(-index*width);
        }

        /*重置参数 防止第二次的时候影响计算*/
        startx=0;
        movex=0;
        distanceX=0;
        isMove=false;

        /*加上定时器*/
        clearInterval(timer);
        timer=setInterval(function () {
            index++;
            /*让图片动画的滚动 translatex transition 来实现动画
            * 给imageBox加上过度*/
            addTransition();
            /*给imageBox设置当前的位置*/
            setTranslateX(-index*width);
        },3000);
    });
}