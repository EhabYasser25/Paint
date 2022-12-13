import { IShape } from "./IShape";
import Konva from 'konva';

export class Brush implements IShape {

	constructor(
		public name: string = 'brush',
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

	konv: any;
    
	draw(): Konva.Line {
		this.konv = new Konva.Line({
			id: String(this.id),
			points: this.points,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor,
			lineCap: 'round'
		});
		return this.konv;
	}

	continueDraw(width: number, height: number): void {
        this.points.push(this.x + width);
        this.points.push(this.y + height);
        this.konv.points(this.points);
	}

}