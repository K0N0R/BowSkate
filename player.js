"use strict";

class Player {


    constructor(posX, posY, radius, color, inputMethod) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.inputMethod = inputMethod;
        this.bow = new Bow(this.posX, this.posY, this.radius, this.inputMethod);

        this.keyCodes = new Array(256);
        this.handledKeys = Object.freeze({
            w: 87,
            s: 83,
            d: 68,
            a: 65,
            f: 70
        });

        this.moveVectorX = 0;
        this.moveVectorY = 0;

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
            if (this.keyCodes[this.handledKeys.w] && this.posY === canvasElement.height - gameField.borderSize - this.radius) {
                this.moveVectorY = -8;
            }
            if (this.keyCodes[this.handledKeys.a]) {
                this.moveVectorX = -2;
            }
            if (this.keyCodes[this.handledKeys.d]) {
                this.moveVectorX = 2;
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

        this.posX += this.moveVectorX;
        if (this.posX < gameField.borderSize + this.radius) {
            this.posX = gameField.borderSize + this.radius;
        }
        if (this.posX > canvasElement.width - gameField.borderSize - this.radius) {
            this.posX = canvasElement.width - gameField.borderSize - this.radius
        }
        this.posY += this.moveVectorY;
        if (this.posY > canvasElement.height - gameField.borderSize - this.radius) {
            this.posY = canvasElement.height - gameField.borderSize - this.radius;
            this.moveVectorY = 0;  
        }
        else {
            this.moveVectorY += 0.2;
        }

        if (Math.abs(this.moveVectorX) > 0.06) {
            this.moveVectorX -= this.moveVectorX / 10;
        } else {
            this.moveVectorX = 0;
        }

        this.bow.updatePosition({ x: this.posX, y: this.posY });
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

}