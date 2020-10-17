import { SortByPropertyPipe } from './../../shared/pipes/sort-by-property.pipe';
import { EmployeeInfoService } from './../services/employee-info.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';

@Component({
  selector: 'app-deleted-profiles',
  templateUrl: './deleted-profiles.component.html',
  styleUrls: ['./deleted-profiles.component.scss']
})
export class DeletedProfilesComponent implements OnInit {

  checkToggleValue;
  employee_data;
  checkForData=true;
  resultsLength:number;
  listData:Array<object>;
  cardData:Array<object>;
  deleted_profiles=[]
  sortKey: string;
  sortOrder: string;

  constructor(private route:ActivatedRoute,private employeeInfo:EmployeeInfoService,private sortData: SortByPropertyPipe,private api:ApiCallsService) { }

  ngOnInit() {
    this.sortKey='id'
    this.sortOrder='asc'
    this.employee_data = this.route.snapshot.data.jsonData
    for(let i=0;i<this.employee_data.length;i++){
      if(this.employee_data[i]["isDeleted"]===true){
        this.deleted_profiles.push(this.employee_data[i])
      }
    }
    if (this.deleted_profiles.length === 0 && this.deleted_profiles.length === 0) {
      this.checkForData = false
    }
    else {
      this.deleted_profiles=this.sortData.transform(this.deleted_profiles,this.sortKey,this.sortOrder)
      this.resultsLength = this.deleted_profiles.length
      this.checkForData = true
      this.listData = this.employeeInfo.employeesDataForList(this.deleted_profiles)
      this.cardData = this.employeeInfo.employeesDataForCard(this.deleted_profiles)
    }
  }

  changeSortKey($event){
    this.sortKey=$event
    this.deleted_profiles = this.sortData.transform(this.deleted_profiles,this.sortKey,this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.deleted_profiles)
    this.cardData = this.employeeInfo.employeesDataForCard(this.deleted_profiles)
  }

  changeSortOrder($event){
    this.sortOrder=$event
    this.deleted_profiles = this.sortData.transform(this.deleted_profiles,this.sortKey,this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.deleted_profiles)
    this.cardData = this.employeeInfo.employeesDataForCard(this.deleted_profiles)
  }

  updateToggleValue($event) {
    this.checkToggleValue = $event;
  }

  refreshPage() {
    this.api.fetchEmployeesInfo().subscribe(data => {
      this.sortKey = 'id'
      this.sortOrder = 'asc'
      this.deleted_profiles=[]
      let employeesData = data.json()
      for (let i = 0; i < employeesData.length; i++) {
        if (employeesData[i]["isDeleted"] === true) {
          this.deleted_profiles.push(employeesData[i])
        }
      }
      this.deleted_profiles = this.sortData.transform(this.deleted_profiles, this.sortKey, this.sortOrder)
      this.resultsLength = this.deleted_profiles.length
      this.listData = this.employeeInfo.employeesDataForList(this.deleted_profiles)
      this.cardData = this.employeeInfo.employeesDataForCard(this.deleted_profiles)
    })
  }

}
