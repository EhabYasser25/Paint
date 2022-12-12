import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {


  @Output() shapeEmitter = new EventEmitter<string>();
  sendShape(event: any)
  {
    this.shapeEmitter.emit(event);
    if(this.toggle) {
      this.sendSelect();
      this.enableDisableRule();
    }
  }

  border : boolean = true;
  colorStyle(event: any)
  {
    this.border = event;
  }

  @Output() borderColorEmitter = new EventEmitter<string>();
  @Output() fillColorEmitter = new EventEmitter<string>();

  bColor : string = 'black';
  fColor : string = 'white';
  sendColor(event: any) {
    if(this.border == true)
    {
      this.bColor = event;
      this.borderColorEmitter.emit(event);
    }
    else if(this.border == false)
    {
      this.fColor = event;
      this.fillColorEmitter.emit(event);
    }
  }
  sendColorP(event: any) {
    if(this.border == true)
    {
      this.bColor = event.target.value;
      this.borderColorEmitter.emit(event.target.value);
    }
    else if(this.border == false)
    {
      this.fColor = event.target.value;
      this.fillColorEmitter.emit(event.target.value);
    }
  }

  @Output() widthEmitter = new EventEmitter<string>();
  sendWidth(event: any)
  {
    this.widthEmitter.emit(event.target.value);
  }

  @Output() selectEmitter = new EventEmitter<boolean>();
  select: boolean = true;
  sendSelect()
  {
    this.selectEmitter.emit(this.select);
    //console.log(this.select);
    this.select = !this.select;
  }

  undo: boolean = true;
  @Output() undoEmitter = new EventEmitter<boolean>();
  makeUndo()
  {
      this.undoEmitter.emit(this.undo);
      this.undo = !this.undo;
  }

  redo: boolean = true;
  @Output() redoEmitter = new EventEmitter<boolean>();
  makeRedo()
  {
    this.redoEmitter.emit(this.redo);
    this.redo = !this.redo;
  }

  clear: boolean = true;
  @Output() clearEmitter = new EventEmitter<boolean>();
  makeClear()
  {
    this.clearEmitter.emit(this.clear);
    this.clear = !this.clear;
  }

  save: boolean = true;
  @Output() saveEmitter = new EventEmitter<boolean>();
  makeSave()
  {
    this.saveEmitter.emit(this.save);
    this.save = !this.save;
  }

  load: boolean = true;
  @Output() loadEmitter = new EventEmitter<boolean>();
  makeLoad()
  {
    this.loadEmitter.emit(this.load);
    this.load = !this.load;
  }

  toggle: boolean = false;
  status: string = 'Enable';

enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
}
  constructor() { }

  ngOnInit(): void
  {
    let picker = document.getElementById('colorpicker');
    picker?.addEventListener('input' , (e: any) => this.sendColorP(e));
  }
}