"use strict";

class Player {

    public posX = 0;
    public posY = 0;
    public originalRadius = 0;
    public radius = 0;
    public color = "";
    public inputMethod = "";
    public bow:Bow;

    public keyCodes:boolean[];
    public handledKeys = {
		w: 87,
		s: 83,
		d: 68,
		a: 65,
		f: 70,
		enter: 13
	};

    public moveVectorX = 0;
    public moveVectorY = 0;
    public radiusGrow = 0;
    public controller;

    constructor(posX, posY, radius, color, inputMethod) {
        this.posX = posX;
        this.posY = posY;
        this.originalRadius = radius;
        this.radius = radius;
        this.color = color;
        this.inputMethod = inputMethod;
        this.bow = new Bow(this.posX, this.posY, this.radius, this.inputMethod);

        this.keyCodes = new Array(256);

        this.pinEvents();
    }

    pinEvents() {
        if (this.inputMethod === 'keyboard') {
            window.addEventListener('keydown', (e) => {
                let key = e.keyCode;
                if (key) {
                    this.keyCodes[key] = true;
                }

            });
            window.addEventListener('keyup', (e) => {
                let key = e.keyCode;
                if (key) {
                    this.keyCodes[key] = false;
                }
            });
            window.addEventListener('keyup', (e) => {
                let key = e.keyCode;
                if (key) {
                    this.keyCodes[key] = false;
                }
            });
        } else if (this.inputMethod === 'pad') {
            this.controller = navigator.getGamepads()[0];
        }

    }

    logic() {
        this.handleMove();

    }

    handleMove() {
        var controller = navigator.getGamepads()[0];
        if (this.inputMethod === 'keyboard') {
            if (this.keyCodes[this.handledKeys.w]) {
                this.moveVectorY = -2;
            }
            if (this.keyCodes[this.handledKeys.a]) {
                this.moveVectorX = -4;
            }
            if (this.keyCodes[this.handledKeys.d]) {
                this.moveVectorX = 4;
            }
            if (this.keyCodes[this.handledKeys.s]) {
                this.moveVectorY = 2;
            }
            if (this.keyCodes[this.handledKeys.enter] && this.radius === this.originalRadius) {
                this.radiusGrow += 1.5;
            }
        } else if (controller && this.inputMethod === 'pad') {
            let leftX = controller.axes[GamepadInput.handledPadAxis.leftX];
            if (leftX === -1) {
                this.moveVectorX = -2;
            }
            if (leftX === 1) {
                this.moveVectorX = 2;
            }
            let leftY = controller.axes[GamepadInput.handledPadAxis.leftY];
            if (leftY === -1 && this.posY === canvasElement.height - gameField.borderSize - this.radius) {
                this.moveVectorY = -8
            }

        }

        this.radius += this.radiusGrow;
        this.posX += this.moveVectorX;
        this.posY += this.moveVectorY;

        if(this.radiusGrow > 0.06  ) {
            this.radiusGrow -= this.radiusGrow / 10;
        } else if(this.radius > this.originalRadius && this.radiusGrow < 0.06 ) {
            this.radiusGrow = -Math.abs(this.radiusGrow) * 1.2
        } 

        if(Math.abs(this.originalRadius - this.radius) < 1) {
            this.radiusGrow = 0;
            this.radius = this.originalRadius;
        } 
        

        if (Math.abs(this.moveVectorX) > 0.06) {
            this.moveVectorX -= this.moveVectorX / 10;
        } else {
            this.moveVectorX = 0;
        }

        if (Math.abs(this.moveVectorY) > 0.06) {
            this.moveVectorY -= this.moveVectorY / 10;
        } else {
            this.moveVectorY = 0;
        }

        this.bow.updatePosition({ x: this.posX, y: this.posY, moveVX:this.moveVectorX, moveVY:this.moveVectorY });
    }


    render(ctx) {
        this.logic();
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        this.bow.render(ctx);
    }

    renderPlayerCharacter() {}

}