import { AttributesService } from "../attributes/attributes.service";
import { Brush } from "./Brush";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { Rectangle } from "./Rectangle";

export class ShapeFactory {

    constructor(private att: AttributesService) { }

    public getShape(type: string): any {
        switch(type) {
            case "rectangle":
                return new Rectangle(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
                
            case "circle":
                return new Circle(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
            
            case "line":
                return new Line(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
        
            case "brush":
                return new Brush(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
    
        }
    
    }
}