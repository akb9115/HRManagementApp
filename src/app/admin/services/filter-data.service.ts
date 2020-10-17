import { Injectable } from '@angular/core';
import images_url from '../../../assets/Files/images_url.json';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  constructor() { }

  departmentKeys;
  filteredData;
  imagesUrlData=images_url["department"]

  filterData(employee_data){
    this.departmentKeys=[]
    this.filteredData=[]

    for(let i=0;i<employee_data.length;i++){
      if(this.departmentKeys.indexOf(employee_data[i]["department"])===-1){
        this.departmentKeys.push(employee_data[i]["department"])
      }
    }

    for(let i=0;i<this.departmentKeys.length;i++){
      let empData={}
      let employeeCount=0
      for(let j=0;j<employee_data.length;j++){
        if(this.departmentKeys[i]===employee_data[j]["department"]){
          employeeCount++;
        }
      }
      empData["name"]=this.departmentKeys[i]
      empData["count"]=employeeCount
      for (let obj of this.imagesUrlData) {
        for (let key in obj) {
            // console.log("      key:", key, "value:", obj[key]);
            if(this.departmentKeys[i]===key){
              empData["imageUrl"]=obj[key]
            }
        }
    }
      this.filteredData.push(empData)
    }
    return this.filteredData
  }
  
}
