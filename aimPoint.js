
class AimPoint {
    constructor(anchorPosX, anchorPosY) {
        this.anchorPosX = anchorPosX;
        this.anchorPosY = anchorPosY;
        this.posX = 0;
        this.posY = 0;
        this.maxDistanceFromAnchor = 300;
        this.size = 20;
        this.rotation = 0;
        this.angle = 0.1;
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.pinEvents();
    };
    pinEvents() {
        canvasElement.addEventListener('mousemove', (e) => {
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;

        });
    }
    render(ctx) {
        this.logic();
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.rotate(this.rotation);
        //grot
        ctx.beginPath()
        ctx.lineTo(-10,5);
        ctx.lineTo(10,10);
        ctx.lineTo(10, 0)
        ctx.fill();
        ctx.restore();

        //ctx.rotate((this.rotation + Math.PI / 2) - Math.PI);

        // ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
        // ctx.fillStyle = 'green';
        // ctx.fill();
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();

    }
    updateAnchorPos(posX, posY){
        this.anchorPosX = posX;
        this.anchorPosY = posY
    }

    logic() {
            let vx = this.anchorPosX - this.lastPosX;
            let vy = this.anchorPosY - this.lastPosY;
            let currentDistanceFromAnchor = Math.sqrt(vx*vx + vy*vy);
            this.rotation = Math.atan2(-vy, -vx);
            let pointerPos = {
                x:-1* vx/currentDistanceFromAnchor * this.maxDistanceFromAnchor,
                y:-1 * vy/currentDistanceFromAnchor * this.maxDistanceFromAnchor
            }

            
            this.posX = this.anchorPosX + pointerPos.x;
            this.posY = this.anchorPosY + pointerPos.y;

    }
}

