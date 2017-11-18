class Trolley {
    constructor (x, y, player) {

    this.position = {
        x: x,
        y: y,
    }
    this.player = player;
    this.vx = 0.2;
    this.size = {
        width: 100,
        height: 50
    };
    this.strokeWidth = 5;
    this.floorColor = '#676767';
    this.borderColor = '#000088';
}


    renderFloor() {
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fillStyle = this.floorColor;
        ctx.fill();
        ctx.closePath();
    }

    renderBorders() {
        ctx.beginPath();
        this.renderUpperBorder();
        this.renderLowerBorder();
        this.renderLeftBorder();
        this.renderRightBorder();
        ctx.fillStyle = this.borderColor;
        ctx.fill();
        ctx.closePath();
    }

    renderUpperBorder() {
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.strokeWidth);
    }
    renderLowerBorder() {
        ctx.fillRect(this.position.x, this.position.y + this.size.height, this.size.width, this.strokeWidth);
    }
    renderLeftBorder() {
        ctx.fillRect(this.position.x, this.position.y, this.strokeWidth, this.size.height);
    }
    renderRightBorder() {
        ctx.fillRect(this.position.x + this.size.width - this.strokeWidth, this.position.y, this.strokeWidth, this.size.height);
    }
    
    render() {
        this.logic();
        this.renderFloor();
        this.renderBorders();
    }

    logic() {
        this.handleMovment();
        this.handleCollisions();
    }

    handleMovment() {
        this.position.x += this.vx;
    }

    handleCollisions() {
        let playerSize = this.player.radius;
        // RIGHT COLLISION
        if (this.player.posX + playerSize > this.position.x + this.size.width) {
            this.player.posX = this.position.x + this.size.width - playerSize;
        }
        // LEFT COLLISION
        if (this.player.posX - playerSize < this.position.x) {
            this.player.posX = this.position.x + playerSize;
        }
        // UPPER COLLISION
        if (this.player.posY - playerSize < this.position.y) {
            this.player.posY = this.position.y + playerSize;
        }
        // LOWER COLLISION
        if (this.player.posY + playerSize > this.position.y + this.size.height) {
            this.player.posY = this.position.y + this.size.height - playerSize;
        }

    }
}