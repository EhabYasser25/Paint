
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @Output() childToParent = new EventEmitter<string>();
  sendShape($event: string | undefined) {
    this.childToParent.emit($event);
  }
  sendColor($event: string | undefined) {
    this.childToParent.emit($event);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
