import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employeeCardData:any;
  id:number;
  constructor(private route:ActivatedRoute,private router:Router) {
   
   }

  ngOnInit() {
    this.route.queryParams.subscribe(routeParams=>{
      this.id=routeParams.id
    })
  }

  editProfile($event){
    let data=$event
    this.router.navigate(['edit'],{queryParams:{id:this.id}})
  }

}
