import { Component, OnInit } from '@angular/core';
import { AttributesService } from 'src/app/Controller/attributes/attributes.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {

  constructor(private att: AttributesService) { }

  ngOnInit(): void {
  }

  getText() {
    return this.att.getText();
  }

  send() {
    this.att.send();
  }

}
