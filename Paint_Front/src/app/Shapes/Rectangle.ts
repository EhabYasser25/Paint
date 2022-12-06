import { Shape } from "./Shape";

export class Rectangle extends Shape{
    public override Draw(context: CanvasRenderingContext2D): void {
        context.strokeRect(0, 0, this.getWidth(), this.getHeight());
    }
}