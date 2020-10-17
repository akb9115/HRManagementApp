
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor() {
  }

  foundEmployeeArray = []
  allEmployeesData: any;
  keysArray=["id","firstName","middleName","lastName","email","department","gender","designation"]

  transform(allEmployeesData:Array<object>, searchedContent:any): any {
    this.allEmployeesData = allEmployeesData
    if (searchedContent === undefined || searchedContent === null) {
      this.foundEmployeeArray = []
    }
    else {
      searchedContent = searchedContent.toLowerCase()
      this.foundEmployeeArray = []
      if (this.allEmployeesData) {
        for (let i = 0; i < this.allEmployeesData.length; i++) {
          if (allEmployeesData[i]["isDeleted"] === false) {

            /* Matches the entered string with employee's email,first name,last name,id etc as provided above in keys array*/
            for (let key of this.keysArray) {
              if (this.allEmployeesData[i].hasOwnProperty(key)) {
                if (this.allEmployeesData[i][key].toString().toLowerCase() === searchedContent) {
                  if (this.foundEmployeeArray.indexOf(this.allEmployeesData[i]) === -1) {
                    this.foundEmployeeArray.push(this.allEmployeesData[i])
                  }
                }
              }
            }


            /* Matches the entered string with employee's complete name */
            let fullName = "";
            if (this.allEmployeesData[i]["firstName"]) {
              fullName = fullName + this.allEmployeesData[i]["firstName"]
            }
            if (this.allEmployeesData[i]["middleName"]) {
              fullName = fullName + " " + this.allEmployeesData[i]["middleName"]
            }
            if (this.allEmployeesData[i]["lastName"]) {
              fullName = fullName + " " + this.allEmployeesData[i]["lastName"]
            }
            if (fullName.toLowerCase() === searchedContent) {
              if (this.foundEmployeeArray.indexOf(this.allEmployeesData[i]) === -1) {
                this.foundEmployeeArray.push(this.allEmployeesData[i])
              }
            }


            /* Matches the entered string with employee's phone numbers */
            let phoneArray = this.allEmployeesData[i]["phone"]
            for (let j = 0; j < phoneArray.length; j++) {
              if (phoneArray[j]["phoneNumber"] === searchedContent) {
                if (this.foundEmployeeArray.indexOf(this.allEmployeesData[i]) === -1) {
                  this.foundEmployeeArray.push(this.allEmployeesData[i])
                }
              }
            }

            /* Matches the entered string with employee's complete address or a particular address part like city,state etc */
            let addressArray = this.allEmployeesData[i]["address"]
            for (let j = 0; j < addressArray.length; j++) {
              for (var key in addressArray[j]) {
                if (addressArray[j].hasOwnProperty(key)) {
                  if (addressArray[j][key].toString().toLowerCase() === searchedContent) {
                    if (this.foundEmployeeArray.indexOf(this.allEmployeesData[i]) === -1) {
                      this.foundEmployeeArray.push(this.allEmployeesData[i])
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return this.foundEmployeeArray
  }
}
