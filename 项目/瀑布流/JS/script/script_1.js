window.onload=function () {
    waterfall('main','box')
}

//封装waterfall方法
function waterfall(parent,box) {
    //获取父级元素
    var oparent=document.getElementById(parent);
    //获取父级元素下的类名元素
    var oBoxs=getbyclassname(oparent,box);
    // console.log(oBoxs.length);


}

//通过类名获取元素
function getbyclassname(parent,clsname) {
    var arr=new Array();//创建名为arr的空数组

    //获取parent下的所有标签元素
    var oelements=parent.getElementsByTagName("*");

    //遍历标签元素数组
    for (var i=0;i<oelements.length;i++){
        if(oelements[i].className==clsname){
            arr.push(oelements[i]);
        }
    }

    return arr;
}