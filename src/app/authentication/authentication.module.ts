import { fakeBackendProvider } from './_helpers/fake-backend';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DynamicFieldDirective } from './../shared/directives/dynamic-field.directive';
import { DynamicFormComponent } from '../shared/components/dynamic-form/dynamic-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    DynamicFormComponent,
    DynamicFieldDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule,
    HttpClientModule
  ], providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],

})
export class AuthenticationModule { }
