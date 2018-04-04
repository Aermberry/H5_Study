/**
 * Created by SALMON on 2017/7/8.
 */
<!--滾動的頭部方法-->
function $(id) {
    return document.getElementById(id);
}

function show(id) {
    $(id).style.display="block"
}

function hide(id) {
    $(id).style.display="none"
}
function scroll() {
    if(window.pageYOffset!=null){
//ie9+以上的版本以及正常的瀏覽器（除了ie678等）
//            為甚么判斷條件這樣寫，！=null
//            page YOffset的默認值是0
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }

    else if(document.compatMode=="CSS1Compat")
    {
        return{
            top:
            document.documentElement.scrollTop,
            left:
            document.documentElement.scrollLeft
        }
    }

    return{
        top:
        document.body.scrollTop,
        left:
        document.body.scrollLeft
    }
}