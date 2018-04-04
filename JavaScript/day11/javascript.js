/**
 * Created by SALMON on 2017/7/14.
 */
function scroll() {
    if(window.pageYOffset!=null){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }

    else if(document.compatMode=="CSS1Compat"){
        return{
            top:document.documentElement.clientTop,
            left:document.documentElement.clientLeft
        }
    }

    return{
        top:document.body.clientTop,
        left:document.body.clientLeft
    }
}