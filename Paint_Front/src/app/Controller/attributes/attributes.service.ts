import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private service: HttpService) { }

  text = "Ehab";

  getText() {
    return this.text;
  }

  send() {
    this.service.getRequest("http://localhost:8080/st")
    .subscribe(
      (data: string) => {
        this.text = data;
        console.log(this.text);
      }
    )
  }

}
