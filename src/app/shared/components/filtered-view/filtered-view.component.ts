import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtered-view',
  templateUrl: './filtered-view.component.html',
  styleUrls: ['./filtered-view.component.scss']
})
export class FilteredViewComponent implements OnInit {

  @Input() filteredData:any;
  @Output() searchValueEmitter=new EventEmitter<any>();
  constructor(private router:Router) { }

  ngOnInit() {
  }

  searchByDepartment(departmentName){
    this.searchValueEmitter.emit(departmentName)
  }

}
