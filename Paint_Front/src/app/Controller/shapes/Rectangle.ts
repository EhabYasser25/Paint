import { IShape } from "./IShape";
import Konva from 'konva';

export class Rectangle implements IShape {
     
    constructor(
        public id: number,
        public x: number,
        public y: number,
        public rotateAngle: number,
        public borderColor: number[],
        public fillColor: number[], 
        ) { }
    

    draw(): any {
        new Konva.Rect({
            x: this.x,
            y: this.y,
            stroke: "blue"
        });
    }


}