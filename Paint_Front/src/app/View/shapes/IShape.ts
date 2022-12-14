import Konva from "konva";

export interface IShape{

    name: string;
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    points: number[];
    rotateAngle: number;
    strokeWidth: number;
    borderColor: string;
    fillColor: string;

    konvaModel: any

    draw(): Konva.Shape;
    continueDraw(width: number, height: number);
    clone(): IShape

}