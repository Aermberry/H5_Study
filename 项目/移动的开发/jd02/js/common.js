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