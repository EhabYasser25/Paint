import { IShape } from "./IShape";

export class Circle implements IShape {

	constructor(
		public id: number = 0,
		public x: number = 0,
		public y: number = 0,
		public width: number = 0,
		public height: number = 0,
		public rotateAngle: number = 0,
		public borderColor: string = '#000000',
		public fillColor: string = '#FFFFFF'
	) { }
    

    draw(): void {

    }

    continueDraw(width: number, height: number): void{

    }
}