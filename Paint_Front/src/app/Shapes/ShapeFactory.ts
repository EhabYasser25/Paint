import { Circle } from "./Circle";
import { Coordinate } from "../Coordinate";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

export class ShapeFactory{
    constructor(private context: CanvasRenderingContext2D){}

    setContext(context: CanvasRenderingContext2D){
        this.context = context;
    }

    drawShape(event: any, initialPosition: Coordinate, shape: string){
        switch(shape){
            case "rectangle":
                this.context.strokeRect(event.offsetX, event.offsetY, initialPosition.getX() - event.offsetX, initialPosition.getY() - event.offsetY);
                break;
            
            case "circle":
                this.context.beginPath()
                let radius: number = Math.max(Math.abs(event.offsetX - initialPosition.getX())/2, Math.abs(event.offsetY - initialPosition.getY())/2);
                this.context.arc(
                    (event.offsetX > initialPosition.getX())? initialPosition.getX() + radius : initialPosition.getX() - radius,
                    (event.offsetY > initialPosition.getY())? initialPosition.getY() + radius : initialPosition.getY() - radius, 
                    Math.abs(radius), 0, 2*Math.PI);
                this.context.stroke()
                break;
        }
    }

    generateShape(shape: Shape){
        shape.Draw(this.context);
    }

    createShape(initialPosition: Coordinate, finalPosition: Coordinate, shape: string): Shape{
        let newShape: Shape
        switch(shape){
            case "rectangle":     
                newShape = new Rectangle(new Coordinate(Math.min(initialPosition.getX(), finalPosition.getX()), Math.min(initialPosition.getY(), finalPosition.getY())), Math.abs(finalPosition.getX() - initialPosition.getX()), Math.abs(finalPosition.getY() - initialPosition.getY()));
                break;
            
            case "circle":
                let origin: Coordinate = new Coordinate();
                let radius: number;
                
                if(Math.abs(finalPosition.getX() - initialPosition.getX()) > Math.abs(finalPosition.getY() - initialPosition.getY())){
                    radius = Math.abs(finalPosition.getX() - initialPosition.getX());
                    origin.setX(Math.min(initialPosition.getX(), finalPosition.getX()))
                    if(finalPosition.getY() < initialPosition.getY())
                        origin.setY(initialPosition.getY() - radius)
                    else
                        origin.setY(initialPosition.getY())
                }else{
                    radius = Math.abs(finalPosition.getY() - initialPosition.getY());
                    origin.setY(Math.min(initialPosition.getY(), finalPosition.getY()))
                    if(finalPosition.getX() < initialPosition.getX())
                        origin.setX(initialPosition.getX() - radius)
                    else
                        origin.setX(initialPosition.getX())
                }
                newShape = new Circle(origin, 
                Math.max(Math.abs(finalPosition.getX() - initialPosition.getX()), Math.abs(finalPosition.getY() - initialPosition.getY())),
                Math.max(Math.abs(finalPosition.getX() - initialPosition.getX()), Math.abs(finalPosition.getY() - initialPosition.getY())));
        }
        return newShape;
    }
}