import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _url: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  postRequest(instructionType: string, requesBody?: any): Observable<any> {
    return this.http.post(`${this._url}${instructionType}`, requesBody);
  }

  getRequest(instruction: string): Observable<any> {
    return this.http.get(`${this._url}${instruction}`, {responseType: 'text'});
  }
  
}