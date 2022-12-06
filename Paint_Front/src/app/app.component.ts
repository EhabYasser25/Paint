import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Coordinate } from './Coordinate';
import { Shape } from './Shapes/Shape';
import { ShapeFactory } from './Shapes/ShapeFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Paint_Front';
  @ViewChild('mainCanvas', {static: true}) canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  isDrawing: boolean = false;
  shapeFactory: ShapeFactory;
  initialPosition: Coordinate = new Coordinate(0, 0);
  finalPosition: Coordinate = new Coordinate(0, 0);
  snapShot: any;
  shapes: Shape[] = []

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.shapeFactory = new ShapeFactory(this.context);
  }

  startDraw(e: any){
    this.isDrawing = true;
    this.initialPosition.setCoordinate(e.offsetX, e.offsetY);
    this.snapShot = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  endDraw(e: any){
    this.isDrawing = false;
    this.finalPosition.setCoordinate(e.offsetX, e.offsetY)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.shapes.push(this.shapeFactory.createShape(this.initialPosition, this.finalPosition, "rectangle"));
  }

  drawing(e: any){
    if(!this.isDrawing)
      return;
    this.context.putImageData(this.snapShot, 0, 0);
    this.shapeFactory.drawShape(e, this.initialPosition , "rectangle");
  }
}
