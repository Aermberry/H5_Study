window.onload=function () {
leftSwipe();
};

/*左菜单*/
/*1.菜单滑动起来
* 2.在指定的区间范围内滑动，当超出指定范围就停止滑动
* 3.当触摸结束的时候，若滑动条不在滑动区间内就自动吸附回去
* 4.点攻击的时候 改变为当前样式
* 5.点击菜单的时候党委到当前菜单的最顶部
* 如果不满足定位区间就不做定位
* */

function leftSwipe() {
/*获取父容器*/
var parentbox=document.querySelector('.jd_category_left');
var childBox=parentbox.querySelector('ul');

/*获取父盒子和滑动条的高度*/
var parentHeight=parentbox.offsetHeight;
var childHeight=childBox.offsetHeight;

/*定义滑动变量*/
var  startY=0;
var  moveY=0;
var distanceY=0;

/*定义区间变量*/
/*最大值*/
var maxY=0;
/*最小值*/
var minY=parentHeight-childHeight;

/*定义缓冲区间*/
var distance=100;
var maxSwipe=maxY+distance;
var minSwipe=minY+distance;

/*标记当前的位置*/
var currY=0;

/*过渡动画*/
function addTransition() {
    childBox.style.transition="all .2s";
    childBox.style.webkitTransition="all .2s";
}

/*移除过渡动画*/
function removeTransition() {
    childBox.style.transition="none";
    childBox.style.webkitTransition="none";
}

/*移动动画*/
function setTranslateY(y) {
    childBox.style.transform="translateY("+y+"px)";
    childBox.style.webkitTransform="translateY("+y+"px)";
}

/*1.菜单滑动*/
childBox.addEventListener("touchstart",function (e) {
    /*获取触碰时的点的位置信息*/
    startY=e.touches[0].clientY;

})

    childBox.addEventListener("touchmove",function (e) {
        moveY=e.touches[0].clientY;
        distanceY=moveY-startY;
        /*去除过度*/
        removeTransition();
        /*设定可移动的范围*/
        if((currY+distanceY<maxSwipe)&&(currY+distanceY>minSwipe)){
         /*移动*/
            setTranslateY(currY+distanceY);
        }
    })

    childBox.addEventListener("touchend",function (e) {
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
        else {
            currY=currY+distanceY;
        }

        /*重置参数*/
        startY=0;
        moveY=0;
        distanceY=0;
    })

    /*点击事件*/
    var lis=childBox.querySelectorAll("li");

    itcast.tap(childBox,function (e) {
        var li=e.target.parentNode;
        for (var i=0;i<lis.length;i++){
            lis[i].className=" ";
            /*设置索引*/
            lis[i].index=i;
        }
        /*4.点击菜单的时候  改变当前的样式*/
        li.className="now";
        /*
       * 5.点击菜单的时候  定位到当前的那个菜单到最顶部
       * 如果不满足定位区间就不做定位
       * */
        /*需要知道  将要定位的位子*/
        var  translateY=-li.index*50;/*通过索引来计算*/
        /*判断当前的定位要大于 定位区间的 最小定位*/
        if(translateY>minY){
            currY=translateY;
            addTransition();
            setTranslateY(currY);
        }
        else{
            currY=minY;
            addTransition();
            setTranslateY(currY);
        }
    });

}
