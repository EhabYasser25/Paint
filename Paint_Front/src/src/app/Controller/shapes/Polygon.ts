import { IShape } from "./IShape";
import Konva from 'konva';



export class Polygon implements IShape{

    constructor(
        public id: number = 0,
		public x: number = 0,
		public y: number = 0,
        public sides: number = 0,
		public width: number = 1,
		public height: number = 1,
		public rotateAngle: number = 0,
		public strokeWidth: number = 0,
		public borderColor: string = "#000000FF",
		public fillColor: string = "#FFFFFF00"
    ) { }

    konv: any;

    draw(): Konva.RegularPolygon{
        this.konv = new Konva.RegularPolygon({
			id: String(this.id),
            x: this.x,
            y: this.y,
            sides: this.sides,
            radius: Math.sqrt(this.width*this.width + this.height*this.height),
            draggable:true,
            setRotation: this.rotateAngle,
            stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konv;
    }

    continueDraw(width: number, height: number): void {
        const radius = Math.sqrt(width*width + height*height);
		this.konv.radius(radius);
	}
}