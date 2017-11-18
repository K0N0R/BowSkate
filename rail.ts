class Rail {
    constructor(x, y, railLength) {
        this.scale = 1;
        this.position = {
            x: x,
            y: y
        }
        this.railLength = railLength;
        this.railStrokeWidth = 10 * this.scale;
        this.railsBetween = 60 * this.scale;

        this.connectorStroke = 20 * this.scale;
        this.connectorsBetween = 150 * this.scale;

        this.upperRailPosition = {
            x: this.position.x,
            y: this.position.y,
        }
        this.lowerRailPosition = {
            x: this.position.x,
            y: this.position.y + this.railsBetween
        }

        this.beginingPosition = {
            x: this.position.x - this.railsBetween - this.railStrokeWidth,
            y: this.position.y + this.railStrokeWidth / 2
        }
        this.endingPosition = {
            x: this.position.x + this.railLength + this.railStrokeWidth,
            y: this.position.y + this.railStrokeWidth / 2
        }

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
        this.connectorsAmmount = Math.round(this.railLength / this.connectorsBetween);
        for(let i = 0; i < this.connectorsAmmount; i++) {
            connectors.push({
                x: this.position.x + this.connectorsBetween * i,
                y: this.position.y - this.railStrokeWidth //adjust from above
            });
        }
        return connectors;
    }
}