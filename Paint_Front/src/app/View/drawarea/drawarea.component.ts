import { Component, Input, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { AttributesService } from 'src/app/Controller/attributes/attributes.service';
import { HttpService } from 'src/app/Controller/http/http.service';
import { Proxy } from 'src/app/Controller/Proxy/Proxy';
import { ShapeFactory } from 'src/app/View/shapes/ShapeFactory';
import { IShape } from '../shapes/IShape';

@Component({
  selector: 'app-drawarea',
  templateUrl: './drawarea.component.html',
  styleUrls: ['./drawarea.component.css']
})

export class DrawareaComponent implements OnInit {

  @Input() Dshape : any;
  @Input() Dbordercolor : any;
  @Input() Dfillcolor : any;
  @Input() Dwidth : any;
  @Input() Dselect : any;
  @Input() Dundo : any;
  @Input() Dredo : any;
  @Input() Dclear : any;
  @Input() Dsave : any;
  @Input() Dload : any;

  constructor(private att: AttributesService, private http: HttpService) { }

  stage!: Stage;
  layer!: Layer;
  tr!: Konva.Transformer;
  shapes: Konva.Shape[] = [];
  index: number = 0;
  proxy: Proxy = new Proxy(this.shapes, this.http);
  shapefactory = new ShapeFactory(this.att);
  shape!: IShape;
  konv!: any;
  drawing: boolean = false;
  erase: boolean = false;

  ngOnInit(): void {
    this.stage = new Konva.Stage({height: window.innerHeight, width: window.innerWidth, container: "draw"});
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.tr = new Konva.Transformer();
    this.tr.borderEnabled(true);
    this.layer.add(this.tr);
    this.eventListeners();
  }

  save() {
    this.proxy.saveRequest();
  }

  load() {
    this.clear();
    this.proxy.loadRequest().subscribe(data => {
      console.log(data);
      for(let i = 0; i < data.shape.length; i++) {
          this.att.setAttributes(data.shape[i].name, +data.shape[i].id, +data.shape[i].x, +data.shape[i].y, +data.shape[i].width, +data.shape[i].height,
            data.shape[i].points, +data.shape[i].rotateAngle, +data.shape[i].strokeWidth, data.shape[i].borderColor, data.shape[i].fillColor);
          this.drawShape(data.shape[i].name);
          this.endDrawShape();
      }
    });
  }

  drawShape(name: any) {
    this.shape = this.shapefactory.getShape(name);
    this.konv = this.shape.draw();
    this.layer.add(this.konv);
  }

  endDrawShape() {
    this.shapes.push(this.konv);
    this.index++;
  }

  clear() {
    this.layer.destroyChildren();
    this.shapes = [];
    this.index = 0;
  }

  eventListeners() {

    const component = this;

    this.stage.on("mousedown", function() {
      if(component.Dselect) return;
      component.tr.nodes([]);
      component.drawing = true;
      let pos = component.stage.getPointerPosition();
      component.att.setAttributes(component.Dshape, component.index, pos?.x, pos?.y, 1, 1, [pos?.x, pos?.y, pos?.x, pos?.y], 0, +component.Dwidth, component.Dbordercolor, component.Dfillcolor);
      console.log(component.Dshape);
      component.drawShape(component.Dshape);
    });

    this.stage.on("mousemove", function(e) {
      if(component.erase) {
        if(e.target == component.stage) return;
        component.proxy.destroyShape(String(component.shapes.indexOf(component.konv)));
        e.target.visible(false);
      }
      if(!component.drawing) return;
      let pos = component.stage.getPointerPosition();
      let endX: any = pos?.x;
      let endY: any = pos?.y;
      const width = endX - component.att.x;
      const height = endY - component.att.y;
      component.shape.continueDraw(width, height);
    });

    this.stage.on("mouseup",  function(e) {
      if(component.drawing) {
      component.drawing = false;
        component.endDrawShape();
        var dimensions = String(component.konv.name()).split(" ", 2);
        component.shape.width = Number(dimensions[0]);
        component.shape.height = Number(dimensions[1]);
        if(component.konv.points != undefined) component.shape.points = component.konv.points();
        component.proxy.createShape(component.shape);
      }
      else if(e.target != component.stage) {
        component.drawing = false;
        component.konv = e.target;
        component.proxy.sendChange(component.konv);
      }
      console.log(component.shapes);
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
      component.tr.nodes([]);
    });
    
  }

}
