import { Component, Input, OnInit } from '@angular/core';
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



  constructor(private att: AttributesService) { }

  stage!: Stage;
  layer!: Layer;
  tr: any;
  shapes: Konva.Shape[] = [];
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
    this.tr = new Konva.Transformer();
    this.tr.borderEnabled(true);
    this.layer.add(this.tr);
    this.eventListeners();
  }

  eventListeners() {

    const component = this;
    let konv: any;
    let drawing: boolean = false;
    let drag: boolean = false;

    this.stage.on("mousedown", function() {
      if(drag) return;
      component.tr.nodes([]);
      drawing = true;
      let pos = component.stage.getPointerPosition();
      component.att.x = pos?.x;
      component.att.y = pos?.y;
      component.att.borderColor = component.Dbordercolor;
      component.att.fillColor = component.Dfillcolor;
      component.att.strokeWidth = Number(component.Dwidth);
      console.log(component.Dshape);
      component.shape = component.shapefactory.getShape(component.Dshape);
      konv = component.shape.draw();
      component.layer.add(konv).draw();
    });

    this.stage.on("mousemove", function() {
      if(!drawing) return;
      let pos = component.stage.getPointerPosition();
      let endX: any = pos?.x;
      let endY: any = pos?.y;
      const width = endX - component.att.x;
      const height = endY - component.att.y;
      component.shape.continueDraw(width, height);
      component.layer.draw();
    });

    this.stage.on("mouseup",  () => {
      //alert(this.Dselect);
      if(drawing) component.shapes.push(konv);
      console.log(component.shapes);
      drawing = false;
    });

    this.layer.on("mouseover", function(e) {
      if(component.Dselect) {
        document.body.style.cursor = 'move';
        e.target.draggable(true);
        drag = true;
      }
      else e.target.draggable(false);
    });

    this.layer.on("mouseout", function() {
      document.body.style.cursor = 'default';
      drag = false;
    });

    this.stage.on("click tap", function(e) {
      if (e.target == component.stage || !component.Dselect) {
        component.tr.nodes([]);
        return;
      }
      component.tr.nodes([e.target]);
    });

  }
}
