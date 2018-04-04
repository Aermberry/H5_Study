var js_slider=document.getElementById("js_slider");
//    alert(js_slider)
var slide_block=js_slider.children[0].children[0];
var imgs=slide_block.children;
var slide_ctrl=js_slider.children[1];

//  1.原生動態生成span
for(var a=0;a<imgs.length;a++){
    var span=document.createElement("span");
    span.className="slider-ctrl-con";
//由於insertBefore是根據參數c往前插入，所形成的順序是倒敘的
//        1（6-5），2（6-4），3（6-3），.....
    span.innerHTML=imgs.length-a;
//        a.insertBefore(b,c),a:插入的盒子，b：插入對象，c:插入位置
    slide_ctrl.insertBefore(span,slide_ctrl.children[1]);
}

//    2.給序列的第一個套上當前樣式

slide_ctrl.children[1].className="slider-ctrl-con current"

//    3.第一張圖在中央，其他的在右側
var sliderwith=js_slider.offsetWidth;
for (var a=1;a<imgs.length;a++){
    imgs[a].style.left=sliderwith+"px";
}
//    開始點擊三個按鈕
//   獲取所有的spans
var spans=slide_ctrl.children;
var iNow=0;

for (var a in spans){
    spans[a].onclick=function () {
        if(this.className=="slider-ctrl-prev"){
//                alert(11)
//                當前顯示的圖片向后推移
            an(imgs[iNow],{left:sliderwith});
//                iNow++;
////                console.log(iNow)
//                if(iNow>imgs.length-1){
//                    iNow=0;
//                }
//                三元運算符寫法
            --iNow<0?iNow=imgs.length-1:iNow;
//                將當前的圖片的下一張，移動到sliderwith的位置
            imgs[iNow].style.left=-sliderwith+"px"
//                然後載移動到當前的顯示位置
            an(imgs[iNow],{left:0});
            square();
        }
        else if(this.className=="slider-ctrl-next"){
            autoplay();
        }

        else {
//                alert(13)
            var that=this.innerHTML-1
//                先得到索引號，圖片的索引號是：0~5；
//                           小標籤的索引號是：1~6
//                要是得小標籤的索引號與圖片的索引號一致
            if(that>iNow){
                imgs[that].style.left=sliderwith+"px"
                an(imgs[iNow],{left:-sliderwith})
            }
            else if(that<iNow){
                imgs[that].style.left=-sliderwith+"px"
                an(imgs[iNow],{left:sliderwith})
            }
            iNow=that;
            an(imgs[iNow],{left:0});
            square();
        }
    }

    function square() {
        for (var a=1;a<spans.length-1;a++){
//                只給6個標籤標上序號
//                從1數起，去掉第0個
//                span 共8個，-1，即7個，<7,數不到7，共6個
            spans[a].className="slider-ctrl-con"
        }
        spans[iNow+1].className="slider-ctrl-con current"
    }
}

//    開啟定時器
var timer=null;
timer=setInterval(autoplay,2000);
function autoplay() {
//        alert(12)
//                當前顯示的圖片向前推移
    an(imgs[iNow],{left:-sliderwith});
//                iNow++;
////                console.log(iNow)
//                if(iNow>imgs.length-1){
//                    iNow=0;
//                }
//                三元運算符寫法
    ++iNow>imgs.length-1?iNow=0:iNow;
//                將當前的圖片的下一張，移動到sliderwith的位置
    imgs[iNow].style.left=sliderwith+"px"
//                然後載移動到當前的顯示位置
    an(imgs[iNow],{left:0});
    square();
}

js_slider.onmouseover=function () {
    clearInterval(timer);
}

js_slider.onmouseout=function () {
    timer=setInterval(autoplay,2000);
}
