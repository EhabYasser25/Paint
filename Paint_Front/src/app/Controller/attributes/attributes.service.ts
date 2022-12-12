import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor() { }

  name: any;
  id?: any;
  x?: any;
  y?: any;
  width?: any;
  height?: any;
  points?: any;
  rotateAngle?: any;
  strokeWidth?: any;
  borderColor?: any;
  fillColor?: any;

  setAttributes(name: any, id: any, x: any, y: any, width: any, height: any, points: any, rotateAngle: any, strokeWidth: any, borderColor: any, fillColor: any) {
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.points = [];
    for(let i = 0; i < points.length; i++) this.points.push(Number(points[i]));
    console.log(points);
    this.rotateAngle = rotateAngle;
    this.strokeWidth = strokeWidth;
    this.borderColor = borderColor;
    this.fillColor = fillColor;
  }

}
