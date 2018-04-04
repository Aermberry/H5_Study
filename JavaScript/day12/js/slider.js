//  获取我们要的任何元素
var js_slider=document.getElementById("js_slider");
var slide_block=js_slider.children[0].children[0];
var slide_ctrl=js_slider.children[1];

//1. 先动态生成  6个小span  要遍历循环
var imgs=slide_block.children;
for (var a=0;a<imgs.length;a++){
    // 创建新的节点
    var span=document.createElement("span");// 生成span
    span.className="slider-ctrl-con ";
    span.innerHTML=imgs.length-a;
    slide_ctrl.insertBefore(span,slide_ctrl.children[1]);
}
//    2. 让我们第一个 span 按钮 变成 蓝色
slide_ctrl.children[1].className = "slider-ctrl-con current";
//    current的權重需要比slider-ctrl-con大

// 3 第一张图片在舞台中央  ，其余的全部在 右侧
var sliderwidth=js_slider.offsetWidth
//    alert(sliderwidth)
for (var a=1;a<imgs.length;a++){
    // 为什么从1开始  第0张是不动的   从 第 1 开始
    imgs[a].style.left=sliderwidth+"px"
}

// 4. 开始点击三个按钮
var spans=slide_ctrl.children;
//    var spans=slide_ctrl.getElementsByTagName("span")
//    alert(spans)
var iNow=0;//控制整個盒子程序的實現
for (var a in spans){
    spans[a].onclick=function () {
        if(this.className=="slider-ctrl-prev"){
//                alert(11)
//                判斷是否是左側按鈕
            an(imgs[iNow],{left:sliderwidth});
            --iNow< 0?iNow=imgs.length-1:iNow
            imgs[iNow].style.left=-sliderwidth+"px";
            an(imgs[iNow],{left:0});
            square()
        }
        else if(this.className="slider-ctrl-next"){
            autoplay;
        }
        else {
            //  alert("您点击的是 下面的span")
            // 第一步， 先得到当前的索引号
            var that = this.innerHTML - 1;
            //  alert(that);
            // 当我们点击了  当前图片 相应span 的  后面的 span 的时候
            // 此时 ，我们的 图片应该从 右边走向左边   相当于点击了 右侧按钮
            if(that > iNow) {  // iNow  当前图片
                // 当前这一张 先出去
                an(imgs[iNow],{left: -sliderwidth});
                // 需要的那张， 先跑到右侧
                imgs[that].style.left = sliderwidth + "px";
            }
            else if(that < iNow) {
                //  小于的情况我们按照点击左侧按钮的方法
                animate(imgs[iNow],{left:  sliderWidth});
                imgs[that].style.left = -sliderWidth + "px";
            }
            iNow = that;   // 把 我们需要的那一张， 改为 当前的图片  赋值
            an(imgs[iNow],{left: 0});
            square();
        }
    }

//        特別重要的變量INow
    function square() {//主要用來控制下面的span樣式
//           // 排他思想
        //  去掉所有不合格的，留下当前的
        for(var i=1;i<spans.length-1;i++) {  //  只遍历 6个
            // 从1 开始 去掉了  0   一共是 8个  减去1   到 7  不带7玩      1~6   一共是6 个数
            spans[i].className = "slider-ctrl-con";
        }
        // iNow 是 0-5  但是我们需要  1-6 需要
        spans[iNow+1].className = "slider-ctrl-con current";
    }

    var timer=null;
    timer=setInterval(autoplay,2000);
    function autoplay() {
        // 用来判断是否是右侧按钮
        // alert("您点击了右侧按钮");
        //当我们点击了右侧按钮， 当前的这个图片，慢慢的走到了左侧，  -310 的位置
        an(imgs[iNow],{left: -sliderwidth});
        /* iNow++;  // xian ++
         console.log(iNow);
         if(iNow > imgs.length - 1) // 后判断
         {
         iNow = 0;
         }*/
        ++iNow > imgs.length - 1 ? iNow = 0 : iNow;
        imgs[iNow].style.left = sliderwidth+ "px";
        // 当前的下一张，先快速的走到右侧
        // 再慢慢的走到舞台中央
        an(imgs[iNow],{left: 0});
        square();
    }
}

//    鼠標經過大盒子，就停止定時器
js_slider.onmouseover=function () {
    clearInterval(timer);
}

js_slider.onmouseout=function () {
    timer=setInterval(autoplay,2000);
}