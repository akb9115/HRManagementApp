import { addFormBuilderService } from '../../shared/services/addForm-builder/add-Form-builder.service';
import { ActionStatusService } from './../../shared/services/action-status/action-status.service';
import { EmployeeInfoService } from 'src/app/admin/services/employee-info.service';
import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { GetInfoService } from './../../shared/services/get-info/get-info.service';
import { DialogBoxComponent } from './../../shared/components/dialog-box/dialog-box.component';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const MODALS = {
  openDialogBox: DialogBoxComponent
};
@Component({
  selector: 'app-view-toggler',
  templateUrl: './view-toggler.component.html',
  styleUrls: ['./view-toggler.component.scss']
})
export class ViewTogglerComponent implements OnInit {

  @Input() toggleValue:boolean;
  listColumns=["ID","Name","Designation","Department","Contact Number","Email Address"]
  status;
  @Input() employeeListData:Array<object>;
  @Input() employeeCardData:Array<object>;
  @Input() departmentFilterData:any;
  @Output() refreshPageEmitter=new EventEmitter<any>();

  constructor(private formTemplateService:addFormBuilderService,private router:Router,private _modalService: NgbModal, private saveInfo: GetInfoService,private api:ApiCallsService,private employeeInfo:EmployeeInfoService,private actionStatus:ActionStatusService) { }

  ngOnInit() {
  }

  viewEmployeeProfile($event){
    let receivedId=$event
    this.router.navigate(['profile'],{queryParams:{id:receivedId}})
  }

  editEmployeeProfile($event){
    let receivedId=$event
   
      this.router.navigate(['edit'],{queryParams:{id:receivedId}})
  }

  deleteEmployeeProfile($event){
    let receivedId=$event
    this.saveInfo.updateId(receivedId)
    this.saveInfo.updateAction("Delete")
    this._modalService.open(MODALS['openDialogBox']);
    this.actionStatus.currentStatus.subscribe(status=>{
      this.status=status
      if(this.status===200){
        this.refreshPageEmitter.emit()
      }
    })

  }

  restoreEmployeeProfile($event){
    let receivedId=$event
    this.saveInfo.updateId(receivedId)
    this.saveInfo.updateAction("Restore")
    this._modalService.open(MODALS['openDialogBox']);
    this.actionStatus.currentStatus.subscribe(status=>{
      this.status=status
      if(this.status===200){
        this.refreshPageEmitter.emit()
      }
    })
  }

  addEmployeeProfile(){
    this.router.navigate(['add-profile'])
  }  



}
