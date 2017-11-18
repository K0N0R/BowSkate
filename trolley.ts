
interface Dimension {
    x: number;
    y: number;
}

class Trolley {
    public position: Dimension;
    private player: Player;
    private v: Dimension;
    private size: Dimension;
    private border: {
        color: string;
        size: number;
    };
    private upperBorderPosition: Dimension;
    private lowerBorderPosition: Dimension;
    private leftBorderPosition: Dimension;
    private rightBorderPosition: Dimension;
    private floor: {
        color: string;
        size: Dimension
    }
    constructor (x: number, y: number, player?: Player,) {
        this.player = player;
        this.position = {
            x: x,
            y: y,
        }
        this.v = {
            x: 0.8,
            y: 0
        };

        this.border = {
            color: '#6d6d6d',
            size: 10
        };

        this.floor = {
            color: '#ADADAD',
            size: {
                x: 100,
                y: 70
            }
        }
    }

    // LOGIC
    logic() {
        this.trolleyLogic();
        if (this.player) {
            this.playerLogic();
        }
    }

    // TROLLEY LOGIC
    trolleyLogic() {
        this.trolleyPositionLogic();
        this.trolleyBorderPositionLogic();

    }
    trolleyPositionLogic() {
        this.position.x += this.v.x;
        this.position.y += this.v.y;
    }
    trolleyBorderPositionLogic() {
        this.upperBorderPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.lowerBorderPosition = {
            x: this.position.x,
            y: this.position.y + this.floor.size.y - this.border.size
        }
        this.leftBorderPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.rightBorderPosition = {
            x: this.position.x + this.floor.size.x - this.border.size,
            y: this.position.y
        }
    }

    // PLAYER LOGIC
    playerLogic() {
        this.playerPositionLogic();
        this.playerCollisionLogic();
    }

    playerPositionLogic() {
        this.player.posX += this.v.x;
    }

    playerCollisionLogic() {
        let playerSize = this.player.radius;
        
        // UPPER COLLISION
        if (this.player.posY < this.upperBorderPosition.y + this.border.size + playerSize) {
            this.player.posY = this.upperBorderPosition.y + this.border.size + playerSize;
        }
        // LOWER COLLISION
        if (this.player.posY > this.lowerBorderPosition.y - playerSize) {
            this.player.posY = this.lowerBorderPosition.y - playerSize;
        }

        // RIGHT COLLISION
        if (this.player.posX > this.rightBorderPosition.x - playerSize) {
            this.player.posX = this.rightBorderPosition.x - playerSize;
        }
        // LEFT COLLISION
        if (this.player.posX < this.leftBorderPosition.x + this.border.size + playerSize) {
            this.player.posX = this.leftBorderPosition.x + this.border.size + playerSize;
        }
    }

    // RENDER
    render() {
        this.logic();
        this.renderFloor();
        this.renderBorders();
    }

    // RENDER FLOOR
    renderFloor() {
        ctx.beginPath();
        ctx.fillStyle = this.floor.color;
        ctx.fillRect(this.position.x, this.position.y, this.floor.size.x, this.floor.size.y);
        ctx.closePath();
    }

    // RENDER BORDER
    renderBorders() {
        ctx.beginPath();
        ctx.fillStyle = this.border.color;
        this.renderUpperBorder();
        this.renderLowerBorder();
        this.renderLeftBorder();
        this.renderRightBorder();
        ctx.closePath();
    }
    renderUpperBorder() {
        ctx.fillRect(this.upperBorderPosition.x, this.upperBorderPosition.y, this.floor.size.x, this.border.size);
        //   ____
        //  
    }
    renderLowerBorder() {
        ctx.fillRect(this.lowerBorderPosition.x, this.lowerBorderPosition.y, this.floor.size.x, this.border.size);
        //   ____
        //   ____
    }
    renderLeftBorder() {
        ctx.fillRect(this.leftBorderPosition.x, this.leftBorderPosition.y, this.border.size, this.floor.size.y); 
        //  ____
        // |____

    }
    renderRightBorder() {
        ctx.fillRect(this.rightBorderPosition.x, this.rightBorderPosition.y, this.border.size, this.floor.size.y);
        //  ____
        // |____|
    }
}