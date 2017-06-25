"use strict";

class GameField {
    constructor() {
        this.borderSize = 20;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, canvasElement.width, this.borderSize);
        ctx.rect(0, 0, this.borderSize, canvasElement.height);
        ctx.rect(canvasElement.width - this.borderSize, 0, this.borderSize, canvasElement.height);
        ctx.rect(0, canvasElement.height - this.borderSize, canvasElement.width, this.borderSize);
        ctx.fill();
    }
}