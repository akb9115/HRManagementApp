import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardCodedDataForFormService {

  defaultProfileImage={
    image:'data:image/png;base64,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',
    fileName:'21294.png',
    mimeType:'image/png'
  }
  gender=["Male","Female","Other"]
  department=["Engineering-Development","Quality Assurance","Administration","Back Office","Accounts","IT","Management","Human Resources"]
  designation=[]
  bloodGroup=["A+","A-","AB+","AB-","B+","B-","O+","O-"]
  employeeType=["Permanent","Probation"]
  probationPeriod=["1 Month","2 Month","3 Month","4 Month","5 Month","6 Month","1 Year"]
  maritalStatus=["Married","Un-Married","Other"]
  relation=["Spouse","Son","Daughter","Brother"]
  appraisalYear=["2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019"]
  variableType=["Joining Bonus","Retaining Bonus","Yearly Bonus"]
  country=["India","Nepal","USA","Philippnes","Ireland"]

  departmentWiseDesignation={
    "Engineering-Development":["Select","President","Vice President","Manager","Assistant Mangager","Technical Lead","Sr Software Engineer 2","Sr Software Engineer 1","Software Engineer 2","Software Engineer 1","Intern"],
    "Quality Assurance":["Select","Manager","QA Lead","Quality Analyst","Sr QA Engineer","QA Engineer"],
    "Back Office":["Select","Manager","BA Lead","SEO Engineer"],
    "Administration":["Select","President","Founder","CEO","Founder & CEO","Vice President","Sr Secretary","Assistant Secretary"],
    "IT":["Select","IT Manager","IT Infrastructure Engineer","IT Hardware Engineer","Store Keeper"],
    "Human Resources":["Select","President","Vice President","Manager","Assistant Manager"]
  }
  

  constructor() { }

  setPossibleDesignations(department:any)
  {
    this.designation=[];
    this.designation=this.departmentWiseDesignation[`${department}`]
  }

}

