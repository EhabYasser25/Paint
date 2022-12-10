import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @Output() childToParent = new EventEmitter<string>();
  sendShape(event: any)
  {
    this.childToParent.emit(event);
  }
  sendColor(event: any)
  {
    this.childToParent.emit(event);
  }
  sendWidth(event: any)
  {
    this.childToParent.emit(String(event.target.value));
    console.log(event.target.value);
  }

  constructor() { }

  ngOnInit(): void {
  }
}