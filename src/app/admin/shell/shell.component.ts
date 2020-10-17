import { AuthenticationService } from './../../authentication/_services/authentication.service';
import { Location } from '@angular/common';
import { LoginIdService } from './../../shared/services/login-id/login-id.service';
import { ApiCallsService } from '../../shared/services/api-calls/api-calls.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeInfoService } from '../services/employee-info.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  loggedInAdmin:object;
  currentPage:string;
  id:number;
  route:string;

  constructor(private router:Router,private api:ApiCallsService,private authenticationService: AuthenticationService,private employeeInfo:EmployeeInfoService,private loginId:LoginIdService,private location:Location) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      if(event.url==="/"){
        this.currentPage="Home"
      }
      else{
        this.currentPage=event.url
      }
    });
  }

  ngOnInit() {
    this.id=this.loginId.fetchId()
    this.api.fetchEmployeesInfo().subscribe(info=>{
      this.loggedInAdmin=this.employeeInfo.sendDataAsPerID(info.json(),this.id)
    })
  }

  home(){
    this.router.navigate([''])
  }

  viewAdminProfile(){
    this.router.navigate(['profile'],{queryParams:{id:this.id}})
  }

  viewDeletedProfiles(){
    this.router.navigate(['deletedProfiles'])
  }

  viewDepartmentFilter(){
    this.router.navigate(['department-filter'])
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  navigateToPreviousPage(){
    this.location.back()
  }

}
