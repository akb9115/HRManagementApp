import { SummaryPipePipe } from './../../pipes/summaryPipe/summary-pipe.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DateFormatterService } from './../../services/date-formatter/date-formatter.service';
import { FormOperationSupportService } from './../../services/formOperationSupport/form-operation-support.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { HardCodedDataForFormService } from '../../services/hard-coded-data-for-form/hard-coded-data-for-form.service';
import { addFormBuilderService } from '../../services/addForm-builder/add-Form-builder.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataToJsonService } from '../../../admin/services/form-data-to-json.service';
import { GetInfoService } from 'src/app/shared/services/get-info/get-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const MODALS = {
  openDialogBox: DialogBoxComponent
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input('form') form:FormGroup;
  @Input('action')action:string;

  submitted = false;
  personalDetailsButtonEnabled: boolean;
  familyDetailsButtonEnabled: boolean;
  salaryAndLegalButtonEnabled: boolean;
  addressCheck: boolean = false;
  dependantLength: number = 0;
  date = new Date;
  todayDate = `${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()}`;
  file={
    type:'',
    file:'',
    fileName:''
  }
  constructor(private dateFormatter:DateFormatterService,private formSupporter:FormOperationSupportService,public router: Router, private _modalService: NgbModal, public formBuilder: FormBuilder, public formTemplateService: addFormBuilderService, public hardCoded: HardCodedDataForFormService, private formDataToJson: FormDataToJsonService, private api: ApiCallsService, private saveInfo: GetInfoService) { }

  ngOnInit() {
   
    this.personalDetailsButtonEnabled = true
    this.familyDetailsButtonEnabled = false
    this.salaryAndLegalButtonEnabled = false
    this.saveInfo.updateId(1);
    this.form.valueChanges.subscribe(form => {
      sessionStorage.setItem('form', JSON.stringify(form));
    });
    this.lostDataRetrieval();
    this.dependantLength=this.dependants.controls.length;
    if(this.basicDetails.controls.department.value)
    {
      this.hardCoded.setPossibleDesignations(this.basicDetails.controls.department.value);
    }   
    }

  // convenience getters for easy access to form fields
  get f() { return this.form.controls }
  get address() { return this.f.address as FormGroup }
  get contacts() { return this.f.contacts as FormGroup }
  get currentAddress() { return this.address.controls.Current as FormGroup }
  get permanentAddress() { return this.address.controls.Permanent as FormGroup }
  get basicDetails() { return this.f.basicDetails as FormGroup }
  get familyDetails() { return this.f.familyDetails as FormGroup }
  get dependants() { return this.familyDetails.controls.dependants as FormArray }
  get salaryAndLegal() { return this.f.salaryAndLegal as FormGroup }
  get appraisals() { return this.salaryAndLegal.controls.appraisals as FormArray }
  get additionalVariables() { return this.salaryAndLegal.controls.variables as FormArray }
  get Image() { return this.basicDetails.controls.profileImage as FormGroup }

  getDependantControl(index:any){return this.dependants.controls[index] as FormGroup}

  changeTab(value: string) {
    if (value === 'personal') {
      this.personalDetailsButtonEnabled = true;
      this.familyDetailsButtonEnabled = false;
      this.salaryAndLegalButtonEnabled = false;
    }

    if (value === 'family') {
      this.personalDetailsButtonEnabled = false;
      this.familyDetailsButtonEnabled = true;
      this.salaryAndLegalButtonEnabled = false;
    }

    if (value === 'salary') {
      this.personalDetailsButtonEnabled = false;
      this.familyDetailsButtonEnabled = false;
      this.salaryAndLegalButtonEnabled = true;
    }
  }

  changedDepartment()
  {
    this.basicDetails.controls.designation.setValue('Select');
    this.basicDetails.controls.designation.disable();
    this.hardCoded.setPossibleDesignations(this.basicDetails.controls.department.value);
    this.basicDetails.controls.designation.enable();
  }

  changedEmployeeType() {
    if (this.basicDetails.controls.employeeType.value == "Permanent") {
      this.basicDetails.controls.probationPeriod.disable();
      this.basicDetails.controls.confirmationDate.disable();
    }

    else {
      this.basicDetails.controls.probationPeriod.enable();
      this.basicDetails.controls.confirmationDate.enable();
    }
  }

  getSkillsAndHobbies() {
    //-------------skills insertion in array----------- 
    let skillsString: string = this.basicDetails.controls.skills.value;
    let skillArray: string[] = [];

    if (this.basicDetails.controls.skills.value[0] && this.basicDetails.controls.skills.value[0].length > 1) {
      let i: number;
      let temp: string = '';
      for (i = 0; i < skillsString.length; i++) {
        temp = temp + skillsString[i] + ',';
      }
      temp = temp.slice(0, -1)
      skillsString = temp;

    }
    if (skillsString.length !== 0 && skillsString !== null && skillsString !== undefined) {
      let temp = skillsString.split(',');
      for (let i in temp) {
        let skillName = temp[i];
        skillArray.push(skillName[0].toUpperCase() + skillName.slice(1));
      }
    }
    //--------------hobbies insertion in array-----------
    let hobbiesString: string = this.basicDetails.controls.hobbies.value;
    let hobbiesArray: string[] = [];

    if (this.basicDetails.controls.hobbies.value[0] && this.basicDetails.controls.hobbies.value[0].length > 1) {
      let i: number;
      let temp: string = '';
      for (i = 0; i < hobbiesString.length; i++) {
        temp = temp + hobbiesString[i] + ',';
      }
      temp = temp.slice(0, -1)
      hobbiesString = temp;
    }

    if (hobbiesString.length !== 0 && hobbiesString !== null && hobbiesString !== undefined) {
      let temp = hobbiesString.split(',');
      for (let i in temp) {
        let hobbieName = temp[i]
        hobbiesArray.push(hobbieName[0].toUpperCase() + hobbieName.slice(1));
      }
    }
    this.basicDetails.controls.skills.setValue(skillArray);
    this.basicDetails.controls.hobbies.setValue(hobbiesArray);

  }

  changeAddressCheck() {
    this.addressCheck = !this.addressCheck;
    if (this.addressCheck == true) {
      this.setPermanentAddressValues();
      this.permanentAddress.controls.address1.disable();
      this.permanentAddress.controls.address2.disable();
      this.permanentAddress.controls.state.disable();
      this.permanentAddress.controls.city.disable();
      this.permanentAddress.controls.country.disable();
      this.permanentAddress.controls.zipcode.disable();
    }
    else {
      this.permanentAddress.controls.address1.setValue('');
      this.permanentAddress.controls.address2.setValue('');
      this.permanentAddress.controls.state.setValue('');
      this.permanentAddress.controls.city.setValue('');
      this.permanentAddress.controls.country.setValue('');
      this.permanentAddress.controls.zipcode.setValue('');
      //----------------------------------------
      this.permanentAddress.controls.address1.enable();
      this.permanentAddress.controls.address2.enable();
      this.permanentAddress.controls.state.enable();
      this.permanentAddress.controls.city.enable();
      this.permanentAddress.controls.country.enable();
      this.permanentAddress.controls.zipcode.enable();
    }
  }

  setPermanentAddressValues() {
    this.permanentAddress.controls.address1.setValue(this.currentAddress.controls.address1.value);
    this.permanentAddress.controls.address2.setValue(this.currentAddress.controls.address2.value);
    this.permanentAddress.controls.state.setValue(this.currentAddress.controls.state.value);
    this.permanentAddress.controls.city.setValue(this.currentAddress.controls.city.value);
    this.permanentAddress.controls.country.setValue(this.currentAddress.controls.country.value);
    this.permanentAddress.controls.zipcode.setValue(this.currentAddress.controls.zipcode.value);
  }

  changedMaritalStatus() {
    if (this.familyDetails.controls.maritalStatus.value == "Married") {
      this.familyDetails.controls.spouseName.enable();
      this.familyDetails.controls.spouseDOB.enable();
      this.familyDetails.controls.anniversaryDate.enable();
    }
    else {
      this.familyDetails.controls.spouseName.setValue('');
      this.familyDetails.controls.spouseDOB.setValue('');
      this.familyDetails.controls.anniversaryDate.setValue('');

      this.familyDetails.controls.spouseName.disable();
      this.familyDetails.controls.spouseDOB.disable();
      this.familyDetails.controls.anniversaryDate.disable();
    }
  }

  addDependants() {
    this.dependantLength++;

    if (this.dependantLength <= 3) {
      this.dependants.push(this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z \.]+[a-zA-Z]$')]],
        DOB: ['', [Validators.required]],
        relation: ['', Validators.required]
      }))
    }

    else {
      alert("Cannot add more than 3 Dependants");
    }
  }

  removeDependant(index: any) {
    this.dependantLength--;
    this.dependants.removeAt(index);
  }

  addAppraisals() {
    this.appraisals.push(this.formBuilder.group({
      year: ['', Validators.required],
      hike: ['', [Validators.required]],
      revisedSalary: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    }))
  }

  removeAppraisals(index: any) {
    this.appraisals.removeAt(index);
  }

  addVariables() {
    this.additionalVariables.push(this.formBuilder.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      date: ['', Validators.required]
    }))
  }

  removeVariables(index: any) {
    this.additionalVariables.removeAt(index);
  }
// Input image conversion to base 64 format
  handleProfileImageChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.Image.controls.fileName.setValue(file.name);
      this.Image.controls.mimeType.setValue(file.type);
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.Image.controls.image.setValue(reader.result);
  }

  handleInsurancePolicyChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      this.file.fileName=file.name;
      this.file.type=file.type;
     // var pattern = /^.+\.(([pP][dD][fF]))$/;
      var reader = new FileReader();
      if (!file.type.match("application/pdf")) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleInsuranceReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleInsuranceReaderLoaded(e) {
    let reader = e.target;
    this.file.file=reader.result;
    console.log(this.file);
  }

  downloadInsurancePolicy() {
    const linkSource = this.file.file;
    const downloadLink = document.createElement("a");
    const fileName = this.file.fileName;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

  reset() {
    if(this.Image.controls.image.value!= this.hardCoded.defaultProfileImage.image)
    {
      this.Image.controls.image.markAsDirty();
    }
    if (this.action == "POST") {
      if(this.form.dirty)
      {
      this.saveInfo.updateAction("ResetConfirmation")
      this._modalService.open(MODALS['openDialogBox']);
      this.formSupporter.resetStatus.subscribe(status=>{
        
        if (status==true)
        {
          sessionStorage.removeItem('form');
          sessionStorage.clear(); 
          this.form.reset();
          this.Image.controls.image.setValue(this.hardCoded.defaultProfileImage.image);
          this.Image.controls.fileName.setValue(this.hardCoded.defaultProfileImage.fileName);
          this.Image.controls.mimeType.setValue(this.hardCoded.defaultProfileImage.mimeType);       
        }
        })
      }  
    }

    if (this.action == "PUT") {
      if(this.form.dirty)
      {
        sessionStorage.removeItem('form');
        sessionStorage.clear();  
        window.location.reload();    
      }

      if(this.form.pristine)
      {
        this.saveInfo.updateAction("ResetConfirmation")
        this._modalService.open(MODALS['openDialogBox']);
        this.formSupporter.resetStatus.subscribe(status=>{
        
        if (status==true)
        {
          sessionStorage.removeItem('form');
          sessionStorage.clear();
          this.form.reset();
          this.Image.controls.image.setValue(this.hardCoded.defaultProfileImage.image);
          this.Image.controls.fileName.setValue(this.hardCoded.defaultProfileImage.fileName);
          this.Image.controls.mimeType.setValue(this.hardCoded.defaultProfileImage.mimeType);   
        }
          })  
      }
  }
}

formSubmissionChecks()
{
  let kidsCount=0
    for (let index in this.dependants.controls)
    { let dependant=this.getDependantControl(index)
      if(dependant.value.relation=="Son" || dependant.value.relation=="Daughter")
      {kidsCount++;}
    }
    if(this.basicDetails.controls.designation.value=="Select" || kidsCount>2)
    {
      if(this.basicDetails.controls.designation.value=="Select")
      alert("Please select a valid designation")

      if(kidsCount>2)
      alert("Cannot add more than 2 Kids as dependants")

      return false;
    }
    return true;
}

  onSubmit() {
    this.submitted = true;
    if (this.form.valid && this.formSubmissionChecks()) {
      let newProfileJson = this.formDataToJson.generateNewProfile(this.form.getRawValue())
      if (this.action == "POST") {
        let response = this.api.addEmployeeInfo(newProfileJson)
        response.subscribe(data => {
          if (data.status == 201) {
            sessionStorage.clear();
            this.saveInfo.updateId(newProfileJson["id"])
            this.saveInfo.updateAction("ProfileAdded")
            this._modalService.open(MODALS['openDialogBox']);
          }

          else {
            alert("Server Failed");
            this.submitted=false;
          }
        })
      }
      if (this.action == "PUT") {
        let response = this.api.editEmployeeInfo(newProfileJson)
        response.subscribe(data => {
          if (data.status == 200) {
            sessionStorage.clear();
            this.saveInfo.updateId(newProfileJson["id"])
            this.saveInfo.updateAction("ProfileUpdated")
            this._modalService.open(MODALS["openDialogBox"])
          }
          else {
            alert("Server Failed");
            this.submitted=false;
          }
        })
      }
    }
  }

  lostDataRetrieval()
  {
    let formValues = sessionStorage.getItem('form');
        const parsedJSON = JSON.parse(formValues);
        const employeeObj: Object = parsedJSON as Object;
      if(formValues!=null && employeeObj["basicDetails"]["empID"]!=null && this.action=="POST")
      { 
        let newProfileJson = this.formDataToJson.generateNewProfile(employeeObj)     
        this.formSupporter.setRetrievalData(newProfileJson);
        this.formSupporter.setAction(this.action);
     
        this.saveInfo.updateAction("RetrievalConfirmation")
        this._modalService.open(MODALS['openDialogBox']);
        this.formSupporter.retrieveStatus.subscribe(status=>{
          
          if (status==true)
          {    
            sessionStorage.removeItem('form');
            sessionStorage.clear();
            this.router.navigate(['form-retrieve'])
          }
          })
      }
  }

  ngOnDestroy(){ sessionStorage.clear(); }
}