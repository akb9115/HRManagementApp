import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iSODate'
})
export class ISODatePipe implements PipeTransform {

  transform(dateInISOFormat): any {
    dateInISOFormat = new Date(dateInISOFormat)

    let month = dateInISOFormat.getMonth() + 1;
    let day = dateInISOFormat.getDate();
    let newMonth, newDay;


    if(month===1){
      newMonth="January"
    }
    else if(month===2){
      newMonth="February"
    }
    else if(month===3){
      newMonth="March"
    }
    else if(month===4){
      newMonth="April"
    }
    else if(month===5){
      newMonth="May"
    }
    else if(month===6){
      newMonth="June"
    }
    else if(month===7){
      newMonth="July"
    }
    else if(month===8){
      newMonth="August"
    }
    else if(month===9){
      newMonth="September"
    }
    else if(month===10){
      newMonth="October"
    }
    else if(month===11){
      newMonth="November"
    }
    else if(month===12){
      newMonth="December"
    }

    if (day < 10) {
      newDay = `0` + day.toString();
    }
    else {
      newDay = day.toString();
    }

    let finalDate = newDay + ' ' + newMonth + ' ' + dateInISOFormat.getFullYear();
    return finalDate;
  }

}


