class SimpleArrow {
   constructor(x,y) {
         this.x = x;
         this.y = y;
         this.rotation = 0;
         this.dlugoscPenisa = 30;
   }

   render(ctx, dontTransform = false) {
        ctx.save();
        if (!dontTransform) {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
        }

        // console.log(this.dlugoscPenisa);
        ctx.strokeStyle = "black";
        ctx.fillStyle = 'black'
        ctx.beginPath();
    
        ctx.moveTo(0, this.dlugoscPenisa);
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
        ctx.moveTo(0, this.dlugoscPenisa);
        ctx.lineTo(2, this.dlugoscPenisa + 2);
        ctx.lineTo(2, this.dlugoscPenisa - 5);
        ctx.lineTo(0, this.dlugoscPenisa - 7);
        //lotka lewa
        ctx.moveTo(0, this.dlugoscPenisa);
        ctx.lineTo(-2, this.dlugoscPenisa + 2);
        ctx.lineTo(-2, this.dlugoscPenisa - 5);
        ctx.lineTo(0, this.dlugoscPenisa - 7);
        ctx.stroke();
        ctx.restore();
   }
}