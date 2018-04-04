/**
 * Created by SALMON on 2017/7/3.
 */

function $(id) {
    return document.getElementById(id)
}

function show(id) {
    $(id).style.display="block"
}

function hide(id) {
    $(id).style.display="none"
}
<!--封裝scrolltop的方法-->
//            window.pageYoffeset的默認值為0
function scroll() {

    if(window.pageYOffset!=null){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }

    else if(document.compatMode==="CSS1Compat"){
//            判斷頁面是否聲明了DTD，標準瀏覽器具有DTD聲明
        return{
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }

    return{
        top:document.body.scrollTop,
        left:document.body.scrollLeft
    }
}