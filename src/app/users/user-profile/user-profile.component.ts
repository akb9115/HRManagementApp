import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/shared/services/api-calls/api-calls.service';
import { EmployeeInfoService } from 'src/app/admin/services/employee-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  employeeCardData:any;
  data:any;
  id:number;
  constructor(private api:ApiCallsService,private employeeInfo:EmployeeInfoService,private route:ActivatedRoute) {
    this.route.params.subscribe(info=>{
      this.id=info.id
    })
   }

  ngOnInit() {
    this.api.fetchEmployeesInfo().subscribe(info=>{
      this.data=this.employeeInfo.sendDataAsPerID(info.json(),this.id);
      this.employeeCardData=this.employeeInfo.employeeDataForCardAsUserID(this.data,this.id);
  })
  }

}
