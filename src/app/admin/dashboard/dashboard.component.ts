import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { SortByPropertyPipe } from './../../shared/pipes/sort-by-property.pipe';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInfoService } from './../services/employee-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  checkToggleValue: boolean;
  departmentFilterFlag:boolean;
  departmentFilterData;
  listData: Array<object>;
  cardData: Array<object>;
  active_profiles = [];
  sortKey;
  sortOrder;

  constructor(private employeeInfo: EmployeeInfoService, private route: ActivatedRoute, private sortData: SortByPropertyPipe, private api: ApiCallsService) { }

  ngOnInit() {
    this.sortKey = 'id'
    this.sortOrder = 'asc'
    let employeesData = this.route.snapshot.data.jsonData
    for (let i = 0; i < employeesData.length; i++) {
      if (employeesData[i]["isDeleted"] === false) {
        this.active_profiles.push(employeesData[i])
      }
    }
    this.active_profiles = this.sortData.transform(this.active_profiles, this.sortKey, this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.active_profiles)
    this.cardData = this.employeeInfo.employeesDataForCard(this.active_profiles)
  }

  changeSortKey($event) {
    this.sortKey = $event
    this.active_profiles = this.sortData.transform(this.active_profiles, this.sortKey, this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.active_profiles)
    this.cardData = this.employeeInfo.employeesDataForCard(this.active_profiles)
  }

  changeSortOrder($event) {
    this.sortOrder = $event
    this.active_profiles = this.sortData.transform(this.active_profiles, this.sortKey, this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.active_profiles)
    this.cardData = this.employeeInfo.employeesDataForCard(this.active_profiles)
  }
  
  updateToggleValue($event) {
    this.checkToggleValue = $event;
  }

  refreshPage() {
    this.api.fetchEmployeesInfo().subscribe(data => {
      this.sortKey = 'id'
      this.sortOrder = 'asc'
      this.active_profiles=[]
      let employeesData = data.json()
      for (let i = 0; i < employeesData.length; i++) {
        if (employeesData[i]["isDeleted"] === false) {
          this.active_profiles.push(employeesData[i])
        }
      }
      this.active_profiles = this.sortData.transform(this.active_profiles, this.sortKey, this.sortOrder)
      this.listData = this.employeeInfo.employeesDataForList(this.active_profiles)
      this.cardData = this.employeeInfo.employeesDataForCard(this.active_profiles)
    })
  }

}
