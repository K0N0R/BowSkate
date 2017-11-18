
class AimPoint {

    public anchorPosX = 0;
    public anchorPosY = 0;
    public posX = 0;
    public posY = 0;
    public maxDistanceFromAnchor = 300;
    public size = 20;
    public rotation = 0;
    public angle = 0;
    public lastPosX = 0;
    public lastPosY = 0;

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
            this.rotation = Math.atan2(vy, vx);
            let pointerPos = {
                x:vx,
                y:vy
            };

            
            this.posX = this.anchorPosX + pointerPos.x;
            this.posY = this.anchorPosY + pointerPos.y;

    }
}


