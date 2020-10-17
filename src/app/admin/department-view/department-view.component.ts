import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterDataService } from '../services/filter-data.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent implements OnInit {

  departmentFilterData;
  active_profiles=[]

  constructor(private router:Router,private filterData:FilterDataService,private api:ApiCallsService) { }

  ngOnInit() {
    this.api.fetchEmployeesInfo().subscribe(data => {
      let employeesData=data.json()
      for (let i = 0; i < employeesData.length; i++) {
        if (employeesData[i]["isDeleted"] === false) {
          this.active_profiles.push(employeesData[i])
        }
      }
      this.departmentFilterData=this.filterData.filterData(this.active_profiles)
    })
  }

  searchByDepartment($event){
    let receivedDept=$event
    this.router.navigate(['search'],{queryParams:{query:receivedDept}})
  }

}
