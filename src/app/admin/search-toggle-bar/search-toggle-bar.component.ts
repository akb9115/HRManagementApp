import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-toggle-bar',
  templateUrl: './search-toggle-bar.component.html',
  styleUrls: ['./search-toggle-bar.component.scss']
})
export class SearchToggleBarComponent implements OnInit {

  checkToggleValue:boolean;
  searchedQuery:any;
  foundEmployeeContent:any;
  departmentFilterFlag:boolean;

  @Output() toggleValueEmitter = new EventEmitter<boolean>();
  @Output() foundValueEmitter = new EventEmitter<boolean>();
  @Output() departmentFlagEmitter=new EventEmitter<boolean>();
  @Output() sortingKeyEmitter=new EventEmitter<any>();
  @Output() sortingOrderEmitter=new EventEmitter<any>();
  sortKey;
  sortOrder;
  
  constructor(private router:Router) { 
    
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("toggleValue"))===null){
      this.checkToggleValue=false
      this.toggleValueEmitter.emit(this.checkToggleValue)
    }
    else{
      this.checkToggleValue=JSON.parse(localStorage.getItem("toggleValue"))
      this.toggleValueEmitter.emit(JSON.parse(localStorage.getItem("toggleValue")))
    }
    this.sortKey='id'
    this.sortOrder='asc'
    this.sortingKeyEmitter.emit(this.sortKey)
    this.sortingOrderEmitter.emit(this.sortOrder)
  }

  listView()
  {
    this.checkToggleValue=true 
    localStorage.setItem("toggleValue", this.checkToggleValue.toString());
    this.toggleValueEmitter.emit(JSON.parse(localStorage.getItem("toggleValue")))
  }

  cardView()
  {
    this.checkToggleValue=false
    localStorage.setItem("toggleValue", this.checkToggleValue.toString());
    this.toggleValueEmitter.emit(JSON.parse(localStorage.getItem("toggleValue")))
  }

  searchEmployee()
  {
    if(this.searchedQuery!=undefined){
      this.router.navigate(['search'],{queryParams:{ query:this.searchedQuery }})
      this.searchedQuery=null
    }
  }

  changeSortKey(key:string){
    this.sortKey=key
    this.sortingKeyEmitter.emit(this.sortKey)
  }

  changeSortOrder(order:string){
    this.sortOrder=order
    this.sortingOrderEmitter.emit(this.sortOrder)
  }

}
