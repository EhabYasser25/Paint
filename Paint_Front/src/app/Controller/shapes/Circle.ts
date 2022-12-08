import { IShape } from "./IShape";

export class Circle implements IShape {
     
    constructor(
        public id: number,
        public x: number,
        public y: number,
        public rotateAngle: number,
        public borderColor: number[],
        public fillColor: number[], 
        ) { }
    

    draw(): void {

    }


}