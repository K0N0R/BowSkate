class Bow {

	public posX = 0;
	public posY = 0;
	public size = 0;
	public rotation = 0;
	public aimingRotation = 0;
	public arrowSpeed = 0.25;
	public inputMethod = "";
	public arrows = [];
	public isMouseDown = false;
	public isAiming = false;
	public totalAmingTime = 100;
	public mouseDownDebouneTime = 7;
	public currentAimingTime = 0;
	public chordDrawLength = 0;
	public maxChordDrawLength = 45;

	public pushArrow = false;
	public wasReleased = false;
	public previewArrow: SimpleArrow;
	public moveVX = 0;
	public moveVY = 0;

	public aimPoint: AimPoint;


	constructor(posX, posY, size, inputMethod) {
		this.posX = posX;
		this.posY = posY;
		this.size = size;
		this.inputMethod = inputMethod;
		this.currentAimingTime = -this.mouseDownDebouneTime;
		this.previewArrow = new SimpleArrow(this.posX, this.posY);
		this.aimPoint = new AimPoint(this.posX, this.posY);
		this.pinEvents();
	}

	recalculateRotation() {
		let vx = this.aimPoint.posX - this.aimPoint.anchorPosX;
		let vy = this.aimPoint.posY - this.aimPoint.anchorPosY;
		this.aimingRotation = Math.atan2(vy, vx);
	}

	pinEvents() {
		if (this.inputMethod === 'keyboard') {
			let onMouseMove = (e) => {
				this.recalculateRotation();
			}

			let onMouseUp = (e) => {
				this.isMouseDown = false;
				this.pushArrow = true;

			}

			canvasElement.addEventListener("mousemove", onMouseMove)
			canvasElement.addEventListener("mouseup", onMouseUp);
			canvasElement.addEventListener("mousedown", (e) => {
				this.isMouseDown = true;
			});
		}
	}

	render(ctx) {
		this.aimPoint.render(ctx);
		this.logic();
		ctx.beginPath();
		ctx.save();
		if (this.inputMethod === "keyboard") {
			if (this.isAiming) {
				this.chordDrawLength = 0;
				let chordVX = this.aimPoint.anchorPosX - this.aimPoint.posX;
				let chordVY = this.aimPoint.anchorPosX - this.aimPoint.posY;
				let chordV = {
					x: chordVX / this.aimPoint.maxDistanceFromAnchor * this.currentAimingTime,
					y: chordVY / this.aimPoint.maxDistanceFromAnchor * this.currentAimingTime
				}

				this.chordDrawLength = Math.sqrt(chordV.x * chordV.x + chordV.y * chordV.y);
				if (this.chordDrawLength < 0) {
					this.chordDrawLength = 0;
				}
				if (this.chordDrawLength > this.maxChordDrawLength) {
					this.chordDrawLength = this.maxChordDrawLength;
				}
				this.chordDrawLength = -this.chordDrawLength;
			}

		}
		else if (this.inputMethod === "pad") {
			if (this.isAiming)
				this.chordDrawLength = -9.3;
		}


		if (this.isAiming && Math.abs(this.chordDrawLength) > 0 || this.inputMethod === "pad") {
			this.rotation += getAngleDiff(this.aimingRotation, this.rotation) / 10;
		}
		else {
			this.rotation += getAngleDiff(this.aimingRotation, this.rotation) / 10;
		}

		for (let arrow of this.arrows) {
			arrow.render(ctx);
		}

		ctx.translate(this.posX, this.posY);
		ctx.rotate((this.rotation + Math.PI / 2) + Math.PI);
		// ctx.translate(-this.size / 2, -this.size / 2);

		ctx.beginPath();

		ctx.strokeStyle = 'black';
		ctx.lineWidth = 5;
		ctx.arc(0, 0, this.size, 0, Math.PI, false); //drewno luku

		ctx.stroke();

		// cieciwa

		ctx.lineWidth = 1;
		ctx.strokeStyle = `#${(this.currentAimingTime.toString(16) as any).padStart(2, "0")}0000`;
		ctx.beginPath();
		ctx.moveTo(-this.size, 0);

		ctx.lineTo(0, this.chordDrawLength);
		ctx.lineTo(this.size, 0)
		ctx.stroke();
		if (this.isAiming) {
			ctx.rotate(Math.PI);
			ctx.translate(0, -this.previewArrow.length - this.chordDrawLength);
			this.previewArrow.render(ctx, true);
		}
		ctx.restore();

	}

	logic() {
		if (!this.isAiming && this.isMouseDown) {
			if (this.currentAimingTime <= 0) {
				this.currentAimingTime++;
			}
			else {
				this.isAiming = true;
			}
			this.pushArrow = false;
		}
		if (this.isAiming && this.isMouseDown) {
			if (this.currentAimingTime < this.totalAmingTime) {
				this.currentAimingTime++;
			}
			else {
				this.currentAimingTime = this.totalAmingTime;
			}
		}
		if (this.inputMethod === 'pad') {
			let controller = navigator.getGamepads()[0];
			if (controller) {
				let vx = controller.axes[GamepadInput.handledPadAxis.rightX];
				let vy = controller.axes[GamepadInput.handledPadAxis.rightY];
				if ((Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02)) {
					this.aimingRotation = Math.atan2(-vy, -vx);
				}
				console.log(vy, vx, this.aimingRotation);

				if ((Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) && this.wasReleased) {
					this.isAiming = true;
					this.wasReleased = false;
				}

				if (!(Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01)) {
					this.wasReleased = true;
					this.isAiming = false;
				}

				// console.log(JSON.stringify(controller.axes[GamePadInput.handledPadAxis.rightX]));
			}
		}

		if (this.isAiming) {
			if (this.currentAimingTime < this.totalAmingTime) {
				this.currentAimingTime += 2;
			}
			else
				this.currentAimingTime = this.totalAmingTime;
		}
		if (this.isAiming && this.pushArrow && this.currentAimingTime && this.chordDrawLength) {

			let vx = (this.aimPoint.posX - this.aimPoint.anchorPosX) / this.aimPoint.maxDistanceFromAnchor * this.arrowSpeed * this.currentAimingTime;
			let vy = (this.aimPoint.posY - this.aimPoint.anchorPosY) / this.aimPoint.maxDistanceFromAnchor * this.arrowSpeed * this.currentAimingTime;

			if (this.inputMethod === "pad") {
				let controller = navigator.getGamepads()[0];
				if (controller) {
					vx = controller.axes[GamepadInput.handledPadAxis.rightX] / 5;
					vy = controller.axes[GamepadInput.handledPadAxis.rightY] / 5;
				}
			}

			if (vx !== 0 || vy !== 0) {
				if (this.arrows.length > 10) {
					this.arrows.shift();
				}
				this.arrows.push(new Arrow(this.posX, this.posY, vx + this.moveVX, vy + this.moveVY));
			}
			this.currentAimingTime = -this.mouseDownDebouneTime;
			this.pushArrow = false;
			this.isAiming = false;
			this.chordDrawLength = 0;
		}
	}

	updatePosition({x, y, moveVX, moveVY}) {
		if (x != null) {
			this.posX = x;
		}

		if (y != null) {
			this.posY = y;
		}

		if (this.moveVX != null) {
			this.moveVX = moveVX;
		}

		if (this.moveVX != null) {
			this.moveVY = moveVY;
		}

		this.aimPoint.updateAnchorPos(this.posX - this.size / 2, this.posY - this.size / 2);

		this.recalculateRotation();
	}
}