export interface IShape {

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

    draw(): any;
    continueDraw(width: number, height: number): void;

}