"use strict";

class Camera {
    constructor(x, y) {
       this.x = x;
       this.y = y;
    }

    fuckMyLife(ctx) {
        ctx.save();
        ctx.translate(-this.x ,-this.y);
    }

    fuckMyLifeEnd(ctx) {
        ctx.restore();
    }

    updatePosition(x,y){
        this.x=x-window.innerWidth/2;
        this.y=y-window.innerHeight/2;
    }
}