"use strict";

class Camera {
    constructor(x=0) {
       this.x = x;
    }

    fuckMyLife(ctx) {
        ctx.save();
        ctx.translate(this.x, 0);
    }

    fuckMyLifeEnd(ctx) {
        ctx.restore();
    }
}