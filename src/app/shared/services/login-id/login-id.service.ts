import { AuthenticationService } from './../../../authentication/_services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginIdService {

  constructor(private authenticationService: AuthenticationService) { }

  fetchId() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        // logged in so return true
        return currentUser.id;
    }
    else{
      return undefined
    }
  }
}
