import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor() { }

  name: string;
  id?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: number[];
  rotateAngle?: number;
  strokeWidth?: number;
  borderColor?: string;
  fillColor?: string;

  setAttributes(name: string, id: number, x: number, y: number, width: number, height: number, points: Number[], rotateAngle: number, strokeWidth: number, borderColor: string, fillColor: string) {
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if(name == 'line' || name == 'brush'){
      this.points = [];
      for(let i = 0; i < points.length; i++) 
        this.points.push(Number(points[i])) 
    }
    this.rotateAngle = rotateAngle;
    this.strokeWidth = strokeWidth;
    this.borderColor = borderColor;
    this.fillColor = fillColor;
  }

}
