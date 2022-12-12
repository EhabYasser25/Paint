import { IShape } from "./IShape";
import Konva from 'konva';

export class Rectangle implements IShape {

	constructor(
		public name: string = 'rhombus',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 1,
		public height: number = 1,
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konv: any;
    
	draw(): Konva.Rect {
		this.konv = new Konva.Rect({
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
		return this.konv;
	}

	continueDraw(width: number, height: number): void {
		this.konv.width(width).height(height);
	}

}