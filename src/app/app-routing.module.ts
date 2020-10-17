import { AuthGuard } from './authentication/_helpers/auth.guard';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';


const routes: Routes = [
  {
    path:'login',
    loadChildren: () => AuthenticationModule
  },
  {
    path:'',
    loadChildren:()=>AdminModule,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
