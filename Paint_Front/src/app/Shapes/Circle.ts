import { Shape } from "./Shape";

export class Circle extends Shape{
    public override Draw(context: CanvasRenderingContext2D): void {
        context.arc(
            this.getWidth() / 2,
            this.getWidth() / 2, 
            Math.abs(this.getWidth() / 2), 0, 2*Math.PI);
        context.stroke()
    }
}