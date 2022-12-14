import { IShape } from "./IShape";
import Konva from 'konva';

export class Rectangle implements IShape {

	constructor(
		public name: string = 'rectangle',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 1,
		public height: number = 1,
		public points: number[] = [0, 0, 0, 0],
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#FF0000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konvaModel: Konva.Rect
    
	draw(): Konva.Rect {
		this.konvaModel = new Konva.Rect({
			id: String(this.id),
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konvaModel;
	}

	continueDraw(width: number, height: number): void {
		this.konvaModel.width(width).height(height);
		this.width = width; this.height = height;
	}

	clone(): Rectangle {
		return new Rectangle(this.name, this.id, this.x, this.y, this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}
}