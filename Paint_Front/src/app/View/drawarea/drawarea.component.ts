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

  setAttributes(name: any, id: any, x: any, y: any, width: any, height: any, rotateAngle: any, strokeWidth: any, borderColor: any, fillColor: any) {
    this.att.name = name;
    this.att.id = id;
    this.att.x = x;
    this.att.y = y;
    this.att.width = width;
    this.att.height = height;
    this.att.rotateAngle = rotateAngle;
    this.att.strokeWidth = strokeWidth;
    this.att.borderColor = borderColor;
    this.att.fillColor = fillColor;
  }

  save() {
    this.proxy.saveRequest();
  }

  load() {
    this.proxy.loadRequest().subscribe(data => {
      for(let i = 0 ; i < data.length ; i++) {
        this.setAttributes(data[i].shape.name , i , +data[i].shape.x , +data[i].shape.y , +data[i].shape.width , +data[i].shape.height ,
        +data[i].shape.rotateAngle , +data[i].shape.strokeWidth , data[i].shape.borderColor , data[i].shape.fillColor);
        this.shape = this.shapefactory.getShape(data[i].shape.name);
        this.konv = this.shape.draw();
        this.layer.add(this.konv).batchDraw();
      }
    });
    // this.proxy.loadRequest().subscribe((data: any[]) => {
    //   for(let i = 0; i < data.length; i++) {
    //       this.setAttributes(data[i].shape.name, +data[i].shape.id, +data[i].shape.x, +data[i].shape.y, +data[i].shape.width,
    //         +data[i].shape.height, +data[i].shape.rotateAngle, +data[i].shape.strokeWidth, data[i].shape.borderColor, data[i].shape.fillColor);
    //       this.drawShape(data[i].shape.name);
    //       this.endDrawShape();
    //   }
    // });
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

  eventListeners() {

    const component = this;

    this.stage.on("mousedown", function() {
      if(component.Dselect) return;
      component.tr.nodes([]);
      component.drawing = true;
      let pos = component.stage.getPointerPosition();
      component.setAttributes(component.Dshape, component.index, pos?.x, pos?.y, 1, 1, 0, component.Dwidth, component.Dbordercolor, component.Dfillcolor);
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
        component.endDrawShape();
        component.shape.width = component.konv.width();
        component.shape.height = component.konv.height();
        component.proxy.createShape(component.shape);
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
      component.tr.nodes([]);
    });
    
  }

}
