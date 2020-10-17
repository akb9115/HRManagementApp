import { BehaviorSubject } from 'rxjs';
import { HardCodedDataForFormService } from '../hard-coded-data-for-form/hard-coded-data-for-form.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class addFormBuilderService{

  flag=true;
  date=new Date;
  operation:string;
  todayDate=`${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
  addFormTemplate: FormGroup;
  formTemplate = new FormGroup(
    {
      basicDetails: new FormGroup({
        profileImage: new FormGroup({
          fileName: new FormControl({value:this.hardCodedData.defaultProfileImage.fileName,disabled:false}),
          mimeType: new FormControl({value:this.hardCodedData.defaultProfileImage.mimeType,disabled:false}),
          image: new FormControl({value:this.hardCodedData.defaultProfileImage.image,disabled:false})
        }),
        empID: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$')]),
        firstName: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z \.]+$")]),
        middleName: new FormControl('',Validators.pattern('^[a-zA-Z]+$')),
        lastName: new FormControl('',Validators.pattern('^[a-zA-Z]+$')),
        gender: new FormControl('', Validators.required),
        bloodGroup: new FormControl(''),
        department: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        DOB: new FormControl('', [ ] ),
        DOJ: new FormControl('', [ ] ),
        employeeType: new FormControl('',  ),
        probationPeriod: new FormControl({value:'',disabled:true}, ),
        confirmationDate: new FormControl({value:'',disabled:true}, ),
        experience: new FormControl('',[ Validators.pattern('^([0-9]+)?([.]?[0-9]{0,1})?$')]),
        skills: new FormControl([], [ Validators.pattern('^([a-zA-Z]|[a-zA-Z][a-zA-Z \.\+\-])+(,[a-zA-Z]|[a-zA-Z \.\+\-]+[a-zA-Z]|[a-zA-Z\.\+\-]+)*')]),
        hobbies: new FormControl([], [ Validators.pattern('^([a-zA-Z]|[a-zA-Z][a-zA-Z \-])+(,[a-zA-Z]|[a-zA-Z \-]+[a-zA-Z]|[a-zA-Z\-]+)*')]),
      }),
      contacts: new FormGroup(
        {
          emailPersonal: new FormControl('', [  Validators.email]),
          emailOffice: new FormControl('', [  Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+intelegencia.com$'),Validators.email]),
          phonePrimary: new FormControl('', [ Validators.maxLength(13), Validators.minLength(10),Validators.pattern('^[0-9]+$')]),
          extensionOffice: new FormControl('',[Validators.minLength(4),Validators.maxLength(5),Validators.pattern('^[0-9]+$')]),
          phoneAlternate: new FormControl('',[Validators.maxLength(13),Validators.minLength(10),Validators.pattern('^[0-9]+$')]),
          emergencyContactPersonName: new FormControl('', [ ,Validators.pattern('[a-zA-Z][a-zA-Z \.]+[a-zA-Z]$')]),
          emergencyContactPersonContact: new FormControl('', [ Validators.maxLength(13), Validators.minLength(10)])
        }),
      address: new FormGroup({
        Permanent: new FormGroup(
          {
            addressType: new FormControl ({value:'Permanent',disabled:true},  ),
            address1: new FormControl ('', ),
            address2: new FormControl ('', ),
            state: new FormControl ('', ),
            city: new FormControl ('', [ ]),
            country: new FormControl ('', ),
            zipcode: new FormControl ('', [ Validators.minLength(6), Validators.maxLength(6)])
          }
        ),
        Current: new FormGroup(
          {
            addressType: new FormControl ({value:'Current',disabled:true},  ),
            address1: new FormControl ('', ),
            address2: new FormControl ('', ),
            state: new FormControl ('', ),
            city: new FormControl ('', [ ]),
            country: new FormControl ('', ),
            zipcode: new FormControl ('', [ Validators.minLength(6), Validators.maxLength(6)])
          }
        )
      }),
      familyDetails: new FormGroup({
        maritalStatus: new FormControl('',  ),
        spouseName: new FormControl({value:'',disabled:true},[Validators.pattern('[a-zA-Z][a-zA-Z \.]+[a-zA-Z]$'), ]),
        spouseDOB: new FormControl({value:'',disabled:true},  ),
        anniversaryDate: new FormControl({value:'',disabled:true}, ),
        dependants: new FormArray([]),
        healthInsuranceNumber: new FormControl('')
      }),
      salaryAndLegal: new FormGroup(
        {
          salaryAtJoining: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
          currentSalary: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
          appraisals: new FormArray([]),
          variables:new FormArray([]),
          employeeReviewDate: new FormControl('',  ),
          reportingTo: new FormControl('',[Validators.pattern('^[a-zA-Z][a-zA-Z \.]+[a-zA-Z]$')])
        }
      )
    }
  )

  constructor(public formBuilder: FormBuilder,public hardCodedData: HardCodedDataForFormService)
   { }

  get f() { return this.formTemplate.controls; }
  get address() { return this.f.address as FormGroup; }
  get contacts() {return this.f.contacts as FormGroup}
  get currentAddress() { return this.address.controls.Current as FormGroup}
  get permanentAddress() { return this.address.controls.Permanent as FormGroup}
  get basicDetails() {  return this.f.basicDetails as FormGroup}
  get editSkills(){ return this.basicDetails.controls.skills as FormControl}
  get editHobbies(){ return this.basicDetails.controls.hobbies as FormControl}
  get familyDetails() { return this.f.familyDetails as FormGroup}
  get dependants() { return this.familyDetails.controls.dependants as FormArray}
  get salaryAndLegal() {  return this.f.salaryAndLegal as FormGroup}
  get appraisals() { return this.salaryAndLegal.controls.appraisals as FormArray}
  get additionalVariables() { return this.salaryAndLegal.controls.variables as FormArray}
  get Image() { return this.basicDetails.controls.profileImage as FormGroup}


  returnAddFormTemplate() {
    this.basicDetails.controls.designation.disable();
    return this.formTemplate;
  }


}
