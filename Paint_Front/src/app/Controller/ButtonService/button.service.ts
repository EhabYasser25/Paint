import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private action = new Subject<string>();
  public $action = this.action.asObservable();

  constructor() { }

  setAction(action: string) {
    this.action.next(action);
  }
}
