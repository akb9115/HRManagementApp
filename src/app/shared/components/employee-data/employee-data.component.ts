import { Router } from '@angular/router';
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output,EventEmitter } from '@angular/core';
import { EmployeeInfoService } from 'src/app/admin/services/employee-info.service';
import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';


@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit, OnChanges {

  @Input("employeeId") employeeId: number;
  userCardData: any;
  employeeProfileData: any;
  completeDataAsPerId: any;
  headings: Array<string>;
  allFields: any;
  profileButtonEnabled:boolean;
  personalButtonEnabled:boolean;
  salaryButtonEnabled:boolean;
  othersButtonEnabled:boolean;
  @Output() editProfileEmitter=new EventEmitter<any>();

  constructor(private employeeInfo: EmployeeInfoService, private api: ApiCallsService,private router:Router) { }

  ngOnInit() {
    this.profileButtonEnabled=true;
    this.personalButtonEnabled=false;
    this.salaryButtonEnabled=false;
    this.othersButtonEnabled=false;
    this.headings = ["Personal Information", "Address", "Hobbies", "Skills"]
    this.allFields = {
      "Personal Information": ["Employee Id", "Email Address", "Date of Birth", "Date of Joining", "Joining Year", "Experience", "Employee Type", "Gender", "Blood Group", "Confirmation Date"],
      "Address": ["Type", "Address"],
    }
    this.api.fetchEmployeesInfo().subscribe(info => {
      this.employeeProfileData = this.employeeInfo.employeeDataForProfile(info.json(), this.employeeId)
      this.completeDataAsPerId = this.employeeInfo.sendDataAsPerID(info.json(), this.employeeId);
      this.userCardData = this.employeeInfo.employeeDataForCardAsUserID(this.completeDataAsPerId, this.employeeId);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.profileButtonEnabled=true;
    this.personalButtonEnabled=false;
    this.salaryButtonEnabled=false;
    this.othersButtonEnabled=false;
    if (changes.employeeId.currentValue) {
      this.ngOnInit()
    }
  }

  viewPersonalDetails() {
    this.profileButtonEnabled=false;
    this.personalButtonEnabled=true;
    this.salaryButtonEnabled=false;
    this.othersButtonEnabled=false;
    this.headings = ["Contact Information", "Family Details","Dependants"]
    this.allFields = {
      "Contact Information": ["Type", "Number"],
      "Family Details": ["Marital Status", "Anniversary Date", "Spouse Name", "Spouse DOB", "Emergency Contact Person", "Emergency Contact Number"],
      "Dependants": ["Name","Date of Birth","Relation"]
    }
  }

  viewSalaryDetails() {
    this.profileButtonEnabled=false;
    this.personalButtonEnabled=false;
    this.salaryButtonEnabled=true;
    this.othersButtonEnabled=false;
    this.headings = ["Salary", "Legal Details", "Appraisal"]
    this.allFields = {
      "Salary": ["Salary At Joining", "Current Salary"],
      "Legal Details": ["Health Insurance Policy Number", "Employee Review Date", "Reporting To"],
      "Appraisal": ["Year", "Hike", "Revised Salary"]
    }
  }
  viewProfileDetails() {
    this.profileButtonEnabled=true;
    this.personalButtonEnabled=false;
    this.salaryButtonEnabled=false;
    this.othersButtonEnabled=false;
    this.headings = ["Personal Information", "Address", "Hobbies", "Skills"]
    this.allFields = {
      "Personal Information": ["Employee Id","Email Address", "Date of Birth", "Date of Joining", "Joining Year", "Experience", "Employee Type", "Gender", "Blood Group", "Confirmation Date"],
      "Address": ["Type", "Address"],
    }
  }

  viewOthersDetails(){
    this.profileButtonEnabled=false;
    this.personalButtonEnabled=false;
    this.salaryButtonEnabled=false;
    this.othersButtonEnabled=true;
    console.log("All Other Details")
  }

  editProfile(){
   this.editProfileEmitter.emit()
  }

}
