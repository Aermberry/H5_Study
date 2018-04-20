window.onload=function () {
    waterfall('main','box');
}

function waterfall(parent,box) {

    var oparent=document.getElementById(parent);
    //通过class获取parent下的所有box
    var oboxs=getByclass(oparent,box);
    // console.log(oboxs);

    //固定浏览器的大小不跟随window的变化而变化【浏览器的宽/单个box的宽】:
    var Pagewidth=Math.floor(document.documentElement.clientWidth);
    var oboxwidth=oboxs[0].offsetWidth;
    var cols=Pagewidth/oboxwidth;
    oparent.style.cssText="width:"+cols*oboxwidth+"px;margin:0 auto;"

    //将box以第一行的数据为标准进行排列
    var arrHeight=[];
    for(var i=0;i<oboxs.length;i++){
        if(i<cols){
            arrHeight.push(oboxs[i].offsetHeight);//保存第一行的高度
        }
        else {
            //获取arrHeight中最小的高度的块的index
            var minheight=Math.min.apply(null,arrHeight);
            // console.log(minheight);
            var minindex=getMinindex(arrHeight,minheight);
            oboxs[i].style.position="absolute";
            oboxs[i].style.top=minheight+"px";
            oboxs[i].style.left=oboxs[minindex].offsetLeft+"px";

            arrHeight[minindex]+=oboxs[i].offsetHeight+"px";
        }
    }

}

function getMinindex(arr,val) {
    for(var i=0;i<arr.length;i++){
        if(arr[i]==val){
            return i;
        }
    }
}

function getByclass(parent,box) {
    var elements=parent.getElementsByTagName('*');
    var boxArr=new Array();
    // 遍历数组
    for(var i=0;i<elements.length;i++){
        //帅选数组中classname为box的元素
        if (elements[i].className==box){
            //将符合的元素放入boxArr的数组中
            boxArr.push(elements[i]);
        }
    }

    //返回数组
    return boxArr;
}