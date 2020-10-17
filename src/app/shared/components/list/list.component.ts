import { ApiCallsService } from '../../services/api-calls/api-calls.service';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { EmployeeInfoService } from 'src/app/admin/services/employee-info.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnChanges {

  @Input() listData:Array<object>;
  @Input() columns:Array<any>;
  dataLength = 15;
  listInView;
  @Output() viewProfileEmitter=new EventEmitter<number>();
  @Output() deleteProfileEmitter = new EventEmitter<number>();
  @Output() editProfileEmitter=new EventEmitter<number>();
  @Output() restoreProfileEmitter = new EventEmitter<number>();

  constructor(private api:ApiCallsService,private employeeInfo:EmployeeInfoService) { }

  ngOnInit() {
    this.listInView=this.listData.slice(0,this.dataLength)
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.listData.currentValue){
      this.listInView=this.listData.slice(0,this.dataLength)
    }
  }

  onScroll() {
    this.dataLength=this.dataLength+10
    this.listInView=this.listData.slice(0,this.dataLength)
  }

  viewProfile(id) {
    this.viewProfileEmitter.emit(id)
  }

  editProfile(id){
    this.editProfileEmitter.emit(id)
  }

  deleteProfile(id) {
    this.deleteProfileEmitter.emit(id)
  }

  restoreProfile(id){
    this.restoreProfileEmitter.emit(id)
  }

}
