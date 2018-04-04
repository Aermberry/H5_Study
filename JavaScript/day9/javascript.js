/**
 * Created by SALMON on 2017/7/3.
 */
function scroll() {//封裝scroll函數
    if(window.pageYOffset!=null){
        //為什麼這樣寫，因為window.pageYOffset的默認值是0,0即是true,1即是false
//            ie9及高級版本的瀏覽器這樣寫
        return{
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }

    else if(document.compatMode==="CSS1Compat"){
//            標準瀏覽器這樣寫
//            document.compatMode用於檢測頁面有沒有聲明DTD
        return{
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }

    }
    return{//為聲明DTD
        left:document.body.scrollLeft,
        top:document.body.scrollTop

    }


}