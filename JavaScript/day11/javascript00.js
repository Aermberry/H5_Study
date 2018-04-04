/**
 * Created by SALMON on 2017/7/15.
 */
function $(id) {
    return document.getElementById(id);
}
function scroll() {
    if(window.pageXOffset!=null){
        //ie9+
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }

    else if(document.compatMode=="CSS1Compat"){
        return{
            //標準瀏覽器
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
    return{
        //異常瀏覽器
        top:document.body.scrollTop,
        left:document.body.scrollLeft
    }
}