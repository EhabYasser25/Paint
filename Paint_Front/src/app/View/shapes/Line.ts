import { IShape } from "./IShape";
import Konva from 'konva';

export class Line implements IShape {

	constructor(
		public name: string = 'line',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 0,
		public height: number = 0,
		public points: number[] = [0, 0, 0, 0],
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konvaModel: Konva.Line;
    
	draw(): Konva.Line {
		this.konvaModel = new Konva.Line({
			id: String(this.id),
			points: this.points,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor,
			lineCap: 'round'
		});
		return this.konvaModel;
	}

	continueDraw(width: number, height: number): void {
		this.konvaModel.points([this.x, this.y, this.x + width, this.y + height]);
		this.width = width; this.height = height;
	}

	clone(): Line {
		return new Line(this.name, this.id, this.x, this.y, this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}

}