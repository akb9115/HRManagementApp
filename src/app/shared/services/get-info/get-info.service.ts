import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  private idSource = new BehaviorSubject(null);
  currentId = this.idSource.asObservable();

  private nameSource = new BehaviorSubject(null);
  currentName = this.nameSource.asObservable();

  private actionSource=new BehaviorSubject(null);
  currentAction=this.actionSource.asObservable();

  constructor() { }

    updateId(id:number){
      this.idSource.next(id)
    }

    updateName(name:string){
      this.nameSource.next(name)
    }

    updateAction(action:string){
      this.actionSource.next(action)
    }
}
