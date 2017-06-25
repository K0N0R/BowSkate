class Bow {
    constructor(posX, posY, size, inputMethod) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.rotation = 0;
        this.aimingRotation = 0;
        this.targetRotation = 0;
        this.arrowSpeed = 50;
        this.inputMethod = inputMethod;
        this.arrowStartPosX = this.posX;
        this.arrowStartPosY = this.posY;
        this.arrows = [];
        this.lastMousePosX = 0;
        this.lastMousePosY = 0;
        this.isAiming = false;
        this.totalAmingTime = 250;
        this.currentAimingTime = 0;
        this.dupa = 0;
        this.wasReleased = true;
        this.previewArrow = new SimpleArrow(this.posX, this.posY);
        
        this.aimPoint = new AimPoint(this.posX, this.posY);
        this.pinEvents();
    }

    recalculateRotation() {
        
        if (this.isAiming) {
            let vx = this.lastMousePosX - this.arrowStartPosX;
            let vy = this.lastMousePosY - this.arrowStartPosY;
            this.aimingRotation = Math.atan2(-vy, -vx);

        } else {

            let vx = this.lastMousePosX - this.posX;
            let vy = this.lastMousePosY - this.posY;
            this.targetRotation = Math.atan2(vy, vx);
        }
    }



    pinEvents() {
        if (this.inputMethod === 'keyboard') {
            let onMouseMove = (e) => {
                this.lastMousePosX = e.clientX;
                this.lastMousePosY = e.clientY;
                this.recalculateRotation();
            }

            let onMouseUp = (e) => {
                this.currentAimingTime = this.totalAmingTime + 10;
                setTimeout(()=>{
                    this.isAiming = false;
                })
                

            }

            canvasElement.addEventListener("mousemove", onMouseMove)
            canvasElement.addEventListener("mouseup", onMouseUp);
            canvasElement.addEventListener("mousedown", (e) => {
                this.isAiming = true;
                this.arrowStartPosX = e.clientX;
                this.arrowStartPosY = e.clientY;
            });
        }
    }

    render(ctx) {
        this.aimPoint.render(ctx);
        this.logic();
        ctx.beginPath();
        ctx.save();
        let maxChordDrawLength = 100;
        let chordDrawLength = 0;
        if (this.inputMethod === "keyboard") {
            if (this.isAiming) {
                let chordVX = this.lastMousePosX - this.arrowStartPosX;
                let chordVY = this.lastMousePosY - this.arrowStartPosY;
                chordDrawLength = -Math.sqrt(chordVX * chordVX + chordVY * chordVY) < maxChordDrawLength ? -Math.sqrt(chordVX * chordVX + chordVY * chordVY) : maxChordDrawLength ;
            }

        } else if(this.inputMethod === "pad") {
            if (this.isAiming)
                chordDrawLength = -9.3;
        }


        if (this.isAiming && Math.abs(chordDrawLength) > 0 || this.inputMethod === "pad") {
            this.rotation += getAngleDiff(this.aimingRotation, this.rotation) / 10;
        } else {
            this.rotation += getAngleDiff(this.targetRotation, this.rotation) / 10;
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
        ctx.strokeStyle = `#${this.currentAimingTime.toString(16).padStart(2, "0")}0000`;
        ctx.beginPath();
        ctx.moveTo(-this.size, 0);

        ctx.lineTo(0, chordDrawLength);
        ctx.lineTo(this.size, 0)
        ctx.stroke();
        if (this.isAiming) {
            ctx.rotate(Math.PI);
            ctx.translate(0, -this.previewArrow.dlugoscPenisa - chordDrawLength);
            this.previewArrow.render(ctx, true);
        }
        ctx.restore();

    }

    logic() {

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
                this.currentAimingTime += 10;
            }
            else {
                this.isAiming = false;
                this.currentAimingTime = 0;

                let vx = (this.lastMousePosX - this.arrowStartPosX) / canvasElement.width;
                let vy = (this.lastMousePosY - this.arrowStartPosY) / canvasElement.height;

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
                    this.arrows.push(new Arrow(this.posX, this.posY, -vx * this.arrowSpeed, -vy * this.arrowSpeed));
                }
            }

        } else {

            this.currentAimingTime = 0;
        }

    }

    updatePosition({ x, y }) {
        if (x != null) {
            this.posX = x;
        }
        if (y != null) {
            this.posY = y;
            
        }
        this.aimPoint.updateAnchorPos(this.posX, this.posY);

        this.recalculateRotation();
    }
}