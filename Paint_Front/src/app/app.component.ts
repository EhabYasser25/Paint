import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'Paint_Front';

  receivedShape: any = 'brush';
  receiveShape(event: any) {
    this.receivedShape = event;
  }

  receivedBorderColor: any = 'black';
  receiveBorderColor(event: any) {
    this.receivedBorderColor = event;
  }

  receivedFillColor: any = '#FFFFFF00';
  receiveFillColor(event: any) {
    this.receivedFillColor = event;
  }

  receivedWidth: any = '1';
  receiveWidth(event: any) {
    this.receivedWidth = event;
  }
  
}