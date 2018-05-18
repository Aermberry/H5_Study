function Rectobject(option) {

}

Rectobject.prototype={
    _init:function (option) {
        this.width=option.width;
        this.height=option.height;
        this.x=option.x;
        this.y=option.y;
        this.Scalx=option.Scalx;
        this.Scaly=option.Scaly;
        this.angle=option.angle*Math.PI/180;
        this.opacity=option.opacity;
        this.lineWidth=option.lineWidth;
        this.stroke=option.stroke;
        this.fill=option.fill;
    },
    render:function (canvas) {
        canvas.save();
        canvas.scale(this.Scalx,this.Scaly);
        canvas.translate(this.x+this.width/2,this.y+this.height/2);
        canvas.rect(-this.width/2,-this.height/2,this.width,this.height);
        canvas.lineWidth=this.lineWidth;
        canvas.strokeStyle=this.stroke;
        canvas.fillStyle=this.fill;
        canvas.stroke();
        canvas.fill();
        canvas.restore();
    },
    to:function (canvas) {
        var self=this;
        setInterval(function () {
            canvas.canvas.width=canvas.canvas.width;
            self.x +=2;
            self.render(canvas);
            canvas.restore();
        })
    }
}
