import { environment } from './../../../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  empData:any;

  constructor(private http:Http) { }



  fetchEmployeesInfo()
  {
    return this.http.get(environment.employeeUrl)
  }

  addEmployeeInfo(data){
    return this.http.post(environment.employeeUrl,data)
  }


  editEmployeeInfo(data)
  {
    let id=data["id"]
    return this.http.put(environment.employeeUrl+`/${id}`,data)
  }
}
