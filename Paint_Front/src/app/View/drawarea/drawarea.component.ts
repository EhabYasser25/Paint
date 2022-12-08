import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { AttributesService } from 'src/app/Controller/attributes/attributes.service';
import { ShapeFactory } from 'src/app/Controller/shapes/ShapeFactory';

@Component({
  selector: 'app-drawarea',
  templateUrl: './drawarea.component.html',
  styleUrls: ['./drawarea.component.css']
})
export class DrawareaComponent implements OnInit {

  constructor(private att: AttributesService) { }

  type: string = "rectangle";
  stage!: Stage;
  layer!: Layer;
  shapefactory = new ShapeFactory(this.att);
  shape: any;

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

  setType(type: string) {
    this.type = type;
  }

  eventListeners() {

    const component = this;
    let rect: any;
    let drawing: boolean = false;

    this.stage.on("mousedown", function() {
      drawing = true;
      let pos = component.stage.getPointerPosition();
      component.att.x = pos?.x;
      component.att.y = pos?.y;
      component.shape = component.shapefactory.getShape(component.type);
      rect = component.shape.draw();
      component.layer.add(rect).batchDraw();
    });

    this.stage.on("mouseup", function() {
      drawing = false;
    });

    this.stage.on("mousemove", function() {
      if(!drawing) return;
      let pos = component.stage.getPointerPosition();
      let endX: any = pos?.x;
      let endY: any = pos?.y;
      const width = endX - component.att.x;
      const height = endY - component.att.y;
      //rect = component.shape.continueDraw();
      rect.width(width).height(height);
      component.layer.add(rect).batchDraw();
    });
    
  }

}
