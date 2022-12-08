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

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      height: window.innerHeight,
      width: window.innerWidth,
      container: "draw"
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.eventListeners();
  }

  eventListeners() {

    let startX: any;
    let startY: any;
    let endX: any;
    let endY: any;
    const component = this;
    var rect: any;
    let drawing: boolean = false;

    this.stage.on("mousedown", function() {
      drawing = true;
      let pos = component.stage.getPointerPosition();
      startX = pos?.x;
      startY = pos?.y;
      rect = new Konva.Rect({
        x: startX,
        y: startY,
        stroke: "blue"
      });
      component.layer.add(rect).batchDraw();
    });

    this.stage.on("mouseup", function() {
      drawing = false;
    });

    this.stage.on("mousemove", function() {
      if(!drawing) return;
      let pos = component.stage.getPointerPosition();
      endX = pos?.x;
      endY = pos?.y;
      const width = endX - startX;
      const height = endY - startY;
      rect.width(width).height(height);
      component.layer.batchDraw();
    });
  }

}
