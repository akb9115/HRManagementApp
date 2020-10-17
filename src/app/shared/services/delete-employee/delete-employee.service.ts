import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteEmployeeService {

  httpOptions = {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  employee_json;
  id: number;
  private handleError(error: any) {
    return  throwError(error.error);
  }

  constructor(private http: Http) { }

  ngOnInit() { }


  deleteEmployeeProfile(data, id:number) {
    this.id = id
    return this.http.put(environment.employeeUrl + `/${this.id}`, data).pipe(
      catchError(this.handleError)
    )
  }
}
