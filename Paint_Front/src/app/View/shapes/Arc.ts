import { IShape } from "./IShape";
import Konva from 'konva';

export class Arc implements IShape {

	constructor(
		public name: string = 'arc',
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

	konvaModel: Konva.Arc;
    
	draw(): Konva.Arc {
		this.konvaModel = new Konva.Arc({
			id: String(this.id),
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
            angle: 90,
			outerRadius: Math.max(this.width, this.height) / 2,
            innerRadius: Math.max(this.width, this.height) / 4,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor,
		});
		return this.konvaModel;
	}

	continueDraw(width: number, height: number): void {

		if(width < 0)
			this.konvaModel.rotation((Math.atan(height / width) * 180 / Math.PI) + 90 + (this.konvaModel.angle() / 2));
		else
			this.konvaModel.rotation((Math.atan(height / width) * 180 / Math.PI) - (this.konvaModel.angle() / 2));
		
		const radius = Math.max(width, height);
		this.konvaModel.outerRadius(radius);
        this.konvaModel.innerRadius(radius/2);
		this.width = width * 2; this.height = height * 2; this.rotateAngle = this.konvaModel.rotation()
	}

	clone(): Arc {
		return new Arc(this.name, this.id, this.x, this.y, this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}

}