import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormOperationSupportService {

  public retrievalData = new BehaviorSubject(null);
  retrievalDataStatus = this.retrievalData.asObservable();

  public action = new BehaviorSubject(null);
  actionStatus = this.action.asObservable();

  public resetFlag = new BehaviorSubject(null);
  resetStatus = this.resetFlag.asObservable();

  public retrieveFlag = new BehaviorSubject(null);
  retrieveStatus = this.retrieveFlag.asObservable();

  constructor() { }

  setReset(flag: boolean) {
    this.resetFlag.next(flag);

  }

  setRetrieveFlag(flag: boolean) {
    this.retrieveFlag.next(flag);

  }

  setAction(action: string) {
    this.action.next(action);
    console.log(this.action)

  }

  setRetrievalData(data: any) {
    this.retrievalData.next(data);

  }


}
