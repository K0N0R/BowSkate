"use strict";
const canvasElement = document.getElementById('mainGame');
canvasElement.requestPointerLock();
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;
canvasElement.focus();
const ctx = canvasElement.getContext("2d");

let images = {};


const initPlayerLeftConfig = {
    posX: 100,
    posY: 100,
    raidus: 20,
    color: 'green'
};
const initPlayerRightConfig = {
    posX: 600,
    posY: 600,
    raidus: 20,
    color: 'blue'
}

const gameField = new GameField();
const leftPlayer = new Player(
    initPlayerLeftConfig.posX,
    initPlayerLeftConfig.posY,
    initPlayerLeftConfig.raidus,
    initPlayerLeftConfig.color,
    'keyboard');
// const rightPlayer = new Player(
//     initPlayerRightConfig.posX,
//     initPlayerRightConfig.posY,
//     initPlayerRightConfig.raidus,
//     initPlayerRightConfig.color,
//     'pad');
const camera = new Camera();
function loadImg(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
}


async function init() {

    mainLoop();
}

function mainLoop() {
    window.requestAnimationFrame(mainLoop);
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.beginPath();

    //camera.x = Math.sin(time*5) * 300;
    camera.fuckMyLife(ctx);
    gameField.render(ctx);

    leftPlayer.render(ctx);
    //rightPlayer.render(ctx);

    camera.fuckMyLifeEnd(ctx);

};

init();