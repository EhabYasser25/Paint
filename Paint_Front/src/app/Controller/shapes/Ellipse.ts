import { IShape } from "./IShape";
import Konva from 'konva';

export class Ellipse implements IShape {

	constructor(
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 0,
		public height: number = 0,
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = '#000000',
		public fillColor: string = '#FFFFFF00'
	) { }

    konv: any;
    

    draw(): Konva.Ellipse{
        this.konv = new Konva.Ellipse({
            x: this.x,
            y: this.y,
            radiusX: this.width,
            radiusY: this.height,
            draggable:true,
            setRotation: this.rotateAngle,
            stroke: this.borderColor,
			//strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konv;
    }

    continueDraw(width: number, height: number): void {
		this.konv.x(this.x + width/2).y(this.y + height/2);
		this.konv.radiusX(Math.abs(width/2)).radiusY(Math.abs(height/2));
	}
}