/*定义全局对象*/
/*1.声明一个全局对象
* 2.定义全局对象的属性
* */

/*定义对象*/
window.itcast={};

/*定义属性*/
// callback 回调函数
itcast.transitionEnd=function(dom,callback){
    if(dom && typeof  dom == 'object'){
        dom.addEventListener('transitionEnd',function(){
            callback&&callback();//相当于ifelse
        })

        dom.addEventListener('webkitTransitionEnd',function(){
            callback&&callback();
        })
    }
}

/*定义属性*/
/*callback 回调函数*/
/*这里的tap事件，是模拟原生tap事件，自定义封装的*/
itcast.tap=function (dom,callback) {

    if(dom&& typeof dom=="object"){
        var  isMove=false;
        var  starttime=0;
        dom.addEventListener('touchstart',function (e) {
             starttime=Date.now();
        })

        dom.addEventListener('touchmove',function (e) {
            isMove=true;
        })

        dom.addEventListener('touchend',function (e) {
            if(!isMove&&(Date.now()-starttime)<150){
                callback&&callback(e);
            }
            /*重置 参数*/
            isMove=false;
            starttime=0;
        });
    }
}