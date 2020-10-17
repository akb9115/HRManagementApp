import { Validators } from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddValidatorService {

  constructor() { }

  setValidator(field:any)
  {
    let tempValidator=[];
    if(field.validations.includes('required'))
    { 
        let tempObject={};
        tempObject["name"]="required";
        tempObject["validator"]=Validators.required;
        tempObject["message"]=field.label+"Required";
        tempValidator.push(tempObject);
      }
      //----------------------------------------
    if(field.validations.includes('pattern'))
    { 
        let tempObject={};
        tempObject["name"]="pattern";
        tempObject["validator"]=Validators.pattern("^[a-zA-Z0-9]+$");
        tempValidator.push(tempObject);

      }

      
    
    return tempValidator;
  }
}
