class Rail {
	public scale = 1;
	public position = {x: 0, y: 0};
	public railLength = 0;
	public railStrokeWidth = 10 * this.scale;
	public railsBetween = 60 * this.scale;
	public connectorStroke = 20 * this.scale;
	public connectorsBetween = 150 * this.scale;

	public upperRailPosition:IPosition;
	public lowerRailPosition:IPosition;
	public beginingPosition:IPosition;
	public endingPosition:IPosition;
	public connectorsCollection:any[];
	public connectorsAmount =0;

	constructor(x, y, railLength) {
		this.position = {
			x: x,
			y: y
		};

		this.upperRailPosition = {
			x: this.position.x,
			y: this.position.y,
		};
		this.lowerRailPosition = {
			x: this.position.x,
			y: this.position.y + this.railsBetween
		};

		this.beginingPosition = {
			x: this.position.x - this.railsBetween - this.railStrokeWidth,
			y: this.position.y + this.railStrokeWidth / 2
		};
		this.endingPosition = {
			x: this.position.x + this.railLength + this.railStrokeWidth,
			y: this.position.y + this.railStrokeWidth / 2
		};

		this.connectorsCollection = this.calculateConnectorsCollection();
	}

	render() {
		ctx.beginPath();
		this.renderUpperRail();
		this.renderLowerRail();
		this.renderConnectors();
		this.renderBegining();
		this.renderEnding();
		ctx.closePath();
	}

	renderUpperRail() {
		ctx.fillRect(this.upperRailPosition.x, this.upperRailPosition.y, this.railLength, this.railStrokeWidth);
	}

	renderLowerRail() {
		ctx.fillRect(this.lowerRailPosition.x, this.lowerRailPosition.y, this.railLength, this.railStrokeWidth);
	}

	renderConnectors() {
		this.connectorsCollection.forEach(c => {
			ctx.fillRect(c.x, c.y, this.connectorStroke, this.railsBetween + (this.railStrokeWidth * 3));
		});
	}

	renderBegining() {
		ctx.fillRect(this.beginingPosition.x, this.beginingPosition.y, this.railsBetween, this.railsBetween);
	}

	renderEnding() {
		ctx.fillRect(this.endingPosition.x, this.endingPosition.y, this.railsBetween, this.railsBetween);
	}

	calculateConnectorsCollection() {
		let connectors = [];
		this.connectorsAmount = Math.round(this.railLength / this.connectorsBetween);
		for (let i = 0; i < this.connectorsAmount; i++) {
			connectors.push({
				x: this.position.x + this.connectorsBetween * i,
				y: this.position.y - this.railStrokeWidth //adjust from above
			});
		}
		return connectors;
	}
}