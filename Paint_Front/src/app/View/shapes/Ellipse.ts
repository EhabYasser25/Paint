import { IShape } from "./IShape";
import Konva from 'konva';

export class Ellipse implements IShape {

	constructor(
		public name: string = 'ellipse',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 1,
		public height: number = 1,
		public points: number[] = [0, 0, 0, 0],
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = '#000000',
		public fillColor: string = '#FFFFFF00'
	) { }

    konvaModel: Konva.Ellipse;
    

    draw(): Konva.Ellipse{
        this.konvaModel = new Konva.Ellipse({
			id: String(this.id),
            x: this.x,
            y: this.y,
			width: this.width,
			height: this.height,
            radiusX: this.width / 2,
            radiusY: this.height / 2,
            rotation: this.rotateAngle,
            stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konvaModel;
    }

    continueDraw(width: number, height: number): void {
		this.konvaModel.radiusX(width).radiusY(height);
		this.width = width * 2; this.height = height * 2;
	}

	clone(): Ellipse {
		return new Ellipse(this.name, this.id, this.x, this.y, this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}
}