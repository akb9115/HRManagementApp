import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from './../../shared/interfaces/field.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonParserService } from 'src/app/shared/services/json-parser/json-parser.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;
  address: string = "../../../assets/Files/loginFormStructure.json";
  regConfig: FieldConfig[];
  returnUrl: string;
  error='';

  constructor(
    private authenticationService: AuthenticationService,
    private jsonParser: JsonParserService,
    private router: Router) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.jsonParser.parseAndPass(this.address).subscribe(data => {
      this.regConfig = Array.of(data.json())[0];
    })
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  submit(value: any) {
    this.authenticationService.login(this.form.value.username, this.form.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if(data.role==='admin'){
            this.router.navigate(['']);
          }
        },
        error => {
          this.error = error;
        });
  }


}
