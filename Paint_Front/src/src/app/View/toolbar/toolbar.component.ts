import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @Output() shapeEmitter = new EventEmitter<string>();
  sendShape(event: any) {
    this.shapeEmitter.emit(event);
  }

  @Output() borderColorEmitter = new EventEmitter<string>();
  sendBorderColor(event: any) {
    this.borderColorEmitter.emit(event);
  }

  @Output() fillColorEmitter = new EventEmitter<string>();
  sendFillColor(event: any) {
    this.fillColorEmitter.emit(event);
  }

  @Output() widthEmitter = new EventEmitter<string>();
  sendWidth(event: any) {
    this.widthEmitter.emit(event.target.value);
  }

  @Output() selectEmitter = new EventEmitter<boolean>();
  select: boolean = true;
  sendSelect() {
    this.selectEmitter.emit(this.select);
    this.select = !this.select;
  }

  constructor() { }

  ngOnInit(): void {
  }

}