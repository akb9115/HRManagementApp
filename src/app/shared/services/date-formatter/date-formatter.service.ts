import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }


  dateToIsoString(date:Date)
  {
    return date.toISOString();
  }

  isoStringToDate(date:string)
  {
    return date.slice(0,date.indexOf('T'));
  }
}
