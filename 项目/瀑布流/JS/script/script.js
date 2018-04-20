window.onload=function () {
    //封装waterfall函数
    waterfall('main','box');
    var  dataInt={
        "data":[
            {
                "src":'1.jpg'
            },
            {
                "src":'2.jpg'
            },
            {
                "src":'3.jpg'
            },
            {
                "src":'4.jpg'
            },
            {
                "src":'05.jpg'
            },
            {
                "src":'06.jpg'
            }
        ]
    }
    window.onscroll=function () {
        var oParent=document.querySelector('#main');
        if(isscroll()){
            for (var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div');
                oBox.className="box";
                oParent.appendChild(oBox);

                var opic=document.createElement('div');
                opic.className="pic";
                oBox.appendChild(opic);

                var oimg=document.createElement("img");
                opic.appendChild(oimg);
                oimg.src="./img"+dataInt.data[i].src;
            }
            waterfall('main','box');
        }
    }
}

function waterfall(parent,box) {
    //将main下的所有class为box的元素取出来
    var oParent=document.getElementById(parent);
    var oBoxs=getClassbyname(oParent,box);
    // console.log(oBoxs.length)

    //计算整个页面显示的列数【页面宽/box的宽】
    var oBoxw=oBoxs[0].offsetWidth;//返回单个盒子的宽度
    // console.log(oBoxw)
    var cols=Math.floor(document.documentElement.clientWidth/oBoxw);
    //设置main的宽度
    oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto;'

    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            function waterfall(parent,box) {
            //将main下的所有class为box的元素取出来
            var oParent=document.getElementById(parent);
            var oBoxs=getByClass(oParent,box);
            // console.log(oBoxs.length)

            //计算整个页面显示的列数【页面宽/box的宽】
            var oBoxw=oBoxs[0].offsetWidth;//返回单个盒子的宽度
            // console.log(oBoxw)
            var cols=Math.floor(document.documentElement.clientWidth/oBoxw);
            //设置main的宽度
            oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto;'

            var hArr=[];
            for(var i=0;i<oBoxs.length;i++){
                if(i<cols){
                    hArr.push(oBoxs[i].offsetHeight);
                }
                else {
                    var minH=Math.min.apply(null,hArr);//apply改变指向
                    // console.log(minH);
                    var index=getminindex(hArr,minH);
                    oBoxs[i].style.position='absolute';
                    oBoxs[i].style.top=minH+'px';
                    // oBoxs[i].style.left=oBoxw*index+'px';
                    oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
                    hArr[index]+=oBoxs[i].offsetHeight;
                }
            }
            console.log(hArr);
        }

        function waterfall(parent,box) {
            //将main下的所有class为box的元素取出来
            var oParent=document.getElementById(parent);
            var oBoxs=getClassbyname(oParent,box);
            // console.log(oBoxs.length)

            //计算整个页面显示的列数【页面宽/box的宽】
            var oBoxw=oBoxs[0].offsetWidth;//返回单个盒子的宽度
            // console.log(oBoxw)
            var cols=Math.floor(document.documentElement.clientWidth/oBoxw);
            //设置main的宽度
            oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto;'

            var hArr=[];
            for(var i=0;i<oBoxs.length;i++){
                if(i<cols){
                    hArr.push(oBoxs[i].offsetHeight);
                }
                else {
                    var minH=Math.min.apply(null,hArr);//apply改变指向
                    // console.log(minH);
                    var index=getminindex(hArr,minH);
                    oBoxs[i].style.position='absolute';
                    oBoxs[i].style.top=minH+'px';
                    // oBoxs[i].style.left=oBoxw*index+'px';
                    oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
                    hArr[index]+=oBoxs[i].offsetHeight;
                }
            }
            console.log(hArr);
        }

        function waterfall(parent,box) {
            //将main下的所有class为box的元素取出来
            var oParent=document.getElementById(parent);
            var oBoxs=getByClass(oParent,box);
            // console.log(oBoxs.length)

            //计算整个页面显示的列数【页面宽/box的宽】
            var oBoxw=oBoxs[0].offsetWidth;//返回单个盒子的宽度
            // console.log(oBoxw)
            var cols=Math.floor(document.documentElement.clientWidth/oBoxw);
            //设置main的宽度
            oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto;'

            var hArr=[];
            for(var i=0;i<oBoxs.length;i++){
                if(i<cols){
                    hArr.push(oBoxs[i].offsetHeight);
                }
                else {
                    var minH=Math.min.apply(null,hArr);//apply改变指向
                    // console.log(minH);
                    var index=getminindex(hArr,minH);
                    oBoxs[i].style.position='absolute';
                    oBoxs[i].style.top=minH+'px';
                    // oBoxs[i].style.left=oBoxw*index+'px';
                    oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
                    hArr[index]+=oBoxs[i].offsetHeight;
                }
            }
            console.log(hArr);
        }
            hArr.push(oBoxs[i].offsetHeight);
        }
        else {
            var minH=Math.min.apply(null,hArr);//apply改变指向
            // console.log(minH);
            var index=getminindex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            // oBoxs[i].style.left=oBoxw*index+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
    console.log(hArr);
}

//获取数组中最小的数
function getminindex(arr,val) {
    for (var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

//通过class获取子元素
function getClassbyname(parent,clsname) {
    //创建空数组
    var arr=new Array();
    //获取父元素下的所有子元素
    var elements=parent.getElementsByTagName('*');
    //通过类名筛选出对应的元素
    for (var i=0;i<elements.length;i++){
        if (elements[i].className==clsname){
            arr.push(elements[i]);
        }
    }
    return arr;
}

//检测滚动
function isscroll() {
    var oParent=document.querySelector("#main");
    var oBoxs=getClassbyname(oParent,'box');
    //获取最后一个盒子
    var lastBox=oBoxs[oBoxs.length-1];
    //最后一个盒子的一半，距离顶部的距离
    var  boxHeight=lastBox.offsetHeight/2+lastBox.offsetTop
    //滚动页面的距离与页面顶部到最后一个盒子的距离
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight
    var  scrollheight=scrollTop+height;

    return (scrollheight>boxHeight?true:false);
    console,log()
}