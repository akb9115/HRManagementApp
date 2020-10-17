import { Injectable } from '@angular/core';
import { ISODatePipe } from 'src/app/shared/pipes/iso-date.pipe';

@Injectable({
  providedIn: 'root'
})
export class EmployeeInfoService {

  constructor(private isoToDate: ISODatePipe) { }

  employeeName = ""

  employeeListArray = []
  employeeCardArray = []

  employeeJson = {

  }

  capitalize(data: string) {
    if (data != undefined) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    }
  }

  employeesDataForCard(data: Array<object>) {
    this.employeeCardArray = []
    for (let i = 0; i < data.length; i++) {
      this.employeeJson = {}
      this.employeeJson["cardImage"] = data[i]["profile"]["image"]
      this.employeeName = data[i]["firstName"] + " " + data[i]["middleName"] + " " + data[i]["lastName"]
      let cardData = []
      cardData.push(this.employeeName)
      cardData.push(data[i]["designation"])
      cardData.push(data[i]["department"])
      cardData.push("+91" + data[i]["phone"][0]["phoneNumber"])
      cardData.push(data[i]["email"])
      this.employeeJson["cardData"] = cardData
      this.employeeJson["id"] = data[i]["id"]
      this.employeeJson["isDeleted"] = data[i]["isDeleted"]
      this.employeeCardArray[i] = this.employeeJson
    }
    return this.employeeCardArray
  }

  employeesDataForList(data: Array<object>) {
    this.employeeListArray = []
    for (let i = 0; i < data.length; i++) {
      this.employeeJson = {}
      this.employeeJson["Image"] = data[i]["profile"]["image"]
      this.employeeJson["ID"] = data[i]["id"]
      this.employeeName = data[i]["firstName"] + " " + data[i]["middleName"] + " " + data[i]["lastName"]
      this.employeeJson["Name"] = this.employeeName
      this.employeeJson["Designation"] = data[i]["designation"]
      this.employeeJson["Department"] = data[i]["department"]
      this.employeeJson["Email Address"] = data[i]["email"]
      this.employeeJson["Contact Number"] = "+91" + data[i]["phone"][0]["phoneNumber"]
      this.employeeJson["isDeleted"] = data[i]["isDeleted"]
      this.employeeListArray[i] = this.employeeJson
    }
    return this.employeeListArray
  }

  employeeDataForCardAsUserID(data: object, id: number) {
    let temp2: any[] = [];
    this.employeeJson = {}
    this.employeeJson["cardImage"] = data["profile"]["image"]
    this.employeeName = data["firstName"] + " " + data["middleName"] + " " + data["lastName"]
    let cardData = []
    cardData.push(this.employeeName)
    cardData.push(data["designation"])
    cardData.push(data["department"])
    cardData.push("+91" + data["phone"][0]["phoneNumber"])
    cardData.push(data["email(office)"])
    this.employeeJson["cardData"] = cardData
    temp2.push(this.employeeJson);
    return temp2;
  }

  employeeDataForProfile(data: Array<object>, id: number) {
    let userProfileJson = {}
    let personalInformation = {}
    let personalInformationArray = []
    let addressArray = []
    let hobbiesArray = []
    let skillsArray = []
    let contactInformationArray = []
    let appraisalArray = []
    let salaryArray = []
    let familyDetailsArray = []
    let dependantsArray = []
    let legalDetailsArray = []
    let idFound: Boolean
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] == id) {
        idFound = true
        personalInformation["Employee Id"] = data[i]["id"]
        personalInformation["Date of Birth"] = this.isoToDate.transform(data[i]["DOB"])
        personalInformation["Date of Joining"] = this.isoToDate.transform(data[i]["DOJ"])
        personalInformation["Joining Year"] = data[i]["joiningYear"]
        personalInformation["Experience"] = data[i]["experience"]
        personalInformation["Employee Type"] = data[i]["employeetype"]
        personalInformation["Gender"] = data[i]["gender"]
        personalInformation["Blood Group"] = data[i]["bloodGroup"]
        personalInformation["Confirmation Date"] = this.isoToDate.transform(data[i]["confirmationDate"])
        personalInformation["Email Address"] = data[i]["email"]
        personalInformationArray.push(personalInformation)
        //Salary details here.
        let salary = {}
        salary["Salary At Joining"] = data[i]["salary"]["salaryAtJoining"];
        salary["Current Salary"] = data[i]["salary"]["currentSalary"];
        salaryArray.push(salary)
        //Family details here.
        let familyDetails = {}
        familyDetails["Marital Status"] = data[i]["familyDetails"]["maritalStatus"];
        if (familyDetails["Marital Status"] != "Un-Married") {
          familyDetails["Anniversary Date"] = this.isoToDate.transform(data[i]["familyDetails"]["anniversaryDate"]);
          familyDetails["Spouse Name"] = data[i]["familyDetails"]["spouseName"];
          familyDetails["Spouse DOB"] = data[i]["familyDetails"]["spouseDOB"];
        }
        familyDetails["Emergency Contact Person"] = data[i]["familyDetails"]["emergencyContactPerson"];
        familyDetails["Emergency Contact Number"] = data[i]["familyDetails"]["emergencyContactNumber"];
        familyDetailsArray.push(familyDetails)
        //Legal details here.
        let legalDetails = {}
        legalDetails["Health Insurance Policy Number"] = data[i]["legalDetails"]["healthInsurancePolicyNumber"];
        legalDetails["Employee Review Date"] = this.isoToDate.transform(data[i]["legalDetails"]["employeeReviewDate"]);
        legalDetails["Reporting To"] = data[i]["legalDetails"]["reportingTo"];
        legalDetailsArray.push(legalDetails)

        for (let j = 0; j < data[i]["address"].length; j++) {
          let addressInformation = {};
          let temp = data[i]["address"][j];
          addressInformation["Type"] = this.capitalize(temp["addressType"])
          addressInformation["Address"] = this.capitalize(temp["addressFlat"]) + ", " + this.capitalize(temp["addressLocality"]) + ", " +
            this.capitalize(temp["addressCity"]) + ", " + this.capitalize(temp["addressState"]) + ", " + this.capitalize(temp["addressCountry"]) + ", " + this.capitalize(temp["addressZip"])
          addressArray.push(addressInformation)
        }
        for (let j = 0; j < data[i]["phone"].length; j++) {
          let contactInformation = {}
          contactInformation["Type"] = data[i]["phone"][j]["phoneType"];
          contactInformation["Number"] = data[i]["phone"][j]["phoneNumber"];
          contactInformationArray.push(contactInformation);
        }
        for (let j = 0; j < data[i]["hobbies"].length; j++) {
          hobbiesArray.push(data[i]["hobbies"][j]);

        }
        for (let j = 0; j < data[i]["skillSet"].length; j++) {
          skillsArray.push(data[i]["skillSet"][j])
        }
        if (data[i]["appraisals"] != null) {
          for (let j = 0; j < data[i]["appraisals"].length; j++) {
            let appraisal = {}
            appraisal["Year"] = data[i]["appraisals"][j]["year"];
            appraisal["Hike"] = data[i]["appraisals"][j]["hike"] + "%";
            appraisal["Revised Salary"] = data[i]["appraisals"][j]["revisedSalary"];
            appraisalArray.push(appraisal);
          }
        }
        if (data[i]["dependants"] != null || data[i]["dependants"] != undefined) {
          for (let j = 0; j < data[i]["dependants"].length; j++) {
            let dependant = {}
            dependant["Name"] = data[i]["dependants"][j]["name"]
            if (data[i]["dependants"][j]["DOB"]) {
              dependant["Date of Birth"] = this.isoToDate.transform(data[i]["dependants"][j]["DOB"])
            }
            else {
              dependant["Date of Birth"] = null
            }
            dependant["Relation"] = data[i]["dependants"][j]["relation"]
            dependantsArray.push(dependant)
          }
        }

        userProfileJson["Personal Information"] = personalInformationArray
        userProfileJson["Address"] = addressArray
        userProfileJson["Contact Information"] = contactInformationArray
        userProfileJson["Hobbies"] = hobbiesArray
        userProfileJson["Appraisal"] = appraisalArray
        userProfileJson["Skills"] = skillsArray
        userProfileJson["Salary"] = salaryArray
        userProfileJson["Family Details"] = familyDetailsArray
        userProfileJson["Dependants"] = dependantsArray
        userProfileJson["Legal Details"] = legalDetailsArray
        return userProfileJson;
      }
    }
    if (idFound === false) {
      return "ID Not Found"
    }

  }

  sendDataAsPerID(data: Array<object>, id: number) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] == id) {
        return data[i];
      }
    }
  }


}
