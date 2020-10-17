import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByProperty'
})
export class SortByPropertyPipe implements PipeTransform {

  sortAscending(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  sortDescending(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    }
  }

  transform(dataToBeSorted, sortKey, sortOrder): any {
    if (sortKey === 'name') {
      for (let i = 0; i < dataToBeSorted.length; i++) {
        if (dataToBeSorted[i]["firstName"]) {
          dataToBeSorted[i]["fullName"] = dataToBeSorted[i]["firstName"] + " "
        }
        if (dataToBeSorted[i]["middleName"]) {
          dataToBeSorted[i]["fullName"] = dataToBeSorted[i]["fullName"] + dataToBeSorted[i]["middleName"] + " "
        }
        if (dataToBeSorted[i]["lastName"]) {
          dataToBeSorted[i]["fullName"] = dataToBeSorted[i]["fullName"] + dataToBeSorted[i]["lastName"]
        }
      }
      if (sortOrder === 'asc') {
        return dataToBeSorted.sort(this.sortAscending("fullName"));
      }
      else if (sortOrder === 'dsc') {
        return dataToBeSorted.sort(this.sortDescending("fullName"))
      }
    }
    else if (sortKey === 'id') {
      for (let i = 0; i < dataToBeSorted.length; i++) {
        dataToBeSorted[i]["id"] = Number(dataToBeSorted[i]["id"])
      }
      if (sortOrder === 'asc') {
        return dataToBeSorted.sort(this.sortAscending('id'));
      }
      else if (sortOrder === 'dsc') {
        return dataToBeSorted.sort(this.sortDescending('id'))
      }
    }
  }

}
