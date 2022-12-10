import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paint_Front';

  receivedShape: string = '';
  receiveShape($event : string) {
    this.receivedShape = $event;
  }

  receivedColor: string = '';
  receiveColor($event : string) {
    this.receivedColor = $event;
  }

  receivedWidth: string = '';
  receiveWidth($event : string)
  {
    this.receivedWidth = $event;
    console.log(this.receivedWidth);
  }
}