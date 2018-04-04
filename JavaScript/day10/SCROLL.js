/**
 * Created by SALMON on 2017/7/6.
 */
function $(id) {
    return document.getElementById(id)
}

function hide(id) {
    $(id).style.display="none"
}

function show(id) {
    $(id).style.display="block"
}

function scroll() {
    if (window.pageYOffset!=null){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }

    else if(document.compatMode=="CSS1Compat"){
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
