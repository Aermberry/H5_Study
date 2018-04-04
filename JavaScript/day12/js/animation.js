
function an(obj,jsion,fn) {
//      leader=leader+(target-leader)/100;
    clearInterval(obj.timer);
    obj.timer=setInterval(
        function () {
            var flag = true;
            for (var k in jsion) {
//              leader的取值選擇
                var leader = 0;
                if (k=="opacity"){
                    leader=Math.round(getstyle(obj,k)*100)||100 ;
                //    四捨五入的目的是為了取整，計算機不善於計算小數
                }
                else {
                    leader = parseInt(getstyle(obj, k)) || 0;
                }

                var step = (jsion[k] - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
//              取step的極值，保持step不抖動
                leader = leader + step;

//              leader的賦值要分帶單位和不帶單位的情況
                if (k == "opacity") {
                    obj.style.opacity = leader / 100;
                    obj.style.filter = "alpha(opacity=" + leader + ")";
                }
                else if(k == "zIndex") {
                    obj.style.zIndex = json[k];    //  直接给值
                }
                else {
                    obj.style[k] = leader + "px";
                }
//              什麼時候定時器停止呢
                if (leader != jsion[k]) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer)
                if (fn) {
                    fn();
                }
            }
        },30)
}

function getstyle(obj,arr) {
    if(obj.currentStyle){
        return obj.currentStyle[arr];
    }
    else {
        return  window.getComputedStyle(obj,null)[arr]
    }
}