import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-form-elements',
  templateUrl: './dynamic-form-elements.component.html',
  styleUrls: ['./dynamic-form-elements.component.scss']
})
export class DynamicFormElementsComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;
  isTouched=false;
  show:boolean;

  constructor() {
  
   }

  ngOnInit() {  
    this.show=false
  }

  submitFormData()
  {
    
  } 

  changeTouch()
  {
    this.isTouched=true;
  }

  showOrHidePassword(){
    this.show=!this.show
  }

}
