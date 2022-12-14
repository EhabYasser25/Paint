import { IShape } from "./IShape";
import Konva from 'konva';



export class Polygon implements IShape{

    constructor(
		public name: string = 'polygon',
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

    konvaModel: Konva.RegularPolygon;

    draw(): Konva.RegularPolygon{
        this.konvaModel = new Konva.RegularPolygon({
			id: String(this.id),
            x: this.x,
            y: this.y,
            sides: this.sides,
            width: this.width,
            height: this.height,
            radius: Math.max(this.width, this.height) / 2,
            draggable:true,
            rotation: this.rotateAngle,
            stroke: this.borderColor,
			strokeWidth: this.strokeWidth,
			fill: this.fillColor
		});
		return this.konvaModel;
    }

    continueDraw(width: number, height: number): void {
        const radius = Math.max(width, height);
		this.konvaModel.radius(radius);
        this.width = width * 2; this.height = height * 2;
	}

    clone(): Polygon {
		return new Polygon(this.name, this.id, this.x, this.y, this.sides,this.width, this.height, this.points, this.rotateAngle, this.strokeWidth, this.borderColor, this.fillColor)
	}
}