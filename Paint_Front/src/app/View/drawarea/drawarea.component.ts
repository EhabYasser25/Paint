import { Component, EventEmitter, Input, OnInit, Output, Pipe } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { ButtonService } from 'src/app/Controller/ButtonService/button.service';
import { AttributesService } from 'src/app/Controller/attributes/attributes.service';
import { HttpService } from 'src/app/Controller/http/http.service';
import { Proxy } from 'src/app/Controller/Proxy/Proxy';
import { ShapeFactory } from 'src/app/View/shapes/ShapeFactory';
import { IShape } from '../shapes/IShape';
import { take } from 'rxjs';

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
  @Input() border : any;
  @Input() Daction : string;
  @Input() Dclear : any;
  @Input() Dsave : any;
  @Input() Dload : any;
  @Input() buttonsActions: ButtonService;
  @Output() resetAction = new EventEmitter;

  constructor(private att: AttributesService, private http: HttpService) { }

  stage: Stage;
  layer: Layer;
  tr: Konva.Transformer;
  shapes: Konva.Shape[] = [];
  proxy: Proxy = new Proxy(this.shapes, this.http);
  shapefactory = new ShapeFactory(this.att);
  shape: IShape;
  konv: any;
  drawing: boolean = false;
  erasing: boolean = false;

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
      for(let i = 0; i < data.length; i++) {
          this.att.setAttributes(data[i].name, +data[i].id, +data[i].x, +data[i].y, +data[i].width, +data[i].height,
            data[i].points, +data[i].rotateAngle, +data[i].strokeWidth, data[i].borderColor, data[i].fillColor);
          this.drawShape(data[i].name);
          this.shapes.push(this.konv);
      }
    });
  }

  drawShape(name: any) {
    this.shape = this.shapefactory.getShape(name);
    this.konv = this.shape.draw();
    this.layer.add(this.konv);
  }

  clear() {
    this.layer.destroyChildren();
    this.shapes = [];
  }

  eventListeners() {

    const component = this;

    this.buttonsActions.$action.subscribe({
      next: (action: string) => {
        if(action != 'color' && action != 'width') this.tr.nodes([]);
        switch(action) {
          case 'undo':
            this.proxy.undoRequest().pipe(take(1)).subscribe(
              data => {
                if(this.proxy.validateInstruction(data)) this.proxy.resolveInstruction(data);
              }
            );
            break;
        
          case 'redo':
            this.proxy.redoRequest().pipe(take(1)).subscribe(
              data => {
                if(this.proxy.validateInstruction(data)) this.proxy.resolveInstruction(data);
              }
            );
            break;
            
          case 'save':
            this.save();
            break;

          case 'load':
            this.load();
            break;

          case 'clear':
            this.clear()
            break;

          case 'color':
            if(this.tr.nodes()[0] == undefined) break;
            this.konv = this.tr.nodes()[0];
            if(this.border) this.konv.stroke(this.Dbordercolor);
            else this.konv.fill(this.Dfillcolor);
            break;

          case 'width':
            if(this.tr.nodes()[0] == undefined) break;
            this.konv = this.tr.nodes()[0];
            this.konv.strokeWidth(Number(this.Dwidth));
            break;
        }
      }
    });

    this.stage.on("mousedown", function() {
      if(component.Dselect) return;
      if(component.Dshape == 'erase') {
        component.tr.nodes([]);
        component.drawing = false;
        component.erasing = true;
        return;
      }
      component.tr.nodes([]);
      component.drawing = true;
      let pos = component.stage.getPointerPosition();
      component.att.setAttributes(component.Dshape, component.shapes.length, pos.x, pos.y, 1, 1, [pos.x, pos.y, pos.x, pos.y], 0, +component.Dwidth, component.Dbordercolor, component.Dfillcolor)
      console.log(component.Dwidth);
      component.drawShape(component.Dshape);
    });

    this.stage.on("mousemove", function(e) {
      if(component.erasing && e.target != component.stage) {
        component.proxy.destroyShape(e.target.id());
        e.target.visible(false);
        return;
      }
      if(!component.drawing) return;
      let pos = component.stage.getPointerPosition();
      component.shape.continueDraw(pos.x - component.att.x, pos.y - component.att.y);
    });

    this.stage.on("mouseup",  function(e) {
      if(component.erasing) component.erasing = false;
      if(component.drawing) {
        component.drawing = false;
        component.shapes.push(component.konv);
        var dimensions = String(component.konv.name()).split(" ", 2);
        component.shape.width = Number(dimensions[0]);
        component.shape.height = Number(dimensions[1]);
        if(component.konv.points != undefined) component.shape.points = component.konv.points();
        component.proxy.createShape(component.shape);
      }
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
      if (e.target.getParent() != component.layer || !component.Dselect) {
        component.tr.nodes([]);
        return;
      }
      component.tr.nodes([e.target]);
    });

    this.layer.on("dragmove", function() {
      component.tr.nodes([]);
    });

    this.layer.on("dragend", function(e) {
      if(e.target.getClassName() == 'Transformer') return;
      component.drawing = false;
      component.konv = e.target;
      component.proxy.sendChange(component.konv);
    });

    this.tr.on('transformend', function(e) {
      if (e.target.getParent() != component.layer) return;
      let shape = component.shapes[Number(e.target.id())];
      shape.width(shape.width() * shape.scaleX());
      shape.height(shape.height() * shape.scaleY());
      shape.scaleX(1);
      shape.scaleY(1);
      component.proxy.sendChange(component.konv);
    });
    
  }

}
