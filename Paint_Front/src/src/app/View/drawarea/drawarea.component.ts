import { Component, Input, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { AttributesService } from 'src/app/Controller/attributes/attributes.service';
import { HttpService } from 'src/app/Controller/http/http.service';
import { Proxy } from 'src/app/Controller/Proxy';
import { ShapeFactory } from 'src/app/Controller/shapes/ShapeFactory';

@Component({
  selector: 'app-drawarea',
  templateUrl: './drawarea.component.html',
  styleUrls: ['./drawarea.component.css']
})

export class DrawareaComponent implements OnInit {

  @Input() Dshape: any;
  @Input() Dbordercolor: any;
  @Input() Dfillcolor: any;
  @Input() Dwidth: any;
  @Input() Dselect: any;

  constructor(private att: AttributesService, private http: HttpService) { }

  stage!: Stage;
  layer!: Layer;
  tr: any;
  shapes: Konva.Shape[] = [];
  index: number = 0;
  shapefactory = new ShapeFactory(this.att);
  shape: any;
  konv: any;
  drawing: boolean = false;
  proxy!: Proxy;

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      height: window.innerHeight,
      width: window.innerWidth,
      container: "draw"
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.tr = new Konva.Transformer();
    this.tr.borderEnabled(true);
    this.layer.add(this.tr);
    this.proxy = new Proxy(this.shapes, this.http);
    this.eventListeners();
  }

  eventListeners() {

    const component = this;

    this.stage.on("mousedown", function() {
      if(component.Dselect) return;
      component.tr.nodes([]);
      component.drawing = true;
      let pos = component.stage.getPointerPosition();
      component.att.id = component.index;
      component.att.x = pos?.x;
      component.att.y = pos?.y;
      component.att.borderColor = component.Dbordercolor;
      component.att.fillColor = component.Dfillcolor;
      component.att.strokeWidth = Number(component.Dwidth);
      console.log(component.Dshape);
      component.shape = component.shapefactory.getShape(component.Dshape);
      component.konv = component.shape.draw();
      component.layer.add(component.konv).draw();
    });

    this.stage.on("mousemove", function() {
      if(!component.drawing) return;
      let pos = component.stage.getPointerPosition();
      let endX: any = pos?.x;
      let endY: any = pos?.y;
      const width = endX - component.att.x;
      const height = endY - component.att.y;
      component.shape.continueDraw(width, height);
      component.layer.draw(); 
    });

    this.stage.on("mouseup",  function(e) {
      if(component.drawing) {
        component.shapes.push(component.konv);
        component.proxy.createShape(component.konv);
        component.index++;
      }
      else if(e.target != component.stage) {
        component.konv = e.target;
        component.proxy.sendChange(component.konv);
      }
      console.log(component.shapes);
      component.drawing = false;
    });

    this.layer.on("mouseover", function(e) {
      if(component.Dselect) {
        document.body.style.cursor = 'move';
        e.target.draggable(true);
      }
      else e.target.draggable(false);
    });

    this.layer.on("mouseout", function() {
      document.body.style.cursor = 'default';
    });

    this.stage.on("click tap", function(e) {
      if (e.target == component.stage || !component.Dselect) {
        component.tr.nodes([]);
        return;
      }
      component.tr.nodes([e.target]);
      console.log(e.target.id());
    });

    this.layer.on("dragstart", function() {
      console.log('ds');
    });

    this.layer.on("dragend", function() {

    })
    
  }

}
