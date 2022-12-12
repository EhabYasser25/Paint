import { IShape } from "./IShape";
import Konva from 'konva';

export class Star implements IShape {

	constructor(
		public name: string = 'star',
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
        public sides: number = 0,
		public width: number = 1,
		public height: number = 1,
		public points: number[] = [0, 0, 0, 0],
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
	) { }

	konv: any;
    
	draw(): Konva.Star {
		this.konv = new Konva.Star({
			id: String(this.id),
			x: this.x,
			y: this.y,
            numPoints: this.sides,
			outerRadius: Math.sqrt(this.width*this.width + this.height*this.height),
            innerRadius: Math.sqrt(this.width*this.width + this.height*this.height)/2,
			rotation: this.rotateAngle,
			stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konv;
	}

	continueDraw(width: number, height: number): void {
		const radius = Math.sqrt(width*width + height*height);
		this.konv.outerRadius(radius);
        this.konv.innerRadius(radius/2);
		this.konv.name(`${width} ${height}`);
	}

}