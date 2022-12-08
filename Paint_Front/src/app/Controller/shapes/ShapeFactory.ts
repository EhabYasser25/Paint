import { Circle } from "./Circle";
import { IShape } from "./IShape";
import { Rectangle } from "./Rectangle";

export class ShapeFactory {


    constructor() { }

    public getShape(type: string): any {
        switch(type) {
            case "rectangle":
                return new Rectangle(0,0,0,0,[0],[0]);
                
            case "circle":
                return new Circle(0,0,0,0,[0],[0]);
                
        }
    
    }
}