function Spirit(option) {
    this._init(option);
}

Spirit.prototype={
    _init:function (option) {
    //    人物在canvas上的坐标定位
        this.x=option.x;
        this.y=option.y;
    //    人物在图片上的宽高
        this.width=option.width;
        this.height=option.height;
    //    人物在canvans上的宽高
        this.inCanw=option.inCanw;
        this.inCanh=option.inCanh;
    //    人物的路径
        this.imgSrc=option.imgSrc;
    //    运动的速度
        this.speed=option.spacing;
    //    运动方向
        this.dir=option.dir;
    },

//    渲染人物
    render:function (content) {
        var img=new Image();
        img.src=this.imgSrc;

        var self=this;

           img.onload=function () {
               //图片的运动状态
               var statIndex=0;
               setInterval(function () {
                   content.clearRect(0,0,content.canvas.width,content.canvas.height);
                   content.drawImage(img,self.width*statIndex,self.height*self.dir,self.width,self.height,self.x,self.y,self.inCanw,self.inCanh);
                   //    drawimage的用法drawImage(剪裁位置定位x,剪裁位置定位y,剪裁的高height,剪裁的宽width,图片的坐标定位x,图片的坐标定位y,图片的高height，图片的宽width),这里的图片的坐标和大小是以剪裁后的图片为基准，进行图片的放大缩小
                   statIndex++;
                   statIndex=statIndex%4;
               },10000/self.speed);
           }
    },
    
//    方向的选择
    direction:function (dir) {
        switch (dir){
            case "left":
                this.dir=1;
                break;
            case "right":
                this.dir=2;
                break;
            case "backforward":
                this.dir=3;
                break;
            case "frontword":
                this.dir=0;
                break;
            default:
                this.dir=0;
                break;
        }

    }
}