"use strict";

class Arrow extends SimpleArrow {
	constructor(x, y, vx, vy) {
		super(x, y);
		this.vx = vx;
		this.vy = vy;
	}

	render(ctx) {
		this.logic();
		this.rotation = Math.atan2(this.vy, this.vx) + Math.PI / 2;
		super.render(ctx);
	}

	logic() {
		if (this.y < canvasElement.height - gameField.borderSize + 1) {
			this.vy += .09;
			this.vx -= .001 * this.vx;
			this.x += this.vx;
			this.y += this.vy;
		}

	}
}


