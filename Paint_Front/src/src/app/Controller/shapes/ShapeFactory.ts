import { AttributesService } from "../attributes/attributes.service";
import { Arc } from "./Arc";
import { Brush } from "./Brush";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Erase } from "./Erase";
import { Line } from "./Line";
import { Polygon } from "./Polygon";
import { Rectangle } from "./Rectangle";
import { Square } from "./Square";
import { Star } from "./Star";

export class ShapeFactory {

    constructor(private att: AttributesService) { }

    public getShape(type: string): any {

        switch(type) {
        
            case "brush":
                return new Brush(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "erase":
                return new Erase(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
            
            case "line":
                return new Line(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "arc":
                return new Arc(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
                
            case "circle":
                return new Circle(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
    
            case "ellipse":
                return new Ellipse(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "triangle":
                return new Polygon(this.att.id, this.att.x, this.att.y, 3, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "rectangle":
                return new Rectangle(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
        
            case "square":
                return new Square(this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "pentagon":
                return new Polygon(this.att.id, this.att.x, this.att.y, 5, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "hexagon":
                return new Polygon(this.att.id, this.att.x, this.att.y, 6, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "heptagon":
                return new Polygon(this.att.id, this.att.x, this.att.y, 7, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "octagon":
                return new Polygon(this.att.id, this.att.x, this.att.y, 8, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "star":
                return new Star(this.att.id, this.att.x, this.att.y, 5, this.att.width, this.att.height,
                    this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

        }
    
    }
    
}