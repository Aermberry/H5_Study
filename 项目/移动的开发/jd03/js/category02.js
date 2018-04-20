window.onload=function(){
    leftSwipe();
    rightSwipe();
}

//左菜单
function leftSwipe(){
/*
* 1.菜单滑动起来
* 2.当滑动到一定的距离的时候不能滑动  滑动区间
* 3.当触摸结束的时候 需要判断是否存在定位区间内 否则吸附回去 定位回去
* 4.点击菜单的时候 改变当前的样式
* 5.点击菜单的时候 定位到当前的那个菜单到最顶部
* 如果不满足定位区间就不做定位*/

/*获取父容器*/
var parentbox=document.querySelector('.jd_category_left');
var childBox=parentbox.querySelector('ul');
var parentHeight=parentbox.offsetHeight;
var childHeight=childBox.offsetHeight;

/*translateY 初始的定位 其实就是最大定位*/
var maxY=0;
/*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-*/
var minY=parentHeight-childHeight;
/*自己定义缓冲的距离*/
var distance=100;
/*translateY 最大滑动定位*/
var maxSwipe=maxY+100;
/*translateY 最小滑动定位*/
var minSwipe=minY-100;

/*第一步 1.菜单滑动起来*/
var startY=0;
var moveY=0;
var distanceY=0;
var isMove=false;

var currY=0;/*记录当前的定位 全局 相当于轮播图当中的index*/

    /*定义公用的方法*/
    var addTransition=function(){
        childBox.style.webkitTransition="all .2s";
    childBox.style.transition="all .2s";
    }

    var removeTransition=function(){
        childBox.style.webkitTransition="none";
        childBox.style.Transition="none";
    }

    var setTranslateY=function(y){
        childBox.style.webkitTransform="translateY("+y+"px)";
        childBox.style.transform="translateY("+y+"px)";
    }

    /*绑定事件*/
    childBox.addEventListener("touchstart",function(e){
        startY=e.touches[0].clientY;
    })

    childBox.addEventListener("touchmove",function(e){
        isMove=true;

        moveY=e.touches[0].clientY;

        distanceY=moveY-startY;
        console.log(distanceY);

        /*去除过度动画，手动移动，不需要过渡动画（延迟）*/
        removeTransition();
        /*限制移动的区域*/
        if((currY+distanceY)<maxSwipe&&(currY+distanceY)>minSwipe)
        {
            setTranslateY(currY+distanceY);
        }
    })

    childBox.addEventListener("touchend",function(){
        /*第二步 3.当触摸结束的时候 需要判断是否在定位区间内 否则吸附回去 定位*/
        if((currY+distanceY)>maxY){
            currY=maxY;
            addTransition();
            setTranslateY(currY);
        }

        else if((currY+distanceY)<minY){
            currY=minY;
            addTransition();
            setTranslateY(currY);
        }

        else{
            /*记录当前的定位 上一次当前的定位+这一次改变的定位*/
            currY=currY+distanceY;
        }

        /*重置所有的参数 不重置currY*/
        startY=0;
        moveY=0;
        distanceY=0;
        isMove=false;
    })

    /*绑定Tap*/
    /*所有的li*/
    var lis=childBox.querySelectorAll("li");
    itcast.tap(childBox,function(e){
        /*找到事件的触发源 然后找到点击的那个li元素*/
        var li=e.target.parentNode;

        for(var i=0;i<lis.length;i++){
            lis[i].className=" ";
            lis[i].index=i;
        }

        /*点击菜单的时候，改变当前的样式*/
        li.className="now";

        /*
        * 点击菜单的时候，定位到当前的那个菜单到最顶部
        * 如果不满足区间就不定位*/
        /*需要知道 将要定位的位置*/
        var translateY=-li.index*50;/*通过索引来计算*/
        /*判断当前的定位要大于 定位区间的  最小定位*/
        if(translateY>minY){
            currY=translateY;
            addTransition();
            setTranslateY();
        }
        else{
            currY=minY;
            addTransition();
            setTranslateY(currY);
        }
    });
}

/*右边菜单*/
function rightSwipe(){
    /*通过封装的swipe插件来实现*/
    itcast.iScroll({
        swipeDom:document.querySelector(".jd_category_right"),
        swipeType:"y",
        swipeDistance:100
    });
}
