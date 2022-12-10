import { IShape } from "./IShape";
import Konva from 'konva';

export class Circle implements IShape {

	constructor(
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 0,
		public height: number = 0,
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konv: any;
    
	draw(): Konva.Circle {
		this.konv = new Konva.Circle({
			x: this.x,
			y: this.y,
			radius: Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)),
			setRotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor,
			draggable: true
		});
		return this.konv;
	}

	continueDraw(width: number, height: number): void {
		this.konv.x(this.x + width/2).y(this.y + height/2);
		const radius = Math.sqrt(width*width + height*height);
		this.konv.radius(radius/2);
	}

}