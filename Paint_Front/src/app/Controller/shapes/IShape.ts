export interface IShape {

    id: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotateAngle?: number;
    borderColor?: string;
    fillColor?: string;

    draw(): any;
    continueDraw(width: number, height: number): void;

}