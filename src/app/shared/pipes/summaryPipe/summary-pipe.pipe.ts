import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryPipe'
})
export class SummaryPipePipe implements PipeTransform {
  limit:number=15;  
    transform(value: string)
    {
        if(!value)
            {return null;}

        if(value[this.limit]!=" ")
        {
        
            for(let i= (this.limit-1) ; i>0 ; i--, this.limit--)
            {  
                
                if(value[this.limit]===' ')
                {  
                    this.limit=i;
                    break;
                }

               
            }
        }
        
        return value.substr(0,this.limit+1) +'...';
  }

}
