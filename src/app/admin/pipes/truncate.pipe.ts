import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  limit:number;
    transform(value: string)
    {   this.limit=27;
        if(!value)
            {return null;}

      if(value.length>this.limit){
        return value.substr(0,this.limit-2) +'...';
      }
      else{
        return value
      }
        

    
}}
