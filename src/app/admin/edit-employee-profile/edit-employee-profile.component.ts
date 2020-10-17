import { FormGroup } from '@angular/forms';
import { EmployeeInfoService } from 'src/app/admin/services/employee-info.service';
import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditFormBuilderService } from 'src/app/shared/services/editFormBuilder/edit-form-builder.service';

@Component({
  selector: 'app-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.scss'],
  providers:[EditFormBuilderService]
})
export class EditEmployeeProfileComponent implements OnInit {
  id:number;
  formTemplate:FormGroup
  jsonData;
  action="PUT";
  constructor(private editFormTemplateService:EditFormBuilderService,private route:ActivatedRoute,private api:ApiCallsService,private employeeInfo:EmployeeInfoService) {
   
   }

  ngOnInit() {
    this.route.queryParams.subscribe(routeParams=>{
      this.id=routeParams.id
      
      this.api.fetchEmployeesInfo().subscribe(data=>{
        this.jsonData=this.employeeInfo.sendDataAsPerID(data.json(),this.id)
        if(this.jsonData)
        {
        this.formTemplate=this.editFormTemplateService.returnEditFormTemplate(this.jsonData); 
        }
      })
      
    })
}
}
