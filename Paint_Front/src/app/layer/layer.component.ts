import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Shape } from 'src/app/Shapes/Shape';
import { ShapeFactory } from '../Shapes/ShapeFactory';

@Component({
  selector: 'layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit{

  public boundaryWidth: string[] = ["1500", "500"];
  @Input('shape') layerShape: Shape;
  @ViewChild('layer', {static: true}) canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  shapeFactory: ShapeFactory;

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.shapeFactory = new ShapeFactory(this.context);
  }

  
  create(){
    this.shapeFactory.generateShape(this.layerShape);
    return {
      top: `${this.layerShape.getOrigin().getY()}px`,
      left: `${this.layerShape.getOrigin().getX()}px`,
    }
  }

}
