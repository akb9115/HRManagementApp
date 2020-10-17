import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() loggedInUser;
  @Input() currentPage:string;
  @Output() navigateToHome = new EventEmitter<boolean>();
  @Output() viewProfile = new EventEmitter<any>();
  @Output() viewDeletedProfiles = new EventEmitter<any>();
  @Output() viewDepartmentFilter = new EventEmitter<any>();
  @Output() logoutEmitter=new EventEmitter<any>();
  @Output() navigateBack =new EventEmitter<any>();

  constructor() { 
  }

  ngOnInit() {

  }

  home() {
    this.navigateToHome.emit()
  }

  viewMyProfile() {
    this.viewProfile.emit()
  }

  viewDeletedProfile() {
    this.viewDeletedProfiles.emit()
  }

  openDepartmentFilter() {
    this.viewDepartmentFilter.emit()
  }

  logout() {
    this.logoutEmitter.emit()
  }

  backToPreviousPage() {
    this.navigateBack.emit()
  }
}
