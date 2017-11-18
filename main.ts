"use strict";
console.log("TEST");
const canvasElement = document.getElementById('mainGame') as HTMLCanvasElement;
canvasElement.requestPointerLock();

canvasElement.width = window.innerWidth * 2;
canvasElement.height = window.innerHeight * 2;
canvasElement.focus();
const ctx = canvasElement.getContext("2d");

let images = {};

const gameField = new GameField();

const camera = new Camera(0,0);

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

	gameField.render(ctx);

};

init();