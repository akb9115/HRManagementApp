
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataToJsonService {

  constructor(private router:Router) { }

  employeeProfileJson={}

  generateNewProfile(formData){
    console.log(formData)
      this.employeeProfileJson["id"]=formData.basicDetails.empID
      this.employeeProfileJson["firstName"]=formData.basicDetails.firstName
      this.employeeProfileJson["middleName"]=formData.basicDetails.middleName
      this.employeeProfileJson["lastName"]=formData.basicDetails.lastName
      if(formData.basicDetails.DOB!=="" && formData.basicDetails.DOB!==undefined && formData.basicDetails.DOB!==null){
        this.employeeProfileJson["DOB"]=new Date(formData.basicDetails.DOB).toISOString()
      }
      else{
        this.employeeProfileJson["DOB"]=null
      }
      if(formData.basicDetails.DOJ!=="" && formData.basicDetails.DOJ!==undefined && formData.basicDetails.DOJ!==null){
        this.employeeProfileJson["DOJ"]=new Date(formData.basicDetails.DOJ).toISOString()
      }
      else{
        this.employeeProfileJson["DOJ"]=null
      }
      this.employeeProfileJson["email"]=formData.contacts.emailPersonal
      this.employeeProfileJson["email(office)"]=formData.contacts.emailOffice
      this.employeeProfileJson["extension(office)"]=formData.contacts.extensionOffice
      this.employeeProfileJson["designation"]=formData.basicDetails.designation
      this.employeeProfileJson["department"]=formData.basicDetails.department
      this.employeeProfileJson["designationId"]="designationId"
      this.employeeProfileJson["depID"]="D123"
      if(this.employeeProfileJson["DOJ"]!==null){
        this.employeeProfileJson["joiningYear"]=new Date(this.employeeProfileJson["DOJ"]).getFullYear()
      }
      else{
        this.employeeProfileJson["joiningYear"]=null
      }
      this.employeeProfileJson["experience"]=formData.basicDetails.experience
      this.employeeProfileJson["employeetype"]=formData.basicDetails.employeeType
      this.employeeProfileJson["gender"]=formData.basicDetails.gender
      this.employeeProfileJson["bloodGroup"]=formData.basicDetails.bloodGroup
      if(formData.basicDetails.confirmationDate!=="" && formData.basicDetails.confirmationDate!==undefined && formData.basicDetails.confirmationDate!==null){
        this.employeeProfileJson["confirmationDate"]=new Date(formData.basicDetails.confirmationDate).toISOString()
      }
      else{
        this.employeeProfileJson["confirmationDate"]=null
      }
      this.employeeProfileJson["isDeleted"]=false

      let addressArray=[]
      let permanentAddress={}
      permanentAddress["addressType"]="Permanent"
      permanentAddress["addressFlat"]=formData.address.Permanent.address1
      permanentAddress["addressLocality"]=formData.address.Permanent.address2
      permanentAddress["addressCity"]=formData.address.Permanent.city
      permanentAddress["addressState"]=formData.address.Permanent.state
      permanentAddress["addressCountry"]=formData.address.Permanent.country
      permanentAddress["addressZip"]=formData.address.Permanent.zipcode

      let currentAddress={}
      currentAddress["addressType"]="Current"
      currentAddress["addressFlat"]=formData.address.Current.address1
      currentAddress["addressLocality"]=formData.address.Current.address2
      currentAddress["addressCity"]=formData.address.Current.city
      currentAddress["addressState"]=formData.address.Current.state
      currentAddress["addressCountry"]=formData.address.Current.country
      currentAddress["addressZip"]=formData.address.Current.zipcode

      addressArray.push(currentAddress)
      addressArray.push(permanentAddress)
      this.employeeProfileJson["address"]=addressArray

      let phoneArray=[]
      let primaryPhone={}
      primaryPhone["phoneType"]="Primary"
      primaryPhone["phoneNumber"]=formData.contacts.phonePrimary

      let alternatePhone={}
      alternatePhone["phoneType"]="Alternate"
      alternatePhone["phoneNumber"]=formData.contacts.phoneAlternate

      phoneArray.push(primaryPhone)
      phoneArray.push(alternatePhone)
      this.employeeProfileJson["phone"]=phoneArray

      let familyDetailsArray={}
      familyDetailsArray["maritalStatus"]=formData.familyDetails.maritalStatus
      if(familyDetailsArray["maritalStatus"]==="Married"){
        if(formData.familyDetails.anniversaryDate!=="" && formData.familyDetails.anniversaryDate!==undefined && formData.familyDetails.anniversaryDate!==null)
        {
          familyDetailsArray["anniversaryDate"]=new Date(formData.familyDetails.anniversaryDate).toISOString()
        }
        else{
          familyDetailsArray["anniversaryDate"]=null
        }
        familyDetailsArray["spouseName"]=formData.familyDetails.spouseName
        if(familyDetailsArray["spouseDOB"]){
          familyDetailsArray["spouseDOB"]=new Date(formData.familyDetails.spouseDOB).toISOString()
        }
      }
      else{
        familyDetailsArray["anniversaryDate"]=null
        familyDetailsArray["spouseName"]=null
        familyDetailsArray["spouseDOB"]=null
      }
      familyDetailsArray["emergencyContactPerson"]=formData.contacts.emergencyContactPersonName
      familyDetailsArray["emergencyContactNumber"]=formData.contacts.emergencyContactPersonContact
      this.employeeProfileJson["familyDetails"]=familyDetailsArray

      if(formData.familyDetails.dependants.length>0){
        for(let i=0;i<formData.familyDetails.dependants.length;i++){
          formData.familyDetails.dependants[i]["DOB"]=new Date(formData.familyDetails.dependants[i]["DOB"]).toISOString()
        }
        this.employeeProfileJson["dependants"]=formData.familyDetails.dependants
      }
      else{
        this.employeeProfileJson["dependants"]=null
      }

      this.employeeProfileJson["hobbies"]=formData.basicDetails.hobbies
      this.employeeProfileJson["skillSet"]=formData.basicDetails.skills

      let salaryArray={}
      salaryArray["salaryAtJoining"]=formData.salaryAndLegal.salaryAtJoining
      salaryArray["currentSalary"]=formData.salaryAndLegal.currentSalary
      this.employeeProfileJson["salary"]=salaryArray

      let legalDetailsArray={}
      legalDetailsArray["healthInsurancePolicyNumber"]=formData.familyDetails.healthInsuranceNumber
      if(formData.salaryAndLegal.employeeReviewDate!=="" && formData.salaryAndLegal.employeeReviewDate!==undefined && formData.salaryAndLegal.employeeReviewDate!==null){
        legalDetailsArray["employeeReviewDate"]=new Date(formData.salaryAndLegal.employeeReviewDate).toISOString()
      }
      else{
        legalDetailsArray["employeeReviewDate"]=null
      }
      legalDetailsArray["reportingTo"]=formData.salaryAndLegal.reportingTo
      this.employeeProfileJson["legalDetails"]=legalDetailsArray

      if(formData.salaryAndLegal.appraisals.length>0){
        this.employeeProfileJson["appraisals"]=formData.salaryAndLegal.appraisals
      }
      else{
        this.employeeProfileJson["appraisals"]=null
      }

      if(formData.salaryAndLegal.variables.length>0){
        for(let i=0;i<formData.salaryAndLegal.variables.length;i++){
          formData.salaryAndLegal.variables[i]["date"]=new Date(formData.salaryAndLegal.variables[i]["date"]).toISOString()
        }
        this.employeeProfileJson["variables"]=formData.salaryAndLegal.variables
      }
      else{
        this.employeeProfileJson["variables"]=null
      }
      this.employeeProfileJson["profile"]=formData.basicDetails.profileImage

      return this.employeeProfileJson
  }
}
