import { Coordinate } from "../Coordinate"

export class Shape{

    constructor(protected origin: Coordinate, private width: number, private height: number){}

    getOrigin(){
        return this.origin
    }
    getWidth(){
        return this.width
    }
    getHeight(){
        return this.height
    }
    public Draw(context: CanvasRenderingContext2D){}
}