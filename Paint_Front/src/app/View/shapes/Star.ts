import { IShape } from "./IShape";
import Konva from 'konva';

export class Star implements IShape {

	constructor(
		public name: string = 'star',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
        public sides: number = 0,
		public width: number = 1,
		public height: number = 1,
		public points: number[] = [0, 0, 0, 0],
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konvaModel: Konva.Star
    
	draw(): Konva.Star {
		this.konvaModel = new Konva.Star({
			id: String(this.id),
			x: this.x,
			y: this.y,
            numPoints: this.sides,
			width: this.width,
            height: this.height,
			outerRadius: Math.max(Math.abs(this.width), Math.abs(this.height)) / 2,
            innerRadius: Math.max(Math.abs(this.width), Math.abs(this.height)) / 4,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konvaModel;
	}

	continueDraw(width: number, height: number): void {
		if(width < 0)
			this.konvaModel.rotation((Math.atan(height / width) * 180 / Math.PI) + 180);
		else
			this.konvaModel.rotation((Math.atan(height / width) * 180 / Math.PI));
		const radius = Math.max(Math.abs(width), Math.abs(height));
		this.konvaModel.outerRadius(radius);
        this.konvaModel.innerRadius(radius / 2);
		this.width = radius * 2; this.height = radius * 2;
		this.rotateAngle = this.konvaModel.rotation()
	}

	clone(): Star {
		return new Star(this.name, this.id, this.x, this.y, this.sides,this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}

}