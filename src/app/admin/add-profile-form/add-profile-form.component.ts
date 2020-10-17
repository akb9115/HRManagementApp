import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { addFormBuilderService } from 'src/app/shared/services/addForm-builder/add-Form-builder.service';

@Component({
  selector: 'app-add-profile-form',
  templateUrl: './add-profile-form.component.html',
  styleUrls: ['./add-profile-form.component.scss'],
  providers:[addFormBuilderService]
})
export class AddProfileFormComponent implements OnInit {
  addformTemplate:FormGroup;
  action="POST";
  constructor(private formTemplateProvider:addFormBuilderService) { 
    this.addformTemplate=this.formTemplateProvider.returnAddFormTemplate();
    
  }

  ngOnInit() {
  }

}
