import { FormOperationSupportService } from './../../services/formOperationSupport/form-operation-support.service';
import { ActionStatusService } from './../../services/action-status/action-status.service';
import { DeleteEmployeeService } from './../../services/delete-employee/delete-employee.service';
import { Router } from '@angular/router';
import { EmployeeInfoService } from './../../../admin/services/employee-info.service';
import { ApiCallsService } from './../../services/api-calls/api-calls.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { GetInfoService } from '../../services/get-info/get-info.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent implements OnInit {

  viewBeforeDeletion:boolean;
  viewBeforeRestoration:boolean;
  currentAction;
  id:number;
  employeeData:object;

  constructor(private formSupporter:FormOperationSupportService,private router:Router,private api: ApiCallsService, public modal: NgbActiveModal, private deleteEmployee: DeleteEmployeeService, private getInfo: GetInfoService, private employeeInfo: EmployeeInfoService,private actionStatus:ActionStatusService) { }

  ngOnInit() {
    this.getInfo.currentId.subscribe(id => this.id = id)
    
    this.getInfo.currentAction.subscribe(action=>this.currentAction=action)
    
    if(this.currentAction==="Delete"){
      this.viewBeforeDeletion=true
    }
    else if(this.currentAction==="Restore"){
      this.viewBeforeRestoration=true
    }
    this.api.fetchEmployeesInfo().subscribe(data => {
      this.employeeData = this.employeeInfo.sendDataAsPerID(data.json(), this.id)
    })
  }

  confirmDelete() {
    this.employeeData["isDeleted"]=true
    let returnResponse = this.deleteEmployee.deleteEmployeeProfile(this.employeeData,this.id)
    returnResponse.subscribe(data => {
      if (data.status === 200 && data.ok === true) {
        this.viewBeforeDeletion = false
        this.actionStatus.updateStatus(data.status)
      }
    })
  }

  confirmRestore() {
    this.employeeData["isDeleted"]=false
    let returnResponse = this.deleteEmployee.deleteEmployeeProfile(this.employeeData,this.id)
    returnResponse.subscribe(data => {
      if (data.status === 200 && data.ok === true) {
        this.viewBeforeRestoration = false
        this.actionStatus.updateStatus(data.status)
      }
    })
  }

  viewProfile(){
    this.router.navigate(['profile'],{queryParams:{id:this.id}})
    this.modal.close()
  }

  home(){
    this.router.navigate([''])
    this.modal.close()
  }

  addProfile(){
    this.router.navigate(['add-profile'])
    this.modal.close()
  }

  refreshPage() {    
    this.modal.close()
  }

  resetForm()
  {
    this.formSupporter.setReset(true);
    this.modal.close()
  }

  retrievalConfirmation()
  {
    this.formSupporter.setRetrieveFlag(true);
    this.modal.close();
  }

}


