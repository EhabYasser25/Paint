import { Component } from '@angular/core';
import { ButtonService } from './Controller/ButtonService/button.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Paint_Front';

  constructor(public buttonsAction: ButtonService){}

  receivedShape: any = 'brush';
  receiveShape(event : any) {
    this.receivedShape = event;
  }

  receivedBorderColor: any = 'black';
  receiveBorderColor(event : any) {
    this.receivedBorderColor = event;
  }

  receivedFillColor: any = '#FFFFFF00';
  receiveFillColor(event : any) {
    this.receivedFillColor = event;
  }

  receivedWidth: any = '7';
  receiveWidth(event : any) {
    this.receivedWidth = event;
  }

  receivedSelect: boolean = false;
  receiveSelect(event: any) {
    this.receivedSelect = event;
  }

  receivedBorder: boolean = true;
  receiveBorder(event: any) {
    this.receivedBorder = event;
  }

  receivedClear: boolean = false;
  receiveClear(event: any)
  {
    this.receivedClear = event;
  }
  receivedSave: boolean = false;
  receiveSave(event: any)
  {
    this.receivedSave = event;
  }
  receivedLoad: boolean = false;
  receiveLoad(event: any)
  {
    this.receivedLoad = event;
  }
  receivedPath: any;
  receivePath(event: any)
  {
    this.receivedPath = event;
  }
  receivedName: any;
  receiveName(event: any)
  {
    this.receivedName = event;
  }
  receivedExtention: string = 'json';
  receiveExtention(event: any)
  {
    this.receivedExtention = event;
  }
}