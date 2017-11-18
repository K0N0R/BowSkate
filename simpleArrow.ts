class SimpleArrow {

    public x = 0;
    public y = 0;
    public rotation = 0;
    public length = 30;


   constructor(x,y) {
         this.x = x;
         this.y = y;
   }

   render(ctx, dontTransform = false) {
        ctx.save();
        if (!dontTransform) {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
        }

        ctx.strokeStyle = "black";
        ctx.fillStyle = 'black';
        ctx.beginPath();
    
        ctx.moveTo(0, this.length);
        ctx.lineTo(0, 0)
        ctx.stroke();
        //grot
        ctx.beginPath()
        ctx.lineTo(-3,5);
        ctx.lineTo(3,5);
        ctx.lineTo(0, 0)
        ctx.fill();
        ctx.beginPath()
        //lotka prawa
        ctx.moveTo(0, this.length);
        ctx.lineTo(2, this.length + 2);
        ctx.lineTo(2, this.length - 5);
        ctx.lineTo(0, this.length - 7);
        //lotka lewa
        ctx.moveTo(0, this.length);
        ctx.lineTo(-2, this.length + 2);
        ctx.lineTo(-2, this.length - 5);
        ctx.lineTo(0, this.length - 7);
        ctx.stroke();
        ctx.restore();
   }
}