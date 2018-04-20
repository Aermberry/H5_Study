$(window).on('load',function () {
    waterfall();


    var dataInt={
        "data":[
            {
                "src":"0.jpg"
            },
            {
                "src": "1.jpg"
            },
            {
                "src":"2.jpg"
            },
            {
                "src":"3.jpg"
            },
            {
                "src":"4.jpg"
            },
            {
                "src":"05.jpg"
            },
            {
                "src":"06.jpg"
            },
            {
                "src":"07.jpg"
            },
            {
                "src":"08.jpg"
            },
            {
                "src":"09.jpg"
            },
            {
                "src":"10.jpg"
            },
            {
                "src":"11.jpg"
            },
            {
                "src":"12.jpg"
            },
            {
                "src":"13.jpg"
            },
            {
                "src":"14.jpg"
            },
            {
                "src":"15.jpeg"
            },
            {
                "src":"16.jpg"
            },
            {
                "src":"17.jpg"
            },
            {
                "src":"18.jpg"
            },
            {
                "src":"19.jpg"
            }
        ]
    }
    $(window).on('scroll',function () {
        if(checkScrollSlide()){
            $.each(dataInt.data,function (key,value) {
                var oBox=$('<div>').addClass('box').appendTo($('#main'));
                var oPic=$('<div>').addClass('pic').appendTo($(oBox));
                var img=$('<img>').attr('src','img/'+$(value).attr('src')).appendTo($(oPic));
            })
            waterfall();
        }
    })
})

function waterfall() {
    var $boxs=$('#main>div');//获取main下的子级元素

    var w=$boxs.eq(0).outerWidth();//获取box的第一个元素的实际宽度
    var cols=Math.floor($(window).width()/w);//计算一行能容纳多少个box
    $("#main").width(cols*w).css('margin','0 auto');
    var hArr=[];
    $boxs.each(function (index,value) {
        var h=$boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }else {
            var minH=Math.min.apply(null,hArr);
            var minHindex=$.inArray(minH,hArr);
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':$boxs.eq(minHindex).offset().left+'px'
            })

            hArr[minHindex]+=$boxs.eq(index).outerHeight();
        }
    })
    // console.log(hArr);

}

function checkScrollSlide(){
    var $lastBox=$('#main>div').last();
    var lastDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop=$(window).scrollTop();
    var documentH=$(window).height();

    return (lastDis<scrollTop+documentH)?true:false

}