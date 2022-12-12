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
  rotateAngle?: any;
  strokeWidth?: any;
  borderColor?: any;
  fillColor?: any;

}
