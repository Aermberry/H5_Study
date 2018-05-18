function Rect2(option) {
    this._init(option);
}

Rect2.prototype={
    _init:function (option) {
        this.start_x=option.start_x;
        this.start_y=option.start_y;
        this.width=option.width;
        this.height=option.height;
        this.scaleX=option.scaleX;
        this.scaleY=option.scaleY;
        this.angle=option.angle*Math.PI/180;
        this.opacity=option.opacity;
        this.lineWidth=option.lineWidth;
        this.fillcolor=option.fillcolor;
        this.strokecolor=option.strokecolor;
    },
    render:function (object) {
        object.save();
        object.scale(this.scaleX,this.scaleY);
        object.translate(this.start_x+this.width/2,this.start_y+this.height/2);
        object.rotate(this.angle);
        object.rect(-this.width/2,-this.height/2,this.width,this.height);
        object.lineWidth=this.lineWidth;
        object.fillStyle=this.fillcolor;
        object.strokeStyle=this.strokecolor;
        object.fill();
        object.stroke();
        object.restore();
    },
    to:function (object) {
        var self=this;
        setInterval(
            function () {
                object.canvas.width=object.canvas.width;//重置画布
                self.x+=2;
                self.render(object);
                object.restore();
            },50
        )//注意这里时window的调用
    }

}
    