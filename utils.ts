function getAngleDiff(angle1, angle2) {
	return Math.atan2(Math.sin(angle1 - angle2), Math.cos(angle1 - angle2))
}

let GamepadInput = {
	handledPadAxis: {
		leftX: 0,
		leftY: 1,
		rightX: 2,
		rightY: 5,
	},
	handledPadButtons: {
		y: 0,
		b: 1,
		a: 2,
		x: 3,
		lSmallTrigger: 4,
		rSmallTrigger: 5,
		lBigTrigger: 6,
		rBigTrigger: 7,
		select: 8,
		start: 9,
		lThumbTrigger: 10,
		rThumbTrigger: 11,
	},

}


interface IPosition {
	x:number;
	y:number;
}