import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { SortByPropertyPipe } from './../../shared/pipes/sort-by-property.pipe';
import { SearchPipe } from './../pipes/search.pipe';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeInfoService } from '../services/employee-info.service';

@Component({
  selector: 'app-searched-results',
  templateUrl: './searched-results.component.html',
  styleUrls: ['./searched-results.component.scss']
})
export class SearchedResultsComponent implements OnInit {

  checkForData = true
  listData: any;
  cardData: any;
  searchedQuery: any;
  allEmployeeData: any;
  resultsLength: number;
  checkToggleValue;
  foundEmployeeData;
  sortKey: string;
  sortOrder: string;

  constructor(private employeeInfo: EmployeeInfoService, private route: ActivatedRoute, private search: SearchPipe,private sortData: SortByPropertyPipe,private api:ApiCallsService) {

  }

  ngOnInit() {
    this.sortKey='id'
    this.sortOrder='asc'
    this.allEmployeeData = this.route.snapshot.data.jsonData
    this.route.queryParams.subscribe(routeParams => {
      this.searchedQuery = routeParams.query
      this.searchEmployee()
    })
  }

  searchEmployee() {
    this.foundEmployeeData = this.search.transform(this.allEmployeeData, this.searchedQuery)
    if (this.foundEmployeeData.length === 0 && this.foundEmployeeData.length === 0) {
      this.checkForData = false
    }
    else {
      this.foundEmployeeData=this.sortData.transform(this.foundEmployeeData,this.sortKey,this.sortOrder)
      this.resultsLength = this.foundEmployeeData.length
      this.checkForData = true
      this.listData = this.employeeInfo.employeesDataForList(this.foundEmployeeData)
      this.cardData = this.employeeInfo.employeesDataForCard(this.foundEmployeeData)
    }
  }

  changeSortKey($event){
    this.sortKey=$event
    this.foundEmployeeData = this.sortData.transform(this.foundEmployeeData,this.sortKey,this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.foundEmployeeData)
    this.cardData = this.employeeInfo.employeesDataForCard(this.foundEmployeeData)
  }

  changeSortOrder($event){
    this.sortOrder=$event
    this.foundEmployeeData = this.sortData.transform(this.foundEmployeeData,this.sortKey,this.sortOrder)
    this.listData = this.employeeInfo.employeesDataForList(this.foundEmployeeData)
    this.cardData = this.employeeInfo.employeesDataForCard(this.foundEmployeeData)
  }

  updateToggleValue($event) {
    this.checkToggleValue = $event;
  }

  refreshPage() {
    this.api.fetchEmployeesInfo().subscribe(data => {
      this.sortKey = 'id'
      this.sortOrder = 'asc'
      let active_profile=[]
      this.foundEmployeeData = this.search.transform(data.json(), this.searchedQuery)
      for (let i = 0; i < this.foundEmployeeData.length; i++) {
        if (this.foundEmployeeData[i]["isDeleted"] === false) {
          active_profile.push(this.foundEmployeeData[i])
        }
      }
      active_profile = this.sortData.transform(active_profile,this.sortKey,this.sortOrder)
      this.resultsLength = active_profile.length
      this.listData = this.employeeInfo.employeesDataForList(active_profile)
      this.cardData = this.employeeInfo.employeesDataForCard(active_profile)
    })
  }

}
