import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _url: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  postRequest(instructionType: string, instruction: string): Observable<any> {
    let newString = `${this._url}${instructionType}`
    return this.http.post(newString, instruction);
  }

  getRequest(instruction: string): Observable<any> {
    return this.http.get(`${this._url}${instruction}`, {responseType: 'text'});
  }
  
}