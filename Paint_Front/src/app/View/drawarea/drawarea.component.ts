import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

@Component({
  selector: 'app-drawarea',
  templateUrl: './drawarea.component.html',
  styleUrls: ['./drawarea.component.css']
})
export class DrawareaComponent implements OnInit {

  constructor() { }

  stage!: Stage;
  layer!: Layer;
  drawing = false;
  rect: any;

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      height: window.innerHeight,
      width: window.innerWidth,
      container: "draw"
    });
    this.stage.add(this.layer);
    this.stage.on("mousedown", this.mouseDownHandler);
    this.stage.on("mousemove", this.mouseMoveHandler);
    this.stage.on("mouseup", this.mouseUpHandler);
  }

  mouseDownHandler() {
    this.drawing = true;
    this.rect = new Konva.Rect({
      x: this.stage.getPointerPosition()?.x,
      y: this.stage.getPointerPosition()?.y,
      width: 20,
      height: 20,
      stroke: "blue"
    });
    this.layer.add(this.rect).batchDraw();
  }

  mouseUpHandler() {
    this.drawing = false;
  }

  mouseMoveHandler() {
    if(!this.drawing) return;

  }

}
