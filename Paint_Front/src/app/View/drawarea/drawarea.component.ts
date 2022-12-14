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
  @Input() Dpath : any;
  @Input() Dname : any;
  @Input() Dextention : any;
  @Input() buttonsActions: ButtonService;
  @Output() resetAction = new EventEmitter;

  constructor(private att: AttributesService, private http: HttpService) { }

  stage: Stage;
  layer: Layer;
  tr: Konva.Transformer;
  shapes: IShape[];
  proxy: Proxy;
  shapefactory: ShapeFactory;
  shape: IShape;
  konv: any;
  drawing: boolean = false;
  erasing: boolean = false;

  ngOnInit(): void {
    this.shapes = [];
    this.proxy = new Proxy(this.shapes, this.http);
    this.shapefactory = new ShapeFactory(this.att);
    this.proxy.startApp();
    this.stage = new Konva.Stage({height: window.innerHeight, width: window.innerWidth, container: "draw"});
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.tr = new Konva.Transformer();
    this.tr.borderEnabled(true);
    this.layer.add(this.tr);
    this.eventListeners();
  }

  save() {
    this.proxy.saveRequest(this.Dpath, this.Dname, this.Dextention)
    .pipe(take(1)).subscribe(
      data => {
        if(data == 0) alert("Saved Successfully in " + this.Dpath)
        else if(data == 1) alert("Cannot find this paths!")
      }
    );
  }

  load() {
    this.proxy.loadRequest(this.Dpath, this.Dname, this.Dextention).pipe(take(1)).subscribe(data => {
      if(data == null) {
        alert("Cannot find this paths!")
        return;
      }
      this.clearCanvas();
      for(let i = 0; i < data.length; i++) {
          console.log(data[i].name)
          this.att.setAttributes(data[i].name, +data[i].id, +data[i].x, +data[i].y, +data[i].width, +data[i].height,
            data[i].points, +data[i].rotateAngle, +data[i].strokeWidth, data[i].borderColor, data[i].fillColor);
          this.drawShape(data[i].name);
          this.shapes.push(this.shape);
      }
      this.proxy.shapes = this.shapes
      alert("Loaded Successfully from " + this.Dpath)
    });
  }

  drawShape(name: string) {
    this.shape = this.shapefactory.getShape(name);
    this.konv = this.shape.draw();
    this.layer.add(this.konv);
  }

  updateShapeAttributes(shapeId: number){
    let shape = this.shapes[shapeId]
    let konvaModel = shape.konvaModel
    shape.x = konvaModel.x()
    shape.y = konvaModel.y()
    shape.width = konvaModel.width()
    shape.height = konvaModel.height()
    shape.rotateAngle = konvaModel.rotation()
    shape.strokeWidth = konvaModel.strokeWidth()
    shape.borderColor = konvaModel.stroke()
    shape.fillColor = konvaModel.fill()
    this.proxy.sendChange(shapeId)
  }

  clearCanvas() {
    this.shapes = []
    this.proxy.shapes = this.shapes
    this.layer.destroyChildren()
    this.tr = new Konva.Transformer();
    this.tr.borderEnabled(true);
    this.layer.add(this.tr);
  }
    
  eventListeners() {

    const component = this;
    this.buttonsActions.$action.subscribe({
      next: (action: string) => {
        if(action != 'colorSelection' && action != 'colorSelectionEnd' && action != 'width' && action != 'copy') this.tr.nodes([]);
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
            this.clearCanvas()
            break;

          case 'colorSelection':
            if(this.tr.nodes()[0] == undefined) break;
            this.konv = this.tr.nodes()[0];
            if(this.border) this.konv.stroke(this.Dbordercolor);
            else this.konv.fill(this.Dfillcolor);
            break;
          
          case 'colorSelectionEnd':
            if(this.tr.nodes()[0] == undefined) break;
            this.konv = this.tr.nodes()[0];
            if(this.border) this.konv.stroke(this.Dbordercolor);
            else this.konv.fill(this.Dfillcolor);
            component.updateShapeAttributes(Number(this.konv.id()))
            break;

          case 'width':
            if(this.tr.nodes()[0] == undefined) break;
            this.konv = this.tr.nodes()[0];
            this.konv.strokeWidth(Number(this.Dwidth));
            break;
        
          case 'copy': 
            if(this.tr.nodes()[0] == undefined) return
            let newShape = this.shapes[Number(this.tr.nodes()[0].id())].clone()
            console.log(newShape.id)
            newShape.x += + 50;
            newShape.y += + 50;
            this.proxy.copyShape(newShape.id);
            newShape.id = this.shapes.length
            console.log(newShape.id)
            newShape.draw()
            this.shapes.push(newShape);
            this.layer.add(newShape.konvaModel);
            }
      }
    });

    this.stage.on("mousedown", function() {
      if(component.Dselect) return;
      component.tr.nodes([]);

      if(component.Dshape == 'erase') {
        component.drawing = false;
        component.erasing = true;
        return;
      }

      component.drawing = true;
      component.erasing = false;
      let pos = component.stage.getPointerPosition();
      component.att.setAttributes(component.Dshape, component.shapes.length, pos.x, pos.y, 1, 1, [pos.x, pos.y, pos.x, pos.y], 0, Number(component.Dwidth), component.Dbordercolor, component.Dfillcolor)
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
      else if(component.drawing) {
        component.drawing = false;
        component.shapes.push(component.shape);
        if(component.konv.points != undefined) component.shape.points = component.konv.points();
        else component.shape.points = []
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

    this.layer.on("dragstart", function(e) {
      if(component.tr.nodes()[0] != undefined && component.tr.nodes()[0] != e.target) {
        component.tr.nodes([]); 
      }
    });

    this.layer.on("dragend", function(e) {
      if(e.target.getClassName() == 'Transformer') return;
      component.updateShapeAttributes(Number(e.target.id()));
    });

    this.tr.on('transformend', function(e) {
      if (e.target.getParent() != component.layer) return;
      let konvaModel = e.target;
      konvaModel.width(konvaModel.width() * konvaModel.scaleX());
      konvaModel.height(konvaModel.height() * konvaModel.scaleY());
      konvaModel.scaleX(1);
      konvaModel.scaleY(1);
      component.updateShapeAttributes(Number(e.target.id()));
    });
    
  }

}
