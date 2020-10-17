import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ApiResolverService implements Resolve<any> {

  employeesArray = []

  constructor(private router: Router, private _http: Http) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const jsonUrl = environment.employeeUrl
    return this._http.get(jsonUrl).pipe(catchError(error => {
      return EMPTY
    }), mergeMap(something => {
      if (something) {
        this.employeesArray.push(something.json())
        return this.employeesArray
      } else {
        this.router.navigate(['**'])
      }
    })
    )
  }
}
