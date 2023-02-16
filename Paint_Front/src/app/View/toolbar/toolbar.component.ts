import { Component, EventEmitter, OnInit, Output, Input, HostListener } from '@angular/core';
import { ButtonService } from 'src/app/Controller/ButtonService/button.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @HostListener('window:keydown.Control.z', ['$event']) cz() {
    this.makeAction('undo');
  }

  @HostListener('window:keydown.Control.y', ['$event']) cy() {
    this.makeAction('redo');
  }

  @HostListener('window:keydown.Control.c', ['$event']) cc() {
    this.makeAction('copy');
  }

  @Output() actionEmitter = new EventEmitter<string>();
  @Input() buttonsActions: ButtonService;

  makeAction(event) {
    this.buttonsActions.setAction(event);
  }

  colorPickerChange(){
    console.log('sss')
  }

  selection: string = 'brush';

  @Output() shapeEmitter = new EventEmitter<string>();
  sendShape(event: any)
  {
    this.shapeEmitter.emit(event);
    if(!this.select) {
      this.sendSelect();
    }
    this.selection = event;
  }

  @Output() borderEmitter = new EventEmitter<boolean>();
  border : boolean = true;
  colorStyle(event: boolean)
  {
    this.borderEmitter.emit(event);
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
  sendColorFromPicker(event: any) {
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
    this.makeAction('colorSelection');
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
    this.select = !this.select;
    this.selection = 'select';
  }

  @Output() filePathEmiiter = new EventEmitter<string>();
  getPath(event: any)
  {
    this.filePathEmiiter.emit(event.target.value);
  }
  
  @Output() fileNameEmiiter = new EventEmitter<string>();
  getName(event: any)
  {
    this.fileNameEmiiter.emit(event.target.value);
  }
  @Output() fileExtensionEmiiter = new EventEmitter<string>();
  getExtention(event: any)
  {
    this.fileExtensionEmiiter.emit(event);
  }
  ngOnInit(): void {

  }
}