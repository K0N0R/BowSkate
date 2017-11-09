
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
        window.addEventListener('mousemove', (e) => {
            this.lastPosX = e.clientX - window.innerWidth/2;
            this.lastPosY = e.clientY - window.innerHeight/2;

        });
    }
    render(ctx) {
        this.logic();
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.rotate(this.rotation);
        //grot
        ctx.beginPath()
        ctx.arc(-10, 12.5, 5, 0, 2 * Math.PI, true);
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
        this.anchorPosY = posY;
    }

    logic() {
            let vx = this.lastPosX;
            let vy = this.lastPosY;
            let currentDistanceFromAnchor = Math.sqrt(vx*vx + vy*vy);
            this.rotation = Math.atan2(vy, vx);
            let pointerPos = {
                x:vx,
                y:vy
            }
            console.log('mousepos', this.lastPosX, this.lastPosY)
            console.log('aimpoint', this.posX, this.posY)
            console.log('anchor', this.anchorPosX, this.anchorPosY)
            
            this.posX = this.anchorPosX + pointerPos.x;
            this.posY = this.anchorPosY + pointerPos.y;

    }
}


