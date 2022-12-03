import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postRequest(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  getRequest(url: string, data?: any): Observable<any> {
    return this.http.get(url, {responseType: 'text'});
  }
  
}