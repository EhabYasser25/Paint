import { AttributesService } from "../../Controller/attributes/attributes.service";
import { Arc } from "./Arc";
import { Brush } from "./Brush";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
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
                return new Brush(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
            
            case "line":
                return new Line(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "arc":
                return new Arc(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
                
            case "circle":
                return new Circle(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);
    
            case "ellipse":
                return new Ellipse(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "triangle":
                return new Polygon(this.att.name, this.att.id, this.att.x, this.att.y, 3, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "rectangle":
                return new Rectangle(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "square":
                return new Square(this.att.name, this.att.id, this.att.x, this.att.y, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "pentagon":
                return new Polygon(this.att.name, this.att.id, this.att.x, this.att.y, 5, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "hexagon":
                return new Polygon(this.att.name, this.att.id, this.att.x, this.att.y, 6, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "heptagon":
                return new Polygon(this.att.name, this.att.id, this.att.x, this.att.y, 7, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "octagon":
                return new Polygon(this.att.name, this.att.id, this.att.x, this.att.y, 8, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

            case "star":
                return new Star(this.att.name, this.att.id, this.att.x, this.att.y, 5, this.att.width, this.att.height,
                    this.att.points, this.att.rotateAngle, this.att.strokeWidth, this.att.borderColor, this.att.fillColor);

        }
    
    }
    
}