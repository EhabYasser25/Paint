import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Controller/http.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {

  constructor(private service: HttpService) { }

  ngOnInit(): void {
  }

  text = "kllll";

  send() {
    this.service.getRequest("http://localhost:8080")
    .subscribe(
      (data: string) => {
        this.text = data;
      }
    )
  }

}
