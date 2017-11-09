"use strict";

class GameField {
    constructor() {
        this.borderSize = 20;
        this.initMainPlayerConfig = {
            position: {
                x: 200,
                y: 300
            },
            radius: 20,
            color: 'yellow',
            inputMethod: 'keyboard'
        };
        this.init2PlayerConfig = {
            posX: 600,
            posY: 600,
            radius: 50,
            color: 'blue',
            inputMethod: 'pad'
        };

        this.rails = [
            new Rail(this.initMainPlayerConfig.position.x, this.initMainPlayerConfig.position.y, canvasElement.width),
            new Rail(this.initMainPlayerConfig.position.x, 360  , canvasElement.width)
        ]


        this.camera = new Camera(this.initMainPlayerConfig.posX, this.initMainPlayerConfig.posY);
        // this.2Player = new Player(
        //     init2PlayerConfig.posX,
        //     init2PlayerConfig.posY,
        //     init2PlayerConfig.raidus,
        //     init2PlayerConfig.color,
        //     'pad');
        this.mainPlayer = new Player(
            this.initMainPlayerConfig.position.x,
            this.initMainPlayerConfig.position.y,
            this.initMainPlayerConfig.radius,
            this.initMainPlayerConfig.color,
            this.initMainPlayerConfig.inputMethod);

    }

    render(ctx) {
        
        this.camera.fuckMyLife(ctx);
        this.rails.forEach(r => { r.render();});
        // <map ---------------------------------
        // ctx.beginPath();
        // ctx.rect(0, 0, canvasElement.width, this.borderSize);
        // ctx.rect(0, 0, this.borderSize, canvasElement.height);
        // ctx.rect(canvasElement.width - this.borderSize, 0, this.borderSize, canvasElement.height);
        // ctx.rect(0, canvasElement.height - this.borderSize, canvasElement.width, this.borderSize);
        // ctx.fill();
        // </map ---------------------------------
        this.camera.updatePosition(this.mainPlayer.posX, this.mainPlayer.posY);
        this.mainPlayer.render(ctx);
        
        //this.2Player.render(ctx);

        this.camera.fuckMyLifeEnd(ctx);

    }

}