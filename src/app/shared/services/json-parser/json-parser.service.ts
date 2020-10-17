import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonParserService {

  constructor(private http:Http) { }

  parseAndPass(url:string)
  {
    return this.http.get(url);
  }

}
