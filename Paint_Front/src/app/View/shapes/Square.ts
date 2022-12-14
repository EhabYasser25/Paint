import { IShape } from "./IShape";
import Konva from 'konva';

export class Square implements IShape {

	constructor(
		public name: string = 'square',
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

	konvaModel: Konva.Rect
    
	draw(): Konva.Rect {
		this.konvaModel = new Konva.Rect({
			id: String(this.id),
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.width,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konvaModel;
	}

	continueDraw(width: number, height?: number): void {
		let length: number = Math.max(width, height)
		this.konvaModel.width(length).height(length);
		this.width = length; this.height = length;
	}

	clone(): Square {
		return new Square(this.name, this.id, this.x, this.y, this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}
	
}