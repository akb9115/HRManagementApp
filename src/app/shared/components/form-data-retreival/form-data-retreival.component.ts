import { Router } from '@angular/router';
import { FormOperationSupportService } from './../../services/formOperationSupport/form-operation-support.service';
import { FormGroup } from '@angular/forms';
import { EditFormBuilderService } from 'src/app/shared/services/editFormBuilder/edit-form-builder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-data-retreival',
  templateUrl: './form-data-retreival.component.html',
  styleUrls: ['./form-data-retreival.component.scss'],
  providers:[EditFormBuilderService]
})
export class FormDataRetreivalComponent implements OnInit {
  formTemplate:FormGroup
  retrievedData:any;
  action:string;
  constructor(private formSupporter:FormOperationSupportService,private formTemplateService:EditFormBuilderService,private router:Router) {
    this.formSupporter.retrievalDataStatus.subscribe(data=>{
      if(data)
      {  
      this.retrievedData=data;
      console.log("component recieved data",this.retrievedData)
      }
      else
      {
        this.router.navigate(['add-profile'])
      }
      })
    
    this.formSupporter.actionStatus.subscribe(action=>{
      this.action=action;
      console.log("compopnent received action",this.action)

    })
    this.formTemplate=this.formTemplateService.returnEditFormTemplate(this.retrievedData)
   }

  ngOnInit() {
  }

}
