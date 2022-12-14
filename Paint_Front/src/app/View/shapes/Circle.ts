import { IShape } from "./IShape";
import Konva from 'konva';

export class Circle implements IShape {

	constructor(
		public name: string = 'circle',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 1,
		public height: number = 1,
		public points: number[] = [0, 0, 0, 0],
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konvaModel: Konva.Circle;
    
	draw(): Konva.Circle {
		this.konvaModel = new Konva.Circle({
			id: String(this.id),
			x: this.x,
			y: this.y,
			width: Math.max(this.width, this.height),
			height: Math.max(this.width, this.height),
			radius: Math.max(this.width, this.height) / 2,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konvaModel;
	}

	continueDraw(width: number, height: number): void {
		const radius = Math.max(width, height);
		this.konvaModel.radius(radius);
		this.width = radius * 2; this.height = radius * 2;
	}

	clone(): Circle {
		return new Circle(this.name, this.id, this.x, this.y, this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}
}