import { IShape } from "./IShape";
import Konva from 'konva';

export class Line implements IShape {

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
    
	draw(): Konva.Line {
		this.konv = new Konva.Line({
			points: [this.x, this.y, this.x, this.y],
			setRotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor,
			lineCap: 'round',
			draggable: true
		});
		return this.konv;
	}

	continueDraw(width: number, height: number): void {
		this.konv.points([this.x, this.y, this.x + width, this.y + height]);
	}

}