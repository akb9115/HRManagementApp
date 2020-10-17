import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionStatusService {

  constructor() { }

  private actionSource = new BehaviorSubject(null);
  currentStatus = this.actionSource.asObservable();

  updateStatus(status:number){
    this.actionSource.next(status)
  }
}
