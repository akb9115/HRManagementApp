import { DateFormatterService } from './../date-formatter/date-formatter.service';
import { HardCodedDataForFormService } from './../hard-coded-data-for-form/hard-coded-data-for-form.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditFormBuilderService {

  constructor(private dateFormatter:DateFormatterService,private hardCodedData:HardCodedDataForFormService,private formBuilder:FormBuilder) { }

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
          emailOffice: new FormControl('', [ Validators.pattern('^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+intelegencia.com$'), Validators.email]),
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

  returnEditFormTemplate(employeeData:any)
  {

    this.Image.controls.fileName.setValue(employeeData.profile.fileName?employeeData.profile.fileName:'')
    this.Image.controls.mimeType.setValue(employeeData.profile.mimeType?employeeData.profile.mimeType:'')
    this.Image.controls.image.setValue(employeeData.profile.image?employeeData.profile.image:'')

    this.basicDetails.controls.empID.setValue(employeeData.id?employeeData.id:'')
    this.basicDetails.controls.firstName.setValue(employeeData.firstName?employeeData.firstName:'')
    this.basicDetails.controls.middleName.setValue(employeeData.middleName?employeeData.middleName:'')
    this.basicDetails.controls.lastName.setValue(employeeData.lastName?employeeData.lastName:'')
    this.basicDetails.controls.gender.setValue(employeeData.gender?employeeData.gender:'')
    this.basicDetails.controls.bloodGroup.setValue(employeeData.bloodGroup?employeeData.bloodGroup:'')
    this.basicDetails.controls.department.setValue(employeeData.department?employeeData.department:'')
    this.basicDetails.controls.designation.setValue(employeeData.designation?employeeData.designation:'')
    this.basicDetails.controls.DOB.setValue(employeeData.DOB?this.dateFormatter.isoStringToDate(employeeData.DOB):'')
    this.basicDetails.controls.DOJ.setValue(employeeData.DOJ?this.dateFormatter.isoStringToDate(employeeData.DOJ):'')
    this.basicDetails.controls.employeeType.setValue(employeeData.employeetype?employeeData.employeetype:'')
    this.basicDetails.controls.probationPeriod.setValue(employeeData.probationPeriod?employeeData.probationPeriod:'')
    this.basicDetails.controls.confirmationDate.setValue(employeeData.confirmationDate?this.dateFormatter.isoStringToDate(employeeData.confirmationDate):'')
    this.basicDetails.controls.experience.setValue(employeeData.experience?employeeData.experience:'')
    
    this.contacts.controls.emailPersonal.setValue(employeeData.email?employeeData.email:'')
    this.contacts.controls.emailOffice.setValue(employeeData.emailOffice?employeeData.emailOffice:'')
    this.contacts.controls.phonePrimary.setValue(employeeData.phone[0].phoneNumber?employeeData.phone[0].phoneNumber:'')
    this.contacts.controls.phoneAlternate.setValue(employeeData.phone[1].phoneNumber?employeeData.phone[1].phoneNumber:'')
    this.contacts.controls.extensionOffice.setValue(employeeData.extensionOffice?employeeData.extensionOffice:'')
    this.contacts.controls.emergencyContactPersonName.setValue(employeeData.familyDetails.emergencyContactPerson?employeeData.familyDetails.emergencyContactPerson:'')
    this.contacts.controls.emergencyContactPersonContact.setValue(employeeData.familyDetails.emergencyContactNumber?employeeData.familyDetails.emergencyContactNumber:'')

    this.currentAddress.controls.address1.setValue(employeeData.address[0].addressFlat?employeeData.address[0].addressFlat:'')
    this.currentAddress.controls.address2.setValue(employeeData.address[0].addressLocality?employeeData.address[0].addressLocality:'')
    this.currentAddress.controls.city.setValue(employeeData.address[0].addressCity?employeeData.address[0].addressCity:'')
    this.currentAddress.controls.state.setValue(employeeData.address[0].addressState?employeeData.address[0].addressState:'')
    this.currentAddress.controls.country.setValue(employeeData.address[0].addressCountry?employeeData.address[0].addressCountry:'')
    this.currentAddress.controls.country.setValue(employeeData.address[0].addressZip?employeeData.address[0].addressZip:'')

    this.permanentAddress.controls.address1.setValue(employeeData.address[1].addressFlat?employeeData.address[1].addressFlat:'')
    this.permanentAddress.controls.address2.setValue(employeeData.address[1].addressLocality?employeeData.address[1].addressLocality:'')
    this.permanentAddress.controls.city.setValue(employeeData.address[1].addressCity?employeeData.address[1].addressCity:'')
    this.permanentAddress.controls.state.setValue(employeeData.address[1].addressState?employeeData.address[1].addressState:'')
    this.permanentAddress.controls.country.setValue(employeeData.address[1].addressCountry?employeeData.address[1].addressCountry:'')
    this.permanentAddress.controls.country.setValue(employeeData.address[1].addressZip?employeeData.address[1].addressZip:'')

    this.familyDetails.controls.maritalStatus.setValue(employeeData.familyDetails.maritalStatus?employeeData.familyDetails.maritalStatus:'')
    this.familyDetails.controls.spouseName.setValue(employeeData.familyDetails.spouseName?employeeData.familyDetails.spouseName:'')
    this.familyDetails.controls.spouseDOB.setValue(employeeData.familyDetails.spouseDOB?this.dateFormatter.isoStringToDate(employeeData.familyDetails.spouseDOB):'')
    this.familyDetails.controls.anniversaryDate.setValue(employeeData.familyDetails.anniversaryDate?this.dateFormatter.isoStringToDate(employeeData.familyDetails.anniversaryDate):'')
    this.familyDetails.controls.healthInsuranceNumber.setValue(employeeData.legalDetails.healthInsuranceNumber?employeeData.legalDetails.healthInsuranceNumber:'')

    this.salaryAndLegal.controls.salaryAtJoining.setValue(employeeData.salary.salaryAtJoining?employeeData.salary.salaryAtJoining:'')
    this.salaryAndLegal.controls.currentSalary.setValue(employeeData.salary.currentSalary?employeeData.salary.currentSalary:'')
    this.salaryAndLegal.controls.employeeReviewDate.setValue(employeeData.legalDetails.employeeReviewDate?this.dateFormatter.isoStringToDate(employeeData.legalDetails.employeeReviewDate):'')
    this.salaryAndLegal.controls.reportingTo.setValue(employeeData.legalDetails.reportingTo?employeeData.legalDetails.reportingTo:'')

    let hobbiesArray=[];
    let skillsArray=[];
    for(let i=0;i<employeeData.hobbies.length;i++)
    {
      hobbiesArray.push(employeeData.hobbies[i]);
    }

    for(let i=0;i<employeeData.skillSet.length;i++)
    {
      skillsArray.push(employeeData.skillSet[i])
    }

    this.editHobbies.setValue(hobbiesArray);
    this.editSkills.setValue(skillsArray);

  
    if(employeeData.appraisals!=null && employeeData.appraisals!=undefined)
    {
    for(let i=0;i<employeeData.appraisals.length;i++)
    {
      this.appraisals.push(this.formBuilder.group({
        year: [employeeData.appraisals[i].year, Validators.required],
        hike: [employeeData.appraisals[i].hike,[Validators.required]],
        revisedSalary: [employeeData.appraisals[i].revisedSalary,[Validators.required, Validators.pattern("^[0-9]+$")]] 
      }))
    }
  }

  if(employeeData.dependants!=null && employeeData.dependants!=undefined)
  { 
    for(let i=0;i<employeeData.dependants.length;i++)
    {
      this.dependants.push(this.formBuilder.group({
        name: [employeeData.dependants[i].name, Validators.required],
        DOB: [this.dateFormatter.isoStringToDate(employeeData.dependants[i].DOB),[Validators.required]],
        relation: [employeeData.dependants[i].relation,[Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z \.]+[a-zA-Z]$")]] 
      }))
    }
  }
    return this.formTemplate;
    
  }

}
